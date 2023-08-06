/**
* Created by Lv Cheng on 2022/7/5
* Notes 转账申请
*/
<template>
  <div class="transfer-application">
    <el-button type="primary" size="small" @click="beforeApplyTransfer">
      申请转账
    </el-button>
    <br><br>
    <el-table
        :data="listEnterpriseTransfers"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="transferAmount"
          label="申请转账金额">
      </el-table-column>
      <el-table-column
          min-width="120"
          prop="accountName"
          label="账户户名">
      </el-table-column>
      <el-table-column
          min-width="140"
          label="款项用途">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.fundsPurpose }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="300"
          prop="remark"
          label="申请备注">
      </el-table-column>
      <el-table-column
          min-width="120"
          label="申请状态">
        <template slot-scope="scope">
          <el-tag size="mini">
            {{ scope.row.applicationStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="申请时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
              disabled
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">取消申请
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.$index, scope.row)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        :close-on-click-modal=false
        width="86%"
        title="申请转账"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            企业需求：
            <el-table
                :data="listEnterpriseDemands"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="260"
                  label="级别-专业-转/注">
                <template slot-scope="scope">
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor | levelMajor }}&nbsp;-&nbsp;
                        {{
                          subItem.initialConversion ? $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n' : '无\n'
                        }}
                      </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="100"
                  label="三类人员">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="150"
                  label="招标出场">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="100"
                  label="需求人数">
                <template slot-scope="scope">
                  {{ scope.row.demandNumber }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="200"
                  label="企业出价">
                <template slot-scope="scope">
                  {{ scope.row.enterpriseOffer }}&nbsp;元&nbsp;/&nbsp;
                  {{ scope.row.enterpriseOfferNumber }}&nbsp;*&nbsp;
                  {{ $valueToLabel(scope.row.enterpriseOfferUnit, $store.state.number_unit_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="150"
                  label="市场开发费">
                <template slot-scope="scope">
                  {{ scope.row.marketDevelopmentFee }}&nbsp;/&nbsp;
                  {{ $valueToLabel(scope.row.marketDevelopmentFeeUnit, $store.state.market_dev_fee_unit_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="100"
                  label="职称">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.title, $store.state.title_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="100"
                  label="学历">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.education, $store.state.education_options) }}
                </template>
              </el-table-column>
            </el-table>
            <el-form
                :rules="rules"
                label-width="100px"
                ref="form"
                :model="formTransfer"
                label-position="right">
              <el-form-item label="转账至账户">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAccountAddEdit('add')">添加账户
                </el-button>
                <br>
                <el-radio-group v-model="formTransfer.bank">
                  <p v-for="item in listBankAccounts" :key="item.id">
                    <el-radio :label="item">{{ $valueToLabel(item.bankName, $store.state.bank_options) }}&nbsp;|&nbsp;
                      {{ item.openBank }}&nbsp;|&nbsp;
                      {{ item.accountName }}&nbsp;|&nbsp;
                      {{ item.bankCardNo }}
                    </el-radio>
                    <el-button type="text" icon="el-icon-edit" @click="handleAccountAddEdit('edit',item.id)"/>
                    <el-button type="text" style="color: red" icon="el-icon-delete"
                               @click="handleAccountDelete(item.id)"/>
                  </p>
                </el-radio-group>
              </el-form-item>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="款项用途" prop="fundsPurpose">
                    <el-input placeholder="请输入款项用途" v-model="formTransfer.fundsPurpose"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转账金额" prop="transferAmount">
                    <el-input
                        disabled
                        v-model="transferAmount">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="待分配开发费">
                <el-table
                    ref="table"
                    @row-click="handleRowClick"
                    @selection-change="selectionChange"
                    :data="tableData"
                    stripe
                    border
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      type="selection"
                      width="55">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="fullName"
                      label="人才姓名">
                  </el-table-column>
                  <el-table-column
                      min-width="200"
                      label="级别-专业-初/转">
                    <template slot-scope="scope">
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor | levelMajor }}&nbsp;-&nbsp;
                        {{
                          subItem.initialConversion ? $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n' : '无\n'
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      label="人才价格">
                    <template slot-scope="scope">
                      <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                        {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                        {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      label="市场开拓费">
                    <template slot-scope="scope">
                      <span> {{ scope.row.marketDevelopmentFee }}元&nbsp;/&nbsp;
                        {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                        {{
                          $valueToLabel(scope.row.marketDevelopmentFeeUnit, $store.state.market_dev_fee_unit_options)
                        }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" resize="none" :rows="3" v-model="formTransfer.remark"/>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <AccountAddEditDialog
          ref="accountAddEditDialog"
          @closeDialog="innerVisible = false"
          :form="form"
          :mode="mode"
          :dialog-title="dialogTitle"
          @handleSubmit="handleSubmit"
          :inner-visible="innerVisible"/>
      <div slot="footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button
            size="small"
            v-throttle="applyTransfer"
            type="primary">确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="转账详情"
        :visible.sync="visible2"
        :close-on-click-modal="false"
        width="70%">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px;">
            <el-form :model="detail" label-suffix="：" label-width="120px" label-position="right">
              <el-form-item label="审批流水">
                <div style="height: 100px">
                  <el-scrollbar style="height: 100%">
                    <el-card shadow="always">
                      <el-steps direction="vertical" :active="6" align-center>
                        <el-step
                            v-for="(item,index) in detail.listAuditRecords"
                            style="line-height: 24px;"
                            :key="index"
                            icon="el-icon-s-help">
                          <div slot="title">
                        <span style="color: #45c0f6" class="description-item">
                          <i class="el-icon-date"></i>
                          <span>
                            状态【{{item.auditStatus}}】
                          </span>
                        </span>
                            <span style="color: #409EFF" class="description-item">
                          <i class="el-icon-user-solid"></i>
                          <span>
                            审批人【{{ $valueToLabel(item.creatorId, $store.state.user_options) }}】
                          </span>
                        </span>
                            <span style="color: #67C23A" class="description-item">
                          <i class="el-icon-info"></i>
                          <span>
                            审批意见【{{ item.approvalOpinion }}】
                          </span>
                        </span>
                            <span style="color: #E6A23C" class="description-item">
                          <i class="el-icon-date"></i>
                          {{ item.gmtCreate }}
                        </span>
                          </div>
                        </el-step>
                      </el-steps>
                    </el-card>
                  </el-scrollbar>
                </div>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="申请转账金额">
                    {{ detail.transferAmount }}
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
                  <el-form-item label="银行">
                    {{ detail.bankName }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行">
                    {{ detail.remark }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户卡号">
                    {{ detail.remark }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="款项用途">
                    {{ detail.fundsPurpose }}
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
              <el-table
                  :data="detail.listAssignedTalents"
                  stripe
                  border
                  :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%">
                <el-table-column
                    min-width="180"
                    prop="fullName"
                    label="人才姓名">
                </el-table-column>
                <el-table-column
                    min-width="200"
                    label="级别-专业-初/转">
                  <template slot-scope="scope">
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                        &nbsp;-&nbsp;
                        {{
                          $valueToLabel(subItem.initialConversion
                              , $store.state.initial_conversion_options) + '\n'
                        }}
                      </span>
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="人才价格">
                  <template slot-scope="scope">
                      <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                        {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                        {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}
                      </span>
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="市场开拓费">
                  <template slot-scope="scope">
                      <span> {{ scope.row.marketDevelopmentFee }}元&nbsp;/&nbsp;
                        {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                        {{
                          $valueToLabel(scope.row.marketDevelopmentFeeUnit, $store.state.market_dev_fee_unit_options)
                        }}
                      </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible2 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AccountAddEditDialog from "./AccountAddEditDialog";

export default {
  name: 'TransferApplication',
  components: {AccountAddEditDialog},
  props: {
    listEnterpriseDemands: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mode: '',
      dialogTitle: '',
      visible: false,
      visible2: false,
      innerVisible: false,
      formTransfer: {
        bank: {},
        fundsPurpose: '市场开拓费',
        transferAmount: undefined,
        remark: ''
      },
      rules: {
        fundsPurpose: [
          {required: true, message: '请选择款项用途', trigger: 'blur'}
        ],
        transferAmount: [
          {required: true, message: '请填写转账金额', trigger: 'blur'}
        ],
        remark: [
          {required: false}
        ],
      },
      form: {
        enterpriseId: this.$route.query.id / 1,
        bankName: null,
        openBank: '',
        accountName: '',
        bankCardNo: '',
      },
      listEnterpriseTransfers: [],
      listBankAccounts: [],
      tableData: [],
      selectionList: [],
      detail: {}
    }
  },
  computed: {
    transferAmount() {
      let total = 0
      if (this.selectionList.length > 0) {
        this.selectionList.forEach(item => {
          total += item.marketDevelopmentFee
        })
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.formTransfer.transferAmount = total
        return total
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.formTransfer.transferAmount = undefined
      return undefined
    }
  },
  created() {
    this.getListBankAccounts()
    this.getList()
  },
  methods: {
    /**
     * 申请转账
     */
    async beforeApplyTransfer() {
      this.visible = true
      const res = await this.$http.get('/enterprise-transfer/wait-assign-talent/' + this.$route.query.id / 1)
      if (res.status) {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.levelMajorInitialConversion = JSON.parse(item.levelMajorInitialConversion)
        })
      }
    },
    /**
     * 获取转账记录
     */
    async getList() {
      await this.$http.get('/enterprise-transfer/list/' + this.form.enterpriseId).then(res => {
        if (res.status) {
          this.listEnterpriseTransfers = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    /**
     * 获取银行账户列表
     */
    getListBankAccounts() {
      this.$http.get('/enterprise-bank-account/list/' + this.form.enterpriseId).then(res => {
        if (res.status) {
          this.listBankAccounts = res.data
        }
      })
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    async handleDetail(_index, _row) {
      try {
        const res = await this.$http.get('/enterprise-transfer/detail/' + _row.id)
        if (res.status) {
          this.detail = res.data
          this.detail.listAssignedTalents.forEach(item => {
            item.levelMajorInitialConversion = JSON.parse(item.levelMajorInitialConversion)
          })
        }
      } catch (e) {
        console.log(e)
      }
      this.visible2 = true
    },
    /**
     * 添加或修改银行账户提交
     */
    handleSubmit() {
      this.$refs.accountAddEditDialog.$refs.form.validate(valid => {
        if (valid) {
          if (this.mode === 'add') {
            this.$http.post('/enterprise-bank-account/insert', this.form).then(res => {
              if (res.status) {
                this.innerVisible = false
                this.$message.success(res.message)
                this.getListBankAccounts()
                return
              }
              this.$message.error(res.message)
            })
            return
          }
          this.$http.put('/enterprise-bank-account/update', this.form).then(res => {
            if (res.status) {
              this.innerVisible = false
              this.$message.success(res.message)
              this.getListBankAccounts()
              return
            }
            this.$message.error(res.message)
          })
        }
      })
    },
    /**
     * 打开添加/编辑银行账户对话框
     * @param _type
     * @param _id
     */
    handleAccountAddEdit(_type, _id) {
      this.innerVisible = true
      this.dialogTitle = '添加账户'
      this.mode = _type
      if (_type === 'add') {
        this.$nextTick(() => {
          this.$refs.accountAddEditDialog.$refs.form.resetFields()
        })

        return
      }
      if (_type === 'edit') {
        this.dialogTitle = '编辑账户'
        this.$http.get('/enterprise-bank-account/detail/' + _id).then(res => {
          if (res.status) {
            this.form = res.data
            return
          }
          this.$message.error(res.message)
        })

      }
    },
    /**
     * 银行账户删除
     * @param _id
     */
    handleAccountDelete(_id) {
      this.$confirm('确认要删除此账户吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/enterprise-bank-account/delete/' + _id).then(res => {
          if (res.status) {
            this.$message.success(res.message)
            this.getListBankAccounts()
            return
          }
          this.$message.error(res.message)
        })
      }).catch(() => {
      })

    },
    /**
     * 申请转账确认
     */
    async applyTransfer() {
      if (!this.formTransfer.bank.id) {
        this.$message.error("请选择银行账户")
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          let {accountName, bankCardNo, bankName, openBank}
              = this.listBankAccounts.find(item => item.id === this.formTransfer.bank.id)
          bankName = this.$valueToLabel(
              bankName, this.$store.state.bank_options)
          let orderSelectedTalentIds = []
          this.selectionList.forEach(item => orderSelectedTalentIds.push(item.id))
          let newObj = {
            enterpriseId: this.form.enterpriseId,
            accountName,
            bankCardNo,
            bankName,
            openBank,
            fundsPurpose: this.formTransfer.fundsPurpose,
            transferAmount: this.formTransfer.transferAmount,
            remark: this.formTransfer.remark,
            orderSelectedTalentIds
          }
          console.log(newObj)
          try {
            const res = await this.$http.post('/enterprise-transfer/insert', newObj)
            if (res.status) {
              this.$message.success(res.message)
              this.getList()
              this.$refs.form.resetFields()
              this.visible = false
              return
            }
            this.$message.error(res.message + JSON.stringify(res.data))
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
    },
  },
  watch: {
    selectionList(newVal, oldVal) {
      newVal.forEach(k => {
        k.className = 'highlight'
      })
      if (newVal.length === 0) {
        oldVal.forEach(k => {
          k.className = 'unChecked'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-step__description {
  padding-right: 0;
}
</style>
