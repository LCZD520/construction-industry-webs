/**
* Created by Lv Cheng on 2022/6/24
* Notes 资质收购转账审批详情对话框
*/
<template>
  <div class="approval-detail-dialog">
    <el-dialog
        width="70%"
        title="资质收购转账审批详情"
        :visible.sync="visible"
        :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="padding: 0 10px">
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
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="申请转账金额">
                    <el-input size="small" v-model="formData.name"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人">
                    <el-input size="small" v-model="formData.name"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户户名">
                    <el-input size="small" v-model="formData.name"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="银行">
                    <el-select size="small" v-model="formData.name">
                      <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户行">
                    <el-input size="small" v-model="formData.name"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账户卡号">
                    <el-input size="small" v-model="formData.name"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="申请状态">
                    <el-select size="small" v-model="formData.name">
                      <el-option
                          v-for="item in []"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="备注">
                <el-input style="width: 100%" size="small" type="textarea" :rows="3" v-model="formData.name"/>
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
