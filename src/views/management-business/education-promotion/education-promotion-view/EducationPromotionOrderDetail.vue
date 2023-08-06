/**
* Created by Lv Cheng on 2022/9/18
* Notes 学历提升订单详情
*/
<template>
  <div class="education-promotion-order-detail">
    <el-dialog
        append-to-body
        width="80%" title="学历提升订单详情" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-descriptions
                :label-style="{color:'#000',fontWeight:'bold',width:'100px',textAlign:'right'}"
                :column="3" border>
              <el-descriptions-item label="订单编号">
                {{ form.orderno }}
              </el-descriptions-item>
              <el-descriptions-item label="人员数">
                {{ form.assessorNum }}
              </el-descriptions-item>
              <el-descriptions-item label="订单时间">
                {{ form.gmtCreate }}
              </el-descriptions-item>
              <el-descriptions-item label="订单状态">
                {{ $valueToLabel(form.orderStatus, $store.state.common_order_status_options) }}
              </el-descriptions-item>
              <el-descriptions-item label="代办总金额">
                {{ form.agencyTotalAmount }}
              </el-descriptions-item>
              <el-descriptions-item label="订单创建人">
                {{ $valueToLabel(form.creatorId, $store.state.user_options) }}
              </el-descriptions-item>
            </el-descriptions>
            <el-form label-position="top" label-suffix="：" label-width="120">
              <el-form-item label="评审人员">
                <el-table
                    size="mini"
                    :data="form.listAssessors === undefined ? [] : form.listAssessors"
                    stripe
                    border
                    height="300"
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      min-width="150"
                      v-for="item in columns"
                      :key="item.key"
                      :prop="item.key"
                      :label="item.title">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EducationPromotionOrderDetail',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
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
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-table-scrollbar";

</style>
