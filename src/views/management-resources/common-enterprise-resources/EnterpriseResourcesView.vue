/**
* Created by Lv Cheng on 2022/6/20
* Notes 企业资源查看
*/
<template>
  <div class="enterprise-resources-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否共享">
            <el-radio-group disabled v-model="form.name">
              <el-radio :label="2">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业名称">
            <el-input disabled placeholder="请输入电话号码" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业资质">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择企业资质">
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
          <el-form-item label="地区">
            <el-cascader
                disabled
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
        <el-col :span="12">
          <el-form-item label="联系地址">
            <el-input disabled placeholder="请输入联系人" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人">
            <el-input disabled placeholder="请输入联系人" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group disabled v-model="form.name">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="电话号码">
            <el-input disabled placeholder="请输入电话号码" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ号码">
            <el-input disabled placeholder="请输入QQ号码" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户类型">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择学历">
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="跟进情况">
        <el-input disabled placeholder="请输入跟进情况..." :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input disabled placeholder="请输入备注..." :rows="3" type="textarea">

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
  name: 'EnterpriseResourcesView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      columns: [
        {
          title: '级别专业-初/转',
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

.enterprise-resources-view {
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
