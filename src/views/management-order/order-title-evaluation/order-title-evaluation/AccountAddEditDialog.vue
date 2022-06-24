/**
* Created by Lv Cheng on 2022/6/24
* Notes
*/
<template>
  <div class="account-add-edit-dialog">
    <el-dialog
        style="margin-top: 15vh"
        width="50%"
        title="账户信息"
        :visible.sync="innerVisible"
        :before-close="()=>$emit('closeDialog')"
        append-to-body>
      <el-form
          label-position="right"
          label-width="80px"
          ref="formData"
          :model="formData">
        <el-form-item label="银行">
          <el-select class="width-full" size="small" v-model="formData.name" placeholder="请选择银行">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input size="small" v-model="formData.name" placeholder="请选择开户行">
          </el-input>
        </el-form-item>
        <el-form-item label="户名">
          <el-input size="small" v-model="formData.name" placeholder="请选择银行卡号">
          </el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input size="small" v-model="formData.name" placeholder="请选择银行卡号">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountAddEditDialog',
  components: {},
  data() {
    return {
      options: []
    }
  },
  props: {
    innerVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    handleSubmit: {
      type: Function,
    }
  },
}
</script>

<style scoped lang="less">

</style>
