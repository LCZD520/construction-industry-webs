/**
* Created by Lv Cheng on 2022/6/17
* Notes 图片上传查看
*/
<template>
  <div class="images-upload-view">
    <div style="margin: 15px 0;"></div>
    <el-button size="small" type="primary" v-throttle="downLoadImages">下载图片</el-button>
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
          :file-list="fileList"
          :before-upload="beforeUpload"
          :auto-upload="false">
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail"
               :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview"
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
import JSzip from "jszip";
import {saveAs} from 'file-saver'

export default {
  name: 'ImagesUploadView',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
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
    rootFolderName: {
      type: String,
      required: false,
      default: '图片'
    },
    subDirs: {
      type: Set,
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
    this.fileList = this.files
    this.fileList.forEach(k => {
      this.sourceImageObjects.push({
        src: k.url,
        'data-source': k.url
      })
    })
  },
  methods: {
    async downLoadImages() {
      if (this.list.length === 0) {
        this.$message.warning('请选择至少一张图片')
        return
      }
      try {
        const res = await this.$http.post('/file/download', {
          listIds: this.list
        })
        if (res && res.status) {
          const zip = new JSzip();
          let typeSets = new Set();
          res.data.forEach(item => typeSets.add(item.type))
          let intersect = new Set([...this.subDirs].filter(x => typeSets.has(x.type)))
          console.log(intersect, "intersect")
          let rootFolder = zip.folder(`${this.rootFolderName}-${this.name}`)
          intersect.forEach(item => {
            rootFolder.folder(item.folder)
          })
          res.data.forEach(item => {
            const base64Str = item.base64Str
            const obj = Array.from([...intersect]).find(sub => sub.type === item.type)
            if (obj && obj.folder && obj.folder !== '') {
              rootFolder.folder(obj.folder).file(item.name, base64Str, {base64: true})
            }
          })
          // 生成zip文件并下载
          zip.generateAsync({
            type: 'blob',// 压缩类型
            compression: "DEFLATE", // STORE：默认不压缩 DEFLATE：需要压缩
            compressionOptions: {
              level: 9 // 压缩等级1~9 1压缩速度最快，9最优压缩方式
            }
          }).then(res => {
            // 下载的文件名
            let filename = `${this.rootFolderName}-${this.name}.zip`;
            saveAs(res, filename)
          })
          this.$emit('closeDialog')
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
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

/deep/ .el-upload--picture-card {
  display: none;
}
</style>
