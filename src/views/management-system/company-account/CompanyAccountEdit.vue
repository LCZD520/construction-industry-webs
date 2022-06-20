/**
* Created by Lv Cheng on 2022/6/21
* Notes 公司账户编辑
*/
<template>
  <div class="company-account-edit">
    <el-form label-width="120px">
      <el-form-item label="银行名称">
        <el-select style="width: 100%" size="small" v-model="form.name" placeholder="请选择银行名称">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input size="small" placeholder="请输入开户行" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="户名">
        <el-input size="small" clearable placeholder="请输入户名" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input size="small" clearable placeholder="请输入银行卡号" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input size="small" clearable placeholder="请输入备注......" type="textarea" :rows="3" v-model="form.name"/>
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
  name: 'CompanyAccountEdit',
  components: {},
  data() {
    return {
      form:{
        name:''
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.company-account-edit{
  margin: 0 250px;
}
</style>
