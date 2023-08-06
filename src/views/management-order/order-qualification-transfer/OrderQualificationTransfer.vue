/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质转让订单
*/
<template>
  <div class="order-qualification-transfer">
    <el-form
        ref="form"
        inline
        :rules="rules"
        label-width="120px"
        :model="form">
      <el-form-item label="订单编号" prop="orderno">
        <el-input size="small" v-model.trim="form.orderno" placeholder="请输入订单编号">
        </el-input>
      </el-form-item>
      <el-form-item label="收购意向客户">
        <el-input size="small" v-model.trim="form.acquisitionIntendedCustomer" placeholder="请输入收购意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label="转让意向客户">
        <el-input size="small" v-model.trim="form.transferIntendedCustomer" placeholder="请输入转让意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label="订单日期" prop="date">
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
      <el-form-item label="资质转让录入人" prop="qualificationTransferCreatorId">
        <el-select size="small" v-model="form.qualificationTransferCreatorId" placeholder="请选择资质转让录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质收购录入人" prop="qualificationAcquisitionCreatorId">
        <el-select size="small" v-model="form.qualificationAcquisitionCreatorId" placeholder="请选择资质收购录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select size="small" v-model="form.status" placeholder="请选择状态">
          <el-option
              v-for="item in $store.state.qualification_transfer_order_status_options"
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
    <el-table
        :data="list"
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          align="center"
          prop="orderno"
          min-width="180"
          label="订单编号">
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="收购意向客户">
        <template #default="{row}">
          {{ row.qualificationTransferDO && row.qualificationTransferDO.transferCustomers }}
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="转让意向资质类别及等级">
        <template #default="{row}">
          <div v-if="row.qualificationAcquisitionDO">
            <p v-for="(item,index) in row.qualificationAcquisitionDO.categoryAndGrade" :key="index">{{ item }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="成交金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.transactionAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="收购金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2"
                        :value="row.qualificationAcquisitionDO && row.qualificationAcquisitionDO.acquisitionAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="状态">
        <template #default="{row}">
          <span>{{ $valueToLabel(row.status, $store.state.qualification_transfer_order_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="转让意向客户">
        <template #default="{row}">
          {{ row.qualificationTransferDO && row.qualificationTransferDO.transferCustomers }}
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          prop="gmtCreate"
          label="订单时间">
      </el-table-column>
      <el-table-column
          align="center"
          min-width="120"
          label="资质转让录入人">
        <template #default="{row}">
          <span> {{
              $valueToLabel(row.qualificationTransferCreatorId, $store.state.user_options)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="120"
          label="资质收购录入人">
        <template #default="{row}">
          <span> {{
              $valueToLabel(row.qualificationAcquisitionCreatorId, $store.state.user_options)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="300">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              disabled
              @click="handleView(row.id)">查看
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
  name: 'OrderQualificationTransfer',
  components: {},
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '订单编号',
          key: 'orderno'
        },
        {
          title: '人员数',
          key: 'assessorNum'
        },
        {
          title: '代办总金额',
          key: 'agencyTotalAmount'
        },
        {
          title: '订单时间',
          key: 'gmtCreate'
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
        acquisitionIntendedCustomer: '',
        transferIntendedCustomer: '',
        date: [],
        qualificationTransferCreatorId: null,
        qualificationAcquisitionCreatorId: null,
        status: ''
      },
      rules: {
        orderno: [{required: false, trigger: 'blur'}],
        acquisitionIntendedCustomer: [{required: false, trigger: 'blur'}],
        transferIntendedCustomer: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        qualificationTransferCreatorId: [{required: false, trigger: 'blur'}],
        qualificationAcquisitionCreatorId: [{required: false, trigger: 'blur'}],
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
        const res = await this.$http.post('/qualification-transfer-order/list', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.qualificationAcquisitionDO.categoryAndGrade
                = JSON.parse(item.qualificationAcquisitionDO.categoryAndGrade)
            item.qualificationTransferDO.qualificationRequirements
                = JSON.parse(item.qualificationTransferDO.qualificationRequirements)
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
    handleView(_id) {
      this.$router.push(`/order-qualification-transfer-view/${_id}`)
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {

    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      console.log(_pageSize)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
