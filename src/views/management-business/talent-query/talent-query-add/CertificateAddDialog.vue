/**
* Created by Lv Cheng on 2022/6/23
* Notes 添加证书弹窗
*/
<template>
  <div class="certificate-add-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="50%"
        title="添加证书"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="formData"
              label-width="120px"
              :model="form">
            <el-form-item label="级别专业">
              <el-cascader
                  class="width-full"
                  clearable
                  ref="cascader"
                  @expand-change="cascaderClick"
                  @visible-change="cascaderClick"
                  :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                  placeholder="请选择级别专业"
                  :options="this.$provinceAndCityData"
                  @change="handleChange"
                  v-model="form.area">
              </el-cascader>
            </el-form-item>
            <el-form-item label="初始转注">
              <el-select
                  class="width-full" v-model="form.name" placeholder="请选择初始转注">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发证日期">
              <el-date-picker
                  class="width-full"
                  v-model="form.name"
                  type="date"
                  placeholder="请选择发证日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="继续教育日期">
              <el-date-picker
                  class="width-full"
                  v-model="form.name"
                  type="date"
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
            @click="handleConfirm">确 认
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
      form: {
        name: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    beforeClose() {
      this.$emit('closeDialog')
    },
    handleChange(_val) {
      console.log(_val)
    },
  }
}
</script>

<style scoped lang="less">

</style>
