/**
* Created by Lv Cheng on 2022/11/19
* Notes 系统公告
*/
<template>
  <div class="system-notice">
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          prop="title"
          label="标题">
      </el-table-column>
      <el-table-column
          prop="gmtCreate"
          label="发布时间">
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="{row}">
          <el-button
              size="mini"
              icon="el-icon-info"
              type="primary"
              @click="handleView(row.id)">查看
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
  </div>
</template>

<script>
export default {
  name: 'SystemNotice',
  components: {},
  data() {
    return {
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
    }
  },
  created() {
    this.getListNotices()
  },
  methods: {
    handleView(id) {
      console.log(id)
      this.$router.push('/system-notice-view/' + id)
    },
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
    async getListNotices(_pageSize) {
      const {currentPage, pageSize} = this.pageInfo
      try {
        const res = await this.$http.get(`/notice/list-notices-enabled`, {
          params: {
            currentPage,
            pageSize: _pageSize ? _pageSize : pageSize
          }
        })
        console.log(res)
        if (res.data) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          return
        }
        this.$message.error(res.data.message)
      } catch (e) {
        console.log(e)
      }

    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
</style>
