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
            <el-button style="padding: 6px" size="mini" @click="handleEditMenu">编辑</el-button>
            <el-button style="padding: 6px" size="mini" type="danger" @click="handleDelete">删除</el-button>
          </div>
          <div class="content-left-content">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                         @click="$router.push('/management-organization-add')">添加
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
                prop="username"
                label="机构名称">
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
                    plain
                    @click="handleView(scope.$index, scope.row)">查看
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
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
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
          sex: 1,
          enabled: true
        },
        {
          date: '2016-05-02',
          username: '王小',
          sex: 2,
          address: '上海市普陀区',
          enabled: false
        },
        {
          date: '2016-05-02',
          username: '王小',
          sex: 3,
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
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/management-organization-view')
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/management-organization-edit')
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('删除')
    },
    handleEditMenu(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/institution-edit')
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

