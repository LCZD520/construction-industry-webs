/**
* Created by Lv Cheng on 2022/6/9
* Notes 人才转账
*/
<template>
  <div class="transfer-talent">
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
      <el-form-item label="申请人" label-width="120px" prop="creatorId">
        <el-select size="small" v-model="form.creatorId" placeholder="请输入申请人姓名">
          <el-option
              v-for="item in $store.state.user_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人才名称" label-width="120px" prop="fullName">
        <el-input size="small" v-model.trim="form.fullName" placeholder="请输入人才名称">
        </el-input>
      </el-form-item>
      <el-form-item label="企业名称" label-width="120px" prop="enterpriseName">
        <el-input size="small" v-model.trim="form.enterpriseName" placeholder="请输入企业名称">
        </el-input>
      </el-form-item>
      <el-form-item label="申请状态" label-width="120px" prop="status">
        <el-select size="small" v-model="form.status" placeholder="请选择申请状态">
          <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" " label-width="120px">
        <el-button size="small" icon="el-icon-search" type="primary">搜 索</el-button>
        <el-button size="small" icon="el-icon-refresh-right">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
        style="width: 100%">
      <el-table-column
          min-width="180"
          align="right"
          prop="transferAmount"
          label="申请转账金额">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          prop="applicationStatus"
          label="申请状态">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="right"
          label="人才价格">
        <template #default="{row}">
          <span> {{ row.talent.talentPrice }}元&nbsp;/&nbsp;
            {{ row.talent.talentPriceNumber }}&nbsp;*&nbsp;
            {{ $valueToLabel(row.talent.numberUnit, $store.state.number_unit_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="人才余额">
        <template #default="{row}">
<!--                    {{ row.talent.enterpriseOffer }}-->
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="企业合同价">
        <template #default="{row}">
              <span> {{ row.talent.enterpriseOffer }}元&nbsp;/&nbsp;
            {{ row.talent.enterpriseOfferNumber }}&nbsp;*&nbsp;
            {{ $valueToLabel(row.talent.enterpriseOfferUnit, $store.state.number_unit_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="合同余额">
        <template #default="{row}">
          {{ row.talent && row.talent.contractBalance }}
        </template>
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
          label="人才姓名">
        <template #default="{row}">
          {{ row.talent.fullName }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="企业名称">
        <template #default="{row}">
          {{ row.talent && row.talent.enterpriseName }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="款项用途">
        <template #default="{row}">
          {{ $valueToLabel(row.fundsPurpose, $store.state.funds_purpose_options) }}
        </template>
      </el-table-column>
      <el-table-column
          min-width="180"
          prop="gmtCreate"
          align="center"
          label="申请时间">
      </el-table-column>
      <el-table-column
          min-width="180"
          align="center"
          label="企业录入人">
        <template #default="{row}">
          <span>  {{ $valueToLabel(row.talent.creatorId, $store.state.user_options) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="180">
        <template #default="{row}">
          <el-button
              v-if="$store.state.currentUser.listRoleIds.length>0 && '出纳审批通过'.includes(row.applicationStatus)"
              size="mini"
              type="primary"
              @click.stop="applyComplete(row.id)">申请完成
          </el-button>
          <el-button
              v-if="$store.state.currentUser.listRoleIds.length>0 && $store.state.currentUser.listRoleIds.includes(row.currentAuditRoleId)"
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
  name: 'TransferTalent',
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
      form: {
        date: [],
        creatorId: '',
        fullName: '',
        enterpriseName: '',
        status: '',
      },
      rules: {
        date: [{required: false, trigger: 'blur'}],
        creatorId: [{required: false, trigger: 'blur'}],
        fullName: [{required: false, trigger: 'blur'}],
        enterpriseName: [{required: false, trigger: 'blur'}],
        status: [{required: false, trigger: 'blur'}],
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
      this.getList()
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
        const res = await this.$http.get('/talent-transfer/list', {
          params: {
            pageSize: _pageSize ? _pageSize : pageSize,
            currentPage
          }
        })
        if (res.status) {
          this.list = res.data.list
          this.pageInfo.total = res.data.total
          console.log(this.list)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleView(_id) {
      this.$router.push(`/transfer-talent-view/${_id}`)

    },
    handleAudit(_id) {
      this.$router.push(`/transfer-talent-audit/${_id}`)
    },
    applyComplete() {
      this.$message.info('暂未开放')
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-table-pagination";
@import "../../../assets/css/common-el-table-scrollbar";
@import "../../../assets/css/common-el-input-inner-width";
</style>
