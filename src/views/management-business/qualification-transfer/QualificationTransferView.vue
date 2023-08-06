/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质转让查看
*/
<template>
  <div class="qualification-transfer-view">
    <el-form v-show="isShowDetail" label-position="right" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="收购意向客户">
            <el-input disabled size="small" v-model="form.transferCustomers"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              prop="area"
              label="所在地区">
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
          <el-form-item label="状态">
            <el-select placeholder="" class="width-full" size="small" disabled v-model="form.status">
              <el-option
                  v-for="item in $store.state.qualification_transfer_status_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资质需求" prop="qualificationRequirements">
            <el-select disabled multiple class="width-full" v-model="form.qualificationRequirements" placeholder="">
              <el-option
                  :value="selectedList">
                <el-tree
                    check-strictly
                    accordion
                    check-on-click-node
                    :data="this.$store.state.list_qualification_category"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    @check-change="handleNodeClick"
                    :props="defaultProps">
                </el-tree>
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
            <el-input v-model="form.remark" disabled placeholder="" :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="转让订单" name="first">
        <TransferOrder :form="form"/>
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
                namespace="qualification-transfer" type="contract"/>
            <el-divider content-position="left">证件</el-divider>
            <ImagesUpload
                ref="upload2"
                @getCheckedList="(_list)=>{this.checkedList2 = _list}"
                namespace="qualification-transfer" type="certificates"/>
            <el-divider content-position="left">其他</el-divider>
            <ImagesUpload
                ref="upload3"
                @getCheckedList="(_list)=>{this.checkedList3 = _list}"
                namespace="qualification-transfer" type="other"/>
          </div>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import TransferOrder from "./qualification-transfer-view/transfer-order/TransferOrder";
import JSzip from 'jszip'
import {saveAs} from 'file-saver'
import ImagesUpload from "../../../components/image-upload/ImagesUpload";

export default {
  name: 'QualificationTransferView',
  components: {TransferOrder, ImagesUpload},
  data() {
    return {
      activeName: this.$route.query.activeTab ? this.$route.query.activeTab : 'first',
      isShowDetail: false,
      checkedList1: [],
      checkedList2: [],
      checkedList3: [],
      form: {},
      defaultProps: {
        children: 'listQualificationCategory',
        label: 'categoryName'
      },
      selectedList: [],
    }
  },
  created() {
    const id = this.$route.query.id / 1
    id && !isNaN(id) && this.getDetailById(id)
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
            let rootFolder = zip.folder(`资质转让-${this.form.transferCustomers}`)
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
              let filename = `资质转让-${this.form.transferCustomers}.zip`;
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
        const res = await this.$http.get('/qualification-transfer/detail/' + _id)
        if (res.status) {
          this.form = res.data
          this.form.qualificationRequirements = JSON.parse(this.form.qualificationRequirements)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleClick() {

    },
    handleEdit(_index, _row) {
      console.log(_index, _row)
    },
    handleNodeClick() {
      let datalist = this.$refs.tree.getCheckedNodes()
      this.selectedList = []
      this.form.qualificationRequirements = []
      datalist.forEach(item => {
        if (item.listQualificationCategory.length === 0) {
          this.selectedList.push({id: item.id, label: item.categoryName})
          this.form.qualificationRequirements.push(item.categoryName)
        }
      })
    },

  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.qualification-transfer-view {
  margin: 0 200px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

/deep/ .el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}

/deep/ .el-tree .el-tree-node .el-checkbox .el-checkbox__inner {
  display: none;
}
</style>
