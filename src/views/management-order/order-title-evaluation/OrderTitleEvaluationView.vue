/**
* Created by Lv Cheng on 2022/6/19
* Notes 职称评审订单查看
*/
<template>
  <div class="order-title-evaluation-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人员数">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办费用">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评审费用">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单时间">
            <el-date-picker
                disabled
                class="width-full"
                size="small"
                v-model="form.name"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select disabled class="width-full" size="small" v-model="value">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称评审录入人">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入账申请金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
          size="mini"
          :data="tableData"
          stripe
          border
          highlight-current-row
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            min-width="100"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :fixed="item.fixed"
            :label="item.title">
        </el-table-column>
      </el-table>
      <el-divider content-position="left">职称评审入账明细</el-divider>
      <el-table
          size="mini"
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
            v-for="item in columns2"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <el-divider content-position="left">职称评审转账明细</el-divider>
      <el-table
          size="mini"
          :data="tableData"
          stripe
          border
          highlight-current-row
          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          :cell-style="{textAlign:'center'}"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                plain
                @click="handleEdit(scope.$index, scope.row)">查看图片
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            min-width="180"
            v-for="item in columns3"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="8">
          <el-form-item label=" ">
            <el-button icon="el-icon-back" @click="$router.back()" size="small">
              返回
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderTitleEvaluationView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '姓名',
          key: 'address'
        },
        {
          title: '性别',
          key: 'address'
        },
        {
          title: '身份证',
          key: 'address'
        },
        {
          title: '学历',
          key: 'address'
        },
        {
          title: '毕业专业',
          key: 'address'
        },
        {
          title: '评审专业',
          key: 'address'
        },
        {
          title: '评审职称',
          key: 'address'
        },
        {
          title: '证书性质',
          key: 'address'
        },
        {
          title: '鉴定方式',
          key: 'address'
        },
        {
          title: '联系方式',
          key: 'address'
        },
        {
          title: '代办金额',
          key: 'address',
          fixed: 'right'
        },
        {
          title: '评审费用',
          key: 'address',
          fixed: 'right'
        },
        {
          title: '人员状态',
          key: 'address',
          fixed: 'right'
        },
      ],
      columns2: [
        {
          title: '申请入账时间',
          key: 'address'
        },
        {
          title: '申请人',
          key: 'address'
        },
        {
          title: '申请入账金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '申请备注',
          key: 'address'
        },
        {
          title: '申请状态',
          key: 'address'
        },
      ],
      columns3: [
        {
          title: '申请转账时间',
          key: 'address'
        },
        {
          title: '申请人',
          key: 'address'
        },
        {
          title: '申请转账金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '申请备注',
          key: 'address'
        },
        {
          title: '申请状态',
          key: 'address'
        },
      ],
      tableData: []
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
    handleClick() {

    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.order-title-evaluation-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
