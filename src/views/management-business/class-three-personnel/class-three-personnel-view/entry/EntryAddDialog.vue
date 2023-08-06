/**
* Created by Lv Cheng on 2022/7/11
* Notes 职称评审入账-添加弹窗
*/
<template>
  <div class="order-entry">
    <el-dialog
        :close-on-click-modal="false"
        width="70%" title="职称评审-入账申请" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form :model="form" :rules="rules" ref="form" label-position="right" size="small" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="客户名称">
                    <el-input disabled :value="$store.state.titleEvaluation.titleEvaluationDetail.customerName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="订单编号">
                    <el-input disabled class="width-full" :value="orderInfo.orderno"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职称评审录入人">
                    <el-select disabled class="width-full"
                               :value="$store.state.titleEvaluation.titleEvaluationDetail.creatorId">
                      <el-option
                          v-for="item in $store.state.user_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="款项用途" prop="fundsPurpose">
                    <el-select class="width-full" v-model="form.fundsPurpose">
                      <el-option
                          v-for="item in $store.state.title_evaluation_funds_purpose_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转入金额" prop="entryAmount">
                    <el-input-number
                        class="width-full" controls-position="right"
                        :min="0" :max="99999999.99" :precision="2" v-model="form.entryAmount"/>
                    <el-statistic group-separator="," :precision="2" :value="form.entryAmount"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="企业入账信息">
                <el-button type="primary" size="small" @click="enterpriseEntryInfoVisible = true">点击选择</el-button>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="转账方信息" prop="transferorInfo">
                    <el-input class="width-full" v-model.trim="form.transferorInfo" placeholder="请输入转账方信息">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转账方式" prop="transferWay">
                    <el-select class="width-full" v-model="form.transferWay">
                      <el-option
                          v-for="item in $store.state.order_transfer_way_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="公司账户" prop="enterpriseAccountId">
                    <el-select class="width-full" v-model="form.enterpriseAccountId">
                      <el-option
                          v-for="item in $store.state.listCompanyAccounts"
                          :key="item.enterpriseAccountId"
                          :label="item.accountName"
                          :value="item.enterpriseAccountId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="到账日期" prop="receiptDate">
                    <el-date-picker
                        class="width-full"
                        v-model="form.receiptDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择到账日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="申请备注" prop="remark">
                  <el-input type="textarea" resize="none" :rows="3" v-model.trim="form.remark"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="入账申请记录">
                </el-form-item>
              </el-row>
              <el-table
                  ref="table"
                  :data="list"
                  stripe
                  border
                  :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                  style="width: 100%">
                <el-table-column
                    min-width="180"
                    prop="entryAmount"
                    label="申请转账金额">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="款项用途">
                  <template #default="{row}">
                    {{ $valueToLabel(row.fundsPurpose, $store.state.title_evaluation_funds_purpose_options) }}
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="transferorInfo"
                    label="转账方信息">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="applicationStatus"
                    label="审批状态">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="remark"
                    label="申请备注">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="gmtCreate"
                    label="申请时间">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="80">
                  <template #default="{row}">
                    <el-button
                        size="mini"
                        type="primary"
                        @click.stop="detail(row)">查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" size="small" v-throttle="handleSubmit">提交</el-button>
      </div>
      <el-dialog
          top="25vh"
          width="60%"
          title="职称评审入账详情"
          :visible.sync="innerVisible"
          append-to-body>
        <el-form :model="innerForm" disabled label-position="right" size="small" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="款项用途">
                <el-select class="width-full" v-model="innerForm.fundsPurpose">
                  <el-option
                      v-for="item in $store.state.title_evaluation_funds_purpose_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转入金额">
                <el-input-number
                    class="width-full" controls-position="right"
                    :min="0" :max="99999999.99" :precision="2" v-model="innerForm.entryAmount"/>
                <el-statistic group-separator="," :precision="2" :value="innerForm.entryAmount"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="转账方信息">
                <el-input class="width-full" v-model.trim="innerForm.transferorInfo" placeholder="请输入转账方信息">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转账方式" prop="transferWay">
                <el-select class="width-full" v-model="innerForm.transferWay">
                  <el-option
                      v-for="item in $store.state.order_transfer_way_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="公司账户" prop="enterpriseAccountId">
                <el-select class="width-full" v-model="innerForm.enterpriseAccountId">
                  <el-option
                      v-for="item in $store.state.listCompanyAccounts"
                      :key="item.enterpriseAccountId"
                      :label="item.accountName"
                      :value="item.enterpriseAccountId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到账日期">
                <el-date-picker
                    class="width-full"
                    v-model="innerForm.receiptDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择到账日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="申请人" prop="enterpriseAccountId">
                <el-select class="width-full" v-model="innerForm.creatorId">
                  <el-option
                      v-for="item in $store.state.user_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请状态">
                <el-input v-model="innerForm.applicationStatus"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="申请备注" prop="remark">
              <el-input type="textarea" resize="none" :rows="3" v-model.trim="innerForm.remark"/>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </el-dialog>
    <!--    企业入账信息选择弹窗-->
    <el-dialog
        :close-on-click-modal="false"
        width="60%" title="企业入账信息" :visible.sync="enterpriseEntryInfoVisible"
        :before-close="()=>this.enterpriseEntryInfoVisible = false">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form label-position="right" size="small" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="客户名称">
                    <el-input v-model="customerName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label=" ">
                    <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button size="small" icon="el-icon-refresh">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table
                  ref="table"
                  :data="[]"
                  stripe
                  border
                  :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                  style="width: 100%">
                <el-table-column
                    min-width="180"
                    prop="entryAmount"
                    label="客户名称">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="fundsPurpose"
                    label="转账用途">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="transferorInfo"
                    label="转入金额">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="applicationStatus"
                    label="入账类别">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="remark"
                    label="转账方信息">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    prop="gmtCreate"
                    label="到账日期">
                </el-table-column>
              </el-table>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="enterpriseEntryInfoVisible = false">取消</el-button>
        <el-button type="primary" size="small" v-throttle="enterpriseEntryInfoVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'OrderEntry',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    orderInfo: {
      type: Object,
      default: false
    },
  },
  data() {
    return {
      innerForm: {},
      innerVisible: false,
      list: [],
      customerName: '',
      enterpriseEntryInfoVisible: false,
      form: {
        titleEvaluationOrderId: null,
        custormerName: '',
        fundsPurpose: null,
        transferorInfo: '',
        entryAmount: undefined,
        transferWay: null,
        enterpriseAccountId: null,
        receiptDate: null,
        remark: '',
      },
      entry: 1,
      selection: [],
      rules: {
        entryAmount: [
          {required: true, message: '本次转入金额不能为空', trigger: 'blur'}
        ],
        fundsPurpose: [
          {required: true, message: '请选择款项用途', trigger: 'change'}
        ],
        transferorInfo: [
          {required: true, message: '转账方信息不能为空', trigger: 'blur'}
        ],
        transferWay: [
          {required: true, message: '转账方式不能为空', trigger: 'change'}
        ],
        enterpriseAccountId: [
          {required: true, message: '公司账户不能为空', trigger: 'change'}
        ],
        receiptDate: [
          {required: true, message: '到账日期不能为空', trigger: 'change'}
        ],
      }
    }
  },
  computed: {
    titleEvaluationDetail() {
      return this.$store.state.titleEvaluation.titleEvaluationDetail
    }
  },
  created() {
    this.getEntryRecordsByOrderId()
  },
  methods: {
    async getEntryRecordsByOrderId() {
      try {
        const res = await this.$http.get(`/title-evaluation-order-entry/detail/${this.orderInfo.id}`)
        console.log(res)
        if (res && res.status) {
          this.list = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },

    inputChange(_index) {
      this.$set(this.selection, _index, this.selection[_index])
    },
    isCanSelect(_row) {
      return _row.confirmed;
    },
    handleSubmit() {
      const companyAccount = this.$store.state.listCompanyAccounts.find(item => item.enterpriseAccountId === this.form.enterpriseAccountId)
      const {accountName, bankCardNo, bankName, openingBank} = companyAccount
      let newForm = Object.assign(this.form)
      let {customerName, creatorId, id} = this.$store.state.titleEvaluation.titleEvaluationDetail
      newForm.accountName = accountName
      newForm.bankCardNo = bankCardNo
      newForm.bankName = bankName
      newForm.openingBank = openingBank
      newForm.customerName = customerName
      newForm.titleEvaluationId = id
      newForm.titleEvaluationOrderId = this.orderInfo.id
      newForm.titleEvaluationCreatorId = creatorId
      newForm.orderno = this.orderInfo.orderno
      console.log(newForm, "newForm")
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('/title-evaluation-order-entry/insert', newForm)
            if (res && res.status) {
              this.$message.success(res.message)
              this.$emit('closeDialog')
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    selectionChange(selection) {
      this.selection = selection
    },
    detail(row) {
      console.log(row)
      this.innerForm = row
      this.innerVisible = true
    }
  },
}
</script>

<style scoped lang="less">
/deep/ .el-statistic .con {
  flex-direction: unset;
}
</style>
