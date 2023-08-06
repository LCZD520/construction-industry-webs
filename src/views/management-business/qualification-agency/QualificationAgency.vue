/**
* Created by Lv Cheng on 2022/6/9
* Notes 资质代办
*/
<template>
  <div class="qualification-agency">
    <el-form
        ref="form"
        :rules="rules"
        label-width="100px"
        inline
        :model="form">
      <el-form-item label="代办公司" prop="agencyCompany">
        <el-input clearable size="small" v-model.trim="form.agencyCompany" placeholder="请输入代办公司">
        </el-input>
      </el-form-item>
      <el-form-item prop="area" label="办理地区">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择地区"
            ref="cascaderArea"
            @expand-change="cascaderClick('area')"
            @visible-change="cascaderClick('area')"
            :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
            :options="this.$provinceAndCityData"
            v-model="form.area">
        </el-cascader>
      </el-form-item>
      <el-form-item label="代办资质" prop="agencyQualification">
        <el-cascader
            size="small"
            clearable
            ref="cascaderLevelMajor"
            @expand-change="cascaderClick('levelMajor')"
            @visible-change="cascaderClick('levelMajor')"
            :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,checkStrictly:true
                    ,emitPath:false
                    ,children:'listCertificateCategory'}"
            placeholder="请选择代办资质"
            :options="this.$store.state.list_certificate_category"
            v-model="form.agencyQualification">
        </el-cascader>
      </el-form-item>
      <el-form-item label="录入日期" prop="date">
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
      <el-form-item label="录入人" prop="creatorId">
        <el-select clearable size="small" v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-search" @click="search(pageInfo.pageSize,1)" :loading="loading"
                   type="primary">搜 索
        </el-button>
        <el-button size="small" icon="el-icon-refresh-right" v-throttle="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/qualification-agency-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          align="center"
          min-width="160"
          prop="agencyCompany"
          label="代办公司">
      </el-table-column>
      <el-table-column
          align="center"
          label="办理地区">
        <template #default="{row}">
          <span> {{ $CodeToText[row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="200"
          label="代办资质">
        <template #default="{row}">
          <p v-for="(item,index) in row.agencyQualification" :key="index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column
          min-width="200"
          align="right"
          label="代办金额">
        <template #default="{row}">
          <el-statistic group-separator="," :precision="2" :value="row.agencyAmount"/>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="200"
          label="状态">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.status, $store.state.qualification_agency_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="录入人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column v-if="deleted" fixed="right" label="操作" width="90">
        <template #default="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="recovery(scope.row.id)">恢复
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-else fixed="right" label="操作" width="340">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row,'second')">图片
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(row)">编辑
          </el-button>
          <el-button
              size="mini"
              v-if="[2,3].includes(row.status)"
              type="primary"
              @click.stop="handleView(row,'fourth')">转账
          </el-button>&nbsp;
          <el-dropdown size="mini" split-button type="primary" @command="handleCommand($event,row.id)">
            更多
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="[1,2].includes(row.status)"
                                icon="el-icon-info" command="view">查看
              </el-dropdown-item>
              <el-dropdown-item v-if="row.status === 1" icon="el-icon-check" command="confirm">执行确认</el-dropdown-item>
              <el-dropdown-item v-if="[2,3].includes(row.status)" icon="el-icon-wallet" command="agency-entry">代办入账
              </el-dropdown-item>
              <el-dropdown-item v-if="[2,3].includes(row.status)" icon="el-icon-s-order" command="talent-order">人才订单
              </el-dropdown-item>
              <el-dropdown-item v-if="row.status === 2" icon="el-icon-finished">申请完成确认</el-dropdown-item>
              <el-dropdown-item v-if="[1,4].includes(row.status)"
                                disabled icon="el-icon-delete" command="delete">删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  </div>
</template>

<script>

export default {
  name: 'QualificationAgency',
  components: {},
  props: {
    deleted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        agencyCompany: '',
        area: '',
        agencyQualification: '',
        creatorId: null,
        date: [],
        deleted: this.deleted,
      },
      rules: {
        agencyCompany: [{required: false, trigger: 'blur'}],
        area: [{required: false, trigger: 'blur'}],
        agencyQualification: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
      },
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
      const area = this.findSelfAndChildren(this.form.area, this.$provinceAndCityData)
      if (this.form.date && this.form.date.length > 1) {
        newForm.startDate = this.form.date[0]
        newForm.endDate = this.form.date[1]
      }
      Object.keys(this.form).forEach(key => {
        if (['area'].includes(key)) {
          newForm.area = area
        } else {
          newForm[key] = this.form[key]
        }
      })
      for (let key in newForm) {
        if (newForm[key] === '') {
          newForm[key] = null
        }
      }
      try {
        const res = await this.$http.post('/qualification-agency/list', newForm)
        if (res && res.status) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.agencyQualification = JSON.parse(item.agencyQualification)
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    findSelfAndChildren(val, array) {
      let arr = []
      if (!val || !val.length) return arr
      arr.push(val)
      let obj = array.find(item => item.value === val)
      if (obj && obj.children && obj.children.length > 0) {
        arr = arr.concat(obj.children.map(item => item.value))
      }
      return arr
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
    handleConfirm(_index, _row) {
      console.log(_index, _row)
      this.$message.success('执行确认')
    },
    handleEdit(_row) {
      this.$router.push('/qualification-agency-edit/' + _row.id)
    },
    async recovery(id) {
      try {
        const res = await this.$http.delete(`/qualification-agency/recovery/${id}`)
        if (res && res.status) {
          this.$message.success(res.message)
          await this.search()
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    async handleCommand(_command, _id) {
      if (_command === 'view') {
        this.$router.push('/qualification-agency-view/' + _id)
        return
      }
      if (_command === 'confirm') {
        this.$router.push('/qualification-agency-confirm/' + _id)
        return
      }
      if (_command === 'delete') {
        this.$confirm('确定要删除这条记录吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            const res = await this.$http.delete(`/qualification-agency/delete/${_id}`)
            if (res && res.status) {
              this.$message.success(res.message)
              await this.search()
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
        }).catch(() => {
        })

        return
      }
      if (_command === 'agency-entry') {
        this.$router.push({
          path: '/qualification-agency-detail',
          query: {
            activeTab: 'third',
            id: _id
          }
        })
        return
      }
      if (_command === 'talent-order') {
        this.$router.push({
          path: '/qualification-agency-detail',
          query: {
            activeTab: 'first',
            id: _id
          }
        })
        // return
      }
    },
    handleView(_row, _tab) {
      this.$router.push({
        path: '/qualification-agency-detail/',
        query: {
          id: _row.id,
          activeTab: _tab
        }
      })
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确定删除!'
        });
      }).catch(() => {
      })
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            if (this.previousElementSibling) {
              this.previousElementSibling.click()
            }
            if (_type === 'area') {
              that.$refs.cascaderArea.dropDownVisible = false
              return
            }
            if (_type === 'levelMajor') {
              that.$refs.cascaderLevelMajor.dropDownVisible = false
              return
            }
            if (_type === 'socialSecurity') {
              that.$refs.cascaderSocialSecurity.dropDownVisible = false
            }
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                if (_type === 'area') {
                  that.$refs.cascaderArea.dropDownVisible = false
                  return
                }
                if (_type === 'socialSecurity') {
                  that.$refs.cascaderSocialSecurity.dropDownVisible = false
                }
              }
            })
      }, 1)
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/split-line";
@import "../../../assets/css/common-el-input-inner-width";
</style>
