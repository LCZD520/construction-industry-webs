/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才查询
*/
<template>
  <div class="talent-query">
    <el-form
        ref="formData"
        inline
        :model="form">
      <el-form-item label="姓名" label-width="120px">
        <el-input size="small" v-model="form.newPassword" placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="地区" label-width="120px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择地区"
            :options="this.$provinceAndCityData"
            v-model="form.newPassword">
        </el-cascader>
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
      <el-form-item label="初始转注" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择初始转注">
          <el-option
              v-for="item in this.$store.state.initial_conversion_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="职称" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择职称">
          <el-option
              v-for="item in this.$store.state.title_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="社保" label-width="120px">
        <el-cascader
            size="small"
            clearable
            placeholder="请选择社保"
            :options="this.$provinceAndCityDataNull"
            v-model="form.newPassword">
        </el-cascader>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="三类人员" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择三类人员">
          <el-option
              v-for="item in this.$store.state.class_three_personnel_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="招标出场" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择招标出场">
          <el-option
              v-for="item in this.$store.state.tender_exit_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人才状态" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择人才状态">
          <el-option
              v-for="item in this.$store.state.talent_status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="录入人" label-width="120px">
        <el-select size="small" v-model="form.oldPassword" placeholder="请选择录入人">
          <el-option
              v-for="item in this.$store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="enableAdvancedSearch" label="录入日期" label-width="120px">
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
        <el-button v-if="enableAdvancedSearch" type="text" @click.stop="enableAdvancedSearch = false">收起</el-button>
        <el-button v-else type="text" @click.stop="enableAdvancedSearch = true">高级搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="split-line">
      <div class="split-line-left">
        <el-button icon="el-icon-plus" size="small" type="primary" @click.stop="$router.push('/talent-query-add')">录入人才
        </el-button>
      </div>
      <div class="split-line-right">共查询到 <b style="color: #409EFF">{{ pageInfo.total }}</b> 条记录</div>
    </div>
    <el-table
        :data="list"
        v-loading="loading"
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
          label="地区">
        <template slot-scope="scope">
          <span> {{ $CodeToText[scope.row.area] }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="120"
          label="招标出场">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.tenderExit, $store.state.tender_exit_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="社保">
        <template slot-scope="scope">
          <span> {{
              scope.row.socialSecurity === '000000' ? '无'
                  : $CodeToText[scope.row.socialSecurity]
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="人才状态">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.talentStatus, $store.state.talent_status_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="职称">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.title, $store.state.title_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="三类人员">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.classThreePersonnel, $store.state.class_three_personnel_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="100"
          label="录入人">
        <template slot-scope="scope">
          <span> {{ $valueToLabel(scope.row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="160"
          prop="gmtCreate"
          label="录入时间">
      </el-table-column>
      <el-table-column
          min-width="160"
          label="报价">
        <template slot-scope="scope">
          <span> {{ scope.row.talentPrice }}元&nbsp;/&nbsp;
            {{ scope.row.talentPriceNumber }}&nbsp;*&nbsp;
            {{ $valueToLabel(scope.row.numberUnit, $store.state.number_unit_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260">
        <template slot-scope="scope">
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'second')">图片
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">证件
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'first')">查看
          </el-button>
          <el-button
              size="mini"
              style="padding: 5px"
              type="primary"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <p style="height: 10px"></p>
          <el-button
              size="mini"
              v-if="true"
              style="padding: 5px"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'third')">转账
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fourth')">人才回访
          </el-button>
          <el-button
              style="padding: 5px"
              size="mini"
              type="primary"
              @click.stop="handleView(scope.$index, scope.row,'fifth')">后勤申请
          </el-button>
          <el-button
              style="padding: 5px"
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
  name: 'TalentQuery',
  components: {},
  data() {
    return {
      loading: false,
      enableAdvancedSearch: false,
      fileList: [],
      file: "",
      list: [],
      mapObj: {
        "专业": "major",
        "代办金额": "agencyAmount",
        "原始学历": "originalEducation",
        "姓名": "name",
        "学制": "educationalSystem",
        "性别": "gender",
        "提升学历": "improveEducation",
        "申报学校": "applicationSchool",
        "联系电话": "telephone",
        "身份证": "identityCard"
      },
      columns: [
        {
          title: '招标出场',
          key: 'tenderExit'
        },
        {
          title: '社保',
          key: 'socialSecurity'
        },
        {
          title: '人才状态',
          key: 'talentStatus'
        },
        {
          title: '职称',
          key: 'title'
        },
        {
          title: '三类人员',
          key: 'classThreePersonnel'
        },
        {
          title: '录入人',
          key: 'creatorId'
        },
        {
          title: '录入时间',
          key: 'gmtCreate'
        },
      ],
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
    this.getListTalents()
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
      this.file = file.raw;
      let reader = new FileReader()
      let _this = this
      // console.log(_this)
      reader.readAsArrayBuffer(this.file)
      reader.onload = function () {
        let buffer = reader.result
        let bytes = new Uint8Array(buffer)
        let length = bytes.byteLength
        let binary = ''
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let XLSX = require('xlsx')
        let wb = XLSX.read(binary, {
          type: 'binary'
        })
        let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        outdata.forEach(item => {
          let newObj = {}
          for (const itemKey in _this.mapObj) {
            newObj[_this.mapObj[itemKey]] = item[itemKey]
          }
          _this.list.push(newObj)
          // console.log(_this.list)
        })
      }
    },
    handleView(_index, _row, _activeTab) {
      // console.log(_index, _row)
      this.$router.push({
        path: '/talent-query-view',
        query: {
          activeTab: _activeTab,
          id: _row.id
        }
      })
    },
    getListTalents(_pageSize) {
      let url = ``
      if (undefined !== _pageSize) {
        url = `/talent/list?currentPage=${this.pageInfo.currentPage}&pageSize=${_pageSize}`
      } else {
        url = `/talent/list?currentPage=${this.pageInfo.currentPage}&pageSize=${this.pageInfo.pageSize}`
      }
      this.loading = true
      this.$http.get(url).then(res => {
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
      this.getListTalents()
    },
    /**
     * 改变页数
     */
    handleSizeChange(_pageSize) {
      this.getListTalents(_pageSize)
    },
    // eslint-disable-next-line no-unused-vars
    handleDelete(_index, _row) {
      // console.log(_index, _row)
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
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.$router.push('/talent-query-edit/' + _row.id)
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
