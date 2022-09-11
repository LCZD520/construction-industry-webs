/**
* Created by Lv Cheng on 2022/6/26
* Notes 人才查询查看-证件去向流水弹窗
*/
<template>
  <el-dialog
      :close-on-click-modal=false
      width="70%"
      title="证件去向流水"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <div class="dialog-content">
      <el-table
          height="300"
          ref="table"
          :data="list"
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            prop="gmtCreate"
            label="操作时间">
        </el-table-column>
        <el-table-column
            label="操作人">
          <template slot-scope="scope">
            {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}
          </template>
        </el-table-column>
        <el-table-column
            label="证件去向">
          <template slot-scope="scope">
            {{ $valueToLabel(scope.row.certificatesWhereabouts, $store.state.certificates_whereabouts_options) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="remark"
            label="去向备注">
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CertificateWhereaboutsDialiog',
  components: {},
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-el-table-scrollbar";
</style>
