/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质代办查看
*/
<template>
  <div class="qualification-agency-view">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办公司">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="办理地区">
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
          <el-form-item label="代办金额">
            <el-input size="small" disabled v-model="value">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式">
            <el-input size="small" disabled v-model="value">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代办资质">
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
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="人才订单" name="first">
        <div v-if="activeName === 'first'">
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
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        <ImagesUpload/>
      </el-tab-pane>
      <el-tab-pane label="代办入账" name="third">
        <div v-if="activeName === 'third'">
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
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="申请转账" name="fourth">
        <div v-if="activeName === 'fourth'">
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
                v-for="item in columns3"
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
                    @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handleEdit(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImagesUpload from "./qualification-agency-view/ImagesUpload";

export default {
  name: 'QualificationAgencyView',
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
          title: '订单编号',
          key: 'address'
        },
        {
          title: '企业名称',
          key: 'address'
        },
        {
          title: '人才选择',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '订单状态',
          key: 'address'
        },
        {
          title: '录入人',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '申请转入金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '转账方信息',
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
        {
          title: '申请时间',
          key: 'address'
        },
      ],
      columns3: [
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
          title: '转账账户',
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

.qualification-agency-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
