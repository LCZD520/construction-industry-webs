/**
* Created by Lv Cheng on 2022/6/9
* Notes 角色管理
*/
<template>
  <div class="management-role">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="角色" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入角色">
        </el-input>
      </el-form-item>
      <el-form-item label="是否启用" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择是否启用">
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
                   @click="$router.push('/management-role-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">4</b> 条记录</div>
    </div>
    <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          min-width="180"
          prop="username"
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
          prop="username"
          label="角色描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleSetPermissions(scope.$index, scope.row)">设置权限
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDisable(scope.$index, scope.row)">禁用
          </el-button>
          <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)">删除
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
  name: 'ManagementRole',
  components: {},
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
          enabled: true
        },
        {
          date: '2016-05-02',
          username: '王小',
          address: '上海市普陀区',
          enabled: false
        },
      ],
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
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '一周内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '一个月内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    }
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/management-role-edit')
    },
    handleSetPermissions(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/management-role-set-permissions')
    },
    handleDisable(_index, _row) {
      console.log(_index, _row)
      this.$message.success('禁用')
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('禁用')
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

