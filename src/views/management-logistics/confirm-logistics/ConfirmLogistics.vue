/**
* Created by Lv Cheng on 2022/6/9
* Notes 后勤确认
*/
<template>
  <div class="confirm-logistics">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="申请人" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入创建人姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="客户名称" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
      <el-form-item label="后勤项目" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择后勤项目">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后勤申请状态" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择后勤申请状态">
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
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">查看
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
  name: 'ConfirmLogistics',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '申请人',
          key: 'address'
        },
        {
          title: '客户名称',
          key: 'address'
        },
        {
          title: '后勤项目',
          key: 'address'
        },
        {
          title: '申请备注',
          key: 'address'
        },
        {
          title: '提交时间',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '企业业绩',
          key: 'address'
        },
        {
          title: '业绩生成时间',
          key: 'address'
        },
        {
          title: '业绩状态',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '企业录入人',
          key: 'address'
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
  methods: {
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
