/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质转让编辑
*/
<template>
  <div class="qualification-transfer-edit">
    <el-form ref="form" :rules="rules" :model="form" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购意向客户" prop="transferCustomers">
            <el-input show-word-limit maxlength="50" placeholder="请输入收购意向客户" v-model.trim="form.transferCustomers"/>
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
          <el-form-item label="资质需求" prop="qualificationRequirements">
            <el-select multiple class="width-full" v-model="form.qualificationRequirements" placeholder="请选择资质需求">
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
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input show-word-limit maxlength="100" v-model.trim="form.remark" placeholder="请输入备注..." :rows="5" type="textarea">
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
  </div>
</template>

<script>
export default {
  name: 'QualificationTransferAdd',
  components: {},
  data() {
    return {
      form: {
        remark: '',
        transferCustomers: '',
        area: '',
        qualificationRequirements: [],
      },
      rules: {
        transferCustomers: [
          {required: true, message: '请输入转让意向客户', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '请选择所在地区', trigger: 'change'}
        ],
        qualificationRequirements: [
          {required: true, message: '请选择资质需求', trigger: 'change'}
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
    }
  },
  created() {
    const id = this.$route.params.id / 1
    id && !isNaN(id) && this.getDetailById(id)
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
        const res = await this.$http.get('/qualification-transfer/detail/' + _id)
        if (res.status) {
          res.data.qualificationRequirements = JSON.parse(res.data.qualificationRequirements)
          this.form = res.data
          let arr = []
          res.data.qualificationRequirements.forEach(i => {
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
      this.form.qualificationRequirements = []
      datalist.forEach(item => {
        if (item.listQualificationCategory.length === 0) {
          this.selectedList.push({id: item.id, label: item.categoryName})
          this.form.qualificationRequirements.push(item.categoryName)
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
          if (typeof newForm.qualificationRequirements === 'object') {
            newForm.qualificationRequirements
                = JSON.stringify(newForm.qualificationRequirements)
          }
          delete newForm.gmtCreate
          delete newForm.gmtModified
          delete newForm.status
          try {
            const res = await this.$http.put('/qualification-transfer/update', newForm)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            this.$message.error(res.message)
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
}
</script>

<style scoped lang="less">
.qualification-transfer-edit {
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
