/**
* Created by Lv Cheng on 2022/7/5
* Notes 资质转让入账
*/
<template>
  <div class="transfer-entry">
    <el-button type="primary" size="small" @click="beforeApplyTransfer">
      申请入账
    </el-button>
    <span style="display: inline-block;margin-left: 15px;color:#3c53f5;">已申请:{{ appliedAmount | formatAmount }} ,待申请:{{
        waitApplyAmount | formatAmount
      }}</span>
    <br><br>
    <el-table
        :data="list"
        stripe
        border
        v-loading="loading"
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="entryAmount"
          label="申请转入金额">
      </el-table-column>
      <el-table-column
          min-width="140"
          label="款项用途">
        <template #default="{row}">
          <el-tag size="mini">
            {{ $valueToLabel(row.fundsPurpose, $store.state.qualification_agency_funds_purpose_options) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="120"
          prop="accountName"
          label="入账方信息">
      </el-table-column>
      <el-table-column
          min-width="300"
          prop="remark"
          label="申请备注">
      </el-table-column>
      <el-table-column
          min-width="120"
          label="申请状态">
        <template #default="{row}">
          <el-tag size="mini"
                  type="info">
            {{ row.applicationStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="申请时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click="handleDetail(row)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EntryAddDialog
        @closeDialog="visible = false"
        @getList="getList"
        v-if="visible"
        :visible="visible"
    />
    <el-dialog
        title="入账详情"
        :visible.sync="visible2"
        :close-on-click-modal="false"
        width="70%">
      <div class="dialog-wrapper">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px;">
            <el-form :model="detail" label-suffix="：" label-width="120px" label-position="right">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="申请入账金额">
                    {{ detail.entryAmount }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人">
                    {{ $valueToLabel(detail.creatorId, $store.state.user_options) }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户户名">
                    {{ detail.accountName }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="转账方式">
                    {{ $valueToLabel(detail.transferWay, $store.state.order_transfer_way_options) }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司账户">
                    {{
                      $store.state.listCompanyAccounts.find(item => item.enterpriseAccountId === detail.enterpriseAccountId) &&
                      $store.state.listCompanyAccounts.find(item => item.enterpriseAccountId === detail.enterpriseAccountId).accountName
                    }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="到账日期">
                    {{ detail.receiptDate }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="款项用途">
                    {{ $valueToLabel(detail.fundsPurpose, $store.state.qualification_agency_funds_purpose_options) }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请状态">
                    {{ detail.applicationStatus }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="申请备注">
                {{ detail.remark }}
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible2 = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import EntryAddDialog from "../entry/EntryAddDialog";

export default {
  name: 'TransferEntry',
  components: {EntryAddDialog},
  data() {
    return {
      loading: false,
      mode: '',
      dialogTitle: '',
      visible: false,
      visible2: false,
      innerVisible: false,
      formTransfer: {
        bank: {},
        fundsPurpose: '工商费用',
        transferAmount: undefined,
        remark: ''
      },
      rules: {
        fundsPurpose: [
          {required: true, message: '请选择款项用途', trigger: 'blur'}
        ],
        transferAmount: [
          {required: true, message: '请填写入账金额', trigger: 'blur'}
        ],
        remark: [
          {required: false}
        ],
      },
      form: {
        qualificationTransferId: this.$route.query.id / 1,
        bankName: null,
        openBank: '',
        accountName: '',
        bankCardNo: '',
      },
      list: [],
      listBankAccounts: [],
      tableData: [],
      detail: {}
    }
  },
  created() {
    // this.getList()
  },
  filters: {
    formatAmount(num, decimal = 2, split = ',') {
      if (isFinite(num)) {
        if (num === 0) {
          return num.toFixed(decimal)
        } else {
          let res = ''
          let dotIndex = String(num).indexOf('.')
          if (dotIndex === -1) {
            res = String(num).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + '.' + '0'.repeat(decimal)
          } else {
            const numStr = String((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal))
            const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1)
            res = String(numStr.slice(0, dotIndex)).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + decimals
          }
          return res
        }
      } else {
        return '/'
      }
    },
  },
  computed: {
    // qualificationTransferDetail() {
    //   return this.$store.state.qualificationTransfer.qualificationTransferDetail
    // },
    appliedAmount() {
      let arr = this.list.map(item => item.entryAmount)
      return arr.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
      }, 0)
    },
    // waitApplyAmount() {
    //   return this.$store.state.qualificationTransfer.qualificationTransferDetail.agencyAmount - this.appliedAmount
    // },
  },
  methods: {
    /**
     * 申请入账
     */
    async beforeApplyTransfer() {
      this.visible = true
    },
    /**
     * 获取入账记录
     */
    async getList() {
      this.loading = true
      try {
        const res = await this.$http.get('/qualification-transfer-entry/list/' + this.qualificationTransferDetail.id)
        if (res.status) {
          this.list = res.data
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    handleDetail(_row) {
      this.detail = _row
      this.visible2 = true
    },
  },
  watch: {}
}
</script>

<style scoped lang="less">
/deep/ .el-step__description {
  padding-right: 0;
}
</style>
