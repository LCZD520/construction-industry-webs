/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质代办添加
*/
<template>
  <div class="qualification-agency-add">
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
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="人员所需清单" name="first">
          <el-form-item label="建造师">
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
                  min-width="180"
                  v-for="item in columns"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
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
          <el-form-item label="工程师">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="outerVisible2 = true">
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
              <el-table-column fixed="right" label="操作" width="200">
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
          <el-form-item label="三类人员">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="outerVisible3 = true">
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
              <el-table-column fixed="right" label="操作" width="200">
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
          <el-form-item label="技术工种">
            <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
              <el-button icon="el-icon-plus" type="primary" size="mini" @click="outerVisible4 = true">
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
              <el-table-column fixed="right" label="操作" width="200">
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
        </el-tab-pane>
      </el-tabs>
      <br>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input placeholder="请输入备注..." :rows="3" type="textarea">

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
    <!--    建造师-->
    <el-dialog width="60%" title="资质代办所需人员（建造师）" :visible.sync="outerVisible">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="级别专业-初始">
          <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
            <el-button icon="el-icon-plus" type="primary" size="mini" @click="innerVisible = true">
              添加
            </el-button>
          </div>
          <el-table
              size="mini"
              :data="tableData2"
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
            <el-table-column fixed="right" label="操作" width="200">
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
        <el-form-item label="需求人数">
          <el-input-number class="width-full" :min="0" controls-position="right" size="small" v-model="form.name">
          </el-input-number>
        </el-form-item>
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
        <el-form-item label="备注">
          <el-input placeholder="请输入备注..." :rows="3" type="textarea">

          </el-input>
        </el-form-item>
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
    <!--    工程师-->
    <el-dialog width="60%" title="资质代办所需人员（工程师）" :visible.sync="outerVisible2">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="级别专业-初始">
          <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
            <el-button icon="el-icon-plus" type="primary" size="mini" @click="innerVisible3 = true">
              添加
            </el-button>
          </div>
          <el-table
              size="mini"
              :data="tableData3"
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
            <el-table-column fixed="right" label="操作" width="200">
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
        <el-form-item label="需求人数">
          <el-input-number class="width-full" :min="0" controls-position="right" size="small" v-model="form.name">
          </el-input-number>
        </el-form-item>
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
        <el-form-item label="备注">
          <el-input placeholder="请输入备注..." :rows="3" type="textarea">

          </el-input>
        </el-form-item>
      </el-form>
      <el-dialog
          style="margin-top: 15vh"
          width="50%"
          title="添加级别专业-转注"
          :visible.sync="innerVisible3"
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
          <el-button size="small" @click="innerVisible3 = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          style="margin-top: 15vh"
          width="50%"
          title="编辑级别专业-转注"
          :visible.sync="innerVisible4"
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
          <el-button size="small" @click="innerVisible4 = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="outerVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!--    三类人员-->

    <!--    技术工种-->
  </div>
</template>

<script>


export default {
  name: 'QualificationAgencyAdd',
  components: {},
  data() {
    return {
      outerVisible: false,
      outerVisible2: false,
      outerVisible3: false,
      outerVisible4: false,
      innerVisible: false,
      innerVisible2: false,
      innerVisible3: false,
      innerVisible4: false,
      innerVisible5: false,
      innerVisible6: false,
      innerVisible7: false,
      innerVisible8: false,
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
      tableData: [{}],
      tableData2: [{}],
      tableData3: [{}],
      tableData4: [{}],
      tableData5: [{}],
      tableData6: [{}],
      tableData7: [{}],
      tableData8: [{}],
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

</style>
