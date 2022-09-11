/**
* Created by Lv Cheng on 2022/6/9
* Notes 高级设置
*/
<template>
  <div class="advanced-setting">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="名称" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入名称">
        </el-input>
      </el-form-item>
      <el-form-item label="代码" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入配置项代码">
        </el-input>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click="$router.push('/advanced-setting-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="configName"
          label="名称">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="configCode"
          label="代码">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="configValue"
          label="值">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="configDescription"
          label="描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
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
  name: 'AdvancedSetting',
  components: {},
  data() {
    return {
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
     * 获取高级设置列表
     * @param _pageSize
     */
    getList(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/advanced-setting/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/advanced-setting/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url)
          .then(res => {
            console.log(res)
            if (null !== res.data) {
              this.pageInfo.total = res.data.total
              this.list = res.data.list
            }
          })
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/advanced-setting-edit/' + _row.advancedSettingId)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/advanced-setting/delete/' + _row.advancedSettingId).then(res => {
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
@import "../../../assets/css/common-el-input-inner-width";
</style>
