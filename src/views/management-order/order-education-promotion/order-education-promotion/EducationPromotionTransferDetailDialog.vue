/**
* Created by Lv Cheng on 2022/6/24
* Notes 学历提升转账详情对话框
*/
<template>
  <div class="education-promotion-transfer-detail-dialog">
    <el-dialog
        width="70%"
        title="学历提升转账详情"
        :visible.sync="innerVisible"
        :before-close="()=>$emit('closeDialog')"
        append-to-body>
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="padding: 0 10px">
            <el-form label-width="120px" disabled>
              <el-form-item label="审批详情">
                <el-card>
                  <el-tag size="mini" type="primary">暂无审批流水
                  </el-tag>
                  <!--                  <el-tag size="mini" type="primary"-->
                  <!--                          v-if="formData-->
                  <!--                          && formData.listAuditRecords-->
                  <!--                           && formData.listAuditRecords.length === 0">暂无审批流水-->
                  <!--                  </el-tag>-->
                  <!--                  <el-steps v-else direction="vertical" :active="6" align-center>-->
                  <!--                    <el-step-->
                  <!--                        v-for="(item,index) in formData.listAuditRecords"-->
                  <!--                        style="line-height: 28px;"-->
                  <!--                        :key="index"-->
                  <!--                        icon="el-icon-s-help">-->
                  <!--                      <el-card slot="title" shadow="hover">-->
                  <!--                        <span style="color: #409EFF" class="description-item">-->
                  <!--                  <i class="el-icon-user-solid"></i>-->
                  <!--                  <span>-->
                  <!--                    审批人【】-->
                  <!--                  </span>-->
                  <!--                </span>-->
                  <!--                        <span style="color: #67C23A" class="description-item">-->
                  <!--                    <i class="el-icon-info"></i>-->
                  <!--                    <span>-->
                  <!--                      审批意见【】-->
                  <!--                    </span>-->
                  <!--                  </span>-->
                  <!--                        <span style="color: #E6A23C" class="description-item">-->
                  <!--                    <i class="el-icon-date"></i>-->
                  <!--                      2022-06-20-->
                  <!--                  </span>-->
                  <!--                      </el-card>-->
                  <!--                    </el-step>-->
                  <!--                  </el-steps>-->
                </el-card>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="申请转账金额">
                    <el-input size="small" v-model="formData.transferAmount"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人">
                    <el-input size="small"
                              :value="this.$valueToLabel(formData.creatorId,this.$store.state.user_options)"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户户名">
                    <el-input size="small" v-model="formData.accountName"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="银行">
                    <el-input size="small" v-model="formData.bankName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行">
                    <el-input size="small" v-model="formData.openBank"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户卡号">
                    <el-input size="small" v-model="formData.bankCardNo"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="款项用途">
                    <el-select size="small" v-model="formData.fundsPurpose">
                      <el-option
                          v-for="item in $store.state.title_evaluation_transfer_funds_purpose_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请状态">
                    <el-input size="small" v-model="formData.applicationStatus"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注">
                <el-input style="width: 100%" size="small" type="textarea" :rows="3" v-model="formData.remark"/>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EducationPromotionTransferDetailDialog',
  components: {},
  data() {
    return {}
  },
  props: {
    innerVisible: {
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
