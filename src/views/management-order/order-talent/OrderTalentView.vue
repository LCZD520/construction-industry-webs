/**
* Created by Lv Cheng on 2022/6/19
* Notes 人才订单查看
*/
<template>
  <div class="order-talent-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.orderno"/>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="企业名称">
            <el-input disabled placeholder="请输入客户名称" size="small" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单时间">
            <el-date-picker
                disabled
                class="width-full"
                size="small"
                v-model="form.gmtCreate"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态">
            <el-select disabled class="width-full" size="small" v-model="form.orderStatus">
              <el-option
                  v-for="item in $store.state.talent_order_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业录入人">
            <el-input
                disabled size="small"
                :value="this.$valueToLabel(form.creatorId, $store.state.user_options)"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同余额">
            <el-input
                disabled size="small"
                :value="computeBalance(form)"/>
            <el-statistic group-separator="," :precision="2" :value="computeBalance(form)"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同总价">
            <el-input
                disabled size="small"
                :value="totalEnterpriseOffer(form)"/>
            <el-statistic group-separator="," :precision="2" :value="totalEnterpriseOffer(form)"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已转金额">
            <el-input disabled size="small"
                      :value="totalEnterpriseOffer(form) - computeBalance(form)"/>
            <el-statistic group-separator="," :precision="2"
                          :value="totalEnterpriseOffer(form) - computeBalance(form)"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="企业需求">
        <el-table
            size="mini"
            :data="form.enterpriseDemands"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="260"
              label="级别-专业-初/转">
            <template slot-scope="scope">
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;
                        {{ subItem.levelMajor[1] }}&nbsp;-&nbsp;
                        {{ $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n' }}
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
              prop="demandNumber"
              label="需求人数">
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
      </el-form-item>
      <el-form-item label="已选人才">
        <el-table
            size="mini"
            :data="form.selectedTalents"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              prop="fullName"
              min-width="100"
              label="人才姓名">
          </el-table-column>
          <el-table-column
              min-width="100"
              label="三类人员">
            <template slot-scope="scope">
              {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}
            </template>
          </el-table-column>
          <el-table-column
              min-width="260"
              label="级别-专业-初/转">
            <template slot-scope="scope">
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;
                        {{ subItem.levelMajor[1] }}&nbsp;-&nbsp;
                        {{ $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n' }}
                      </span>
            </template>
          </el-table-column>
          <el-table-column
              min-width="180"
              label="企业合同价">
            <template slot-scope="scope">
              {{ scope.row.enterpriseOffer }}&nbsp;元&nbsp;/&nbsp;
              {{ scope.row.enterpriseOfferNumber }}&nbsp;*&nbsp;
              {{ $valueToLabel(scope.row.enterpriseOfferUnit, $store.state.number_unit_options) }}
            </template>
          </el-table-column>
          <el-table-column
              prop="contractBalance"
              min-width="100"
              label="合同余额">
          </el-table-column>
          <el-table-column
              min-width="180"
              label="人才价格">
            <template slot-scope="scope">
                      <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                        {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                        {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              min-width="110"
              label="人才公告时间">
          </el-table-column>
          <el-table-column
              min-width="140"
              label="企业合同到期时间">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="订单需求">
            <el-input resize="none" v-model="form.orderDemand" disabled :rows="5" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderTalentView',
  components: {},
  data() {
    return {
      form: {},
    }
  },
  computed: {
    computeBalance() {
      return (row) => {
        return (row.selectedTalents &&
            row.selectedTalents.map(item =>
                item.contractBalance)
                .reduce(item => item += item))
      }
    },
    totalEnterpriseOffer() {
      return (row) => {
        return (row.selectedTalents &&
            row.selectedTalents.map(item =>
                item.enterpriseOffer)
                .reduce(item => item += item))
      }
    }
  },
  created() {
    const id = this.$route.params.id
    id && !isNaN(id / 1) && this.detail(id / 1)
  },
  methods: {
    async detail(id) {
      const res = await this.$http.get(`/talent-order/detail/${id}`)
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
    },
    handleClick() {

    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.order-talent-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}

/deep/ .el-statistic .con {
  flex-direction: unset;
}
</style>
