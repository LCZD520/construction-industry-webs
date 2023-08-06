/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才查询
*/
<template>
  <div class="talent-query">
    <el-form
        label-width="120px"
        size="small"
        ref="form"
        :rules="rules"
        inline
        :model="form">
      <el-form-item label="姓名" prop="fullName">
        <el-input clearable v-model.trim="form.fullName" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" prop="area" label="地区">
        <el-cascader
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
      <el-form-item label="级别专业" prop="levelMajor">
        <el-cascader
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
        <el-select clearable v-model="form.initialConversion" placeholder="请选择初始转注">
          <el-option
              v-for="item in this.$store.state.initial_conversion_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" prop="title" label="职称">
        <el-select clearable v-model="form.title" placeholder="请选择职称">
          <el-option
              v-for="item in this.$store.state.title_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" prop="socialSecurity" label="社保">
        <el-cascader
            clearable
            ref="cascaderSocialSecurity"
            placeholder="请选择社保"
            @expand-change="cascaderClick('socialSecurity')"
            @visible-change="cascaderClick('socialSecurity')"
            :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
            :options="this.$provinceAndCityDataNull"
            v-model="form.socialSecurity">
        </el-cascader>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" label="三类人员" prop="classThreePersonnel">
        <el-select clearable v-model="form.classThreePersonnel" placeholder="请选择三类人员">
          <el-option
              v-for="item in this.$store.state.class_three_personnel_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="招标出场" prop="tenderExit">
        <el-select clearable v-model="form.tenderExit" placeholder="请选择招标出场">
          <el-option
              v-for="item in this.$store.state.tender_exit_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人才状态" prop="talentStatus">
        <el-select clearable v-model="form.talentStatus" placeholder="请选择人才状态">
          <el-option
              v-for="item in this.$store.state.talent_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" prop="creatorId" label="录入人">
        <el-select clearable v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in this.$store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="enableAdvancedSearch" prop="date" label="录入日期">
        <el-date-picker
            clearable
            v-model="form.date"
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
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
        <el-button v-if="enableAdvancedSearch" type="text" @click.stop="enableAdvancedSearch = false">收起</el-button>
        <el-button v-else type="text" @click.stop="enableAdvancedSearch = true">高级搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus"
                   v-if="!deleted"
                   size="small" type="primary" @click.stop="$router.push('/talent-query-add')">录入人才
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
          min-width="100"
          prop="fullName"
          label="姓名">
      </el-table-column>
      <el-table-column
          min-width="260"
          label="级别-专业-初/转">
        <template #default="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.listCertificates.length === 0" type="info">暂无证书
          </el-tag>
          <span v-else style="white-space:pre-line;">
            <span v-for="item in scope.row.listCertificates" :key="item.id">
              {{ item.levelMajor | levelMajor }}
              &nbsp;-&nbsp;
              <el-tag size="mini" disable-transitions v-if="item.initialConversion === null" type="info">无</el-tag>
              <span v-else>
                {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) + "\n" }}
              </span>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
          label="地区">
        <template #default="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="120"
          label="招标出场">
        <template #default="scope">
          <span> {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="社保">
        <template #default="scope">
          <span> {{
              scope.row.socialSecurity === '000000' ? '无'
                  : $CodeToText[scope.row.socialSecurity]
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="人才状态">
        <template #default="scope">
          <span> {{ $valueToLabel(scope.row.talentStatus, $store.state.talent_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="职称">
        <template #default="scope">
          <span> {{ $valueToLabel(scope.row.title, $store.state.title_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="三类人员">
        <template #default="scope">
          <span> {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人">
        <template #default="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column
          min-width="160"
          label="报价">
        <template #default="scope">
          <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
            {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
            {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}</span>
        </template>
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
      <el-table-column v-else fixed="right" label="操作" width="260">
        <template #default="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'second')">图片
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">证件
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">查看
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              v-if="scope.row.status === 1"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <p style="height: 10px"></p>
          <el-button
              size="mini"
              v-if="true"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'third')">转账
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fourth')">人才回访
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fifth')">后勤申请
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="danger"
              v-if="scope.row.status === 1"
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
  name: 'TalentQuery',
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
      enableAdvancedSearch: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        fullName: '',
        area: '',
        levelMajor: '',
        initialConversion: null,
        title: null,
        socialSecurity: [],
        classThreePersonnel: null,
        tenderExit: null,
        talentStatus: null,
        creatorId: null,
        date: [],
        deleted: this.deleted,
      },
      rules: {
        fullName: [{required: false, trigger: 'blur'}],
        area: [{required: false, trigger: 'blur'}],
        levelMajor: [{required: false, trigger: 'blur'}],
        initialConversion: [{required: false, trigger: 'blur'}],
        title: [{required: false, trigger: 'blur'}],
        socialSecurity: [{required: false, trigger: 'blur'}],
        tenderExit: [{required: false, trigger: 'blur'}],
        talentStatus: [{required: false, trigger: 'blur'}],
        classThreePersonnel: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
      },
    }
  },
  created() {
    console.log(this.$router)
    this.search()
  },
  methods: {
    @throttle()
    async search(size, page) {
      let newForm = {}
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      this.loading = true
      const area = this.findSelfAndChildren(this.form.area, this.$provinceAndCityData)
      const socialSecurity = this.findSelfAndChildren(this.form.socialSecurity, this.$provinceAndCityDataNull)
      newForm.area = area
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      Object.keys(this.form).forEach(key => {
        if (['area', 'socialSecurity'].includes(key)) {
          newForm.area = area
          newForm.socialSecurity = socialSecurity
        } else {
          newForm[key] = this.form[key]
        }
      })
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/talent/list', newForm)
        if (res.status) {
          this.list = res.data.list
          this.list.forEach(item => {
            item.listCertificates.forEach(certificate => {
              certificate.levelMajor = JSON.parse(certificate.levelMajor)
            })
          })
          this.pageInfo.total = res.data.total
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
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    handleView(_index, _row, _activeTab) {
      // console.log(_index, _row)
      this.$router.push({
        path: '/talent-query-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
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
    async recovery(id) {
      try {
        const res = await this.$http.delete(`/talent/recovery/${id}`)
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
        const res = await this.$http.delete(`/talent/delete/${id}`)
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/talent-query-edit/' + _row.id)
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'area') {
              that.$refs.cascaderArea && (that.$refs.cascaderArea.dropDownVisible = false)
              return
            }
            if (_type === 'levelMajor') {
              that.$refs.cascaderLevelMajor && (that.$refs.cascaderLevelMajor.dropDownVisible = false)
              return
            }
            if (_type === 'socialSecurity') {
              that.$refs.cascaderSocialSecurity && (that.$refs.cascaderSocialSecurity.dropDownVisible = false)
            }
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea && (that.$refs.cascaderArea.dropDownVisible = false)
                  return
                }
                if (_type === 'socialSecurity') {
                  that.$refs.cascaderSocialSecurity && (that.$refs.cascaderSocialSecurity.dropDownVisible = false)
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
