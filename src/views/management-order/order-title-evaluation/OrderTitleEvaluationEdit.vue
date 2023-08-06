/**
* Created by Lv Cheng on 2022/6/19
* Notes 职称评审订单编辑
*/
<template>
  <div class="order-title-evaluation-edit">
    <el-form label-position="right" size="small">
      <el-form-item label="证书专业">
        <el-input style="width: 300px;" placeholder="请输入关键字进行筛选"/>
        <div style="margin-left: 10px;display: inline-block">
          <el-button icon="el-icon-check" v-if="form.orderStatus ===2" type="primary">勾选通过
          </el-button>
          <el-button icon="el-icon-close" v-if="form.orderStatus ===2" type="primary">勾选不通过</el-button>
          <el-button icon="el-icon-delete" type="danger">勾选删除</el-button>
        </div>
      </el-form-item>
      <el-table
          size="small"
          ref="table"
          @row-click="handleRowClick"
          :data="list"
          stripe
          max-height="500"
          border
          @selection-change="selectionChange"
          :header-cell-style="{textAlign:'left',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            :min-width="item.width"
            v-for="item in columns"
            :key="item.key"
            :prop="item.key"
            :label="item.title">
        </el-table-column>
        <el-table-column
            fixed="right"
            min-width="210"
            label="代办金额">
          <template scope="scope">
            <div @click.stop>
              <el-input-number
                  :min="0"
                  :precision="2"
                  @change="inputChange(scope.$index)"
                  controls-position="right"
                  v-model.trim="scope.row.agencyAmount"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            min-width="210"
            label="评审费用">
          <template scope="scope">
            <div @click.stop>
              <el-input-number
                  :min="0"
                  :precision="2"
                  @focus.stop=""
                  @change="inputChange(scope.$index)"
                  controls-position="right"
                  v-model.trim="scope.row.evaluationFee"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="人员状态">
          <template #default="{row}">
            {{ $valueToLabel(row.orderStatus, $store.state.common_order_status_options) }}
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form-item label="" label-width="0">
        <el-button icon="el-icon-plus" type="primary" v-throttle="handleSubmit">提交</el-button>
        <el-button icon="el-icon-refresh" v-throttle="reset">重置</el-button>
        <el-button icon="el-icon-back" @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OrderTitleEvaluationEdit',
  components: {},
  data() {
    return {
      list: [],
      selectionList: [],
      columns: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '评审专业',
          key: 'evaluationMajor'
        },
        {
          title: '评审职称',
          key: 'titleEvaluation'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard',
          width: '180',
        },
        {
          title: '学历',
          key: 'education'
        },
        {
          title: '毕业专业',
          key: 'graduationMajor'
        },
        {
          title: '证书性质',
          key: 'certificateNature'
        },
        {
          title: '鉴定方式',
          key: 'appraisalWay',
          width: '100',
        },
      ],
      form: {},
      listAssessors: [],
    }
  },
  created() {
    let id = this.$route.params.id / 1
    !isNaN(id) && this.getDetailById(id)
  },
  methods: {
    async getDetailById(id) {
      try {
        const res = await this.$http.get('/title-evaluation-order/detail/' + id)
        if (res.status) {
          this.list = res.data.listAssessors
        }
      } catch (e) {
        console.log(e)
      }
    },
    inputChange(index) {
      console.log(index)
    },
    async handleSubmit() {
      console.log(this.listAssessors)
      try {
        const res = await this.$http.put('/title-evaluation-order/update-assessor/'
            + this.$route.params.id / 1, this.listAssessors)
        if (res.status) {
          this.$message.success(res.message)
          this.$router.back()
          return
        }
        res.message != null && this.$message.error(res.message)
        this.$notify.error({
          title: '错误',
          message: res.data != null && res.data.toString()
        })
      } catch (e) {
        console.log(e)
      }
    },
    reset() {
      this.$refs.table.clearSelection()
      let id = this.$route.params.id / 1
      !isNaN(id) && this.getDetailById(id)
    },

    tableRowClassName({row}) {
      return row.className;
    },
    handleRowClick(row) {
      this.$refs.table.toggleRowSelection(row)
      row.className === "highlight" ? row.className = "unChecked" : "highlight"
    },
    selectionChange(selection) {
      this.selectionList = selection
      this.listAssessors = []
      this.selectionList.forEach(item => {
        let {id, agencyAmount, evaluationFee} = item
        let newObj = {
          id, agencyAmount, evaluationFee
        }
        this.listAssessors.push(newObj)
      })
    },
  },
  watch: {
    selectionList(newVal, oldVal) {
      newVal.forEach(k => {
        k.className = 'highlight'
      })
      if (newVal.length === 0) {
        oldVal.forEach(k => {
          k.className = 'unChecked'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.order-title-evaluation-edit {
  margin: 0 50px;
}
</style>
