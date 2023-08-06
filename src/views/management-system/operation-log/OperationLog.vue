/**
* Created by Lv Cheng on 2022/6/9
* Notes 操作日志
*/
<template>
  <div class="operation-log">
    <el-form
        ref="form"
        inline
        label-width="120px"
        :rules="rules"
        :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input size="small" v-model.trim="form.username" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="用户中文姓名" prop="userChineseName">
        <el-input size="small" v-model.trim="form.userChineseName" placeholder="请输入用户中文姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="操作日期" prop="date">
        <el-date-picker
            v-model="form.date"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="机构名称" prop="mechanismName">
        <el-input size="small" v-model="form.mechanismName" placeholder="请输入机构名称">
        </el-input>
      </el-form-item>
      <el-form-item label="日志内容" prop="logContent">
        <el-input size="small" v-model="form.logContent" placeholder="请输入日志内容">
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" v-throttle="search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        height="500"
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          :width="item.width"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
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
  name: 'OperationLog',
  components: {},
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '用户中文姓名',
          key: 'userChineseName'
        },
        {
          title: '机构名称',
          key: 'mechanismName'
        },
        {
          title: '日志内容',
          key: 'logContent'
        },
        {
          title: 'IP地址',
          key: 'ip'
        },
        {
          title: '归属地',
          key: 'cityInfo'
        },
        {
          title: '操作时间',
          key: 'gmtCreate',
          width: '160'
        },
        {
          title: '备注',
          key: 'remark'
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        username: '',
        userChineseName: '',
        mechanismName: '',
        date: [],
        logContent: '',
      },
      rules: {
        username: [{required: false, trigger: 'blur'}],
        userChineseName: [{required: false, trigger: 'blur'}],
        mechanismName: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        logContent: [{required: false, trigger: 'blur'}],
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
    this.search()
  },
  methods: {
    async search(pageSize) {
      let newForm = {}
      newForm = Object.assign(newForm, this.form)
      if (this.form.date && this.form.date.length > 0) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      newForm.pageSize = pageSize ? pageSize : this.pageInfo.pageSize
      newForm.currentPage = this.pageInfo.currentPage
      this.loading = true
      try {
        const res = await this.$http.post('/operation-log', newForm)
        if (res.status) {
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
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
