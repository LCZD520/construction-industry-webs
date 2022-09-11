/**
* Created by Lv Cheng on 2022/7/29
* Notes
*/
<template>
  <div class="entry-talent-contract-approval">
    <EntryTalentContractView edit="edit"/>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="right" style="margin: 0 100px">
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
import EntryTalentContractView from "./EntryTalentContractView";

export default {
  name: 'EntryTalentContractApproval',
  components: {EntryTalentContractView},
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
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form)
          try {
            const res = await this.$http.put('/talent-entry-record/update/' + this.$route.params.id / 1, this.form)
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
            }
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

</style>
