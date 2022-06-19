/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质代办添加、编辑复用组件
*/
<template>
  <div class="qualification-agency-add-edit-common-form">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="代办公司">
            <el-input placeholder="请输入代办公司" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式">
            <el-input placeholder="请输入付款方式" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代办资质">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择代办资质"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="办理地区">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择办理地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代办金额">
            <el-input-number class="width-full" controls-position="right" :min="0" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="人员所需清单" name="first">
          <el-form-item label="建造师">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini">
                添加
              </el-button>
            </div>
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
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="工程师">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini">
                添加
              </el-button>
            </div>
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
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="三类人员">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini">
                添加
              </el-button>
            </div>
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
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="技术工种">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini">
                添加
              </el-button>
            </div>
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
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
                      @click="handleEdit(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input placeholder="请输入备注..." :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-circle-plus-outline" type="primary" size="small">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'QualificationAgencyAddEditCommonForm',
  components: {},
  data() {
    return {
      activeName: 'first',
      form: {
        name: ''
      },
      columns: [
        {
          title: '级别专业-初/转',
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
          title: '金额',
          key: 'address'
        },
        {
          title: '备注',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '级别专业-初/转',
          key: 'address'
        },
        {
          title: '需求人数',
          key: 'address'
        },
        {
          title: '金额',
          key: 'address'
        },
        {
          title: '备注',
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
@import "../../../../assets/css/common-el-table-scrollbar";

.qualification-agency-add-edit-common-form {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
