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
        :data="list"
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
          label="所在分支">
        <template slot-scope="scope">
          {{ $valueToLabel(scope.row.mechanismId, listMechanisms) }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="证件类型">
        <template slot-scope="scope">
          {{
            $valueToLabel(scope.row.certificatesType
                , $store.state.certificates_category_options)
          }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="remark"
          label="证件备注">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="当前证件去向">
        <template slot-scope="scope">
          {{
            $valueToLabel(scope.row.certificatesWhereabouts
                , $store.state.certificates_whereabouts_options)
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click.stop="getListCertificateWhereabouts(row)">证件去向流水
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleCertificateAddEdit('edit',row.talentCertificatesId)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>

    <CertificateAddDialog
        :list-mechanisms-tree="listMechanismsTree"
        @closeDialog="visible = false"
        @getListCertificates="getDetailById($route.params.id / 1)"
        :visible="visible"/>
    <CertificateEditDialog
        :form="form"
        :list-mechanisms-tree="listMechanismsTree"
        @getListCertificates="getDetailById($route.params.id / 1)"
        @closeDialog="visible2 = false"
        :visible="visible2"/>
    <CertificateWhereaboutsDialog
        :list="listCertificateWhereabouts"
        @closeDialog="visible3 = false"
        :visible="visible3"/>
    <UpdateCertificateWhereaboutsDialog
        @getListCertificates="getDetailById($route.params.id / 1)"
        :list="selectedListCertificates"
        @clearSelectedListCertificates="()=>this.selectedListCertificates = []"
        @closeDialog="visible4 = false"
        :visible="visible4"/>
  </div>
</template>

<script>

import CertificateAddDialog from "./lib-certificate-view/CertificateAddDialog";
import CertificateEditDialog from "./lib-certificate-view/CertificateEditDialog";
import UpdateCertificateWhereaboutsDialog from "./lib-certificate-view/UpdateCertificateWhereaboutsDialog";
import CertificateWhereaboutsDialog from "./lib-certificate-view/CertificateWhereaboutsDialog";

export default {
  name: 'LibCertificateView',
  components: {
    CertificateWhereaboutsDialog,
    UpdateCertificateWhereaboutsDialog,
    CertificateAddDialog,
    CertificateEditDialog
  },
  data() {
    return {
      mode: '',
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      listMechanisms: [],
      listMechanismsTree: [],
      listCertificateWhereabouts: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        talentId: this.$route.params.id / 1 | null,
        mechanismId: null,
        listCertificatesType: [],
        certificatesWhereabouts: 1,
        remark: '',
      },
      list: [],
      selectedListCertificates: [],
    }
  },
  created() {
    const id = this.$route.params.id / 1
    id && !isNaN(id) && this.getDetailById(id)
    this.getListMechanisms()
    this.getListMechanismsTree()
  },
  methods: {
    /**
     * 获取所有分支（树状）
     */
    getListMechanismsTree() {
      this.$http.get('/mechanism/list').then(res => {
        if (res.status && res.data.listMechanisms !== null) {
          this.listMechanismsTree = res.data.listMechanisms
        }
      })
    },
    /**
     * 获取所有分支
     */
    getListMechanisms() {
      this.$http.get('/mechanism/list-mechanisms').then(res => {
        if (res.status && res.data.listMechanisms !== null) {
          this.listMechanisms = res.data
        }
      })
    },
    /**
     * 获取证件去向流水
     */
    getListCertificateWhereabouts(_row) {
      this.$http.get('/talent-certificates-whereabouts-flow/list/' + _row.talentCertificatesId).then(res => {
        if (res.status) {
          this.listCertificateWhereabouts = res.data
        }
      })
      this.visible3 = true
    },
    async getDetailById(_id, _pageSize) {
      try {
        const res = await this.$http.get('/talent-certificates/list-page/' + _id, {
          params: {
            currentPage: this.pageInfo.currentPage,
            pageSize: _pageSize ? _pageSize : this.pageInfo.pageSize,
          }
        })
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      }
    },
    tableRowClassName({row}) {
      return row.className;
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectedListCertificates = selection
    },
    handleCurrentChange() {
      this.getDetailById(this.$route.params.id / 1)
    },
    handleSizeChange() {
    },
    async handleCertificateAddEdit(_type, _id) {
      if (_type === 'add') {
        this.mode = 'add'
        this.visible = true
        return
      }
      if (_type === 'edit') {
        this.mode = 'edit'
        this.visible2 = true
        try {
          const res = await this.$http.get('/talent-certificates/detail/' + _id)
          if (res.status) {
            this.form = res.data
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    updateCertificate() {
      if (this.selectedListCertificates.length < 1) {
        this.$message.warning(' 请至少选择一个证件')
        return
      }
      this.visible4 = true
    },
    /**
     * 删除证件及证件去向流水
     * @param _row
     */
    async handleDelete(_row) {
      this.$confirm('证件去向流水将一并删除，您确定要删除该证件吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$http.delete('/talent-certificates/delete/' + _row.talentCertificatesId)
          if (res.status) {
            this.$message.success(res.message)
            await this.getDetailById(this.$route.params.id / 1)
            return
          }
          this.$message.error(res.message)
        } catch (e) {
          console.log(e)
        }
      }).catch(() => {
      })
    }
  },
  watch: {
    selectedListCertificates(newVal, oldVal) {
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
