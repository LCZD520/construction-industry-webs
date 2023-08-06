/**
* Created by Lv Cheng on 2022/6/20
* Notes 入账登记查看
*/
<template>
  <div class="entry-registration-view">
    <el-form disabled ref='form' :model="form" :rules="rules" label-position="right" label-width="120px">
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
            <el-input size="small" v-model="form.customerName" placeholder="请选择">
            </el-input>
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
      <el-form :disabled="false">
        <el-form-item label=" "  label-width="120px">
          <el-button icon="el-icon-back" size="small" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EntryRegistrationView',
  components: {},
  data() {
    return {
      form: {},
      options: [
        {value: 1, label: '人才合同价入账'},
        {value: 2, label: '资质转让入账'},
        {value: 3, label: '资质代办入账'},
        {value: 4, label: '职称评审入账'},
        {value: 5, label: '三类人员入账'},
        {value: 6, label: '学历提升入账'},
      ],
    }
  },
  created() {
    this.$route.params.id && this.getDetailById(this.$route.params.id)
  },
  methods: {
    async getDetailById(id) {
      try {
        const res = await this.$http.get(`/entry-registration/detail/${id}`)
        if (res.status) {
          this.form = res.data
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.entry-registration-view {
  margin: 0 150px;

  .width-full {
    width: 100%;
  }
}
</style>
