/**
* Created by Lv Cheng on 2022/6/20
* Notes 企业资源查看
*/
<template>
  <div class="enterprise-resources-view">
    <el-form disabled label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否共享">
            <el-radio-group v-model="form.shared">
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
          <el-form-item label="企业名称">
            <el-input v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业资质">
            <el-select class="width-full" v-model="form.enterpriseQualifications">
              <el-option
                  v-for="item in this.$store.state.enterprise_qualification_options"
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
          <el-form-item label="地区">
            <el-cascader
                class="width-full"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系地址">
            <el-input v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
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
          <el-form-item label="电话号码">
            <el-input class="width-full" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ号码">
            <el-input class="width-full" v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户类型">
            <el-select class="width-full" v-model="form.name">
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
        <el-col :span="24">
          <el-form-item label="企业需求">
            <el-table
                :data="form.listEnterpriseDemands"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="200"
                  label="级别专业-初转">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.levelMajorInitialConversion" :key="index">
                    {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}
                    - {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="跟进情况">
        <el-input v-model="form.followUpSituation" placeholder=" " :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder=" " :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form label-position="right" label-width="120px">
        <el-form-item label=" ">
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
  name: 'EnterpriseResourcesView',
  components: {},
  data() {
    return {
      form: {
        shared: null,
        area: null,
        contactAddress: null,
        contacts: null,
        customerType: null,
        enterpriseName: null,
        enterpriseQualifications: null,
        followUpSituation: null,
        id: null,
        listEnterpriseDemands: [],
        qqNumber: null,
        remark: null,
        sex: null,
        telephoneNumber: null,
      },
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
        const res = await this.$http.get('/enterprise-resource/detail/' + _id)
        if (res.status && res.data !== null) {
          this.form = res.data
          if (this.form.listEnterpriseDemands !== null) {
            this.form.listEnterpriseDemands.forEach(item => {
              item.levelMajorInitialConversion
                  = JSON.parse(item.levelMajorInitialConversion)
            })
          }
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

.enterprise-resources-view {
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
