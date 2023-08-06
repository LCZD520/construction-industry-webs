<template>
  <div class="home">
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统公告" name="one">
        <div v-if="activeName === 'one'">
          <SystemNotice/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人才订单公示确认" name="two">
        <div v-if="activeName === 'two'">
          <TalentOrderPublicity/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资质转让订单确认" name="three">
        <div v-if="activeName === 'three'">
          <el-table
              :data="tableData"
              stripe
              border
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
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
                    icon="el-icon-check"
                    type="primary"
                    @click="handleConfirm(scope.$index, scope.row)">确认
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同即将到期" name="four">
        <div v-if="activeName === 'four'">
          <el-row>
            <el-col :span="8">
              <el-select clearable placeholder="请选择合同到期时间" v-model="value1">
                <el-option :value="1" label="一个月内到期"/>
                <el-option :value="2" label="两个月内到期"/>
                <el-option :value="3" label="三个月内到期"/>
              </el-select>
            </el-col>
          </el-row>
          <br>
          <el-table
              :data="tableData"
              stripe
              border
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
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
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
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
              :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
              :cell-style="{textAlign:'center'}"
              style="width: 100%">
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
  </div>
</template>

<script>

import TalentOrderPublicity from "./talent-order/TalentOrderPublicity";
import SystemNotice from "./system-notice/SystemNotice";

export default {
  name: 'Home',
  components: {SystemNotice, TalentOrderPublicity},
  data() {
    return {
      activeName: 'one',
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      value1: null,
      columns3: [
        {
          title: '订单编号',
          key: 'name1',
        },
        {
          title: '收购意向客户',
          key: 'address2'
        },
        {
          title: '资质需求',
          key: 'address3'
        },
        {
          title: '收购金额',
          key: 'address4'
        },
        {
          title: '成交金额',
          key: 'address5'
        },
        {
          title: '转让意向客户',
          key: 'address6'
        },
        {
          title: '存在资质',
          key: 'address7'
        },
        {
          title: '订单时间',
          key: 'address8'
        },
        {
          title: '资质收购录入人',
          key: 'address9'
        },
        {
          title: '资质转让录入人',
          key: 'address10'
        },
      ],
      columns4: [
        {
          title: '到期时间',
          key: 'name',
        },
        {
          title: '人才名称',
          key: 'address2'
        },
        {
          title: '级别-专业-初/转',
          key: 'address3'
        },
        {
          title: '三类人员',
          key: 'address4'
        },
        {
          title: '人才录入人',
          key: 'address5'
        },
        {
          title: '挂靠企业名称',
          key: 'address6'
        },
      ],
      columns5: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '级别-专业-初转',
          key: 'address1'
        },
        {
          title: '人才录入人',
          key: 'address2'
        },
        {
          title: '发证时间',
          key: 'address3'
        },
        {
          title: '继续教育时间',
          key: 'address4'
        },
      ],
      columns6: [
        {
          title: '人才名称',
          key: 'name',
        },
        {
          title: '三类人员',
          key: 'address2'
        },
        {
          title: '发证时间',
          key: 'address3'
        },
        {
          title: '继续教育时间',
          key: 'address4'
        },
        {
          title: '录入人',
          key: 'address5'
        },
      ],
      tableData: [],
    }
  },
  mounted() {
  },
  methods: {
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/system-notice-view')
    },
    handleConfirm(_index, _row) {
      console.log(_index, _row)
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
}
</script>

<style scoped lang="less">
@import "../../assets/css/common-table-pagination";
@import "../../assets/css/common-el-table-scrollbar";
</style>
