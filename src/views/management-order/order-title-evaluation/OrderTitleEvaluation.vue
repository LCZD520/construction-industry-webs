/**
* Created by Lv Cheng on 2022/6/9
* Notes 职称评审订单
*/
<template>
  <div class="order-title-evaluation">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="客户名称" label-width="100px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="订单状态" label-width="100px">
        <el-select size="small" v-model="form.newPassword" placeholder="请选择订单状态">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " label-width="100px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
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
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleTransfer(scope.$index, scope.row)">转账
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              plain
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div class="pagination-total">共<span class="total"> {{ pageInfo.total }} </span>条</div>
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>


    <el-dialog
        :close-on-click-modal=false
        width="80%"
        title="职称评审"
        :visible.sync="visible"
        :before-close="()=>this.visible = false">
      <div class="dialog-wrapper" style="height: 460px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content">
            <el-form
                label-width="100px"
                label-position="right">
              <el-form-item label="转账至账户">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAccountAddEdit('add')">添加账户
                </el-button>
                <br>
                <el-radio-group v-model="form.name">
                  <p v-for="item in 3" :key="item">
                    <el-radio :label="item">备选项</el-radio>
                    <el-button type="text" icon="el-icon-edit" @click="handleAccountAddEdit('edit',item)"/>
                    <el-button type="text" style="color: red" icon="el-icon-delete" @click="handleAccountDelete"/>
                  </p>
                </el-radio-group>
              </el-form-item>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="款项用途">
                    <el-select class="width-full" placeholder="请选择款项用途" size="small" v-model="form.name">
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
                  <el-form-item label="转账金额">
                    <el-input-number controls-position="right" class="width-full" placeholder="请输入转账金额" size="small"
                                     v-model="form.name">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <ImagesUpload/>
              <el-form-item label="备注">
                <el-input style="width: 100%" size="small" type="textarea" :rows="3" v-model="form.name"/>
              </el-form-item>
            </el-form>
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
                  v-for="item in columns"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="240">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      type="primary"
                      plain
                      @click.stop="handleDetail(scope.$index, scope.row)">详情
                  </el-button>
                  <el-button
                      size="mini"
                      type="primary"
                      plain
                      @click.stop="handleImageView(scope.$index, scope.row)">图片查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
      <AccountAddEditDialog
          @closeDialog="innerVisible = false"
          :form-data="form"
          :mode="mode"
          :handle-submit="handleSubmit"
          :inner-visible="innerVisible"/>
      <TitleEvaluationTransferDetailDialog
          @closeDialog="innerVisible2 = false"
          :inner-visible="innerVisible2"
          :form-data="form"/>
      <ImageViewDialog
          @closeDialog="innerVisible3 = false"
          :image-list="[]"
          :inner-visible="innerVisible3"/>
      <div slot="footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button
            size="small"
            type="primary">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImagesUpload from "./order-title-evaluation/ImagesUpload";
import AccountAddEditDialog from "./order-title-evaluation/AccountAddEditDialog";
import ImageViewDialog from "./order-title-evaluation/ImageViewDialog";
import TitleEvaluationTransferDetailDialog from "./order-title-evaluation/TitleEvaluationTransferDetailDialog";

export default {
  name: 'OrderTitleEvaluation',
  components: {TitleEvaluationTransferDetailDialog, ImageViewDialog, AccountAddEditDialog, ImagesUpload},
  data() {
    return {
      visible: false,
      mode: '',
      // 账户信息弹窗是否显示
      innerVisible: false,
      innerVisible2: false,
      innerVisible3: false,
      options: [],
      columns: [
        {
          title: '客户名称',
          key: 'address'
        },
        {
          title: '订单编号',
          key: 'address'
        },
        {
          title: '人员数',
          key: 'address'
        },
        {
          title: '代办费用',
          key: 'address'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '订单时间',
          key: 'address'
        },
        {
          title: '入账申请金额',
          key: 'address'
        },
        {
          title: '订单余额',
          key: 'address'
        },
      ],
      columns2: [
        {
          title: '申请转账金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '账户户名',
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
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          username: '王小虎',
          address: '上海市普陀区',
        }],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        name: ''
      },
    }
  },
  mounted() {
    console.log(this.$route)
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
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/order-title-evaluation-view')
    },
    handleTransfer(_index, _row) {
      console.log(_index, _row)
      this.visible = true
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/order-title-evaluation-edit')
    },
    handleDetail(_index, _row) {
      console.log(_index, _row)
      this.innerVisible2 = true
    },
    handleImageView(_index, _row) {
      console.log(_index, _row)
      this.innerVisible3 = true
    },
    handleSubmit() {
      console.log(this.mode)
      if (this.mode === 'add') {
        this.$message.success('添加提交')
        return
      }
      if (this.mode === 'edit') {
        this.$message.success('编辑提交')
      }

    },
    handleAccountAddEdit(_type, _id) {
      this.innerVisible = true
      this.mode = _type
      if (_type === 'add') {

        return
      }
      if (_type === 'edit') {
        console.log('编辑' + _id)
      }
    },
    handleAccountDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确认要删除此账户吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除!'
        });
      }).catch(() => {
      })

    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {

    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      console.log(_pageSize)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";

/deep/ .el-scrollbar__bar.is-horizontal {
  display: none;
}

/deep/ .el-dialog__body {
  padding: 16px 20px !important;
}

.dialog-content {
  padding: 0 10px;
}
</style>
