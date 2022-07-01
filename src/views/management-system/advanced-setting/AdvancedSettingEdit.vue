/**
* Created by Lv Cheng on 2022/6/20
* Notes 高级设置编辑
*/
<template>
  <div class="advanced-setting-edit">
    <el-form label-width="120px" ref="form" :rules="rules" :model="form">
      <el-form-item label="名称" prop="configName">
        <el-input size="small" placeholder="请输入配置名称" v-model.trim="form.configName"/>
      </el-form-item>
      <el-form-item label="代码" prop="configCode">
        <el-input size="small" clearable placeholder="请输入配置代码" v-model.trim="form.configCode"/>
      </el-form-item>
      <el-form-item label="值" prop="configValue">
        <el-input size="small" clearable placeholder="请输入配置值" v-model.trim="form.configValue"/>
      </el-form-item>
      <el-form-item label="描述" prop="configDescription">
        <el-input size="small" clearable placeholder="请输入描述......"
                  type="textarea" :rows="3" maxlength="100"
                  show-word-limit
                  v-model.trim="form.configDescription"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="handleSubmit">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdvancedSettingEdit',
  components: {},
  data() {
    return {
      form: {
        advancedSettingId: null,
        configName: '',
        configCode: '',
        configValue: '',
        configDescription: '',
      },
      rules: {
        configName: [
          {required: true, message: '请输入配置名称', trigger: 'blur'},
        ],
        configCode: [
          {required: true, message: '请输入配置代码', trigger: 'blur'}
        ],
        configValue: [
          {required: true, message: '请输入配置值', trigger: 'blur'}
        ],
        configDescription: [
          {required: false, trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getAdvancedSettingById(this.$route.params.id / 1)
  },
  methods: {
    getAdvancedSettingById(_id) {
      this.$http.get('/advanced-setting/detail/' + _id).then(res => {
        if (res.status) {
          this.form = res.data
          return
        }
        this.$message.error(res.message)
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.put('/advanced-setting/update', this.form).then(res => {
            if (res.status) {
              this.$router.back()
              this.$message.success(res.message)
              return
            }
            this.$message.error(res.message)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.advanced-setting-edit {
  margin: 0 250px;
}
</style>
