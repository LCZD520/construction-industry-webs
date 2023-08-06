/**
* Created by Lv Cheng on 2022/9/17
* Notes 三类人员订单
*/
<template>
  <div class="class-three-personnel-order">
    <template v-if="$route.query.activeTab === 'first'">
      <el-button type="primary" size="small" @click="placeOrder">
        下单
      </el-button>
      <br><br>
    </template>
    <el-table
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
          min-width="180"
          label="订单状态">
        <template #default="{row}">
          {{ $valueToLabel(row.orderStatus, $store.state.title_evaluation_order_status_options) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template #default="{row}">
          <el-button
              disabled
              size="mini"
              type="primary"
              @click.stop="entry(row)"
              v-if="row.orderStatus === 2">入账
          </el-button>
          <el-button
              size="mini"
              type="primary"
              disabled
              v-if="row.orderStatus === 2">完成订单
          </el-button>
          <el-button
              size="mini"
              disabled
              v-if="row.orderStatus === 1"
              type="primary"
              @click="handleEdit(row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="detail(row.id)">详情
          </el-button>
          <el-button
              size="mini"
              disabled
              v-if="row.orderStatus === 1"
              type="danger">删除
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleCancel(row.id)"
              v-if="row.orderStatus === 2">取消订单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    下单弹窗-->
    <ClassThreePersonnelPlaceOrderDialog
        @getListOrders="getListOrders($route.query.id)"
        @closeDialog="outerVisible = false"
        :outer-visible="outerVisible"/>
    <!--    详情弹窗-->
    <ClassThreePersonnelOrderDetail
        @closeDialog="detailVisible = false"
        :visible="detailVisible"
        :form="form"/>
    <!--    订单编辑弹窗-->
    <el-dialog
        append-to-body
        width="80%" title="三类人员订单编辑" :visible.sync="orderEditVisible" :before-close="()=>this.orderEditVisible = false">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form label-position="left" label-width="120">
              <el-form-item label="人员">
                <el-button type="primary" size="small" @click="selectAssessor">点击选择</el-button>
                <el-table
                    size="mini"
                    :data="listAssessors"
                    stripe
                    border
                    height="300"
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      min-width="150"
                      v-for="item in columns2"
                      :key="item.key"
                      :prop="item.key"
                      :label="item.title">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="90">
                    <template #default="{row}">
                      <el-button
                          size="mini"
                          @click="deleteAssessor(row.id)"
                          type="danger">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
            <!--      添加/编辑三类人员_选择待评审人员-->
            <el-dialog
                :close-on-click-modal="false"
                style="margin-top: 3vh"
                width="80%"
                title="三类人员_选择待评审人员"
                :visible.sync="innerVisible"
                append-to-body>
              <el-form
                  size="small"
                  label-position="right"
                  label-width="80px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="证书专业" prop="initialConversion">
                      <el-input
                          v-model="sort"
                          clearable
                          class="width-full"
                          placeholder="请输入证书专业">
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
                    @row-click="handleRowClick"
                    :data="selectedAssessorList"
                    stripe
                    height="300"
                    :row-key="rowKey"
                    border
                    @selection-change="selectionChange"
                    :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    style="width: 100%">
                  <el-table-column
                      :reserve-selection="true"
                      type="selection"
                      width="55">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      v-for="item in columns"
                      :key="item.key"
                      :prop="item.key"
                      :label="item.title">
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
                <el-button size="small" type="primary" @click="closeInnerDialog">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="orderEditVisible = false">取消</el-button>
        <el-button size="small" type="primary" v-throttle="editConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!--      添加/编辑三类人员_选择待评审人员-->
    <el-dialog
        :close-on-click-modal="false"
        style="margin-top: 3vh"
        width="80%"
        title="三类人员_选择待评审人员"
        :visible.sync="innerVisible"
        append-to-body>
      <el-form
          size="small"
          label-position="right"
          label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="证书专业" prop="initialConversion">
              <el-input
                  v-model="sort"
                  clearable
                  class="width-full"
                  placeholder="请输入证书专业">
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
            @row-click="handleRowClick"
            :data="selectedAssessorList"
            stripe
            height="300"
            :row-key="rowKey"
            border
            @selection-change="selectionChange"
            :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            style="width: 100%">
          <el-table-column
              :reserve-selection="true"
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              min-width="180"
              v-for="item in columns2"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
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
        <el-button size="small" type="primary" @click="closeInnerDialog">确定</el-button>
      </div>
    </el-dialog>
    <!--    入账申请弹窗-->
    <EntryAddDialog
        :order-info="currentClickedOrder"
        :visible="entryVisible"
        @closeDialog="entryVisible = false"
        v-if="entryVisible"/>
  </div>
</template>

<script>

import ClassThreePersonnelPlaceOrderDialog from "./ClassThreePersonnelPlaceOrderDialog";
import ClassThreePersonnelOrderDetail from "./ClassThreePersonnelOrderDetail";
import EntryAddDialog from "./entry/EntryAddDialog";
import {loading} from "../../../../util/decorator";

export default {
  name: 'ClassThreePersonnelOrder',
  components: {EntryAddDialog, ClassThreePersonnelOrderDetail, ClassThreePersonnelPlaceOrderDialog},
  data() {
    return {
      // 订单详情弹窗是否可见
      detailVisible: false,
      entryVisible: false,
      outerVisible: false,
      orderEditVisible: false,
      innerVisible: false,
      // 订单入账
      orderEntryVisible: false,
      list: [],
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
      columns2: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '评审专业',
          key: 'evaluationMajor'
        },
        {
          title: '评审职称',
          key: 'titleEvaluation'
        },
        {
          title: '代办金额',
          key: 'agencyAmount'
        },
        {
          title: '评审费用',
          key: 'evaluationFee'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard'
        },
        {
          title: '学历',
          key: 'education'
        },
        {
          title: '毕业专业',
          key: 'graduationMajor'
        },
        {
          title: '证书性质',
          key: 'certificateNature'
        },
        {
          title: '鉴定方式',
          key: 'appraisalWay'
        },
      ],
      selectedTalents: [],
      form: {},
      talentOrderId: null,
      listAssessors: [],
      type: 'all',
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      selectedAssessorList: [],
      // 已选三类人员
      selectionList: [],
      sort: null,
      currentClickedOrder: {}
    }
  },
  created() {
    this.$route.query.id && this.getListOrders(this.$route.query.id)
  },
  methods: {
    /**
     * 下单
     */
    placeOrder() {
      this.outerVisible = true
    },
    closeOrderEntryDialog() {
      this.orderEntryVisible = false
      this.$refs.orderEntry.$refs.form.resetFields()
    },
    async getListOrders(_id) {
      const res = await this.$http.get('/class-three-personnel/list-order/' + _id)
      if (res.status && res.data !== null) {
        this.list = res.data
      }
    },
    /**
     * 入账
     */
    async entry(_row) {
      console.log(_row, "_row")
      this.entryVisible = true
      this.currentClickedOrder = _row
      // this.talentOrderId = _row.id
      // const res = await this.$http.get('/class-three-personnel/list-selected-talent/' + _row.id)
      // if (res.status && res.data !== null) {
      //   this.selectedTalents = res.data
      //   this.selectedTalents.forEach(item => {
      //     item.levelMajorInitialConversion
      //         = JSON.parse(item.levelMajorInitialConversion)
      //   })
      // }
      // this.orderEntryVisible = true
    },
    handlePlaceOrder() {
      this.outerVisible = true
    },
    handleSubmit() {
      this.outerVisible = false
    },
    async detail(id) {
      const res = await this.$http.get('/class-three-person-order/detail/' + id)
      if (res.status && res.data !== null) {
        this.form = res.data
      }
      this.detailVisible = true
    },
    @loading()
    async handleCancel(id) {
      const res = await this.$http.put(`/class-three-person-order/order-cancel/${id}`)
      if (res && res.status) {
        this.$message.success(res.message)
        this.getListOrders(this.$route.query.id)
        return
      }
      this.$message.error(res.message)
    },
    handleEdit(_row) {
      console.log(_row)
      this.orderEditVisible = true
      this.getListAssessorsByOrderId(_row.id)
    },
    async getListAssessorsByOrderId(id) {
      try {
        const res = await this.$http.get(`/class-three-personnel-order/list-assessors/${id}`)
        if (res && res.status) {
          this.listAssessors = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    confirmDelete(_row) {
      this.$confirm('确定要删除订单吗？(如果该订单下有入账或未最终通过的转账记录将一并删除，只保留已最终通过的转账记录。)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.handleDelete(_row)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    async handleDelete(_row) {
      try {
        const res = await this.$http.post('/' + _row.id)
        if (res.status) {
          this.$message.success(res.message)
          await this.getListOrders(this.$route.query.id / 1)
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 订单编辑确认
     */
    async editConfirm() {

    },
    /**
     * 订单编辑-删除评审人员
     */
    deleteAssessor(id) {
      const index = this.listAssessors.findIndex(item => item.id === id)
      index > -1 && this.listAssessors.splice(index, 1)
    },
    closeInnerDialog() {
      this.innerVisible = false
      this.type = 'all'
    },
    rowKey(row) {
      return row.id
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.type === 'all' && this.getWaitAssessor()
      if (this.type === 'selected') {
        let {pageSize, currentPage} = this.pageInfo
        console.log(this.pageInfo.currentPage)
        let startIndex = (currentPage - 1) * pageSize
        let endIndex = startIndex + pageSize
        this.selectedAssessorList = this.selectionList.slice(startIndex, endIndex)
      }
      this.type === 'unselected' && this.getUnselectedWaitAssessor()
    },
    getWaitAssessor(_pageSize) {
      let id = this.$route.query.id / 1
      let url = ``
      if (undefined !== _pageSize) {
        url = `/class-three-personnel/wait-assessor/${id}?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/class-three-personnel/wait-assessor/${id}?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url).then(res => {
        if (res.status) {
          this.selectedAssessorList = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    /**
     * 获取未选择三类人员人员
     */
    async getUnselectedWaitAssessor() {
      let {pageSize, currentPage,} = this.pageInfo
      let requestBody = {
        currentPage,
        pageSize,
        listSelectedIds: this.form.listSelectedIds
      }
      try {
        const res = await this.$http.post(`/class-three-personnel/unselected-wait-assessor/${this.form.id}`, requestBody)
        if (res.status) {
          this.selectedAssessorList = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
      this.form.listSelectedIds = []
      this.selectionList.forEach(item => {
        if (!this.form.listSelectedIds.includes(item.id)) {
          this.form.listSelectedIds.push(item.id)
        }
      })
    },
    // handleDelete(row) {
    //   this.$refs.table.toggleRowSelection(row)
    // },
    /**
     * 选择评审人员
     */
    selectAssessor() {
      this.innerVisible = true
      this.type = 'all'
      this.getWaitAssessor()
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-table-scrollbar";

.el-button--mini {
  padding: 5px 5px;
}

/deep/ .el-statistic .con {
  flex-direction: unset;
}

</style>
