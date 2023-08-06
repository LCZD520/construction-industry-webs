/**
* Created by Lv Cheng on 2022/6/19
* Notes 学历提升查看
*/
<template>
  <div class="education-promotion-view">
    <el-form size="small" disabled v-show="isShowDetail" label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-radio-group v-model="form.customerType">
              <el-radio
                  @change="val=> val === 2 ? form.principal = '' : ''"
                  v-for="item in this.$store.state.title_customer_type_options"
                  :key="item.value"
                  :label="item.value">{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input
                clearable
                placeholder=""
                v-model.trim="form.customerName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.customerType === 1">
          <el-form-item label="负责人">
            <el-input clearable placeholder="" v-model.trim="form.principal"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话">
            <el-input clearable placeholder="" v-model.trim="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="评审人员信息">
        <el-table
            size="mini"
            :data="form.listAssessors"
            stripe
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              min-width="180"
              v-for="item in columns"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
          </el-table-column>
          <el-table-column
              min-width="180"
              prop="evaluationStatus"
              label="人员状态">
            <template scope="{row}">
              {{ $valueToLabel(row.evaluationStatus, $store.state.title_evaluation_status_options) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template #default="{row}">
              <el-form :disabled="false">
                <el-button
                    style="padding: 5px"
                    size="mini"
                    type="primary"
                    @click="previewImage(row)">人员图片
                </el-button>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-input size="small" :value="this.$valueToLabel(form.creatorId,$store.state.user_options)"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入时间">
            <el-date-picker
                class="width-full"
                size="small"
                v-model="form.gmtCreate"
                type="datetime"
                placeholder="">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select class="width-full" size="small" v-model="form.status">
              <el-option
                  v-for="item in $store.state.enterprise_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="10">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
        <el-button icon="el-icon-edit" type="primary" size="small" v-throttle="updateRemarks">
          编辑备注
        </el-button>
      </el-col>
      <el-col :span="10">
        <el-switch
            v-model="isShowDetail"
            inactive-text="显示业务信息">
        </el-switch>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <el-form label-width="100px">
          <el-form-item label="备注">
            <el-input disabled :rows="3" type="textarea" :value="form.remark">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="评审订单" name="first">
        <EducationPromotionOrder/>
      </el-tab-pane>
      <el-tab-pane label="图片上传" name="second">
        <transition appear name="public">
          <div v-show="activeName === 'second'">
            <el-button type="primary" size="small" v-throttle="handleDownLoadBatch">下载图片</el-button>
            <el-button type="primary" size="small" v-throttle="handleDeleteBatch">删除图片</el-button>
            <el-divider content-position="left">合同</el-divider>
            <ImagesUpload
                ref="upload1"
                @getCheckedList="(_list)=>{this.checkedList1 = _list}"
                namespace="education-promotion" type="contract"/>
            <el-divider content-position="left">证件</el-divider>
            <ImagesUpload
                ref="upload2"
                @getCheckedList="(_list)=>{this.checkedList2 = _list}"
                namespace="education-promotion" type="certificates"/>
            <el-divider content-position="left">其他</el-divider>
            <ImagesUpload
                ref="upload3"
                @getCheckedList="(_list)=>{this.checkedList3 = _list}"
                namespace="education-promotion" type="other"/>
          </div>
        </transition>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
        :close-on-click-modal="false"
        width="70%" title="评审人员图片"
        :before-close="beforeClose"
        :visible.sync="imageVisible">
      <div class="dialog-wrapper" style="height: 468px">
        <el-scrollbar style="height: 100%">
          <div class="dialog-content" style="margin-right: 10px">
            <ImagesUploadView
                ref="upload"
                v-if="imageVisible"
                @closeDialog="imageVisible = false"
                :files="listImages"
                namespace="education-promotion"
                type="assessor"
                :name="name"
                :root-folder-name="'学历提升'"
                :sub-dirs="subDirs"/>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <el-dialog
        title="编辑备注"
        :close-on-click-modal="false"
        width="30%"
        :before-close="()=>this.remarksVisible = false"
        :visible.sync="remarksVisible">
      <div class="dialog-wrapper" style="height: auto">
        <el-input type="textarea" resize="vertical"
                  v-model.trim="remarks"
                  :rows="5"
                  show-word-limit maxlength="100"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remarksVisible = false">取 消</el-button>
        <el-button type="primary" v-throttle="confirmEditRemarks">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EducationPromotionOrder from "./education-promotion-view/EducationPromotionOrder";
import JSzip from 'jszip'
import {saveAs} from 'file-saver'
import ImagesUpload from "../../../components/image-upload/ImagesUpload";
import ImagesUploadView from "../../../components/image-upload-view/ImagesUploadView";

export default {
  name: 'EducationPromotionView',
  components: {ImagesUploadView, EducationPromotionOrder, ImagesUpload},
  data() {
    return {
      isShowDetail: false,
      remarksVisible: false,
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      subDirs: new Set([
        {type: 'assessor', folder: '评审人员'},
      ]),
      form: {
        customerType: null,
        customerName: '',
        principal: '',
        telephoneNumber: '',
        listAssessors: []
      },
      columns: [
        {
          title: '姓名',
          key: 'fullName'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '身份证',
          key: 'identityCard'
        },
        {
          title: '联系电话',
          key: 'telephoneNumber'
        },
        {
          title: '原始学历',
          key: 'originalEducation'
        },
        {
          title: '申报学校',
          key: 'applicationSchool'
        },
        {
          title: '学制',
          key: 'educationalSystem'
        },
        {
          title: '专业',
          key: 'major'
        },
        {
          title: '提升学历',
          key: 'improveEducation'
        },
        {
          title: '代办金额',
          key: 'agencyAmount'
        },
      ],
      visible: false,
      listImages: [],
      imageVisible: false,
      name: '',
      remarks: '',
    }
  },
  created() {
    this.$route.query.id && this.getDetailById(this.$route.query.id / 1)
  },
  methods: {
    async updateRemarks() {
      this.remarksVisible = true
      this.remarks = this.form.remark
    },
    async confirmEditRemarks() {
      let id = this.$route.query.id / 1
      try {
        const res = await this.$http.put('/education-promotion/update-remarks', {
          id,
          remark: this.remarks
        })
        if (res && res.status) {
          this.$message.success(res.message)
          this.remarksVisible = false
          this.getDetailById(id)
          return
        }
        this.$message.error(res.message)
      } catch (e) {
        console.log(e)
      }
    },
    beforeClose() {
      this.imageVisible = false
    },
    /**
     * 获取已选图片id
     */
    getCheckedList() {
      return this.checkedList1
          .concat(this.checkedList2)
          .concat(this.checkedList3);
    },
    /**
     * 批量下载文件
     */
    async handleDownLoadBatch() {
      const arr = this.getCheckedList()
      if (arr.length > 0) {
        try {
          const res = await this.$http.post('/file/download', {
            listIds: arr
          })
          if (res && res.status) {
            const zip = new JSzip();
            let typeSets = new Set();
            res.data.forEach(item => typeSets.add(item.type))
            let rootFolder = zip.folder(`学历提升-${this.form.customerName}`)
            if (typeSets.has('contract')) {
              rootFolder.folder('合同')
            }
            if (typeSets.has('certificates')) {
              rootFolder.folder('证件')
            }
            if (typeSets.has('other')) {
              rootFolder.folder('其他')
            }
            res.data.forEach(item => {
              const base64Str = item.base64Str
              if (item.type === 'contract') {
                rootFolder.folder('合同').file(item.name, base64Str, {base64: true})
              }
              if (item.type === 'certificates') {
                rootFolder.folder('证件').file(item.name, base64Str, {base64: true})
              }
              if (item.type === 'other') {
                rootFolder.folder('其他').file(item.name, base64Str, {base64: true})
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
              let filename = `学历提升-${this.form.customerName}.zip`;
              saveAs(res, filename)
            })
            return
          }
          this.$message.error(res.message)
        } catch (e) {
          console.log(e)
        }
        return
      }
      this.$message.warning('至少选择一张图片！')
    },
    /**
     * 批量删除文件
     */
    async handleDeleteBatch() {
      const arr = await this.getCheckedList()
      if (arr.length > 0) {
        try {
          const res = await this.$http.post('/picture/talent/delete-batch', {
            listIds: arr
          })
          if (res && res.status) {
            this.$nextTick(() => {
              this.$refs.upload1.handleRemoveBatch(this.checkedList1)
              this.$refs.upload2.handleRemoveBatch(this.checkedList2)
              this.$refs.upload3.handleRemoveBatch(this.checkedList3)
            })
            this.$message.success(res.message)
            return
          }
          this.$message.success(res.message)
        } catch (e) {
          console.log(e)
        }
        return
      }
      this.$message.warning('至少选择一张图片！')
    },
    /**
     * 获取学历提升详情
     * @param _id
     */
    getDetailById(_id) {
      this.$http.get('/education-promotion/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listAssessors.forEach(item => item.agencyAmount = item.agencyAmount.toFixed(2))
          console.log(this.form, "form")
          this.$store.dispatch('educationPromotion/updateEducationPromotionDetail', this.form)
        }
      })
    },
    previewImage(row) {
      this.name = row.fullName
      this.listImages = row.listImages
      this.imageVisible = true
    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.education-promotion-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
