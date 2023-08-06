/**
* Created by Lv Cheng on 2022/7/5
* Notes 后勤申请
*/
<template>
  <div class="logistics-application">
    <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">
      添加后勤记录
    </el-button>
    <br><br>
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="logisticsProjectType"
          label="后勤项目">
        <template slot-scope="scope">
          <span>{{ $valueToLabel(scope.row.logisticsProjectType, $store.state.logistics_project_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="申请备注">
        <template slot-scope="scope">
          <div v-if="scope.row.logisticsProjectType === 2" style="white-space:pre-line">
            收件人：<span class="special">{{ scope.row.recipient + '\n' }}</span>
            地址：<span class="special">{{ scope.row.address + '\n' }}</span>
            电话号码：<span class="special">{{ scope.row.telephoneNumber + '\n' }}</span>
            邮寄详细物品：<span class="special">{{ scope.row.detailItem + '\n' }}</span>
            {{ scope.row.addRemark + '\n' }}
          </div>
          <div v-else>
            {{ scope.row.addRemark }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="提交时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="状态">
        <template slot-scope="scope">
          <el-tag
              size="mini"
              :type="scope.row.status === 1 ? 'info' : scope.row.status === 2 ? 'success' : 'danger'"
              effect="dark">
            {{ scope.row.status === 1 ? '待确认' : scope.row.status === 2 ? '已确认' : '不予确认' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.status === 2 || scope.row.status === 3"
              size="mini"
              type="primary"
              @click="confirmDetail(scope.$index, scope.row)">确认详情
          </el-button>
          <div v-else>
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </div>
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
    <LogisticsAddEditDialog
        ref="logisticsAddEditDialog"
        :form="form"
        @confirm="handleConfirm"
        :dialog-title="dialogTitle"
        @closeDialog="visible = false"
        :visible="visible"/>
    <ConfirmDetailDialog
        :form="form"
        @closeDialog="visible2 = false"
        :visible="visible2"/>
  </div>
</template>

<script>
import LogisticsAddEditDialog from "./LogisticsAddEditDialog";
import ConfirmDetailDialog from "./ConfirmDetailDialog";

export default {
  name: 'LogisticsApplication',
  components: {ConfirmDetailDialog, LogisticsAddEditDialog},
  props: {
    logisticsType: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mode: '',
      dialogTitle: '',
      visible: false,
      visible2: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      // 添加
      form: {
        "id": null,
        "resourceId": this.$route.query.id,
        "addRemark": '',
        "logisticsProjectType": null,
        "detailItem": '',
        "address": '',
        "telephoneNumber": '',
        "recipient": '',
        "logisticsType": this.logisticsType,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getList()
    },
    /**
     * 改变页数
     * @param _pageSize
     */
    handleSizeChange(_pageSize) {
      this.getList(_pageSize)
    },
    /**
     * 获取后勤申请列表
     * @param _pageSize
     */
    getList(_pageSize) {
      const res = this.$http.post('/logistics/list-all', {
        currentPage: this.pageInfo.currentPage,
        pageSize: _pageSize ? _pageSize : this.pageInfo.pageSize,
        resourceId: this.form.resourceId / 1,
        logisticsType: this.logisticsType,
      })
      if (res && res.status) {
        this.list = res.data.list
        this.pageInfo.total = res.data.total
      }
    },
    handleConfirm() {
      if (this.mode === 'add') {
        this.form.id = null
        this.$http.post('/logistics/insert', this.form).then(res => {
          if (res.status) {
            this.visible = false
            this.$message.success(res.message)
            this.getList()
            this.$refs.logisticsAddEditDialog.$refs.form.resetFields()
            return
          }
          this.$message.error(res.message)
        })
        return
      }
      delete this.form.gmtModified
      delete this.form.regeneratorId
      this.$http.put('/logistics/update', this.form).then(res => {
        if (res.status) {
          this.visible = false
          this.$message.success(res.message)
          this.getList()
          this.$refs.logisticsAddEditDialog.$refs.form.resetFields()
          return
        }
        this.$message.error(res.message)
      })
    },
    handleAdd() {
      this.mode = 'add'
      this.visible = true
      this.dialogTitle = '添加后勤记录'
      this.$nextTick(() => {
        this.$refs.logisticsAddEditDialog.$refs.form.resetFields()
        this.form.recipient = ''
        this.form.address = ''
        this.form.telephoneNumber = ''
        this.form.detailItem = ''
      })
    },
    handleEdit(_index, _row) {
      this.mode = 'edit'
      this.visible = true
      this.dialogTitle = '编辑后勤记录'
      this.$http.get('/logistics/detail/' + _row.id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
        }
      })
    },
    handleDelete(_index, _row) {
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/logistics/delete/' + _row.id).then(res => {
          if (res.status) {
            this.$message.success(res.message)
            this.getList()
            return
          }
          this.$message.error(res.message)
        })
      }).catch(() => {
      })
    },
    confirmDetail(_index, _row) {
      this.$http.get('/logistics/detail/' + _row.id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
        }
      })
      this.visible2 = true
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-table-pagination";

.special {
  color: #409EFF;
}
</style>
