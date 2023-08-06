/**
* Created by Lv Cheng on 2022/6/20
* Notes 资质代办入账
*/
<template>
  <div class="entry-qualification-agency-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="代办公司">
            <el-input disabled size="small" v-model="form.agencyCompany">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代办金额">
            <el-input disabled size="small" v-model="form.agencyAmount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请转账金额">
            <el-input disabled size="small" v-model="form.entryAmount">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="款项用途">
            <el-select disabled class="width-full" size="small" v-model="form.fundsPurpose">
              <el-option
                  v-for="item in $store.state.qualification_agency_funds_purpose_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方信息">
            <el-input disabled size="small" v-model="form.transferorInfo">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转账方式">
            <el-select disabled class="width-full" size="small" v-model="form.transferWay">
              <el-option
                  v-for="item in $store.state.order_transfer_way_options"
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
          <el-form-item label="公司账户">
            <el-input disabled size="small" v-model="form.accountName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到账日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.receiptDate"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input disabled size="small" :value="this.$valueToLabel(form.creatorId,$store.state.user_options)">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.gmtCreate"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-input disabled class="width-full" size="small" v-model="form.applicationStatus">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">历史记录</el-divider>
      <p>
        资质代办入账记录
        <span style="color:#409EFF;display:inline-block;margin-left: 20px">
          已通过:55000 待申请:0
        </span>
      </p>
      <br>
      <!--      <el-table-->
      <!--          size="mini"-->
      <!--          :data="tableData"-->
      <!--          stripe-->
      <!--          border-->
      <!--          highlight-current-row-->
      <!--          :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"-->
      <!--          :cell-style="{textAlign:'center'}"-->
      <!--          style="width: 100%"-->
      <!--          :row-class-name="tableRowClassName">-->
      <!--        <el-table-column-->
      <!--            min-width="200"-->
      <!--            v-for="item in columns"-->
      <!--            :key="item.key"-->
      <!--            :prop="item.key"-->
      <!--            :label="item.title">-->
      <!--        </el-table-column>-->
      <!--      </el-table>-->
      <br>
      <el-divider content-position="left">资质代办图片</el-divider>
      <ImagesUploadView
          ref="upload"
          @closeDialog="imageVisible = false"
          :files="listImages"
          namespace="qualification-agency"
          type="assessor"
          :name="name"
          :root-folder-name="'资质代办'"
          :sub-dirs="subDirs"/>
      <br>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImagesUploadView from "../../../components/image-upload-view/ImagesUploadView";

export default {
  name: 'EntryQualificationAgencyView',
  components: {ImagesUploadView},
  data() {
    return {
      form: {},
      columns: [
        {
          title: '申请时间',
          key: 'address'
        },
        {
          title: '申请入账金额',
          key: 'address'
        },
        {
          title: '款项用途',
          key: 'address'
        },
        {
          title: '入账方信息',
          key: 'address'
        },
        {
          title: '入账日期',
          key: 'address'
        },
        {
          title: '申请状态',
          key: 'address'
        },
      ],
      tableData: [{}],
      listImages: [],
      name: '',
      subDirs: new Set([
        {type: 'assessor', folder: '合同'},
        {type: 'assessor', folder: '证件'},
        {type: 'assessor', folder: '其他'},
      ]),
    }
  },
  created() {
    console.log(this.$route.params.id)
    const id = this.$route.params.id
    id && !isNaN(id / 1) && this.getDetailById(id)
  },
  methods: {
    async getDetailById(id) {
      try {
        const res = await this.$http.get(`/qualification-agency-entry/detail/${id}`)
        if (res && res.status) {
          console.log(res.data)
          this.form = res.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    tableRowClassName({rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/common-el-table-scrollbar";

.entry-qualification-agency-view {
  margin: 0 100px;

  .width-full {
    width: 100%;
  }
}


.time {
  font-size: 14px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 4px;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
