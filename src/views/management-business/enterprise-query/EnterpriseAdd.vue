/**
* Created by Lv Cheng on 2022/6/19
* Notes 录入企业
*/
<template>
  <div class="enterprise-add">
    <el-form
        :rules="rules" :model="form" ref="form" label-position="right" label-width="120px">
      <el-form-item label="从企业资源选择">
        <el-button type="primary" size="small" @click="handleSelect">点击选择</el-button>
      </el-form-item>
      <el-form-item label="从已录企业选择">
        <el-button type="primary" size="small" @click="handleSelect2">点击选择</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input clearable placeholder="请输入企业名称" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系地址" prop="contactAddress">
            <el-input clearable placeholder="请输入联系地址" v-model="form.contactAddress"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人" prop="contacts">
            <el-input clearable placeholder="请输入联系人" v-model="form.contacts"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="电话号码" prop="telephoneNumber">
            <el-input clearable placeholder="请输入电话号码" v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ号码" prop="qqNumber">
            <el-input clearable placeholder="请输入QQ号码" v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业状态" prop="enterpriseStatus">
            <el-select class="width-full" disabled v-model="form.enterpriseStatus" placeholder="请选择企业状态">
              <el-option
                  v-for="item in this.$store.state.enterprise_status_options"
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
          <el-form-item label="企业需求" prop="listEnterpriseDemands">
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
                  min-width="260"
                  label="级别专业-初转">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.levelMajorInitialConversion" :key="index">
                    {{ item.levelMajor[0] }}&nbsp;/&nbsp;{{ item.levelMajor[1] }}
                    - {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="招标出场">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.tenderExit === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                    {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="企业出价">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.enterpriseOffer === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                    {{ scope.row.enterpriseOffer }}&nbsp;元&nbsp;/&nbsp;
                    {{ scope.row.enterpriseOfferNumber }}&nbsp;*&nbsp;
                    {{ $valueToLabel(scope.row.enterpriseOfferUnit, $store.state.number_unit_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="三类人员">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.classThreePersonnel === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                    {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="需求人数">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.demandNumber === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                    {{ scope.row.demandNumber }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="市场开发费">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.marketDevelopmentFee === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                    {{ scope.row.marketDevelopmentFee }}&nbsp;/&nbsp;
                    {{ $valueToLabel(scope.row.marketDevelopmentFeeUnit, $store.state.market_dev_fee_unit_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="职称">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.title === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                  {{ $valueToLabel(scope.row.title, $store.state.title_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="160"
                  label="学历">
                <template slot-scope="scope">
                  <el-tag
                      :disable-transitions="false"
                      v-if="scope.row.title === undefined" size="mini" type="info">空
                  </el-tag>
                  <span v-else>
                     {{ $valueToLabel(scope.row.education, $store.state.education_options) }}
                  </span>
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
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
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
    <!--    添加企业需求-->
    <el-dialog width="80%" title="添加企业需求" :visible.sync="outerVisible">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form :model="enterpriseDemand" ref="enterpriseDemand" :rules="rules2" label-position="right"
                     label-width="120px">
              <el-form-item label="级别专业-初始" prop="listLevelMajorInitial">
                <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
                  <el-button icon="el-icon-plus" type="primary" size="mini" @click="levelMajorInitialConversion('add')">
                    添加
                  </el-button>
                </div>
                <el-table
                    max-height="160"
                    size="mini"
                    :data="enterpriseDemand.levelMajorInitialConversion"
                    stripe
                    border
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      min-width="160"
                      prop="levelMajor"
                      label="级别专业">
                  </el-table-column>
                  <el-table-column
                      min-width="160"
                      prop="initialConversion"
                      label="初始转注">
                    <template slot-scope="scope">
                      {{ $valueToLabel(scope.row.initialConversion, $store.state.initial_conversion_options) }}
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
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
              <el-row>
                <el-col :span="12">
                  <el-form-item label="三类人员" prop="classThreePersonnel">
                    <el-select clearable size="small" class="width-full" v-model="enterpriseDemand.classThreePersonnel"
                               placeholder="请选择三类人员">
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
                  <el-form-item label="招标出场" prop="tenderExit">
                    <el-select clearable size="small" class="width-full" v-model="enterpriseDemand.tenderExit"
                               placeholder="请选择招标出场">
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
              <el-form-item label="需求人数" prop="demandNumber">
                <el-input-number clearable size="small" class="width-full" :min="0" controls-position="right"
                                 v-model="enterpriseDemand.demandNumber">
                </el-input-number>
              </el-form-item>
              <el-row :gutter="10" style="width:1000px">
                <el-col :span="7">
                  <el-form-item prop="enterpriseOffer" label="企业出价">
                    <el-input-number
                        :min="0"
                        size="small"
                        clearable controls-position="right"
                        v-model="enterpriseDemand.enterpriseOffer"/>
                    &nbsp;元
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="enterpriseOfferNumber" label-width="0">
                    <el-input-number :min="0" size="small" clearable controls-position="right"
                                     v-model="enterpriseDemand.enterpriseOfferNumber"/>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="enterpriseOfferUnit" label-width="0">
                    <el-select size="small" clearable v-model="enterpriseDemand.enterpriseOfferUnit"
                               style="width: 100px;"
                               placeholder="请选择">
                      <el-option
                          v-for="item in this.$store.state.number_unit_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="市场开发费" prop="marketDevelopmentFee">
                    <el-input-number clearable size="small" controls-position="right" :min="0"
                                     v-model="enterpriseDemand.marketDevelopmentFee"/>
                    元
                    &nbsp;
                    <el-select clearable size="small" v-model="enterpriseDemand.marketDevelopmentFeeUnit"
                               style="width: 100px;" placeholder="请选择">
                      <el-option :label="1" :value="1">人</el-option>
                      <el-option :label="2" :value="2">单</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="职称" prop="title">
                    <el-select clearable size="small" class="width-full" v-model="enterpriseDemand.title"
                               placeholder="请选择职称">
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
                  <el-form-item label="学历" prop="education">
                    <el-select clearable size="small" class="width-full" v-model="enterpriseDemand.education"
                               placeholder="请选择学历">
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
            </el-form>
            <!--      添加/编辑级别专业-转注-->
            <el-dialog
                style="margin-top: 15vh"
                width="50%"
                :title="innerDialogTitle"
                :visible.sync="innerVisible"
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
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="outerVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <EnterpriseResourceSelectDialog
        ref="TalentResourceSelectDialog"
        :enterprise-list="enterpriseList"
        :dialog-title="dialogTitle"
        @confirm="confirm"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @closeDialog="visible = false"
        :page-info="page"
        :visible="visible"/>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import EnterpriseResourceSelectDialog from "./enterprise-add/EnterpriseResourceSelectDialog";
import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'EnterpriseAdd',
  components: {CommonLoading, EnterpriseResourceSelectDialog},
  props: {
    enterpriseMode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    const enterpriseDemandValidator = (rule, value, callback) => {
      if (this.form.listEnterpriseDemands.length === 0) {
        callback(new Error('请选择企业需求!'))
      }
      callback()
    }
    const levelMajorInitialValidator = (rule, value, callback) => {
      if (this.enterpriseDemand.levelMajorInitialConversion.length === 0) {
        callback(new Error('请选择级别专业-转注!'))
      }
      callback()
    }
    return {
      innerMode: '',
      currentIndex: null,
      visible: false,
      loading: false,
      outerVisible: false,
      innerVisible: false,
      innerVisible2: false,
      dialogTitle: '',
      innerDialogTitle: '',
      rules: {
        enterpriseName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        enterpriseQualifications: [
          {required: true, message: '请选择企业资质', trigger: 'change'}
        ],
        area: [
          {required: true, message: '请选择地区', trigger: 'change'}
        ],
        contactAddress: [
          {required: true, message: '请输入联系地址', trigger: 'blur'}
        ],
        contacts: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        telephoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'}
        ],
        qqNumber: [
          {required: false, trigger: 'blur'}
        ],
        enterpriseStatus: [
          {required: false, trigger: 'blur'}
        ],
        listEnterpriseDemands: [
          {required: true, validator: enterpriseDemandValidator, trigger: 'change'}
        ],
        remark: [
          {required: false, trigger: 'blur'}
        ],
      },
      rules2: {
        listLevelMajorInitial: [
          {required: true, validator: levelMajorInitialValidator, trigger: 'change'}
        ],
        classThreePersonnel: [
          {required: true, message: '请输入三类人员', trigger: 'change'}
        ],
        tenderExit: [
          {required: true, message: '请选择招标出场', trigger: 'change'}
        ],
        demandNumber: [
          {required: true, message: '请输入需求人数', trigger: 'blur'}
        ],
        enterpriseOffer: [
          {required: true, message: '请输入企业出价', trigger: 'blur'}
        ],
        enterpriseOfferNumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        enterpriseOfferUnit: [
          {required: true, message: '请选择', trigger: 'blur'}
        ],
        marketDevelopmentFee: [
          {required: true, message: '市场开发费不能为空', trigger: 'blur'}
        ],
        marketDevelopmentFeeUnit: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        title: [
          {required: false, trigger: 'change'}
        ],
        education: [
          {required: false, trigger: 'change'}
        ]
      },
      list1: [],
      list2: [],
      enterpriseList: [],
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
        "enterpriseDemandStatus": null,
        "enterpriseStatus": null,
        "enterprisePrice": undefined,
        "enterprisePriceNumber": undefined,
        "numberUnit": null,
        "remark": '',
        "listEnterpriseDemands": null
      },
      page: {},
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      pageInfo2: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
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
      enterpriseDemand: {
        classThreePersonnel: null,
        tenderExit: null,
        demandNumber: undefined,
        enterpriseOffer: undefined,
        enterpriseOfferNumber: undefined,
        enterpriseOfferUnit: null,
        marketDevelopmentFee: undefined,
        marketDevelopmentFeeUnit: null,
        title: null,
        education: null,
        levelMajorInitialConversion: [],
      },
      levelMajorInitial: {
        levelMajor: '',
        initialConversion: null,
      },
      rules3: {
        levelMajor: [
          {required: true, message: '请输入级别专业', trigger: 'change'}
        ],
        initialConversion: [
          {required: true, message: '请选择初始转注', trigger: 'change'}
        ],
      },
    }
  },
  created() {
    if (this.enterpriseMode === 'edit') {
      if (this.$route.params.id !== undefined) {
        this.getDetailById(this.$route.params.id)
      }
    }
    this.getListEnterprises()
    this.getListEnterpriseResources()
  },
  methods: {
    async getListEnterprises(_pageSize) {
      let url = `/enterprise/list`
      try {
        const res = await this.$http.get(url, {
          params: {
            currentPage: this.pageInfo2.currentPage,
            pageSize: _pageSize ? _pageSize : this.pageInfo2.pageSize,
          }
        })
        if (res.status && null !== res.data) {
          this.pageInfo2.total = res.data.total
          this.list2 = res.data.list
          this.list2.forEach(item => {
            item.listEnterpriseDemands.forEach(enterpriseDemand => {
              if (enterpriseDemand.levelMajor instanceof String) {
                enterpriseDemand.levelMajor = JSON.parse(enterpriseDemand.levelMajor)
              }
            })
          })
        }
        return res
      } catch (e) {
        console.log(e)
      }
    },
    async getListEnterpriseResources(_pageSize) {
      let url = `/enterprise-resource/list`
      try {
        const res = await this.$http.get(url, {
          params: {
            currentPage: this.pageInfo.currentPage,
            pageSize: _pageSize ? _pageSize : this.pageInfo2.pageSize,
            type: 'total',
          }
        })
        if (res.status && null !== res.data) {
          this.pageInfo.total = res.data.total
          this.list1 = res.data.list
          this.list1.forEach(item => {
            item.listEnterpriseDemands.forEach(enterpriseDemand => {
              if (enterpriseDemand.levelMajorInitialConversion instanceof String) {
                enterpriseDemand.levelMajorInitialConversion
                    = JSON.parse(enterpriseDemand.levelMajorInitialConversion)
              }
            })
          })
        }
        return res
      } catch (e) {
        console.log(e)
      }
    },
    handleSelect() {
      this.pageType = 'resource'
      this.dialogTitle = '从企业资源选择'
      this.enterpriseList = this.list1
      this.page = this.pageInfo
      this.visible = true
    },
    handleSelect2() {
      this.pageType = 'enterprise'
      this.dialogTitle = '从已录企业选择'
      this.enterpriseList = this.list2
      this.page = this.pageInfo2
      this.visible = true
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.innerVisible2 = true
    },
    /**
     * 表格翻页
     */
    /**
     * 从企业选择数据确认
     * @param _index
     */
    confirm(_index) {
      if (this.enterpriseMode === 'add') {
        this.enterpriseList[_index].enterpriseStatus = 1
        let enterprise = this.enterpriseList[_index]
        if (enterprise !== null) {
          for (let formKey in this.form) {
            for (let enterpriseKey in enterprise) {
              if (formKey === enterpriseKey) {
                this.form[formKey] = enterprise[enterpriseKey]
              }
            }
          }
          enterprise.listEnterpriseDemands.forEach(item => {
            if (typeof item.levelMajorInitialConversion === 'string') {
              item.levelMajorInitialConversion
                  = JSON.parse(item.levelMajorInitialConversion)
            }
          })
        }
      }
    },
    async handleCurrentChange() {
      if (this.pageType === 'resource') {
        const res = await this.getListTalentResources()
        this.inner(res)
        return
      }
      await this.getListEnterprises()
      this.enterpriseList = this.list2
    },
    /**
     * 改变页数
     */
    async handleSizeChange(_pageSize) {
      if (this.pageType === 'resource') {
        const res = await this.getListTalentResources(_pageSize)
        this.inner(res)
        return
      }
      const res = await this.getListEnterprises(_pageSize)
      this.inner(res)
    },
    inner(res) {
      if (res.status && res.data.list !== null) {
        this.enterpriseList = res.data.list
        this.enterpriseList.forEach(item => {
          item.listEnterpriseDemands.forEach(enterpriseDemand => {
            if (item.levelMajorInitialConversion instanceof String) {
              enterpriseDemand.levelMajorInitialConversion
                  = JSON.parse(enterpriseDemand.levelMajorInitialConversion)
            }
          })
        })
      }
    },

    async getDetailById(_id) {
      this.loading = true
      try {
        const res = await this.$http.get('/enterprise/detail/' + _id)
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
      this.$refs.enterpriseDemand.validate(valid => {
        if (valid) {
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
          return
        }
        this.$message.error('输入错误')
      })
    },
    /**
     * 提交
     */
    handleSubmit() {
      if (this.enterpriseMode === 'edit') {
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
            const res = await this.$http.post('/enterprise/insert', newForm)
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
            item.levelMajorInitialConversion
                = JSON.stringify(item.levelMajorInitialConversion)
          })
          console.log(newForm)
          this.loading = true
          try {
            const res = await this.$http.put('/enterprise/update', newForm)
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
@import "../../../assets/css/common-el-table-scrollbar";

.enterprise-add {
  margin: 0 100px;
}
</style>
