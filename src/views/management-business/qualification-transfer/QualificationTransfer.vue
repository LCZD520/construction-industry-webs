/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质转让
*/
<template>
  <div class="qualification-transfer">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="收购意向客户" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入企业意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label="资质需求" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择资质需求"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="所在地区" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请输入所在地区"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="状态" label-width="100px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择转让状态">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item label=" " label-width="100px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>

    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click="$router.push('/qualification-transfer-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">4</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="160"
          prop="transferCustomers"
          label="收购意向客户">
      </el-table-column>
      <el-table-column
          min-width="200"
          label="资质需求">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.qualificationRequirements" :key="index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column
          label="所在地区">
        <template slot-scope="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.status, $store.state.qualification_transfer_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">订单
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">图片
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleStrippe(scope.$index, scope.row,'second')">编辑
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
  name: 'QualificationTransfer',
  components: {},
  data() {
    return {
      list: [],
      loading: false,
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
    this.getListEnterpriseResources()
  },
  methods: {
    getListEnterpriseResources(_pageSize) {
      let url = `/qualification-transfer/list`
      this.loading = true
      this.$http.get(url, {
        params: {
          currentPage: this.pageInfo.currentPage,
          pageSize: _pageSize ? _pageSize : this.pageInfo.pageSize,
        }
      }).then(res => {
        if (null !== res.data) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.qualificationRequirements = JSON.parse(item.qualificationRequirements)
          })
        }
      })
      this.loading = false
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getListEnterpriseResources()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.getListEnterpriseResources(_pageSize)
    },
    handleView(_index, _row, _activeTab) {
      console.log(_index, _row)
      this.$router.push({
        path: '/qualification-transfer-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
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
@import "../../../assets/css/common-el-input-inner-width";
</style>
