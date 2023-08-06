/**
* Created by Lv Cheng on 2022/6/19
* Notes 学历提升订单查看
*/
<template>
  <div class="order-education-promotion-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input disabled size="small" :value="form.educationPromotion && form.educationPromotion.customerName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.orderno"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人员数">
            <el-input disabled size="small" v-model="form.assessorNum"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办费用">
            <el-input disabled size="small" v-model="form.agencyTotalAmount"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评审费用">
            <el-input disabled size="small" v-model="form.totalEvaluationFee"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单时间">
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
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select disabled class="width-full" size="small"
                       :value="$valueToLabel(form.orderStatus, $store.state.common_order_status_options)">
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
          <el-form-item label="三类人员录入人">
            <el-input disabled size="small" :value="form.titleEvaluation
            && this.$valueToLabel(form.titleEvaluation.creatorId,this.$store.state.user_options)"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入账申请金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
          size="mini"
          :data="form.listAssessors"
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
            min-width="180"
            fixed="right"
            label="人员状态">
          <template #default="{row}">
            {{ $valueToLabel(row.evaluationStatus, $store.state.title_evaluation_status_options) }}
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="left">三类人员入账明细</el-divider>
      <el-table
          size="mini"
          :data="tableData"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          style="width: 100%">
        <el-table-column
            min-width="180"
            v-for="item in columns2"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <el-divider content-position="left">三类人员转账明细</el-divider>
      <el-table
          size="mini"
          :data="tableData"
          stripe
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看图片
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            min-width="180"
            v-for="item in columns3"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <br>
      <el-row>
        <el-col :span="8">
          <el-form-item label=" ">
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
  name: 'OrderEducationPromotionView',
  components: {},
  data() {
    return {
      form: {},
      columns: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard'
        },
        {
          title: '联系电话',
          key: 'telephoneNumber'
        },
        {
          title: '原始学历',
          key: 'originalEducation'
        },
        {
          title: '申报学校',
          key: 'applicationSchool'
        },
        {
          title: '学制',
          key: 'educationalSystem'
        },
        {
          title: '专业',
          key: 'major'
        },
        {
          title: '提升学历',
          key: 'improveEducation'
        },
        {
          title: '代办金额',
          key: 'agencyAmount'
        },
      ],
      columns2: [
        {
          title: '申请入账时间',
          key: '1'
        },
        {
          title: '申请人',
          key: '2'
        },
        {
          title: '申请入账金额',
          key: '3'
        },
        {
          title: '款项用途',
          key: '4'
        },
        {
          title: '申请备注',
          key: '5'
        },
        {
          title: '申请状态',
          key: '6'
        },
      ],
      columns3: [
        {
          title: '申请转账时间',
          key: '1'
        },
        {
          title: '申请人',
          key: '2'
        },
        {
          title: '申请转账金额',
          key: '3'
        },
        {
          title: '款项用途',
          key: '4'
        },
        {
          title: '申请备注',
          key: '5'
        },
        {
          title: '申请状态',
          key: '6'
        },
      ],
      tableData: []
    }
  },
  created() {
    const id = this.$route.params.id
    id && !isNaN(id / 1) && this.detail(id / 1)
  },
  methods: {
    async detail(id) {
      const res = await this.$http.get(`/education-promotion-order/detail/${id}`)
      if (res.status && res.data !== null) {
        console.log(res)
        this.form = res.data
      }
    },
    handleClick() {

    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.order-education-promotion-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
