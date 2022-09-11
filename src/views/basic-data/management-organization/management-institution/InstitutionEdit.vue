/**
* Created by Lv Cheng on 2022/6/25
* Notes 机构编辑
*/
<template>
  <div class="institution-edit">
    <el-divider content-position="left">机构编辑</el-divider>
    <div class="margin">
      <el-form
          label-width="100px"
          label-position="right"
          :model="form">
        <el-form-item label="层级">
          <el-cascader
              size="small"
              disabled
              class="width-full"
              clearable
              ref="cascader"
              @expand-change="cascaderClick"
              @visible-change="cascaderClick"
              :props="{ expandTrigger: 'hover' ,checkStrictly:true
              ,emitPath:false,value:'mechanismId',label:'mechanismName'
              ,children:'subListMechanisms'}"
              placeholder="请选择上一级机构"
              :options="listMechanisms"
              v-model="form.mechanismId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input size="small" v-model="form.mechanismName"/>
        </el-form-item>
        <el-form-item label="机构编号">
          <el-input size="small" v-model="form.mechanismNumber"/>
        </el-form-item>
        <el-form-item label="机构描述">
          <el-input type="textarea" :rows="3" size="small" v-model="form.description"/>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstitutionEdit',
  components: {},
  data() {
    return {
      form: {
        mechanismId: this.$route.params.id / 1 | null,
        parentId: null,
        mechanismName: '',
        mechanismNumber: '',
        description: '',
      },
      listMechanisms: [],
      rules: {
        parentId: [
          {required: true, message: '不能为空', trigger: 'change'}
        ],
        mechanismName: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        mechanismNumber: [
          {required: false}
        ],
        description: [
          {required: false}
        ],
      },
    }
  },
  created() {
    this.getList()
    this.getDetailById()
  },
  methods: {
    getList() {
      this.$http.get('/mechanism/list').then(res => {
        console.log(res)
        if (res.status && res.data.listMechanisms !== null) {
          this.listMechanisms = res.data.listMechanisms
        }
      })
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
    getDetailById() {
      this.$http.get('/mechanism/detail/' + this.form.mechanismId).then(res => {
        if (res.status) {
          console.log(res.data)
          for (let resKey in res.data) {
            for (let formKey in this.form) {
              if (resKey === formKey) {
                this.form[formKey] = res.data[resKey]
              }
            }
          }
        }
      })
    },
    handleSubmit() {
      this.$http.put('/mechanism/update', this.form).then(res => {
        if (res.status) {
          this.$router.back()
          this.$message.success(res.message)

          return
        }
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="less">
.institution-edit {
  .margin {
    margin: 0 200px;
  }
}
</style>
