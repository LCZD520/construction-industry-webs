/**
* Created by Lv Cheng on 2022/6/16
* Notes 人才查询查看
*/
<template>
  <div class="talent-query-view">
    <el-form v-if="!isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地区">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="社保">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="三类人员">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发证时间">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="过期时间">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标出场">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证书状态">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才状态">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才要价">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入时间">
            <el-input disabled size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="证书">
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
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="12">
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
      <el-tab-pane label="人才证件" name="first">
        <el-button type="primary" size="small">
          添加证件
        </el-button>
        <el-button type="primary" size="small">
          更新证件去向
        </el-button>
        <br><br>
        <el-table
            :data="tableData"
            stripe
            border
            highlight-current-row
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%"
            :row-class-name="tableRowClassName">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              min-width="180"
              v-for="item in columns2"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">证件去向流水
              </el-button>
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        <ImagesUpload/>
      </el-tab-pane>
      <el-tab-pane label="申请转账" name="third">
        <el-button type="primary" size="small">
          申请转账
        </el-button>
        <br><br>
        <el-table
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
              prop="address"
              label="申请转账金额">
          </el-table-column>
          <el-table-column
              min-width="120"
              prop="address"
              label="账户户名">
          </el-table-column>
          <el-table-column
              min-width="120"
              prop="address"
              label="款项用途">
          </el-table-column>
          <el-table-column
              min-width="400"
              prop="address"
              label="申请备注">
          </el-table-column>
          <el-table-column
              min-width="120"
              prop="address"
              label="申请状态">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="申请时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">取消申请
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
      <el-tab-pane label="人才回访" name="fourth">
        <el-button type="primary" size="small">
          添加回访记录
        </el-button>
        <br><br>
        <el-table
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
              prop="address"
              label="回访内容">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="是否需要再次回访">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="下次回访时间">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="后勤申请" name="five">
        <el-button type="primary" size="small">
          添加后勤记录
        </el-button>
        <br><br>
        <el-table
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
              prop="address"
              label="后勤项目">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="申请备注">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="提交时间">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="address"
              label="状态">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  plain
                  @click="handleEdit(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImagesUpload from "./talent-query-view/ImagesUpload";
export default {
  name: 'TalentQueryView',
  components: {ImagesUpload},
  data() {
    return {
      // activeName: 'first',
      activeName: 'second',
      isShowDetail: false,
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
      columns2: [
        {
          title: '所在分支',
          key: 'address'
        },
        {
          title: '证件类型',
          key: 'address'
        },
        {
          title: '证件备注',
          key: 'address'
        },
        {
          title: '当前证件去向',
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
</style>
