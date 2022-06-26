/**
* Created by Lv Cheng on 2022/6/21
* Notes 公司账户查看
*/
<template>
  <div class="company-account-view">
    <el-form label-width="120px">
      <el-form-item label="银行名称">
        <el-select disabled style="width: 100%" size="small" v-model="form.bankName">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input disabled size="small" v-model="form.openingBank"/>
      </el-form-item>
      <el-form-item label="户名">
        <el-input disabled size="small" v-model="form.accountName"/>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input disabled size="small" v-model="form.bankCardNo"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input disabled size="small" type="textarea" :rows="3" v-model="form.remark"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CompanyAccountView',
  components: {},
  data() {
    return {
      form: {
        id: '',
        bankName: null,
        openingBank: '',
        accountName: '',
        bankCardNo: '',
        remark: '',
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.company-account-view {
  margin: 0 250px;
}
</style>
