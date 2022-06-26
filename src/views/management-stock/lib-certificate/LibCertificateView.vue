/**
* Created by Lv Cheng on 2022/6/20
* Notes 证件库查看
*/
<template>
  <div class="lib-certificate-view">
    <el-button size="small" type="primary" icon="el-icon-plus"
               @click="handleCertificateAddEdit('add')">添加证件
    </el-button>
    <el-button size="small" icon="el-icon-edit" style="background: rgb(0, 188, 212);color: #fff"
               @click="updateCertificate">更新证件去向
    </el-button>
    <el-button size="small" icon="el-icon-back" @click="$router.back()">返回</el-button>
    <br><br>
    <el-table
        ref="table"
        @row-click="handleRowClick"
        @selection-change="selectionChange"
        :data="tableData"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
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
              @click.stop="handleView(scope.$index, scope.row)">证件去向流水
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleCertificateAddEdit('edit', scope.row.id)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              plain
              @click.stop="handleDelete(scope.$index, scope.row)">删除
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

    <CertificateAddEditDialog
        :visible="visible"
        :dialog-title="dialogTitle"
        :form-data="form"
        @closeDialog="visible = false"
        :handle-submit="handleSubmit"/>
    <UpdateCertificateWhereaboutsDialog
        :visible="visible2"
        :form-data="form"
        @closeDialog="visible2 = false"
        :handle-submit="updateConfirm"/>
    <CertificateWhereaboutsDialog
        @closeDialog="visible3 = false"
        :visible="visible3"/>
  </div>
</template>

<script>

import CertificateAddEditDialog from "./lib-certificate-view/CertificateAddEditDialog";
import UpdateCertificateWhereaboutsDialog from "./lib-certificate-view/UpdateCertificateWhereaboutsDialog";
import CertificateWhereaboutsDialog from "./lib-certificate-view/CertificateWhereaboutsDialog";

export default {
  name: 'LibCertificateView',
  components: {CertificateWhereaboutsDialog, UpdateCertificateWhereaboutsDialog, CertificateAddEditDialog},
  data() {
    return {
      mode: '',
      dialogTitle: '',
      visible: false,
      visible2: false,
      visible3: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        name: '',
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
      tableData: [{id: 1}, {}, {}, {}],
      selectionList: [],
    }
  },
  methods: {
    tableRowClassName({row}) {
      return row.className;
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
    },
    handleView(_index, _row) {
      this.visible3 = true
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
    handleCertificateAddEdit(_type, _id) {
      console.log(_type, _id)
      this.visible = true
      if (_type === 'add') {
        this.mode = 'add'
        this.dialogTitle = '添加证书'


        return
      }
      if (_type === 'edit') {
        this.mode = 'edit'

        this.dialogTitle = '编辑证书'
      }
    },
    handleSubmit() {
      if (this.mode === 'add') {


        return
      }
      if (this.mode === 'edit') {
      //

      }
    },
    updateCertificate() {
      this.visible2 = true
    },
    updateConfirm() {


      this.visible2 = false
      this.$message.success('确认更新')
    }
  },
  watch: {
    selectionList(newVal, oldVal) {
      newVal.forEach(k => {
        k.className = 'highlight'
      })
      if (newVal.length === 0) {
        oldVal.forEach(k => {
          k.className = 'unChecked'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";

</style>
