/**
* Created by Lv Cheng on 2022/6/9
* Notes 后勤确认
*/
<template>
  <div class="confirm-logistics">
    <el-form
        size="small"
        ref="form"
        inline
        :rules="rules"
        label-width="120px"
        :model="form">
      <el-form-item label="申请人" prop="creatorId">
        <el-select clearable v-model="form.creatorId" placeholder="请选择申请人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input clearable v-model.trim="form.customerName" placeholder="请输入客户名称">
        </el-input>
      </el-form-item>
      <el-form-item label="后勤项目" prop="logisticsProjectType">
        <el-select clearable v-model="form.logisticsProjectType" placeholder="请选择后勤项目">
          <el-option
              v-for="item in this.$store.state.logistics_project_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后勤申请状态" prop="status">
        <el-select clearable v-model="form.status" placeholder="请选择后勤申请状态">
          <el-option
              v-for="item in this.$store.state.logistics_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交日期" prop="date">
        <el-date-picker
            v-model="form.date"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="$pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
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
      <div class="pagination-right">
        <el-pagination
            ref="pagination"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.currentPage"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="total,sizes, prev, pager, next, jumper"
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
            :rules="rules2"
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
      loading: false,
      visible: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        creatorId: null,
        customerName: '',
        logisticsProjectType: null,
        status: null,
        date: [],
      },
      rules: {
        creatorId: [{required: false, trigger: 'blur'}],
        customerName: [{required: false, trigger: 'blur'}],
        logisticsProjectType: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
      },
      list: [],
      // 确认
      form2: {
        "id": null,
        "confirmRemark": '',
        "confirm": null,
        "confirmCost": undefined
      },
      rules2: {
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
    this.search()
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.pageInfo.currentPage = 1
      this.search()
    },
    @throttle()
    async search(size, page) {
      let newForm = {}
      newForm.pageSize = size ? size : this.pageInfo.pageSize
      newForm.currentPage = page ? page : this.pageInfo.currentPage
      this.loading = true
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      newForm = Object.assign(newForm, this.form)
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/logistics/list-all', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.listCertificates.forEach(certificate => {
              certificate.levelMajor = JSON.parse(certificate.levelMajor)
            })
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.search()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.search(_pageSize)
    },
    handleChange() {
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
      this.$router.push('/confirm-logistics-view/' + _row.id)
    },
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
