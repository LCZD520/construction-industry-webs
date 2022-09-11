/**
* Created by Lv Cheng on 2022/6/21
* Notes 组织管理查看
*/
<template>
  <div class="management-organization-view">
    <div class="margin">
      <el-form label-width="70px" label-position="left">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>机构信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构编号">
                <el-input size="small" disabled :value="form.mechanismNumber"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构名称">
                <el-input size="small" disabled
                          :value="form.mechanism == null ? '' : form.mechanism.mechanismName"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input size="small" disabled :value="form.username"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input size="small" disabled :value="form.fullName"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input size="small" disabled :value="form.telephoneNumber"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户性别">
                <el-select disabled style="width: 100%" size="small" :value="form.sex">
                  <el-option
                      v-for="item in $store.state.sex_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户年龄">
                <el-input size="small" disabled :value="form.age"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否在职">
                <el-select disabled style="width: 100%" size="small" :value="form.onJob">
                  <el-option
                      v-for="item in $store.state.bool_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>角色权限</span>
          </div>
          <el-form-item label="角色">
            <el-tag
                size="small"
                style="margin-right: 10px"
                v-for="item in 10"
                :key="item"
                type="success"
                effect="dark">
              角色
            </el-tag>
          </el-form-item>
        </el-card>
        <br>
        <el-form-item label=" ">
          <el-button icon="el-icon-back" size="small" @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManagementOrganizationView',
  components: {},
  data() {
    return {
      form: {}
    }
  },
  created() {
    let userId = this.$route.params.id
    if (userId != null) {
      this.getDetailById(userId / 1)
    }
  },
  methods: {
    async getDetailById(_id) {
      const res = await this.$http.get('/user/detail/' + _id)
      if (res.status && res.data != null) {
        this.form = res.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.management-organization-view {
  .margin {
    margin: 0 250px;
  }

}
</style>
