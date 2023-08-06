/**
* Created by Lv Cheng on 2022/10/30
* Notes 资质转让订单
*/
<template>
  <div class="transfer-order">
    <div v-if="list && !list.length">
      <el-button type="primary" icon="el-icon-plus" size="small" v-throttle="placeOrder">
        下单
      </el-button>
      <br><br>
    </div>
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
          label="转让意向客户资质">
        <template #default="{row}">
          <p v-for="(item,index) in row.qualificationAcquisitionDO.categoryAndGrade" :key="index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="成交金额">
        <template #default="{row}">
          <span>{{ row.transactionAmount | formatAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="收购金额">
        <template #default="{row}">
          <span>{{ row.qualificationAcquisitionDO.acquisitionAmount | formatAmount }}</span>
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
          {{ row.qualificationTransferDO.transferCustomers }}
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          prop="gmtCreate"
          label="订单时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click="entry(row)">入账
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(row)">编辑订单
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row)">删除
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="detail(row.id)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="60%" title="资质转让下单" :visible.sync="outerVisible" :before-close="closeOuterDialog"
               :close-on-click-modal="false">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form ref="outerForm" :rules="rules" :model="form2" label-position="right" label-width="110px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="资质需求" prop="qualificationRequirements">
                    <el-select disabled multiple class="width-full" v-model="form.qualificationRequirements"
                               placeholder="">
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="选择转让客户" prop="selectedTransferCustomers">
                    <el-button type="primary" size="mini" @click="getCanSelectTransferCustomers">点击选择</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label=" ">
                    <el-table
                        v-if="form2.selectedTransferCustomers.length"
                        ref="table"
                        size="mini"
                        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                        :data="form2.selectedTransferCustomers"
                        :row-key="row=>row.id"
                        border
                        style="width: 100%">
                      <el-table-column
                          min-width="180"
                          prop="transferCustomers"
                          align="center"
                          label="企业名称">
                      </el-table-column>
                      <el-table-column
                          align="center"
                          label="所在地区">
                        <template #default="{row}">
                          <span> {{ $CodeToText[row.area] }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          min-width="180"
                          label="资质类别及等级">
                        <template #default="{row}">
                          <div v-if="row.categoryAndGrade.length > 3">
                            <el-tooltip
                                class="item" effect="dark"
                                placement="right">
                              <div slot="content">
                                <p style="font-size: 16px" v-for="item in row.categoryAndGrade" :key="item">{{
                                    item
                                  }}</p>
                              </div>
                              <div>
                                <p v-for="item in 3" :key="item">{{ row.categoryAndGrade[item - 1] }}</p>
                              </div>
                            </el-tooltip>
                          </div>
                          <div v-else>
                            <p v-for="(item,index) in row.categoryAndGrade" :key="index">{{ item }}</p>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                          min-width="180"
                          align="center"
                          label="在建工程">
                        <template #default="{row}">
                          <span> {{ $valueToLabel(row.constructionProgress, $store.state.bool3_options) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          min-width="180"
                          align="center"
                          label="资质人员	">
                        <template #default="{row}">
                          <span> {{ $valueToLabel(row.qualifiedPersonnel, $store.state.bool3_options) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          min-width="120"
                          align="center"
                          label="安全许可证">
                        <template #default="{row}">
                          <el-tag :type="row.safetyPermit ? 'primary' : 'danger'">
                            {{
                              $valueToLabel(row.safetyPermit, $store.state.bool3_options)
                            }}
                          </el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column
                          label="状态">
                        <template #default="{row}">
                          <span> {{ $valueToLabel(row.status, $store.state.qualification_status_options) }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          align="right"
                          min-width="180"
                          label="收购金额">
                        <template #default="{row}">
                          <span>{{ row.acquisitionAmount | formatAmount }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          min-width="180"
                          align="center"
                          prop="acquisitionDate"
                          label="收购日期">
                      </el-table-column>
                      <el-table-column
                          min-width="300"
                          align="center"
                          prop="remark"
                          label="备注">
                      </el-table-column>
                      <el-table-column
                          fixed="right"
                          align="center"
                          label="操作">
                        <template #default="">
                          <el-button type="danger" size="mini" @click="deleteTransferCustomer">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="成交金额" prop="transactionAmount">
                    <el-input-number
                        placeholder="请输入成交金额"
                        :precision="2"
                        class="width-full"
                        controls-position="right"
                        :min="0"
                        v-model="form2.transactionAmount"/>
                    <p style="height: 20px">
                      <span v-if="formatAmount === 0"></span>
                      <span v-else>{{ formatAmount | amount }}</span>
                    </p>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="付款方式" prop="paymentWay">
                    <el-input v-model.trim="form2.paymentWay" placeholder="请输入付款方式">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!--     -->
            <el-dialog
                :close-on-click-modal="false"
                style="margin-top: 3vh"
                width="60%"
                title="选择转让意向客户"
                :visible.sync="innerVisible"
                append-to-body>
              <el-form
                  size="small"
                  label-position="right"
                  label-width="80px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="企业名称" prop="initialConversion">
                      <el-input
                          v-model="transferCustomers"
                          clearable
                          class="width-full"
                          placeholder="请输入企业意向客户">
                        <el-option
                            v-for="item in this.$store.state.initial_conversion_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <el-form-item label=" ">
                      <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
                      <el-button size="small" icon="el-icon-refresh">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-radio-group size="small" v-model="type">
                  <el-radio-button label="all">全部</el-radio-button>
                  <el-radio-button label="selected">已选择</el-radio-button>
                  <el-radio-button label="unselected">未选择</el-radio-button>
                </el-radio-group>
                <br><br>
                <el-table
                    ref="table"
                    size="mini"
                    @row-click="handleRowClick"
                    :highlight-current-row="isHighlight"
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :data="canSelectedTransferCustomers"
                    height="300"
                    :row-key="row=>row.id"
                    border
                    style="width: 100%">
                  <el-table-column align="center" width="55" label="#">
                    <template #default="{row}">
                      <el-radio class="radio" v-model="selectedTransferCustomerId" :label="row.id">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="transferCustomers"
                      align="center"
                      label="企业名称">
                  </el-table-column>
                  <el-table-column
                      align="center"
                      label="所在地区">
                    <template #default="{row}">
                      <span> {{ $CodeToText[row.area] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      label="资质类别及等级">
                    <template #default="{row}">
                      <div v-if="row.categoryAndGrade.length > 3">
                        <el-tooltip
                            class="item" effect="dark"
                            placement="right">
                          <div slot="content">
                            <p style="font-size: 16px" v-for="item in row.categoryAndGrade" :key="item">{{ item }}</p>
                          </div>
                          <div>
                            <p v-for="item in 3" :key="item">{{ row.categoryAndGrade[item - 1] }}</p>
                          </div>
                        </el-tooltip>
                      </div>
                      <div v-else>
                        <p v-for="(item,index) in row.categoryAndGrade" :key="index">{{ item }}</p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      align="center"
                      label="在建工程">
                    <template #default="{row}">
                      <span> {{ $valueToLabel(row.constructionProgress, $store.state.bool3_options) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      align="center"
                      label="资质人员	">
                    <template #default="{row}">
                      <span> {{ $valueToLabel(row.qualifiedPersonnel, $store.state.bool3_options) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="120"
                      align="center"
                      label="安全许可证">
                    <template #default="{row}">
                      <el-tag :type="row.safetyPermit ? 'primary' : 'danger'">
                        {{
                          $valueToLabel(row.safetyPermit, $store.state.bool3_options)
                        }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="状态">
                    <template #default="{row}">
                      <span> {{ $valueToLabel(row.status, $store.state.qualification_status_options) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      align="right"
                      min-width="180"
                      label="收购金额">
                    <template #default="{row}">
                      <span>{{ row.acquisitionAmount | formatAmount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      align="center"
                      prop="acquisitionDate"
                      label="收购日期">
                  </el-table-column>
                  <el-table-column
                      min-width="300"
                      align="center"
                      prop="remark"
                      label="备注">
                  </el-table-column>
                </el-table>
                <div style="text-align: right;margin-top: 10px">
                  <div class="pagination-right">
                    <el-pagination
                        ref="pagination"
                        :page-sizes="[10]"
                        :page-size="pageInfo.pageSize"
                        :current-page.sync="pageInfo.currentPage"
                        @current-change="handleCurrentChange"
                        background
                        layout="total, prev, pager, next,sizes, jumper"
                        :total="pageInfo.total">
                    </el-pagination>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="innerConfirm">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeOuterDialog">取消</el-button>
        <el-button size="small" type="primary" v-throttle="confirmOrder">确定</el-button>
      </div>
    </el-dialog>
    <!--    订单详情-->
    <el-dialog width="60%" title="资质转让订单详情" :visible.sync="detailDialogVisible"
               :before-close="()=>this.detailDialogVisible = false"
               :close-on-click-modal="false">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form size="large" disabled :model="detailForm" label-position="right" label-width="180px">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="订单编号">
                    <el-input :value="detailForm.orderno"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收购意向客户">
                    <el-input :value="detailForm.qualificationTransferDO.transferCustomers"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="收购意向客户资质需求">
                    <el-input type="textarea" :value="detailForm.qualificationTransferDO.qualificationRequirements"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="转让意向客户">
                    <el-input :value="detailForm.qualificationAcquisitionDO.transferCustomers"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收购金额">
                    <el-input :value="detailForm.qualificationAcquisitionDO.acquisitionAmount"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="资质收购录入人">
                    <el-input :value="this.$valueToLabel(detailForm.qualificationAcquisitionDO.creatorId,
                      this.$store.state.user_options)"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="转让意向客户资质">
                    <el-input type="textarea" :value="detailForm.qualificationTransferDO.qualificationRequirements"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="成交金额">
                    <el-input :value="detailForm.transactionAmount"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="付款方式">
                    <el-input :value="detailForm.paymentWay"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="资质转让录入人">
                    <el-input :value="this.$valueToLabel(detailForm.qualificationTransferDO.creatorId,
                      this.$store.state.user_options)"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态">
                    <el-input :value="this.$valueToLabel(detailForm.status,
                      this.$store.state.qualification_transfer_order_status_options)"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="订单时间">
                    <el-date-picker type="datetime" :value="detailForm.gmtCreate"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="detailDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <CommonLoading v-if="loading"/>
    <EntryAddDialog
        v-if="entryDialogVisible"
        :qualification-transfer-info="qualificationTransferInfo"
        @closeDialog="entryDialogVisible = false"
        :visible="entryDialogVisible"/>
  </div>
</template>

<script>
import CommonLoading from "../../../../../components/CommonLoading";
import gsap from "gsap";
import EntryAddDialog from "./entry/EntryAddDialog";

export default {
  name: 'TransferOrder',
  components: {EntryAddDialog, CommonLoading},
  data() {
    return {
      qualificationTransferInfo: {},
      detailDialogVisible: false,
      entryDialogVisible: false,
      loading: false,
      isHighlight: true,
      selectedTransferCustomer: null,
      selectedTransferCustomerId: null,
      form2: {
        qualificationTransferId: this.$route.query.id / 1 || null,
        transactionAmount: undefined,
        paymentWay: '',
        transferCustomerId: null,
        selectedTransferCustomers: [],
      },
      transferCustomers: '',
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      list: [],
      outerVisible: false,
      innerVisible: false,
      canSelectedTransferCustomers: [],
      type: 'all',
      formatAmount: 0,
      rules: {
        transactionAmount: [
          {required: true, message: '请输入成交金额', trigger: 'blur'}
        ],
        paymentWay: [
          {required: true, message: '请输入支付方式', trigger: 'blur'}
        ],
        selectedTransferCustomers: [
          {required: true, message: '请选择转让意向客户', trigger: 'blur'}
        ],
      },
      detailForm: {
        qualificationAcquisitionDO: {},
        qualificationTransferDO: {}
      }
    }
  },
  props: {
    form: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  filters: {
    amount(val) {
      return val
    },
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
    !isNaN(this.form2.qualificationTransferId) && this.getListOrders()
  },
  methods: {
    deleteTransferCustomer() {
      this.selectedTransferCustomer = null
      this.selectedTransferCustomerId = null
      this.isHighlight = false
      this.form2.selectedTransferCustomers.splice(0, 1)
    },
    placeOrder() {
      this.outerVisible = true
    },
    innerConfirm() {
      if (this.selectedTransferCustomer) {
        this.form2.selectedTransferCustomers.length = 0
        this.form2.selectedTransferCustomers.push(this.selectedTransferCustomer)
        this.innerVisible = false
        return
      }
      this.$message.warning('请选择意向转让客户！')
    },
    handleRowClick(row) {
      if (this.selectedTransferCustomer && this.selectedTransferCustomer.id === row.id) {
        this.selectedTransferCustomer = null
        this.selectedTransferCustomerId = null
        this.isHighlight = false
        return
      }
      this.$nextTick(() => {
        this.$refs.table.setCurrentRow(row)
      })
      this.isHighlight = true
      this.selectedTransferCustomer = row
      this.selectedTransferCustomerId = row.id
    },
    entry(row) {
      console.log(row)
      this.qualificationTransferInfo = row
      this.entryDialogVisible = true
    },
    handleEdit(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          // const res = await this.$http.delete('/qualification-transfer/delete/' + _row.id)
          // if (res.status) {
          //   this.$message.success(res.message)
          //   this.getListEnterpriseResources()
          //   return
          // }
          // this.$message.error(res.message)
          this.$message.error('11111111')
        } catch (e) {
          console.log(e)
        }
      }).catch(() => {

      })
    },
    async detail(id) {
      this.detailDialogVisible = true
      try {
        const res = await this.$http.get(`/qualification-transfer-order/detail/${id}`)
        if (res.status) {
          this.detailForm = res.data
          this.detailForm.qualificationAcquisitionDO.categoryAndGrade
              = JSON.parse(this.detailForm.qualificationAcquisitionDO.categoryAndGrade)
          this.detailForm.qualificationTransferDO.qualificationRequirements
              = JSON.parse(this.detailForm.qualificationTransferDO.qualificationRequirements)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getListOrders() {
      try {
        const res = await this.$http.get(`/qualification-transfer-order/list/${this.form2.qualificationTransferId}`)
        if (res.status) {
          this.list = res.data
          this.list.forEach(item => {
            item.qualificationAcquisitionDO.categoryAndGrade
                = JSON.parse(item.qualificationAcquisitionDO.categoryAndGrade)
            item.qualificationTransferDO.qualificationRequirements
                = JSON.parse(item.qualificationTransferDO.qualificationRequirements)
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 确认订单
     */
    async confirmOrder() {
      this.$refs.outerForm.validate(async valid => {
        if (valid) {
          const {qualificationTransferId, transactionAmount, paymentWay} = this.form2
          let transferCustomerId = this.selectedTransferCustomerId
          this.loading = true
          try {
            const res = await this.$http.post('/qualification-transfer-order/place-order', {
              qualificationTransferId, transactionAmount, transferCustomerId, paymentWay
            })
            if (res.status) {
              this.$message.success(res.message)
              this.$nextTick(() => {
                this.$refs.table.clearSelection()
              })
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false
          }
        }
      })
    },
    /**
     * 表格翻页
     */
    async handleCurrentChange() {
      if (this.type === 'all') {
        await this.getCanSelectTransferCustomers()
        if (this.selectedTransferCustomer) {
          this.$refs.table.setCurrentRow(this.canSelectedTransferCustomers.find(item => item.id === this.selectedTransferCustomerId))
        }
      }
      this.type === 'unselected' && await this.getUnSelectTransferCustomers()
    },
    closeOuterDialog() {
      this.outerVisible = false
    },
    /**
     * 获取可选转让意向客户
     * @returns {Promise<void>}
     */
    async getCanSelectTransferCustomers() {
      let categoryAndGrade = JSON.parse(JSON.stringify(this.form.qualificationRequirements))
      categoryAndGrade = JSON.stringify(categoryAndGrade)
      const {currentPage, pageSize} = this.pageInfo
      this.innerVisible = true
      try {
        const res = await this.$http.post('/qualification-transfer/list-can-place-order', {
          pageSize,
          currentPage,
          categoryAndGrade
        })
        // console.log(res)
        if (res.status) {
          this.canSelectedTransferCustomers = res.data.list
          this.pageInfo.total = res.data.total
          this.canSelectedTransferCustomers.forEach(item => {
            item.categoryAndGrade = JSON.parse(item.categoryAndGrade)
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 获取未选转让意向客户
     * @returns {Promise<void>}
     */
    async getUnSelectTransferCustomers() {
      let categoryAndGrade = JSON.parse(JSON.stringify(this.form.qualificationRequirements))
      categoryAndGrade = JSON.stringify(categoryAndGrade)
      const {currentPage, pageSize} = this.pageInfo
      this.innerVisible = true
      try {
        const res = await this.$http.post('/qualification-transfer/list-unselect-transfer-customers', {
          pageSize,
          currentPage,
          categoryAndGrade,
          selectedTransferCustomer: this.selectedTransferCustomer && this.selectedTransferCustomer.id
        })
        if (res.status) {
          this.canSelectedTransferCustomers = res.data.list
          this.pageInfo.total = res.data.total
          this.canSelectedTransferCustomers.forEach(item => {
            item.categoryAndGrade = JSON.parse(item.categoryAndGrade)
          })
          return res
        }
      } catch (e) {
        console.log(e)
      }
    },

  },
  watch: {
    'form2.transactionAmount': function (newValue) {
      if (newValue) {
        gsap.to(this.$data, {duration: 0.5, formatAmount: newValue})
      } else {
        gsap.to(this.$data, {duration: 0.5, formatAmount: ''})
      }
    },
    async type(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.pageInfo.currentPage = 1
        const selectedTransferCustomer = this.selectedTransferCustomer
        if (newValue === 'all') {
          await this.getCanSelectTransferCustomers()
          if (selectedTransferCustomer) {
            this.$refs.table.setCurrentRow(this.canSelectedTransferCustomers.find(item => item.id === this.selectedTransferCustomerId))
          }
          return
        }
        if (newValue === 'selected') {
          await this.getCanSelectTransferCustomers()
          let list = []
          if (selectedTransferCustomer) {
            this.$refs.table.setCurrentRow(selectedTransferCustomer)
            list.push(selectedTransferCustomer)
          }
          this.canSelectedTransferCustomers = list
          this.pageInfo.total = list.length
          return
        }
        if (newValue === 'unselected') {
          await this.getUnSelectTransferCustomers()
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-el-table-scrollbar";

/deep/ .el-table__row {
  cursor: pointer;
}
</style>
