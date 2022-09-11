/**
* Created by Lv Cheng on 2022/6/26
* Notes 更新证件去向
*/
<template>
  <el-dialog
      :close-on-click-modal=false
      width="80%"
      title="更新证件去向"
      :visible.sync="visible"
      :before-close="()=>$emit('closeDialog')">
    <div class="dialog-content">
      <el-form
          ref="form"
          :rules="rules"
          :model="form"
          label-position="left"
          label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="required" label="证件新去向" prop="certificatesWhereabouts">
              <el-select class="width-full" size="small" v-model="form.certificatesWhereabouts">
                <el-option
                    v-for="item in this.$store.state.certificates_whereabouts_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
            height="260"
            ref="table"
            :data="list"
            border
            :header-cell-style="{textAlign:'center',background:'#f8f8f9',color:'#515a6e',fontSize:'14px',fontWeight:'800' }"
            :cell-style="{textAlign:'center'}"
            style="width: 100%">
          <el-table-column
              label="证件类型">
            <template slot-scope="scope">
              {{ $valueToLabel(scope.row.certificatesType, $store.state.certificates_category_options) }}
            </template>
          </el-table-column>
          <el-table-column
              label="当前证件去向">
            <template slot-scope="scope">
              {{ $valueToLabel(scope.row.certificatesWhereabouts, $store.state.certificates_whereabouts_options) }}
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-form-item label="去向备注" prop="remark">
          <el-input size="small" type="textarea" :rows="3" v-model="form.remark"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="small" @click="$emit('closeDialog')">取 消</el-button>
      <el-button
          size="small"
          type="primary" @click="handleSubmit">提 交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateWhereaboutsDialog',
  components: {},
  data() {
    return {
      form: {
        certificatesWhereabouts: '',
        remark: '',
        listTalentCertificatesId: []
      },
      rules: {
        certificatesWhereabouts: [
          {required: true, message: '请选择证件新去向', trigger: 'change'}
        ],
        remark: [
          {required: false}
        ],
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    handleSubmit() {
      this.list.forEach(k => {
        this.form.listTalentCertificatesId.push(k.talentCertificatesId)
      })
      this.$http.put('/talent-certificates/update-batch', this.form).then(res => {
        if (res.status) {
          this.$message.success(res.message)
          this.$emit('closeDialog')
          this.$refs.form.resetFields()
          this.form.listTalentCertificatesId = []
          this.$emit('getListCertificates')
          this.$emit('clearSelectedListCertificates')
          return
        }
        this.$message.error(res.message)
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
