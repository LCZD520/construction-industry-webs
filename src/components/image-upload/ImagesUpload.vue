/**
* Created by Lv Cheng on 2022/6/17
* Notes 人才查询查看-图片上传
*/
<template>
  <div class="images-upload">
    <div style="margin: 15px 0;"></div>
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
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>-->
        <div slot="file" slot-scope="{file}">
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span
                class="el-upload-list__item-preview"
                @click="handlePreview(file)">
              <el-button type="primary" size="mini" icon="el-icon-zoom-in" circle></el-button>
            </span>
          </span>
          <div
              style="width: 100%;background: #fff;border-top: 1px solid #c0ccda;position:absolute;margin-left: 5px;bottom: 0;text-align: left">
            <el-checkbox v-model="list" :label="file.id">
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
  name: 'ImagesUpload',
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
      checkAll: false,
      isIndeterminate: true
    }
  },
  created() {
    this.getImageList()
  },
  methods: {
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
      if (file.id) {
        const res = await this.$http.delete('/picture/delete/' + file.id)
        if (res.status) {
          this.$message.success(res.message)
          let index = this.fileList.findIndex(item => item.id === file.id)
          this.fileList.splice(index, 1)
          this.sourceImageObjects.splice(index, 1)
          return
        }
        this.$message.error(res.message)
      }
    },
    handleRemoveBatch(listIds) {
      listIds.forEach(id => {
        let index = this.fileList.findIndex(item => item.id === id)
        if (index > -1) {
          this.fileList.splice(index, 1)
          this.sourceImageObjects.splice(index, 1)
        }
      })
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
      let length = this.uploadFileList.length
      if (length > 10) {
        this.$notify({
          title: '警告',
          message: '单次上传图片数限制为10',
          type: 'warning'
        })
        return
      }
      const noMatchImagesSuffix = ["image/jpeg", "image/png", "image/jpg"]
      const noMatchImages = []
      this.uploadFileList.forEach(item => {
        if (!noMatchImagesSuffix.includes(item.type)) {
          noMatchImages.push(item.name)
        }
      })
      if (noMatchImages.length > 0) {
        this.$notify({
          dangerouslyUseHTMLString: true,
          title: '仅支持jpeg、png、jpg格式的图片文件',
          message: `${noMatchImages.map((item, index) => index + 1 + '：' + item + '<br>').toString().replaceAll(',', '')}`,
          type: 'warning',
          duration: 0
        })
        return
      }
      this.$refs.upload.submit()
      return this.$http.post(`/file/upload/${this.namespace}/${this.type}/${this.resourceId}`
          , this.formData).then(res => {
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
      this.$emit("getCheckedList", newValue)
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
