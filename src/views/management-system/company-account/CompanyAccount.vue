/**
* Created by Lv Cheng on 2022/6/9
* Notes 公司账户
*/
<template>
  <div class="company-account">
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/company-account-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        stripe
        border
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
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
  name: 'CompanyAccount',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '银行名称',
          key: 'bankName'
        },
        {
          title: '开户行',
          key: 'openingBank'
        },
        {
          title: '户名',
          key: 'accountName'
        },
        {
          title: '银行卡号',
          key: 'bankCardNo'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
      list: [],
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
    }
  },
  created() {
    this.getList()
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
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/company-account-view/' + _row.enterpriseAccountId)
    },
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
     * 获取企业账户列表
     * @param _pageSize
     */
    getList(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/enterprise-account/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/enterprise-account/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url).then(res => {
        console.log(res)
        if (null !== res.data) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
        }
      })
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/company-account-edit/' + _row.enterpriseAccountId)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/enterprise-account/delete/' + _row.enterpriseAccountId).then(res => {
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
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
</style>
