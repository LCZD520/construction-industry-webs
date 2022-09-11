/**
* Created by Lv Cheng on 2022/6/17
* Notes 人才查询编辑
*/
<template>
  <div class="talent-query-edit">
    <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="120px"
        label-position="right">
      <el-form-item label="从人才资源选择">
        <el-button type="primary" size="small" @click="handleSelect">点击选择</el-button>
      </el-form-item>
      <el-form-item label="从已录人才选择">
        <el-button type="primary" size="small" @click="handleSelect2">点击选择</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item :error="errorMessage.fullName" prop="fullName" label="姓名">
            <el-input clearable class="width-full" placeholder="请输入姓名" v-model="form.fullName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :error="errorMessage.sex" prop="sex" label="性别">
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
          <el-form-item :error="errorMessage.area" prop="area" label="地区">
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
          <el-form-item :error="errorMessage.socialSecurity" prop="socialSecurity" label="社保">
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
            <el-input clearable class="width-full" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="qqNumber" label="QQ">
            <el-input clearable class="width-full" placeholder="请输入QQ" v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :error="errorMessage.education" prop="education" label="学历">
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
          <el-form-item :error="errorMessage.tenderExit" prop="tenderExit" label="招标出场">
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
      <el-divider content-position="left">三类人员</el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item :error="errorMessage.classThreePersonnel" prop="classThreePersonnel" label="三类人员">
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
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="issueCertTime" label="发证日期">
            <el-date-picker
                class="width-full"
                v-model="form.issueCertTime"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择三类人员发证日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="continuingEducationDate" label="继续教育日期">
            <el-date-picker
                class="width-full"
                v-model="form.continuingEducationDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择继续教育日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :error="errorMessage.listCertificates" prop="listCertificates" label="证书">
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
                      plain
                      @click.stop="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
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
          <el-form-item :error="errorMessage.certificateStatus" prop="certificateStatus" label="证书状态">
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
          <el-form-item prop="talentStatus" label="人才状态">
            <el-select clearable disabled class="width-full" v-model="form.talentStatus">
              <el-option
                  v-for="item in this.$store.state.talent_status_options"
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
          <el-form-item :error="errorMessage.talentPrice" prop="talentPrice" label="价格">
            <el-input-number
                clearable controls-position="right"
                v-model="form.talentPrice"/>
            &nbsp;元
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :error="errorMessage.talentPriceNumber" prop="talentPriceNumber" label-width="0">
            <el-input-number clearable controls-position="right" v-model="form.talentPriceNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :error="errorMessage.numberUnit" prop="numberUnit" label-width="0">
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
      <el-row>
        <el-col :span="24">
          <el-form-item prop="remark" label="备注">
            <el-input clearable v-model="form.remark" placeholder="请输入备注..." :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <TalentResourceSelectDialog
        :talent-list="talentList"
        :visible="visible"
        :dialog-title="dialogTitle"
        @closeDialog="visible = false"/>
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
import TalentResourceSelectDialog from "./talent-query-add/TalentResourceSelectDialog";
import CertificateAddDialog from "./talent-query-add/CertificateAddDialog";
import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'TalentQueryAdd',
  components: {CommonLoading, CertificateAddDialog, TalentResourceSelectDialog},
  data() {
    const certificateValidator = (rule, value, callback) => {
      if (this.form.listCertificates.length === 0) {
        callback(new Error('请选择证书!'))
      }
      callback()
    }
    return {
      loading: false,
      dialogTitle: '',
      dialogTitle2: '',
      mode: 'add',
      // 人才证书编辑当前index
      currentIndex: null,
      visible: false,
      visible2: false,
      rules: {
        fullName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        area: [
          {required: true, message: '请选择地区', trigger: 'change'}
        ],
        socialSecurity: [
          {required: true, message: '请选择社保', trigger: 'change'}
        ],
        telephoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'}
        ],
        qqNumber: [
          {required: false, trigger: 'blur'}
        ],
        education: [
          {required: true, message: '请选择学历', trigger: 'change'}
        ],
        title: [
          {required: false, trigger: 'blur'}
        ],
        classThreePersonnel: [
          {required: true, message: '请选择三类人员', trigger: 'change'}
        ],
        issueCertTime: [
          {required: false, trigger: 'blur'}
        ],
        continuingEducationDate: [
          {required: false, trigger: 'blur'}
        ],
        listCertificates: [
          {required: true, validator: certificateValidator, trigger: 'change'}
        ],
        tenderExit: [
          {required: true, message: '请选择招标出场', trigger: 'change'}
        ],
        certificateStatus: [
          {required: true, message: '请选择证书状态', trigger: 'change'}
        ],
        talentStatus: [
          {required: false, trigger: 'blur'}
        ],
        talentPrice: [
          {required: true, message: '请填写人才价格', trigger: 'blur'}
        ],
        talentPriceNumber: [
          {required: true, message: '请填写', trigger: 'blur'}
        ],
        numberUnit: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        remark: [
          {required: false, trigger: 'blur'}
        ],
      },
      form: {
        "talentId": null,
        "fullName": '',
        "sex": null,
        "area": '',
        "socialSecurity": '',
        "telephoneNumber": '',
        "qqNumber": '',
        "education": null,
        "title": null,
        "classThreePersonnel": null,
        "issueCertTime": null,
        "continuingEducationDate": null,
        "tenderExit": null,
        "certificateStatus": null,
        "talentStatus": 1,
        "talentPrice": undefined,
        "talentPriceNumber": undefined,
        "numberUnit": null,
        "remark": '',
        "listCertificates": []
      },
      certificateForm: {
        // "talentCertificateId": null,
        // "talentId": null,
        "levelMajor": null,
        "initialConversion": null,
        "issueCertTime": null,
        "continuingEducationDate": null
      },
      talentList: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      list1: [

      ],
      list2: [

      ],
      errorMessage: {
        "fullName": '',
        "sex": null,
        "area": '',
        "socialSecurity": '',
        "telephoneNumber": '',
        "qqNumber": '',
        "education": null,
        "title": null,
        "classThreePersonnel": null,
        "issueCertTime": null,
        "continuingEducationDate": null,
        "tenderExit": null,
        "certificateStatus": null,
        "talentStatus": null,
        "talentPrice": undefined,
        "talentPriceNumber": undefined,
        "numberUnit": null,
        "remark": '',
        "listCertificates": null
      }
    }
  },
  created() {
    if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
      this.getDetailById(this.$route.params.id / 1)
    }
  },
  methods: {
    /**
     * 根据id获取详情
     * @param _id
     */
    async getDetailById(_id) {
      this.loading = true
      try {
        const res = await this.$http.get('/talent/detail/' + _id)
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listCertificates.forEach(item => {
            item.levelMajor = JSON.parse(item.levelMajor)
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
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
        this.$refs.certificateAddDialog.$refs.formData.resetFields()
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
          return
        }
        this.$message.error('输入有误')
      })
    },
    async handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.listCertificates.forEach(item => {
            item.levelMajor = JSON.stringify(item.levelMajor)
          })
          this.loading = true
          try {
            const res = await this.$http.put('/talent/update', newForm)
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
            }
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
    handleSelect() {
      this.dialogTitle = '从人才资源选择'
      this.talentList = this.list1
      this.visible = true
    },
    handleSelect2() {
      this.dialogTitle = '从已录人才资源选择'
      this.talentList = this.list2
      this.visible = true
    },
    handleDelete(_index, _row) {
      if (this.form.listCertificates[_index] !== null) {
        this.form.listCertificates.splice(_index, 1)
      }
      console.log(_index, _row)
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
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.talent-query-edit {
  margin: 0 150px;

  .width-full {
    width: 100%;
  }
}

</style>
