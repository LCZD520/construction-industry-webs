/**
* Created by Lv Cheng on 2022/6/9
* Notes 我的人才资源
*/
<template>
  <div class="my-talent-resources">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="级别专业" label-width="120px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择级别专业"
            :options="regionData"
            v-model="form.newPassword"
            @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="客户类型" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择客户类型">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生成日期" label-width="120px">
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
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/my-talent-resources-add')">添加
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
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              plain
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
  name: 'MyTalentResources',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '姓名',
          key: 'address'
        },
        {
          title: '级别-专业-转/注',
          key: 'address'
        },
        {
          title: '电话号码',
          key: 'address'
        },
        {
          title: '客户类型',
          key: 'address'
        },
        {
          title: '跟进情况',
          key: 'address'
        },
        {
          title: '人才业绩',
          key: 'address'
        },
        {
          title: '录入时间',
          key: 'address'
        },
      ],
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
  created() {
    this.getListTalentResources()
  },
  methods: {
    getListTalentResources() {
      this.$http('/talent-resource/get-list').then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    },
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
      this.$router.push('/my-talent-resources-view')
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/my-talent-resources-edit')
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('删除' + _row.username)
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

