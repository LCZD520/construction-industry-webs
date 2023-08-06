/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质收购查看
*/
<template>
  <div class="qualification-acquisition-view">
    <el-form size="small" disabled v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="收购意向客户">
            <el-input size="small" v-model="form.transferCustomers"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在地区">
            <el-cascader
                class="width-full"
                clearable
                :props="{ expandTrigger: 'hover' ,checkStrictly:true ,emitPath:false}"
                placeholder=""
                :options="this.$provinceAndCityData"
                v-model="form.area">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="在建工程">
            <el-select class="width-full" v-model="form.constructionProgress" placeholder="">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
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
          <el-form-item label="资质人员">
            <el-select class="width-full" v-model="form.qualifiedPersonnel" placeholder="">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安全许可证">
            <el-select class="width-full" v-model="form.safetyPermit" placeholder="">
              <el-option
                  v-for="item in this.$store.state.bool3_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收购金额">
            <el-input size="small" v-model="form.acquisitionAmount"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="收购日期">
            <el-date-picker
                placeholder=""
                class="width-full"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.acquisitionDate"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select class="width-full" size="small" v-model="form.status" placeholder="">
              <el-option
                  v-for="item in $store.state.qualification_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入日期">
            <el-date-picker
                class="width-full"
                disabled
                v-model="form.gmtCreate"
                type="datetime"
                placeholder="">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资质需求">
            <el-select multiple class="width-full" v-model="form.categoryAndGrade" placeholder="">
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="剥离记录">
            <el-table
                size="mini"
                :data="tableData"
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
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col style="margin-left: 100px" :span="10">
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
            <el-input disabled placeholder="" :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="申请转账" name="first">
        <transition appear name="public">
          <TransferApplication
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
                namespace="qualification-acquisition" type="contract"/>
            <el-divider content-position="left">证件</el-divider>
            <ImagesUpload
                ref="upload2"
                @getCheckedList="(_list)=>{this.checkedList2 = _list}"
                namespace="qualification-acquisition" type="certificates"/>
            <el-divider content-position="left">其他</el-divider>
            <ImagesUpload
                ref="upload3"
                @getCheckedList="(_list)=>{this.checkedList3 = _list}"
                namespace="qualification-acquisition" type="other"/>
          </div>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import JSzip from 'jszip'
import {saveAs} from 'file-saver'
import ImagesUpload from "../../../components/image-upload/ImagesUpload";
import TransferApplication from "./transfer-application/TransferApplication";

export default {
  name: 'QualificationAcquisitionView',
  components: {TransferApplication, ImagesUpload},
  data() {
    return {
      activeName: this.$route.query.activeTab || 'first',
      isShowDetail: false,
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      form: {
        name: ''
      },
      columns: [
        {
          title: '企业名称',
          key: 'address'
        },
        {
          title: '资质类别及等级',
          key: 'address1'
        },
        {
          title: '剥离时间',
          key: 'address2'
        },
        {
          title: '剥离人员',
          key: 'address3'
        },
        {
          title: '剥离备注',
          key: 'address4'
        },
      ],
      tableData: [
        {}
      ],
    }
  },
  created() {
    const id = this.$route.query.id / 1
    if (id != null) {
      this.getDetailById(id)
    }
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
            let rootFolder = zip.folder(`资质收购-${this.form.transferCustomers}`)
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
              let filename = `资质收购-${this.form.transferCustomers}.zip`;
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
    async getDetailById(_id) {
      try {
        const res = await this.$http.get('/qualification-acquisition/detail/' + _id)
        if (res.status) {
          this.form = res.data
          this.form.categoryAndGrade = JSON.parse(this.form.categoryAndGrade)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-acquisition-view {
  margin: 0 100px;
}

.width-full {
  width: 100%;
}
</style>
