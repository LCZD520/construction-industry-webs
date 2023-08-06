/**
* Created by Lv Cheng on 2022/6/17
* Notes 图片上传2
*/
<template>
  <div class="images-upload2">
    <div style="margin: 15px 0;"></div>
    <el-button size="small" type="primary" v-throttle="deleteImages">删除图片</el-button>
    <br><br>
    <div>
      <el-upload
          class="upload-demo"
          ref="upload"
          list-type="picture-card"
          action=" "
          drag
          accept="image/png, image/jpeg, image/jpg"
          multiple
          :http-request="uploadFile"
          :on-change="onChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">可将一个或多个文件拖拽到此处，或<em>点击上传</em></div>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail"
               :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview"
                  @click="handlePreview(file)">
              <el-button type="primary" size="mini" icon="el-icon-zoom-in" circle></el-button>
            </span>
            <span class="el-upload-list__item-delete"
                  @click="handleRemove(file)">
              <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
            </span>
          </span>
          <div
              style="width: 100%;background: #fff;border-top: 1px solid #c0ccda;position:absolute;margin-left: 5px;bottom: 0;text-align: left">
            <el-checkbox v-model="list" :label="file.url">
              {{ file.name.slice(22) }}
            </el-checkbox>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import {api as viewerApi} from "v-viewer"

export default {
  name: 'ImagesUpload2',
  components: {},
  props: {
    namespace: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    files: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      list: [],
      fileList: [],
      sourceImageObjects: [],
      resourceId: this.$route.query.id / 1,
      formData: new FormData(),
      maxFileLength: 1,
      uploadFileList: [],
    }
  },
  created() {
    console.log('imageUpload2Created')
    // this.getImageList()
    this.fileList = this.files
    this.fileList.forEach(k => {
      this.sourceImageObjects.push({
        src: k.url,
        'data-source': k.url
      })
    })
  },
  methods: {
    deleteImages() {
      if (this.list.length === 0) {
        this.$message.warning('请选择至少一张图片')
        return
      }
      this.list.forEach(url => {
        const index = this.fileList.findIndex(item => item.url === url);
        if (index > -1) {
          this.fileList.splice(index, 1)
          this.sourceImageObjects.splice(index, 1)
        }
      })
    },
    async getImageList() {
      const res = await this.$http.get('/picture/list', {
        params: {
          namespace: this.namespace,
          type: this.type,
          resourceId: this.resourceId
        }
      })
      if (res.status && res.data !== null) {
        this.fileList = res.data
        this.fileList.forEach(k => {
          this.sourceImageObjects.push({
            src: k.url,
            'data-source': k.url
          })
        })
      }
    },
    onChange(_file, _fileList) {
      let that = this
      this.uploadFileList.push(_file.raw)
      let length = _fileList.length;
      this.maxFileLength = Math.max(length, this.maxFileLength)
      setTimeout(() => {
        if (this.maxFileLength !== length) {
          return
        }
        that.uploadFileList.forEach(k => {
          that.formData.append('files', k)
        })
        this.submitUpload()
      }, 0)
    },
    beforeUpload() {
      //
    },
    async handleRemove(file) {
      let index = this.fileList.findIndex(item => item.url === file.url)
      if (index > -1) {
        this.fileList.splice(index, 1)
        this.sourceImageObjects.splice(index, 1)
      }
    },
    handlePreview(_file) {
      let index = this.sourceImageObjects.findIndex(k => k.src === _file.url) | 0
      viewerApi({
        options: {
          zIndex: 20016,
          toolbar: true,
          url: 'data-source',
          initialViewIndex: index
        },
        images: this.sourceImageObjects
      })
    },
    uploadFile() {

    },
    submitUpload() {
      this.$refs.upload.submit()
      let length = this.uploadFileList.length
      return this.$http.post(`/temp-file/upload`, this.formData).then(res => {
            if (res.status) {
              this.$message.success('上传成功')
              if (res.data !== null && res.data.length > 0) {
                let arr = res.data.slice(-length)
                this.fileList = this.fileList.concat(arr)
                this.$refs.upload.clearFiles()
                this.uploadFileList = []
                this.sourceImageObjects = []
                this.formData = new FormData()
              }
              this.fileList.forEach(k => {
                this.sourceImageObjects.push({
                  src: k.url,
                  'data-source': k.url
                })
              })
            }
          }
      ).catch(res => {
        console.log(res)
      })
    },
  },
  watch: {
    list(newValue) {
      console.log(newValue)
      // this.$emit("getCheckedList", newValue)
    },
    fileList(newValue) {
      this.$emit("changeImageList", newValue)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/common-el-upload";

.el-checkbox {
  display: flex;
}

/deep/ .el-checkbox__input {
  margin-top: 3px;
}

/deep/ .el-checkbox__label {
  width: 130px;
  margin-top: 0;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
