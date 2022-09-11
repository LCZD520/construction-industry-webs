/**
* Created by Lv Cheng on 2022/6/19
* Notes 职称评审添加、编辑公共组件
*/
<template>
  <div class="title-evaluation-add-edit-common-form">
    <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="120px" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户类型" prop="customerType">
            <el-radio-group v-model="form.customerType">
              <el-radio
                  @change="val=> val === 2 ? form.principal = '' : ''"
                  v-for="item in this.$store.state.title_customer_type_options"
                  :key="item.value"
                  :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称" prop="customerName">
            <el-input
                clearable
                placeholder="请输入客户名称"
                v-model.trim="form.customerName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.customerType === 1">
          <el-form-item label="负责人" prop="principal">
            <el-input clearable placeholder="请输入负责人" v-model.trim="form.principal"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="telephoneNumber">
            <el-input clearable placeholder="请输入联系电话" v-model.trim="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评审人员信息" prop="listAssessors">
        <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
          <el-button icon="el-icon-plus" type="primary" v-throttle="prevAdd" size="mini">
            添加
          </el-button>
          <el-button icon="el-icon-paperclip" type="primary" size="mini">
            批量导入
          </el-button>
          <el-button icon="el-icon-download" type="primary" size="mini">
            下载导入模板
          </el-button>
        </div>
        <el-table
            size="mini"
            :data="form.listAssessors"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}">
          <el-table-column
              min-width="180"
              prop=""
              label="姓名">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="招标出场">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="评审专业">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="评审职称">
            <template slot-scope="scope">
              <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="代办金额">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="评审费用">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="性别">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="身份证">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="学历">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="毕业专业">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="证书性质">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop=""
              label="鉴定方式">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
                maxlength="100"
                show-word-limit
                v-model.trim="form.remark"
                clearable placeholder="请输入备注..."
                :rows="5" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" v-throttle="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <!--    添加/编辑评审人员-->
    <el-dialog
        :close-on-click-modal="false"
        width="70%" :title="dialogTitle"
        :before-close="beforeClose"
        :visible.sync="visible">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form
                ref="innerForm" :model="innerForm" :rules="innerRules" size="small" label-position="right"
                label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名" prop="fullName">
                    <el-input clearable placeholder="请输入姓名" v-model.trim="innerForm.fullName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="sex">
                    <el-select clearable class="width-full" v-model="innerForm.sex" placeholder="请选择性别">
                      <el-option
                          v-for="item in this.$store.state.sex_options"
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
                  <el-form-item label="身份证" prop="identityCard">
                    <el-input maxlength="18" clearable placeholder="请输入身份证" v-model.trim="innerForm.identityCard"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学历" prop="education">
                    <el-select clearable class="width-full" v-model="innerForm.education" placeholder="请选择学历">
                      <el-option
                          v-for="item in this.$store.state.education_options"
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
                  <el-form-item label="毕业专业" prop="graduationMajor">
                    <el-input clearable placeholder="请输入毕业专业" v-model.trim="innerForm.graduationMajor"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="评审专业" prop="evaluationMajor">
                    <el-input clearable placeholder="请输入评审专业" v-model.trim="innerForm.evaluationMajor"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="评审职称" prop="titleEvaluation">
                    <el-select clearable class="width-full" v-model="innerForm.titleEvaluation" placeholder="请选择评审职称">
                      <el-option
                          v-for="item in this.$store.state.title_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证书性质" prop="certificateNature">
                    <el-select clearable class="width-full" v-model="innerForm.certificateNature" placeholder="请选择证书性质">
                      <el-option
                          v-for="item in this.$store.state.certificate_nature_options"
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
                  <el-form-item label="鉴定方式" prop="appraisalWay">
                    <el-select clearable class="width-full" v-model="innerForm.appraisalWay" placeholder="请选择鉴定方式">
                      <el-option
                          v-for="item in this.$store.state.appraisal_way_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="代办金额" prop="agencyAmount">
                    <el-input-number
                        class="width-full" controls-position="right"
                        :min="0" placeholder="请输入代办金额"
                        v-model="innerForm.agencyAmount"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="telephoneNumber">
                    <el-input clearable placeholder="请输入联系电话" v-model="innerForm.telephoneNumber"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" v-throttle="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import CommonLoading from "../../../../components/CommonLoading";

export default {
  name: 'TitleEvaluationAddEditCommonForm',
  components: {CommonLoading},
  data() {
    const assessorValidator = (rule, value, callback) => {
      if (this.form.listAssessors.length === 0) {
        callback(new Error('请添加评审人员!'))
      }
      callback()
    }
    return {
      visible: false,
      loading: false,
      dialogTitle: "",
      form: {
        customerType: null,
        customerName: '',
        principal: '',
        telephoneNumber: '',
        listAssessors: [{}]
      },
      rules: {
        customerType: [
          {required: true, message: '请选择客户类型', trigger: 'change'}
        ],
        customerName: [
          {required: true, message: '请输入客户名称', trigger: 'blur'}
        ],
        principal: [
          {required: false}
        ],
        telephoneNumber: [
          {required: false}
        ],
        remark: [
          {required: false}
        ],
        listAssessors: [
          {required: true, validator: assessorValidator, trigger: 'change'}
        ]
      },
      innerForm: {
        fullName: '',
        sex: null,
        identityCard: '',
        education: null,
        graduationMajor: '',
        evaluationMajor: '',
        titleEvaluation: null,
        certificateNature: null,
        appraisalWay: null,
        agencyAmount: undefined,
        telephoneNumber: '',
        listImages: []
      },
      innerRules: {
        fullName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        identityCard: [
          {required: true, message: '请输入身份证号', trigger: 'change'},
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '请输入正确格式的身份证号',
            trigger: 'change'
          },
        ],
        education: [
          {required: true, message: '请选择学历', trigger: 'blur'}
        ],
        graduationMajor: [
          {required: true, message: '请输入毕业专业', trigger: 'blur'}
        ],
        evaluationMajor: [
          {required: true, message: '请输入评审专业', trigger: 'blur'}
        ],
        titleEvaluation: [
          {required: true, message: '请选择评审职称', trigger: 'change'}
        ],
        certificateNature: [
          {required: true, message: '请选择证书性质', trigger: 'change'}
        ],
        appraisalWay: [
          {required: true, message: '请选择鉴定方式', trigger: 'change'}
        ],
        agencyAmount: [
          {required: true, message: '请输入代办金额', trigger: 'blur'}
        ],
        telephoneNumber: [
          {required: false}
        ],
      },
      tableData: [{}]
    }
  },
  mounted() {
  },
  methods: {
    beforeClose() {
      this.visible = false
    },
    prevAdd() {
      this.dialogTitle = '添加评审人员'
      this.visible = true
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            // const res = await this.$http.post('/', this.form)
            // if (res.status) {
            //   this.$message.success(res.message)
            // }
          } catch (e) {
            console.log(e)
          } finally {
            // this.loading = false
          }
          return
        }
        this.$message.error('输入有误')
      })
    },
    handleConfirm() {
      this.$refs.innerForm.validate(async valid => {
        if (valid) {
          try {
            // const res = await this.$http.post('/', this.form)
            // if (res.status) {
            //   this.$message.success(res.message)
            // }
          } catch (e) {
            console.log(e)
          }
          return
        }
        this.$message.error('输入有误')
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-table-scrollbar";

.title-evaluation-add-edit-common-form {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
