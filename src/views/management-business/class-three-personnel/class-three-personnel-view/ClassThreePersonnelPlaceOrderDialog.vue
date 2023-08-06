/**
* Created by Lv Cheng on 2022/9/17
* Notes 三类人员订单下单对话框
*/
<template>
  <div class="class-three-personnel-place-order-dialog">
    <el-dialog :close-on-click-modal="false" width="80%" title="三类人员下单" :visible.sync="outerVisible"
               :before-close="()=>this.$emit('closeDialog')">
      <div class="dialog-wrapper" style="height: 476px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <el-form :model="form" label-width="120px" label-position="top">
              <el-form-item>
                <div slot="label">
                  <el-button type="primary" size="small" @click="selectAssessor">
                    选择评审人员
                  </el-button>
                  <template v-if="selectionList !== undefined">
                    <span style="color: #409EFF">&nbsp;&nbsp;已选&nbsp;{{ selectionList.length }}&nbsp;人</span>
                  </template>
                </div>
                <el-table
                    size="mini"
                    :data="selectionList"
                    stripe
                    border
                    height="400"
                    :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    :cell-style="{textAlign:'center'}"
                    style="width: 100%">
                  <el-table-column
                      min-width="180"
                      v-for="item in columns"
                      :key="item.key"
                      :prop="item.key"
                      :label="item.title">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="90">
                    <template slot-scope="{row}">
                      <el-form :disabled="false">
                        <el-button
                            style="padding: 5px"
                            size="mini"
                            type="danger"
                            @click="handleDelete(row)">删除
                        </el-button>
                      </el-form>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>

            <!--      添加/编辑三类人员_选择待评审人员-->
            <el-dialog
                :close-on-click-modal="false"
                style="margin-top: 3vh"
                width="80%"
                title="三类人员_选择待评审人员"
                :visible.sync="innerVisible"
                append-to-body>
              <el-form
                  size="small"
                  label-position="right"
                  label-width="80px">
<!--                <el-row :gutter="20">-->
<!--                  <el-col :span="12">-->
<!--                    <el-form-item label="证书专业" prop="initialConversion">-->
<!--                      <el-input-->
<!--                          v-model="sort"-->
<!--                          clearable-->
<!--                          class="width-full"-->
<!--                          placeholder="请输入证书专业">-->
<!--                        <el-option-->
<!--                            v-for="item in this.$store.state.initial_conversion_options"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                        </el-option>-->
<!--                      </el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
<!--                  <el-col :span="12" style="text-align: right">-->
<!--                    <el-form-item label=" ">-->
<!--                      <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>-->
<!--                      <el-button size="small" icon="el-icon-refresh">重置</el-button>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
<!--                </el-row>-->
                <el-radio-group size="small" v-model="type">
                  <el-radio-button label="all">全部</el-radio-button>
                  <el-radio-button label="selected">已选择</el-radio-button>
                  <el-radio-button label="unselected">未选择</el-radio-button>
                </el-radio-group>
                <br><br>
                <el-table
                    ref="table"
                    @row-click="handleRowClick"
                    :data="selectedAssessorList"
                    stripe
                    height="300"
                    :row-key="rowKey"
                    border
                    @selection-change="selectionChange"
                    :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                    style="width: 100%">
                  <el-table-column
                      :reserve-selection="true"
                      type="selection"
                      width="55">
                  </el-table-column>
                  <el-table-column
                      min-width="180"
                      v-for="item in columns"
                      :key="item.key"
                      :prop="item.key"
                      :label="item.title">
                  </el-table-column>
                </el-table>
                <div style="text-align: right;margin-top: 10px">
                  <div class="pagination-right">
                    <el-pagination
                        ref="pagination"
                        :page-sizes="[10]"
                        :page-size="pageInfo.pageSize"
                        :current-page.sync="pageInfo.currentPage"
                        @current-change="handleCurrentChange"
                        background
                        layout="total, prev, pager, next,sizes, jumper"
                        :total="pageInfo.total">
                    </el-pagination>
                  </div>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="closeInnerDialog">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('closeDialog')">关闭</el-button>
        <el-button size="small" type="primary" v-throttle="confirmOrder">确定</el-button>
      </div>
    </el-dialog>
    <CommonLoading v-if="loading"/>
  </div>
</template>

<script>
import CommonLoading from "../../../../components/CommonLoading";

export default {
  name: 'ClassThreePersonnelPlaceOrderDialog',
  components: {CommonLoading},
  props: {
    outerVisible: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      innerVisible: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      sort: null,
      currentIndex: null,
      selectedAssessorList: [],
      form: {
        id: this.$route.query.id / 1 || null,
        // 已选三类人员id
        listSelectedIds: [],
      },
      columns: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard'
        },
        {
          title: '联系电话',
          key: 'telephoneNumber'
        },
        {
          title: '安全证书',
          key: 'securityCertificate'
        },
        {
          title: '三类类别',
          key: 'threeCategory'
        },
        {
          title: '事项性质',
          key: 'itemNature'
        },
        {
          title: '闽政通账号',
          key: 'minZhengTongAccount'
        },
        {
          title: '闽政通密码',
          key: 'minZhengTongPassword'
        },
        {
          title: '代办金额',
          key: 'agencyAmount'
        },
      ],
      // 已选三类人员
      selectionList: [],
      talentForm: {
        fullName: '',
        area: '',
        levelMajor: '',
      },
      type: 'all'
    }
  },
  methods: {
    rowKey(row) {
      return row.id
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.type === 'all' && this.getWaitAssessor()
      if (this.type === 'selected') {
        let {pageSize, currentPage} = this.pageInfo
        console.log(this.pageInfo.currentPage)
        let startIndex = (currentPage - 1) * pageSize
        let endIndex = startIndex + pageSize
        this.selectedAssessorList = this.selectionList.slice(startIndex, endIndex)
      }
      this.type === 'unselected' && this.getUnselectedWaitAssessor()
    },
    getWaitAssessor(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/class-three-personnel/wait-assessor/${this.form.id}?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/class-three-personnel/wait-assessor/${this.form.id}?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.$http.get(url).then(res => {
        if (res.status) {
          this.selectedAssessorList = res.data.list
          this.pageInfo.total = res.data.total
        }
      })
    },
    /**
     * 获取未选择三类人员人员
     */
    async getUnselectedWaitAssessor() {
      let {pageSize, currentPage,} = this.pageInfo
      let requestBody = {
        currentPage,
        pageSize,
        listSelectedIds: this.form.listSelectedIds
      }
      try {
        const res = await this.$http.post(`/class-three-personnel/unselected-wait-assessor/${this.form.id}`, requestBody)
        if (res.status) {
          this.selectedAssessorList = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
      this.form.listSelectedIds = []
      this.selectionList.forEach(item => {
        if (!this.form.listSelectedIds.includes(item.id)) {
          this.form.listSelectedIds.push(item.id)
        }
      })
    },
    handleDelete(row) {
      this.$refs.table.toggleRowSelection(row)
    },
    /**
     * 确认订单
     */
    async confirmOrder() {
      if (this.form.listSelectedIds.length > 0) {
        this.loading = true
        try {
          const res = await this.$http.post('/class-three-personnel/place-order', this.form)
          if (res.status) {
            this.$message.success(res.message)
            this.$emit('getListOrders')
            this.$emit('closeDialog')
            this.$nextTick(() => {
              this.$refs.table.clearSelection()
            })
            return
          }
          this.$message.error(res.message + JSON.stringify(res.data))
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
        return
      }
      this.$message.warning('请选择评审人员')
    },
    /**
     * 选择评审人员
     */
    selectAssessor() {
      this.innerVisible = true
      this.type = 'all'
      this.getWaitAssessor()
    },
    closeInnerDialog() {
      this.innerVisible = false
      this.type = 'all'
    }
  },
  watch: {
    type(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.pageInfo.currentPage = 1
        if (newValue === 'all') {
          this.getWaitAssessor(this.pageInfo.pageSize)
          return
        }
        if (newValue === 'selected') {
          this.selectedAssessorList = this.selectionList
          this.pageInfo.total = this.selectionList.length
          return
        }
        if (newValue === 'unselected') {
          this.getUnselectedWaitAssessor()
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-table-scrollbar";
@import "../../../../assets/css/common-table-pagination";
</style>
