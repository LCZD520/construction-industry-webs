/**
* Created by Lv Cheng on 2022/6/16
* Notes 人才查询查看
*/
<template>
  <div class="talent-query-view">
    <el-form :model="form" v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input disabled v-model="form.fullName"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select disabled class="width-full" v-model="form.sex" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.sex_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地区">
            <el-input disabled v-model="this.$CodeToText[form.area]"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="社保">
            <el-input disabled v-model="this.$CodeToText[form.socialSecurity]"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input disabled v-model="form.telephoneNumber"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ">
            <el-input disabled v-model="form.qqNumber"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学历">
            <el-select class="width-full" disabled v-model="form.education" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.education_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称">
            <el-select class="width-full" disabled v-model="form.title" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.title_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="三类人员">
            <el-select class="width-full" disabled v-model="form.classThreePersonnel" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.class_three_personnel_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发证日期">
            <el-date-picker
                class="width-full"
                disabled
                v-model="form.issueCertTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="过期日期">
            <el-date-picker
                class="width-full"
                disabled
                v-model="form.continuingEducationDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="招标出场">
            <el-select class="width-full" disabled v-model="form.tenderExit" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.tender_exit_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证书状态">
            <el-select class="width-full" disabled v-model="form.certificateStatus" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.certificate_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才状态">
            <el-select class="width-full" disabled v-model="form.talentStatus" placeholder="请选择">
              <el-option
                  v-for="item in this.$store.state.talent_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人才要价">
            <el-input disabled v-model="form.talentPrice"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-select class="width-full" disabled v-model="form.creatorId">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入时间">
            <el-date-picker
                class="width-full"
                disabled
                v-model="form.gmtCreate"
                type="datetime"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="证书">
            <el-table
                size="mini"
                :data="form.listCertificates"
                stripe
                border
                :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
                :cell-style="{textAlign:'center'}"
                style="width: 100%">
              <el-table-column
                  min-width="180"
                  label="级别专业">
                <template slot-scope="scope">
                  <span style="white-space:pre-line;">
                    {{ scope.row.levelMajor[0] }}/{{ scope.row.levelMajor[1] }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="180"
                  label="初始转注">
                <template slot-scope="scope">
                  <span>
                    {{ $valueToLabel(scope.row.initialConversion, $store.state.initial_conversion_options) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                  min-width="180"
                  prop="issueCertTime"
                  label="发证时间">
              </el-table-column>
              <el-table-column
                  min-width="180"
                  prop="continuingEducationDate"
                  label="继续教育时间（默认3年）">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
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
            <el-input v-model="form.remark" disabled :rows="3" type="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="人才证件" name="first">
        <transition appear name="public">
          <TalentCertificate v-show="activeName === 'first'"/>
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
                namespace="talent-query" type="contract"/>
            <el-divider content-position="left">证件</el-divider>
            <ImagesUpload
                ref="upload2"
                @getCheckedList="(_list)=>{this.checkedList2 = _list}"
                namespace="talent-query" type="certificates"/>
            <el-divider content-position="left">转账凭证</el-divider>
            <ImagesUpload
                ref="upload3"
                @getCheckedList="(_list)=>{this.checkedList3 = _list}"
                namespace="talent-query" type="transfer-voucher"/>
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="申请转账" name="third">
        <transition appear name="public">
          <TransferApplication v-show="activeName === 'third'"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="人才回访" name="fourth">
        <transition appear name="public">
          <TalentVisit v-show="activeName === 'fourth'"/>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="后勤申请" name="fifth">
        <transition appear name="public">
          <LogisticsApplication v-show="activeName === 'fifth'" :logistics-type="1"/>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImagesUpload from "../../../components/image-upload/ImagesUpload";
import TalentCertificate from "./talent-query-view/TalentCertificate";
import LogisticsApplication from "./talent-query-view/logistics-application/LogisticsApplication";
import TalentVisit from "./talent-query-view/talent-visit/TalentVisit";
import TransferApplication from "./talent-query-view/transfer-application/TransferApplication";
// import _ from 'lodash'
import JSzip from 'jszip'
import {saveAs} from 'file-saver'

export default {
  name: 'TalentQueryView',
  components: {TransferApplication, TalentVisit, LogisticsApplication, TalentCertificate, ImagesUpload},
  data() {
    return {
      visible: false,
      visible2: false,
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      isShowDetail: false,
      form: {
        "talentId": null,
        "fullName": '',
        "sex": null,
        "area": '',
        "socialSecurity": '',
        "telephoneNumber": '',
        "qqNumber": '',
        "education": null,
        "title": null,
        "classThreePersonnel": null,
        "issueCertTime": null,
        "continuingEducationDate": null,
        "tenderExit": null,
        "certificateStatus": null,
        "talentStatus": 1,
        "talentPrice": undefined,
        "talentPriceNumber": undefined,
        "numberUnit": null,
        "remark": '',
        "listCertificates": []
      },
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
            let rootFolder = zip.folder(`人才查询-${this.form.fullName}`)
            if (typeSets.has('contract')) {
              rootFolder.folder('合同')
            }
            if (typeSets.has('certificates')) {
              rootFolder.folder('证件')
            }
            if (typeSets.has('transfer-voucher')) {
              rootFolder.folder('转账凭证')
            }
            res.data.forEach(item => {
              const base64Str = item.base64Str
              if (item.type === 'contract') {
                rootFolder.folder('合同').file(item.name, base64Str, {base64: true})
              }
              if (item.type === 'certificates') {
                rootFolder.folder('证件').file(item.name, base64Str, {base64: true})
              }
              if (item.type === 'transfer-voucher') {
                rootFolder.folder('转账凭证').file(item.name, base64Str, {base64: true})
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
              let filename = `人才查询-${this.form.fullName}.zip`;
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
      this.$http.get('/talent/detail/' + _id).then(res => {
        if (res.status && res.data !== null) {
          this.form = res.data
          this.form.listCertificates.forEach(item => {
            item.levelMajor = JSON.parse(item.levelMajor)
          })
        }
      })
    },
    handleClick() {

    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
      this.visible2 = true
    },
    handleDelete(_index, _row) {
      console.log(_index, _row)
      this.$confirm('确定要删除这条记录吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确定删除!'
        });
      }).catch(() => {
      })
    }
  },
  watch: {
    checkedList(newValue) {
      console.log(newValue)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";
</style>
