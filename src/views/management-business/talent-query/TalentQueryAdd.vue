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
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地区">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="社保">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话号码">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ">
            <el-input size="small" placeholder="请输入QQ" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学历">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职称">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="招标出场">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">三类人员</el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="三类人员">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="发证时间">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="继续教育时间">
            <el-input size="small" v-model="form.name"/>
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
                  prop="name"
                  label="姓名"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="province"
                  label="省份"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="city"
                  label="市区"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="address"
                  label="地址"
                  width="300">
              </el-table-column>
              <el-table-column
                  prop="zip"
                  label="邮编"
                  width="120">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证书状态">
            <el-input size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人才状态">
            <el-input size="small" v-model="form.name"/>
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
      tableData: []
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
  margin: 0 200px;
}
</style>
