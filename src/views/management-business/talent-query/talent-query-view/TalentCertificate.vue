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
        :data="list"
        stripe
        border
        @select-all="handleSelectAll"
        @select="handleSelect"
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
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
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="getListCertificateWhereabouts(scope.$index, scope.row)">证件去向流水
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <CertificateAddDialog
        :list-mechanisms-tree="listMechanismsTree"
        @closeDialog="visible = false"
        @getListCertificates="getList"
        :visible="visible"/>
    <CertificateEditDialog
        :form="form"
        :list-mechanisms-tree="listMechanismsTree"
        @getListCertificates="getList"
        @closeDialog="visible2 = false"
        :visible="visible2"/>
    <CertificateWhereaboutsDialog
        :list="listCertificateWhereabouts"
        @closeDialog="visible3 = false"
        :visible="visible3"/>
    <UpdateWhereaboutsDialog
        @getListCertificates="getList"
        :list="selectedListCertificates"
        @clearSelectedListCertificates="()=>this.selectedListCertificates = []"
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
      list: [],
      listMechanisms: [],
      listMechanismsTree: [],
      listCertificateWhereabouts: [],
      form: {
        talentCertificatesId: null,
        talentId: null,
        mechanismId: null,
        certificatesType: null,
        certificatesWhereabouts: 1,
        remark: '',
      },
      // 已选证件
      selectedListCertificates: []
    }
  },
  created() {
    this.getList()
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
     * 获取人才证件列表
     */
    getList() {
      this.$http.get('/talent-certificates/list/' + this.$route.query.id / 1).then(res => {
        if (res.status && res.data !== null) {
          this.list = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    /**
     * 获取证件去向流水
     */
    getListCertificateWhereabouts(_index, _row) {
      this.$http.get('/talent-certificates-whereabouts-flow/list/' + _row.talentCertificatesId).then(res => {
        if (res.status) {
          this.listCertificateWhereabouts = res.data
        }
      })
      this.visible3 = true
    },
    /**
     * 编辑证件
     * @param _index
     * @param _row
     */
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.getDetailById(_row.talentCertificatesId)
      this.visible2 = true
    },
    /**
     * 获取证书详情
     */
    getDetailById(_id) {
      this.$http.get('/talent-certificates/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          for (let formKey in this.form) {
            for (let resKey in res.data) {
              if (formKey === resKey) {
                this.form[formKey] = res.data[resKey]
              }
            }
          }
        }
      })
    },
    /**
     * 更新证件去向
     */
    handleUpdateWhereaboutsCertificate() {
      if (this.selectedListCertificates.length < 1) {
        this.$message.warning(' 请至少选择一个证件')
        return
      }
      this.visible4 = true
    },
    /**
     * 复选框单选
     * @param _val
     */
    handleSelect(_val) {
      this.selectedListCertificates = _val
    },
    /**
     * 复选框全选
     * @param seletion
     */
    handleSelectAll(seletion) {
      this.selectedListCertificates = seletion
    },
    /**
     * 删除证件及证件去向流水
     * @param _index
     * @param _row
     */
    handleDelete(_index, _row) {
      this.$confirm('证件去向流水将一并删除，您确定要删除该证件吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/talent-certificates/delete/' + _row.talentCertificatesId).then(res => {
          if (res.status) {
            this.$message.success(res.message)
            this.getList()
            return
          }
          this.$message.error(res.message)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
