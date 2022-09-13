/**
* Created by Lv Cheng on 2022/7/18
* Notes 资质代办详情
*/
<template>
  <div class="qualification-agency-detail">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办公司">
            <el-input disabled size="small" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              prop="area"
              label="办理地区">
            <el-cascader
                size="small"
                disabled
                class="width-full"
                ref="cascaderArea"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder=""
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled size="small" v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式">
            <el-input disabled size="small" v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="代办资质">
        <el-select class="width-full" size="small" placeholder="" disabled v-model="form.enterpriseQualifications">
          <el-option
              v-for="item in this.$store.state.enterprise_qualification_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
  // beforeUpdate() {
  //   if (this.$refs.table !== null) {
  //     this.$refs.table.doLayout()
  //   }
  // }
}
</script>

<style scoped lang="less">

</style>
