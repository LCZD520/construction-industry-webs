/**
* Created by Lv Cheng on 2022/6/24
* Notes 职称评审/三类人员/学历提升转账审批详情对话框
*/
<template>
  <div class="approval-detail-dialog">
    <el-dialog
        width="70%"
        title="转账审批详情"
        :visible.sync="visible"
        :before-close="()=>$emit('closeDialog')">
      <el-form label-width="120px" disabled>
        <el-form-item label="审批详情">
          <el-card>
            <el-steps v-if="formData.listAuditRecords && formData.listAuditRecords.length > 0"
                      direction="vertical" :active="6"
                      align-center>
              <el-step
                  v-for="(item,index) in form.listAuditRecords"
                  style="line-height: 28px;"
                  :key="index"
                  :title="item.auditStatus"
                  icon="el-icon-s-help">
                <el-card slot="description" shadow="hover">
                <span style="color: #409EFF" class="description-item">
                  <i class="el-icon-user-solid"></i>
                  <span>
                    审批人【{{ $valueToLabel(item.creatorId, $store.state.user_options) }}】
                  </span>
                </span>
                  <span style="color: #67C23A" class="description-item">
                    <i class="el-icon-info"></i>
                    <span>
                      审批意见【{{ item.approvalOpinion }}】
                    </span>
                  </span>
                  <span style="color: #E6A23C" class="description-item">
                    <i class="el-icon-date"></i>
                      {{ item.gmtCreate }}
                  </span>
                </el-card>
              </el-step>
            </el-steps>
            <el-tag v-else type="primary">暂无审批流水</el-tag>
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
