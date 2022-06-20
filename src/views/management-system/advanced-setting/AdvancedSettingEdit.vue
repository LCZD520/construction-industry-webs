/**
* Created by Lv Cheng on 2022/6/20
* Notes 高级设置编辑
*/
<template>
  <div class="advanced-setting-edit">
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input size="small" placeholder="请输入配置名称" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="代码">
        <el-input size="small" clearable placeholder="请输入配置代码" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="值">
        <el-input size="small" clearable placeholder="请输入配置值" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input size="small" clearable placeholder="请输入描述......" type="textarea" :rows="3" v-model="form.name"/>
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
</template>

<script>
export default {
  name: 'AdvancedSettingEdit',
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
.advanced-setting-edit {
  margin: 0 250px;
}
</style>
