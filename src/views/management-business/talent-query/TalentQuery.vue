/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才查询
*/
<template>
  <div class="talent-query">
<!--    <el-upload-->
<!--        ref="upload"-->
<!--        action=""-->
<!--        :auto-upload="false"-->
<!--        :file-list="fileList"-->
<!--        :on-change="handleChange"-->
<!--        multiple-->
<!--        :show-file-list="false"-->
<!--    >-->
<!--      <el-button type="primary">批量导入</el-button>-->
<!--    </el-upload>-->
<!--    <br>-->
<!--    <el-button type="primary">导出Excel</el-button>-->
<!--    <el-table-->
<!--        :data="list"-->
<!--        stripe-->
<!--        highlight-current-row-->
<!--        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"-->
<!--        :cell-style="{textAlign:'center'}"-->
<!--        style="width: 100%"-->
<!--        :row-class-name="tableRowClassName">-->
<!--      <el-table-column-->
<!--          prop="name"-->
<!--          label="姓名">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="name"-->
<!--          label="性别">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="name"-->
<!--          label="身份证">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="name"-->
<!--          label="联系电话">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="originalEducation"-->
<!--          label="原始学历">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="applicationSchool"-->
<!--          label="申报学校">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="educationalSystem"-->
<!--          label="学制">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="major"-->
<!--          label="专业">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="improveEducation"-->
<!--          label="提升学历">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="agencyAmount"-->
<!--          label="代办金额">-->
<!--      </el-table-column>-->
<!--      <el-table-column width="200" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">编辑-->
<!--          </el-button>-->
<!--          <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)">删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
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
        <el-button icon="el-icon-plus" size="small" type="primary">录入人才</el-button>
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
          fixed="left"
          min-width="180"
          prop="username"
          label="姓名">
      </el-table-column>
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
import {provinceAndCityData} from "_element-china-area-data@5.0.2@element-china-area-data";

export default {
  name: 'TalentQuery',
  components: {},
  data() {
    return {
      fileList: [],
      file: "",
      list: [],
      mapObj: {
        "专业": "major",
        "代办金额": "agencyAmount",
        "原始学历": "originalEducation",
        "姓名": "name",
        "学制": "educationalSystem",
        "性别": "gender",
        "提升学历": "improveEducation",
        "申报学校": "applicationSchool",
        "联系电话": "telephone",
        "身份证": "identityCard"
      },

      regionData: provinceAndCityData,
      columns: [
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '地区',
          key: 'address'
        },
        {
          title: '招标出场',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '社保',
          key: 'address'
        },
        {
          title: '人才状态',
          key: 'address'
        },
        {
          title: '职称',
          key: 'address'
        },
        {
          title: '三类人员',
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
        {
          title: '报价',
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
</style>
