/**
* Created by Lv Cheng on 2022/6/9
* Notes 系统公告
*/
<template>
  <div class="system-notice">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="标题" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入标题">
        </el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择状态">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click="$router.push('/system-notice-add')">新建
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="listNotices"
        height="460"
        stripe
        border
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          min-width="300"
          prop="title"
          label="标题">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="发布时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="username"
          label="发布人">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="状态">
        <template slot-scope="scope">
          <el-tag disable-transitions effect="dark" size="small"
                  :type="scope.row.enabled ? 'success' : 'danger'">
            {{ scope.row.enabled ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleView(scope.$index, scope.row)">查看
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
  name: 'SystemNotice',
  components: {},
  data() {
    return {
      listNotices: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      options: [],
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }
  },
  mounted() {
    this.getListNotices()
  },
  methods: {
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getListNotices()
    },
    /**
     * 改变页数
     * @param _pageSize
     */
    handleSizeChange(_pageSize) {
      this.getListNotices(_pageSize)
    },
    /**
     * 获取公告列表
     * @param _pageSize
     */
    getListNotices(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/notice/get-list-notices?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/notice/get-list-notices?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url)
          .then(res => {
            console.log(res)
            if (null !== res.data) {
              this.pageInfo.total = res.data.total
              this.listNotices = res.data.listNotices
            }
          })
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleView(_index, _row) {
      this.$router.push({
        path: '/system-notice-view',
        query: {
          id: _row.id
        }
      })
    },
    handleEdit(_index, _row) {
      this.$router.push({
        path: '/system-notice-edit',
        query: {
          id: _row.id
        }
      })
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/notice/delete/' + _row.id).then(res => {
          if (res.status) {
            this.$message.success(res.data.message)
            this.getListNotices()
          }
        }).catch(err => {
          console.log(err)
        })

      }).catch(() => {
      })
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
</style>
