/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才资源添加、编辑公共表单
*/
<template>
  <div class="talent-resources-add-edit">
    <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="资源是否共享" prop="shared" :error="errorMessage.shared">
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
          <el-form-item :error="errorMessage.fullName" prop="fullName" label="姓名">
            <el-input show-word-limit maxlength="10" clearable class="width-full" placeholder="请输入姓名" v-model.trim="form.fullName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sex" label="性别">
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
          <el-form-item prop="area" label="地区">
            <el-cascader
                class="width-full"
                clearable
                ref="cascaderArea"
                @expand-change="cascaderClick('area')"
                @visible-change="cascaderClick('area')"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder="请选择地区"
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="socialSecurity" label="社保">
            <el-cascader
                class="width-full"
                clearable
                ref="cascaderSocialSecurity"
                placeholder="请选择社保"
                @expand-change="cascaderClick('socialSecurity')"
                @visible-change="cascaderClick('socialSecurity')"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                :options="this.$provinceAndCityDataNull"
                v-model="form.socialSecurity">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :error="errorMessage.telephoneNumber" prop="telephoneNumber" label="电话号码">
            <el-input show-word-limit maxlength="11" placeholder="请输入电话号码" clearable class="width-full" v-model.trim="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="qqNumber" label="QQ">
            <el-input show-word-limit maxlength="12" clearable class="width-full" placeholder="请输入QQ" v-model.trim="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="education" label="学历">
            <el-select clearable class="width-full" v-model="form.education" placeholder="请选择学历">
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
          <el-form-item prop="title" label="职称">
            <el-select clearable class="width-full" v-model="form.title" placeholder="请选择职称">
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
          <el-form-item prop="classThreePersonnel" label="三类人员">
            <el-select clearable class="width-full" v-model="form.classThreePersonnel" placeholder="请选择三类人员">
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
          <el-form-item prop="tenderExit" label="招标出场">
            <el-select clearable class="width-full" v-model="form.tenderExit" placeholder="请选择招标出场">
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
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini"
                         @click="certificateAdd">
                添加
              </el-button>
            </div>
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
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      @click.stop="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      @click.stop="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="certificateStatus" label="证书状态">
            <el-select clearable class="width-full" v-model="form.certificateStatus" placeholder="请选择证书状态">
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
            <el-select class="width-full" v-model="form.talentType" placeholder="请选择客户类型">
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
      <el-row :gutter="10" style="width:1000px">
        <el-col :span="8">
          <el-form-item prop="talentPrice" label="价格">
            <el-input-number
                clearable controls-position="right"
                v-model="form.talentPrice"/>
            &nbsp;元
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="talentPriceNumber" label-width="0">
            <el-input-number clearable controls-position="right" v-model="form.talentPriceNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="numberUnit" label-width="0">
            <el-select clearable v-model="form.numberUnit" style="width: 120px;" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.number_unit_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="人才要求" prop="talentRequirement">
        <el-input show-word-limit maxlength="100" v-model.trim="form.talentRequirement" placeholder="请输入人才要求..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="跟进情况" prop="followUpSituation">
        <el-input show-word-limit maxlength="100" v-model.trim="form.followUpSituation" placeholder="请输入跟进情况..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input show-word-limit maxlength="100" v-model.trim="form.remark" placeholder="请输入备注..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" @click.stop="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <CertificateAddDialog
        :dialog-title="dialogTitle2"
        @handleConfirm="handleConfirm"
        ref="certificateAddDialog"
        :certificate-form="certificateForm"
        :visible="visible2"
        @closeDialog="closeAddDialog"/>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import CertificateAddDialog from "../../management-business/talent-query/talent-query-add/CertificateAddDialog";
import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'TalentResourcesAddEdit',
  components: {CommonLoading, CertificateAddDialog},
  props: {
    talentResourceMode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      dialogTitle2: '',
      visible2: false,
      loading: false,
      form: {
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
        talentPrice: undefined,
        talentPriceNumber: undefined,
        numberUnit: null,
        talentRequirement: null,
        followUpSituation: null,
        remark: null,
        listCertificates: []
      },
      mode: 'add',
      // 人才证书编辑当前index
      currentIndex: null,
      certificateForm: {
        "levelMajor": [],
        "initialConversion": null,
        "issueCertTime": null,
        "continuingEducationDate": null
      },
      rules: {
        shared: [
          {required: true, message: '请选择资源是否共享', trigger: 'change'}
        ],
        fullName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: false, message: '请选择性别', trigger: 'change'}
        ],
        area: [
          {required: false, message: '请选择地区', trigger: 'change'}
        ],
        socialSecurity: [
          {required: false, message: '请选择社保', trigger: 'change'}
        ],
        telephoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'}
        ],
        qqNumber: [
          {required: false, trigger: 'blur'}
        ],
        education: [
          {required: false, message: '请选择学历', trigger: 'change'}
        ],
        title: [
          {required: false, trigger: 'blur'}
        ],
        classThreePersonnel: [
          {required: false, message: '请选择三类人员', trigger: 'change'}
        ],
        issueCertTime: [
          {required: false, trigger: 'blur'}
        ],
        continuingEducationDate: [
          {required: false, trigger: 'blur'}
        ],
        listCertificates: [
          {required: false, trigger: 'change'}
        ],
        tenderExit: [
          {required: false, message: '请选择招标出场', trigger: 'change'}
        ],
        certificateStatus: [
          {required: false, message: '请选择证书状态', trigger: 'change'}
        ],
        talentStatus: [
          {required: false, trigger: 'blur'}
        ],
        talentPrice: [
          {required: false, message: '请填写人才价格', trigger: 'blur'}
        ],
        talentPriceNumber: [
          {required: false, message: '请填写', trigger: 'blur'}
        ],
        numberUnit: [
          {required: false, message: '请选择', trigger: 'change'}
        ],
        remark: [
          {required: false, trigger: 'blur'}
        ],
        talentRequirement: [
          {required: false, trigger: 'blur'}
        ],
        followUpSituation: [
          {required: false, trigger: 'blur'}
        ],
      },
      errorMessage: {
        "shared": '',
        "fullName": '',
        "telephoneNumber": ''
      },
    }
  },
  created() {
    if (this.talentResourceMode === 'edit'
        && this.$route.params.id !== null) {
      this.getDetailById(this.$route.params.id)
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
          if (this.form.talentPrice === null) {
            this.form.talentPrice = undefined
          }
          if (this.form.talentPriceNumber === null) {
            this.form.talentPriceNumber = undefined
          }
        }
      } catch (e) {
        console.log(e)
      }

    },
    handleDelete(_index, _row) {
      if (this.form.listCertificates[_index] !== null) {
        this.form.listCertificates.splice(_index, 1)
      }
      console.log(_index, _row)
    },
    closeAddDialog() {
      this.visible2 = false
      if (this.mode === 'add') {
        this.$refs.certificateAddDialog.$refs.formData.resetFields()
        // return
      }
    },
    /**
     * 添加证书
     */
    certificateAdd() {
      this.mode = 'add'
      this.dialogTitle2 = '添加证书'
      this.visible2 = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.certificateAddDialog.$refs.formData.resetFields()
        }, 0)
      })
    },
    /**
     * 编辑证书
     * @param _index
     * @param _row
     */
    handleEdit(_index, _row) {
      this.currentIndex = _index
      this.mode = 'edit'
      this.dialogTitle2 = '编辑证书'
      this.visible2 = true
      this.certificateForm = JSON.parse(JSON.stringify(_row))
    },
    /**
     * 添加/编辑证书确认
     * @param _form 编辑证书修改过的新数据
     */
    handleConfirm(_form) {
      this.$refs.certificateAddDialog.$refs.formData.validate(valid => {
        console.log(_form)
        if (valid) {
          this.visible2 = false
          if (this.mode === 'add') {
            this.form.listCertificates.push(
                JSON.parse(JSON.stringify(this.certificateForm)))
            this.$refs.certificateAddDialog.$refs.formData.resetFields()
            this.errorMessage.listCertificates = null
            return
          }
          this.$set(
              this.form.listCertificates
              , this.currentIndex
              , JSON.parse(JSON.stringify(_form)))
          this.certificateForm.levelMajor = []
          return
        }
        this.$message.error('输入有误')
      })
    },
    handleSubmit() {
      if (this.talentResourceMode === 'edit') {
        this.handleSaveOrUpdate()
        return
      }
      this.handleSave()
    },
    handleSave() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.listCertificates.forEach(item => {
            item.levelMajor = JSON.stringify(item.levelMajor)
          })
          this.loading = true
          try {
            const res = await this.$http.post('/talent-resource/insert', newForm)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            if (res.code === '4000') {
              res.data.forEach(k => {
                for (const kKey in this.errorMessage) {
                  if (kKey === k.errorField) {
                    this.errorMessage[kKey] = k.errorMessage
                  }
                }
              })
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false
          }
          return
        }
        this.$message.error('输入有误，请重新输入')
      })
    },
    handleSaveOrUpdate() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.listCertificates.forEach(item => {
            item.levelMajor = JSON.stringify(item.levelMajor)
          })
          this.loading = true
          try {
            const res = await this.$http.put('/talent-resource/update', newForm)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            if (res.code === '4000') {
              res.data.forEach(k => {
                for (const kKey in this.errorMessage) {
                  if (kKey === k.errorField) {
                    this.errorMessage[kKey] = k.errorMessage
                  }
                }
              })
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false
          }
          return
        }
        this.$message.error('输入有误，请重新输入')
      })
    },


    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            if (_type === 'socialSecurity') {
              that.$refs.cascaderSocialSecurity.dropDownVisible = false
            }
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea.dropDownVisible = false
                  return
                }
                if (_type === 'socialSecurity') {
                  that.$refs.cascaderSocialSecurity.dropDownVisible = false
                }
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.talent-resources-add-edit {
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
