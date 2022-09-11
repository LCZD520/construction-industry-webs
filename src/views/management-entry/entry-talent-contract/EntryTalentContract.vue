/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才合同价入账
*/
<template>
  <div class="entry-talent-contract">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="人才姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入人才姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="企业名称" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="申请人" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择创建人姓名">
          <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转账方信息" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入转账方信息">
        </el-input>
      </el-form-item>
      <el-form-item label="到账日期" label-width="120px">
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
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.talentEntry.talentOrder.orderno }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="企业名称">
        <template slot-scope="scope">
          {{ scope.row.talentEntry.talentOrder.enterpriseName }}
        </template>
      </el-table-column>
      <el-table-column
          prop="fullName"
          min-width="180"
          label="人才姓名">
      </el-table-column>
      <el-table-column
          prop="entryAmount"
          min-width="180"
          label="申请转入金额">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="申请状态">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="scope.row.status === 1 ? 'info'
            : scope.row.status === 2 ? 'success' : 'danger' "
                  size="mini">
            {{ $valueToLabel(scope.row.status, $store.state.talent_entry_status_options) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="转账方信息">
        <template slot-scope="scope">
          {{ scope.row.talentEntry.transferorInfo }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="申请人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="到账日期">
        <template slot-scope="scope">
          {{ scope.row.talentEntry.transferDate }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="人才录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="企业录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.status === 1"
              size="mini"
              type="primary"
              icon="el-icon-check"
              @click.stop="handleExamine(scope.row)">审核
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
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
  name: 'EntryTalentContract',
  components: {},
  data() {
    return {
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
      try {
        const res = await this.$http.get('/talent-entry-record/list', {
          params: {
            pageSize: _pageSize === undefined ? this.pageInfo.pageSize : _pageSize,
            currentPage: this.pageInfo.currentPage
          }
        })
        if (res.status && res.data !== null) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 审核
     * @param _row
     */
    handleExamine(_row) {
      this.$router.push('/entry-talent-contract-approval/' + _row.id)
    },
    /**
     * 查看
     * @param _index
     * @param _row
     */
    handleView(_index, _row) {
      this.$router.push('/entry-talent-contract-view/' + _row.id)
    },
    handleCurrentChange() {
      this.getList()
    },
    handleSizeChange() {
      this.getList(this.pageInfo.pageSize)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
