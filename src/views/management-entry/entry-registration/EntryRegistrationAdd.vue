/**
* Created by Lv Cheng on 2022/6/20
* Notes 入账登记添加
*/
<template>
  <div class="entry-registration-add">
    <el-form ref='form' :model="form" :rules="rules" label-position="right" label-width="120px">
      <!--      <el-form-item label="企业合作记录">-->
      <!--        <el-button type="primary" size="small" @click="visible = true">点击选择</el-button>-->
      <!--      </el-form-item>-->
      <el-row>
        <el-col :span="12">
          <el-form-item label="入账类型" prop="entryType">
            <el-select class="width-full" size="small" v-model="form.entryType" placeholder="请选择转账用途">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerName">
            <el-select class="width-full" size="small" v-model="form.customerName" placeholder="请选择">
              <el-option-group
                  v-for="group in options2"
                  :key="group.label"
                  :label="group.label">
                <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转账用途" prop="fundsPurpose">
            <el-select class="width-full" size="small" v-model="form.fundsPurpose" placeholder="请选择转账用途">
              <el-option
                  v-for="item in $store.state.order_entry_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次转入金额" prop="entryAmount">
            <el-input-number
                class="width-full"
                size="small"
                :min="0" :max="99999999.99" :precision="2" clearable controls-position="right"
                placeholder="请输入企业转入金额"
                v-model="form.entryAmount"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="转账方信息" prop="transferorInfo">
        <el-input show-word-limit maxlength="20" v-model.trim="form.transferorInfo" placeholder="请输入转账方信息..." :rows="2"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转账方式" prop="transferWay">
            <el-select class="width-full" size="small" v-model="form.transferWay" placeholder="请选择转账方式">
              <el-option
                  v-for="item in $store.state.order_transfer_way_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司账户">
            <el-select class="width-full" size="small" v-model="form.enterpriseAccountId" placeholder="请选择公司账户">
              <el-option
                  v-for="item in $store.state.listCompanyAccounts"
                  :key="item.enterpriseAccountId"
                  :label="item.accountName"
                  :value="item.enterpriseAccountId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="到账日期" prop="transferDate">
            <el-date-picker
                class="width-full"
                v-model="form.transferDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择转账日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input show-word-limit maxlength="100" v-model.trim="form.remark" placeholder="请输入转账方信息..." :rows="3"
                  type="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" @click="handleSave" type="primary" size="small">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <EnterpriseCooperationDialog
        dialog-title="选择企业合作记录"
        :talent-list="[]"
        @closeDialog="visible = false"
        :visible="visible"/>
  </div>
</template>

<script>
import EnterpriseCooperationDialog from "./entry-registration-add/EnterpriseCooperationDialog";

export default {
  name: 'EntryRegistrationAdd',
  components: {EnterpriseCooperationDialog},
  data() {
    return {
      visible: false,
      options: [
        {value: 1, label: '人才合同价入账'},
        {value: 2, label: '资质转让入账'},
        {value: 3, label: '资质代办入账'},
        {value: 4, label: '职称评审入账'},
        {value: 5, label: '三类人员入账'},
        {value: 6, label: '学历提升入账'},
      ],
      options2: [],
      form: {
        entryType: null,
        customerName: '',
        fundsPurpose: null,
        entryAmount: undefined,
        transferorInfo: '',
        transferWay: null,
        enterpriseAccountId: null,
        transferDate: null,
        remark: '',
      },
      rules: {
        entryType: [
          {required: true, message: '请选择入账类型', trigger: 'change'}
        ],
        customerName: [
          {required: true, message: '请选择客户名称', trigger: 'change'}
        ],
        fundsPurpose: [
          {required: true, message: '请选择转账用途', trigger: 'change'}
        ],
        entryAmount: [
          {required: true, message: '请输入企业转入金额', trigger: 'change'}
        ],
        transferorInfo: [
          {required: true, message: '转账方信息不能为空', trigger: 'blur'}
        ],
        transferWay: [
          {required: true, message: '转账方式不能为空', trigger: 'change'}
        ],
        enterpriseAccountId: [
          {required: true, message: '公司账户不能为空', trigger: 'change'}
        ],
        transferDate: [
          {required: true, message: '转账日期不能为空', trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      }
    }
  },
  created() {
    this.getListOptions()
  },
  methods: {
    async getListOptions() {
      try {
        const res = await this.$http.get('/entry-registration/customers', this.form)
        if (res.status) {
          this.options2 = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    @throttle(1000)
    async handleSave() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post('/entry-registration/insert', this.form)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.entry-registration-add {
  margin: 0 150px;

  .width-full {
    width: 100%;
  }
}
</style>

