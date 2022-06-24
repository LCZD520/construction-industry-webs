/**
* Created by Lv Cheng on 2022/6/25
* Notes 机构编辑
*/
<template>
  <div class="institution-edit">
    <el-divider content-position="left">机构编辑</el-divider>
    <div class="margin">
      <el-form
          label-width="100px"
          label-position="right"
          :model="form">
        <el-form-item label="层级">
          <el-input disabled size="small" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input size="small" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构编号">
          <el-input size="small" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构描述">
          <el-input type="textarea" :rows="3" size="small" v-model="form.name"/>
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
  name: 'InstitutionEdit',
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
.institution-edit {
  .margin {
    margin: 0 200px;
  }
}
</style>
