/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质转让入账
*/
<template>
  <div class="entry-qualification-transfer">
    <el-form
        ref="form"
        :rules="rules"
        inline
        :model="form">
      <el-form-item label="订单编号" label-width="120px" prop="orderno">
        <el-input size="small" v-model="form.orderno" placeholder="请输入订单编号">
        </el-input>
      </el-form-item>
      <el-form-item label="申请人" label-width="120px" prop="creatorId">
        <el-select size="small" v-model="form.creatorId" placeholder="请选择创建人姓名">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请日期" label-width="120px" prop="date">
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
      <el-form-item label="申请状态" label-width="120px" prop="applicationStatus">
        <el-select size="small" v-model="form.applicationStatus" placeholder="请选择申请状态">
          <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收购意向客户" label-width="120px" prop="transferCustomers">
        <el-input size="small" v-model="form.transferCustomers" placeholder="请输入收购意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column
          label="申请人">
        <template #default="{row}">
          {{ $valueToLabel(row.creatorId, $store.state.user_options) }}
        </template>
      </el-table-column>
      <el-table-column
          label="资质转让录入人">
        <template #default="{row}">
          {{ $valueToLabel(row.qualificationTransferCreatorId, $store.state.user_options) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{row}">
          <el-button
              v-if="row.applicationStatus === '已申请待审批'
               && $store.state.currentUser.listRoleIds.includes(2)"
              size="mini"
              disabled
              type="primary"
              icon="el-icon-check"
              @click.stop="handleExamine(row)">审核
          </el-button>
          <el-button
              size="mini"
              type="primary"
              disabled
              @click.stop="handleView(row.id)">详情
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
  name: 'EntryQualificationTransfer',
  components: {},
  data() {
    return {
      loading: false,
      options: [
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
      columns: [
        {
          title: '订单编号',
          key: 'orderno'
        },
        {
          title: '申请转入金额',
          key: 'entryAmount'
        },
        {
          title: '转账方信息',
          key: 'transferorInfo'
        },
        {
          title: '到账日期',
          key: 'receiptDate'
        },
        {
          title: '申请日期',
          key: 'gmtCreate'
        },
        {
          title: '申请状态',
          key: 'applicationStatus'
        },
        {
          title: '收购意向客户',
          key: 'transferCustomers'
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        orderno: '',
        transferCustomers: '',
        date: [],
        applicationStatus: '',
        creatorId: '',
      },
      rules: {
        orderno: [{required: false, trigger: 'blur'}],
        transferCustomers: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        applicationStatus: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
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
        const res = await this.$http.post('/qualification-transfer-order-entry/list', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
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
    handleView(id) {
      this.$router.push(`/entry-qualification-transfer-view/${id}`)
    },
    /**
     * 审核
     * @param _row
     */
    handleExamine(_row) {
      this.$router.push('/entry-qualification-transfer-approval/' + _row.id)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
