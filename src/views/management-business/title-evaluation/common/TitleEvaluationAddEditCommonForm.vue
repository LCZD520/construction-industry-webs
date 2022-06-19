/**
* Created by Lv Cheng on 2022/6/19
* Notes 职称评审添加、编辑公共组件
*/
<template>
  <div class="title-evaluation-add-edit-common-form">
    <el-form label-position="right" label-width="120px">
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
        <div style="background:#f8f8f9;padding: 5px 10px;border: 1px solid #eee">
          <el-button icon="el-icon-plus" type="primary" size="mini">
            添加
          </el-button>
          <el-button icon="el-icon-document" type="primary" size="mini">
            批量导入
          </el-button>
          <el-button icon="el-icon-download" type="primary" size="mini">
            下载导入模板
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
  name: 'TitleEvaluationAddEditCommonForm',
  components: {},
  data() {
    return {
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

.title-evaluation-add-edit-common-form {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
