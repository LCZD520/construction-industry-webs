/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质转让查看
*/
<template>
  <div class="qualification-transfer-view">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="收购意向客户">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地区">
            <el-cascader
                disabled
                class="width-full"
                size="small"
                placeholder="请选择地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select class="width-full" size="small" disabled v-model="value">
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
        <el-col :span="24">
          <el-form-item label="资质需求">
            <el-cascader
                disabled
                class="width-full"
                size="small"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
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
            <el-input disabled placeholder="备注......" :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转让订单" name="first">
        <el-button type="primary" size="small">
          申请转账
        </el-button>
        <br><br>
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
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">编辑订单
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">详情
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
import ImagesUpload from "./qualification-transfer-view/ImagesUpload";

export default {
  name: 'QualificationTransferView',
  components: {ImagesUpload},
  data() {
    return {
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      isShowDetail: false,
      form: {
        name: ''
      },
      columns: [
        {
          title: '转让意向客户资质',
          key: 'address'
        },
        {
          title: '成交金额',
          key: 'address'
        },
        {
          title: '收购金额',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '转让意向客户',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
      ],
      tableData: [
        {}
      ],
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

    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-transfer-view {
  margin: 0 200px;
}

.width-full {
  width: 100%;
}
</style>
