/**
* Created by Lv Cheng on 2022/6/20
* Notes 资质代办转账审批
*/
<template>
  <div class="transfer-qualification-agency-audit">
    <el-form label-position="right" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办公司">
            <el-input disabled size="small" :value="form.agencyCompany"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" :value="form.transferAmount"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-input disabled size="small" :value="form.fundsPurpose">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="银行名称">
            <el-input disabled size="small" :value="form.bankName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行">
            <el-input disabled size="small" :value="form.openBank"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户">
            <el-input disabled size="small" :value="form.accountName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="银行卡号">
            <el-input disabled size="small" :value="form.bankCardNo"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input disabled size="small" :value="$valueToLabel(form.creatorId,$store.state.user_options)"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
                disabled
                size="small"
                :value="form.gmtCreate"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-input disabled size="small" :value="form.applicationStatus">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="申请备注">
        <el-input disabled :value="form.remark" :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="审批流水">
        <el-card>
          <el-steps v-if="form.listTransferApproveFlows && form.listTransferApproveFlows.length > 0"
                    direction="vertical" :active="6"
                    align-center>
            <el-step
                v-for="(item,index) in form.listTransferApproveFlows"
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
      <el-row>
        <el-form :model="form2" ref="form2" :rules="rules" label-width="130px" label-position="right">
          <el-form-item prop="auditResult" label="审批结果">
            <el-radio-group v-model="form2.auditResult">
              <el-radio
                  v-for="item in this.$store.state.bool4_options"
                  :key="item.value"
                  :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审批意见" prop="approvalOpinion">
            <el-input
                maxlength="100"
                show-word-limit
                :rows="3"
                type="textarea"
                v-model.trim="form2.approvalOpinion">
            </el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label=" ">
            <el-button icon="el-icon-plus" type="primary" @click="handleSubmit" size="small">
              确认审批
            </el-button>
            <el-button icon="el-icon-back" @click="$router.back()" size="small">
              返回
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'TransferQualificationAgencyAudit',
  data() {
    return {
      form: {},
      form2: {
        qualificationAgencyTransferId: this.$route.params.id / 1 || null,
        auditResult: null,
        approvalOpinion: '',
        currentAuditRoleId: null,
      },
      rules: {
        auditResult: [
          {required: true, message: '请选择审核结果', trigger: 'change'}
        ]
      },
    }
  },
  created() {
    const id = this.$route.params.id / 1
    id && !isNaN(id) && this.getDetailById(id)
  },
  methods: {
    async getDetailById(id) {
      try {
        const res = await this.$http.get(`/qualification-agency-transfer/detail/${id}`)
        if (res && res.status) {
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSubmit() {
      this.form2.currentAuditRoleId = this.form.currentAuditRoleId
      console.log(this.form2.currentAuditRoleId, "currentAuditRoleId")
      try {
        const res = await this.$http.post('/qualification-agency-transfer/audit', this.form2)
        if (res && res.status) {
          this.$message.success(res.message)
          this.$router.back()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.transfer-qualification-agency-audit {
  margin: 0 100px;
}

.description-item {
  display: inline-block;
  margin-right: 100px;
  font-size: 14px;
}

/deep/ .el-step__description {
  padding-right: 0;
}

.width-full {
  width: 100%;
}
</style>
