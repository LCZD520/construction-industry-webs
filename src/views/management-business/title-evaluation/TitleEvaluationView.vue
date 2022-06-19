/**
* Created by Lv Cheng on 2022/6/19
* Notes 职称评审查看
*/
<template>
  <div class="title-evaluation-view">
    <el-form v-show="isShowDetail" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-radio-group v-model="form.name">
              <el-radio :label="1">企业客户</el-radio>
              <el-radio :label="2">个人客户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input placeholder="请输入客户名称" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input placeholder="请输入联系电话" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评审人员信息">
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
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                  style="padding: 5px"
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">人员图片
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入时间">
            <el-date-picker
                class="width-full"
                size="small"
                v-model="form.name"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select class="width-full" size="small" v-model="value">
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
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="10">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
        <el-button icon="el-icon-edit" type="primary" size="small">
          编辑备注
        </el-button>
      </el-col>
      <el-col :span="10">
        <el-switch
            v-model="isShowDetail"
            inactive-text="显示业务信息">
        </el-switch>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px">
          <el-form-item label="备注">
            <el-input disabled placeholder="备注......" :rows="3" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="评审订单" name="first">
        <el-button type="primary" size="small">
          下单
        </el-button>
        <br><br>
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
              v-for="item in columns2"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">证件去向流水
              </el-button>
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        <ImagesUpload/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImagesUpload from "./title-evaluation-view/ImagesUpload";
export default {
  name: 'TitleEvaluationView',
  components: {ImagesUpload},
  data() {
    return {
      isShowDetail: false,
      activeName:'first',
      form: {
        name: ''
      },
      columns: [
        {
          title: '姓名',
          key: 'address'
        },
        {
          title: '招标出场',
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
          title: '代办金额',
          key: 'address'
        },
        {
          title: '评审费用',
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
          title: '证书性质',
          key: 'address'
        },
        {
          title: '鉴定方式',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '订单编号',
          key: 'address'
        },
        {
          title: '人员数',
          key: 'address'
        },
        {
          title: '代办总金额',
          key: 'address'
        },
        {
          title: '订单状态',
          key: 'address'
        },
        {
          title: '订单状态',
          key: 'address'
        },
        {
          title: '订单时间',
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

.title-evaluation-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
