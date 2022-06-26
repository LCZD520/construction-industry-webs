/**
* Created by Lv Cheng on 2022/6/24
* Notes 添加/编辑证件对话框
*/
<template>
  <el-dialog
      width="50%"
      :title="dialogTitle"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <el-form
        label-position="right"
        label-width="100px"
        ref="formData"
        :model="formData">
      <el-form-item label="证件所在分支">
        <el-select class="width-full" size="small" v-model="formData.name" placeholder="请选择证件所在分支">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select class="width-full" size="small" v-model="formData.name" placeholder="请选择证件类型">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="3" size="small" v-model="formData.name" placeholder="请输入备注信息...">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CertificateAddEditDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
      }
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    handleSubmit: {
      type: Function,
    }
  },
  data() {
    return {
      options: []
    }
  },

}
</script>

<style scoped lang="less">

</style>
