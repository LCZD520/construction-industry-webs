/**
* Created by Lv Cheng on 2022/6/22
* Notes 后勤确认
*/
<template>
  <div class="confirm-logistics-view">
    <el-form label-position="right" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称">
            <el-input disabled size="small" v-model="form.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="后勤项目">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="提交时间">
              <el-date-picker
                  disabled
                  class="width-full"
                  v-model="form.oldPassword"
                  size="small"
                  type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-form-item label="申请备注">
        <el-input disabled :rows="3" type="textarea">

        </el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请状态">
            <el-select disabled class="width-full" size="small" v-model="form.name">
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
          <el-form-item label="费用">
            <el-input
                disabled
                class="width-full"
                controls-position="right"
                size="small"
                v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="确认人">
            <el-input
                disabled
                class="width-full"
                controls-position="right"
                size="small"
                v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认时间">
            <el-date-picker
                disabled
                class="width-full"
                v-model="form.oldPassword"
                size="small"
                type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="确认备注">
        <el-input disabled :rows="3" type="textarea">

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
  name: 'ConfirmLogisticsView',
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
.confirm-logistics-view {
  margin: 0 150px;

  .width-full {
    width: 100%;
  }
}
</style>
