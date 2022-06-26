/**
* Created by Lv Cheng on 2022/6/21
* Notes 系统公告添加
*/
<template>
  <div class="system-notice-add">
    <el-form :rules="rules" ref="form" :model="form" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input size="small" placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="启用" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor
            v-model="form.content"
            style="height:300px;"
            ref="editor"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="handleSave">
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'

export default {
  name: 'SystemNoticeAdd',
  components: {quillEditor},
  data() {
    return {
      form: {
        title: '',
        enabled: null,
        content: '',
      },
      rules: {
        title: [
          {required: true, message: '请输入公告标题', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '不能为空内容', trigger: 'blur'}
        ],
        enabled: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    handleSave() {
      console.log(this.form)
      this.$axios.post('/api/notice/insert', this.form).then(res => {
        console.log(res.data)
        if (res.status && res.data.code === '00000') {
          this.$message.success(res.data.message)
          this.$refs['form'].resetFields()
          this.$refs.editor.d_value = ''
          this.$router.back()
        }
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 保存文档
     * @param value
     * @param render
     */
    saveDoc(value, render) {
      console.log("保存文档");
      this.form.content = render
    },
    /**
     * 更新文档
     * @param value
     * @param render
     */
    updateDoc(value, render) {
      console.log(value)
      this.form.content = render
    },
    /**
     * 上传图片
     * @param pos
     * @param $file
     */
    addImages(pos, $file) {
      console.log(pos, $file)

      let formData = new FormData();
      formData.append('files', $file)

      console.log(this.$refs.editor)
      this.$http.post("/api/file/upload", formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
        },
      }).then(res => {
        console.log(res)
        res.data.data.forEach(k => {
          this.$refs.editor.$img2Url(pos, k);
        })
      }).catch(res => {
        console.log(res)
      })
    },
    /**
     * 删除图片
     * @param filename
     */
    deleteImages(filename) {
      console.log("删除文件:" + filename)
    }
  }
}
</script>

<style scoped lang="less">
.system-notice-add {
  margin: 0 100px;
}
</style>
