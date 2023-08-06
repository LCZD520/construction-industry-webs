/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才订单
*/
<template>
  <div class="order-talent">
    <el-form
        ref="form"
        inline
        :rules="rules"
        label-width="90px"
        :model="form">
      <el-form-item label="订单编号" prop="orderno">
        <el-input clearable size="small" v-model.trim="form.orderno" placeholder="请输入订单编号">
        </el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input clearable size="small" v-model.trim="form.enterpriseName" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="人才名称" prop="fullName">
        <el-input clearable size="small" v-model.trim="form.fullName" placeholder="请输入人才名称">
        </el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select clearable size="small" v-model="form.status" placeholder="请选择订单状态">
          <el-option
              v-for="item in $store.state.talent_order_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单日期" prop="date">
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
            :picker-options="$pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="企业录入人" prop="enterpriseCreatorId">
        <el-select clearable size="small" v-model="form.enterpriseCreatorId" placeholder="请选择企业录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
          min-width="160"
          prop="orderno"
          label="订单编号">
      </el-table-column>
      <el-table-column
          min-width="150"
          prop="enterpriseName"
          label="企业名称">
      </el-table-column>
      <el-table-column
          min-width="200"
          label="人才">
        <template #default="{row}">
          <el-tag style="margin: 3px" type="dark" size="mini" v-for="item in row.selectedTalents" :key="item.id">
            {{ item.fullName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="订单时间">
      </el-table-column>
      <el-table-column
          min-width="100"
          label="订单状态">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.orderStatus, $store.state.talent_order_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="企业录入人">
        <template #default="{row}">
          <span> {{
              $valueToLabel(row.enterpriseCreatorId | row.qualificationAgencyCreatorId, $store.state.user_options)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="订单录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          label="合同余额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="computeBalance(row)"/>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          label="合同总价">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="totalEnterpriseOffer(row)"/>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          label="已转金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="totalEnterpriseOffer(row) - computeBalance(row)"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row.id)">查看
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleViewNotice(row.id)">公告
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
    <el-dialog
        :close-on-click-modal=false
        width="80%"
        title="公告"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-content">
        <el-table
            :data="list2"
            stripe
            border
            height="200"
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="200"
              label="企业名称">
          </el-table-column>
          <el-table-column
              min-width="160"
              label="人才姓名	">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="级别-专业-初/转">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="企业合同价">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="合同余额">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="人才价格">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="人才公告时间">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="企业合同到期时间">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="是否确认">
          </el-table-column>
        </el-table>
        <br>
        <el-table
            :data="list3"
            stripe
            border
            height="200"
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="200"
              label="人才姓名">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="级别-专业-初/转">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="人才公告日期">
          </el-table-column>
          <el-table-column
              min-width="200"
              label="企业合同到期日期">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" @click="beforeClose">取 消</el-button>
        <el-button
            size="small"
            type="primary">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderTalent',
  components: {},
  data() {
    return {
      loading: false,
      visible: false,
      list: [],
      list2: [],
      list3: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        orderno: '',
        enterpriseName: '',
        fullName: '',
        status: null,
        date: [],
        enterpriseCreatorId: null,
      },
      rules: {
        orderno: [{required: false, trigger: 'blur'}],
        enterpriseName: [{required: false, trigger: 'blur'}],
        fullName: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        enterpriseCreatorId: [{required: false, trigger: 'blur'}],
      },
    }
  },
  computed: {
    computeBalance() {
      return (row) => {
        return (row.selectedTalents &&
            row.selectedTalents.map(item =>
                item.contractBalance)
                .reduce(item => item += item))
      }
    },
    totalEnterpriseOffer() {
      return (row) => {
        return (row.selectedTalents &&
            row.selectedTalents.map(item =>
                item.enterpriseOffer)
                .reduce(item => item += item))
      }
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
      newForm = Object.assign(newForm, this.form)
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/talent-order/list', newForm)
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
    async handleView(id) {
      this.$router.push('/order-talent-view/' + id)
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleViewNotice() {
      this.visible = true
    },
    beforeClose() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
