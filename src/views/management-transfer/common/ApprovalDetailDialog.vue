/**
* Created by Lv Cheng on 2022/6/24
* Notes 职称评审/三类人员/学历提升转账审批详情对话框
*/
<template>
  <div class="approval-detail-dialog">
    <el-dialog
        width="70%"
        title="资质收购转账审批详情"
        :visible.sync="visible"
        :before-close="()=>$emit('closeDialog')">
      <el-form label-width="120px" disabled>
        <el-form-item label="审批详情">
          <el-card>
            <el-steps direction="vertical" :active="6" align-center>
              <el-step
                  v-for="(item,index) in 5"
                  style="line-height: 28px;"
                  :key="index"
                  icon="el-icon-s-help">
                <el-card slot="title" shadow="hover">
                <span style="color: #409EFF" class="description-item">
                  <i class="el-icon-user-solid"></i>
                  <span>
                    审批人【】
                  </span>
                </span>
                  <span style="color: #67C23A" class="description-item">
                    <i class="el-icon-info"></i>
                    <span>
                      审批意见【】
                    </span>
                  </span>
                  <span style="color: #E6A23C" class="description-item">
                    <i class="el-icon-date"></i>
                      2022-06-20
                  </span>
                </el-card>
              </el-step>
            </el-steps>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ApprovalDetailDialog',
  components: {},
  data() {
    return {}
  },
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
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
