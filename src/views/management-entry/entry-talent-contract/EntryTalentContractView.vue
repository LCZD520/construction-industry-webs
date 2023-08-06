/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才合同价入账查看
*/
<template>
  <div class="entry-talent-contract-view">
    <el-form disabled label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input size="small" :value="form.talentOrder.orderno">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-input size="small" :value="form.talentOrder.enterpriseName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业录入人">
            <el-select class="width-full" disabled size="small" v-model="form.creatorId">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业合同价">
            <el-input size="small" :value="enterprisePrice">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才姓名">
            <el-input size="small" v-model="form.fullName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才录入人">
            <el-select class="width-full" disabled size="small" v-model="form.creatorId">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="人才价格">
            <el-input size="small" :value="talentPrice">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input size="small" v-model="form.entryAmount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select class="width-full" size="small" v-model="form.fundsPurpose">
              <el-option
                  v-for="item in $store.state.order_entry_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="转账方信息">
            <el-input size="small" v-model="form.talentEntry.transferorInfo">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方式">
            <el-select class="width-full" size="small" v-model="form.talentEntry.transferWay">
              <el-option
                  v-for="item in $store.state.order_transfer_way_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司账户">
            <!--            <el-input size="small" v-model="form.talentEntry.enterpriseAccountId">-->
            <!--            </el-input>-->
            <el-select class="width-full" size="small" v-model="form.talentEntry.enterpriseAccountId">
              <el-option
                  v-for="item in $store.state.listCompanyAccounts"
                  :key="item.enterpriseAccountId"
                  :label="item.accountName"
                  :value="item.enterpriseAccountId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="到账日期">
            <el-date-picker
                class="width-full"
                v-model="form.talentEntry.transferDate"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-select class="width-full" disabled size="small" v-model="form.creatorId">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
                class="width-full"
                v-model="form.gmtCreate"
                size="small"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-select class="width-full" size="small" v-model="form.status">
              <el-option
                  v-for="item in $store.state.talent_entry_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">历史记录</el-divider>
      <p>
        企业合同价入账记录
        <span style="color:#409EFF;display:inline-block;margin-left: 20px">
          已通过:{{ amountPassed }} 待申请:{{ form.enterpriseOffer - amountPassed }}
        </span>
      </p>
      <br>
      <el-table
          :data="form.listTalentEntryRecords"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="180"
            prop="gmtCreate"
            label="申请时间">
        </el-table-column>
        <el-table-column
            min-width="180"
            prop="entryAmount"
            label="申请入账金额">
        </el-table-column>
        <el-table-column
            min-width="180"
            label="款项用途">
          <template slot-scope="scope">
            {{ $valueToLabel(scope.row.fundsPurpose, $store.state.order_entry_options) }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="180"
            label="入账方信息">
          <template slot-scope="scope">
            {{ scope.row.talentEntry.transferorInfo }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="150"
            label="入账日期">
          <template slot-scope="scope">
            {{ scope.row.talentEntry.transferDate }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="150"
            label="申请状态">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="scope.row.status === 1 ? 'info'
              : scope.row.status === 2 ? 'success' : 'danger' "
                    size="mini">
              {{ $valueToLabel(scope.row.status, $store.state.talent_entry_status_options) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form-item label="审批意见" v-if="edit!=='edit'">
        <el-input v-model="form.approvalOpinion" :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form :disabled="false" v-if="edit!=='edit'">
        <el-form-item label=" ">
          <el-button icon="el-icon-back" size="small" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-form>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'EntryTalentContractView',
  components: {CommonLoading},
  props: {
    edit: {
      type: String,
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        listTalentEntryRecords: [],
        talentEntry: {},
        talentOrder: {},
      },
    }
  },
  created() {
    if (this.$route.params.id !== undefined
        && this.$route.params.id !== null) {
      this.getDetailById(this.$route.params.id / 1)
    }
  },
  computed: {
    enterprisePrice() {
      let {enterpriseOffer, enterpriseOfferNumber, enterpriseOfferUnit}
          = this.form
      return enterpriseOffer + ' / '
          + enterpriseOfferNumber
          + ' * ' + this.$valueToLabel(enterpriseOfferUnit
              , this.$store.state.number_unit_options)
    },
    talentPrice() {
      let {talentPrice, talentPriceNumber, numberUnit}
          = this.form
      return talentPrice + ' / '
          + talentPriceNumber
          + ' * ' + this.$valueToLabel(numberUnit
              , this.$store.state.number_unit_options)
    },
    amountPassed() {
      if (this.form.listTalentEntryRecords.length > 0) {
        let arr = this.form.listTalentEntryRecords.filter(item => item.status === 2)
        return arr.reduce((prev, current) => {
          if (current.status === 2) {
            return prev + current.entryAmount
          }
        }, 0)
      }
      return 0
    },
  },
  methods: {
    async getDetailById(_id) {
      this.loading = true
      try {
        const res = await this.$http.get('/talent-entry-record/detail/' + _id)
        if (res.status && res.data !== null) {
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.entry-talent-contract-view {
  margin: 0 100px;
}
</style>
