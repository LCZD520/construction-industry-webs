/**
* Created by Lv Cheng on 2022/6/20
* Notes 企业资源添加、编辑公共表单
*/
<template>
  <div class="enterprise-resources-add-edit">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否共享" prop="shared">
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
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input placeholder="请输入企业名称" size="small" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业资质" prop="enterpriseQualifications">
            <el-select clearable class="width-full" v-model="form.enterpriseQualifications" placeholder="请选择企业资质">
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
          <el-form-item
              :error="errorMessage.area"
              prop="area"
              label="地区">
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
          <el-form-item label="联系地址" prop="contactAddress">
            <el-input clearable placeholder="请输入联系地址" v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contacts">
            <el-input clearable placeholder="请输入联系人" v-model="form.contacts"/>
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
          <el-form-item label="电话号码" prop="telephoneNumber">
            <el-input placeholder="请输入电话号码" clearable class="width-full" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ号码" prop="qqNumber">
            <el-input clearable class="width-full" placeholder="请输入QQ" v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="企业需求">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="beforeAddEnterpriseDemand">
                添加
              </el-button>
            </div>
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
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      @click.stop="beforeEditEnterpriseDemand(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      @click.stop="handleDelete(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="跟进情况" prop="followUpSituation">
        <el-input v-model="form.followUpSituation" placeholder="请输入跟进情况..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注..." :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <!--    添加企业需求-->
    <el-dialog
        width="60%"
        :close-on-click-modal="false"
        :title="dialogTitle" :visible.sync="outerVisible">
      <div class="dialog-content">
        <el-form :model="enterpriseDemand" ref="enterpriseDemand" :rules="rules2" label-position="right"
                 label-width="120px">
          <el-form-item label="级别专业-初始" prop="listLevelMajorInitial">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="levelMajorInitialConversion('add')">
                添加
              </el-button>
            </div>
            <el-table
                max-height="360"
                size="mini"
                ref="table"
                show-overflow-tooltip
                :data="enterpriseDemand.levelMajorInitialConversion"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}">
              <el-table-column
                  label="级别专业">
                <template slot-scope="scope">
                  {{ scope.row.levelMajor[0] }}&nbsp;/&nbsp;
                  {{ scope.row.levelMajor[1] }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="initialConversion"
                  label="初始转注">
                <template slot-scope="scope">
                  {{ $valueToLabel(scope.row.initialConversion, $store.state.initial_conversion_options) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      @click.stop="levelMajorInitialConversion('edit',scope.$index,scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      @click.stop="handleInnerDelete(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <!--      添加/编辑级别专业-转注-->
        <el-dialog
            style="margin-top: 3vh"
            width="40%"
            :title="innerDialogTitle"
            :visible.sync="innerVisible"
            :close-on-click-modal="false"
            append-to-body>
          <el-form
              label-position="right"
              label-width="80px"
              ref="levelMajorInitial"
              :rules="rules3"
              :model="levelMajorInitial">
            <el-form-item label="级别专业" prop="levelMajor">
              <el-cascader
                  class="width-full"
                  clearable
                  :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,children:'listCertificateCategory'}"
                  placeholder="请选择级别专业"
                  :options="this.$store.state.list_certificate_category"
                  v-model="levelMajorInitial.levelMajor">
              </el-cascader>
            </el-form-item>
            <el-form-item label="初始转注" prop="initialConversion">
              <el-select
                  clearable
                  class="width-full"
                  v-model="levelMajorInitial.initialConversion"
                  placeholder="请选择初始转注">
                <el-option
                    v-for="item in this.$store.state.initial_conversion_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="innerBefore">取 消</el-button>
            <el-button size="small" type="primary" @click="levelMajorInitialConfirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="outerVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'EnterpriseResourcesAddEdit',
  components: {CommonLoading},
  props: {
    resourceMode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      mode: '',
      loading: false,
      enterpriseResourceMode: 'add',
      outerVisible: false,
      innerVisible: false,
      // 当前点击的级别专业索引
      currentIndex: null,
      // 当前点击的企业需求索引
      enterpriseCurrentIndex: null,
      visible: false,
      dialogTitle: '',
      innerDialogTitle: '',
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
      errorMessage: {
        "shared": '',
        "enterpriseName": '',
        "contacts": '',
        "telephoneNumber": '',
      },
      enterpriseDemand: {
        levelMajorInitialConversion: [],
      },
      levelMajorInitial: {
        levelMajor: [],
        initialConversion: null,
      },
      rules: {
        shared: [
          {required: true, message: '请选择是否共享', trigger: 'change'}
        ],
        enterpriseName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        contacts: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        telephoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'}
        ],
      },
      rules2: {},
      rules3: {
        levelMajor: [
          {required: true, message: '请选择级别专业', trigger: 'change'}
        ],
        initialConversion: [
          {required: true, message: '请选择初始转注', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    if (this.resourceMode === 'edit'
        && this.$route.params.id !== null) {
      this.getDetailById(this.$route.params.id / 1)
    }
  },
  methods: {
    async getDetailById(_id) {
      this.loading = true
      try {
        const res = await this.$http.get('/enterprise-resource/detail/' + _id)
        if (res.status && res.data !== null) {
          this.form = res.data
          if (this.form.listEnterpriseDemands !== null) {
            this.form.listEnterpriseDemands.forEach(item => {
              if (typeof item.levelMajorInitialConversion === 'string') {
                item.levelMajorInitialConversion
                    = JSON.parse(item.levelMajorInitialConversion)
              }
            })
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    /**
     * 关闭添加/编辑级别专业初始转注弹窗
     */
    innerBefore() {
      this.innerVisible = false
      this.$nextTick(() => {
        this.$refs.levelMajorInitial.resetFields()
      })
    },
    /**
     * 添加/编辑初始转注确认
     */
    levelMajorInitialConfirm() {
      if (this.innerMode === 'add') {
        this.$refs.levelMajorInitial.validate(valid => {
          if (valid) {
            this.$nextTick(() => {
              this.$refs.levelMajorInitial.resetFields()
            })
            this.innerVisible = false
            this.enterpriseDemand.levelMajorInitialConversion.push(
                JSON.parse(JSON.stringify(this.levelMajorInitial)))
            return
          }
          this.$message.error('输入有误')
        })
        return
      }
      this.$set(
          this.enterpriseDemand.levelMajorInitialConversion
          , this.currentIndex
          , JSON.parse(JSON.stringify(this.levelMajorInitial)))
      this.innerVisible = false
    },
    /**
     * 添加/编辑级别专业初始转注弹窗
     * @param _type
     * @param _index
     * @param _row
     */
    levelMajorInitialConversion(_type, _index, _row) {
      this.innerMode = _type
      this.innerVisible = true
      if (_type === 'add') {
        this.$nextTick(() => {
          this.$refs.levelMajorInitial.resetFields()
        })
        this.innerDialogTitle = '添加级别专业-转注'
        return
      }
      this.currentIndex = _index
      this.levelMajorInitial = JSON.parse(JSON.stringify(_row))
      this.innerDialogTitle = '编辑级别专业-转注'
    },
    /**
     * 删除级别专业-初始
     * @param _index
     */
    handleInnerDelete(_index) {
      this.enterpriseDemand.levelMajorInitialConversion.splice(_index, 1)
    },
    /**
     * 删除企业需求
     * @param _index
     */
    handleDelete(_index) {
      if (this.form.listEnterpriseDemands[_index] !== null) {
        this.form.listEnterpriseDemands.splice(_index, 1)
      }
    },
    /**
     * 添加企业需求
     */
    beforeAddEnterpriseDemand() {
      this.mode = 'add'
      this.dialogTitle = '添加企业需求'
      this.outerVisible = true
      this.enterpriseDemand.levelMajorInitialConversion = []
    },
    /**
     * 编辑企业需求
     * @param _index
     * @param _row
     */
    beforeEditEnterpriseDemand(_index, _row) {
      this.enterpriseDemand = JSON.parse(JSON.stringify(_row))
      this.enterpriseCurrentIndex = _index
      this.mode = 'edit'
      this.dialogTitle = '编辑企业需求'
      this.outerVisible = true
    },
    /**
     * 添加/编辑企业需求确认
     */
    handleConfirm() {
      this.outerVisible = false
      if (this.mode === 'add') {
        if (this.enterpriseDemand.levelMajorInitialConversion.length > 0) {
          this.form.listEnterpriseDemands.push(
              JSON.parse(JSON.stringify(this.enterpriseDemand)))
        }
        return
      }
      this.$set(
          this.form.listEnterpriseDemands
          , this.enterpriseCurrentIndex
          , JSON.parse(JSON.stringify(this.enterpriseDemand)))
    },
    /**
     * 提交
     */
    handleSubmit() {
      if (this.resourceMode === 'edit') {
        this.handleSaveOrUpdate()
        return
      }
      this.handleSave()
    },
    /**
     * 添加
     */
    handleSave() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.listEnterpriseDemands.forEach(item => {
            item.levelMajorInitialConversion = JSON.stringify(item.levelMajorInitialConversion)
          })
          this.loading = true
          try {
            const res = await this.$http.post('/enterprise-resource/insert', newForm)
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
    /**
     * 保存/更新/删除
     */
    handleSaveOrUpdate() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.listEnterpriseDemands.forEach(item => {
            item.levelMajorInitialConversion = JSON.stringify(item.levelMajorInitialConversion)
          })
          console.log(newForm)
          this.loading = true
          try {
            const res = await this.$http.put('/enterprise-resource/update', newForm)
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
  },
  beforeUpdate() {
    if (this.$refs.table !== undefined) {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    }
  },
  watch: {
    "this.form.listEnterpriseDemands": {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.enterprise-resources-add-edit {
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
