/**
* Created by Lv Cheng on 2022/7/11
* Notes 资质代办入账-添加弹窗
*/
<template>
  <div class="order-entry">
    <el-dialog width="80%" title="资质代办-入账申请" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form :model="form" :rules="rules" ref="form" label-position="right" size="small" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="款项用途" prop="fundsPurpose">
                    <el-select class="width-full" v-model="form.fundsPurpose">
                      <el-option
                          v-for="item in $store.state.qualification_agency_funds_purpose_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="本次转入金额" prop="entryAmount">
                    <el-input-number
                        :precision="2"
                        class="width-full" controls-position="right"
                        :min="0" v-model="form.entryAmount"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="企业入账信息">
                <el-button type="primary" size="small">从入账管理中获取</el-button>
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
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" size="small" v-throttle="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderEntry',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {
        talentOrderId: null,
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
    qualificationAgencyDetail() {
      return this.$store.state.qualificationAgency.qualificationAgencyDetail
    }
  },
  mounted() {

  },
  methods: {
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
      newForm.accountName = accountName
      newForm.bankCardNo = bankCardNo
      newForm.bankName = bankName
      newForm.openingBank = openingBank
      console.log(this.qualificationAgencyDetail, "qualificationAgencyDetail")
      newForm.agencyCompany = this.qualificationAgencyDetail.agencyCompany
      newForm.agencyCompanyId = this.qualificationAgencyDetail.id
      console.log(newForm, "newForm")
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('/qualification-agency-entry/insert', newForm)
            if (res.status) {
              this.$message.success(res.message)
              this.$emit('closeDialog')
              this.$emit('getList')
            }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    selectionChange(selection) {
      this.selection = selection
    }
  },
}
</script>

<style scoped lang="less">

</style>
