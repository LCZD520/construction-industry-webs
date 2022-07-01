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
            @click="handleSubmit"
            type="primary"
            icon="el-icon-plus">提 交
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
      checkAll: false,
      loading: false,
      listPermissions: [],
      defaultProps: {
        children: 'subListPermissions',
        label: 'permissionName'
      }
    }
  },
  created() {
    this.getListPermissions()
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        this.$refs.tree.setCheckedNodes(this.listPermissions);
        return
      }
      this.$refs.tree.setCheckedKeys([])
    },
    handleSubmit() {
      this.$http.post('/role-permission/insert-batch', {
        list: this.$refs.tree.getCheckedKeys(),
        roleId: this.$route.query.id / 1
      }).then(res => {
        console.log(res)
      })
    },
    getListPermissions() {
      this.loading = true
      this.$http.get('/permission/get-list-permissions').then(res => {
        if (res.status) {
          if (res.data.listPermissions !== null) {
            this.listPermissions = res.data.listPermissions
          }
        }
        this.loading = false
      })

    },
  },
}
</script>

<style lang="less">
@import "../../../assets/css/common-el-tree";
</style>
