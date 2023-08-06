/**
* Created by Lv Cheng on 2022/6/9
* Notes 数据转移
*/
<template>
  <div class="data-transfer">
    <el-form
        ref="form"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="标题" prop="title">
        <el-input size="small" v-model.trim="form.title" placeholder="请输入标题">
        </el-input>
      </el-form-item>
      <el-form-item label="转移时间" prop="date">
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
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-right" size="small" type="primary" @click.native="visible = true">转移</el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">4</b> 条记录</div>
    </div>
    <el-table
        :data="tableData"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
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
        width="50%"
        title="数据转移"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-content">
        <el-form
            label-width="80px"
            label-position="right">
          <el-form-item label="原录入人">
            <el-select style="width: 100%" size="small" v-model="form.originInputer">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 交接人">
            <el-select style="width: 100%" size="small" v-model="form.handoverPerson">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input style="width: 100%" size="small" type="textarea" :rows="3" v-model="form.remark"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
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
  name: 'DataTransfer',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '原录入人',
          key: 'address'
        },
        {
          title: '交接人',
          key: 'address'
        },
        {
          title: '备注转移',
          key: 'address'
        },
        {
          title: '转移时间',
          key: 'address'
        },
      ],
      tableData: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        originInputer: '',
        handoverPerson: '',
        remark: '',
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
      visible: false
    }
  },
  methods: {
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    handleTransfer() {
      this.$message('转移')
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
@import "../../../assets/css/split-line";
</style>
