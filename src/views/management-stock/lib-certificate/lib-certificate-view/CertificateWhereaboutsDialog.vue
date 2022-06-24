/**
* Created by Lv Cheng on 2022/6/25
* Notes 证书去向流水弹窗
*/
<template>
  <el-dialog
      title="证书去向流水"
      :visible.sync="visible"
      width="70%"
      :before-close="()=>$emit('closeDialog')">
    <el-table
        height="260"
        ref="table"
        size="mini"
        :data="list"
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
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('closeDialog')">关 闭</el-button>
    </div>
    <div class="pagination">
      <div class="pagination-total">共<span class="total"> {{ pageInfo.total }} </span>条</div>
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CertificateWhereaboutsDialog',
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
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: Array,
    default: []
  },
  methods: {
    handleCurrentChange() {
    },
    handleSizeChange() {
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-table-pagination";
@import "../../../../assets/css/common-el-table-scrollbar";
</style>
