/**
* Created by Lv Cheng on 2022/6/21
* Notes 角色编辑
*/
<template>
  <div class="management-role-edit">
    <el-divider content-position="left">角色编辑</el-divider>
    <div class="margin">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input size="small" placeholder="请输入角色名称" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择是否启用角色">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限">
          <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择数据权限">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input size="small" clearable placeholder="请填写角色描述......" type="textarea" :rows="3" v-model="form.name"/>
        </el-form-item>
        <el-form-item label=" ">
          <el-button icon="el-icon-plus" type="primary" size="small">
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
  name: 'ManagementRoleEdit',
  components: {},
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.management-role-edit {
  .margin {
    margin: 0 250px;
  }
}
</style>
