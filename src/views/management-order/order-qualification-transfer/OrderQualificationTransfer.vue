/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质转让订单
*/
<template>
  <div class="order-qualification-transfer">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="订单编号" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入订单编号">
        </el-input>
      </el-form-item>
      <el-form-item label="收购意向客户" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入收购意向客户">
        </el-input>
      </el-form-item>
      <el-form-item label="转让意向客户" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入转让意向客户">
        </el-input>
      </el-form-item>

      <el-form-item label="订单日期" label-width="120px">
        <el-date-picker
            v-model="form.oldPassword"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="资质转让录入人" label-width="120px">
        <el-select size="small" v-model="form.newPassword" placeholder="请选择资质转让录入人">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资质收购录入人" label-width="120px">
        <el-select size="small" v-model="form.newPassword" placeholder="请选择资质收购录入人">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-select size="small" v-model="form.newPassword" placeholder="请选择状态">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="tableData"
        stripe
        border
        highlight-current-row
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%"
        :row-class-name="tableRowClassName">
      <el-table-column
          min-width="180"
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>
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
</template>

<script>
export default {
  name: 'OrderQualificationTransfer',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '订单编号',
          key: 'address'
        },
        {
          title: '收购意向客户',
          key: 'address'
        },
        {
          title: '转让意向资质类别及等级',
          key: 'address'
        },
        {
          title: '转让意向客户',
          key: 'address'
        },
        {
          title: '收购金额',
          key: 'address'
        },
        {
          title: '成交金额',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '资质转让录入人',
          key: 'address'
        },
        {
          title: '资质收购录入人',
          key: 'address'
        },
        {
          title: '合同余额',
          key: 'address'
        },
        {
          title: '已转金额',
          key: 'address'
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-04',
          username: '王小虎',
          address: '上海市普陀区'
        }, {
          date: '2016-05-01',
          username: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-03',
          username: '王小虎',
          address: '上海市普陀区'
        }],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }
  },
  mounted() {
    console.log(this.$route)
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
    /**
     * 表格翻页
     */
    handleCurrentChange() {

    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      console.log(_pageSize)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
