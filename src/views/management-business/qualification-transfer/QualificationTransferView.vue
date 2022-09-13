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
          <el-form-item
              prop="area"
              label="所在地区">
            <el-cascader
                size="small"
                disabled
                class="width-full"
                ref="cascaderArea"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder=""
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="" class="width-full" size="small" disabled v-model="form.name">
              <el-option
                  v-for="item in $store.state.qualification_transfer_status_options"
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
          <el-form-item label="资质需求" prop="qualificationRequirements">
            <el-select disabled multiple class="width-full" v-model="form.qualificationRequirements" placeholder="">
              <el-option
                  :value="selectedList">
                <el-tree
                    check-strictly
                    accordion
                    check-on-click-node
                    :data="this.$store.state.list_qualification_category"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    @check-change="handleNodeClick"
                    :props="defaultProps">
                </el-tree>
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
            <el-input disabled placeholder="备注......" :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转让订单" name="first">
        <el-button type="primary" icon="el-icon-plus" size="small">
          下单
        </el-button>
        <br><br>
        <el-table
            size="mini"
            :data="tableData"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="180"
              v-for="item in columns"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">编辑订单
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        11111
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'QualificationTransferView',
  components: {},
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
          key: 'address1'
        },
        {
          title: '收购金额',
          key: 'address2'
        },
        {
          title: '状态',
          key: 'address3'
        },
        {
          title: '转让意向客户',
          key: 'addres4s'
        },
        {
          title: '订单时间',
          key: 'addres5s'
        },
      ],
      tableData: [
        {}
      ],
      defaultProps: {
        children: 'listQualificationCategory',
        label: 'categoryName'
      },
      selectedList: [],
    }
  },
  methods: {
    handleClick() {

    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleNodeClick() {
      let datalist = this.$refs.tree.getCheckedNodes()
      this.selectedList = []
      this.form.qualificationRequirements = []
      datalist.forEach(item => {
        if (item.listQualificationCategory.length === 0) {
          this.selectedList.push({id: item.id, label: item.categoryName})
          this.form.qualificationRequirements.push(item.categoryName)
        }
      })
    },

  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-transfer-view {
  margin: 0 200px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

/deep/ .el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}

/deep/ .el-tree .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}
</style>
