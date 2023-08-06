/**
* Created by Lv Cheng on 2022/6/21
* Notes 设置权限
*/
<template>
  <div class="management-role-set-permissions">
    <CommonLoading v-if="loading"/>
    <div v-else>
      <el-checkbox
          v-model="checkAll"
          @change="handleCheckAllChange">
        {{ checkAll ? '全不选' : '全选' }}
      </el-checkbox>
      <br><br>
      <el-tree
          :data="listPermissions"
          show-checkbox
          :default-checked-keys="listCheckedKeys"
          check-on-click-node
          :expand-on-click-node="false"
          default-expand-all
          node-key="permissionId"
          ref="tree"
          :props="defaultProps">
      </el-tree>
      <br>
      <div class="buttons">
        <el-button
            v-throttle="handleSubmit"
            type="primary"
            icon="el-icon-plus">提 交
        </el-button>
        <el-button
            @click="$router.back()"
            icon="el-icon-back">返 回
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

import CommonLoading from "../../../components/CommonLoading";

export default {
  name: 'ManagementRoleSetPermissions',
  components: {CommonLoading},
  data() {
    return {
      roleId: this.$route.query.id || null,
      checkAll: false,
      loading: false,
      listPermissions: [],
      listCheckedKeys: [],
      defaultProps: {
        children: 'subListPermissions',
        label: 'permissionName'
      }
    }
  },
  created() {
    this.getListPermissions()
    this.getListPermissionsByRoleId()
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        this.$refs.tree.setCheckedNodes(this.listPermissions);
        return
      }
      this.$refs.tree.setCheckedKeys([])
    },
    async handleSubmit() {
      try {
        this.loading = true
        const res = await this.$http.post('/role-permission/insert-batch', {
          list: this.$refs.tree.getCheckedKeys(),
          roleId: this.roleId
        })
        if (res.status) {
          this.$message.success(res.message)
          await this.getListPermissionsByRoleId()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    getListPermissions() {
      this.loading = true
      this.$http.get('/permission/list').then(res => {
        if (res.status && res.data) {
          this.listPermissions = res.data
        }
        this.loading = false
      })

    },
    async getListPermissionsByRoleId() {
      this.loading = true
      try {
        const res = await this.$http.get(`/permission/list/${this.roleId}`)
        if (res.status && res.data) {
          this.listCheckedKeys = res.data
        }
      } catch (e) {
        console.log(e)
        this.$message.error('服务器异常')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less">
@import "../../../assets/css/common-el-tree";
</style>
