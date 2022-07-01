/**
* Created by Lv Cheng on 2022/6/20
* Notes 高级设置添加
*/
<template>
  <div class="advanced-setting-add">
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
  name: 'AdvancedSettingAdd',
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
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('/advanced-setting/insert', this.form).then(res => {
            if (res.status) {
              this.$message.success(res.message)
              this.$router.back()
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
.advanced-setting-add {
  margin: 0 250px;
}
</style>
