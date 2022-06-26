/**
* Created by Lv Cheng on 2022/6/9
* Notes 证书统计
*/
<template>
  <div class="StatisticsCertificate">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="级别专业" label-width="100px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择级别专业">
          <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
            <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="初始转注" label-width="100px">
        <el-select size="small" v-model="form.newPassword" placeholder="请选择初始转注">
          <el-option
              v-for="item in options2"
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
<!--      <el-form-item>-->
<!--        <el-button-group>-->
<!--          <el-button size="small" plain type="primary" icon="el-icon-s-grid"></el-button>-->
<!--          <el-button size="small" plain type="primary" icon="el-icon-pie-chart"></el-button>-->
<!--          <el-button size="small" plain type="primary" icon="el-icon-s-data"></el-button>-->
<!--        </el-button-group>-->
<!--      </el-form-item>-->
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
  name: 'StatisticsCertificate',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '级别',
          key: 'level'
        },
        {
          title: '专业',
          key: 'major'
        },
        {
          title: '初始转注',
          key: 'initialConversion'
        },
        {
          title: '三类人员',
          key: 'classThreePersonnel'
        },
        {
          title: '数量',
          key: 'quantity'
        },
      ],
      options: [
        {
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
      options2: [
        {
          value: '选项1',
          label: '初始'
        },
        {
          value: '选项2',
          label: '转注'
        },
        {
          value: '选项3',
          label: '其他'
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
</style>
