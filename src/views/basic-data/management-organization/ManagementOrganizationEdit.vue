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
          <el-input size="small" disabled placeholder="请输入用户中文姓名" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构">
          <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择所在机构">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input size="small" placeholder="请输入用户中文姓名" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="是否在职">
          <el-select style="width: 100%" size="small" v-model="form.name">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置角色">
          <el-select style="width: 100%" multiple size="small" v-model="form.name" placeholder="请选择用户角色">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input size="small" placeholder="请输入联系方式" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择用户角色">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-input-number style="width: 100%" size="small" placeholder="请输入用户年龄"
                           v-model="form.name" controls-position="right" min="0"/>
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
  name: 'ManagementOrganizationEdit',
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
.management-organization-edit {
  .margin {
    margin: 0 250px;
  }

}
</style>
