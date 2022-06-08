/**
* Created by Lv Cheng on 2022/2/22
* Notes
*/
<template>
  <div class="login">
    <div class="content">
      <h3>手机商城后台管理系统</h3>
      <div class="inner-box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" label-position="right">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"
                      autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="32" height="60" style="margin: auto 10px;">
                <use xlink:href="#icon-yonghuming"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input show-password type="password" v-model="ruleForm.password"
                      autocomplete="off">
              <svg slot="prefix" aria-hidden="true" width="32" height="60" style="margin: auto 10px;">
                <use xlink:href="#icon-mima"></use>
              </svg>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input :maxLength="4" v-model.trim="ruleForm.captcha">
              <svg slot="prefix" aria-hidden="true" width="32" height="60" style="margin: auto 10px;">
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
          <el-form-item>
            <el-button style="width: 100%;height: 60px"
                       size="medium" type="primary" @click="submitForm('ruleForm')">
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
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey === true || event.metaKey === true)
          && (event.keyCode === 61 || event.keyCode === 107
              || event.keyCode === 173 || event.keyCode === 109
              || event.keyCode === 187 || event.keyCode === 189)) {
        event.preventDefault();
      }
    }, false)
    document.addEventListener('mousewheel', function (e) {
      e = e || window.event;
      if ((e.wheelDelta && event.ctrlKey) || e.detail) {
        event.preventDefault();
      }
    }, {
      capture: false,
      passive: false
    });
  },
  methods: {
    // loadImgError(){
    //   this.$refs.captcha.src = require('../../assets/images/backgroud.jpg')
    // },
    getCaptcha() {
      this.$axios('/api/captcha').then(res => {
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
  background: url("../../assets/images/backgroud.jpg") no-repeat 0 0;
  background-size: 100% 100%;

  .content {
    width: 40%;
    height: 500px;
    position: absolute;
    left: 30%;
    top: 20%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px #45c0f6;
    background-size: 50% 50%;
    text-align: center;
    box-sizing: border-box;
    padding: 40px 65px 40px 40px;

    h3 {
      font: 900 30px/2 "KaiTi";
    }

    .inner-box {
      margin-top: 20px;
      max-height: 60%;
      max-width: 100%;

      .captcha {
        width: 200px;
        height: 50px;
        position: absolute;
        right: 0;
        margin-top: 5px;
        cursor: pointer;
      }

    }
  }
}

/deep/ .el-input__inner {
  height: 60px;
  font: 900 20px/3 "KaiTi";
  padding: 0 60px;
}

/deep/ .el-form-item__label {
  font: 900 20px/3 "KaiTi";
  //display: flex;
  //align-items: center;
}


/deep/ .el-input__icon:before {
  font-size: 20px;
  line-height: 60px;
}
</style>
