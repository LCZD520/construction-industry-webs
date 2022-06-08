<template>
  <div class="layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <Sidebar :is-collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header style="height: 46px">
          <el-row :gutter="20">
            <el-col :span="1">
              <div class="header-left">
                <i
                    style="font-size: 24px;line-height: 46px;color: #000;cursor: pointer"
                    @click="isCollapse = !isCollapse"
                    :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'">
                </i>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="header-breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>人才查询</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="header-right">
                <el-dropdown trigger="hover" placement="bottom">
                  <span class="el-dropdown-link" style="cursor: pointer">
                    超级管理员（{{ 'admin' }}）
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-error">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar";

export default {
  components: {Sidebar},
  data() {
    return {
      isCollapse: false,

    }
  },
  computed: {},
  methods: {}
}
</script>
<style scoped lang="less">
.el-header, .el-footer {
  background-color: #fff;
  color: #333;
  height: 46px;
  line-height: 46px;
}

.el-aside {
  transition: 0.5s;
  //overflow-x: hidden;
  //height: 100%;
  box-shadow: 0 10px 20px darkgrey;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-breadcrumb {
  line-height: 46px;
}

.header-right {
  text-align: right;
}

</style>
