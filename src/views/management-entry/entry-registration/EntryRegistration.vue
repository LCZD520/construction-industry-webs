/**
* Created by Lv Cheng on 2022/6/9
* Notes 入账登记
*/
<template>
  <div class="entry-registration">
    <el-form
        ref="form"
        :rules="rules"
        inline
        :model="form">
      <el-form-item label="客户名称" label-width="120px" prop="customerName">
        <el-input size="small" v-model="form.customerName" placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
      <el-form-item label="转账方信息" label-width="120px" prop="transferorInfo">
        <el-input size="small" v-model="form.transferorInfo" placeholder="请输入转账方信息">
        </el-input>
      </el-form-item>
      <el-form-item label="入账类型" label-width="120px" prop="entryType">
        <el-select size="small" v-model="form.entryType" placeholder="请选择入账类型">
          <el-option
              v-for="item in entryTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转账用途" label-width="120px" prop="fundsPurpose">
        <el-select size="small" v-model="form.fundsPurpose" placeholder="请选择转账用途">
          <el-option
              v-for="item in transferPurposeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到账日期" label-width="120px" prop="date">
        <el-date-picker
            clearable
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
            :picker-options="$pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button
            icon="el-icon-plus" size="small" type="primary"
            @click.stop="$router.push('/entry-registration-add')">入账登记
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        stripe
        border
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          label="入账类型">
        <template #default="{row}">
          {{ $valueToLabel(row.creatorId, entryTypeOptions) }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="转账用途">
        <template #default="{row}">
          {{ $valueToLabel(row.creatorId, $store.state.funds_purpose_options) }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="$router.push('/entry-registration-view/'+scope.row.id)">查看
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.row.id)">删除
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
  name: 'EntryRegistration',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '客户名称',
          key: 'customerName'
        },
        {
          title: '转账方信息',
          key: 'transferorInfo'
        },
        {
          title: '转入金额（元）',
          key: 'entryAmount'
        },
        {
          title: '到账日期',
          key: 'transferDate'
        },
        {
          title: '备注',
          key: 'remark'
        },
      ],
      entryTypeOptions: [
        {value: 1, label: '人才合同价入账'},
        {value: 2, label: '资质转让入账'},
        {value: 3, label: '资质代办入账'},
        {value: 4, label: '职称评审入账'},
        {value: 5, label: '三类人员入账'},
        {value: 6, label: '学历提升入账'},
      ],
      transferPurposeOptions: [
        {
          value: 1,
          label: '企业预付款'
        },
        {
          value: 2,
          label: '企业中期款'
        },
        {
          value: 3,
          label: '注册成功尾款'
        },
        {
          value: 4,
          label: '注册成功B证费用'
        },
        {
          value: 5,
          label: '一次性付款'
        },
      ],
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        customerName: '',
        transferorInfo: '',
        entryType: null,
        transferPurpose: null,
        date: [],
      },
      rules: {
        customerName: [{required: false, trigger: 'blur'}],
        transferorInfo: [{required: false, trigger: 'blur'}],
        entryType: [{required: false, trigger: 'blur'}],
        transferPurpose: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
      },
    }
  },
  created() {
    this.search()
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    @throttle(1000)
    async search(size, page) {
      let newForm = {}
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      this.loading = true
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      newForm = Object.assign(this.form, newForm)
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/entry-registration', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
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
      this.search()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.search(_pageSize)
    },
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/entry-registration-view')
    },
    @throttle(1000)
    async handleDelete(_id) {
      try {
        const res = await this.$http.delete(`/entry-registration/delete/${_id}`)
        if (res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
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
