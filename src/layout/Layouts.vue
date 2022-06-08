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
                  <span v-if="$route.path !== '/home'">
                    <el-breadcrumb-item>{{ $route.meta.title }}列表</el-breadcrumb-item>
                  </span>

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
                    <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-error">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="padding: 0">
          <VueScrollx scrolling-y>
            <transition :enter-active-class="enterTraName">
              <div style="padding: 10px">
                <div style="padding: 10px;background: #fff;min-height: 600px">
                  <router-view/>
                </div>
              </div>
            </transition>
          </VueScrollx>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar";
import VueScrollx from "../components/vue-scrollx/VueScrollx";

export default {
  components: {VueScrollx, Sidebar},
  data() {
    return {
      isCollapse: false,
      enterTraName: "animate__animated animate__fadeIn",
    }
  },
  computed: {},
  mouted() {
    const body = window.document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },
  methods: {}
}
</script>
<style scoped lang="less">
.el-header, .el-footer {
  z-index: 1000;
  background-color: #fff;
  color: #333;
  height: 46px;
  line-height: 46px;
}

.el-aside {
  background: #eee;
  transition: .5s;
}

.el-main {
  z-index: 900;
  max-height: 700px;
  height: 700px;
  background: #eee;
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
