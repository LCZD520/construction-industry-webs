/**
* Created by Lv Cheng on 2022/6/26
* Notes
*/
<template>
  <el-dialog
      :close-on-click-modal=false
      width="50%"
      title="编辑证件"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <div class="dialog-content">
      <el-form
          label-width="120px"
          label-position="right">
        <el-form-item class="required" label="证件所在分支">
          <el-cascader
              size="small"
              class="width-full"
              clearable
              ref="cascader"
              @expand-change="cascaderClick"
              @visible-change="cascaderClick"
              :props="{ expandTrigger: 'hover' ,checkStrictly:true
              ,emitPath:false,value:'mechanismId',label:'mechanismName'
              ,children:'subListMechanisms'}"
              :options="listMechanismsTree"
              @change="handleChange"
              v-model="form.mechanismId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
              clearable
              class="width-full" size="small" v-model="form.certificatesType">
            <el-option
                v-for="item in this.$store.state.certificates_category_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input size="small" type="textarea" :rows="3" v-model="form.remark"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
      <el-button
          size="small"
          type="primary" @click="handleSubmit">提 交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CertificateAddEditDialog',
  components: {},
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {
      }
    },
    listMechanismsTree: {
      type: Array,
      default: () => []
    }
  },
  created() {
  },
  methods: {
    handleSubmit() {
      this.$http.put('/talent-certificates/update', this.form).then(res => {
        if (res.status) {
          this.$message.success(res.message)

          this.$emit('closeDialog')
          this.$emit('getListCertificates')
          return
        }
        this.$message.error(res.message)
      })
    },
    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
              }
            })
      }, 1)
    },
    handleChange(_val) {
      console.log(_val)
    },
  }
}
</script>

<style scoped lang="less">

</style>
