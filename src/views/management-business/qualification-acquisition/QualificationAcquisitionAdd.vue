/**
* Created by Lv Cheng on 2022/6/19
* Notes 资质收购添加
*/
<template>
  <div class="qualification-acquisition-add">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="转让意向客户">
            <el-input placeholder="请输入转让意向客户" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地区">
            <el-cascader
                class="width-full"
                size="small"
                clearable
                placeholder="请选择地区"
                :options="regionData"
                v-model="form.newPassword"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资质类别及等级">
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
        <el-col :span="12">
          <el-form-item label="在建工程">
            <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择学历">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资质人员">
            <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择学历">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="安全许可证">
            <el-select class="width-full" size="small" v-model="form.name" placeholder="请选择学历">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收购金额">
            <el-input-number class="width-full" controls-position="right" :min="0" size="small" v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收购日期">
            <el-date-picker
                class="width-full"
                disabled
                size="small"
                v-model="form.name"
                type="date">
            </el-date-picker>
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
        <el-button icon="el-icon-plus" type="primary" size="small">
          保存
        </el-button>
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'QualificationAcquisitionAdd',
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
.qualification-acquisition-add {
  margin: 0 200px;
}

.width-full {
  width: 100%;
}
</style>
