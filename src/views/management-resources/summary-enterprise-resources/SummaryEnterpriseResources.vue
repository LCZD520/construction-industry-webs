/**
* Created by Lv Cheng on 2022/6/9
* Notes 企业资源汇总
*/
<template>
  <div class="summary-enterprise-resources">
    <el-form
        size="small"
        ref="form"
        :rules="rules"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input clearable v-model.trim="form.enterpriseName" placeholder="请输入企业名称"/>
      </el-form-item>
      <el-form-item label="级别专业" prop="levelMajor">
        <el-cascader
            clearable
            ref="cascader"
            @expand-change="cascaderClick"
            @visible-change="cascaderClick"
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
      <el-form-item label="客户类型" prop="customerType">
        <el-select clearable class="width-full" v-model="form.customerType" placeholder="请选择客户类型">
          <el-option
              v-for="item in this.$store.state.enterprise_customer_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入日期" prop="date">
        <el-date-picker
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
      <el-form-item label="录入人" prop="creatorId">
        <el-select clearable v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in this.$store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否共享" prop="shared">
        <el-select clearable v-model="form.shared" placeholder="请选择是否共享">
          <el-option
              v-for="item in this.$store.state.bool_options"
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
                   @click.stop="$router.push('/summary-enterprise-resources-add')">新建资源
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">4</b> 条记录</div>
    </div>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          fixed="left"
          min-width="100"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="260"
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
              {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                &nbsp;-&nbsp;{{
                $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n'
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          prop="telephoneNumber"
          label="联系电话">
      </el-table-column>
      <el-table-column
          min-width="100"
          label="客户类型">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.customerType === null" type="info">未选</el-tag>
          <span v-else> {{ $valueToLabel(scope.row.customerType, $store.state.customer_type_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="跟进情况">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.followUpSituation === null
            || scope.row.followUpSituation === ''" type="info">未填
          </el-tag>
          <span v-else>
            {{
              $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options)
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人">
        <template slot-scope="scope">
          <span>
            {{
              $valueToLabel(scope.row.creatorId, $store.state.user_options)
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              disabled
              @click.stop="handleDelete(scope.$index, scope.row)">删除
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
export default {
  name: 'SummaryEnterpriseResources',
  components: {},
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
        levelMajor: '',
        customerType: '',
        shared: null,
        creatorId: null,
        date: []
      },
      rules: {
        enterpriseName: [{required: false, trigger: 'blur'}],
        levelMajor: [{required: false, trigger: 'blur'}],
        customerType: [{required: false, trigger: 'blur'}],
        shared: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
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
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      newForm = Object.assign(newForm, this.form)
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/enterprise-resource/list', newForm)
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
    handleView(_index, _row) {
      this.$router.push('/summary-enterprise-resources-view/' + _row.id)
    },
    handleEdit(_index, _row) {
      this.$router.push('/summary-enterprise-resources-edit/' + _row.id)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('删除')
    },

    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
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
