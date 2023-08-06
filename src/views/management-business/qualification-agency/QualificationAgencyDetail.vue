/**
* Created by Lv Cheng on 2022/7/18
* Notes 资质代办详情
*/
<template>
  <div class="qualification-agency-detail">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办公司">
            <el-input disabled size="small" v-model="form.agencyCompany"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              prop="area"
              label="办理地区">
            <el-cascader
                size="small"
                disabled
                class="width-full"
                ref="cascaderArea"
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder=""
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled size="small" v-model="form.agencyAmount"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式">
            <el-input disabled size="small" v-model="form.paymentWay"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="代办资质">
        <el-input class="width-full" size="small" placeholder="" disabled
                  :value="form && form.agencyQualification
                  && JSON.parse(form.agencyQualification).join(',')">

        </el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="12">
        <el-button icon="el-icon-back" @click="$router.back()" size="small">
          返回
        </el-button>
        <el-button icon="el-icon-edit" type="primary" size="small">
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
            <el-input disabled :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="人才订单" name="first">
        <transition appear name="public">
          <TalentOrder
              v-show="activeName === 'first'"/>
        </transition>
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
                namespace="qualification-agency" type="contract"/>
            <el-divider content-position="left">证件</el-divider>
            <ImagesUpload
                ref="upload2"
                @getCheckedList="(_list)=>{this.checkedList2 = _list}"
                namespace="qualification-agency" type="certificates"/>
            <el-divider content-position="left">其他</el-divider>
            <ImagesUpload
                ref="upload3"
                @getCheckedList="(_list)=>{this.checkedList3 = _list}"
                namespace="qualification-agency" type="other"/>
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="代办入账" name="third">
        <transition appear name="public">
          <AgencyEntry v-show="activeName === 'third'"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="申请转账" name="fourth">
        <transition appear name="public">
          <TransferApplication
              v-show="activeName === 'fourth'"/>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import JSzip from 'jszip'
import {saveAs} from 'file-saver'
import ImagesUpload from "../../../components/image-upload/ImagesUpload";
import TransferApplication from "./qualification-agency-view/transfer-application/TransferApplication";
import TalentOrder from "./qualification-agency-view/talent-order/TalentOrder";
import AgencyEntry from "./qualification-agency-view/entry/AgencyEntry";

export default {
  name: 'QualificationAgencyDetail',
  components: {AgencyEntry, TalentOrder, TransferApplication, ImagesUpload},
  data() {
    return {
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      isShowDetail: false,
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      form: {
        // area: '',
        // paymentWay: '',
        // contacts: '',
        // agencyCompany: '',
        // enterpriseQualifications: null,
        // enterpriseStatus: 1,
        // listEnterpriseDemands: [],
        // qqNumber: null,
        // sex: null,
        // telephoneNumber: null,
        // remark: ''
      },
      tableData: [
        {}
      ],
    }
  },
  created() {
    this.getDetailById(this.$route.query.id / 1)
  },
  methods: {
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
            let rootFolder = zip.folder(`资质代办-${this.form.agencyCompany}`)
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
              let filename = `资质代办-${this.form.agencyCompany}.zip`;
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
     * 根据id获取详情
     * @param _id
     */
    getDetailById(_id) {
      this.$http.get('/qualification-agency/detail/' + _id).then(res => {
        // console.log(res)
        if (res.status && res.data !== null) {
          this.form = res.data
          this.$store.dispatch('qualificationAgency/updateQualificationAgencyDetail', res.data)
          // console.log(res.data.listOtherPersons)
          let listAgencyDemands = []
          listAgencyDemands.push(
              {
                type: '建造师',
                enType: 'constructor',
                list: []
              },
              {
                type: '工程师',
                enType: 'engineer',
                list: []
              },
              {
                type: '三类人员',
                enType: 'classThreePersonnel',
                list: []
              },
              {
                type: '技术工种',
                enType: 'technicalTypeOfWork',
                list: []
              })
          listAgencyDemands[0].list = res.data.listConstructors
          listAgencyDemands[1].list = res.data.listOtherPersons.filter(item => item.type === 1)
          listAgencyDemands[2].list = res.data.listOtherPersons.filter(item => item.type === 2)
          listAgencyDemands[3].list = res.data.listOtherPersons.filter(item => item.type === 3)
          // console.log(listAgencyDemands)
          listAgencyDemands.forEach(item => {
            item.list.forEach(sub => sub.levelMajorInitialConversion = JSON.parse(sub.levelMajorInitialConversion))
          })
          this.$store.dispatch('qualificationAgency/updateQualificationAgencyDemand', listAgencyDemands)
          // this.form.listEnterpriseDemands.forEach(item => {
          //   if (typeof item.levelMajorInitialConversion === 'string')
          //     item.levelMajorInitialConversion =
          //         JSON.parse(item.levelMajorInitialConversion)
          // })
        }
      })
    },
  },
  // beforeUpdate() {
  //   if (this.$refs.table !== null) {
  //     this.$refs.table.doLayout()
  //   }
  // }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";
</style>
