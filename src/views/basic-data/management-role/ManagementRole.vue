/**
* Created by Lv Cheng on 2022/6/9
* Notes 角色管理
*/
<template>
  <div class="management-role">
    <el-form
        ref="form"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="角色" prop="roleName">
        <el-input size="small" v-model="form.roleName" placeholder="请输入角色">
        </el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-select size="small" v-model="form.enabled" placeholder="请选择是否启用">
          <el-option
              v-for="item in $store.state.bool_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" type="primary" @click="search">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right" @click="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click="$router.push('/management-role-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="roleName"
          label="角色名称">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="是否启用">
        <template slot-scope="scope">
          <el-tag
              size="small"
              :type="scope.row.enabled ? 'success' : 'danger'"
              effect="dark"
              disable-transitions>{{ scope.row.enabled ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="200"
          prop="description"
          label="角色描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleSetPermissions(row)">设置权限
          </el-button>
          <el-button
              v-if="row.enabled"
              size="mini"
              type="danger"
              @click="handleDisable(row)">禁用
          </el-button>
          <el-button
              v-else
              size="mini"
              type="success"
              @click="handleEnable(row)">启用
          </el-button>
          <el-button
              size="mini"
              disabled
              type="danger"
              @click="handleDelete(row)">删除
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
  name: 'ManagementRole',
  components: {},
  data() {
    return {
      list: [],
      loading: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        roleName: '',
        enabled: null,
      },
    }
  },
  created() {
    this.getListRoles()
  },
  methods: {
    search() {
      this.getListRoles()
    },
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.getListRoles()
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getListRoles()
    },
    /**
     * 改变页数
     * @param _pageSize
     */
    handleSizeChange(_pageSize) {
      this.getListRoles(_pageSize)
    },
    async getListRoles(_pageSize) {
      this.loading = true
      const {currentPage, pageSize} = this.pageInfo
      try {
        const res = await this.$http.get('/role/list', {
          params: {
            currentPage,
            pageSize: _pageSize ? _pageSize : pageSize,
            roleName: this.form.roleName,
            enabled: this.form.enabled
          }
        })
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    handleEdit(_row) {
      this.$router.push({
        path: '/management-role-edit',
        query: {
          id: _row.roleId
        }
      })
    },
    handleSetPermissions(_row) {
      this.$router.push({
        path: '/management-role-set-permissions',
        query: {
          id: _row.roleId
        }
      })
    },
    async handleDisable(_row) {
      try {
        const res = await this.$http.post(`/role/disable/${_row.roleId}`)
        if (res.status) {
          this.$message.success(res.message)
          await this.getListRoles()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    async handleEnable(_row) {
      try {
        const res = await this.$http.post(`/role/enable/${_row.roleId}`)
        if (res.status) {
          this.$message.success(res.message)
          await this.getListRoles()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    handleDelete(_row) {
      console.log(_row);
      this.$message.success('删除')
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/split-line";
</style>

