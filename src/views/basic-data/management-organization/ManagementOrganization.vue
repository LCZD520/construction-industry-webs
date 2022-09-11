/**
* Created by Lv Cheng on 2022/6/9
* Notes 组织管理
*/
<template>
  <div class="management-organization">
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="content-left">
          <div class="content-left-header">
            <el-button style="padding: 6px" size="mini" type="primary" @click="$router.push('/institution-add')">添加
            </el-button>
            <el-button style="padding: 6px" size="mini" @click="handleEditMechanism"
                       :disabled="currentMechanismId === null">
              编辑
            </el-button>
            <el-button style="padding: 6px" size="mini" type="danger" :disabled="currentMechanismId === null"
                       @click="handleDeleteMechanism">删除
            </el-button>
          </div>
          <div class="content-left-content">
            <el-tree
                :data="$store.state.mechanisms.listMechanisms"
                :props="defaultProps"
                highlight-current
                @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content-right" style="height: 500px">
          <el-form
              ref="formData"
              inline
              :model="form">
            <el-form-item label="用户姓名" label-width="120px">
              <el-input size="small" v-model="form.newPassword" placeholder="请输入用户中文姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="是否在职" label-width="120px">
              <el-select size="small" v-model="form.oldPassword" placeholder="请选择是否在职">
                <el-option
                    v-for="item in this.$store.state.bool_options"
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
                         @click="$router.push('/management-organization-add')">添加
              </el-button>
            </div>
            <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
          </div>
          <el-table
              :data="tableData"
              stripe
              height="400"
              border
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
            <el-table-column
                min-width="180"
                prop="username"
                label="姓名">
            </el-table-column>
            <el-table-column
                min-width="180"
                prop="username"
                label="用户名">
            </el-table-column>
            <el-table-column
                min-width="180"
                label="性别">
              <template slot-scope="scope">
                <el-tag
                    v-if="scope.row.sex === 1"
                    size="small"
                    effect="dark">
                  男
                </el-tag>
                <el-tag
                    v-if="scope.row.sex === 2"
                    size="small"
                    type="success"
                    effect="dark">
                  女
                </el-tag>
                <el-tag
                    v-if="scope.row.sex === 3"
                    size="small"
                    type="info"
                    effect="dark">
                  未知
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
                min-width="180"
                label="机构名称">
              <template slot-scope="scope">
                {{ scope.row.mechanism.mechanismName }}
              </template>
            </el-table-column>
            <el-table-column
                min-width="180"
                label="是否在职">
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
                prop="username"
                label="联系方式">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleView(scope.$index, scope.row)">查看
                </el-button>
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
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleResetPassword(scope.$index, scope.row)">重置密码
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div class="pagination-total">共<span class="total"> {{ pageInfo.total }} </span>条</div>
            <div class="pagination-right">
              <el-pagination
                  ref="pagination"
                  :page-sizes="[10]"
                  :page-size="pageInfo.pageSize"
                  :current-page.sync="pageInfo.currentPage"
                  @current-change="handleCurrentChange"
                  background
                  layout="sizes, prev, pager, next, jumper"
                  :total="pageInfo.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ManagementOrganization',
  components: {},
  data() {
    return {
      currentMechanismId: null,
      tableData: [],
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
      listRoles: [],
      defaultProps: {
        children: 'subListMechanisms',
        label: 'mechanismName'
      }
    }
  },
  created() {
    this.getListUsers()
    this.getListMechanisms()
  },
  methods: {
    async getListUsers(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/user/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/user/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      try {
        const res = await this.$http.get(url)
        if (res.status) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
        // eslint-disable-next-line no-empty
      } catch (e) {

      }
    },
    async getListMechanisms() {
      await this.$http.get('/mechanism/list').then(res => {
        if (res.status && res.data.listMechanisms != null) {
          this.$store.dispatch('mechanisms/initListMechanisms', res.data.listMechanisms)
        }
      })
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.currentMechanismId == null ? this.getListUsers() : this.getListUsersByMechanismId(this.currentMechanismId)
    },
    async handleNodeClick({mechanismId}) {
      this.currentMechanismId = mechanismId
      this.pageInfo.currentPage = 1
      await this.getListUsersByMechanismId(mechanismId)
    },
    async getListUsersByMechanismId(mechanismId) {
      let url = `/user/list-condition?mechanismId=${mechanismId}&currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      try {
        const res = await this.$http.get(url)
        if (res.status) {
          this.tableData = res.data.list
          this.pageInfo.total = res.data.total
        }
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    },
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/management-organization-view/' + _row.userId)
    },
    handleEdit(_index, _row) {
      this.$router.push('/management-organization-edit/' + _row.userId)
    },
    handleDeleteMechanism() {
      this.$http.delete('/mechanism/delete/' + this.currentMechanismId).then(res => {
        if (res.status) {
          this.$message.success(res.message)
          this.getList()
          return
        }
        this.$message.error(res.message)
      })
    },
    handleDelete(_index, _row) {
      this.$message.success('删除' + _row)
    },
    handleEditMechanism() {
      this.$router.push('/institution-edit/' + this.currentMechanismId)
    },
    handleResetPassword(_index, _row) {
      console.log(_index, _row)
      this.$message.success('重置密码 ')
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
@import "../../../assets/css/common-el-input-inner-width";

.management-organization {
  margin: -10px;

  .content-left {
    text-align: center;

    .content-left-header {
      padding: 10px;
    }

    .content-left-content {
      padding: 10px;
    }
  }
}
</style>

