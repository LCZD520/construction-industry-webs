/**
* Created by Lv Cheng on 2022/6/21
* Notes 组织管理编辑
*/
<template>
  <div class="management-organization-edit">
    <el-divider content-position="left">用户编辑</el-divider>
    <div class="margin">
      <el-form label-width="120px">
        <el-form-item label="用户名">
          <el-input disabled v-model="form.username"/>
        </el-form-item>
        <el-form-item label="机构">
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
        <el-form-item label="姓名">
          <el-input placeholder="请输入用户中文姓名" v-model="form.fullName"/>
        </el-form-item>
        <el-form-item label="是否在职">
          <el-select style="width: 100%" v-model="form.onJob">
            <el-option
                v-for="item in $store.state.bool_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置角色">
          <el-select style="width: 100%" multiple v-model="form.listRoleIds" placeholder="请选择用户角色">
            <el-option
                v-for="item in $store.state.roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input placeholder="请输入联系方式" v-model="form.telephoneNumber"/>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select style="width: 100%" v-model="form.sex" placeholder="请选择用户性别">
            <el-option
                v-for="item in $store.state.sex_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-input-number style="width: 100%" placeholder="请输入用户年龄"
                           v-model="form.age" controls-position="right" :min="0"/>
        </el-form-item>
        <el-form-item label=" ">
          <el-button icon="el-icon-plus" type="primary">
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
    return {
      form: {
        listRoleIds: []
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
        this.form = res.data
      }
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
