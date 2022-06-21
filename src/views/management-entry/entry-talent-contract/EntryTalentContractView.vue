/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才合同价入账查看
*/
<template>
  <div class="entry-talent-contract-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业录入人">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业合同价">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才姓名">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才录入人">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="人才价格">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" size="small" v-model="form.name">
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
        <el-col :span="8">
          <el-form-item label="转账方信息">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方式">
            <el-select disabled class="width-full" size="small" v-model="form.name">
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
          <el-form-item label="公司账户">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="到账日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input
                disabled
                size="small"
                v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-select disabled class="width-full" size="small" v-model="form.name">
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
      <el-divider content-position="left">历史记录</el-divider>
      <p>
        企业合同价入账记录
        <span style="color:#409EFF;display:inline-block;margin-left: 20px">
          已通过:55000 待申请:0
        </span>
      </p>
      <br>
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
            min-width="200"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
      </el-table>
      <br>
      <el-form-item label="审批意见">
        <el-input disabled :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EntryTalentContractView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '申请时间',
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
          title: '入账方信息',
          key: 'address'
        },
        {
          title: '入账日期',
          key: 'address'
        },
        {
          title: '申请状态',
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
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";
.entry-talent-contract-view {
  margin: 0 100px;

  .width-full {
    width: 100%;
  }
}
</style>
