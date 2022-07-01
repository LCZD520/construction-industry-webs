/**
* Created by Lv Cheng on 2022/6/21
* Notes 公司账户编辑
*/
<template>
  <div class="company-account-edit">
    <el-form label-width="120px" :model="form" ref="form" :rules="rules">
      <el-form-item label="银行名称" prop="bankName">
        <el-select style="width: 100%" size="small" v-model="form.bankName" placeholder="请选择银行名称">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户行" prop="openingBank">
        <el-input size="small" maxlength="30" placeholder="请输入开户行" v-model.trim="form.openingBank"/>
      </el-form-item>
      <el-form-item label="户名" maxlength="30" prop="accountName">
        <el-input size="small" clearable placeholder="请输入户名" v-model.trim="form.accountName"/>
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCardNo">
        <el-input size="small" maxlength="20" clearable placeholder="请输入银行卡号" v-model.trim="form.bankCardNo"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
            size="small"
            maxlength="100"
            show-word-limit
            clearable placeholder="请输入备注......" type="textarea" :rows="3" v-model.trim="form.remark"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="handleSubmit">
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
      form: {
        enterpriseAccountId:null,
        bankName: null,
        openingBank: '',
        accountName: '',
        bankCardNo: '',
        remark: '',
      },
      rules: {
        bankName: [
          {required: true, message: '请输入开户行', trigger: 'change'},
        ],
        openingBank: [
          {required: true, message: '请输入户名', trigger: 'blur'}
        ],
        accountName: [
          {required: true, message: '请输入户名', trigger: 'blur'}
        ],
        bankCardNo: [
          {required: true, message: '请输入银行卡号', trigger: 'blur'}
        ],
        remark: [
          {required: false}
        ],
      },
      options: [
        {
          value: 1,
          label: '中国银行',
        }
      ]
    }
  },
  created() {
    this.getEnterpriseAccountById(this.$route.params.id / 1)
  },
  methods: {
    getEnterpriseAccountById(_id) {
      this.$http.get('/enterprise-account/detail/' + _id).then(res => {
        if (res.status) {
          this.form = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.put('/enterprise-account/update', this.form).then(res => {
            if (res.status) {
              this.$router.back()
              this.$message.success(res.message)
              return
            }
            this.$message.error(res.message)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.company-account-edit {
  margin: 0 250px;
}
</style>
