/**
* Created by Lv Cheng on 2023/1/27
* Notes 职称评审/三类人员/学历提升 入账弹窗
*/
<template>
  <div class="entry-add-dialog">
    <el-dialog
        :close-on-click-modal="false"
        style="margin-top: 3vh"
        width="80%"
        title="职称评审入账"
        :visible.sync="innerVisible"
        append-to-body>
      <el-form
          size="small"
          label-position="right"
          label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="证书专业" prop="initialConversion">
              <el-input
                  v-model="sort"
                  clearable
                  class="width-full"
                  placeholder="请输入证书专业">
                <el-option
                    v-for="item in this.$store.state.initial_conversion_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-form-item label=" ">
              <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
              <el-button size="small" icon="el-icon-refresh">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-radio-group size="small" v-model="type">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="selected">已选择</el-radio-button>
          <el-radio-button label="unselected">未选择</el-radio-button>
        </el-radio-group>
        <br><br>
        <el-table
            ref="table"
            @row-click="handleRowClick"
            :data="selectedAssessorList"
            stripe
            height="300"
            :row-key="rowKey"
            border
            @selection-change="selectionChange"
            :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            style="width: 100%">
          <el-table-column
              :reserve-selection="true"
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              min-width="180"
              v-for="item in columns2"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
        </el-table>
        <div style="text-align: right;margin-top: 10px">
          <div class="pagination-right">
            <el-pagination
                ref="pagination"
                :page-sizes="[10]"
                :page-size="pageInfo.pageSize"
                :current-page.sync="pageInfo.currentPage"
                @current-change="handleCurrentChange"
                background
                layout="total, prev, pager, next,sizes, jumper"
                :total="pageInfo.total">
            </el-pagination>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeInnerDialog">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EntryAddDialog',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">

</style>
