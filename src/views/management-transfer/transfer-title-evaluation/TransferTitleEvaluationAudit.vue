/**
* Created by Lv Cheng on 2022/6/20
* Notes 职称评审转账审核
*/
<template>
  <div class="transfer-title-evaluation-audit">
    <el-form label-position="right" label-width="130px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input disabled size="small" :value="form.customerName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" :value="form.orderno"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称评审录入人">
            <el-input disabled size="small" :value="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled size="small" :value="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评审费用">
            <el-input disabled size="small" :value="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" :value="form.transferAmount"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" size="small" :value="form.fundsPurpose">
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
          <el-form-item label="账户">
            <el-input disabled size="small" :value="form.accountName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行名称">
            <el-input disabled class="width-full" size="small" :value="form.bankName">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开户行">
            <el-input disabled size="small" :value="form.openBank"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行卡号">
            <el-input disabled size="small" :value="form.bankCardNo"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input disabled size="small" :value="this.$valueToLabel(form.creatorId,$store.state.user_options)"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
                disabled
                class="width-full"
                size="small"
                :value="form.gmtCreate"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-input disabled class="width-full" size="small" :value="form.applicationStatus">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="申请备注">
        <el-input disabled :rows="3" type="textarea" :value="form.remark">
        </el-input>
      </el-form-item>
      <el-form-item label="审批详情">
        <el-card>
          <el-steps v-if="form.listAuditRecords && form.listAuditRecords.length > 0"
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
      <el-divider content-position="left">
        入账记录
      </el-divider>
      <el-table
          size="mini"
          :data="form.listTransferRecords"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="100"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :fixed="item.fixed"
            :label="item.title">
        </el-table-column>
      </el-table>
      <el-divider content-position="left">
        转账记录
      </el-divider>
      <el-table
          size="mini"
          :data="form.listTransferRecords"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="180"
            v-for="item in columns2"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="260">
          <template #default="{row}">
            <el-button
                size="mini"
                type="primary"
                @click.stop="approvalDetail(row)">审批详情
            </el-button>
            <el-button
                size="mini"
                type="primary"
                @click.stop="handleImageView(row)">查看图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
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
    <ApprovalDetailDialog
        :form-data="form"
        @closeDialog="visible = false"
        :visible="visible"/>
    <el-dialog
        :close-on-click-modal="false"
        width="70%" title="图片"
        :before-close="()=>this.visible2 = false"
        :visible.sync="visible2">
      <div class="dialog-wrapper" style="height: 468px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <ImagesUploadView
                ref="upload"
                v-if="visible2"
                @closeDialog="visible2 = false"
                :files="listImages"
                namespace="title-evaluation"
                type="order-transfer"
                :name="customerName"
                :root-folder-name="'职称评审'"
                :sub-dirs="subDirs"/>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ApprovalDetailDialog from "../common/ApprovalDetailDialog";
import ImagesUploadView from "../../../components/image-upload-view/ImagesUploadView";

export default {
  name: 'TransferTitleEvaluationAudit',
  components: {ImagesUploadView, ApprovalDetailDialog},
  data() {
    return {
      visible: false,
      visible2: false,
      form: {},
      form2: {
        titleEvaluationTransferId: this.$route.params.id / 1 || null,
        auditResult: null,
        approvalOpinion: '',
        currentAuditRoleId: null,
      },
      rules: {
        auditResult: [
          {required: true, message: '请选择审核结果', trigger: 'change'}
        ]
      },
      columns: [
        {
          title: '申请时间',
          key: 'address'
        },
        {
          title: '申请入账金额',
          key: 'address2'
        },
        {
          title: '款项用途',
          key: 'address3'
        },
        {
          title: '入账方信息',
          key: 'address4'
        },
        {
          title: '入账日期',
          key: 'address5'
        },
        {
          title: '申请状态',
          key: 'address6'
        },
      ],
      columns2: [
        {
          title: '申请时间',
          key: 'gmtCreate'
        },
        {
          title: '申请转账金额',
          key: 'transferAmount'
        },
        {
          title: '款项用途',
          key: 'fundsPurpose'
        },
        {
          title: '转账账户',
          key: 'accountName'
        },
        {
          title: '申请备注',
          key: 'remark'
        },
        {
          title: '申请状态',
          key: 'applicationStatus'
        },
      ],
      listImages: [],
      customerName: '',
      subDirs: new Set([
        {type: 'order-transfer', folder: '转账'},
      ]),
    }
  },
  created() {
    const id = this.$route.params.id / 1
    id && !isNaN(id) && this.getDetailById(id)
  },
  methods: {
    async getDetailById(id) {
      try {
        const res = await this.$http.get(`/title-evaluation-transfer/detail/${id}`)
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
    approvalDetail(_row) {
      this.visible = true
      console.log(_row)
    },
    handleImageView(_row) {
      this.customerName = _row.customerName
      this.listImages = _row.listImages
      this.visible2 = true
    },
    async handleSubmit() {
      this.form2.currentAuditRoleId = this.form.currentAuditRoleId
      console.log(this.form2.currentAuditRoleId, "currentAuditRoleId")
      try {
        const res = await this.$http.post('/title-evaluation-transfer/audit', this.form2)
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

.transfer-title-evaluation-audit {
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
