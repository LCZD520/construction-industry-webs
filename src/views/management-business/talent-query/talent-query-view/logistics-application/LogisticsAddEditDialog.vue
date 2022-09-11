/**
* Created by Lv Cheng on 2022/7/5
* Notes 后勤记录添加/编辑弹窗
*/
<template>
  <div class="logistics-add-edit-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="70%"
        :title="dialogTitle"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="form"
              :rules="rules"
              label-width="100px"
              :model="form">
            <el-form-item label="后勤项目" prop="logisticsProjectType">
              <el-select clearable v-model="form.logisticsProjectType" class="width-full" placeholder="请选择后勤项目">
                <el-option
                    v-for="item in this.$store.state.logistics_project_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-row v-if="form.logisticsProjectType===2 && form.logisticsProjectType !== null" :gutter="20">
              <el-col :span="12">
                <el-form-item prop="recipient" label="收件人">
                  <el-input placeholder="请输入收件人" v-model="form.recipient"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                    prop="address" label="地址">
                  <el-input placeholder="请输入地址" v-model="form.address"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.logisticsProjectType===2 && form.logisticsProjectType !== null" :gutter="20">
              <el-col :span="12">
                <el-form-item prop="telephoneNumber" label="电话号码">
                  <el-input placeholder="请输入电话号码" v-model="form.telephoneNumber"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                    prop="detailItem" label="邮寄详细物品">
                  <el-input placeholder="请输入邮寄详细物品" v-model="form.detailItem"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="addRemark" label="备注">
              <el-input resize="none" clearable v-model="form.addRemark" placeholder="请输入备注..." :rows="3"
                        type="textarea">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            @click="()=>$emit('confirm',this.form)">确 认
        </el-button>
        <el-button size="small" @click="beforeClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LogisticsAddEditDialog',
  components: {},
  data() {
    return {
      rules: {
        visitContent: [
          {required: false, trigger: 'change'}
        ],
        recipient: [
          {required: false, trigger: 'blur'}
        ],
        address: [
          {required: false, trigger: 'blur'}
        ],
        telephoneNumber: [
          {required: false, trigger: 'blur'}
        ],
        detailItem: [
          {required: false, trigger: 'blur'}
        ],
        addRemark: [
          {required: false, trigger: 'blur'}
        ],
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    beforeClose() {
      this.$emit('closeDialog')
    },
  }
}
</script>

<style scoped lang="less">

</style>
