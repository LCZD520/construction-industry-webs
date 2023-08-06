/**
* Created by Lv Cheng on 2022/7/11
* Notes 企业入账信息-选择弹窗
*/
<template>
  <div class="enterprise-entry-info-dialog">
    <el-dialog
        :close-on-click-modal="false"
        width="60%" title="企业入账信息" :visible.sync="visible" :before-close="()=>$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form label-position="right" size="small" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="客户名称">
                    <el-input v-model="customerName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label=" ">
                    <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button size="small" icon="el-icon-refresh">重置</el-button>
                  </el-form-item>
                </el-col>
                <el-table
                    ref="table"
                    :data="[]"
                    stripe
                    border
                    :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    style="width: 100%">
                  <el-table-column
                      min-width="180"
                      prop="entryAmount"
                      label="客户名称">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="fundsPurpose"
                      label="转账用途">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="transferorInfo"
                      label="转入金额">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="applicationStatus"
                      label="入账类别">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="remark"
                      label="转账方信息">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      prop="gmtCreate"
                      label="到账日期">
                  </el-table-column>
                </el-table>
              </el-row>
            </el-form>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">取消</el-button>
        <el-button type="primary" size="small" v-throttle="$emit('closeDialog')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseEntryInfoDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      customerName: '',
      entry: 1,
      selection: [],
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    inputChange(_index) {
      this.$set(this.selection, _index, this.selection[_index])
    },
    isCanSelect(_row) {
      return _row.confirmed;
    },
    selectionChange(selection) {
      this.selection = selection
    },
    detail(row) {
      console.log(row)
    }
  },
}
</script>

<style scoped lang="less">

</style>
