/**
* Created by Lv Cheng on 2022/6/28
* Notes
*/
<template>
  <div class="management-permission">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="父级权限" prop="parentId">
        <el-cascader
            class="width-full"
            clearable
            ref="cascader"
            @expand-change="cascaderClick"
            @visible-change="cascaderClick"
            :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false,label:'permissionName',value:'permissionId',children:'subListPermissions'}"
            placeholder="请选择父级权限"
            :options="options"
            v-model="form.parentId">
        </el-cascader>
      </el-form-item>
      <el-form-item label="权限名称" prop="permissionName">
        <el-input v-model.trim="form.permissionName"/>
      </el-form-item>
      <el-form-item label="权限uri" prop="permissionUri">
        <el-input v-model.trim="form.permissionUri"/>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="handleSubmit">添加</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ManagementPermission',
  components: {},
  data() {
    return {
      form: {
        creatorId: 1,
        regeneratorId: 1,
        permissionName: '',
        enabled: true,
        permissionUri: '/',
        parentId: 65,
      },
      rules: {
        parentId: [
          {required: true, message: '不能为空', trigger: 'change'}
        ],
        permissionName: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        permissionUri: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
      },
      options: [

      ]
    }
  },
  created() {
    this.getListPermissions()
  },
  methods: {
    getListPermissions() {
      this.$http('/permission/get-list-permissions').then(res => {
        if (res.status) {
          console.log(res)
          if (res.data.listPermissions !== null) {
            this.options = res.data.listPermissions
          }
        }
      })
    },
    handleSubmit() {
      console.log(this.form)
      this.$axios.post('/permission/add', this.form).then(res => {
        if (res.status) {
          this.$message.success(res.message)
          this.getListPermissions()
          // this.$refs['form'].resetFields()
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
  }
}
</script>

<style scoped lang="less">
</style>
