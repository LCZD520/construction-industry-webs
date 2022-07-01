/**
* Created by Lv Cheng on 2022/6/21
* Notes 角色编辑
*/
<template>
  <div class="management-role-edit">
    <el-divider content-position="left">角色编辑</el-divider>
    <div class="margin">
      <el-form ref="form" label-width="120px" :rules="rules" :model="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model.trim="form.roleName"/>
        </el-form-item>
        <el-form-item label="是否启用" prop="enabled">
          <el-select clearable class="width-full" v-model="form.enabled" placeholder="请选择是否启用角色">
            <el-option
                v-for="item in $store.state.bool_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限" prop="dataPermission">
          <el-select clearable class="width-full" v-model="form.dataPermission" placeholder="请选择数据权限">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
              maxlength="100"
              show-word-limit
              clearable
              placeholder="请填写角色描述......"
              type="textarea"
              :rows="3"
              v-model.trim="form.description"/>
        </el-form-item>
        <el-form-item label=" ">
          <el-button
              icon="el-icon-plus" type="primary"
              @click="handleSubmit">
            保存
          </el-button>
          <el-button icon="el-icon-back" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagementRoleEdit',
  components: {},
  data() {
    return {
      form: {
        roleName: '',
        enabled: null,
        dataPermission: null,
        description: '',
      },
      rules: {
        roleName: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
        enabled: [
          {required: true, message: '不能为空', trigger: 'change'}
        ],
        dataPermission: [
          {required: true, message: '不能为空', trigger: 'change'}
        ],
      },
      options: [
        {
          value: 1,
          label: '全部',
        },
        {
          value: 2,
          label: '层级',
        },
        {
          value: 3,
          label: '个体',
        },
      ]
    }
  },
  created() {
    this.getRoleById(this.$route.query.id / 1)
  },
  methods: {
    getRoleById(_id) {
      this.$http.get('/role/get-role/' + _id).then(res => {
        if (res.status) {
          this.form = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        delete this.form.gmtCreate
        delete this.form.gmtModified
        delete this.form.creatorId
        delete this.form.regeneratorId
        if (valid) {
          this.$http.put('/role/update', this.form).then(res => {
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
            }
          })
          return
        }
        this.$message.error('输入的信息有误！提交失败')
      })
    },
  }
}
</script>

<style scoped lang="less">
.management-role-edit {
  .margin {
    margin: 0 250px;
  }
}
</style>
