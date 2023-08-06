/**
* Created by Lv Cheng on 2022/12/25
* Notes 人才转账审核
*/
<template>
  <div class="transfer-talent-audit">
    <el-form label-position="right" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.talentOrder && form.talentOrder.orderno"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业名称">
            <el-input disabled size="small" v-model="form.talentOrder && form.talentOrder.enterpriseName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人才名称">
            <el-input disabled size="small" :value="form.talent && form.talent.fullName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业合同价">
            <el-input disabled size="small"
                      :value="form.talent && form.talent.enterpriseOffer + ' / '+ form.talent.enterpriseOfferNumber
                      + ' * ' +$valueToLabel(form.talent.enterpriseOfferUnit, $store.state.number_unit_options)"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同余额">
            <el-input disabled size="small" :value="form.talent && form.talent.contractBalance"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人才价格">
            <el-input disabled size="small" :value="form.talent && form.talent.talentPrice"/>
            <!--              talentPriceNumber-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人才余额">
            <el-input disabled size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="帐户开户行">
            <el-input disabled size="small" v-model="form.openBank"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="帐户户名">
            <el-input disabled size="small" v-model="form.accountName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行卡号">
            <el-input disabled size="small" v-model="form.bankCardNo"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" size="small" v-model="form.fundsPurpose">
              <el-option
                  v-for="item in $store.state.funds_purpose_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.transferAmount"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人姓名">
            <el-input disabled size="small" :value="this.$valueToLabel(form.creatorId,this.$store.state.user_options)"/>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请状态">
            <el-input disabled class="width-full" size="small" v-model="form.applicationStatus"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input disabled :rows="3" type="textarea" :value="form.remark">

        </el-input>
      </el-form-item>
      <el-form-item label="审批详情">
        <el-card>
          <el-steps direction="vertical" :active="6" align-center>
            <el-step
                v-for="(item,index) in form.listTalentApprovalFlows"
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
                <span style="color: #E6A23C" class="description-item">
                  <i class="el-icon-date"></i>
                    {{ item.gmtCreate }}
                </span>
                <span style="color: #67C23A" class="description-item">
                    <i class="el-icon-info"></i>
                    <span>
                      审批意见【{{ item.approvalOpinion }}】
                    </span>
                  </span>
              </el-card>
            </el-step>
            <span v-if="form.listTalentApprovalFlows && form.listTalentApprovalFlows.length === 0">暂无审批流水</span>
          </el-steps>
        </el-card>
      </el-form-item>
      <el-divider content-position="left">
        企业合同价入账记录
        <!--        <span style="color: #409EFF">已通过: 60000元 , 待申请: 0元</span>-->
      </el-divider>
      <el-table
          size="mini"
          :data="form.listTalentEntryRecords"
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
        <el-table-column
            min-width="100"
            label="款项用途">
          <template #default="{row}">
            {{ row.talentEntry && $valueToLabel(row.fundsPurpose, $store.state.funds_purpose_options) }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="100"
            label="入账方信息">
          <template #default="{row}">
            {{ row.talentEntry && row.talentEntry.transferorInfo }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="100"
            label="入账日期">
          <template #default="{row}">
            {{ row.talentEntry && row.talentEntry.transferDate }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="100"
            label="状态">
          <template #default="{row}">
            {{ row.talentEntry && $valueToLabel(row.status, $store.state.talent_entry_status_options) }}
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="left">
        人才价格转账记录
        <!--        <span style="color: #409EFF">已通过: 60000元 , 待申请: 0元</span>-->
      </el-divider>
      <el-table
          size="mini"
          :data="form.listTalentTransfers"
          stripe
          ref="table"
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="180"
            prop="gmtCreate"
            label="申请时间">
        </el-table-column>
        <el-table-column
            min-width="120"
            prop="transferAmount"
            label="申请转账金额">
        </el-table-column>
        <el-table-column
            min-width="140"
            label="款项用途">
          <template slot-scope="scope">
            <el-tag size="mini">{{ $valueToLabel(scope.row.fundsPurpose, $store.state.funds_purpose_options) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            min-width="140"
            label="转账用户">
          <template #default="{row}">
            {{ $valueToLabel(row.creatorId, $store.state.user_options) }}
          </template>
        </el-table-column>
        <el-table-column
            min-width="100"
            prop="remark"
            label="申请备注">
        </el-table-column>
        <el-table-column
            prop="applicationStatus"
            min-width="120"
            label="申请状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template #default="{row}">
            <el-button
                size="mini"
                type="primary"
                @click="handleDetail(row)">审批详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
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
  name: 'TransferTalentAudit',
  components: {},
  data() {
    return {
      currentId: this.$route.params.id / 1 || null,
      form: {},
      form2: {
        talentTransferId: this.$route.params.id / 1 || null,
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
          key: 'gmtCreate'
        },
        {
          title: '申请入账金额',
          key: 'entryAmount'
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
          title: '转账用户',
          key: 'creatorId'
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
    }
  },
  computed: {
    talentPrice() {
      return this.form.talent.talentPrice + '/' + this.form.talent.talentPriceNumber + '*'
          + this.$valueToLabel(this.form.talent.numberUnit, this.$store.state.number_unit_options)
    }
  },
  created() {

    !isNaN(this.$route.params.id / 1) && this.getDetailById()
  },
  methods: {
    async handleDetail(_row) {
      try {
        const res = await this.$http.get('/talent-transfer/detail/' + _row.id)
        if (res.status && res.data !== null) {
          console.log(res.data)
        }
      } catch (e) {
        console.log(e)
      }

      this.visible2 = true
    },
    async getDetailById() {
      try {
        const res = await this.$http.get(`/talent-transfer/audit-detail/${this.currentId}`)
        if (res && res.status) {
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleSubmit() {
      this.form2.currentAuditRoleId = this.form.currentAuditRoleId
      try {
        const res = await this.$http.post('/talent-transfer/audit', this.form2)
        if (res.status) {
          this.$message.success(res.message)
          this.$router.back()
          return
        }
        this.$message.error(res.message)
        await this.getDetailById()
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

.transfer-talent-audit {
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
