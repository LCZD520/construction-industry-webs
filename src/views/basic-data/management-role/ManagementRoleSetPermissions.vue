/**
* Created by Lv Cheng on 2022/6/21
* Notes 设置权限
*/
<template>
  <div class="management-role-set-permissions">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <br><br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div v-for="o in 4" :key="o" class="content">
        <div class="content-left">
          <el-checkbox label="复选框"></el-checkbox>
        </div>
        <div class="content-right">
          <el-row :gutter="20">
            <el-col v-for="item in 30" :key="item" :span="6">
              <el-checkbox :label="'复选框'+ item"></el-checkbox>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ManagementRoleSetPermissions',
  components: {},
  data() {
    return {
      isIndeterminate: false,
      checkAll: false
    }
  },
  mounted() {
  },
  methods: {
    handleCheckAllChange() {
      console.log('全选');
    }
  }
}
</script>

<style scoped lang="less">
.management-role-set-permissions {
  padding: 10px;
}

.box-card {
  .content {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 10px;

    .content-left {
      flex: 1;
      padding-left: 10px;
    }

    .content-right {
      flex: 6;
      padding:0 40px;
      border-left: 1px solid #ddd;
    }
  }

}

/deep/ .el-card__header {
  padding: 10px;
  background: #fafafa;
}
/deep/ .el-card__body{
  padding: 0;
}
</style>
