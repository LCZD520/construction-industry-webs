/**
* Created by Lv Cheng on 2022/6/9
* Notes 职称评审订单
*/
<template>
  <div class="order-title-evaluation">
    <el-form
        size="small"
        ref="form"
        :rules="rules2"
        inline
        label-width="100px"
        :model="form">
      <el-form-item label="客户名称" prop="customerName">
        <el-input clearable v-model.trim="form.customerName" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select clearable v-model="form.status" placeholder="请选择订单状态">
          <el-option
              v-for="item in $store.state.title_evaluation_order_status_options"
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
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          min-width="180"
          align="center"
          label="客户名称">
        <template #default="{row}">
          {{ row.titleEvaluation && row.titleEvaluation.customerName }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :align="item.align"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="代办费用">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.agencyTotalAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="状态">
        <template #default="{row}">
          {{ $valueToLabel(row.orderStatus, $store.state.title_evaluation_order_status_options) }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="入账申请金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.agencyTotalAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="订单余额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.agencyTotalAmount"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="{row}">
          <el-button
              v-if="row.orderStatus === 1"
              size="mini"
              type="primary"
              @click.stop="handleConfirm(row.id)">确认订单
          </el-button>
          <el-button
              size="mini"
              v-if="row.orderStatus !== 1"
              type="primary"
              @click.stop="handleTransfer(row)">转账
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(row.id)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row.id)">查看
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
    <el-dialog
        :close-on-click-modal=false
        width="80%"
        title="职称评审转账"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content">
            <el-form
                :model="formTransfer"
                ref="formTransfer"
                :rules="rules"
                label-width="100px"
                label-position="right">
              <el-form-item label="转账至账户" prop="bank">
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
                    <el-select class="width-full" placeholder="请选择款项用途" size="small"
                               v-model="formTransfer.fundsPurpose">
                      <el-option
                          v-for="item in $store.state.title_evaluation_transfer_funds_purpose_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转账金额" prop="transferAmount">
                    <el-input-number controls-position="right" class="width-full" placeholder="请输入转账金额" size="small"
                                     v-model="formTransfer.transferAmount">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <ImagesUpload2
                  ref="upload"
                  v-if="visible"
                  @changeImageList="changeImageList"
                  :files="formTransfer.listImages"
                  namespace="title-evaluation"
                  type="order-transfer"/>
              <br>
              <el-form-item label="备注">
                <el-input style="width: 100%" size="small" type="textarea" :rows="3" v-model="formTransfer.remark"/>
              </el-form-item>
            </el-form>
            <el-divider content-position="left">
              <!--              转账申请记录 <span style="color: #409EFF">已通过: 60000元 , 待申请: 0元</span>-->
            </el-divider>
            <el-table
                :data="listTransferRecords"
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
                  min-width="180"
                  prop="accountName"
                  label="账户户名">
              </el-table-column>
              <el-table-column
                  min-width="180"
                  prop="remark"
                  label="申请备注">
              </el-table-column>
              <el-table-column
                  min-width="180"
                  prop="applicationStatus"
                  label="申请状态">
              </el-table-column>
              <el-table-column
                  min-width="180"
                  prop="gmtCreate"
                  label="申请时间">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="240">
                <template #default="{row}">
                  <el-button
                      size="mini"
                      type="primary"
                      @click.stop="handleDetail(row)">详情
                  </el-button>
                  <el-button
                      size="mini"
                      type="primary"
                      @click.stop="handleImageView(row)">图片查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
      <AccountAddEditDialog
          ref="accountAddEditDialog"
          @closeDialog="innerVisible = false"
          :form="form"
          :mode="mode"
          @handleSubmit="handleSubmit"
          :inner-visible="innerVisible"/>
      <TitleEvaluationTransferDetailDialog
          @closeDialog="innerVisible2 = false"
          :inner-visible="innerVisible2"
          :form-data="transferDetail"/>
      <div slot="footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button
            size="small"
            v-throttle="confirmTransfer"
            type="primary">确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
        :close-on-click-modal="false"
        width="70%" title="图片"
        :before-close="()=>this.innerVisible3 = false"
        :visible.sync="innerVisible3">
      <div class="dialog-wrapper" style="height: 468px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <ImagesUploadView
                ref="upload"
                v-if="innerVisible3"
                @closeDialog="innerVisible3 = false"
                :files="listImages"
                namespace="title-evaluation"
                type="order-transfer"
                :name="customerName"
                :root-folder-name="'职称评审'"
                :sub-dirs="subDirs"/>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AccountAddEditDialog from "./order-title-evaluation/AccountAddEditDialog";
import TitleEvaluationTransferDetailDialog from "./order-title-evaluation/TitleEvaluationTransferDetailDialog";
import ImagesUpload2 from "../../../components/image-upload2/ImagesUpload2";
import ImagesUploadView from "../../../components/image-upload-view/ImagesUploadView";

export default {
  name: 'OrderTitleEvaluation',
  components: {
    ImagesUploadView,
    ImagesUpload2, TitleEvaluationTransferDetailDialog, AccountAddEditDialog
  },
  data() {
    const bankValidator = (rule, value, callback) => {
      if (Object.keys(this.formTransfer.bank).length === 0) {
        callback(new Error('请选择银行!'))
      }
      callback()
    }
    return {
      loading: false,
      visible: false,
      mode: '',
      // 账户信息弹窗是否显示
      innerVisible: false,
      innerVisible2: false,
      innerVisible3: false,
      options: [],
      columns: [
        {
          title: '订单编号',
          key: 'orderno',
          align: 'center'
        },
        {
          title: '人员数',
          key: 'assessorNum',
          align: 'right'
        },
        {
          title: '订单时间',
          key: 'gmtCreate',
          align: 'center'
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        customerName: '',
        status: null
      },
      rules2: {
        customerName: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}]
      },
      formTransfer: {
        bank: {},
        fundsPurpose: null,
        transferAmount: undefined,
        listImages: [],
        remark: ''
      },
      listTransferRecords: [],
      rules: {
        bank: [
          {required: true, validator: bankValidator, message: '请选择银行', trigger: 'change'}
        ],
        fundsPurpose: [
          {required: true, message: '请选择款项用途', trigger: 'change'}
        ],
        transferAmount: [
          {required: true, message: '请填写转账金额', trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      },
      listBankAccounts: [],
      transferDetail: {},
      listImages: [],
      subDirs: new Set([
        {type: 'order-transfer', folder: '转账'},
      ]),
      customerName: '',
      orderno: '',
    }
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
      this.loading = true
      try {
        const res = await this.$http.get('/title-evaluation-order/list-all', {
          params: {
            currentPage: page ? page : this.pageInfo.currentPage,
            pageSize: size ? size : this.pageInfo.pageSize,
            customerName: this.form.customerName,
            status: this.form.status,
          }
        })
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

    changeImageList(val) {
      this.formTransfer.listImages = JSON.parse(JSON.stringify(val))
    },
    async getOrderTransfersByOrderId(id) {
      try {
        const res = await this.$http.get(`/title-evaluation-transfer/list/${id}`)
        if (res && res.status) {
          this.listTransferRecords = res.data
        }
      } catch (e) {
        console.log(e)
      }

    },
    handleView(id) {
      this.$router.push('/order-title-evaluation-view/' + id)
    },
    /**
     * 确认订单
     * @param id
     */
    handleConfirm(id) {
      this.$router.push('/order-title-evaluation-edit/' + id)
    },
    handleTransfer(row) {
      this.form.titleEvaluationOrderId = row.id
      this.customerName = row.titleEvaluation.customerName
      this.orderno = row.orderno
      this.visible = true
      this.getListBankAccounts(row.id)
      this.getOrderTransfersByOrderId(row.id)
    },
    handleEdit(id) {
      this.$router.push('/order-title-evaluation-edit/' + id)
    },
    handleDetail(_row) {
      this.transferDetail = _row
      this.innerVisible2 = true
    },
    handleImageView(_row) {
      this.listImages = _row.listImages
      this.innerVisible3 = true
    },
    /**
     * 获取银行账户列表
     */
    async getListBankAccounts(id) {
      try {
        const res = await this.$http.get('/title-evaluation-bank-account/list/' + id)
        if (res && res.status) {
          this.listBankAccounts = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 添加或修改银行账户提交
     */
    handleSubmit() {
      this.$refs.accountAddEditDialog.$refs.form.validate(valid => {
        if (valid) {
          if (this.mode === 'add') {
            this.$http.post('/title-evaluation-bank-account/insert', this.form).then(res => {
              if (res.status) {
                this.innerVisible = false
                this.$message.success(res.message)
                this.getListBankAccounts(this.form.titleEvaluationOrderId)
                this.$refs.accountAddEditDialog.$refs.form.resetFields()
                return
              }
              this.$message.error(res.message)
            })
            return
          }
          this.$http.put('/title-evaluation-bank-account/update', this.form).then(res => {
            if (res.status) {
              this.innerVisible = false
              this.$message.success(res.message)
              this.getListBankAccounts(this.form.titleEvaluationOrderId)
              return
            }
            this.$message.error(res.message)
          })
        }
      })
    },
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
        this.$http.get('/title-evaluation-bank-account/detail/' + _id).then(res => {
          if (res.status) {
            this.form = res.data
            return
          }
          this.$message.error(res.message)
        })
      }
    },
    handleAccountDelete(id) {
      this.$confirm('确认要删除此账户吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/title-evaluation-bank-account/delete/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.getListBankAccounts(this.form.titleEvaluationOrderId)
          return
        }
        this.$message.error(res.message)
      }).catch(() => {
      })

    },
    async confirmTransfer() {
      this.$refs.formTransfer.validate(async valid => {
        if (valid) {
          console.log(this.formTransfer)
          let {bank, transferAmount, listImages, remark, fundsPurpose} = this.formTransfer
          listImages.forEach(item => {
            item.namespace = 'title-evaluation'
            item.type = 'order-transfer'
          })
          let obj = {
            customerName: this.customerName,
            orderno: this.orderno,
            titleEvaluationOrderId: this.form.titleEvaluationOrderId,
            bankName: this.$valueToLabel(bank.bankName, this.$store.state.bank_options),
            openBank: bank.openBank,
            accountName: bank.accountName,
            bankCardNo: bank.bankCardNo,
            fundsPurpose,
            remark,
            transferAmount,
            listImages,
          }
          try {
            const res = await this.$http.post('/title-evaluation-transfer/insert', obj)
            if (res.status) {
              this.$message.success(res.message)
              this.visible = false
              this.$nextTick(() => {
                this.$refs.formTransfer.resetFields()
                this.listImages.length = 0
              })
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";

/deep/ .el-scrollbar__bar.is-horizontal {
  display: none;
}

/deep/ .el-dialog__body {
  padding: 16px 20px !important;
}

.dialog-content {
  padding: 0 10px;
}
</style>
