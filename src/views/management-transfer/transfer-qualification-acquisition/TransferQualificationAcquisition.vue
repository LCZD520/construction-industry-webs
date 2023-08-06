/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质收购转账
*/
<template>
  <div class="transfer-qualification-acquisition">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="申请人" prop="creatorId">
        <el-select size="small" v-model="form.creatorId" placeholder="请输入申请人姓名">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请日期" prop="date">
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
      <el-form-item label="申请状态" prop="status">
        <el-select size="small" v-model="form.status" placeholder="请选择申请状态">
          <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转让意向客户" prop="transferIntendedCustomer">
        <el-input size="small" v-model.trim="form.transferIntendedCustomer" placeholder="请输入转让意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label="收购意向客户" prop="acquisitionIntendedCustomer">
        <el-input size="small" v-model.trim="form.acquisitionIntendedCustomer" placeholder="请输入收购意向客户">
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
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          align="center"
          min-width="180"
          prop="gmtCreate"
          label="申请时间">
      </el-table-column>
      <el-table-column
          align="right"
          min-width="180"
          label="申请转账金额">
        <template #default="{row}">
          <span>{{ row.transferAmount | formatAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="申请人">
        <template #default="{row}">
          {{ $valueToLabel(row.creatorId, $store.state.user_options) }}
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="180"
          label="资质转让录入人">
        <template #default="{row}">
          {{ $valueToLabel(row.qualificationTransferCreatorId, $store.state.user_options) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{row}">
          <el-button
              v-if="$store.state.currentUser.listRoleIds.length>0
               && $store.state.currentUser.listRoleIds.includes(row.currentAuditRoleId)"
              size="mini"
              type="primary"
              disabled
              @click.stop="handleAudit(row.id)">审批
          </el-button>
          <el-button
              size="mini"
              type="primary"
              disabled
              @click.stop="handleView(row.id)">查看
          </el-button>
        </template>
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
  name: 'TransferQualificationAcquisition',
  components: {},
  data() {
    return {
      loading: false,
      statusOptions: [
        '已申请待审批',
        '一次审核审批通过',
        '一次审核审批不通过',
        '二次审核审批通过',
        '二次审核审批不通过',
        '财务审批通过',
        '财务审批不通过',
        '出纳审批通过',
        '出纳审批不通过',
      ],
      columns: [
        {
          title: '款项用途',
          key: 'fundsPurpose'
        },
        {
          title: '申请状态',
          key: 'applicationStatus'
        },
        {
          title: '转让意向客户',
          key: 'transferCustomers'
        },
        {
          title: '收购意向客户',
          key: 'acquisitionIntendedCustomer'
        },
      ],
      list: [
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
        creatorId: null,
        date: [],
        status: '',
        transferIntendedCustomer: '',
        acquisitionIntendedCustomer: '',
      },
      rules: {
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        transferIntendedCustomer: [{required: false, trigger: 'blur'}],
        acquisitionIntendedCustomer: [{required: false, trigger: 'blur'}],
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
  filters: {
    formatAmount(num, decimal = 2, split = ',') {
      if (isFinite(num)) {
        if (num === 0) {
          return num.toFixed(decimal)
        } else {
          let res = ''
          let dotIndex = String(num).indexOf('.')
          if (dotIndex === -1) {
            res = String(num).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + '.' + '0'.repeat(decimal)
          } else {
            const numStr = String((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal))
            const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1)
            res = String(numStr.slice(0, dotIndex)).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + decimals
          }
          return res
        }
      } else {
        return '/'
      }
    },
  },
  created() {
    this.search()
  },
  methods: {
    handleView(_id) {
      this.$router.push(`/transfer-qualification-acquisition-view/${_id}`)
    },
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
        const res = await this.$http.post('/qualification-acquisition-transfer/list', newForm)
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
    },
    handleAudit(_id) {
      this.$router.push(`/qualification-acquisition-transfer/audit/${_id}`)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
