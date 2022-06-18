<template>
  <div class="home">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统公告" name="one">
        <div v-if="activeName === 'one'">
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
                prop="date"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="name"
                label="发布时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人才订单公示确认" name="two">
        <div v-if="activeName === 'two'">
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
                min-width="200px"
                v-for="item in columns2"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资质转让订单确认" name="three">
        <div v-if="activeName === 'three'">
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
                min-width="200px"
                v-for="item in columns3"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同即将到期" name="four">
        <div v-if="activeName === 'four'">
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
                v-for="item in columns4"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="证书继续教育提醒" name="five">
        <div v-if="activeName === 'five'">
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
                v-for="item in columns5"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三类人员继续教育提醒" name="six">
        <div v-if="activeName === 'six'">
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
                v-for="item in columns6"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
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
  name: 'Home',
  components: {},
  data() {
    let homeTempStr = localStorage.getItem("homeTemp")
    let homeTempObj = homeTempStr ? JSON.parse(homeTempStr) : {}
    return Object.assign({
      activeName: 'one',
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      columns1: [
        {
          title: '标题',
          key: 'name',
        },
        {
          title: '发布时间',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '订单编号',
          key: 'name',
        },
        {
          title: '企业名称',
          key: 'address'
        },
        {
          title: '人才名称',
          key: 'address'
        },
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '人才价格',
          key: 'address'
        },
        {
          title: '订单需求',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '企业录入人',
          key: 'address'
        },
      ],
      columns3: [
        {
          title: '订单编号',
          key: 'name',
        },
        {
          title: '收购意向客户',
          key: 'address'
        },
        {
          title: '资质需求',
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
          title: '转让意向客户',
          key: 'address'
        },
        {
          title: '存在资质',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '资质收购录入人',
          key: 'address'
        },
        {
          title: '资质转让录入人',
          key: 'address'
        },
      ],
      columns4: [
        {
          title: '到期时间',
          key: 'name',
        },
        {
          title: '人才名称',
          key: 'address'
        },
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '挂靠企业名称',
          key: 'address'
        },
      ],
      columns5: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '级别-专业-初转',
          key: 'address'
        },
        {
          title: '人才录入人',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间',
          key: 'address'
        },
      ],
      columns6: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间',
          key: 'address'
        },
        {
          title: '录入人',
          key: 'address'
        },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区'
        }],
    }, homeTempObj)
  },
  mounted() {
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
    },
    handleClick() {

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
  },
  destroyed() {
    localStorage.setItem("homeTemp", JSON.stringify(this.$data))
    console.log(this.$data)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/common-table-pagination";
@import "../../assets/css/common-el-table-scrollbar";
</style>
