/**
* Created by Lv Cheng on 2022/6/9
* Notes 职称评审
*/
<template>
  <div class="title-evaluation">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="客户名称" label-width="100px">
            <el-input size="small" v-model="form.newPassword" placeholder="请输入客户名称">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="客户类型" label-width="100px">
            <el-select size="small" v-model="form.newPassword" placeholder="请选择客户类型">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="状态" label-width="100px">
            <el-select size="small" v-model="form.newPassword" placeholder="请选择状态">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="录入人" label-width="100px">
            <el-select size="small" v-model="form.newPassword" placeholder="请选择录入人">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="录入日期" label-width="100px">
            <el-date-picker
                v-model="form.oldPassword"
                size="small"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label=" " label-width="100px">
            <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
            <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/title-evaluation-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">4</b> 条记录</div>
    </div>
    <el-table
        :data="tableData"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="cellStyle"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop=""
          label="客户名称">
      </el-table-column>
      <el-table-column
          min-width="150"
          label="客户类型">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.username, $store.state.class_three_personnel_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="150"
          label="状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.username, $store.state.class_three_personnel_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="150"
          prop=""
          label="人员数">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="代办总金额">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人名称">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button
              v-if="false"
              size="mini"
              type="primary"
              @click.stop="handleComplete(scope.$index, scope.row)">完成
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">订单
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'second')">图片
          </el-button>
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
              v-if="true"
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
  name: 'TitleEvaluation',
  components: {},
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '录入企业数'
        },
        {
          value: '选项2',
          label: '录入人才数'
        },
        {
          value: '选项3',
          label: '资质收购录入数'
        },
        {
          value: '选项4',
          label: '资质转让录入数'
        },
        {
          value: '选项5',
          label: '资质代办录入数'
        },
        {
          value: '选项6',
          label: '职称评审录入数'
        },
        {
          value: '选项7',
          label: '三类人员录入数'
        },
        {
          value: '选项8',
          label: '学历提升录入数'
        },
        {
          value: '选项9',
          label: '录入总数'
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
        },],
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
  mounted() {
  },
  methods: {
    cellStyle({columnIndex}) {
      let columns = [4]
      if (columns.indexOf(columnIndex) > -1) {
        return 'text-align:right'
      }
      return 'text-align:center'
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {

    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      console.log(_pageSize)
    },
    handleView(_index, _row, _activeTab) {
      console.log(_index, _row)
      this.$router.push({
        path: '/title-evaluation-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/title-evaluation-edit')
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确定删除!'
        });
      }).catch(() => {
      })
    },
    handleComplete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('完成')
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
