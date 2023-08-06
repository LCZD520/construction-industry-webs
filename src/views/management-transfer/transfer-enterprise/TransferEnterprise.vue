/**
* Created by Lv Cheng on 2022/6/9
* Notes 企业转账
*/
<template>
  <div class="transfer-enterprise">
    <el-form
        ref="form"
        inline
        :rules="rules"
        :model="form">
      <el-form-item label="申请日期" label-width="120px" prop="date">
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
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请人姓名" label-width="120px" prop="creatorId">
        <el-select size="small" v-model="form.creatorId" placeholder="请选择申请人姓名">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请状态" label-width="120px" prop="status">
        <el-select size="small" v-model="form.status" placeholder="请选择申请状态">
          <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" label-width="120px" prop="enterpriseName">
        <el-input size="small" v-model.trim="form.enterpriseName" placeholder="请输入企业名称">
        </el-input>
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
          prop="transferAmount"
          align="right"
          label="申请转账金额">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="申请人">
        <template #default="{row}">
          <span> {{ $valueToLabel(row.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="企业名称">
        <template #default="{row}">
          <span> {{ row.enterprise.enterpriseName }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="fundsPurpose"
          align="center"
          label="款项用途">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="applicationStatus"
          align="center"
          label="申请状态">
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          align="center"
          label="申请时间">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="{row}">
          <el-button
              v-if="$store.state.currentUser.listRoleIds.length>0
               && $store.state.currentUser.listRoleIds.includes(row.currentAuditRoleId)"
              size="mini"
              type="primary"
              @click.stop="handleAudit(row.id)">审批
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click.stop="handleView(row.id)">查看
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
  name: 'TransferEnterprise',
  components: {},
  data() {
    return {
      loading: false,
      list: [],
      statusOptions: [
        '已申请待审批',
        '一次审核审批通过',
        '一次审核审批不通过',
        '二次审核审批通过',
        '二次审核审批不通过',
        '财务审批通过',
        '财务审批不通过',
        '出纳审批通过',
        '出纳审批不通过',
      ],
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {
        date: [],
        creatorId: null,
        status: '',
        enterpriseName: '',
      },
      rules: {
        date: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
        enterpriseName: [{required: false, trigger: 'blur'}],
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
    this.getList()
  },
  methods: {
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
    },
    async getList(_pageSize) {
      const {pageSize, currentPage} = this.pageInfo
      try {
        const res = await this.$http.get('/enterprise-transfer/list', {
          params: {
            pageSize: _pageSize ? _pageSize : pageSize,
            currentPage
          }
        })
        if (res.status) {
          console.log(res)
          this.list = res.data.list
          this.pageInfo.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAudit(_id) {
      this.$router.push(`/transfer-enterprise-audit/${_id}`)
    },
    handleView(_id) {
      this.$router.push('/transfer-enterprise-view/' + _id)
    },
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的
      this.file = file.raw;
      let reader = new FileReader()
      let _this = this
      console.log(_this)
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
          console.log(_this.list)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
