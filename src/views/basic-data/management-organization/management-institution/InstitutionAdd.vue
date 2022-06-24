/**
* Created by Lv Cheng on 2022/6/25
* Notes 机构添加
*/
<template>
  <div class="institution-add">
    <el-divider content-position="left">机构编辑</el-divider>
    <div class="margin">
      <el-form
          label-width="100px"
          label-position="right"
          :model="form">
        <el-form-item label="父机构">
          <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择上一级机构">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input size="small" placeholder="请输入机构名称" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构编号">
          <el-input size="small" placeholder="请输入机构编号" v-model="form.name"/>
        </el-form-item>
        <el-form-item label="机构描述">
          <el-input type="textarea" :rows="3" size="small" placeholder="请输入机构描述" v-model="form.name"/>
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
  name: 'InstitutionAdd',
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
.institution-add {
  .margin {
    margin: 0 200px;
  }
}
</style>
