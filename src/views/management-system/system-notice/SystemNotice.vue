/**
* Created by Lv Cheng on 2022/6/9
* Notes 系统公告
*/
<template>
  <div class="system-notice">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="标题" prop="title">
        <el-input size="small" v-model.trim="form.title" placeholder="请输入标题">
        </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-select size="small" v-model="form.enabled" placeholder="请选择状态">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" v-throttle="search" type="primary">搜 索</el-button>
        <el-button size="small" v-throttle="reset" icon="el-icon-refresh-right">重 置</el-button>
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
        v-loading="loading"
        :data="list"
        height="460"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
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
          label="发布人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
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
              disabled
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
  </div>
</template>

<script>
export default {
  name: 'SystemNotice',
  components: {},
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      options: [
        {value: 1, label: '启用'},
        {value: 0, label: '禁用'}
      ],
      form: {
        title: '',
        enabled: null,
      },
      rules: {
        title: [{required: false, trigger: 'blur'}],
        enabled: [{required: false, trigger: 'blur'}],
      },
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    async search(pageSize) {
      let newForm = {}
      newForm.pageSize = pageSize ? pageSize : this.pageInfo.pageSize
      newForm.currentPage = this.pageInfo.currentPage
      newForm.enabled = this.form.enabled
      newForm.title = this.form.title
      console.log(newForm)
      this.loading = true
      try {
        const res = await this.$http.get('/notice/get-list-notices', {
          params: newForm
        })
        if (res) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    handleCurrentChange() {
      this.search()
    },
    handleSizeChange(size) {
      this.search(size)
    },
    handleView(_index, _row) {
      this.$router.push('/system-notice-view/' + _row.id)
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
        this.$http.delete('/notice/delete/' + _row.id).then(res => {
          if (res.enabled) {
            this.$message.success(res.data.message)
            this.search()
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
