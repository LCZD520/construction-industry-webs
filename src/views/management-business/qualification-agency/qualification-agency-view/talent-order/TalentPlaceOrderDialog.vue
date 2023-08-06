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
            <div v-for="(item,index) in this.$store.state.qualificationAgency.qualificationAgencyDemand"
                 :key="index">
              <el-divider>
                <h1 style="color: #1db7d5;font: 800 16px/1 'Microsoft Yahei'">{{ item.type }}</h1>
              </el-divider>
              <div
                  v-for="(subItem) in item.list"
                  :key="subItem.id">
                <!--                <el-descriptions-item label="级别专业">-->
                级别专业： <span style="color: #409EFF" v-for="(subItem2,index) in subItem.levelMajorInitialConversion"
                            :key="index">
                  {{ subItem2.levelMajor[0] }}&nbsp;-&nbsp;{{ subItem2.levelMajor[1] }}
                  &nbsp;-&nbsp;
                  {{ $valueToLabel(subItem2.initialConversion, $store.state.initial_conversion_options) }}，
                </span>
                <span v-if="subItem.tenderExit">
                  招标出场: {{ $valueToLabel(subItem.tenderExit, $store.state.tender_exit_options) }}，
                </span>
                需求人数: {{ subItem.demandNumber }}，
                企业出价: {{ subItem.talentPrice }}
                <br><br>
                <div>
                  <el-button type="primary" size="small" @click="selectTalent(subItem)">
                    选择人才
                  </el-button>
                  <span style="color: #45c0f6">&nbsp;&nbsp;已选&nbsp;
                      {{
                      listSelectedTalents.get(subItem.id) === undefined ?
                          0 : listSelectedTalents.get(subItem.id).length
                    }}&nbsp;人
                    </span>
                </div>
                <br>
                <el-table
                    :data="listSelectedTalents.get(subItem.id) === undefined ?
                                       [] : listSelectedTalents.get(subItem.id)"
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
                                        <span style="white-space:pre-line"
                                              v-for="(subItem,index) in scope.row.listCertificates"
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
                          @click.stop="cancelTalent(subItem.id,scope.row.id)">取消
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!--                </el-form-item>-->
                <!--              </el-descriptions>-->
                <br>
                <!--              <div v-for="subItem in item.list" :key="subItem.id">-->
                <!--                <el-button type="primary" size="small" @click="selectTalent(item.id,index)">-->
                <!--                  选择人才-->
                <!--                </el-button>-->
                <!--              </div>-->
              </div>
            </div>
            <el-form-item label="订单需求" prop="orderDemand">
              <el-input resize="none" v-model="form.orderDemand" placeholder="请输入订单需求......" :rows="5"
                        type="textarea">

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
                  ref="table"
                  :data="list"
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
      <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
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
      currentId: null,
      currentDemand: null,
      selectedTalentList: new Map(),
      listSelectedTalents: new Map(),
      form: {
        enterpriseId: null,
        enterpriseName: '',
        // orderStatus: 1,
        enterpriseDemandIds: [],
        selectedTalents: [],
        orderDemand: '',
        source: 'qualificationAgency',
      },
      talentForm: {
        fullName: '',
        area: '',
        levelMajor: '',
      },
      list: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    selectList() {
      return JSON.parse(JSON.stringify(this.list))
    },
    qualificationAgencyDetail() {
      return this.$store.state.qualificationAgency.qualificationAgencyDetail
    }
  },
  methods: {
    init() {
      this.$store.state.qualificationAgency.qualificationAgencyDemand.forEach(item => {
        item.list.forEach(subItem => {
          this.form.enterpriseDemandIds.push(subItem.id)
          this.selectedTalentList.set(subItem.id, [])
          this.listSelectedTalents.set(subItem.id, [])
        })
      })
      console.log(this.selectedTalentList)
      // let {id, enterpriseName} = this.$store.state.enterprise.enterpriseDetail
      // this.form.enterpriseId = id
      // this.form.enterpriseName = enterpriseName
    },
    /**
     * 确认订单
     */
    async confirmOrder() {
      console.log(this.listSelectedTalents, "listSelectedTalents")
      let list = []
      this.listSelectedTalents.forEach((v, k) => {
        // qualificationDemandId
        // console.log(v, k, "v,k")
        let newValue = JSON.parse(JSON.stringify(v))
        newValue.forEach(item => {
          item.qualificationAgencyDemandId = k
          item.talentId = item.id
          item.levelMajorInitialConversion = []
          item.enterpriseName = this.qualificationAgencyDetail.agencyCompany
          item.listCertificates.forEach(({levelMajor, initialConversion}) =>
              item.levelMajorInitialConversion.push({levelMajor, initialConversion})
          )
          item.levelMajorInitialConversion = JSON.stringify(item.levelMajorInitialConversion)
          let demand = this.$store.state.qualificationAgency.qualificationAgencyDemand.find(item => item.list.find(subItem => subItem.id === k))
          if (demand) {
            item.type = demand.enType
          }
        })
        list = list.concat(newValue)
      })
      console.log(this.qualificationAgencyDetail)
      if (Object.keys(this.qualificationAgencyDetail).length > 0) {
        this.form.enterpriseId = this.qualificationAgencyDetail.id
        this.form.enterpriseDemandIds = JSON.stringify(this.form.enterpriseDemandIds)
        this.form.enterpriseName = this.qualificationAgencyDetail.agencyCompany
        this.form.selectedTalents = list
      }
      console.log("聚合已选人才...", this.form)
      console.log(this.$store.state.qualificationAgency.qualificationAgencyDemand, "qualificationAgencyDemand")
      try {
        const res = await this.$http.post('/talent-order/qualification-agency-order', this.form)
        if (res.status) {
          this.$message.success(res.message)
          this.$emit('closeDialog')
          this.$parent.getListOrders(this.$route.query.id)
          return
        }
        if (res.code === "4000") {
          this.$message.warning(res.data[0].errorMessage)
          return
        }
        this.$notify({
          title: '警告',
          message: `${res.message}【${res.data}】`,
          type: 'warning',
          duration: 0
        });
      } catch (e) {
        console.log(e)
      }
    },
    handleSelect(_row) {
      _row.selected = true
      let isSelected = false
      for (let item of this.listSelectedTalents.values()) {
        const index = item.findIndex(item => item.id === _row.id)
        if (index > -1) {
          isSelected = true
          break
        }
      }
      if (isSelected) {
        this.$message.warning('人才已被选择！')
        return
      }
      this.listSelectedTalents.get(this.currentDemand.id).push(JSON.parse(JSON.stringify(_row)))
      console.log(this.listSelectedTalents)
      this.list = this.selectList
    },
    /**
     * 选择人才
     * @param item 资质代办需求
     */
    async selectTalent(item) {
      this.currentId = item.id
      this.currentDemand = JSON.parse(JSON.stringify(item))
      const {levelMajorInitialConversion, tenderExit} = JSON.parse(JSON.stringify(item))
      let obj = {
        levelMajorInitialConversion,
        tenderExit,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      }
      // console.log(obj)
      obj.levelMajorInitialConversion.forEach(item => item.levelMajor = JSON.stringify(item.levelMajor))
      try {
        const res = await this.$http.post('/talent/alternative-talents', obj)
        if (res && res.status) {
          res.data.list.forEach(item => {
            item.listCertificates.forEach(subItem => {
              subItem.levelMajor = JSON.parse(subItem.levelMajor)
            })
          })
          this.selectedTalentList.set(this.currentId, res.data.list)
          console.log(this.selectedTalentList)
          console.log(res.data.list)
          let newVar = []
          this.listSelectedTalents.forEach(item => {
            newVar = newVar.concat(item)
          })
          // const newVar = this.listSelectedTalents.get(this.currentId);
          console.log(newVar)
          res.data.list.forEach(item => {
            const index = newVar.findIndex(subItem => item.id === subItem.id)
            item.selected = index > -1
          })

          this.list = res.data.list
          // console.log(this.$refs.table)
          this.pageInfo.total = res.data.total
          this.$nextTick(() => {
            // this.$refs.table.tableData = this.selectedTalentList.get(this.currentId)
          })
        }
      } catch (e) {
        console.log(e)
      }
      this.innerVisible = true
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      console.log(this.currentDemand, "this.currentDemand")
      this.selectTalent(this.currentDemand)
    },
    cancelTalent(id, id2) {
      let list = this.listSelectedTalents.get(id)
      const index = list.findIndex(item => item.id === id2)
      index > -1 && list.splice(index, 1)
      this.innerVisible = true
      this.innerVisible = false
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-el-table-scrollbar";
@import "../../../../../assets/css/common-table-pagination";
</style>
