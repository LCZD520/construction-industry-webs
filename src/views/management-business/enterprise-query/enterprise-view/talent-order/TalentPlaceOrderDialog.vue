/**
* Created by Lv Cheng on 2022/7/11
* Notes 人才订单下单弹窗
*/
<template>
  <el-dialog width="80%" title="人才订单" :visible.sync="outerVisible" :before-close="()=>this.$emit('closeDialog')">
    <div class="dialog-wrapper" style="height: 476px">
      <el-scrollbar style="height: 100%">
        <div class="dialog-content" style="margin-right: 10px">
          <el-form :model="form" label-width="120px" label-position="top">
            <div v-for="(item,index) in this.$store.state.enterprise.enterpriseDetail.listEnterpriseDemands"
                 :key="index">
              <el-descriptions
                  :label-style="{color:'#000',fontWeight:'bold',textAlign:'center'}" title="企业需求"
                  :content-style="{fontWeight:'bold',textAlign:'center'}"
                  :column="3" border>
                <el-descriptions-item label="级别专业">
                  <div v-for="(subItem,index) in item.levelMajorInitialConversion" :key="index">
                    {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                    &nbsp;-&nbsp;
                    {{ $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) }}
                  </div>
                </el-descriptions-item>
                <el-descriptions-item label="三类人员">
                  {{ $valueToLabel(item.classThreePersonnel, $store.state.class_three_personnel_options) }}
                </el-descriptions-item>
                <el-descriptions-item label="招标出场">
                  {{ $valueToLabel(item.tenderExit, $store.state.tender_exit_options) }}
                </el-descriptions-item>
                <el-descriptions-item label="企业出价">
                  {{ item.enterpriseOffer }}&nbsp;元&nbsp;/&nbsp;
                  {{ item.enterpriseOfferNumber }}&nbsp;*&nbsp;
                  {{ $valueToLabel(item.enterpriseOfferUnit, $store.state.number_unit_options) }}
                </el-descriptions-item>
                <el-descriptions-item label="市场开发费">
                  {{ item.marketDevelopmentFee }}&nbsp;/&nbsp;
                  {{ $valueToLabel(item.marketDevelopmentFeeUnit, $store.state.market_dev_fee_unit_options) }}
                </el-descriptions-item>
                <el-descriptions-item label="人数">
                  {{ item.demandNumber }}
                </el-descriptions-item>
              </el-descriptions>
              <br>
              <el-form-item>
                <div slot="label">
                  <el-button type="primary" size="small" @click="selectTalent(item.id,index)">
                    选择人才
                  </el-button>
                  <template v-if="selectedTalentList !== undefined">
                    <span style="color: #409EFF">&nbsp;&nbsp;已选&nbsp;{{
                        selectedTalentList[index] === [] ? ''
                            : selectedTalentList[index].filter(item => item.selected).length
                      }}&nbsp;人</span>
                  </template>
                </div>
                <el-table
                    :data="selectedTalentList[index] === undefined ?
                     [] : selectedTalentList[index].filter(item=>item.selected === true)"
                    stripe
                    border
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      prop="fullName"
                      label="姓名">
                  </el-table-column>
                  <el-table-column
                      label="地区">
                    <template slot-scope="scope">
                      <span> {{ $CodeToText[scope.row.area] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="200"
                      label="级别-专业-初/转">
                    <template slot-scope="scope">
                      <span style="white-space:pre-line" v-for="(subItem,index) in scope.row.listCertificates"
                            :key="index">
                      {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                      &nbsp;-&nbsp;
                      {{
                          $valueToLabel(subItem.initialConversion
                              , $store.state.initial_conversion_options) + '\n'
                        }}
                    </span>
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
                      min-width="150"
                      label="三类人员">
                    <template slot-scope="scope">
                      {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                      min-width="200"
                      label="报价">
                    <template slot-scope="scope">
                    <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                      {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                      {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}
                    </span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button
                          style="padding: 5px"
                          size="mini"
                          type="primary"
                          @click.stop="scope.row.selected = false">取消
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
            <el-form-item label="订单需求" prop="orderDemand">
              <el-input resize="none" v-model="form.orderDemand" placeholder="请输入订单需求......" :rows="5" type="textarea">

              </el-input>
            </el-form-item>
          </el-form>

          <!--      添加/编辑备选人才-->
          <el-dialog
              :close-on-click-modal="false"
              style="margin-top: 3vh"
              width="80%"
              title="备选人才"
              :visible.sync="innerVisible"
              append-to-body>
            <el-form
                label-position="right"
                label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="排序" prop="initialConversion">
                    <el-select
                        v-model="sort"
                        clearable
                        class="width-full"
                        placeholder="请选择">
                      <el-option
                          v-for="item in this.$store.state.initial_conversion_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: right">
                  <el-form-item label=" ">
                    <el-button size="small" icon="el-icon-refresh">重置</el-button>
                    <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table
                  size="mini"
                  :data="currentIndex === null
                    ? [] : selectedTalentList[currentIndex]"
                  height="300"
                  stripe
                  border
                  :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                  :cell-style="{textAlign:'center'}"
                  style="width: 100%">
                <el-table-column
                    prop="fullName"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    label="地区">
                  <template slot-scope="scope">
                    <span> {{ $CodeToText[scope.row.area] }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="200"
                    label="级别-专业-初/转">
                  <template slot-scope="scope">
                    <span style="white-space:pre-line" v-for="(subItem,index) in scope.row.listCertificates"
                          :key="index">
                      {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                      &nbsp;-&nbsp;
                      {{
                        $valueToLabel(subItem.initialConversion
                            , $store.state.initial_conversion_options) + '\n'
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="120"
                    label="招标出场">
                  <template slot-scope="scope">
                    {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="120"
                    label="三类人员">
                  <template slot-scope="scope">
                    {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="80"
                    label="职称">
                  <template slot-scope="scope">
                    {{ $valueToLabel(scope.row.title, $store.state.title_options) }}
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="80"
                    label="学历">
                  <template slot-scope="scope">
                    {{ $valueToLabel(scope.row.education, $store.state.education_options) }}
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="120"
                    label="报价">
                  <template slot-scope="scope">
                    <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                      {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                      {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                    min-width="200"
                    prop="gmtCreate"
                    label="录入时间">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button v-show="scope.row.selected" size="mini" disabled>已选</el-button>
                    <el-button
                        v-show="!scope.row.selected"
                        size="mini"
                        type="primary"
                        @click.stop="handleSelect(scope.row)">选择
                    </el-button>
                  </template>
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
                      @size-change="handleSizeChange"
                      background
                      layout="total, prev, pager, next,sizes, jumper"
                      :total="pageInfo.total">
                  </el-pagination>
                </div>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" type="primary" @click="innerVisible = false">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('closeDialog')">关闭</el-button>
      <el-button size="small" @click="clearSelection">清空已选人才</el-button>
      <el-button size="small" type="primary" v-throttle="confirmOrder">确定订单</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TalentPlaceOrderDialog',
  components: {},
  props: {
    outerVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      innerVisible: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      sort: null,
      currentIndex: null,
      selectedTalentList: [],
      form: {
        enterpriseId: null,
        enterpriseName: '',
        // orderStatus: 1,
        enterpriseDemandIds: [],
        selectedTalents: [],
        orderDemand: '',
      },
      talentForm: {
        fullName: '',
        area: '',
        levelMajor: '',
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$store.state.enterprise.enterpriseDetail.listEnterpriseDemands.forEach(() => {
        this.selectedTalentList.push([])
      })
      let {id, enterpriseName} = this.$store.state.enterprise.enterpriseDetail
      this.form.enterpriseId = id
      this.form.enterpriseName = enterpriseName
    },
    /**
     * 确认订单
     */
    async confirmOrder() {
      this.$store.state.enterprise.enterpriseDetail.listEnterpriseDemands.forEach(item => {
        this.form.enterpriseDemandIds.push(item.id)
      })
      // if (this.form.selectedTalents.length > 0) {
      this.selectedTalentList.forEach(item => {
        item.forEach(subItem => {
          console.log(subItem)
          if (subItem.selected) {
            let {
              id,
              enterpriseDemandId,
              fullName,
              area,
              classThreePersonnel,
              listCertificates,
              talentPrice,
              talentPriceNumber,
              numberUnit,
              enterpriseOffer,
              enterpriseOfferNumber,
              enterpriseOfferUnit,
              marketDevelopmentFee,
              marketDevelopmentFeeUnit,
            } = subItem
            this.form.selectedTalents.push({
              id
              , enterpriseDemandId
              , fullName
              , area
              , classThreePersonnel
              , listCertificates
              , talentPrice
              , talentPriceNumber
              , numberUnit
              , enterpriseOffer
              , enterpriseOfferNumber
              , enterpriseOfferUnit
              , marketDevelopmentFee
              , marketDevelopmentFeeUnit
            })
          }
        })
      })
      let newForm = JSON.parse(JSON.stringify(this.form))
      newForm.selectedTalents.forEach(item => {
        item.talentId = item.id
        item.enterpriseName = this.form.enterpriseName
        delete item.id
        let arr = []
        item.listCertificates.forEach(subItem => {
          let levelMajorInitialConversion = {
            levelMajor: subItem.levelMajor,
            initialConversion: subItem.initialConversion,
          }
          arr.push(levelMajorInitialConversion)
        })
        item.levelMajorInitialConversion = JSON.stringify(arr)
        delete item.listCertificates
      })
      newForm.enterpriseDemandIds = JSON.stringify(newForm.enterpriseDemandIds)
      console.log(newForm)
      try {
        const res = await this.$http.post('/talent-order/insert', newForm)
        if (res.status) {
          this.$message.success(res.message)
          this.$emit('closeDialog')
          this.$emit('getListOrders')
        }
      } catch (e) {
        console.log(e)
      }
      //   return
      // }
      // this.$message.warning('请选择人才')
    },
    handleSelect(_row) {
      _row.selected = true
      let index = this.selectedTalentList[this.currentIndex].findIndex(item => item.id === _row.id)
      this.$set(this.selectedTalentList[this.currentIndex]
          , index, JSON.parse(JSON.stringify(_row))
      )
    },
    /**
     * 选择人才
     * @param _id 企业需求id
     * @param _index
     */
    async selectTalent(_id, _index) {
      this.currentIndex = _index
      if (this.selectedTalentList[this.currentIndex].length === 0) {
        const res = await this.$http.get('/talent/list/candidate-talent/' + _id, {
          params: {
            currentPage: this.pageInfo.currentPage,
            pageSize: this.pageInfo.pageSize
          }
        })
        if (res.status && res.data !== null) {
          this.selectedTalentList[this.currentIndex] = res.data.list
          this.selectedTalentList[this.currentIndex].forEach(item => {
            item.listCertificates.forEach(subItem => {
              subItem.levelMajor = JSON.parse(subItem.levelMajor)
            })
          })
          this.selectedTalentList[this.currentIndex].forEach(item => {
            let {
              id,
              enterpriseOffer,
              enterpriseOfferNumber,
              enterpriseOfferUnit,
              marketDevelopmentFee,
              marketDevelopmentFeeUnit
            } = this.$store.state.enterprise.enterpriseDetail.listEnterpriseDemands[this.currentIndex]
            item.enterpriseDemandId = id
            item.enterpriseOffer = enterpriseOffer
            item.enterpriseOfferNumber = enterpriseOfferNumber
            item.enterpriseOfferUnit = enterpriseOfferUnit
            item.marketDevelopmentFee = marketDevelopmentFee
            item.marketDevelopmentFeeUnit = marketDevelopmentFeeUnit
            item.selected = false
          })
        }
      }
      this.innerVisible = true
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {

    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      console.log(_pageSize)
    },
    /**
     * 清空已选人才
     */
    clearSelection() {
      this.selectedTalentList.forEach(item => {
        item.forEach(subItem => {
          subItem.selected = false
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-el-table-scrollbar";
@import "../../../../../assets/css/common-table-pagination";
</style>
