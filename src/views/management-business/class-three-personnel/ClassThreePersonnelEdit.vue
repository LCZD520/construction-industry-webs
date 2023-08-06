/**
* Created by Lv Cheng on 2022/6/19
* Notes 三类人员编辑
*/
<template>
  <div class="class-three-personnel-edit">
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
                show-word-limit
                maxlength="20"
                clearable
                placeholder="请输入客户名称"
                v-model.trim="form.customerName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.customerType === 1">
          <el-form-item label="负责人" prop="principal">
            <el-input show-word-limit maxlength="10" clearable placeholder="请输入负责人" v-model.trim="form.principal"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="telephoneNumber">
            <el-input show-word-limit maxlength="11" clearable placeholder="请输入联系电话" v-model.trim="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评审人员信息" prop="listAssessors">
        <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
          <el-button icon="el-icon-plus" type="primary" @click="prevAdd" size="mini">
            添加
          </el-button>
          <el-upload
              :auto-upload="false"
              style="display: inline-block;margin:0 10px"
              class="upload-demo"
              action=""
              :show-file-list="false"
              :on-change="handleChange">
            <el-button icon="el-icon-paperclip" size="mini" type="primary">批量导入</el-button>
          </el-upload>
          <el-button icon="el-icon-download" size="mini" v-throttle="downloadFileTemplate">
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
              v-for="item in columns"
              :key="item.key"
              min-width="180"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="primary"
                  @click="preEdit(scope.$index, scope.row)">编辑
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
      <div class="dialog-wrapper" style="height: 468px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-wrapper" style="height: 468px">
            <el-scrollbar style="height: 100%">
              <div class="dialog-content" style="margin-right: 10px">
                <el-form
                    ref="innerForms" :model="innerForm" :rules="innerRules" size="small" label-position="right"
                    label-width="100px">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="姓名" prop="fullName">
                        <el-input show-word-limit maxlength="10" clearable placeholder="请输入姓名"
                                  v-model.trim="innerForm.fullName"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="性别" prop="sex">
                        <el-select clearable class="width-full" v-model="innerForm.sex" placeholder="请选择性别">
                          <el-option
                              v-for="item in this.$store.state.sex_options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="身份证" prop="identityCard">
                        <el-input show-word-limit maxlength="18" clearable placeholder="请输入身份证"
                                  v-model.trim="innerForm.identityCard"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话" prop="telephoneNumber">
                        <el-input show-word-limit maxlength="11" clearable placeholder="请输入联系电话"
                                  v-model.trim="innerForm.telephoneNumber"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="安全证书" prop="securityCertificate">
                        <el-select clearable class="width-full" v-model="innerForm.securityCertificate" placeholder="请选择安全证书">
                          <el-option
                              v-for="item in this.securityCertificateOptions"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="三类类别" prop="threeCategory">
                        <el-select clearable class="width-full" v-model="innerForm.threeCategory" placeholder="请选择三类类别">
                          <el-option
                              v-for="item in threeCategoryOptions"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="事项性质" prop="itemNature">
                        <el-select disabled clearable class="width-full" v-model="innerForm.itemNature" placeholder="请选择事项性质">
                          <el-option
                              v-for="item in itemNatureOptions"
                              :key="item"
                              :label="item"
                              :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="代办金额" prop="agencyAmount">
                        <el-input-number
                            class="width-full" controls-position="right"
                            :min="0" :max="99999999.99" :precision="2" placeholder="请输入代办金额"
                            v-model="innerForm.agencyAmount"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="闽政通账号" prop="minZhengTongAccount">
                        <el-input show-word-limit maxlength="20" clearable placeholder="请输入闽政通账号"
                                  v-model.trim="innerForm.minZhengTongAccount"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="闽政通密码" prop="minZhengTongPassword">
                        <el-input show-word-limit maxlength="20" clearable placeholder="请输入闽政通密码"
                                  v-model.trim="innerForm.minZhengTongPassword"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <ImagesUpload2
                      ref="upload"
                      v-if="visible"
                      @changeImageList="changeImageList"
                      :files="innerForm.listImages"
                      namespace="class-three-personnel"
                      type="assessor"/>
                </el-form>
              </div>
            </el-scrollbar>
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
import CommonLoading from "../../../components/CommonLoading";
import ImagesUpload2 from "../../../components/image-upload2/ImagesUpload2";

export default {
  name: 'ClassThreePersonnelEdit',
  components: {ImagesUpload2, CommonLoading},
  data() {
    const assessorValidator = (rule, value, callback) => {
      if (this.form.listAssessors.length === 0) {
        callback(new Error('请添加评审人员!'))
      }
      callback()
    }
    return {
      addEditMode: '',
      visible: false,
      loading: false,
      dialogTitle: "",
      form: {
        customerType: null,
        customerName: '',
        principal: '',
        telephoneNumber: '',
        listAssessors: []
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
        sex: '',
        identityCard: '',
        telephoneNumber: '',
        securityCertificate: '',
        threeCategory: '',
        itemNature: '直出',
        minZhengTongAccount: '',
        minZhengTongPassword: '',
        agencyAmount: undefined,
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
        telephoneNumber: [
          {required: false}
        ],
        securityCertificate: [
          {required: true, message: '请选择安全证书', trigger: 'change'}
        ],
        threeCategory: [
          {required: true, message: '请选择三类类别', trigger: 'change'}
        ],
        itemNature: [
          {required: true, message: '请输入事项性质', trigger: 'change'}
        ],
        minZhengTongAccount: [
          {required: true, message: '请输入闽政通账号', trigger: 'blur'}
        ],
        minZhengTongPassword: [
          {required: true, message: '请输入闽政通密码', trigger: 'blur'}
        ],
        agencyAmount: [
          {required: true, message: '请输入代办金额', trigger: 'blur'}
        ],
      },
      securityCertificateOptions: ["建安", "水安", "交安"],
      threeCategoryOptions: ["A", "B", "C"],
      itemNatureOptions: ["直出"],
      mapObj: {
        "姓名": "fullName",
        "性别": "sex",
        "身份证": "identityCard",
        "联系电话": "telephoneNumber",
        "学历": "education",
        "毕业专业": "graduationMajor",
        "评审专业": "evaluationMajor",
        "评审职称": "titleEvaluation",
        "证书性质": "certificateNature",
        "鉴定方式": "appraisalWay",
        "代办金额": "agencyAmount"
      },
      fileList: [],
      file: "",
      currentIndex: null,
      isFinishModified: false,
      columns: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard'
        },
        {
          title: '联系电话',
          key: 'telephoneNumber'
        },
        {
          title: '安全证书',
          key: 'securityCertificate'
        },
        {
          title: '三类类别',
          key: 'threeCategory'
        },
        {
          title: '事项性质',
          key: 'itemNature'
        },
        {
          title: '闽政通账号',
          key: 'minZhengTongAccount'
        },
        {
          title: '闽政通密码',
          key: 'minZhengTongPassword'
        },
        {
          title: '代办金额',
          key: 'agencyAmount'
        },
      ],
    }
  },
  created() {
    const id = this.$route.params.id / 1
    !isNaN(id) && this.getDetailById(id)
  },
  methods: {
    changeImageList(val) {
      if (this.addEditMode === 'add') {
        this.innerForm.listImages = JSON.parse(JSON.stringify(val))
      }
    },
    async downloadFileTemplate() {
      let a = document.createElement("a")
      a.href = "/file-template/三类人员.xlsx"
      a.download = "三类人员.xlsx"
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    handleDelete(_index) {
      this.form.listAssessors.splice(_index, 1)
    },
    beforeClose() {
      this.visible = false
    },
    prevAdd() {
      this.dialogTitle = '添加评审人员'
      this.addEditMode = 'add'
      this.innerForm.listImages.length = 0
      this.$nextTick(() => {
        this.$refs.innerForms.resetFields()
      })
      this.visible = true
    },
    preEdit(_index, _row) {
      this.dialogTitle = '编辑评审人员'
      this.isFinishModified = false
      this.addEditMode = 'edit'
      this.visible = true
      this.currentIndex = _index
      this.innerForm = JSON.parse(JSON.stringify(_row))
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          console.log(this.form, "form")
          try {
            const res = await this.$http.put('/class-three-personnel/update', this.form)
            if (res && res.status) {
              this.$message.success(res.message)
              this.$router.back()
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
        this.$message.error('输入有误')
      })
    },
    handleConfirm() {
      this.$refs.innerForms.validate(valid => {
        if (valid) {
          if (this.addEditMode === 'add') {
            this.form.listAssessors.push(JSON.parse(JSON.stringify(this.innerForm)))
          } else {
            this.innerForm.listImages = JSON.parse(JSON.stringify(this.$refs.upload.fileList))
            this.$set(this.form.listAssessors, this.currentIndex, JSON.parse(JSON.stringify(this.innerForm)))
            this.isFinishModified = true
          }
          console.log(this.form)
          this.form.listAssessors.forEach(item => {
            item.listImages.forEach(img => {
              img.namespace = 'class-three-personnel'
              img.type = 'assessor'
            })
          })
          this.$refs.innerForms.resetFields()
          this.visible = false
          return
        }
        this.$message.error('输入有误')
      })
    },
    /**
     * 从文件导入数据
     * @param file
     * @param fileList
     */
    handleChange(file, fileList) {
      let self = this
      this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
      this.file = file.raw;
      let reader = new FileReader()
      reader.readAsArrayBuffer(this.file)
      reader.onload = function () {
        let buffer = reader.result
        let bytes = new Uint8Array(buffer)
        let length = bytes.byteLength
        let binary = ''
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let XLSX = require('xlsx')
        let wb = XLSX.read(binary, {
          type: 'binary'
        })
        let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        outdata.forEach(item => {
          let newObj = {}
          for (const itemKey in self.mapObj) {
            newObj[self.mapObj[itemKey]] = item[itemKey]
            newObj.listImages = []
          }
          self.form.listAssessors.push(newObj)
        })
        console.log(self.form.listAssessors)
      }
    },
    /**
     * 获取三类人员详情
     * @param _id
     */
    getDetailById(_id) {
      this.$http.get('/class-three-personnel/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listAssessors.forEach(item => item.agencyAmount = item.agencyAmount.toFixed(2))
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.class-three-personnel-edit {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
