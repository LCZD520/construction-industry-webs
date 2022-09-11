/**
* Created by Lv Cheng on 2022/6/9
* Notes 企业查询
*/
<template>
  <div class="enterprise-query">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="企业名称" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="地区" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择地区"
            :options="regionData"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="录入人" label-width="100px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择录入人">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="级别专业" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择级别专业"
            :options="regionData"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="初始转注" label-width="100px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择初始转注">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业状态" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请选择企业状态">
        </el-input>
      </el-form-item>
      <el-form-item label=" " label-width="100px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/enterprise-query-add')">录入企业
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          fixed="left"
          min-width="180"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="120"
          label="地区">
        <template slot-scope="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="270"
          label="级别-专业-初/转">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.listEnterpriseDemands.length === 0" type="info">未填
          </el-tag>
          <div
              v-else
              :style="{whiteSpace:'pre-line',marginBottom:'5px',
              borderRadius:'5px',
              color: index % 2 === 1? '#409EFF' : '#F56C6C'}"
              v-for="(item,index) in scope.row.listEnterpriseDemands"
              :key="index">
            <span v-for="(subItem,index) in item.levelMajorInitialConversion"
                  :key="index">
              {{ subItem.levelMajor[0] }}&nbsp;/&nbsp;{{ subItem.levelMajor[1] }}
                &nbsp;-&nbsp;{{
                $valueToLabel(subItem.initialConversion, $store.state.initial_conversion_options) + '\n'
              }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="企业状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.enterpriseStatus, $store.state.enterprise_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">订单
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'second')">图片
          </el-button>
          <el-button
              v-if="scope.row.enterpriseStatus === 1"
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'third')">转账
          </el-button>
          <p style="height: 10px"></p>
          <el-button
              size="mini"
              v-if="true"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fourth')">企业回访
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fifth')">后勤申请
          </el-button>
          <el-button
              style="padding: 5px"
              v-if="scope.row.enterpriseStatus === 2"
              size="mini"
              type="primary"
              @click.stop="handleCompleteConfirm(scope.$index, scope.row)">完成确认
          </el-button>
          <el-button
              v-if="scope.row.enterpriseStatus === 1"
              style="padding: 5px"
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
// 省市区数据源
// eslint-disable-next-line no-unused-vars
import {provinceAndCityData, CodeToText} from 'element-china-area-data'

export default {
  name: 'EnterpriseQuery',
  components: {},
  data() {
    return {
      regionData: provinceAndCityData,
      loading: false,
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
      list: [],
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
    this.getList()
  },
  methods: {
    async getList(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/enterprise/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/enterprise/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      try {
        this.loading = true
        const res = await this.$http.get(url)
        if (res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.listEnterpriseDemands.forEach(enterpriseDemand => {
              enterpriseDemand.levelMajorInitialConversion
                  = JSON.parse(enterpriseDemand.levelMajorInitialConversion)
            })
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }

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
        path: '/enterprise-query-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    handleEdit(_index, _row) {
      this.$router.push('/enterprise-query-edit/' + _row.id)
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
    handleCompleteConfirm(_index, _row) {
      console.log(_index, _row)
      this.$message.success("完成确认")
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
