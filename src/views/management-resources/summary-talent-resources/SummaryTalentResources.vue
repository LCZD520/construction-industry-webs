/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才资源汇总
*/
<template>
  <div class="summary-talent-resources">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入姓名">
        </el-input>
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
      <el-form-item label="录入人" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择录入人">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item label="是否共享" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择是否共享">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入日期" label-width="120px">
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
        <el-button icon="el-icon-plus" size="small" type="primary">添加</el-button>
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
              @click="handleEdit(scope.$index, scope.row)">查看
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
              @click="handleEdit(scope.$index, scope.row)">删除
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
  name: 'SummaryTalentResources',
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
          title: '录入人',
          key: 'address'
        },
        {
          title: '录入时间',
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
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
      this.file = file.raw;
      let reader = new FileReader()
      let _this = this
      console.log(_this)
      reader.readAsArrayBuffer(this.file)
      reader.onload = function () {
        let buffer = reader.result
        let bytes = new Uint8Array(buffer)
        let length = bytes.byteLength
        let binary = ''
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let XLSX = require('xlsx')
        let wb = XLSX.read(binary, {
          type: 'binary'
        })
        let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        outdata.forEach(item => {
          let newObj = {}
          for (const itemKey in _this.mapObj) {
            newObj[_this.mapObj[itemKey]] = item[itemKey]
          }
          _this.list.push(newObj)
          console.log(_this.list)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
@import "../../../assets/css/common-el-input-inner-width";
</style>
