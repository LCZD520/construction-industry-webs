/**
* Created by Lv Cheng on 2022/6/23
* Notes 添加/编辑证书弹窗
*/
<template>
  <div class="certificate-add-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="50%"
        :title="dialogTitle"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="formData"
              :rules="rules"
              label-width="120px"
              :model="certificateForm">
            <el-form-item label="级别专业" prop="levelMajor">
              <el-cascader
                  class="width-full"
                  clearable
                  ref="cascaderLevelMajor"
                  @expand-change="cascaderClick('levelMajor')"
                  @visible-change="cascaderClick('levelMajor')"
                  :props="{ expandTrigger: 'hover',
                      checkStrictly: true,
                      value:'categoryName',
                      label:'categoryName',
                      children:'listCertificateCategory'}"
                  placeholder="请选择级别专业"
                  :options="this.$store.state.list_certificate_category"
                  v-model="certificateForm.levelMajor">
              </el-cascader>
            </el-form-item>
            <el-form-item prop="initialConversion" label="初始转注">
              <el-select
                  class="width-full" v-model="certificateForm.initialConversion" placeholder="请选择初始转注">
                <el-option
                    v-for="item in this.$store.state.initial_conversion_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="issueCertTime" label="发证日期">
              <el-date-picker
                  class="width-full"
                  v-model="certificateForm.issueCertTime"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择发证日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="continuingEducationDate" label="继续教育日期">
              <el-date-picker
                  class="width-full"
                  v-model="certificateForm.continuingEducationDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择继续教育日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            @click="()=>$emit('handleConfirm',this.certificateForm)">确 认
        </el-button>
        <el-button size="small" @click="beforeClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'certificateAddDialog',
  components: {},
  data() {
    return {
      loading: false,
      rules: {
        levelMajor: [
          {required: true, message: '请选择级别-专业', trigger: 'change'}
        ],
        initialConversion: [
          {required: false, trigger: 'change'}
        ],
        issueCertTime: [
          {required: false, trigger: 'change'}
        ],
        continuingEducationDate: [
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
    certificateForm: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    beforeClose() {
      this.$emit('closeDialog')
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            that.$refs.cascaderLevelMajor.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea.dropDownVisible = false
                  return
                }
                that.$refs.cascaderLevelMajor.dropDownVisible = false
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">

</style>
