/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质收购
*/
<template>
  <div class="qualification-acquisition">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-row :gutter="20">
        <el-col span="7">
          <el-form-item label="收购意向客户" label-width="100px">
            <el-input size="small" v-model="form.newPassword" placeholder="请输入企业意向客户">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col span="7">
          <el-form-item label="资质需求" label-width="100px">
            <el-cascader
                size="small"
                clearable
                placeholder="请选择资质需求"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col span="7">
          <el-form-item label="所在地区" label-width="100px">
            <el-cascader
                size="small"
                clearable
                placeholder="请输入所在地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col span="7">
          <el-form-item label="状态" label-width="100px">
            <el-input size="small" v-model="form.newPassword" placeholder="请选择转让状态">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col span="7">
          <el-form-item label="录入人" label-width="100px">
            <el-input size="small" v-model="form.newPassword" placeholder="请输入录入人名称">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col span="7">
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
      </el-row>
      <el-row gutter="20">
        <el-col span="7">
          <el-form-item label=" " label-width="100px">
            <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
            <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button
              v-if="false"
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">完成
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">订单
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">图片
          </el-button>
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
              v-if="true"
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
// 省市区数据源
// eslint-disable-next-line no-unused-vars
import {provinceAndCityData, CodeToText} from 'element-china-area-data'
export default {
  name: 'QualificationAcquisition',
  components: {},
  data() {
    return {
      regionData: provinceAndCityData,
      columns: [
        {
          title: '客户名称',
          key: 'address'
        },
        {
          title: '客户类型',
          key: 'address'
        },
        {
          title: '资质转让录入数',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '人员数',
          key: 'address'
        },
        {
          title: '代办总金额',
          key: 'address'
        },
        {
          title: '录入人名称',
          key: 'address'
        },
        {
          title: '录入时间',
          key: 'address'
        },
      ],
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
      options2: [
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
    handleChange(_val) {
      console.log(_val)
      _val.forEach(k => {
        console.log(CodeToText[k])
      })
      this.ruleForm.area = JSON.stringify(_val)
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
</style>
