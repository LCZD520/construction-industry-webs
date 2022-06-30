/**
* Created by Lv Cheng on 2022/6/21
* Notes 设置权限
*/
<template>
  <div class="management-role-set-permissions">
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
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ManagementRoleSetPermissions',
  components: {},
  data() {
    return {
      checkAll: false,
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
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    getListPermissions() {
      this.$http('/permission/get-list-permissions').then(res => {
        if (res.status) {
          if (res.data.listPermissions !== null) {
            this.listPermissions = res.data.listPermissions
          }
        }
      })
    },
  },
}
</script>

<style lang="less">
.el-tree {
  color: #ff1089;
  background: #eee;

  .el-tree-node__label {
    font: 800 20px/2 "Microsoft Yahei";
  }

  .el-tree-node__content {
    height: 46px;

    .el-tree-node__label {
      font: 700 16px/2 "Microsoft Yahei";
    }
  }

  .el-tree-node__children {
    display: flex;
    color: #409EFF;
    background: #F8F9FB;
    flex-wrap: wrap;
    flex-direction: column;

    .el-tree-node__content {
      height: 36px;

      .el-tree-node__label {
        font: 600 14px/2 "Microsoft Yahei";
      }

      .el-tree-node__children {
        padding: 10px;
      }
    }

    .el-tree-node__children {
      display: flex;
      flex-direction: row;

      .el-tree-node__content {
        width: 310px;
        height: 28px;
        background: #fff;
        color: #666;
        border-left: 1px solid #abdcff;
        padding-left: 0 !important;
      }
    }
  }
}

.el-tree-node__content:hover {
  background: unset !important;
}

.el-tree-node:focus > .el-tree-node__content {
  background: unset;
}
</style>
