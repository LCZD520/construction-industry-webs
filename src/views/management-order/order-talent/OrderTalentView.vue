/**
* Created by Lv Cheng on 2022/6/19
* Notes 人才订单查看
*/
<template>
  <div class="order-talent-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="企业名称">
            <el-input disabled placeholder="请输入客户名称" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单时间">
            <el-date-picker
                disabled
                class="width-full"
                size="small"
                v-model="form.name"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态">
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
          <el-form-item label="企业录入人">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同总价">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已转金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="企业需求">
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
              v-for="item in columns"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="已选人才">
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
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input disabled placeholder="备注......" :rows="3" type="textarea">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderTalentView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '级别专业-初/转',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '招标出场',
          key: 'address'
        },
        {
          title: '需求人数',
          key: 'address'
        },
        {
          title: '企业出价',
          key: 'address'
        },
        {
          title: '市场开发费',
          key: 'address'
        },
        {
          title: '职称',
          key: 'address'
        },
        {
          title: '学历',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '人才姓名',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '级别专业-初/转',
          key: 'address'
        },
        {
          title: '企业合同总价',
          key: 'address'
        },
        {
          title: '合同余额',
          key: 'address'
        },
        {
          title: '人才价格',
          key: 'address'
        },
        {
          title: '人才公告时间',
          key: 'address'
        },
        {
          title: '企业合同到期时间',
          key: 'address'
        },
      ],
      tableData: [{}]
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

.order-talent-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
