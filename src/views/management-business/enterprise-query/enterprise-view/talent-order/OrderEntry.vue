/**
* Created by Lv Cheng on 2022/7/11
* Notes 订单入账
*/
<template>
  <div class="order-entry">
    <el-dialog width="80%" title="入账" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form :model="form" :rules="rules" ref="form" label-position="right" size="small" label-width="120px">
              <el-form-item label=" " label-width="0">
                <el-table
                    :data="list"
                    stripe
                    border
                    @selection-change="selectionChange"
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      type="selection"
                      :selectable="isCanSelect"
                      width="55">
                  </el-table-column>
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
                      <span style="white-space:pre-line"
                            v-for="(subItem,index) in scope.row.levelMajorInitialConversion"
                            :key="index">
                        {{ subItem.levelMajor | levelMajor }}
                        &nbsp;-&nbsp;{{
                          subItem.initialConversion ? $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n' : '无\n'
                        }}
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
                  <el-table-column
                      min-width="140"
                      label="是否确认">
                    <template slot-scope="scope">
                      {{ scope.row.confirmed ? '是' : '否' }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="入账">
                    <el-select @change="handleChange" class="width-full" v-model="entry">
                      <el-option
                          v-for="item in this.$store.state.order_entry_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="center">
                <span style="font:800 16px/1 'Microsoft Yahei'">
                  企业转入登记
                </span>
              </el-divider>
              <el-form-item label=" " label-width="0" prop="listEntrys">
                <el-table
                    ref="table"
                    :data="selection"
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
                      label="本次转入金额">
                    <template slot-scope="scope">
                      <el-input-number
                          :min="0"
                          @change="inputChange(scope.$index)"
                          controls-position="right"
                          :max="scope.row.contractBalance"
                          v-model.trim="scope.row.entryAmount"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      label="转账用途">
                    <template slot-scope="scope">
                      <el-select @change="inputChange(scope.$index)"
                                 class="width-full"
                                 v-model="scope.row.fundsPurpose">
                        <el-option
                            v-for="item in $store.state.order_entry_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      label="其他补贴费用">
                    <template slot-scope="scope">
                      <el-input-number
                          :min="0"
                          @change="inputChange(scope.$index)"
                          controls-position="right"
                          v-model.trim="scope.row.otherFee"/>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="企业入账信息">
                <el-button type="primary" size="small" @click="select">从入账管理中获取</el-button>
              </el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="转账方信息" prop="transferorInfo">
                    <el-input class="width-full" v-model="form.transferorInfo" placeholder="请输入转账方信息">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转账方式" prop="transferWay">
                    <el-select class="width-full" v-model="form.transferWay">
                      <el-option
                          v-for="item in $store.state.order_transfer_way_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="公司账户" prop="enterpriseAccountId">
                    <el-select class="width-full" v-model="form.enterpriseAccountId">
                      <el-option
                          v-for="item in $store.state.listCompanyAccounts"
                          :key="item.enterpriseAccountId"
                          :label="item.accountName"
                          :value="item.enterpriseAccountId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转账日期" prop="transferDate">
                    <el-date-picker
                        class="width-full"
                        v-model="form.transferDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择转账日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" size="small" v-throttle="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
    <EnterpriseCooperationDialog
        @confirm="confirm"
        dialog-title="入账管理" v-if="innerVisible" :visible="innerVisible"/>
  </div>
</template>

<script>


import EnterpriseCooperationDialog
  from "./EnterpriseCooperationDialog";

export default {
  name: 'OrderEntry',
  components: {EnterpriseCooperationDialog},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectedTalents: {
      type: Array,
      required: true
    },
  },
  data() {
    const listEntrysValidator = (rule, value, callback) => {
      if (this.form.listEntrys.length === 0) {
        callback(new Error('至少选择一个人才入账!'))
      }
      this.form.listEntrys.forEach(item => {
        if (item.entryAmount === null
            || item.entryAmount === undefined) {
          callback(new Error('转入金额不能为空'))
        }
      })
      callback()
    }
    return {
      innerVisible: false,
      form: {
        talentOrderId: null,
        transferorInfo: '',
        transferWay: null,
        enterpriseAccountId: null,
        transferDate: null,
        listEntrys: []
      },
      entry: 1,
      selection: [],
      rules: {
        transferorInfo: [
          {required: true, message: '转账方信息不能为空', trigger: 'blur'}
        ],
        transferWay: [
          {required: true, message: '转账方式不能为空', trigger: 'change'}
        ],
        enterpriseAccountId: [
          {required: true, message: '公司账户不能为空', trigger: 'change'}
        ],
        transferDate: [
          {required: true, message: '转账日期不能为空', trigger: 'change'}
        ],
        listEntrys: [
          {validator: listEntrysValidator, trigger: 'submit'}
        ],
      }
    }
  },
  computed: {
    list() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.selectedTalents.forEach(item => {
        item.fundsPurpose = 1
        item.entryAmount = undefined
        item.otherFee = undefined
        this.form.talentOrderId = item.talentOrderId
      })
      return this.selectedTalents
    }
  },
  mounted() {

  },
  methods: {
    confirm(data) {
      this.innerVisible = false
      console.log(data, "data")
      this.form.transferDate = data.transferDate
      this.form.transferorInfo = data.transferorInfo
      this.form.enterpriseAccountId = data.enterpriseAccountId
      this.form.transferWay = data.transferWay
    },
    select() {
      this.innerVisible = true
    },
    handleChange(val) {
      this.selection.forEach(item => item.fundsPurpose = val)
    },
    inputChange(_index) {
      this.$set(this.selection, _index, this.selection[_index])
    },
    isCanSelect(_row) {
      return _row.confirmed;
    },
    handleSubmit() {
      this.form.listEntrys = JSON.parse(JSON.stringify(this.selection))
      this.form.listEntrys.forEach(item => {
        delete item.id
        delete item.area
        delete item.creatorId
        delete item.enterpriseName
        delete item.gmtCreate
        delete item.gmtModified
        delete item.levelMajorInitialConversion
        delete item.marketDevelopmentFee
        delete item.marketDevelopmentFeeUnit
        delete item.regeneratorId
        delete item.talentOrder
        delete item.classThreePersonnel
        delete item.confirmed
      })
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('/talent-entry/insert', this.form)
            if (res.status) {
              this.$message.success(res.message)
              this.$emit('closeDialog')
            }
          } catch (e) {
            console.log(e)
          }
          return
        }
        this.$message.error('输入有误')
      })
    },
    selectionChange(selection) {
      this.selection = selection
    }
  },
}
</script>

<style scoped lang="less">

</style>
