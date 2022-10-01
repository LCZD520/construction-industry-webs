/**
* Created by Lv Cheng on 2022/7/11
* Notes 人才订单
*/
<template>
  <div class="talent-order">
    <template
        v-if="this.$store.state.enterprise.enterpriseDetail.enterpriseStatus !== 3
        && this.$store.state.enterprise.enterpriseDetail.enterpriseStatus !== null">
      <el-button type="primary" size="small" @click="handlePlaceOrder">
        下单
      </el-button>
      <el-button type="primary" size="small" v-throttle="mergeOrder">
        合并订单
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
          prop="orderno"
          label="订单编号">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="enterpriseName"
          label="人才选择">
        <template slot-scope="scope">
          <p v-for="item in scope.row.selectedTalents" :key="item.id">
            {{ item.fullName }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="订单时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="订单状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.orderStatus, $store.state.talent_order_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              v-if="scope.row.orderStatus === 2"
              size="mini"
              type="primary"
              @click="entry(scope.row)">入账
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="detail(scope.row)">详情
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="confirmDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <TalentPlaceOrderDialog
        @getListOrders="getListOrders($route.query.id/1)"
        @closeDialog="outerVisible = false"
        :outer-visible="outerVisible"/>
    <OrderDetail
        :form="form"
        @closeDialog="detailVisible = false"
        :visible="detailVisible"/>
    <OrderEntry
        ref="orderEntry"
        :selected-talents="selectedTalents"
        @closeDialog="closeOrderEntryDialog"
        :visible="orderEntryVisible"/>
  </div>
</template>

<script>
import TalentPlaceOrderDialog from "./TalentPlaceOrderDialog";
import OrderDetail from "./OrderDetail";
import OrderEntry from "./OrderEntry";

export default {
  name: 'TalentOrder',
  components: {OrderEntry, OrderDetail, TalentPlaceOrderDialog},
  data() {
    return {
      // 订单详情弹窗是否可见
      detailVisible: false,
      outerVisible: false,
      // 订单入账
      orderEntryVisible: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      selectedTalents: [],
      form: {},
      talentOrderId: null
    }
  },
  created() {
    if (this.$route.query.id !== undefined
        && this.$route.query.id !== null) {
      this.getListOrders(this.$route.query.id / 1)
    }
  },
  methods: {
    /**
     * 合并订单
     */
    async mergeOrder() {
      let id = this.$route.query.id / 1
      if (this.list.length > 0) {
        try {
          const res = await this.$http.put('/talent-order/merge-order/' + id)
          if (res.status) {
            this.$message.success(res.message)
            await this.getListOrders(id)
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message.warning('没有要合并的订单！')
      }
    },
    closeOrderEntryDialog() {
      this.orderEntryVisible = false
      this.$refs.orderEntry.$refs.form.resetFields()
    },
    async getListOrders(_id) {
      const res = await this.$http.get('/talent-order/list/' + _id, {
        params: {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }
      })
      if (res.status && res.data !== null) {
        this.list = res.data.list
        this.list.forEach(item => {
          item.selectedTalents.forEach(subItem => {
            subItem.levelMajorInitialConversion
                = JSON.parse(subItem.levelMajorInitialConversion)
          })
        })
      }
    },
    /**
     * 入账
     */
    async entry(_row) {
      this.talentOrderId = _row.id
      const res = await this.$http.get('/talent-order/list-selected-talent/' + _row.id)
      if (res.status && res.data !== null) {
        this.selectedTalents = res.data
        this.selectedTalents.forEach(item => {
          item.levelMajorInitialConversion
              = JSON.parse(item.levelMajorInitialConversion)
        })
      }
      this.orderEntryVisible = true
    },
    handlePlaceOrder() {
      this.outerVisible = true
    },
    handleSubmit() {
      this.outerVisible = false
    },
    async detail(_row) {
      const res = await this.$http.get('/talent-order/detail/' + _row.id)
      console.log(res)
      if (res.status && res.data !== null) {
        this.form = res.data
        this.form.enterpriseDemands.forEach(item => {
          item.levelMajorInitialConversion
              = JSON.parse(item.levelMajorInitialConversion)
        })
        this.form.selectedTalents.forEach(item => {
          item.levelMajorInitialConversion
              = JSON.parse(item.levelMajorInitialConversion)
        })
      }
      this.detailVisible = true

    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
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
  }
}
</script>

<style scoped lang="less">

</style>
