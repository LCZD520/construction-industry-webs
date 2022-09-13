/**
* Created by Lv Cheng on 2022/6/25
* Notes 资质收购剥离
*/
<template>
  <div class="qualification-acquisition-stripping">
    <el-form label-position="right" label-width="130px">
      <el-form-item label="选择剥离的资质">
        <el-table
            ref="table"
            @row-click="handleRowClick"
            :data="tableData"
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
              prop="id"
              label="资质类别及等级">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-divider content-position="left">
        新公司信息
      </el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转让意向客户">
            <el-input size="small" v-model="form.name" placeholder="请输入企业意向客户"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地区">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                ref="cascader"
                @expand-change="cascaderClick"
                @visible-change="cascaderClick"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder="请选择地区"
                :options="this.$provinceAndCityData"
                @change="handleChange"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="在建工程" prop="constructionProgress">
            <el-select class="width-full" v-model="form.constructionProgress" placeholder="请选择在建工程">
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
            <el-select class="width-full" v-model="form.qualifiedPersonnel" placeholder="请选择资质人员">
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
            <el-select class="width-full" v-model="form.safetyPermit" placeholder="请选择安全许可证">
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
                placeholder="请输入收购金额"
                :precision="2"
                class="width-full"
                controls-position="right"
                :min="0"
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
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注..." :rows="5" type="textarea">

        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button icon="el-icon-plus" type="primary" size="small">
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

export default {
  name: 'QualificationAcquisitionStripping',
  components: {},
  data() {
    return {
      form: {
        remark: '',
        status: 1,
        transferCustomers: '',
        area: '',
        categoryAndGrade: [],
        acquisitionAmount: undefined,
        safetyPermit: null,
        constructionProgress: null,
        qualifiedPersonnel: null,
        acquisitionDate: null,
      },
      tableData: [{id: 1}, {id: 2}],
      selectionList: [],
      formatAmount: 0
    }
  },
  filters: {
    amount(val) {
      return val
    }
  },
  methods: {
    tableRowClassName({row}) {
      return row.className;
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
    },

    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
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
    selectionList(newVal, oldVal) {
      newVal.forEach(k => {
        k.className = 'highlight'
      })
      if (newVal.length === 0) {
        oldVal.forEach(k => {
          k.className = 'unChecked'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.qualification-acquisition-stripping {
  margin: 0 100px;
}
</style>
