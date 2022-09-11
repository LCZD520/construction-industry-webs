/**
* Created by Lv Cheng on 2022/6/24
* Notes
*/
<template>
  <div class="account-add-edit-dialog">
    <el-dialog
        :close-on-click-modal="false"
        style="margin-top: 8vh"
        width="50%"
        :title="dialogTitle"
        :visible.sync="innerVisible"
        :before-close="()=>$emit('closeDialog')"
        append-to-body>
      <el-form
          label-position="right"
          label-width="80px"
          ref="form"
          :rules="rules"
          :model="form">
        <el-form-item label="银行" prop="bankName">
          <el-select class="width-full" clearable v-model="form.bankName" placeholder="请选择银行">
            <el-option
                v-for="item in this.$store.state.bank_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <p style="margin-left: 80px;color: #409EFF">提示：填写省和市</p>
        <el-form-item label="开户行" prop="openBank">
          <el-input clearable v-model="form.openBank" placeholder="请选择开户行">
          </el-input>
        </el-form-item>
        <el-form-item label="户名" prop="accountName">
          <el-input clearable v-model="form.accountName" placeholder="请选择银行卡号">
          </el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCardNo">
          <el-input clearable v-model="form.bankCardNo" placeholder="请选择银行卡号">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="$emit('handleSubmit')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountAddEditDialog',
  components: {},
  props: {
    innerVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {
      }
    },
    dialogTitle: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      options: [],
      rules: {
        bankName: [
          {required: true, message: '请选择银行', trigger: 'change'}
        ],
        openBank: [
          {required: true, message: '请填写开户行', trigger: 'blur'}
        ],
        accountName: [
          {required: true, message: '请填写户名', trigger: 'blur'}
        ],
        bankCardNo: [
          {required: true, message: '请填写银行卡号', trigger: 'blur'}
        ],
      },
    }
  },
}
</script>

<style scoped lang="less">

</style>
