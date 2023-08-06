/**
* Created by Lv Cheng on 2022/7/5
* Notes 转账申请
*/
<template>
  <div class="transfer-application">
    <el-button type="primary" size="small" @click="visible = true">
      申请转账
    </el-button>
    <br><br>
    <el-table
        :data="listTalentTransfers"
        stripe
        ref="table"
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
          <el-tag size="mini">{{ $valueToLabel(scope.row.fundsPurpose, $store.state.funds_purpose_options) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="400"
          prop="remark"
          label="申请备注">
      </el-table-column>
      <el-table-column
          prop="applicationStatus"
          min-width="120"
          label="申请状态">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="申请时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
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
        width="60%"
        title="申请转账"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-content">
        <el-table
            size="mini"
            :data="[]"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              prop="appliedTransferAmount"
              label="企业合同价">
          </el-table-column>
          <el-table-column
              prop="accountName"
              label="合同已转金额">
          </el-table-column>
          <el-table-column
              prop="fundsPurpose"
              label="人才价格">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="人才余额">
          </el-table-column>
        </el-table>
        <el-form
            :rules="rules"
            label-width="100px"
            :model="formTransfer"
            label-position="right">
          <el-form-item label="转账至账户" prop="bankAccountId">
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
                <el-button type="text" style="color: red" icon="el-icon-delete" @click="handleAccountDelete(item.id)"/>
              </p>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="款项用途" prop="fundsPurpose">
                <el-select class="width-full" placeholder="请选择款项用途" v-model="formTransfer.fundsPurpose">
                  <el-option
                      v-for="item in this.$store.state.funds_purpose_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转账金额" prop="transferAmount">
                <el-input-number
                    :min="0" :max="99999999.99" :precision="2"
                    controls-position="right" class="width-full" placeholder="请输入转账金额"
                    v-model="formTransfer.transferAmount">
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" resize="none" :rows="3" v-model="formTransfer.remark"/>
          </el-form-item>
        </el-form>
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
            @click="applyTransfer"
            type="primary">确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="转账详情"
        :visible.sync="visible2"
        :close-on-click-modal="false"
        width="70%">
      <div class="dialog-content">
        <el-form :model="formDetail" label-suffix="：" label-width="120px" label-position="right">
          <el-form-item label="审批流水">
            <div style="height: 100px" v-if="formDetail.listTalentApprovalFlows
              && formDetail.listTalentApprovalFlows.length>0">
              <el-scrollbar style="height: 100%">
                <el-card shadow="always">
                  <el-steps direction="vertical" :active="6" align-center>
                    <el-step
                        v-for="(item,index) in formDetail.listTalentApprovalFlows"
                        style="line-height: 24px;"
                        :key="index"
                        icon="el-icon-s-help">
                      <div slot="title">
                        <span style="color: #E6A23C" class="description-item">
                          <i class="el-icon-date"></i>
                          <span>
                            {{ item.gmtCreate }}
                          </span>
                        </span>
                        <span style="color: #45c0f6" class="description-item">
                          <span>
                            【{{ item.auditStatus }}】
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
                      </div>
                    </el-step>
                  </el-steps>
                </el-card>
              </el-scrollbar>
            </div>
            <el-tag type="info" v-else>暂无审批流水</el-tag>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="申请转账金额">
                {{ formDetail.transferAmount }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人">
                {{ $valueToLabel(formDetail.creatorId, $store.state.user_options) }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户户名">
                {{ formDetail.accountName }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="银行">
                {{ formDetail.bankName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行">
                {{ formDetail.openBank }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账户卡号">
                {{ formDetail.bankCardNo }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="款项用途">
                {{ this.$valueToLabel(formDetail.fundsPurpose, this.$store.state.funds_purpose_options) }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请来源">
                人才转账
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请状态">
                {{ formDetail.applicationStatus }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="申请备注">
            {{ formDetail.remark }}
          </el-form-item>
        </el-form>
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
  data() {
    return {
      mode: '',
      dialogTitle: '',
      visible: false,
      visible2: false,
      innerVisible: false,
      formTransfer: {
        bank: {},
        fundsPurpose: null,
        transferAmount: undefined,
        remark: ''
      },
      rules: {
        bank: [
          {required: true, message: '请选择银行', trigger: 'change'}
        ],
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
        talentId: this.$route.query.id / 1,
        bankName: null,
        openBank: '',
        accountName: '',
        bankCardNo: '',
      },
      listTalentTransfers: [],
      listBankAccounts: [],
      formDetail: {}
    }
  },
  created() {
    this.getListBankAccounts()
    this.getList()
  },
  methods: {
    /**
     * 获取转账记录
     */
    getList() {
      this.$http.get('/talent-transfer/list/' + this.$route.query.id / 1).then(res => {
        if (res.status) {
          this.listTalentTransfers = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    /**
     * 获取银行账户列表
     */
    getListBankAccounts() {
      this.$http.get('/talent-bank-account/list/' + this.form.talentId).then(res => {
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
        const res = await this.$http.get('/talent-transfer/detail/' + _row.id)
        if (res.status && res.data !== null) {
          this.formDetail = res.data
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
            this.$http.post('/talent-bank-account/insert', this.form).then(res => {
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
          this.$http.put('/talent-bank-account/update', this.form).then(res => {
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
        this.$http.get('/talent-bank-account/detail/' + _id).then(res => {
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
        this.$http.delete('/talent-bank-account/delete/' + _id).then(res => {
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
    applyTransfer() {
      let bank = this.listBankAccounts.find(
          item => item.id === this.formTransfer.bank.id)
      bank.bankName = this.$valueToLabel(
          bank.bankName, this.$store.state.bank_options)
      let newObj = {
        talentId: this.$route.query.id / 1,
        accountName: bank.accountName,
        bankCardNo: bank.bankCardNo,
        bankName: bank.bankName,
        openBank: bank.openBank,
        fundsPurpose: this.formTransfer.fundsPurpose,
        transferAmount: this.formTransfer.transferAmount,
        remark: this.formTransfer.remark
      }
      this.$http.post('/talent-transfer/insert', newObj).then(res => {
        if (res.status) {
          this.$message.success(res.message)
          this.visible = false
          this.getList()
          return
        }
        this.$message.error(res.message)
      })
    },
  }
}
</script>

<style scoped lang="less">
/deep/ .el-step__description {
  padding-right: 0;
}
</style>
