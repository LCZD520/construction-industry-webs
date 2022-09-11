/**
* Created by Lv Cheng on 2022/6/25
* Notes 机构添加
*/
<template>
  <div class="institution-add">
    <el-divider content-position="left">机构添加</el-divider>
    <div class="margin">
      <el-form
          ref="form"
          :rules="rules"
          label-width="100px"
          label-position="right"
          :model="form">
        <el-form-item label="父机构" prop="parentId">
          <el-cascader
              size="small"
              class="width-full"
              clearable
              ref="cascader"
              @expand-change="cascaderClick"
              @visible-change="cascaderClick"
              :props="{ expandTrigger: 'hover' ,checkStrictly:true
              ,emitPath:false,value:'mechanismId',label:'mechanismName'
              ,children:'subListMechanisms'}"
              placeholder="请选择上一级机构"
              :options="$store.state.mechanisms.listMechanisms"
              @change="handleChange"
              v-model="form.parentId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="机构名称" prop="mechanismName">
          <el-input size="small" placeholder="请输入机构名称" v-model.trim="form.mechanismName"/>
        </el-form-item>
        <el-form-item label="机构编号" prop="mechanismNumber">
          <el-input size="small" placeholder="请输入机构编号" v-model.trim="form.mechanismNumber"/>
        </el-form-item>
        <el-form-item label="机构描述" prop="description">
          <el-input type="textarea" :rows="3" size="small" placeholder="请输入机构描述" v-model.trim="form.description"/>
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
  name: 'InstitutionAdd',
  components: {},
  data() {
    return {
      form: {
        parentId: null,
        mechanismName: '',
        mechanismNumber: '',
        description: '',
      },
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
  methods: {
    handleSubmit() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/mechanism/insert', this.form).then(res => {
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            this.$message.error(res.message)
          })
          return
        }
        this.$message.error('输入有误')
      })


    },
    handleChange(_val) {
      console.log(_val)
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
  }
}
</script>

<style scoped lang="less">
.institution-add {
  .margin {
    margin: 0 200px;
  }
}
</style>
