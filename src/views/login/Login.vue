/**
* Created by Lv Cheng on 2022/2/22
* Notes
*/
<template>
  <div class="login">
    <div class="content">
      <h3>广西恒筑系统</h3>
      <div class="inner-box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" label-position="right">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"
                      placeholder="请输入用户名"
                      autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-yonghuming"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input show-password type="password" placeholder="请输入密码" v-model="ruleForm.password"
                      autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-mima"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input placeholder="验证码" :maxLength="4" v-model.trim="ruleForm.captcha">
              <svg slot="prefix" aria-hidden="true" width="20" height="40" style="margin: auto 10px;">
                <use xlink:href="#icon-yanzhengma-yiyanzheng"></use>
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
            <el-button style="width: 100%;" type="primary" @click="submitForm('ruleForm')">
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

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
    this.getCaptcha()
  },
  methods: {
    // loadImgError(){
    //   this.$refs.captcha.src = require('../../assets/images/backgroud.jpg')
    // },
    getCaptcha() {
      this.$axios('/api/captcha/login').then(res => {
        // console.log(res)
        this.$refs.captcha.src = res.data
      })
    },
    submitForm(_form) {
      this.$refs[_form].validate(valid => {
            if (valid) {
              axios.post('/api/user/login', this.ruleForm).then(res => {
                if (res.data.code === "200") {
                  this.$store.dispatch("changeLoginStatus")
                  this.$router.push('/home')
                  this.$message.success("登录成功!")
                  localStorage.setItem("access_token", res.data.data.token)
                }
              }).catch(err => {
                console.log(err)
                this.$message.error("服务器出现异常,请稍后重试!")
              })

            }
          }
      )
    },
    resetForm(_form) {
      this.$refs[_form].resetFields()
    },
  }
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background.png") no-repeat 0 0;
  background-size: 100% 100%;

  .content {
    width: 500px;
    height: 400px;
    min-height: 400px;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, .7);
    border-radius: 8px;
    box-shadow: 0 0 20px #45c0f6;
    background-size: 50% 50%;
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
        margin-top: 5px;
        cursor: pointer;
      }

    }
  }
}

/deep/ .el-input__inner {
  height: 40px;
  font:  20px/2 "Microsoft Yahei";
  padding: 0 40px;
}

/deep/ .el-form-item__label {
  font:  20px/2 "Microsoft Yahei";
}

</style>
