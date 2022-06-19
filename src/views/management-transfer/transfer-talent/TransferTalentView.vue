/**
* Created by Lv Cheng on 2022/6/20
* Notes 人才转账查看
*/
<template>
  <div class="transfer-talent-view">
    <el-form label-position="right" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="订单编号">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业名称">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人才名称">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业合同价">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人才价格">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人才余额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="帐户开户行">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="帐户户名">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行卡号">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="款项用途">
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
        <el-col :span="12">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人姓名">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
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
        <el-col :span="12">
          <el-form-item label="申请状态">
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
      <el-form-item label="备注">
        <el-input disabled :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-divider content-position="left">
        企业合同价入账记录 <span style="color: #409EFF">已通过: 60000元 , 待申请: 0元</span>
      </el-divider>
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
      <el-divider content-position="left">
        人才价格转账记录 <span style="color: #409EFF">已通过: 60000元 , 待申请: 0元</span>
      </el-divider>
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
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                plain
                @click="approvalDetail(scope.$index, scope.row)">审批详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form-item label="审批详情">
        <el-card>
          <el-steps direction="vertical" :active="6" align-center>
            <el-step
                v-for="(item,index) in 5"
                style="line-height: 28px;"
                :key="index"
                :title="item+'次审核审批通过'"
                icon="el-icon-s-help">
              <el-card slot="description" shadow="hover">
                <span style="color: #409EFF" class="description-item">
                  <i class="el-icon-user-solid"></i>
                  <span>
                    审批人【】
                  </span>
                </span>
                <span style="color: #67C23A" class="description-item">
                    <i class="el-icon-info"></i>
                    <span>
                      审批意见【】
                    </span>
                  </span>
                <span style="color: #E6A23C" class="description-item">
                    <i class="el-icon-date"></i>
                      2022-06-20
                  </span>
              </el-card>
            </el-step>
          </el-steps>
        </el-card>
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
  name: 'TransferTalentView',
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
      columns2: [
        {
          title: '申请时间',
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
          title: '转账用户',
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleClick() {

    },
    approvalDetail(_index, _row) {
      console.log(_index, _row)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.transfer-talent-view {
  margin: 0 150px;
}

.description-item {
  display: inline-block;
  margin-right: 100px;
  font-size: 14px;
}

/deep/ .el-step__description {
  padding-right: 0;
}

.width-full {
  width: 100%;
}
</style>
