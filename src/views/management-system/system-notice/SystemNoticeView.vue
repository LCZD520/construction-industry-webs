/**
* Created by Lv Cheng on 2022/6/21
* Notes 系统公告查看
*/
<template>
  <div class="system-notice-view">
    <el-form label-width="80px" label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="发布时间">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.gmtCreate"
                size="small"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-tag v-if="form.enabled!==null" effect="dark" :type="form.enabled ? 'success' : 'danger'">
              {{ form.enabled ? '启用' : '禁用' }}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{ form.title }}</span>
        </div>
        <div>
          内容
        </div>
      </el-card>
      <br>
      <el-form-item label=" ">
        <el-button size="small" icon="el-icon-back" @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SystemNoticeView',
  components: {},
  data() {
    return {
      form: {
        title: '',
        gmtCreate: null,
        enabled: null,
        content: '',
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.system-notice-view {
  margin: 0 100px;
}

.clearfix {
  text-align: center;
}
</style>
