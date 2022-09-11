/**
* Created by Lv Cheng on 2022/7/5
* Notes 回访记录添加/编辑
*/
<template>
  <div class="visit-record-add-edit">
    <el-dialog
        :close-on-click-modal=false
        width="70%"
        :title="dialogTitle"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="formData"
              :rules="rules"
              label-width="140px"
              :model="form">
            <el-form-item prop="visitContent" label="本次回访内容">
              <el-input resize="none" clearable v-model="form.visitContent" placeholder="请输入本次回访内容..." :rows="8"
                        type="textarea">
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="needVisitAgain" label="是否需要再次回访">
                  <el-radio-group v-model="form.needVisitAgain">
                    <el-radio
                        v-for="item in this.$store.state.is_need_options"
                        :key="item.value"
                        :label="item.value">
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                    prop="nextVisitDate" label="下次回访日期">
                  <el-date-picker
                      class="width-full"
                      v-model="form.visitAgainTime"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择发证日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
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
  name: 'VisitRecordAddEdit',
  components: {},
  data() {
    return {
      rules: {
        visitContent: [
          {required: true, message: '请填写本次回访内容', trigger: 'change'}
        ],
        needVisitAgain: [
          {required: true, message: '请选择是否需要下次回访', trigger: 'change'}
        ],
        visitAgainTime: [
          {required: false, trigger: 'change'}
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
