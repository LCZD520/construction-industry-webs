/**
* Created by Lv Cheng on 2022/6/17
* Notes 人才查询添加
*/
<template>
  <div class="talent-query-add">
    <el-form label-position="right" label-width="120px">
      <el-form-item label="从人才资源选择">
        <el-button type="primary" size="small">点击选择</el-button>
      </el-form-item>
      <el-form-item label="从已录人才选择">
        <el-button type="primary" size="small">点击选择</el-button>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input class="width328" placeholder="请输入姓名" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
          <el-form-item label="地区">
            <el-cascader
                class="width328"
                size="small"
                clearable
                placeholder="请选择地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="社保">
            <el-cascader
                class="width328"
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
        <el-col :span="12">
          <el-form-item label="电话号码">
            <el-input class="width328" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ">
            <el-input class="width328" size="small" placeholder="请输入QQ" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学历">
            <el-select class="width328" size="small" v-model="form.name" placeholder="请选择学历">
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
          <el-form-item label="职称">
            <el-select class="width328" size="small" v-model="form.name" placeholder="请选择职称">
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
          <el-form-item label="招标出场">
            <el-select class="width328" size="small" v-model="form.name" placeholder="请选择招标出场">
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
      <el-divider content-position="left">三类人员</el-divider>
      <el-row>
        <el-col :span="24">
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
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发证时间">
            <el-date-picker
                class="width-full"
                size="small"
                v-model="value"
                type="date"
                placeholder="请选择三类人员发证日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="继续教育时间">
            <el-date-picker
                class="width-full"
                size="small"
                v-model="value"
                type="date"
                placeholder="请选择继续教育日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="证书">
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证书状态">
            <el-select class="width328" size="small" v-model="form.name" placeholder="请选择证书状态">
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
          <el-form-item label="人才状态">
            <el-select disabled class="width328" size="small" v-model="form.name">
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
          <el-form-item label="价格">
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
  name: 'TalentQueryAdd',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '级别专业',
          key: 'address'
        },
        {
          title: '初始转注',
          key: 'address'
        },
        {
          title: '发证时间',
          key: 'address'
        },
        {
          title: '继续教育时间（默认3年）',
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

.talent-query-add {
  margin: 0 100px;

  .width328 {
    width: 328px;
  }
  .width-full{
    width: 100%;
  }
}
</style>
