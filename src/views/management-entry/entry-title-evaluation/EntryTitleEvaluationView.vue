/**
* Created by Lv Cheng on 2022/6/20
* Notes 职称评审入账查看
*/
<template>
  <div class="entry-title-evaluation-view">
    <el-form size="small" disabled label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled v-model="form.orderno">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input disabled v-model="form.customerName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled v-model="form.totalAgencyAmount">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled v-model="form.entryAmount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" v-model="form.fundsPurpose">
              <el-option
                  v-for="item in $store.state.title_evaluation_funds_purpose_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方信息">
            <el-input disabled v-model="form.transferorInfo">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="转账方式">
            <el-select disabled class="width-full" v-model="form.transferWay">
              <el-option
                  v-for="item in $store.state.order_transfer_way_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司账户">
            <el-input disabled :value="form.accountName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到账日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.receiptDate"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-select class="width-full" v-model="form.creatorId">
              <el-option
                  v-for="item in $store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.gmtCreate"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-input v-model="form.applicationStatus"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">历史记录</el-divider>
      <p>
        职称评审入账记录
        <span style="color:#409EFF;display:inline-block;margin-left: 20px">
          已通过:&nbsp;{{ throughedAmount }}元， 待申请:&nbsp;{{ form.totalAgencyAmount - applyedAmount }}元
        </span>
      </p>
      <br>
      <el-table
          size="mini"
          :data="form.listRecords"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            min-width="160"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
        <el-table-column
            min-width="200"
            label="款项用途">
          <template #default="{row}">
            {{ $valueToLabel(row.fundsPurpose, $store.state.title_evaluation_funds_purpose_options) }}
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form v-if="edit">
        <el-form-item label=" ">
          <el-button icon="el-icon-back" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EntryTitleEvaluationView',
  components: {},
  data() {
    return {
      form: {
        listRecords: []
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
        {
          title: '入账方信息',
          key: 'transferorInfo'
        },
        {
          title: '入账日期',
          key: 'receiptDate'
        },
        {
          title: '申请状态',
          key: 'applicationStatus'
        },

      ],
    }
  },
  props: {
    edit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    applyedAmount() {
      return this.form.listRecords
          .map(item => item.entryAmount).reduce((p, c) => {
            return p + c
          }, 0)
    },
    throughedAmount() {
      return this.form.listRecords
          .filter(item => item.applicationStatus === '财务审批通过')
          .map(item => item.entryAmount).reduce((p, c) => {
            return p + c
          }, 0)
    }
  },
  created() {
    this.getDetailById()
  },
  methods: {
    async getDetailById() {
      try {
        const res = await this.$http.get(`/title-evaluation-order-entry/entry-detail/${this.$route.params.id}`)
        if (res && res.status) {
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.entry-title-evaluation-view {
  margin: 0 100px;

  .width-full {
    width: 100%;
  }
}


.time {
  font-size: 14px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 4px;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
