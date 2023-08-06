/**
* Created by Lv Cheng on 2022/6/9
* Notes 企业查询
*/
<template>
  <div class="enterprise-query">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="100px"
        :model="form">
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input size="small" clearable v-model="form.enterpriseName" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item prop="area" label="地区">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择地区"
            ref="cascaderArea"
            @expand-change="cascaderClick('area')"
            @visible-change="cascaderClick('area')"
            :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
            :options="this.$provinceAndCityData"
            v-model="form.area">
        </el-cascader>
      </el-form-item>
      <el-form-item prop="creatorId" label="录入人">
        <el-select clearable size="small" v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="录入日期">
        <el-date-picker
            clearable
            v-model="form.date"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="$pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="级别专业" prop="levelMajor">
        <el-cascader
            size="small"
            clearable
            ref="cascaderLevelMajor"
            @expand-change="cascaderClick('levelMajor')"
            @visible-change="cascaderClick('levelMajor')"
            :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,checkStrictly:true
                    ,emitPath:false
                    ,children:'listCertificateCategory'}"
            placeholder="请选择级别专业"
            :options="this.$store.state.list_certificate_category"
            v-model="form.levelMajor">
        </el-cascader>
      </el-form-item>
      <el-form-item label="初始转注" prop="initialConversion">
        <el-select clearable size="small" v-model="form.initialConversion" placeholder="请选择初始转注">
          <el-option
              v-for="item in $store.state.initial_conversion_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业状态" prop="enterpriseStatus">
        <el-select clearable size="small" v-model="form.enterpriseStatus" placeholder="请选择企业状态">
          <el-option
              v-for="item in this.$store.state.enterprise_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/enterprise-query-add')">录入企业
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        v-loading="loading"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          fixed="left"
          min-width="180"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="120"
          label="地区">
        <template slot-scope="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="270"
          label="级别-专业-初/转">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.listEnterpriseDemands.length === 0" type="info">未填
          </el-tag>
          <div
              v-else
              :style="{whiteSpace:'pre-line',marginBottom:'5px',
              borderRadius:'5px',
              color: index % 2 === 1? '#409EFF' : '#F56C6C'}"
              v-for="(item,index) in scope.row.listEnterpriseDemands"
              :key="index">
            <span v-for="(subItem,index) in item.levelMajorInitialConversion"
                  :key="index">
              {{ subItem.levelMajor | levelMajor }}
                &nbsp;-&nbsp;{{
                $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n'
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="企业状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.enterpriseStatus, $store.state.enterprise_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column v-if="deleted" fixed="right" label="操作" width="90">
        <template #default="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="recovery(scope.row.id)">恢复
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-else fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">订单
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'second')">图片
          </el-button>
          <el-button
              v-if="scope.row.enterpriseStatus === 1"
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'third')">转账
          </el-button>
          <p style="height: 10px"></p>
          <el-button
              size="mini"
              v-if="true"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fourth')">企业回访
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fifth')">后勤申请
          </el-button>
          <el-button
              style="padding: 5px"
              v-if="scope.row.enterpriseStatus === 2"
              size="mini"
              type="primary"
              @click.stop="handleCompleteConfirm(scope.$index, scope.row)">完成确认
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="danger"
              v-if="scope.row.enterpriseStatus === 1"
              @click.stop="handleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {confirmDelete} from "../../../util/decorator";
export default {
  name: 'EnterpriseQuery',
  components: {},
  props: {
    deleted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        enterpriseName: '',
        area: [],
        creatorId: null,
        date: [],
        levelMajor: '',
        initialConversion: null,
        enterpriseStatus: null,
        deleted: this.deleted,
      },
      rules: {
        enterpriseName: [{required: false, trigger: 'blur'}],
        area: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        levelMajor: [{required: false, trigger: 'blur'}],
        initialConversion: [{required: false, trigger: 'blur'}],
        enterpriseStatus: [{required: false, trigger: 'blur'}],
      },
    }
  },
  created() {
    this.search()
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    @throttle()
    async search(size, page) {
      let newForm = {}
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      this.loading = true
      const area = this.findSelfAndChildren(this.form.area, this.$provinceAndCityData)
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      Object.keys(this.form).forEach(key => {
        if (['area'].includes(key)) {
          newForm.area = area
        } else {
          newForm[key] = this.form[key]
        }
      })
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      console.log(newForm, "newForm")
      try {
        const res = await this.$http.post('/enterprise/list', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.listEnterpriseDemands.forEach(enterpriseDemand => {
              enterpriseDemand.levelMajorInitialConversion
                  = JSON.parse(enterpriseDemand.levelMajorInitialConversion)
            })
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    findSelfAndChildren(val, array) {
      let arr = []
      if (!val || !val.length) return arr
      arr.push(val)
      let obj = array.find(item => item.value === val)
      if (obj && obj.children && obj.children.length > 0) {
        arr = arr.concat(obj.children.map(item => item.value))
      }
      return arr
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.search()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.search(_pageSize)
    },
    handleView(_index, _row, _activeTab) {
      console.log(_index, _row)
      this.$router.push({
        path: '/enterprise-query-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    handleEdit(_index, _row) {
      this.$router.push('/enterprise-query-edit/' + _row.id)
    },
    async recovery(id) {
      try {
        const res = await this.$http.delete(`/enterprise/recovery/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    @confirmDelete()
    async handleDelete(id) {
      try {
        const res = await this.$http.delete(`/enterprise/delete/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    handleCompleteConfirm(_index, _row) {
      console.log(_index, _row)
      this.$message.success("完成确认")
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            if (this.previousElementSibling) {
              this.previousElementSibling.click()
            }
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            if (_type === 'levelMajor') {
              that.$refs.cascaderLevelMajor.dropDownVisible = false
              return
            }
            if (_type === 'socialSecurity') {
              that.$refs.cascaderSocialSecurity.dropDownVisible = false
            }
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea.dropDownVisible = false
                  return
                }
                if (_type === 'socialSecurity') {
                  that.$refs.cascaderSocialSecurity.dropDownVisible = false
                }
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
@import "../../../assets/css/common-el-input-inner-width";
</style>
