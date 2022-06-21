/**
* Created by Lv Cheng on 2022/6/20
* Notes 入账登记查看
*/
<template>
  <div class="entry-registration-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="入账类别">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择转账用途">
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
          <el-form-item label="转账用途">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择转账用途">
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
          <el-form-item label="客户名称">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入人">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="录入时间">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="date">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="本次转入金额">
            <el-input-number
                disabled
                class="width-full"
                controls-position="right"
                size="small"
                v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="转账方信息">
        <el-input disabled placeholder="请输入转账方信息..." :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="转账方式">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择转账方式">
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
          <el-form-item label="公司账户">
            <el-select disabled class="width-full" size="small" v-model="form.name" placeholder="请选择公司账户">
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
          <el-form-item label="到账日期">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="date"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input disabled placeholder="请输入备注..." :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button icon="el-icon-back" size="small" @click="$router.back()">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EntryRegistrationView',
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.entry-registration-view {
  margin: 0 150px;

  .width-full {
    width: 100%;
  }
}
</style>
