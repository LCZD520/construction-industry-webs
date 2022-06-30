/**
* Created by Lv Cheng on 2022/6/21
* Notes 系统公告编辑
*/
<template>
  <div class="system-notice-edit">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input size="small" placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="启用">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
            v-model="form.content"
            style="height:300px;"
            ref="editor"/>
      </el-form-item>
      <el-form-item style="margin-top: 120px" label=" ">
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'

export default {
  name: 'SystemNoticeEdit',
  components: {
    quillEditor
  },
  data() {
    return {
      form: {
        id: '',
        title: '',
        enabled: null,
        content: '',
      },
    }
  },
  created() {
    this.getNoticeById(this.$route.query.id)
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      console.log(this.form)
      this.$axios.put('/api/notice/update', this.form).then(res => {
        console.log(res)
        if (res.status){
          this.$message.success(res.data.message)
          this.$router.back()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getNoticeById(_id) {
      this.$http('/notice/detail/' + _id).then(res => {
            if (res.data !== null) {
              this.form.content = res.data.content
              this.form.id = res.data.id
              this.form.title = res.data.title
              this.form.enabled = res.data.enabled
            }
          }
      ).catch(e => {
        console.log(e)
      })
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
    }
    ,
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
.system-notice-edit {
  margin: 0 100px;
}
</style>
