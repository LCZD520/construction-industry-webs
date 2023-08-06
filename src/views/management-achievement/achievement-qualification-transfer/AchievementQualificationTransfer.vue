/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质转让业绩
*/
<template>
  <div class="achievement-qualification-transfer">
    <el-form
        size="small"
        ref="form"
        inline
        :rules="rules"
        label-width="120px"
        :model="form">
      <el-form-item label="收购意向企业" prop="acquisitionIntentionEnterprise">
        <el-input clearable v-model.trim="form.acquisitionIntentionEnterprise" placeholder="请输入收购意向企业">
        </el-input>
      </el-form-item>
      <el-form-item label="转让意向企业" prop="transferIntentionEnterprise">
        <el-input clearable v-model.trim="form.transferIntentionEnterprise" placeholder="请输入转让意向企业">
        </el-input>
      </el-form-item>
      <el-form-item label="资质订单编号" prop="qualificationOrderno">
        <el-input clearable v-model.trim="form.qualificationOrderno" placeholder="请输入资质订单编号">
        </el-input>
      </el-form-item>
      <el-form-item label="业绩状态" prop="status">
        <el-select clearable v-model="form.status" placeholder="请选择审核状态">
          <el-option
              v-for="item in statusOptions"
              :key="item.label"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质收购录入人" prop="qualificationAcquisitionCreatorId">
        <el-select clearable v-model="form.qualificationAcquisitionCreatorId" placeholder="请选择资质收购录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质转让录入人" prop="qualificationTransferCreatorId">
        <el-select clearable v-model="form.qualificationTransferCreatorId" placeholder="请选择资质转让录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="生成日期" prop="date">
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
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(this.pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-download" size="small" type="primary" @click="handleExport">导出审核完成业绩</el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
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
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleView(scope.$index, scope.row)">查看
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
  name: 'AchievementQualificationTransfer',
  components: {},
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '资质订单编号',
          key: 'address'
        },
        {
          title: '收购意向企业',
          key: 'address'
        },
        {
          title: '转让意向企业',
          key: 'address'
        },
        {
          title: '收购金额',
          key: 'address'
        },
        {
          title: '成交金额',
          key: 'address'
        },
        {
          title: '资质转让转账金额',
          key: 'address'
        },
        {
          title: '资质转让业绩',
          key: 'address'
        },
        {
          title: '业绩生成时间',
          key: 'address'
        },
        {
          title: '业绩状态',
          key: 'address'
        },
        {
          title: '资质收购录入人',
          key: 'address'
        },
        {
          title: '资质转让录入人',
          key: 'address'
        },
      ],
      statusOptions: [
        {
          label: '已申请待审批',
        },
        {
          label: '财务审批通过',
        },
        {
          label: '财务审批不通过',
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        acquisitionIntentionEnterprise: '',
        transferIntentionEnterprise: '',
        qualificationOrderno: '',
        status: '',
        qualificationAcquisitionCreatorId: null,
        qualificationTransferCreatorId: null,
      },
      rules: {
        acquisitionIntentionEnterprise: [{required: false, trigger: 'blur'}],
        transferIntentionEnterprise: [{required: false, trigger: 'blur'}],
        qualificationOrderno: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        qualificationAcquisitionCreatorId: [{required: false, trigger: 'blur'}],
        qualificationTransferCreatorId: [{required: false, trigger: 'blur'}],
      },
    }
  },
  created() {
    // this.search()
  },
  methods: {
    @throttle()
    async search(size, page) {
      let newForm = {}
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      newForm = Object.assign(newForm, this.form)
      if (this.form.date && this.form.date.length > 0) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      this.loading = true
      try {
        const res = await this.$http.post('/achievement-qualification-transfer/list', newForm)
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    handleCurrentChange() {
      this.search()
    },
    handleSizeChange(size) {
      this.search(size)
    },
    handleView(id) {
      this.$router.push(`/achievement-qualification-transfer-view/${id}`)
    },
    @throttle(1000)
    handleExport() {
      this.$message.warning('暂未开放')
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
