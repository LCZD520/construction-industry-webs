/**
* Created by Lv Cheng on 2022/6/9
* Notes 我的人才资源
*/
<template>
  <div class="my-talent-resources">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="级别专业" label-width="120px">
        <el-cascader
            size="small"
            clearable
            ref="cascader"
            @expand-change="cascaderClick"
            @visible-change="cascaderClick"
            :props="{ expandTrigger: 'hover'
                    ,value:'categoryName'
                    ,label:'categoryName'
                    ,checkStrictly:true
                    ,emitPath:false
                    ,children:'listCertificateCategory'}"
            placeholder="请选择级别专业"
            :options="this.$store.state.list_certificate_category"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item label="客户类型" label-width="120px">
        <el-select size="small" class="width-full" v-model="form.talentType" placeholder="请选择客户类型">
          <el-option
              v-for="item in this.$store.state.customer_type_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入时间" label-width="120px">
        <el-date-picker
            v-model="form.oldPassword"
            size="small"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary"
                   @click.stop="$router.push('/my-talent-resources-add')">添加
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        :cell-style="{textAlign:'center'}"
        style="width: 100%">
      <el-table-column
          fixed="left"
          prop="fullName"
          label="姓名">
      </el-table-column>
      <el-table-column
          min-width="260"
          label="级别-专业-初/转">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.listCertificates.length === 0" type="info">暂无证书
          </el-tag>
          <span v-else style="white-space:pre-line;">
            <span v-for="item in scope.row.listCertificates" :key="item.id">
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
          min-width="100"
          prop="telephoneNumber"
          label="电话号码">
      </el-table-column>
      <el-table-column
          min-width="100"
          label="客户类型">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.talentType === null" type="info">未选</el-tag>
          <span v-else> {{ $valueToLabel(scope.row.talentType, $store.state.customer_type_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="跟进情况">
        <template slot-scope="scope">
          <el-tag size="mini" disable-transitions v-if="scope.row.followUpSituation === null
            || scope.row.followUpSituation === ''" type="info">未填
          </el-tag>
          <span v-else>
            {{
              $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options)
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="210">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click.stop="handleDelete(scope.$index, scope.row)">删除
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
  </div>
</template>

<script>
export default {
  name: 'MyTalentResources',
  components: {},
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '一周内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '一个月内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    }
  },
  created() {
    this.getListTalentResources()
  },
  methods: {
    getListTalentResources(_pageSize) {
      let url = `/talent-resource/list`
      this.loading = true
      this.$http.get(url, {
        params: {
          currentPage: this.pageInfo.currentPage,
          pageSize: _pageSize ? _pageSize : this.pageInfo.pageSize,
          type: 'personal',
        }
      }).then(res => {
        console.log(res)
        if (null !== res.data) {
          this.pageInfo.total = res.data.total
          this.list = res.data.list
          this.list.forEach(item => {
            item.listCertificates.forEach(certificate => {
              certificate.levelMajor = JSON.parse(certificate.levelMajor)
            })
          })
        }
      })
      this.loading = false
    },
    /**
     * 表格翻页
     */
    handleCurrentChange() {
      this.getListTalentResources()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.getListTalentResources(_pageSize)
    },
    handleView(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/my-talent-resources-view/' + _row.id)
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/my-talent-resources-edit/' + _row.id)
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$message.success('删除' + _row.username)
    },
    cascaderClick() {
      let that = this
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            this.previousElementSibling.click()
            that.$refs.cascader.dropDownVisible = false
          }
        })
        document
            .querySelectorAll('.el-cascader-panel .el-radio')
            .forEach(el => {
              el.onclick = function () {
                that.$refs.cascader.dropDownVisible = false
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

