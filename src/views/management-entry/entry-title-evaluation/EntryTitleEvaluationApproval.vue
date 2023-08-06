/**
* Created by Lv Cheng on 2022/6/20
* Notes 职称评审入账审核
*/
<template>
  <div class="entry-title-evaluation-approval">
    <EntryTitleEvaluationView :edit="false"/>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="right">
      <el-form-item prop="adopt" label="审批">
        <el-radio-group v-model="form.adopt">
          <el-radio
              v-for="item in this.$store.state.bool4_options"
              :key="item.value"
              :label="item.value">{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批意见" prop="approvalOpinion">
        <el-input
            maxlength="100"
            show-word-limit
            :rows="3"
            type="textarea"
            v-model.trim="form.approvalOpinion">
        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" v-throttle="handleSubmit">
          提交
        </el-button>
        <el-button icon="el-icon-back" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EntryTitleEvaluationView from "./EntryTitleEvaluationView";

export default {
  name: 'EntryTitleEvaluationApproval',
  components: {EntryTitleEvaluationView},
  computed: {
    applyedAmount() {
      return this.form.listRecords
          .map(item => item.entryAmount).reduce((p, c) => {
            return p + c
          }, 0)
    },
    throughedAmount() {
      return this.form.listRecords
          .filter(item => item.applicationStatus === '财务审批通过')
          .map(item => item.entryAmount).reduce((p, c) => {
            return p + c
          }, 0)
    }
  },
  data() {
    return {
      form: {
        adopt: null,
        approvalOpinion: '',
      },
      rules: {
        adopt: [
          {required: true, message: '请选择审批', trigger: 'change'}
        ],
        approvalOpinion: [
          {required: false}
        ]
      },
    }
  },
  created() {

  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form)
          try {
            const res = await this.$http.put(`/title-evaluation-order-entry/audit/${this.$route.params.id}`, this.form)
            if (res && res.status) {
              this.$message.success(res.message)
              this.$router.back()
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
          return
        }
        this.$message.error('输入有误')
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.entry-title-evaluation-approval {
  margin: 0 100px;

  .width-full {
    width: 100%;
  }
}


.time {
  font-size: 14px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 4px;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
