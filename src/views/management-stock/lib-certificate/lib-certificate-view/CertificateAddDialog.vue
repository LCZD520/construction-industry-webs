/**
* Created by Lv Cheng on 2022/6/26
* Notes 人才查询查看-添加证件弹窗
*/
<template>
  <el-dialog
      :close-on-click-modal=false
      width="50%"
      title="添加证件"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <div class="dialog-content">
      <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-width="120px"
          label-position="right">
        <el-form-item class="required" prop="mechanismId" label="证件所在分支">
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
              v-model="form.mechanismId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="证件去向" prop="certificatesWhereabouts">
          <el-select class="width-full" size="small" v-model="form.certificatesWhereabouts">
            <el-option
                v-for="item in this.$store.state.certificates_whereabouts_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型" prop="listCertificatesType">
          <el-select
              clearable
              collapse-tags
              multiple
              class="width-full" size="small" v-model="form.listCertificatesType">
            <el-option
                v-for="item in this.$store.state.certificates_category_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一备注" prop="remark">
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
    return {
      form: {
        talentId: this.$route.params.id / 1 | null,
        mechanismId: null,
        listCertificatesType: [],
        certificatesWhereabouts: 1,
        remark: '',
      },
      rules: {
        mechanismId: [
          {required: true, message: '请选择证件所在分支', trigger: 'change'}
        ],
        listCertificatesType: [
          {required: false}
        ],
        certificatesWhereabouts: [
          {required: false}
        ],
        remark: [
          {required: false}
        ],
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    listMechanismsTree: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSubmit() {
      this.$http.post('/talent-certificates/insert', this.form).then(res => {
        if (res.status) {
          this.$message.success(res.message)
          this.$refs.form.resetFields()
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
  }
}
</script>

<style scoped lang="less">

</style>
