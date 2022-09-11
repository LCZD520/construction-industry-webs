/**
* Created by Lv Cheng on 2022/7/18
* Notes 资质代办添加、编辑
*/
<template>
  <div class="qualification-agency-add-edit-common-form">
    <el-form :rules="rules" ref="form" :model="form" label-position="right" label-width="120px">
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
              <el-option
                  :value="selectedList">
                <el-tree
                    check-strictly
                    accordion
                    check-on-click-node
                    :data="this.$store.state.list_qualification_category"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    @check-change="handleNodeClick"
                    :props="defaultProps">
                </el-tree>
              </el-option>
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
                @expand-change="cascaderClick('area')"
                @visible-change="cascaderClick('area')"
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
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAddPerson">
                添加
              </el-button>
            </div>
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
              <el-table-column fixed="right" label="操作" width="200">
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
                      @click.stop="handleDelete(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!--          工程师/三类人员/技术工种-->
          <el-form-item v-for="item in options" :key="item.type" :label="item.title">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleAddPerson2(item.type)">
                添加
              </el-button>
            </div>
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
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      @click.stop="handleEdit2(scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      @click.stop="handleDelete2(scope.$index,scope.row)">删除
                  </el-button>
                </template>
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
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>

    <ConstructorDialog
        ref="constructorDialog"
        @confirm="confirm"
        @closeDialog="outerVisible = false"
        :person-info="personInfo"
        :visible="outerVisible"/>
    <OtherPersonDialog
        ref="otherPersonDialog"
        @confirm="confirm2"
        @closeDialog="outerVisible2 = false"
        :person-info="personInfo2"
        :visible="outerVisible2"
        :dialog-title="dialogTitle"/>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import ConstructorDialog from "./dialog/ConstructorDialog";
import OtherPersonDialog from "./dialog/OtherPersonDialog";
import CommonLoading from "../../../../components/CommonLoading";

export default {
  name: 'QualificationAgencyAddEditCommonForm',
  components: {CommonLoading, OtherPersonDialog, ConstructorDialog},
  props: {
    qualificationMode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      outerMode: '',
      currentIndex: '',
      outerVisible: false,
      outerVisible2: false,
      dialogTitle: '',
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
      rules: {
        agencyCompany: [
          {required: true, message: '请输入代办公司', trigger: 'blur'}
        ],
        paymentWay: [
          {required: true, message: '请输入支付方式', trigger: 'blur'}
        ],
        agencyQualification: [
          {required: true, message: '请选择代办资质', trigger: 'change'}
        ],
        area: [
          {required: true, message: '请选择地区', trigger: 'change'}
        ],
        agencyAmount: [
          {required: true, message: '请输入代办金额', trigger: 'blur'}
        ],
        initialConversion: [
          {required: true, message: '请选择初始转注', trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      },
      errorMessage: {},
      // 建造师信息
      personInfo: {
        levelMajorInitialConversion: [],
        tenderExit: null,
        demandNumber: undefined,
        talentPrice: undefined,
        talentPriceNumber: undefined,
        numberUnit: null,
        remark: '',
      },
      // 工程师/三类人员/技术工种
      personInfo2: {
        levelMajorInitialConversion: [],
        demandNumber: undefined,
        talentPrice: undefined,
        talentPriceNumber: undefined,
        numberUnit: null,
        remark: '',
        type: null
      },
      defaultProps: {
        children: 'listQualificationCategory',
        label: 'categoryName'
      },
      selectedList: [],
    }
  },
  created() {
    if (this.qualificationMode === 'edit'
        && this.$route.params.i !== null) {
      this.getQualificationAgencyById(this.$route.params.id / 1)
    }
  },
  methods: {
    getQualificationAgencyById(_id) {
      this.$http.get('/qualification-agency/detail/' + _id).then(res => {
        console.log(res)
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
    handleNodeClick() {
      let datalist = this.$refs.tree.getCheckedNodes()
      this.selectedList = []
      this.form.agencyQualification = []
      datalist.forEach(item => {
        if (item.listQualificationCategory.length === 0) {
          this.selectedList.push({id: item.id, label: item.categoryName})
          this.form.agencyQualification.push(item.categoryName)
        }
      })
    },
    /**
     * 确定添加建造师
     */
    confirm() {
      if (this.outerMode === 'add') {
        this.form.listConstructors.push(
            JSON.parse(JSON.stringify(this.personInfo)))
        return
      }
      this.$set(this.form.listConstructors
          , this.currentIndex
          , JSON.parse(JSON.stringify(this.personInfo)))

    },
    /**
     * 添加建造师信息清除表单验证
     * @returns {Promise<unknown>}
     */
    preAddHandle() {
      this.outerMode = 'add'
      return new Promise(resolve => {
        this.personInfo = {
          levelMajorInitialConversion: [],
          tenderExit: null,
          demandNumber: undefined,
          talentPrice: undefined,
          talentPriceNumber: undefined,
          numberUnit: null,
          remark: '',
        }
        resolve()
      })
    },
    /**
     * 添加建造师
     */
    handleAddPerson() {
      this.preAddHandle().then(() => {
        this.$nextTick(() => {
          this.$refs.constructorDialog.$refs.form.clearValidate()
        })
        this.outerVisible = true
      })
    },
    /**
     * 编辑建造师
     * @param _index
     * @param _row
     */
    handleEdit(_index, _row) {
      this.outerMode = 'edit'
      this.currentIndex = _index
      this.personInfo = JSON.parse(JSON.stringify(_row))
      this.outerVisible = true
    },
    /**
     * 删除建造师
     * @param _index
     */
    handleDelete(_index) {
      this.form.listConstructors.splice(_index, 1)
    },

    /**
     * 确定添加工程师/三类人员/技术工种
     */
    confirm2() {
      if (this.outerMode === 'add') {
        this.form.listOtherPersons.push(
            JSON.parse(JSON.stringify(this.personInfo2)))
        return
      }
      this.$set(this.form.listOtherPersons
          , this.currentIndex
          , JSON.parse(JSON.stringify(this.personInfo2)))
      console.log(this.form)
    },
    /**
     * 添加工程师/三类人员/技术工种信息清除表单验证
     * @returns {Promise<unknown>}
     */
    preAddHandle2(_type) {
      this.outerMode = 'add'
      return new Promise(resolve => {
        this.personInfo2 = {
          levelMajorInitialConversion: [],
          demandNumber: undefined,
          talentPrice: undefined,
          talentPriceNumber: undefined,
          numberUnit: null,
          remark: '',
          type: _type,
        }
        resolve()
      })
    },
    /**
     * 添加工程师/三类人员/技术工种
     */
    handleAddPerson2(_type) {
      this.preAddHandle2(_type).then(() => {
        this.$nextTick(() => {
          this.$refs.otherPersonDialog.$refs.form.clearValidate()
        })
        this.outerVisible2 = true
      })
      if (_type === 1) {
        this.dialogTitle = '工程师'
        return
      }
      if (_type === 2) {
        this.dialogTitle = '三类人员'
        return
      }
      if (_type === 3) {
        this.dialogTitle = '技术工种'
      }
    },
    /**
     * 编辑工程师/三类人员/技术工种
     * @param _row
     */
    handleEdit2(_row) {
      let index = this.form.listOtherPersons.findIndex(item => item === _row)
      this.outerMode = 'edit'
      this.currentIndex = index
      console.log(index)
      this.personInfo2 = JSON.parse(JSON.stringify(_row))
      this.outerVisible2 = true
    },
    /**
     * 删除工程师/三类人员/技术工种
     * @param _index
     * @param _row
     */
    handleDelete2(_index, _row) {
      if (this.outerMode === 'add') {
        let index = this.form.listOtherPersons.findIndex(item => item === _row)
        this.form.listOtherPersons.splice(index, 1)
        return
      }
      let index = this.form.listOtherPersons.findIndex(item => {
        if (item.id) {
          if (item.id === _row.id) {
            return true
          }
        }
      })
      console.log(index, _row)
      this.form.listOtherPersons.splice(index, 1)
    },

    /**
     * 提交
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          newForm.agencyQualification
              = JSON.stringify(newForm.agencyQualification)
          newForm.listConstructors.forEach(item => {
            item.levelMajorInitialConversion
                = JSON.stringify(item.levelMajorInitialConversion)
          })
          newForm.listOtherPersons.forEach(item => {
            item.levelMajorInitialConversion
                = JSON.stringify(item.levelMajorInitialConversion)
          })
          this.loading = true
          if (this.qualificationMode === 'edit') {
            await this.handleSaveOrUpdate(newForm)
            return
          }
          await this.handleSave(newForm)
          return
        }
        this.$message.error('输入有误，请重新输入')
      })
    },
    /**
     * 添加
     */
    async handleSave(newForm) {
      try {
        const res = await this.$http.post('/qualification-agency/insert', newForm)
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

    },
    /**
     * 保存/更新/删除
     */
    async handleSaveOrUpdate(newForm) {
      try {
        const res = await this.$http.put('/qualification-agency/update', newForm)
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
            that.$refs.cascaderLevelMajor.dropDownVisible = false
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
                that.$refs.cascaderLevelMajor.dropDownVisible = false
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-table-scrollbar";

.qualification-agency-add-edit-common-form {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

/deep/ .el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}

/deep/ .el-tree .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}
</style>
