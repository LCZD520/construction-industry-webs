/**
* Created by Lv Cheng on 2022/6/9
* Notes 后勤确认
*/
<template>
  <div class="confirm-logistics">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="申请人" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入创建人姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="客户名称" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
      <el-form-item label="后勤项目" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择后勤项目">
          <el-option
              v-for="item in this.$store.state.logistics_project_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后勤申请状态" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择后勤申请状态">
          <el-option
              v-for="item in this.$store.state.logistics_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          min-width="180"
          prop="logisticsProjectType"
          label="后勤项目">
        <template slot-scope="scope">
          <span>{{ $valueToLabel(scope.row.logisticsProjectType, $store.state.logistics_project_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="addRemark"
          label="申请备注">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          label="提交时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          label="状态">
        <template slot-scope="scope">
          <el-tag
              size="mini"
              :type="scope.row.status === 1 ? 'info' : scope.row.status === 2 ? 'success' : 'danger'"
              effect="dark">
            {{ scope.row.status === 1 ? '待确认' : scope.row.status === 2 ? '已确认' : '不予确认' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              v-if="scope.row.status === 1"
              size="mini"
              type="primary"
              @click="handleConfirm(scope.$index, scope.row)">确认
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleView(scope.$index, scope.row)">查看
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
        width="50%"
        title="后勤确认"
        :visible.sync="visible"
        :before-close="()=> this.visible = false">
      <div class="dialog-content">
        <el-form
            ref="form2"
            :rules="rules"
            label-width="100px"
            :model="form2">
          <el-form-item prop="confirm" label="是否确认">
            <el-radio-group v-model="form2.confirm">
              <el-radio
                  v-for="item in this.$store.state.bool2_options"
                  :key="item.value"
                  :label="item.value">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
              v-if="form2.confirm"
              prop="confirmRemark" label="费用">
            <el-input-number
                class="width-full"
                clearable controls-position="right"
                v-model="form2.confirmCost"/>
          </el-form-item>
          <el-form-item prop="confirmRemark" label="备注">
            <el-input resize="none" clearable v-model="form2.confirmRemark" placeholder="请输入备注..." :rows="3"
                      type="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary"
            @click="handleConfirmAgain">确 认
        </el-button>
        <el-button size="small" @click="visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmLogistics',
  components: {},
  data() {
    return {
      visible: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      // 确认
      form2: {
        "id": null,
        "confirmRemark": '',
        "confirm": null,
        "confirmCost": undefined
      },
      list: [],
      rules: {
        confirm: [
          {required: true, message: '请选择是否确认', trigger: 'change'}
        ],
        confirmCost: [
          {required: false}
        ],
        confirmRemark: [
          {required: false}
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getList()
    },
    /**
     * 改变页数
     * @param _pageSize
     */
    handleSizeChange(_pageSize) {
      this.getList(_pageSize)
    },
    getList(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/logistics/list-all?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/logistics/list-all?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url).then(res => {
        console.log(res)
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },

    handleConfirm(_index, _row) {
      this.visible = true
      this.currentId = _row.id
    },
    handleConfirmAgain() {
      this.$refs.form2.validate(valid => {
        if (valid) {
          this.form2.id = this.currentId
          this.$http.put('/logistics/confirm', this.form2).then(res => {
            console.log(res)
            if (res.status) {
              this.$message.success(res.message)
              this.$refs.form2.resetFields()
              this.getList()
              this.visible = false
              return
            }
            this.$message.error(res.message)
          })
          return
        }
        this.$message.error('输入有误')
      })
    },
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/confirm-logistics-view/'+_row.id)
    },
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
