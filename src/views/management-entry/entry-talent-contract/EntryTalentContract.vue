/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才合同价入账
*/
<template>
  <div class="entry-talent-contract">
    <el-form
        size="small"
        ref="form"
        inline
        label-width="120px"
        :rules="rules"
        :model="form">
      <el-form-item label="人才姓名" prop="fullName">
        <el-input clearable v-model.trim="form.fullName" placeholder="请输入人才姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input clearable v-model.trim="form.enterpriseName" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="申请状态" prop="status">
        <el-select clearable v-model="form.status" placeholder="请选择申请状态">
          <el-option
              v-for="item in $store.state.talent_entry_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人" prop="creatorId">
        <el-select clearable v-model="form.creatorId" placeholder="请选择创建人姓名">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转账方信息" prop="transferorInfo">
        <el-input v-model.trim="form.transferorInfo" placeholder="请输入转账方信息">
        </el-input>
      </el-form-item>
      <el-form-item label="到账日期" prop="date">
        <el-date-picker
            v-model="form.date"
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
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          label="订单编号">
        <template #default="{row}">
          {{ row.talentOrder.orderno }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="企业名称">
        <template #default="{row}">
          {{ row.talentOrder.enterpriseName }}
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
        <template #default="{row}">
          <el-tag effect="dark" :type="row.status === 1 ? 'info'
            : row.status === 2 ? 'success' : 'danger' "
                  size="mini">
            {{ $valueToLabel(row.status, $store.state.talent_entry_status_options) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          label="转账方信息">
        <template #default="{row}">
          {{ row.talentEntry && row.talentEntry.transferorInfo }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="申请人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
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
        <template #default="{row}">
          {{ row.talentEntry && row.talentEntry.transferDate }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="人才录入人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="企业录入人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="{row}">
          <el-button
              v-if="row.status === 1 && $store.state.currentUser.listRoleIds.includes(2)"
              size="mini"
              type="primary"
              icon="el-icon-check"
              @click.stop="handleExamine(row)">审核
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row)">查看
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
  name: 'EntryTalentContract',
  components: {},
  data() {
    const str = sessionStorage.getItem(this.$options.name)
    const cache = str ? JSON.parse(str) : {}
    return Object.assign({
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        fullName: '',
        enterpriseName: '',
        transferorInfo: '',
        status: null,
        creatorId: null,
        date: [],
      },
      rules: {
        fullName: [
          {required: false, trigger: 'blur'}
        ],
        enterpriseName: [
          {required: false, trigger: 'blur'}
        ],
        transferorInfo: [
          {required: false, trigger: 'blur'}
        ],
        status: [
          {required: false, trigger: 'blur'}
        ],
        date: [
          {required: false, trigger: 'blur'}
        ],
      },
    }, cache)
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
    @throttle()
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
        const res = await this.$http.post('/talent-entry/list', newForm)
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
    /**
     * 审核
     * @param _row
     */
    handleExamine(_row) {
      this.$router.push('/entry-talent-contract-approval/' + _row.id)
    },
    /**
     * 查看
     * @param _row
     */
    handleView(_row) {
      this.$router.push('/entry-talent-contract-view/' + _row.id)
    },
  },
  destroyed() {
    sessionStorage.setItem(this.$options.name, JSON.stringify(this.$data))
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
