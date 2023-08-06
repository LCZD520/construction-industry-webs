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
        :data="list"
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
          <el-tag size="mini"
                  type="info">
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
      <div class="dialog-wrapper" style="height: 300px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
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
                    <el-input-number
                        :min="0" :max="99999999.99" :precision="2"
                        class="width-full"
                        controls-position="right"
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
                      <el-steps v-if="detail.listTransferApproveFlows && detail.listTransferApproveFlows.length>0"
                                direction="vertical" :active="6"
                                align-center>
                        <el-step
                            v-for="(item,index) in detail.listTransferApproveFlows"
                            style="line-height: 24px;"
                            :key="index"
                            icon="el-icon-s-help">
                          <div slot="title">
                        <span style="color: #45c0f6" class="description-item">
                          <i class="el-icon-date"></i>
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
                            <span style="color: #E6A23C" class="description-item">
                          <i class="el-icon-date"></i>
                          <span>
                            {{ item.gmtCreate }}
                          </span>
                        </span>
                          </div>
                        </el-step>
                      </el-steps>
                      <el-tag v-else>暂无审批流水</el-tag>
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
  data() {
    return {
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
          {required: true, message: '请填写转账金额', trigger: 'blur'}
        ],
        remark: [
          {required: false}
        ],
      },
      form: {
        qualificationAcquisitionId: this.$route.query.id / 1,
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
    this.getListBankAccounts()
    this.getList()
  },
  methods: {
    /**
     * 申请转账
     */
    async beforeApplyTransfer() {
      this.visible = true
    },
    /**
     * 获取转账记录
     */
    async getList() {
      await this.$http.get('/qualification-acquisition-transfer/list/' + this.form.qualificationAcquisitionId).then(res => {
        if (res.status) {
          this.list = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    /**
     * 获取银行账户列表
     */
    getListBankAccounts() {
      this.$http.get('/qualification-acquisition-bank-account/list/' + this.form.qualificationAcquisitionId).then(res => {
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
        const res = await this.$http.get('/qualification-acquisition-transfer/detail/' + _row.id)
        if (res && res.status) {
          this.detail = res.data
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
            this.$http.post('/qualification-acquisition-bank-account/insert', this.form).then(res => {
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
          this.$http.put('/qualification-acquisition-bank-account/update', this.form).then(res => {
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
        this.$http.get('/qualification-acquisition-bank-account/detail/' + _id).then(res => {
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
        this.$http.delete('/qualification-acquisition-bank-account/delete/' + _id).then(res => {
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
          let newObj = {
            qualificationAcquisitionId: this.form.qualificationAcquisitionId,
            accountName,
            bankCardNo,
            bankName,
            openBank,
            fundsPurpose: this.formTransfer.fundsPurpose,
            transferAmount: this.formTransfer.transferAmount,
            remark: this.formTransfer.remark,
          }
          try {
            const res = await this.$http.post('/qualification-acquisition-transfer/insert', newObj)
            if (res.status) {
              this.getList()
              this.$message.success(res.message)
              this.$refs.form.resetFields()
              this.visible = false
              return
            }
            this.$message.error(res.message + JSON.stringify(res.data))
          } catch (e) {
            console.log(e)
            this.$message.error("网络错误")
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
