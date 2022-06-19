/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质转让添加
*/
<template>
  <div class="qualification-transfer-add">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购意向客户">
            <el-input placeholder="请输入收购意向客户" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在地区">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择所在地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资质需求">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择资质需求"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input placeholder="请输入备注..." :rows="5" type="textarea">

            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label=" ">
        <el-button icon="el-icon-circle-plus-outline" type="primary" size="small">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'QualificationTransferAdd',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [{}]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.qualification-transfer-add {
  margin: 0 200px;
}

.width-full {
  width: 100%;
}
</style>
