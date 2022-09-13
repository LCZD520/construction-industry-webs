/**
* Created by Lv Cheng on 2022/6/21
* Notes 组织管理编辑
*/
<template>
  <div class="management-organization-edit">
    <el-divider content-position="left">用户编辑</el-divider>
    <div class="margin">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="form.username"/>
        </el-form-item>
        <el-form-item label="机构" prop="mechanismId">
          <el-cascader
              class="width-full"
              clearable
              ref="cascader"
              @expand-change="cascaderClick"
              @visible-change="cascaderClick"
              :props="{ expandTrigger: 'hover' ,checkStrictly:true
              ,emitPath:false,value:'mechanismId',label:'mechanismName'
              ,children:'subListMechanisms'}"
              placeholder="请选择机构"
              :options="$store.state.mechanisms.listMechanisms"
              v-model="form.mechanismId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input placeholder="请输入用户中文姓名" v-model="form.fullName"/>
        </el-form-item>
        <el-form-item label="是否在职" prop="onJob">
          <el-select style="width: 100%" v-model="form.onJob">
            <el-option
                v-for="item in $store.state.bool_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置角色" prop="listRoleIds">
          <el-select style="width: 100%" multiple v-model="form.listRoleIds" placeholder="请选择用户角色">
            <el-option
                v-for="item in $store.state.roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephoneNumber">
          <el-input placeholder="请输入联系方式" v-model="form.telephoneNumber"/>
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
          <el-select style="width: 100%" v-model="form.sex" placeholder="请选择用户性别">
            <el-option
                v-for="item in $store.state.sex_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input-number style="width: 100%" placeholder="请输入用户年龄"
                           v-model="form.age" controls-position="right" :min="0"/>
        </el-form-item>
        <el-form-item label=" ">
          <el-button icon="el-icon-plus" type="primary" v-throttle="handleSave">
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
  name: 'ManagementOrganizationEdit',
  components: {},
  data() {
    const roleValidator = (rule, value, callback) => {
      if (this.form.listRoleIds.length < 1) {
        callback(new Error('请设置角色'))
      }
      callback()
    }
    return {
      form: {
        userId: null,
        username: '',
        mechanismId: null,
        fullName: '',
        onJob: null,
        listRoleIds: [],
        telephoneNumber: '',
        sex: null,
        age: undefined,
      },
      rules: {
        mechanismId: [
          {required: true, message: '请选择机构', trigger: 'change'}
        ],
        fullName: [
          {required: true, message: '请填写姓名', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请填写用户名', trigger: 'change'},
          {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名不符合规则', trigger: 'change'}
        ],
        onJob: [
          {required: true, message: '请选择是否在职', trigger: 'change'}
        ],
        listRoleIds: [
          {required: true, validator: roleValidator, trigger: 'change'}
        ],
        telephoneNumber: [
          {required: false}
        ],
        sex: [
          {required: false}
        ],
        age: [
          {required: false}
        ],
      },
    }
  },
  created() {
    let userId = this.$route.params.id
    if (userId != null) {
      this.getDetailById(userId / 1)
    }

  },
  methods: {
    async getDetailById(_id) {
      const res = await this.$http.get('/user/detail/' + _id)
      if (res.status && res.data != null) {
        // eslint-disable-next-line no-unused-vars
        for (const resKey in res.data) {
          for (const key in this.form) {
            this.form[key] = res.data[key]
          }
        }
        if (this.form.age === null) {
          this.form.age = undefined
        }
      }
    },
    async handleSave() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form)
          try {
            const res = await this.$http.put('/user/update', this.form)
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
        this.$message.error('输入有误!')
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
.management-organization-edit {
  .margin {
    margin: 0 250px;
  }

}
</style>
