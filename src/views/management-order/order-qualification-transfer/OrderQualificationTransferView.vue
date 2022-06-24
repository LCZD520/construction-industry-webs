/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质转让订单查看
*/
<template>
  <div class="order-qualification-transfer-view">
    <el-form label-position="right" label-width="160px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购意向客户">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="收购意向客户资质需求">
        <el-input disabled placeholder="备注......" :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转让意向客户">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收购金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资质收购录入人">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="转让意向客户资质">
        <el-input disabled placeholder="备注......" :rows="3" type="textarea">
        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成交金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资质转让录入人">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
      </el-row>
      <el-row>
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item label="合同余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="已转金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="资质转让入账明细">
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
      <el-form-item label="资质收购转账明细">
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
      <el-form-item label="工商费用转账">
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
      <el-row>
        <el-col :span="12">
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
  name: 'OrderQualificationTransferView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
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
          title: '申请状态',
          key: 'address'
        },
      ],
      tableData:[]
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
.order-qualification-transfer-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
