/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质收购
*/
<template>
  <div class="qualification-acquisition">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="资质类别及等级" prop="categoryAndGrade">
        <el-cascader
            size="small"
            clearable
            ref="cascaderCategoryAndGrade"
            @expand-change="cascaderClick('categoryAndGrade')"
            @visible-change="cascaderClick('categoryAndGrade')"
            :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,checkStrictly:true
                    ,emitPath:false
                    ,children:'listCertificateCategory'}"
            placeholder="请选择级别专业"
            :options="this.$store.state.list_certificate_category"
            v-model="form.categoryAndGrade">
        </el-cascader>
      </el-form-item>
      <el-form-item label="转让意向客户" prop="transferCustomers">
        <el-input clearable size="small" v-model.trim="form.transferCustomers" placeholder="请输入转让意向客户">
        </el-input>
      </el-form-item>
      <el-form-item prop="area" label="所在地区" property="area">
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
      <el-form-item label="录入人" prop="creatorId">
        <el-select clearable size="small" v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入日期" prop="date">
        <el-date-picker
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
      <el-form-item label="状态" prop="status">
        <el-select clearable size="small" v-model="form.status" placeholder="请选择转让状态">
          <el-option
              v-for="item in this.$store.state.qualification_status_options"
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
                   @click="$router.push('/qualification-acquisition-add')"
        >添加
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
        style="width: 100%">
      <el-table-column
          min-width="160"
          align="center"
          prop="transferCustomers"
          label="转让意向客户">
      </el-table-column>
      <el-table-column
          align="center"
          min-width="200"
          label="资质类别及等级">
        <template #default="{row}">
          <div v-if="row.categoryAndGrade.length > 3">
            <el-tooltip
                class="item" effect="dark"
                placement="right">
              <div slot="content">
                <p style="font-size: 16px" v-for="item in row.categoryAndGrade" :key="item">{{ item }}</p>
              </div>
              <div>
                <p v-for="item in 3" :key="item">{{ row.categoryAndGrade[item - 1] }}</p>
              </div>
            </el-tooltip>
          </div>
          <div v-else>
            <p v-for="(item,index) in row.categoryAndGrade" :key="index">{{ item }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="所在地区">
        <template #default="{row}">
          <span> {{ $CodeToText[row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="收购金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.acquisitionAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="120"
          label="安全许可证">
        <template #default="{row}">
          <el-tag :type="row.safetyPermit ? 'primary' : 'danger'">
            {{
              $valueToLabel(row.safetyPermit, $store.state.bool3_options)
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="状态">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.status, $store.state.qualification_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="录入人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          align="center"
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
      <el-table-column
          v-else
          align="center" fixed="right" label="操作" width="260">
        <template #default="{row}">
          <el-button
              v-if="false"
              size="mini"
              type="primary"
              @click.stop="handleEdit( row)">完成
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView( row,'first')">转账
          </el-button>
          <el-button
              size="mini"
              v-if="row.categoryAndGrade.length > 1 && row.status === 1"
              type="primary"
              @click.stop="handleStrippe(row,'second')">剥离
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row,'second')">图片
          </el-button>
          <p style="height: 15px"></p>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row)">查看
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(row)">编辑
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="danger"
              v-if="row.status === 1"
              @click.stop="handleDelete(row.id)">删除
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
  name: 'QualificationAcquisition',
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
        categoryAndGrade: '',
        transferCustomers: '',
        area: '',
        creatorId: null,
        date: [],
        status: null,
        deleted: this.deleted,
      },
      rules: {
        categoryAndGrade: [{required: false, trigger: 'blur'}],
        transferCustomers: [{required: false, trigger: 'blur'}],
        area: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
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
      try {
        const res = await this.$http.post('/qualification-acquisition/list', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.categoryAndGrade = JSON.parse(item.categoryAndGrade)
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

    handleEdit(_row) {
      this.$router.push('/qualification-acquisition-edit/' + _row.id)
    },
    handleView(_row, _activeTab) {
      console.log(_row)
      this.$router.push({
        path: '/qualification-acquisition-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    async recovery(id) {
      try {
        const res = await this.$http.delete(`/qualification-acquisition/recovery/${id}`)
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
        const res = await this.$http.delete(`/qualification-acquisition/delete/${id}`)
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
    handleStrippe(_row) {
      this.$router.push('/qualification-acquisition-stripping/' + _row.id)
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            if (_type === 'categoryAndGrade') {
              that.$refs.cascaderCategoryAndGrade.dropDownVisible = false
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
