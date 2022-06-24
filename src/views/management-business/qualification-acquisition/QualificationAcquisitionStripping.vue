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
          <el-form-item label="在建工程">
            <el-select class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资质人员">
            <el-select class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
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
          <el-form-item label="安全许可证">
            <el-select class="width-full" size="small" v-model="form.name">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收购金额">
            <el-input-number
                class="width-full"
                controls-position="right"
                :min="0"
                size="small"
                placeholder="请填写收购金额"
                v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购日期">
            <el-date-picker
                class="width-full"
                size="small"
                v-model="form.name"
                placeholder="请选择收购日期"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input :rows="3" type="textarea" placeholder="请输入备注...">

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
export default {
  name: 'QualificationAcquisitionStripping',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [{id: 1}, {id: 2}],
      selectionList: [],
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
