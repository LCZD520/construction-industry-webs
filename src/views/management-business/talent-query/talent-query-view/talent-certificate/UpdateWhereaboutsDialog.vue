/**
* Created by Lv Cheng on 2022/6/26
* Notes
*/
<template>
  <el-dialog
      :close-on-click-modal=false
      width="80%"
      title="更新证件去向"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <div class="dialog-content">
      <el-form
          label-position="left"
          label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="required" label="证件新去向">
              <el-select class="width-full" size="small" v-model="form.name">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
            height="260"
            ref="table"
            size="mini"
            :data="tableData"
            @row-click="handleRowClick"
            @selection-change="selectionChange"
            highlight-current-row
            border
            :row-class-name="tableRowClassName"
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              v-for="item in columns"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
        </el-table>
        <br>
        <el-form-item label="去向备注">
          <el-input size="small" type="textarea" :rows="3" v-model="form.remark"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
      <el-button
          size="small"
          type="primary" @click="handleSubmit">提 交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateWhereaboutsDialog',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      tableData:[]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tableRowClassName({row}) {
      return row.className;
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
    },
    handleSubmit() {

      this.$emit('closeDialog')
    }
  },
  watch: {
    selectionList(newVal, oldVal) {
      newVal.forEach(k => {
        k.className = 'highlight'
      })
      if (newVal.length === 0) {
        oldVal.forEach(k => {
          k.className = 'unChecked'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
