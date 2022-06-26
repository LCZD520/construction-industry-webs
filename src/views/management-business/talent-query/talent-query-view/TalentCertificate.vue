/**
* Created by Lv Cheng on 2022/6/26
* Notes
*/
<template>
  <div class="talent-certificate">
    <el-button type="primary" size="small" @click="visible = true">
      添加证件
    </el-button>
    <el-button type="primary" size="small" @click="handleUpdateWhereaboutsCertificate">
      更新证件去向
    </el-button>
    <br><br>
    <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
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
              @click.stop="handleCertificateWhereaboutsView(scope.$index, scope.row)">证件去向流水
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
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
    <CertificateAddDialog
        @closeDialog="visible = false"
        :visible="visible"/>
    <CertificateEditDialog
        @closeDialog="visible2 = false"
        :visible="visible2"/>
    <CertificateWhereaboutsDialog
        @closeDialog="visible3 = false"
        :visible="visible3"/>
    <UpdateWhereaboutsDialog
        @closeDialog="visible4 = false"
        :visible="visible4"/>
  </div>
</template>

<script>
import CertificateAddDialog from "./talent-certificate/CertificateAddDialog";
import CertificateEditDialog from "./talent-certificate/CertificateEditDialog";
import CertificateWhereaboutsDialog from "./talent-certificate/CertificateWhereaboutsDialiog";
import UpdateWhereaboutsDialog from "./talent-certificate/UpdateWhereaboutsDialog";

export default {
  name: 'TalentCertificate',
  components: {UpdateWhereaboutsDialog, CertificateWhereaboutsDialog, CertificateEditDialog, CertificateAddDialog},
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      columns: [
        {
          title: '所在分支',
          key: 'address'
        },
        {
          title: '证件类型',
          key: 'address'
        },
        {
          title: '证件备注',
          key: 'address'
        },
        {
          title: '当前证件去向',
          key: 'address'
        },
      ],
      tableData: [
        {}
      ],
    }
  },
  methods: {
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleClick() {

    },
    handleUpdateWhereaboutsCertificate(){
      this.visible4 = true
    },
    handleCertificateWhereaboutsView(_index, _row) {
      console.log(_index, _row)
      this.visible3 = true
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.visible2 = true
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确定删除!'
        });
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
