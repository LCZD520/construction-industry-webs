/**
* Created by Lv Cheng on 2022/6/19
* Notes 录入企业
*/
<template>
  <div class="enterprise-add">
    <el-form label-position="right" label-width="120px">
      <el-form-item label="从企业资源选择">
        <el-button type="primary" size="small" @click="handleSelect">点击选择</el-button>
      </el-form-item>
      <el-form-item label="从已录企业选择">
        <el-button type="primary" size="small" @click="handleSelect2">点击选择</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-input placeholder="请输入企业名称" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业资质">
            <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择企业资质">
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
          <el-form-item label="地区">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系地址">
            <el-input placeholder="请输入联系地址" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人">
            <el-input placeholder="请输入联系人" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-radio-group v-model="form.name">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input placeholder="请输入电话号码" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ号码">
            <el-input placeholder="请输入QQ号码" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业状态">
            <el-select class="width-full" disabled size="small" v-model="form.name" placeholder="请选择企业状态">
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
          <el-form-item label="企业需求">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="outerVisible = true">
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
                  min-width="200"
                  v-for="item in columns"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="primary"
                      plain
                      @click.stop="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      style="padding: 5px"
                      size="mini"
                      type="danger"
                      plain
                      @click.stop="handleEdit(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input placeholder="请输入备注..." :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="80%" title="添加企业需求" :visible.sync="outerVisible">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="级别专业-初始">
          <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
            <el-button icon="el-icon-plus" type="primary" size="mini" @click="innerVisible = true">
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
                min-width="200"
                prop="username"
                label="级别专业">
            </el-table-column>
            <el-table-column
                min-width="200"
                prop="username"
                label="初始转注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                    style="padding: 5px"
                    size="mini"
                    type="primary"
                    plain
                    @click.stop="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                    style="padding: 5px"
                    size="mini"
                    type="danger"
                    plain
                    @click.stop="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="三类人员">
              <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择三类人员">
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
            <el-form-item label="招标出场">
              <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择三类人员">
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
        <el-form-item label="需求人数">
          <el-input-number class="width-full" :min="0" controls-position="right" size="small" v-model="form.name">
          </el-input-number>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业出价">
              <el-input-number controls-position="right" :min="0" size="small" v-model="form.name"/>
              元
              <el-input-number controls-position="right" :min="1" size="small" v-model="form.name"/>
              &nbsp;
              <el-select size="small" v-model="form.name" style="width: 80px;" placeholder="请选择">
                <el-option label="年" value="1"></el-option>
                <el-option label="月" value="2"></el-option>
                <el-option label="日" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市场开发费">
              <el-input-number controls-position="right" :min="0" size="small" v-model="form.name"/>
              元
              &nbsp;
              <el-select size="small" v-model="form.name" style="width: 80px;" placeholder="请选择">
                <el-option label="人" value="1"></el-option>
                <el-option label="单" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职称">
              <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择职称">
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
            <el-form-item label="学历">
              <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择学历">
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
      <el-dialog
          style="margin-top: 15vh"
          width="50%"
          title="添加级别专业-转注"
          :visible.sync="innerVisible"
          append-to-body>
        <el-form
            label-position="right"
            label-width="120px"
            ref="formData"
            :model="form">
          <el-form-item label="级别专业">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                ref="cascader"
                @expand-change="cascaderClick"
                @visible-change="cascaderClick"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder="请选择级别专业"
                :options="this.$provinceAndCityData"
                @change="handleChange"
                v-model="form.name">
            </el-cascader>
          </el-form-item>
          <el-form-item label="初始转注">
            <el-select
                class="width-full"
                size="small"
                v-model="form.name"
                placeholder="请选择初始转注">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="innerVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          style="margin-top: 15vh"
          width="50%"
          title="编辑级别专业-转注"
          :visible.sync="innerVisible2"
          append-to-body>
        <el-form
            label-position="right"
            label-width="120px"
            ref="formData"
            :model="form">
          <el-form-item label="级别专业">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                ref="cascader"
                @expand-change="cascaderClick"
                @visible-change="cascaderClick"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder="请选择级别专业"
                :options="this.$provinceAndCityData"
                @change="handleChange"
                v-model="form.name">
            </el-cascader>
          </el-form-item>
          <el-form-item label="初始转注">
            <el-select
                class="width-full"
                size="small"
                v-model="form.name"
                placeholder="请选择初始转注">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="innerVisible2 = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="outerVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <EnterpriseResourceSelectDialog
        :enterprise-list="enterpriseList"
        :dialog-title="dialogTitle"
        @closeDialog="visible = false"
        :visible="visible"/>
  </div>
</template>

<script>
import EnterpriseResourceSelectDialog from "./enterprise-add/EnterpriseResourceSelectDialog";

export default {
  name: 'EnterpriseAdd',
  components: {EnterpriseResourceSelectDialog},
  data() {
    return {
      visible: false,
      outerVisible: false,
      innerVisible: false,
      innerVisible2: false,
      dialogTitle: '',
      form: {
        name: ''
      },
      columns: [
        {
          title: '级别专业-初转',
          key: 'address'
        },
        {
          title: '招标出场',
          key: 'address'
        },
        {
          title: '企业出价',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '需求人数',
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
      tableData: [{}],
      list1: [
        {id: 12345, address: '4111'},
        {id: 48485, address: '4111'},
        {id: 48454, address: '4111'},
        {id: 48812, address: '4111'},
        {id: 45848, address: '4111'},
      ],
      list2: [
        {id: 4895, address: '222'},
        {id: 4836, address: '222'},
        {id: 4845, address: '222'},
        {id: 4882, address: '222'},
        {id: 4548, address: '222'},
      ],
      enterpriseList: []
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
    handleSelect() {
      this.dialogTitle = '从企业资源选择'
      this.enterpriseList = this.list1
      this.visible = true
    },
    handleSelect2() {
      this.dialogTitle = '从已录企业选择'
      this.enterpriseList = this.list2
      this.visible = true
    },


    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.innerVisible2 = true
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
    },
    handleConfirm() {
      this.outerVisible = false
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.enterprise-add {
  margin: 0 100px;
}
</style>
