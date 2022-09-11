/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质代办查看
*/
<template>
  <div class="qualification-agency-view">
    <el-form disabled :model="form" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="代办公司" prop="agencyCompany">
            <el-input placeholder="请输入代办公司" v-model="form.agencyCompany"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式" prop="paymentWay">
            <el-input placeholder="请输入付款方式" v-model="form.paymentWay"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代办资质" prop="agencyQualification">
            <el-select multiple class="width-full" v-model="form.agencyQualification" placeholder="请选择资质需求">
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="代办金额" prop="agencyAmount">
            <el-input-number
                :precision="2"
                class="width-full" controls-position="right"
                :min="0" v-model="form.agencyAmount"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办理地区" prop="area">
            <el-cascader
                :popper-append-to-body="false"
                class="width-full" clearable
                ref="cascaderArea"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder="请选择地区"
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="人员所需清单" name="first">
          <!--          建造师-->
          <el-form-item label="建造师">
            <el-table
                :data="form.listConstructors"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="300"
                  label="级别专业-初/转">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.levelMajorInitialConversion" :key="index">
                    {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}
                    &nbsp;-&nbsp;
                    {{
                      $valueToLabel((item.initialConversion)
                          , $store.state.initial_conversion_options)
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="招标出场">
                <template slot-scope="scope">
                  {{
                    $valueToLabel((scope.row.tenderExit)
                        , $store.state.tender_exit_options)
                  }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="demandNumber"
                  label="需求人数">
              </el-table-column>
              <el-table-column
                  min-width="200"
                  label="金额">
                <template slot-scope="scope">
                  <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                  {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                  {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="200"
                  prop="remark"
                  label="备注">
              </el-table-column>
            </el-table>
          </el-form-item>
          <!--          工程师/三类人员/技术工种-->
          <el-form-item v-for="item in options" :key="item.type" :label="item.title">
            <el-table
                :data="form.listOtherPersons.filter(person=>person.type === item.type)"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="300"
                  label="级别专业-初/转">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.levelMajorInitialConversion" :key="index">
                    {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}
                    &nbsp;-&nbsp;
                    {{
                      $valueToLabel((item.initialConversion)
                          , $store.state.initial_conversion_options)
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="demandNumber"
                  label="需求人数">
              </el-table-column>
              <el-table-column
                  min-width="200"
                  label="金额">
                <template slot-scope="scope">
                  <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
                  {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
                  {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="200"
                  prop="remark"
                  label="备注">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注..." :rows="3" type="textarea">

            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人">
            <el-select class="width-full" disabled v-model="form.creatorId">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入时间">
            <el-date-picker
                class="width-full"
                disabled
                v-model="form.gmtCreate"
                type="datetime"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form :disabled="false">
        <el-form-item label=" " label-width="120px">
          <el-button icon="el-icon-back" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'QualificationAgencyView',
  components: {},
  data() {
    return {
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      isShowDetail: false,
      form: {
        agencyCompany: '',
        paymentWay: '',
        agencyQualification: [],
        area: '',
        agencyAmount: undefined,
        status: 1,
        remark: '',
        listConstructors: [],
        listOtherPersons: [],
      },
      options: [
        {
          title: '工程师',
          type: 1,
        },
        {
          title: '三类人员',
          type: 2,
        },
        {
          title: '技术工种',
          type: 3,
        },
      ],
    }
  },
  created() {
    if (this.$route.params.id !== null
        && this.$route.params.id !== undefined) {
      this.getQualificationAgencyById(this.$route.params.id / 1)
    }
  },
  methods: {
    getQualificationAgencyById(_id) {
      this.$http.get('/qualification-agency/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.agencyQualification =
              JSON.parse(this.form.agencyQualification)
          this.form.listConstructors.forEach(item => {
            if (typeof item.levelMajorInitialConversion === 'string') {
              item.levelMajorInitialConversion
                  = JSON.parse(item.levelMajorInitialConversion)
            }
          })
          this.form.listOtherPersons.forEach(item => {
            if (typeof item.levelMajorInitialConversion === 'string') {
              item.levelMajorInitialConversion
                  = JSON.parse(item.levelMajorInitialConversion)
            }
          })

          return
        }
        this.$message.error(res.message)
      })
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-agency-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
