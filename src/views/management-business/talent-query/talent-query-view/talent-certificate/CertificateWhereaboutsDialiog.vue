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
          height="260"
          ref="table"
          size="mini"
          :data="tableData"
          highlight-current-row
          border
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
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
    return {
      columns: [
        {
          title: '操作时间',
          key: 'address'
        },
        {
          title: '操作人',
          key: 'ss'
        },
        {
          title: '证件去向',
          key: 's1'
        },
        {
          title: '去向备注',
          key: 's2'
        },
      ],
      tableData: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-el-table-scrollbar";
</style>
