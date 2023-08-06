/**
* Created by Lv Cheng on 2022/6/9
* Notes 证件库
*/
<template>
  <div class="lib-certificate">
    <el-form
        ref="form"
        :rules="rules"
        inline
        label-width="120px"
        :model="form">
      <el-form-item label="姓名" prop="fullName">
        <el-input size="small" v-model.trim="form.fullName" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="人才状态" prop="status">
        <el-select size="small" v-model="form.status" placeholder="请选择人才状态">
          <el-option
              v-for="item in $store.state.talent_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入人" prop="creatorId">
        <el-select size="small" v-model="form.creatorId" placeholder="请选择录入人">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item label="级别专业" prop="levelMajor">
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
            placeholder="请选择级别专业"
            :options="this.$store.state.list_certificate_category"
            v-model="form.levelMajor">
        </el-cascader>
      </el-form-item>
      <el-form-item label="初始转注" prop="initialConversion">
        <el-select size="small" v-model="form.initialConversion" placeholder="请选择初始转注">
          <el-option
              v-for="item in $store.state.initial_conversion_options"
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
    <el-table
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          fixed="left"
          min-width="100"
          prop="fullName"
          label="姓名">
      </el-table-column>
      <el-table-column
          min-width="260"
          label="级别-专业-初/转">
        <template #default="{row}">
          <el-tag size="mini" disable-transitions v-if="row.listCertificates.length === 0" type="info">暂无证件
          </el-tag>
          <span v-else style="white-space:pre-line;">
            <span v-for="item in row.listCertificates" :key="item.id">
              {{ item.levelMajor[0] }}/{{ item.levelMajor[1] }}
              &nbsp;-&nbsp;
              <el-tag size="mini" disable-transitions v-if="item.initialConversion === null" type="info">无</el-tag>
              <span v-else>
                {{ $valueToLabel(item.initialConversion, $store.state.initial_conversion_options) + "\n" }}
              </span>
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
          width="300"
          label="人才证件">
        <template #default="{row}">
          <el-tag size="mini" type="info" v-if="row.listTalentCertificates && row.listTalentCertificates.length === 0">
            暂无证件
          </el-tag>
          <span v-else v-for="item in row.listTalentCertificates" :key="item.talentCertificatesId">
            <el-tag effect="dark" size="mini" style="margin: 3px">
              {{ $valueToLabel(item.certificatesType, $store.state.certificates_category_options) }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
          label="三类人员">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.classThreePersonnel, $store.state.class_three_personnel_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="人才状态">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.talentStatus, $store.state.talent_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template #default="{row}">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row)">去向详情
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
  </div>
</template>

<script>

export default {
  name: 'LibCertificate',
  components: {},
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '姓名',
          key: 'address'
        },
        {
          title: '级别-专业-初/转',
          key: 'address'
        },
        {
          title: '人才证件',
          key: 'address'
        },
        {
          title: '三类人员',
          key: 'address'
        },
        {
          title: '人才状态',
          key: 'address'
        },
        {
          title: '录入人',
          key: 'address'
        },
        {
          title: '录入时间',
          key: 'address'
        },
      ],
      list: [],
      loading: false,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        fullName: '',
        status: null,
        creatorId: null,
        date: [],
        levelMajor: '',
        initialConversion: '',
      },
      rules: {
        fullName: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        date: [{required: false, trigger: 'blur'}],
        levelMajor: [{required: false, trigger: 'blur'}],
        initialConversion: [{required: false, trigger: 'blur'}],
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
        const res = await this.$http.post('/talent-certificates/list', newForm)
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
    handleView(_row) {
      this.$router.push('/lib-certificate-view/' + _row.id)
    },
    cascaderClick(_type) {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
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
@import "../../../assets/css/common-el-input-inner-width";
</style>
