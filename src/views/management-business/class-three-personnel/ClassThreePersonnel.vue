/**
* Created by Lv Cheng on 2022/6/9
* Notes 三类人员
*/
<template>
  <div class="class-three-personnel">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="100px"
        :model="form">
      <el-form-item label="客户名称" prop="customerName">
        <el-input clearable size="small" v-model.trim="form.customerName" placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="customerType">
        <el-select clearable size="small" v-model="form.customerType" placeholder="请选择客户类型">
          <el-option
              v-for="item in $store.state.title_customer_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select clearable size="small" v-model="form.status" placeholder="请选择状态">
          <el-option
              v-for="item in $store.state.enterprise_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入人" prop="creatorId">
        <el-select clearable size="small" v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入日期" prop="date">
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
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/class-three-personnel-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        v-loading="loading"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="cellStyle"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="customerName"
          label="客户名称">
      </el-table-column>
      <el-table-column
          min-width="150"
          label="客户类型">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.customerType, $store.state.title_customer_type_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="150"
          label="状态">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.status, $store.state.enterprise_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="150"
          label="人员数">
        <template slot-scope="{row}">
          {{
            row.countAssessors
          }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="代办总金额">
        <template slot-scope="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.totalAgencyAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人名称">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column v-if="deleted" fixed="right" label="操作" width="90">
        <template #default="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="recovery(scope.row.id)">恢复
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-else fixed="right" label="操作" width="400">
        <template #default="{row}">
          <el-button
              v-if="row.status > 1"
              disabled
              size="mini"
              type="primary"
              @click.stop="handleComplete(row)">完成
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row,'first')">订单
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row,'second')">图片
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row)">查看
          </el-button>
          <el-button
              disabled
              v-if="row.status === 1"
              size="mini"
              type="primary"
              @click.stop="handleEdit(row)">编辑
          </el-button>
          <el-button
              v-if="row.status === 1"
              size="mini"
              type="danger"
              @click.stop="handleDelete(row.id)">删除
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
import {confirmDelete} from "../../../util/decorator";

export default {
  name: 'ClassThreePersonnel',
  components: {},
  props: {
    deleted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        customerName: '',
        customerType: null,
        status: null,
        creatorId: null,
        date: [],
        deleted: this.deleted,
      },
      rules: {
        customerName: [{required: false, trigger: 'blur'}],
        customerType: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
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
        const res = await this.$http.post('/class-three-personnel/list', newForm)
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

    cellStyle({columnIndex}) {
      let columns = [4]
      if (columns.indexOf(columnIndex) > -1) {
        return 'text-align:right'
      }
      return 'text-align:center'
    },
    handleView(_row, _activeTab) {
      this.$router.push({
        path: '/class-three-personnel-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    handleEdit(_row) {
      console.log(_row)
      this.$router.push(`/class-three-personnel-edit/${_row.id}`)
    },
    async recovery(id) {
      try {
        const res = await this.$http.delete(`/class-three-personnel/recovery/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    @confirmDelete()
    async handleDelete(id) {
      try {
        const res = await this.$http.delete(`/class-three-personnel/delete/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    handleComplete(_row) {
      console.log(_row)
      this.$message.success('完成')
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
