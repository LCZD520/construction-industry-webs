/**
* Created by Lv Cheng on 2022/6/22
* Notes
*/
<template>
  <div class="qualification-acquisition-edit">
    <el-form :rules="rules" ref="form" :model="form" label-position="right" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="转让意向客户" prop="transferCustomers">
            <el-input show-word-limit maxlength="50" placeholder="请输入转让意向客户" v-model.trim="form.transferCustomers"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
              prop="area"
              label="所在地区">
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
        <el-col :span="24">
          <el-form-item label="资质类别及等级" prop="categoryAndGrade">
            <el-select multiple class="width-full" v-model="form.categoryAndGrade" placeholder="请选择资质类别及等级">
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
                :min="0" :max="99999999.99" :precision="2"
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
            <el-input show-word-limit maxlength="100" v-model.trim="form.remark" placeholder="请输入备注..." :rows="5" type="textarea">

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
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: 'QualificationAcquisitionAdd',
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
      rules: {
        transferCustomers: [
          {required: true, message: '请输入转让意向客户', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '请选择所在地区', trigger: 'change'}
        ],
        categoryAndGrade: [
          {required: true, message: '请选择资质类别及等级', trigger: 'change'}
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
      defaultProps: {
        children: 'listQualificationCategory',
        label: 'categoryName'
      },
      selectedList: [],
      formatAmount: 0
    }
  },
  filters: {
    amount(val) {
      return val
    }
  },
  created() {
    const id = this.$route.params.id / 1
    if (id != null) {
      this.getDetailById(id)
    }
  },
  computed: {
    listQualificationCategory() {
      return this.treeToArr(this.$store.state.list_qualification_category)
    }
  },
  methods: {
    treeToArr(tree) {
      return tree.reduce((prev, current) => {
        let {
          // eslint-disable-next-line no-unused-vars
          listQualificationCategory,
          ...arrs
        } = current
        prev.push({
          ...arrs
        })
        if (current.listQualificationCategory) {
          prev = [...prev, ...this.treeToArr(current.listQualificationCategory)]
        }
        return prev
      }, [])
    },
    async getDetailById(_id) {
      try {
        const res = await this.$http.get('/qualification-acquisition/detail/' + _id)
        if (res.status) {
          res.data.categoryAndGrade = JSON.parse(res.data.categoryAndGrade)
          this.form = res.data
          let arr = []
          res.data.categoryAndGrade.forEach(i => {
            arr = arr.concat(this.listQualificationCategory.filter(item => item.categoryName === i))
          })
          this.$nextTick(() => {
            this.$refs.tree.setCheckedNodes(arr)
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleNodeClick() {
      let datalist = this.$refs.tree.getCheckedNodes()
      this.selectedList = []
      this.form.categoryAndGrade = []
      datalist.forEach(item => {
        if (item.listQualificationCategory.length === 0) {
          this.selectedList.push({id: item.id, label: item.categoryName})
          this.form.categoryAndGrade.push(item.categoryName)
        }
      })
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let newForm = JSON.parse(JSON.stringify(this.form))
          if (typeof newForm.categoryAndGrade === 'object') {
            newForm.categoryAndGrade = JSON.stringify(newForm.categoryAndGrade)
          }
          try {
            const res = await this.$http.put('/qualification-acquisition/update', newForm)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
            }
          } catch (e) {
            console.log(e)
          }
          return
        }
        this.$message.error('输入有误')
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
  },
  watch: {
    'form.acquisitionAmount': function (newValue) {
      if (newValue) {
        gsap.to(this.$data, {duration: 0.5, formatAmount: newValue})
      } else {
        gsap.to(this.$data, {duration: 0.5, formatAmount: ''})
      }
    },
    'form.categoryAndGrade'(value) {
      value.forEach(item => {
        if (Array.isArray(item)) {
          let index = value.findIndex(i => i === item)
          value.splice(index, 1)
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.qualification-acquisition-edit {
  margin: 0 200px;
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
