/**
* Created by Lv Cheng on 2022/6/24
* Notes 企业合作记录弹窗
*/
<template>
  <div class="enterprise-cooperation-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="80%"
        :title="dialogTitle"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <el-form
              ref="formData"
              inline
              label-width="120px"
              :model="form">
            <el-form-item label="客户名称">
              <el-input clearable size="small" v-model.trim="form.customerName" placeholder="请输入企业名称">
              </el-input>
            </el-form-item>
            <el-form-item label="入账类别">
              <el-select clearable size="small" v-model="form.entryType" placeholder="请选择入账类别">
                <el-option
                    v-for="item in options"
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
              height="260"
              ref="table"
              size="mini"
              :data="list"
              highlight-current-row
              border
              @row-click="handleRowClick"
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
            <el-table-column width="50" label="#" style="text-align: center">
              <template #default="{$index,row}">
                <el-radio @click.native.prevent="handleRadioClick(row)" v-model="currentIndex" :label="$index">
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column
                min-width="180"
                label="入账类型">
              <template #default="{row}">
                {{ $valueToLabel(row.creatorId, options) }}
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
          </el-table>
          <div class="pagination">
            <div class="pagination-right">
              <el-pagination
                  ref="pagination"
                  :page-size="pageInfo.pageSize"
                  :current-page.sync="pageInfo.currentPage"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  background
                  layout="total,prev, pager, next, jumper"
                  :total="pageInfo.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            @click="handleConfirm">确 认
        </el-button>
        <el-button size="small" @click="beforeClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseCooperationDialog',
  components: {},
  data() {
    return {
      currentIndex: null,
      currentSelectId: null,
      form: {
        customerName: '',
        entryType: null
      },
      columns: [
        {
          title: '客户名称',
          key: 'customerName'
        },
        {
          title: '录入人名称',
          key: 'address'
        },
        {
          title: '入账类型',
          key: 'address2'
        },
        {
          title: '录入时间',
          key: 'address3'
        },
      ],
      options: [
        {value: 1, label: '人才合同价入账'},
        {value: 2, label: '资质转让入账'},
        {value: 3, label: '资质代办入账'},
        {value: 4, label: '职称评审入账'},
        {value: 5, label: '三类人员入账'},
        {value: 6, label: '学历提升入账'},
      ],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      list: [],
      loading: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  created() {
    this.search()
  },
  methods: {
    reset() {
      this.pageInfo.currentPage = 1
      this.form.entryType = null
      this.form.customerName = ''
      this.search()
    },
    @throttle(1000)
    async search(size, page) {
      let newForm = Object.assign({}, this.form)
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      this.loading = true
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
    /**
     * 取消选中
     */
    cancelSelect() {
      this.currentIndex = null
      this.$refs.table.setCurrentRow()
      this.currentSelectId = null
    },

    /**
     * 单选按钮点击
     * @param _row
     */
    handleRadioClick(_row) {
      this.currentSelectId ?
          this.currentSelectId = null : this.currentSelectId = _row.id
    },
    /**
     * 表格行点击
     * @param _row
     */
    handleRowClick(_row) {
      console.log(_row, "row")
      if (this.currentIndex === this.list.indexOf(_row)) {
        this.cancelSelect()
        return
      }
      this.currentIndex = this.list.indexOf(_row)
      this.currentSelectId = _row.id
    },
    /**
     * 确认
     */
    handleConfirm() {
      if (this.currentSelectId) {
        this.$emit('confirm', this.list[this.currentIndex])
        this.cancelSelect()
        return
      }
      this.$message.warning('至少选择一条记录')
    },
    /**
     * 关闭弹窗
     */
    beforeClose() {
      this.cancelSelect()
      this.$emit('closeDialog')
    },
  },
}
</script>

<style scoped lang="less">
@import "../../../../../assets/css/common-table-pagination";
@import "../../../../../assets/css/common-el-table-scrollbar";
@import "../../../../../assets/css/common-el-input-inner-width";

/deep/ .el-radio__label {
  padding: 0 !important;
}
</style>
