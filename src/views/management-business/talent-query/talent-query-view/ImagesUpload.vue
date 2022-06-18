/**
* Created by Lv Cheng on 2022/6/17
* Notes 人才查询查看-图片上传
*/
<template>
  <div class="images-upload">
    <el-button type="primary" size="small">下载图片</el-button>
    <el-button type="primary" size="small">删除图片</el-button>
    <el-divider content-position="left">合同</el-divider>
    <!--    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
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
        <div class="el-upload__text">将一个或多个文件拖拽到此处，或<em>点击上传</em></div>
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>-->
        <div slot="file" slot-scope="{file}">
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-download" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </span>
      </span>
          <div
              style="width: 100%;background: #fff;border-top: 1px solid #c0ccda;position:absolute;bottom: 0;text-align: center">
            <el-checkbox label="复选框 C"></el-checkbox>
          </div>
        </div>
      </el-upload>
    </div>
    <el-divider content-position="left">证件</el-divider>
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
        <div class="el-upload__text">您可以将一个或多个文件拖拽到此处，或<em>点击上传</em></div>
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>-->
        <div slot="file" slot-scope="{file}">
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-download" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </span>
      </span>
          <div
              style="width: 100%;background: #fff;border-top: 1px solid #c0ccda;position:absolute;bottom: 0;text-align: center">
            <el-checkbox label="复选框 C"></el-checkbox>
          </div>
        </div>
      </el-upload>
    </div>
    <el-divider content-position="left">转账凭证</el-divider>
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
        <div class="el-upload__text">您可以将一个或多个文件拖拽到此处，或<em>点击上传</em></div>
        <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2M</div>-->
        <div slot="file" slot-scope="{file}">
          <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="primary" size="mini" icon="el-icon-download" circle></el-button>
        </span>
        <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </span>
      </span>
          <div
              style="width: 100%;background: #fff;border-top: 1px solid #c0ccda;position:absolute;bottom: 0;text-align: center">
            <el-checkbox label="复选框 C"></el-checkbox>
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
  data() {
    return {
      // fileList: [],
      fileList: [
        {
          url: 'http://localhost:8848/uploads/3/12/5c3c843e86074bc7bbd613504deb4ba3_404.png'
        },
        {
          url: 'http://localhost:8848/uploads/0/7/000ab50a51854553ac42fac7f8bf78ab_empty-data.png'
        },
        {
          url: 'http://localhost:8848/uploads/4/2/512640c1a0fc406da0e068253ade225a_goods-param.jpg'
        },
        {
          url: 'http://localhost:8848/uploads/7/14/f25630b5b272481f9c725dd52c431111_sku.jpg'
        }
      ],
      sourceImageObjects: [],
      formData: new FormData(),
      maxFileLength: 1,
      uploadFileList: [],
      checkAll: false,
      isIndeterminate: true
    }
  },
  methods: {
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
      // console.log(11111111111)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(_file) {
      console.log(_file.url)
      let index = this.sourceImageObjects.findIndex(k => k.src === _file.url) | 1
      viewerApi({
        options: {
          toolbar: true,
          url: 'data-source',
          initialViewIndex: index
        },
        images: this.sourceImageObjects
      })
    },
    // eslint-disable-next-line no-unused-vars
    uploadFile(_file) {

    },
    submitUpload() {
      this.$refs.upload.submit()
      return this.$http.post("/api/file/upload", this.formData, {
        headers: {
          Authorization: localStorage.getItem("access_token")
        },
      }).then(res => {
        if (res.status) {
          this.$message.success('上传成功')
          this.$refs.upload.clearFiles()
          this.uploadFileList = []
          this.formData = new FormData()
          if (res.data.data.list.length > 0) {
            res.data.data.list.forEach(k => {
              this.fileList.push({
                name: '1111',
                url: k
              })
            })
          }
          this.fileList.forEach(k => {
            this.sourceImageObjects.push({
              src: k.url,
              'data-source': k.url
            })
          })
          // console.log(this.sourceImageObjects)
        }

      }).catch(res => {
        console.log(res)
      })
    },

    handleDownload(file) {
      console.log(file);
    },
    // handleCheckAllChange(val) {
    //   this.checkedCities = val ? cityOptions : [];
    //   this.isIndeterminate = false;
    // },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../../assets/css/common-el-upload";
</style>
