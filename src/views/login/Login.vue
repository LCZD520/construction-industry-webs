/**
* Created by Lv Cheng on 2022/2/22
* Notes
*/
<template>
  <div class="login">
    <div ref="threeContainer" class="three-container"></div>
    <div class="content">
      <h3>广西恒筑系统</h3>
      <div class="inner-box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" label-position="right">
          <el-form-item label="用户名" prop="username">
            <el-input
                clearable
                v-model.trim="ruleForm.username"
                placeholder="请输入用户名"
                autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-yonghuming"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input clearable show-password type="password" placeholder="请输入密码" v-model.trim="ruleForm.password"
                      autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-xiugaimima"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input placeholder="验证码" :maxLength="4" v-model.trim="ruleForm.captcha">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-quanxian"></use>
              </svg>
              <img
                  ref="captcha"
                  class="captcha"
                  @click="getCaptcha"
                  slot="suffix"
                  alt="图片加载失败"
                  title="看不清？点击切换另一张"
                  :src="captcha">
            </el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button :loading="loading" style="width: 100%;" type="primary" @click="login">
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import SparkMD5 from 'spark-md5'
import {renderer} from './threejs'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      captcha: '',
      ruleForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loading: false,
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      },
    }
  },
  mounted() {
    this.$refs.threeContainer.appendChild(renderer.domElement)
    this.getCaptcha()
    document.addEventListener("keydown", this.submitForm)
  },
  methods: {
    // loadImgError(){
    //   this.$refs.captcha.src = require('../../assets/images/backgroud.jpg')
    // },
    getCaptcha() {
      this.$http.get('/captcha/login', {}, false).then(res => {
        if (res && res.status) {
          this.$nextTick(() => {
            this.$refs.captcha.src = res.data
          })
        } else {
          this.$message.error('获取验证码失败')
        }
      })
    },
    async login() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let {username, password, captcha} = this.ruleForm
          let newData = {username, password, captcha}
          newData.password = SparkMD5.hash(this.ruleForm.password)
          try {
            this.loading = true
            const res = await this.$http.post('/user/login', newData, false)
            if (res && res.status) {
              localStorage.setItem("access_token", res.data.token)
              this.$store.dispatch('changeLoginStatus', true)
              this.$store.dispatch('updateCurrentUser', res.data.userInfo)
              this.$message.success(res.message)
              this.$router.push('/home')
              return
            }
            this.$message.error(res.message)
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false
          }
        }
      })
    },
    async submitForm(e) {
      if (['Enter', 'NumpadEnter'].includes(e.code)) {
        await this.login()
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.submitForm)
  }
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  //background: url("../../assets/images/background.png") no-repeat 0 0;
  //background-size: 100% 100%;

  .content {
    color: #fff;
    width: 500px;
    height: 400px;
    min-height: 400px;
    margin: auto;
    position: fixed;
    top: 0;
    left: 800px;
    right: 0;
    bottom: 0;
    background: rgba(64, 72, 252, 0.4);
    border-radius: 8px;
    //box-shadow: 0 0 20px #45c0f6;
    text-align: center;
    box-sizing: border-box;
    padding: 20px 40px 0 40px;

    h3 {
      font: 600 30px/2 "KaiTi";
    }

    .inner-box {
      margin-top: 20px;

      .captcha {
        width: 140px;
        height: 30px;
        position: absolute;
        right: 0;
        margin-top: -20px;
        cursor: pointer;
      }

    }
  }
}

/deep/ .el-input__inner {
  height: 40px;
  font: 20px/2 "Microsoft Yahei";
  padding: 0 40px;
  background: rgba(255, 255, 255, 0);
  color: #fff;
}

/deep/ .el-form-item__label {
  font: 20px/2 "Microsoft Yahei";
  color: #fff;
}

/deep/ .el-input__inner::placeholder {
  color: #fff;
}

</style>
