/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才资源查看
*/
<template>
  <div class="talent-resources-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="资源是否共享">
            <el-radio-group disabled v-model="form.shared">
              <el-radio
                  v-for="item in this.$store.state.bool_options"
                  :key="item.value"
                  :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input disabled size="small" v-model="form.fullName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group disabled v-model="form.sex">
              <el-radio
                  v-for="item in this.$store.state.sex_options"
                  :key="item.value"
                  :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地区">
            <el-cascader
                disabled
                size="small"
                class="width-full"
                clearable
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder=" "
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="社保">
            <el-cascader
                disabled
                size="small"
                class="width-full"
                clearable
                placeholder=" "
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                :options="this.$provinceAndCityDataNull"
                v-model="form.socialSecurity">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话号码">
            <el-input disabled size="small" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ号码">
            <el-input disabled size="small" v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学历">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.education">
              <el-option
                  v-for="item in this.$store.state.education_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.title">
              <el-option
                  v-for="item in this.$store.state.title_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="三类人员">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.classThreePersonnel">
              <el-option
                  v-for="item in this.$store.state.class_three_personnel_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招标出场">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.tenderExit">
              <el-option
                  v-for="item in this.$store.state.tender_exit_options"
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
          <el-form-item prop="listCertificates" label="证书">
            <el-table
                size="mini"
                :data="form.listCertificates"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="200"
                  label="级别专业">
                <template slot-scope="scope">
                  {{ scope.row.levelMajor[0] }}&nbsp;-&nbsp;{{ scope.row.levelMajor[1] }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="200"
                  label="初始转注">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.initialConversion, $store.state.initial_conversion_options) }}
                </template>
              </el-table-column>
              <el-table-column
                  min-width="200"
                  prop="issueCertTime"
                  label="发证时间">
              </el-table-column>
              <el-table-column
                  min-width="200"
                  prop="continuingEducationDate"
                  label="继续教育时间（默认3年）">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证书状态">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.certificateStatus">
              <el-option
                  v-for="item in this.$store.state.certificate_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类型">
            <el-select placeholder=" " disabled class="width-full" size="small" v-model="form.talentType">
              <el-option
                  v-for="item in this.$store.state.customer_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="录入人">
            <el-input disabled size="small" :value="$valueToLabel(form.creatorId,this.$store.state.user_options)"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入时间">
            <el-date-picker
                class="width-full"
                disabled
                size="small"
                v-model="form.gmtCreate"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="价格">
            <span v-if="form.talentPrice !== null">
              {{ form.talentPrice }}&nbsp;元&nbsp;/&nbsp;{{ form.talentPriceNumber }}
            &nbsp;*&nbsp;
            {{ $valueToLabel(form.numberUnit, $store.state.number_unit_options) }}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="人才要求">
        <el-input disabled v-model="form.talentRequirement" :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="跟进情况">
        <el-input disabled v-model="form.followUpSituation" :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input disabled v-model="form.remark" :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TalentResourcesView',
  components: {},
  data() {
    return {
      form: {
        id: null,
        shared: null,
        fullName: null,
        sex: null,
        area: null,
        socialSecurity: null,
        telephoneNumber: null,
        qqNumber: null,
        education: null,
        title: null,
        classThreePersonnel: null,
        tenderExit: null,
        certificateStatus: null,
        talentType: null,
        talentPrice: null,
        talentPriceNumber: null,
        numberUnit: null,
        talentRequirement: null,
        followUpSituation: null,
        remark: null,
        listCertificates: []
      },
      columns: [
        {
          title: '级别专业',
          key: 'address'
        },
        {
          title: '初始转注',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间（默认3年）',
          key: 'address'
        },
      ],
    }
  },
  created() {
    if (this.$route.params.id !== null) {
      this.getDetailById(this.$route.params.id / 1)
    }
  },
  methods: {
    async getDetailById(_id) {
      try {
        const res = await this.$http.get('/talent-resource/detail/' + _id)
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listCertificates.forEach(item => {
            item.levelMajor = JSON.parse(item.levelMajor)
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.talent-resources-view {
  margin: 0 150px;
}

.description-item {
  display: inline-block;
  margin-right: 100px;
  font-size: 14px;
}

/deep/ .el-step__description {
  padding-right: 0;
}

.width-full {
  width: 100%;
}
</style>
