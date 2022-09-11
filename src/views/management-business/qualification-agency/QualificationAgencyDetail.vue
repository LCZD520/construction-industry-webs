/**
* Created by Lv Cheng on 2022/7/18
* Notes 资质代办详情
*/
<template>
  <div class="qualification-agency-detail">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-input disabled size="small" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资质">
            <el-select size="small" disabled v-model="form.enterpriseQualifications">
              <el-option
                  v-for="item in this.$store.state.enterprise_qualification_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地区">
            <el-input disabled size="small" v-model="this.$CodeToText[form.area]"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系地址">
            <el-input disabled size="small" v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业状态">
            <el-select size="small" disabled v-model="form.enterpriseStatus" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.enterprise_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人">
            <el-input disabled size="small" v-model="form.contacts"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select size="small" disabled v-model="form.sex" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.sex_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input disabled size="small" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-select disabled size="small" v-model="form.creatorId">
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
        <el-col :span="24">
          <el-form-item label=" " label-width="0">
            <el-table
                ref="table"
                :data="form.listEnterpriseDemands"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="270"
                  label="级别-专业-初/转">
                <template slot-scope="scope">
                  <el-tag size="mini" disable-transitions v-if="scope.row.levelMajorInitialConversion.length === 0"
                          type="info">未填
                  </el-tag>
                  <div
                      v-else
                      :style="{color: index % 2 === 1? '#409EFF' : '#F56C6C'}"
                      v-for="(item,index) in scope.row.levelMajorInitialConversion"
                      :key="index">
                    {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}
                    &nbsp;-&nbsp;
                    {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) }}
                  </div>
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
                  min-width="150"
                  label="招标出场">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}
                </template>
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
              <el-table-column
                  min-width="100"
                  label="统计人数">
                <template slot-scope="scope">
                  0&nbsp;/&nbsp;{{ scope.row.demandNumber }}
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="12">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
        <el-button icon="el-icon-edit" type="primary" size="small">
          编辑备注
        </el-button>
      </el-col>
      <el-col :span="10">
        <el-switch
            v-model="isShowDetail"
            inactive-text="显示业务信息">
        </el-switch>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px">
          <el-form-item label="备注">
            <el-input disabled placeholder="备注......" :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="人才订单" name="first">
        <transition appear name="public">
<!--          <TalentOrder-->
<!--              v-show="activeName === 'first'"-->
<!--              :list-enterprise-demands="form.listEnterpriseDemands"-->
<!--              :enterprise-status="form.enterpriseStatus"/>-->
        </transition>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        <transition appear name="public">

        </transition>
      </el-tab-pane>
      <el-tab-pane label="代办入账" name="third">
        <transition appear name="public">
<!--          <TransferApplication-->
<!--              v-show="activeName === 'third'"-->
<!--              :list-enterprise-demands="form.listEnterpriseDemands"/>-->
        </transition>
      </el-tab-pane>
      <el-tab-pane label="申请转账" name="fourth">
        <transition appear name="public">
<!--          <EnterpriseVisit v-show="activeName === 'fourth'"/>-->
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'QualificationAgencyDetail',
  components: {},
  data() {
    return {
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      isShowDetail: false,
      form: {
        area: '',
        contactAddress: '',
        contacts: '',
        enterpriseName: '',
        enterpriseQualifications: null,
        enterpriseStatus: 1,
        listEnterpriseDemands: [],
        qqNumber: null,
        sex: null,
        telephoneNumber: null,
        remark: ''
      },
      tableData: [
        {}
      ],
    }
  },
  created() {
    this.getDetailById(this.$route.query.id / 1)
  },
  methods: {
    /**
     * 根据id获取详情
     * @param _id
     */
    getDetailById(_id) {
      this.$http.get('/enterprise/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listEnterpriseDemands.forEach(item => {
            if (typeof item.levelMajorInitialConversion === 'string')
              item.levelMajorInitialConversion =
                  JSON.parse(item.levelMajorInitialConversion)
          })
        }
      })
    },
  },
  beforeUpdate() {
    if (this.$refs.table !== null) {
      this.$refs.table.doLayout()
    }
  }
}
</script>

<style scoped lang="less">

</style>
