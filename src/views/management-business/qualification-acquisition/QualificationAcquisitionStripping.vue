/**
* Created by Lv Cheng on 2022/6/25
* Notes 资质收购剥离
*/
<template>
  <div class="qualification-acquisition-stripping">
    <el-form size="small" :rules="rules" :model="form" ref="form" label-position="right" label-width="130px">
      <el-form-item label="选择剥离的资质">
        <el-table
            size="small"
            height="240"
            ref="table"
            @row-click="handleRowClick"
            :data="form.categoryAndGrade"
            stripe
            border
            @selection-change="selectionChange"
            :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            style="width: 100%"
            :row-class-name="tableRowClassName">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              label="资质类别及等级">
            <template scope="scope">
              {{ scope.row }}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-divider content-position="left">
        新公司信息
      </el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转让意向客户" prop="transferCustomers">
            <el-input placeholder="请输入转让意向客户" v-model.trim="form.transferCustomers" v-input-debounce="onChange"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              prop="area"
              label="所在地区">
            <el-cascader
                :disabled="disable"
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
        <el-col :span="12">
          <el-form-item label="在建工程" prop="constructionProgress">
            <el-select :disabled="disable" class="width-full" v-model="form.constructionProgress" placeholder="请选择在建工程">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资质人员" prop="qualifiedPersonnel">
            <el-select :disabled="disable" class="width-full" v-model="form.qualifiedPersonnel" placeholder="请选择资质人员">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
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
          <el-form-item label="安全许可证" prop="safetyPermit">
            <el-select :disabled="disable" class="width-full" v-model="form.safetyPermit" placeholder="请选择安全许可证">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收购金额" prop="acquisitionAmount">
            <el-input-number
                :min="0" :max="99999999.99" :precision="2"
                :disabled="disable"
                placeholder="请输入收购金额"
                class="width-full"
                controls-position="right"
                v-model="form.acquisitionAmount"/>
            <p style="height: 20px">
              <span v-if="formatAmount === 0"></span>
              <span v-else>{{ formatAmount | amount }}</span>
            </p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购日期" prop="acquisitionDate">
            <el-date-picker
                :disabled="disable"
                placeholder="请选择收购日期"
                class="width-full"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.acquisitionDate"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input :disabled="disable" v-model="form.remark" placeholder="请输入备注..." :rows="3" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button icon="el-icon-plus" type="primary" size="small" v-throttle="handleSave">
              保存
            </el-button>
            <el-button icon="el-icon-back" @click="$router.back()" size="small">
              返回
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import gsap from "gsap";
// import CommonUtil from "../../../util/CommonUtil";

export default {
  name: 'QualificationAcquisitionStripping',
  components: {},
  data() {
    return {
      disable: false,
      currentId: this.$route.params.id / 1,
      form: {
        remark: '',
        transferCustomers: '',
        area: '',
        categoryAndGrade: [],
        acquisitionAmount: undefined,
        safetyPermit: null,
        constructionProgress: null,
        qualifiedPersonnel: null,
        acquisitionDate: null,
        list: []
      },
      rules: {
        transferCustomers: [
          {required: true, message: '请输入转让意向客户', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '请选择所在地区', trigger: 'change'}
        ],
        acquisitionAmount: [
          {required: true, message: '请输入收购金额', trigger: 'blur'}
        ],
        safetyPermit: [
          {required: true, message: '请选择安全许可证', trigger: 'change'}
        ],
        constructionProgress: [
          {required: true, message: '请选择在建工程', trigger: 'change'}
        ],
        qualifiedPersonnel: [
          {required: true, message: '请选择资质人员', trigger: 'change'}
        ],
        acquisitionDate: [
          {required: true, message: '请选择收购日期', trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      },
      formatAmount: 0
    }
  },
  filters: {
    amount(val) {
      return val
    }
  },
  created() {
    this.currentId != null && !isNaN(this.currentId) && this.getQualificationById(this.currentId)
  },
  methods: {
    tableRowClassName({row}) {
      return row.className;
    },
    async onChange() {
      if (this.form.transferCustomers !== '') {
        try {
          const res = await this.$http.get('/qualification-acquisition/query-transfer-customers?transferCustomers=' + this.form.transferCustomers)
          if (res.status) {
            if (res.data != null) {
              let {
                safetyPermit,
                remark,
                transferCustomers,
                area,
                acquisitionAmount,
                constructionProgress,
                qualifiedPersonnel,
                acquisitionDate
              } = res.data
              this.disable = true
              this.form.remark = remark
              this.form.transferCustomers = transferCustomers
              this.form.area = area
              this.form.acquisitionAmount = acquisitionAmount
              this.form.safetyPermit = safetyPermit
              this.form.constructionProgress = constructionProgress
              this.form.qualifiedPersonnel = qualifiedPersonnel
              this.form.acquisitionDate = acquisitionDate
              this.$message({
                type: 'info',
                message: '该转让意向客户已存在，若剥离资质该转让意向客户将合并剥离的资质',
                duration: 5000
              })
            } else {
              this.disable = false
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    /**
     * 获取资质类别
     * @param _id
     * @returns {Promise<void>}
     */
    async getQualificationById(_id) {
      try {
        const res = await this.$http.get('/qualification-acquisition/select/' + _id)
        if (res && res.status) {
          this.form.categoryAndGrade = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSave() {
      if (this.form.list.length < 1) {
        this.$message.error('请至少选择一项资质进行剥离！')
        return
      }
      if (this.form.list.length === this.form.categoryAndGrade.length) {
        this.$message.error('不能剥离全部资质！')
        return
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let newForm = Object.assign(this.form)
            newForm.categoryAndGrade = JSON.stringify(newForm.categoryAndGrade)
            const res = await this.$http.put('/qualification-acquisition/stripping/' + this.currentId, newForm)
            if (res.status) {
              this.$router.back()
              this.$message.success(res.message)
            } else {
              this.$message.error(res.message)
            }
          } catch (e) {
            console.log(e)
          }
          return
        }
        this.$message.error('输入有误，请重新输入')
      })
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
    },
    selectionChange(selection) {
      this.form.list = selection
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
    handleChange(_val) {
      console.log(_val)
    },
  },
  watch: {
    'form.acquisitionAmount': function (newValue) {
      gsap.to(this.$data, {duration: 0.5, formatAmount: newValue});
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-acquisition-stripping {
  margin: 0 100px;
}
</style>
