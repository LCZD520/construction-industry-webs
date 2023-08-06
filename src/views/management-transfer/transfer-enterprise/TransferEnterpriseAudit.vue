/**
* Created by Lv Cheng on 2022/6/20
* Notes 企业转账审核
*/
<template>
  <div class="transfer-enterprise-audit">
    <el-form label-position="right" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input disabled size="small" v-model="form.enterpriseName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户开户行">
            <el-input disabled size="small" v-model="form.openBank"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账户户名">
            <el-input disabled size="small" v-model="form.accountName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账户卡号">
            <el-input disabled size="small" v-model="form.bankCardNo"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.transferAmount"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="款项用途">
            <el-input disabled class="width-full" size="small" v-model="form.fundsPurpose"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker
                disabled
                class="width-full"
                size="small"
                v-model="form.gmtCreate"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人姓名">
            <el-input disabled size="small" :value="this.$valueToLabel(form.creatorId,this.$store.state.user_options)"/>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="人才余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请状态">
            <el-input disabled class="width-full" size="small" v-model="form.applicationStatus"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input :value="form.remark" disabled :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="审批详情">
        <el-card>
          <el-steps direction="vertical" :active="6" align-center>
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
        </el-card>
      </el-form-item>
      <el-form :model="form2" ref="form2" :rules="rules" label-width="120px" label-position="right"
               style="margin: 0 100px">
        <el-form-item prop="auditResult" label="审批结果">
          <el-radio-group v-model="form2.auditResult">
            <el-radio
                v-for="item in this.$store.state.bool4_options"
                :key="item.value"
                :label="item.value">{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核备注" prop="approvalOpinion">
          <el-input
              maxlength="100"
              show-word-limit
              :rows="3"
              type="textarea"
              v-model.trim="form2.approvalOpinion">
          </el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button icon="el-icon-plus" type="primary" @click="handleSubmit" size="small">
              提交
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
  name: 'TransferEnterpriseView',
  components: {},
  data() {
    return {
      currentId: this.$route.params.id / 1 || null,
      form: {},
      form2: {
        enterpriseTransferId: this.$route.params.id / 1 || null,
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
    !isNaN(this.$route.params.id / 1) && this.getDetailById()
  },
  methods: {
    async handleSubmit() {
      this.form2.currentAuditRoleId = this.form.currentAuditRoleId
      try {
        const res = await this.$http.post('/enterprise-transfer/audit', this.form2)
        if (res.status) {
          this.$message.success(res.message)
          this.$router.back()
          return
        }
        this.$message.error(res.message)
        this.getDetailById()
      } catch (e) {
        console.log(e)
      }
    },
    async getDetailById() {
      try {
        const res = await this.$http.get(`/enterprise-transfer/audit-detail/${this.currentId}`)
        if (res && res.status) {
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleClick() {

    },
    approvalDetail(_index, _row) {
      console.log(_index, _row)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.transfer-enterprise-audit {
  margin: 0 150px;
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
