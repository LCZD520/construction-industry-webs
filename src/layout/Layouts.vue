<template>
  <div class="layout" @click="logout" @mouseleave="logout">
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
                  <el-breadcrumb-item :to="{ path: '/' }">
                    <i class="el-icon-s-home"></i>
                    首页
                  </el-breadcrumb-item>
                  <span v-if="$route.path !== '/home'">
                    <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
                  </span>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="header-right">
                <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
                  <span class="el-dropdown-link" style="cursor: pointer">
                    超级管理员（{{ 'admin' }}）
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-lock" command="modifyPass">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-error" command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <VueScrollx>
          <div style="height: 100vh;background: #F8F9FB">
            <el-main>
              <div style="padding: 10px;background: #fff;min-height: 600px">
                <transition :enter-active-class="enterTraName">
                  <router-view/>
                </transition>
              </div>
              <div style="height: 46px"></div>
            </el-main>
          </div>
        </VueScrollx>
      </el-container>
    </el-container>
    <el-dialog
        :close-on-click-modal=false
        width="32%"
        title="修改密码"
        :visible.sync="visible"
        :before-close="beforeClose">
      <div class="dialog-content">
        <el-form
            ref="formData"
            :rules="rules"
            :model="form">
          <el-form-item prop="oldPassword" label="输入旧密码" label-width="100px">
            <el-input size="small" placeholder="请输入旧密码" v-model="form.oldPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="输入新密码" label-width="100px">
            <el-input size="small" placeholder="请输入新密码" v-model="form.newPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认新密码" label-width="100px">
            <el-input size="small" placeholder="请确认新密码" v-model="form.confirmPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            type="primary">提 交
        </el-button>
        <el-button size="small" @click="beforeClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar";
import VueScrollx from "../components/vue-scrollx/VueScrollx";

export default {
  components: {VueScrollx, Sidebar},
  data() {
    return {
      visible: false,
      isCollapse: false,
      enterTraName: "animate__animated animate__fadeIn",
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          {required: true, message: '旧密码不能为空！', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '新密码不能为空！', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: '确认密码不能为空！', trigger: 'blur'}
        ],
      },
      timer: null
    }
  },
  computed: {},
  created() {
    this.getListUsers()
    this.getListRolesAll()
  },
  methods: {
    logout() {
      // if (this.timer) {
      //   clearTimeout(this.timer)
      // }
      // this.timer = setTimeout(() => {
      //   this.$message({
      //     message: '由于您未进行操作超过15分钟，请重新登录',
      //     type: "error",
      //     duration: 0,
      //     showClose: true
      //   })
      //   this.$router.push('/login')
      // }, 1000 * 60 * 15)
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出登录吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出!'
          });
        })
        return
      }
      if (command === 'modifyPass') {
        this.visible = true
      }
    },
    beforeClose() {
      this.visible = false
      this.$refs['formData'].resetFields();
    },
    getListUsers() {
      this.$http.get('/user/list-all').then(res => {
        if (res.status && res.data !== null) {
          this.$store.dispatch('initListUsers', res.data)
        }
      })
    },
    async getListRolesAll() {
      try {
        const res = await this.$http.get('/role/list-all')
        if (res.status) {
          await this.$store.dispatch('initRoleList', res.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="less">
.el-header, .el-footer {
  z-index: 1000;
  color: #333;
  background: #fff;
  line-height: 46px;
}

.el-aside {
  background: #515a6e;
  transition: .5s;
}

.el-main {
  z-index: 900;
  background: #F8F9FB;
  padding: 10px;
}

.el-breadcrumb {
  line-height: 46px !important;
}

.header-right {
  text-align: right;
}


.el-dialog {
  border-radius: 8px !important;
  margin-top: 10vh !important;
}

.el-dialog__body {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  padding: 16px 40px !important;
}

.el-scrollbar__wrap {
  overflow-x: hidden !important;
  margin-bottom: 0 !important;
}

.dialog-content {
  max-height: 560px;
}

.el-message-box {
  margin-top: -360px;
}

.current-row > td {
  background: #fff6d8 !important
}

.highlight td {
  background-color: #fff6d8 !important;
}

.el-table__fixed-right {
  height: 100% !important;
}

.el-input-number.is-controls-right .el-input__inner {
  text-align: left;
}

.width-full {
  width: 100% !important;
}

.el-cascader-menu__wrap {
  height: 360px !important;
  padding-bottom: 20px;
}

.el-select-dropdown__item.selected {
  background: #d7ffd7;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background: #d7ffd7 !important;
}

input:disabled, input[disabled] {
  color: unset !important;
}

.el-textarea.is-disabled .el-textarea__inner {
  color: unset !important;
}

.el-input__suffix-inner {
  margin-top: -2px;
  display: inline-block;
}

.el-scrollbar__bar.is-horizontal {
  display: none;
}

.public-enter-active {
  animation: fadeIn .6s
}

.el-tag.el-tag--info {
  background: #e3f2fd !important;
  color: #039be5 !important;
}

.el-tag--dark.el-tag--info {
  border: unset;
}

.el-tag.el-tag--info .el-tag__close {
  color: #039be5 !important;
}

.el-select .el-tag__close.el-icon-close {
  background: unset !important;
}
</style>
