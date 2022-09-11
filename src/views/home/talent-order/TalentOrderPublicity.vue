/**
* Created by Lv Cheng on 2022/7/25
* Notes  人才订单公示
*/
<template>
  <div class="talent-order-publicity">
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.talentOrder.orderno }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="fullName"
          label="人才名称">
      </el-table-column>
      <el-table-column
          min-width="260"
          label="级别-专业-初/转">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.levelMajorInitialConversion" :key="index">
            {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}&nbsp;-&nbsp;
            {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) }}
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
          <span> {{ $valueToLabel(scope.row.talentOrder.orderStatus, $store.state.talent_order_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="三类人员">
        <template slot-scope="scope">
          <span> {{
              $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options)
            }}</span>
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
          min-width="700"
          label="订单需求">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.talentOrder.enterpriseDemands" :key="index">
              <span v-for="(subItem,index) in item.levelMajorInitialConversion" :key="index">
                {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}-
                {{ $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) }}
              </span>，
            {{ $valueToLabel(item.classThreePersonnel, $store.state.class_three_personnel_options) }}，
            {{ $valueToLabel(item.tenderExit, $store.state.tender_exit_options) }}，
            {{ item.demandNumber }}，
            <span> {{ item.enterpriseOffer }}元&nbsp;/&nbsp;
              {{ item.enterpriseOfferNumber }}&nbsp;*&nbsp;
              {{ $valueToLabel(item.enterpriseOfferUnit, $store.state.number_unit_options) }}
            </span>
            {{ $valueToLabel(item.title, $store.state.title_options) }}，
            {{ $valueToLabel(item.education, $store.state.education_options) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
              size="mini"
              icon="el-icon-check"
              type="primary"
              @click="handleConfirm(scope.row)">确认
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div class="pagination-total">共<span class="total"> {{ pageInfo.total }} </span>条</div>
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalentOrderPublicity',
  components: {},
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(_pageSize) {
      this.loading = true
      try {
        const res = await this.$http.get('/order-selected-talent/list', {
          params: {
            currentPage: this.pageInfo.currentPage,
            pageSize: _pageSize === undefined ? this.pageInfo.pageSize : _pageSize
          }
        })
        if (res.status && res.data !== null) {
          this.list = res.data.list
          this.list.forEach(item => {
            item.levelMajorInitialConversion
                = JSON.parse(item.levelMajorInitialConversion)
            item.talentOrder.enterpriseDemands.forEach(subItem => {
              subItem.levelMajorInitialConversion
                  = JSON.parse(subItem.levelMajorInitialConversion)
            })
          })
          this.pageInfo.total = res.data.total
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
      this.getList()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.getList(_pageSize)
    },
    async handleConfirm(_row) {
      this.loading = true
      try {
        const res = await this.$http.put('/order-selected-talent/confirm/' + _row.id)
        if (res.status) {
          this.$message.success(res.message)
          await this.getList()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },

}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
</style>
