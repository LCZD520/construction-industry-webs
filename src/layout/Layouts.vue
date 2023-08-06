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
                <!--    <el-button @click="send">发送</el-button>-->
                <div style="display: inline-block" v-if="true">
                  <div class="online-status"></div>
                  <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    在线人数
                  </span>
                    <span style="display: inline-block;margin-right: 60px" class="el-dropdown-link">
                      <span>{{ $store.state.listOnlineUsers.length }}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-table
                            size="mini"
                            height="400"
                            :data="list"
                            stripe
                            style="width: 100%">
                          <el-table-column
                              prop="username"
                              label="用户"
                              width="180">
                          </el-table-column>
                          <el-table-column
                              prop="ip"
                              label="IP"
                              width="180">
                          </el-table-column>
                          <el-table-column
                              min-width="200"
                              prop="ipCityInfo"
                              label="IP归属">
                          </el-table-column>
                          <!--                          <el-table-column-->
                          <!--                              min-width="200"-->
                          <!--                              align="center">-->
                          <!--                            <template slot="header">-->
                          <!--                              <el-input-->
                          <!--                                  clearable-->
                          <!--                                  v-model.trim="search"-->
                          <!--                                  size="small"-->
                          <!--                                  placeholder="搜索用户"/>-->
                          <!--                            </template>-->
                          <!--                            <template #default="{row}">-->
                          <!--                              <el-button-->
                          <!--                                  v-if="$store.state.currentUser.listRoleIds.includes(1)"-->
                          <!--                                  size="mini"-->
                          <!--                                  @click="offlineUser(row.username)"-->
                          <!--                                  type="danger">-->
                          <!--                                强制下线-->
                          <!--                              </el-button>-->
                          <!--                            </template>-->
                          <!--                          </el-table-column>-->
                        </el-table>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
                  <span class="el-dropdown-link" style="cursor: pointer">
                    {{ $store.state.currentUser.fullName }}（{{ $store.state.currentUser.username }}）
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-lock" command="modifyPass">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-error" command="logout">退出登录</el-dropdown-item>
                    <!--                    <el-dropdown-item icon="el-icon-edit-outline" command="feedback">反馈</el-dropdown-item>-->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <VueScrollx>
          <div style="height: 100vh;background: #F8F9FB">
            <el-main>
              <div style="padding: 10px;background: #fff;min-height: 90vh">
<!--                <transition :enter-active-class="enterTraName">-->
                <transition name="fade">
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
            ref="form"
            label-width="100px"
            :rules="rules"
            size="small"
            :model="form">
          <el-form-item label="用户">
            <el-select class="width-full" disabled v-model="form.id">
              <el-option
                  v-for="item in this.$store.state.user_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="oldPassword" label="输入旧密码">
            <el-input placeholder="请输入旧密码" v-model.trim="form.oldPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="输入新密码">
            <el-input placeholder="请输入新密码" v-model.trim="form.newPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="确认新密码">
            <el-input placeholder="请确认新密码" v-model.trim="form.confirmPassword"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
            size="small"
            v-throttle="handleSubmit"
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
import {Loading} from "element-ui"
import SparkMD5 from 'spark-md5'

export default {
  components: {VueScrollx, Sidebar},
  data() {
    const newPasswordValidator = (rule, value, callback) => {
      if (this.form.newPassword === this.form.oldPassword) {
        callback(new Error('新密码不能与旧密码相同!'))
      }
      callback()
    }
    const confirmPasswordValidator = (rule, value, callback) => {
      if (this.form.newPassword !== this.form.confirmPassword) {
        callback(new Error('两次输入密码不一致!'))
      }
      callback()
    }

    return {
      search: "",
      list: [],
      visible: false,
      isCollapse: false,
      enterTraName: "animate__animated animate__fadeIn",
      form: {
        id: this.$store.state.currentUser.userId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        id: [
          {required: true, message: '用户不能为空！', trigger: 'blur'}
        ],
        oldPassword: [
          {required: true, message: '旧密码不能为空！', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '新密码不能为空！', trigger: 'blur'},
          {required: true, validator: newPasswordValidator, trigger: 'change'}
        ],
        confirmPassword: [
          {required: true, message: '确认密码不能为空！', trigger: 'blur'},
          {required: true, validator: confirmPasswordValidator, trigger: 'change'}
        ],
      },
      timer: null
    }
  },
  computed: {
    listOnlineUsers() {
      return this.$store.state.listOnlineUsers
    }
  },
  created() {
    this.$store.state.loginStatus && this.initData()
  },
  mounted() {
    this.$store.state.currentUser.username && this.$websocket.init(this.$store.state.currentUser.username);
  },
  methods: {
    logout() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$message({
          message: '您未进行任何操作超过30分钟，请重新登录',
          type: "error",
          duration: 0,
          showClose: true
        })
        this.$router.push('/login')
      }, 1000 * 60 * 30)
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出登录吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            await this.$http.post('/user/logout')
          } catch (e) {
            console.log(e)
          } finally {
            localStorage.clear()
            this.$router.push('/login')
          }
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
      this.$refs.form.resetFields();
    },
    async getListRolesAll() {
      return this.$http.get('/role/list-all');
    },
    async getListUsers() {
      return this.$http.get('/user/list-all');
    },
    async getCertificateCategory() {
      return this.$http.get('/certificate-category/list-tree');
    },
    async getListQualificationCategory() {
      return this.$http.get('/qualification-category/list-tree');
    },
    async getEnterpriseAccount() {
      return this.$http.get('/enterprise-account/list-all');
    },
    async initData() {
      let loading = Loading.service({fullscreen: true, text: '正在加载必要数据...'});

      async function httpRequestConcurrentLimit(maxNum = 6, promiseArr = [], fn) {
        const results = []
        const excutingTask = []
        for (const item of promiseArr) {
          const promise = Promise.resolve().then(() => fn(item, promiseArr))
          results.push(promise)
          if (maxNum <= promiseArr.length) {
            const e = promise.then(() => excutingTask.splice(excutingTask.indexOf(e), 1))
            excutingTask.push(e)
            if (excutingTask.length >= maxNum) {
              await Promise.race(excutingTask.map(item => item.catch(err => err)))
            }
          }
        }
        return Promise.all(results.map(item => item.catch(err => err)))
      }

      const tasks = [
        this.getListRolesAll,
        this.getListUsers,
        this.getCertificateCategory,
        this.getListQualificationCategory,
        this.getEnterpriseAccount,
      ]
      const cb = i => i()
      try {
        httpRequestConcurrentLimit(3, tasks, cb).then(async res => {
          console.log(res, "初始化数据...")
          const taskActions =
              [
                'initRoleList',
                'initListUsers',
                'initListCertificateCategory',
                'initListQualificationCategory',
                'initListCompanyAccounts']
          for (let i = 0, len = taskActions.length; i < len; i++) {
            await this.$store.dispatch(taskActions[i], res[i].data)
          }
        })
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }
    },
    offlineUser(username) {
      this.$http.get(`/user/offline/${username}`)
    },
    async handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            let newForm = {}
            newForm.id = this.form.id
            newForm.oldPassword = SparkMD5.hash(this.form.oldPassword)
            newForm.newPassword = SparkMD5.hash(this.form.newPassword)
            const res = await this.$http.post('/user/modify-password', newForm)
            if (res && res.status) {
              this.$message.success(res.message)
              localStorage.clear()
              this.$router.push('/login')
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    this.$websocket && this.$websocket.close()
  },
  watch: {
    search(newVal) {
      console.log(newVal)
      this.list = this.$store.state.listOnlineUsers.filter(item => item.username.includes(newVal))
    },
    listOnlineUsers(newVal) {
      this.list = newVal
    },
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

//避免el-table 滚动条滚动到底部操作栏错位
.el-table__fixed-body-wrapper .el-table__body {
  padding-bottom: 16px;
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

//.public-enter-active {
//  animation: fadeIn .6s
//}

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

.online-status {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background: #0bf403;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  animation-name: breathe;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes breathe {
  0% {
    box-shadow: 0 0 5px #a4ffa1,
    0 0 16px #a4ffa1,
    0 0 25px #a4ffa1,
    0 0 100px #a4ffa1;
  }
  25% {
    box-shadow: 0 0 5px #86ee83,
    0 0 16px #86ee83,
    0 0 25px #86ee83,
    0 0 100px #86ee83;
  }
  50% {
    box-shadow: 0 0 5px #5efd58,
    0 0 16px #5efd58,
    0 0 25px #5efd58,
    0 0 100px #5efd58;
  }
  75% {
    box-shadow: 0 0 5px #40f53b,
    0 0 16px #40f53b,
    0 0 25px #40f53b,
    0 0 100px #40f53b;
  }
  100% {
    box-shadow: 0 0 5px #0bf403,
    0 0 16px #0bf403,
    0 0 25px #0bf403,
    0 0 100px #0bf403;
  }
}

.online-num {
  display: inline-block;
  margin-left: 8px;
  font: bold 14px/1 "Microsoft YaHei";
}

.el-dropdown-link {
  color: #409EFF;
}

.el-dropdown-link:first-child {
  margin-left: 8px;
  cursor: pointer;
}


.fade-enter{
  visibility: hidden;
  opacity: 0;
}
.fade-leave-to{
  display: none;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity .2s ease;
}
.fade-enter-to,
.fade-leave{
  visibility: visible;
  opacity: 1;
}
</style>
