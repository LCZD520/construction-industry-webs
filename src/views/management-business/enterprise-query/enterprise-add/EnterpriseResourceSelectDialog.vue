/**
* Created by Lv Cheng on 2022/6/23
* Notes 从企业资源选择/从已录企业选择
*/
<template>
  <div class="enterprise-resource-select-dialog">
    <el-dialog
        :close-on-click-modal=false
        width="70%"
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
            <el-form-item label="企业">
              <el-input size="small" v-model="form.name" placeholder="请输入企业">
              </el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-cascader
                  size="small"
                  clearable
                  ref="cascader"
                  @expand-change="cascaderClick"
                  @visible-change="cascaderClick"
                  :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                  placeholder="请选择地区"
                  :options="this.$provinceAndCityData"
                  @change="handleChange"
                  v-model="form.area">
              </el-cascader>
            </el-form-item>
            <el-form-item label=" ">
              <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
              <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
            </el-form-item>
          </el-form>
          <el-table
              height="260"
              ref="table"
              size="mini"
              :data="enterpriseList"
              highlight-current-row
              border
              @row-click="handleRowClick"
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
            <el-table-column width="50" label="#" style="text-align: center">
              <template #default="{$index,row}">
                <el-radio @click.native.prevent="handleRadioClick(row)" v-model="currentIndex" :label="$index">&nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column
                prop="enterpriseName"
                label="企业名称">
            </el-table-column>
            <el-table-column
                label="地区">
              <template slot-scope="scope">
                <span> {{ $CodeToText[scope.row.area] }}</span>
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
  name: 'EnterpriseResourceSelectDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    enterpriseList: {
      type: Array,
      default: () => []
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    pageInfo: {
      type: Object
    }
  },
  data() {
    return {
      currentIndex: null,
      currentSelectId: null,
      form: {
        name: '',
        area: ''
      },
      options: [],
    }
  },
  methods: {
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
      if (this.currentIndex === this.enterpriseList.indexOf(_row)) {
        this.cancelSelect()
        return
      }
      this.currentIndex = this.enterpriseList.indexOf(_row)
      this.currentSelectId = _row.id
    },
    /**
     * 确认
     */
    handleConfirm() {
      if (this.currentSelectId) {

        this.$emit('confirm', this.currentIndex)
        this.$emit('closeDialog')
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
    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
              }
            })
      }, 1)
    },
    handleChange(_val) {
      console.log(_val)
      console.log(this.form)
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.$emit('handleCurrentChange')
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.$emit('handleSizeChange', _pageSize)
    }
  },
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-table-pagination";
@import "../../../../assets/css/common-el-input-inner-width";

/deep/ .el-radio__label {
  padding: 0 !important;
}
</style>
