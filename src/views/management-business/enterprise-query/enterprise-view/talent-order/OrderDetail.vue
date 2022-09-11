/**
* Created by Lv Cheng on 2022/7/11
* Notes 人才订单详情
*/
<template>
  <div class="order-detail">
    <el-dialog width="80%" title="人才订单" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-descriptions
                :label-style="{color:'#000',fontWeight:'bold',width:'100px',textAlign:'right'}"
                :column="3" border>
              <el-descriptions-item label="订单编号">
                {{ form.orderno }}
              </el-descriptions-item>
              <el-descriptions-item label="企业名称">
                {{ form.enterpriseName }}
              </el-descriptions-item>
              <el-descriptions-item label="订单时间">
                {{ form.gmtCreate }}
              </el-descriptions-item>
              <el-descriptions-item label="订单状态">
                {{ $valueToLabel(form.orderStatus, $store.state.talent_order_status_options) }}
              </el-descriptions-item>
              <el-descriptions-item label="企业录入人">
                {{ $valueToLabel(form.creatorId, $store.state.user_options) }}
              </el-descriptions-item>
            </el-descriptions>
            <el-form label-position="top" label-suffix="：" label-width="120">
              <el-form-item label="企业需求">
                <el-table
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
                      <span style="white-space:pre-line" v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
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
                    :data="form.selectedTalents"
                    stripe
                    border
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      prop="enterpriseName"
                      min-width="150"
                      label="企业名称">
                  </el-table-column>
                  <el-table-column
                      prop="fullName"
                      min-width="100"
                      label="人才姓名">
                  </el-table-column>
                  <el-table-column
                      label="地区">
                    <template slot-scope="scope">
                      <span> {{ $CodeToText[scope.row.area] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="260"
                      label="级别-专业-初/转">
                    <template slot-scope="scope">
                      <span style="white-space:pre-line" v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
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
              <el-form-item label="订单需求">
                <el-input resize="none" v-model="form.orderDemand" disabled :rows="5" type="textarea">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
