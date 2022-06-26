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
          label-width="120px"
          label-position="right">
        <el-form-item class="required" label="证件所在分支">
          <el-cascader
              class="width-full"
              size="small"
              clearable
              ref="cascader"
              @expand-change="cascaderClick"
              @visible-change="cascaderClick"
              :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
              placeholder="请选择证件所在分支"
              :options="this.$provinceAndCityData"
              @change="handleChange"
              v-model="form.name">
          </el-cascader>
        </el-form-item>
        <el-form-item label="证件去向">
          <el-select class="width-full" size="small" v-model="form.name">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select class="width-full" size="small" v-model="form.name">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统一备注">
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
        name: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('提交')
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
