/**
* Created by Lv Cheng on 2022/6/21
* Notes 系统公告编辑
*/
<template>
  <div class="system-notice-edit">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input size="small" placeholder="请输入标题" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="启用">
        <el-radio-group v-model="form.name">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor
            ref="editor"
            @save="saveDoc"
            @change="updateDoc"
            @imgAdd="addImages"
            @imgDel="deleteImages"/>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-plus" type="primary" size="small">
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
import {mavonEditor} from 'mavon-editor'
import "mavon-editor/dist/css/index.css";
export default {
  name: 'SystemNoticeEdit',
  components: {mavonEditor},
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    /**
     * 保存文档
     * @param value
     * @param render
     */
    saveDoc(value, render) {
      console.log("保存文档");
      console.log(value)
      console.log(render)
    },
    /**
     * 更新文档
     * @param value
     */
    updateDoc(value) {
      console.log(value)
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
.system-notice-edit{
  margin: 0 100px;
}
</style>
