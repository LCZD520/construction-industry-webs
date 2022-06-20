/**
* Created by Lv Cheng on 2022/6/20
* Notes 整件库查看
*/
<template>
  <div class="lib-certificate-view">
    <el-button size="small" type="primary" icon="el-icon-plus">添加证件</el-button>
    <el-button size="small" icon="el-icon-edit" style="background: rgb(0, 188, 212);color: #fff">更新证件去向</el-button>
    <el-button size="small" icon="el-icon-back">返回</el-button>
    <br><br>
    <el-table
        ref="table"
        @row-click="handleRowClick"
        :data="tableData"
        stripe
        border
        @select="handleSelect"
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
        @select-all="selectAll"
        :row-class-name="tableRowClassName">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleView(scope.$index, scope.row)">证件去向流水
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  name: 'LibCertificateView',
  components: {},
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      columns: [
        {
          title: '所在分支',
          key: 'address'
        },
        {
          title: '证件类型',
          key: 'ss'
        },
        {
          title: '证件备注',
          key: 's1'
        },
        {
          title: '当前证件去向',
          key: 's2'
        },
      ],
      tableData: [{}, {}, {}, {}],
      selectionList: [],
    }
  },
  methods: {
    handleSelect(selection, row) {
      if (row.className === "highlight") {
        row.className = "normal";
      } else {
        row.className = "highlight";
      }
    },

    tableRowClassName({row}) {
      return row.className;
    },
    selectAll(selection) {
      console.log(selection)
      selection.forEach(k => k.className = 'highlight')
    },
    handleRowClick(row) {
      console.log(row)
      this.$refs.table.toggleRowSelection(row);
      if (row.className === "highlight") {
        row.className = "normal";
      } else {
        row.className = "highlight";
      }
    },
    handleView(_index, _row) {
      console.log(_index, _row)
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
    },
    handleCurrentChange() {
    },
    handleSizeChange() {
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";

/deep/ .highlight td {
  background-color: #fff6d8 !important;
}
</style>
