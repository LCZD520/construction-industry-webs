/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质代办
*/
<template>
  <div class="qualification-agency">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="代办公司" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入代办公司">
        </el-input>
      </el-form-item>
      <el-form-item label="办理地区" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择办理地区"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="代办资质" label-width="100px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择代办资质"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="录入人" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入录入人姓名">
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
                   @click.stop="$router.push('/qualification-agency-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="160"
          prop="agencyCompany"
          label="代办公司">
      </el-table-column>
      <el-table-column
          label="办理地区">
        <template slot-scope="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="200"
          label="代办资质">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.agencyQualification" :key="index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column
          min-width="200"
          label="代办金额">
        <template slot-scope="scope">
          {{ scope.row.agencyAmount }}
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
      <el-table-column fixed="right" label="操作" width="340">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.row,'second')">图片
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.row,'fourth')">转账
          </el-button>&nbsp;
          <el-dropdown size="mini" split-button type="primary" @command="handleCommand($event,scope.row.id)">
            更多
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-info" command="view">查看</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">执行确认</el-dropdown-item>
              <el-dropdown-item icon="el-icon-wallet">代办入账</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-order">人才订单</el-dropdown-item>
              <el-dropdown-item icon="el-icon-finished">申请完成确认</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  name: 'QualificationAgency',
  components: {},
  data() {
    return {
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
    this.getListQualificationAgencys()
  },
  methods: {
    getListQualificationAgencys(_pageSize) {
      let url = `/qualification-agency/list`
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
          console.log(this.list)
          this.list.forEach(item => {
            item.agencyQualification = JSON.parse(item.agencyQualification)
          })
        }
      })
      this.loading = false
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getListQualificationAgencys()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.getListQualificationAgencys(_pageSize)
    },
    handleConfirm(_index, _row) {
      console.log(_index, _row)
      this.$message.success('执行确认')
    },
    handleEdit(_row) {
      this.$router.push('/qualification-agency-edit/' + _row.id)
    },
    handleCommand(_command, _id) {
      if (_command === 'view') {
        this.$router.push('/qualification-agency-view/' + _id)
        // return
      }
    },
    handleView(_row, _tab) {
      this.$router.push({
        path: '/qualification-agency-detail/',
        query: {
          id: _row.id,
          activeTab: _tab
        }
      })
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
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
@import "../../../assets/css/common-el-input-inner-width";
</style>
