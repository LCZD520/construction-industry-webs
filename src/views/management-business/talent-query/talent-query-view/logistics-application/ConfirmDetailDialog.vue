/**
* Created by Lv Cheng on 2022/7/6
* Notes
*/
<template>
  <div class="confirm-detail-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="60%"
        title="确认详情"
        :visible.sync="visible"
        :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              disabled
              ref="form"
              label-width="100px"
              :model="form">
            <el-form-item label="确认人" prop="logisticsProjectType">
              <el-select clearable v-model="form.regeneratorId" class="width-full">
                <el-option
                    v-for="item in this.$store.state.user_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item prop="recipient" label="确认时间">
                <el-input v-model="form.gmtModified"/>
              </el-form-item>
              <el-form-item
                  prop="address" label="费用">
                <el-input v-model="form.confirmCost"/>
              </el-form-item>
              <el-form-item prop="addRemark" label="确认备注">
                <el-input resize="none" clearable v-model="form.confirmRemark" :rows="3"
                          type="textarea">
                </el-input>
              </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDetailDialog',
  components: {},
  props: {
    form: {
      type: Object,
      default: () => {
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
