/**
* Created by Lv Cheng on 2022/6/9
* Notes 操作日志
*/
<template>
  <div class="operation-log">
    <el-form
        ref="formData"
        inline
        :model="form">

      <el-form-item label="用户名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="用户中文姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入用户中文姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="操作日期" label-width="120px">
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

      <el-form-item label="机构名称" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入机构名称">
        </el-input>
      </el-form-item>
      <el-form-item label="日志内容" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入日志内容">
        </el-input>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
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
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
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
  name: 'OperationLog',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '用户名',
          key: 'address'
        },
        {
          title: '用户中文姓名',
          key: 'address'
        },
        {
          title: '机构名称',
          key: 'address'
        },
        {
          title: '操作时间',
          key: 'address'
        },
        {
          title: '日志内容',
          key: 'address'
        },
        {
          title: '备注',
          key: 'address'
        },
      ],
      options: [
        {
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
      options2: [
        {
          value: '选项1',
          label: '初始'
        },
        {
          value: '选项2',
          label: '转注'
        },
        {
          value: '选项3',
          label: '其他'
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-04',
          username: '王小虎',
          address: '上海市普陀区'
        }, {
          date: '2016-05-01',
          username: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-03',
          username: '王小虎',
          address: '上海市普陀区'
        }],
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
    console.log(this.$route)
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
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
