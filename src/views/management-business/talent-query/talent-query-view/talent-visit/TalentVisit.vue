/**
* Created by Lv Cheng on 2022/7/5
* Notes 人才回访
*/
<template>
  <div class="talent-visit">
    <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">
      添加回访记录
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
          prop="visitContent"
          label="回访内容">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="needVisitAgain"
          label="是否需要再次回访">
        <template slot-scope="scope">
          <el-tag disable-transitions effect="dark" :type="scope.row.needVisitAgain ? 'success' : 'danger'" size="mini">
            {{
              scope.row.needVisitAgain ? '是' : '否'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="visitAgainTime"
          label="下次回访日期">
        <template slot-scope="scope">
          <span v-if="scope.row.visitAgainTime">
            {{ scope.row.visitAgainTime }}
          </span>
          <el-tag disable-transitions v-else type="info">暂无日期</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
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
    <VisitRecordAddEdit
        ref="visitRecordAddEdit"
        :form="form"
        @confirm="handleConfirm"
        @closeDialog="visible = false"
        :dialog-title="dialogTitle"
        :visible="visible"/>
  </div>
</template>

<script>
import VisitRecordAddEdit from "./VisitRecordAddEdit";

export default {
  name: 'TalentVisit',
  components: {VisitRecordAddEdit},
  data() {
    return {
      mode: '',
      currentIndex: null,
      visible: false,
      dialogTitle: '',
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      list: [],
      form: {
        talentId: this.$route.query.id / 1,
        visitContent: '',
        needVisitAgain: null,
        visitAgainTime: null,
      }
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
    getList(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/talent-visit/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}&talentId=${this.form.talentId}`
      } else {
        url = `/talent-visit/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}&talentId=${this.form.talentId}`
      }
      this.$http.get(url).then(res => {
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    getDetail(_id) {
      this.$http.get('/talent-visit/detail/' + _id).then(res => {
        if (res.status) {
          this.form = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    /**
     * 添加回访记录
     */
    handleAdd() {
      this.mode = 'add'
      this.dialogTitle = '添加回访记录'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.visitRecordAddEdit.$refs.formData.resetFields()
      })
    },
    /**
     * 编辑回访记录
     * @param _index
     * @param _row
     */
    handleEdit(_index, _row) {
      console.log(_row)
      this.currentIndex = _index
      this.mode = 'edit'
      this.dialogTitle2 = '编辑回访记录'
      this.visible = true
      this.getDetail(_row.id)

    },
    /**
     * 添加/编辑回访记录确认
     */
    handleConfirm() {
      this.$refs.visitRecordAddEdit.$refs.formData.validate(valid => {
        if (valid) {
          this.visible = false
          if (this.mode === 'add') {
            this.$http.post('/talent-visit/insert', this.form).then(res => {
              if (res.status) {
                this.$message.success(res.message)
                this.getList()
                this.visible = false
                this.$refs.visitRecordAddEdit.$refs.formData.resetFields()
                return
              }
              this.$message.error(res.message)
            })
            return
          }
          delete this.form.gmtModified
          delete this.form.regeneratorId
          this.$http.put('/talent-visit/update', this.form).then(res => {
            if (res.status) {
              this.$message.success(res.message)
              this.getList()
              this.visible = false
              return
            }
            this.$message.error(res.message)
          })
          return
        }
        this.$message.error('输入有误')
      })
    },
    handleDelete(_index, _row) {
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/talent-visit/delete/' + _row.id).then(res => {
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
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-table-pagination";

</style>
