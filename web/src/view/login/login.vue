<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="top">
        <div class="desc">
          <img class="logo_login" src="@/assets/logo_login.png" alt="" />
        </div>
        <div class="header">
          <a href="">
            <!-- <img src="~@/assets/logo.png" class="logo" alt="logo" /> -->
            <span class="title">数据安全接入管理系统</span>
          </a>
        </div>
      </div>
      <div class="main">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          @keyup.enter.native="submitForm"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username">
              <i class="el-input__icon el-icon-user" slot="suffix"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="lock === 'lock' ? 'password' : 'text'"
              placeholder="请输入密码"
              v-model="loginForm.password"
            >
              <i
                :class="'el-input__icon el-icon-' + lock"
                @click="changeLock"
                slot="suffix"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item style="position: relative">
            <el-input
              v-model="loginForm.captcha"
              name="logVerify"
              placeholder="请输入验证码"
              style="width: 60%"
            />
            <div class="vPic">
              <img
                v-if="picPath"
                :src="picPath"
                width="100%"
                height="100%"
                alt="请输入验证码"
                @click="loginVefify()"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" style="width: 100%"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="footer">
        <!-- <div class="links">
          <a href="https://www.gin-vue-admin.com/"
            ><img src="@/assets/docs.png" class="link-icon"
          /></a>
          <a href="https://www.gin-vue-admin.com/"
            ><img src="@/assets/yuque.png" class="link-icon"
          /></a>
          <a href="https://github.com/flipped-aurora/gin-vue-admin"
            ><img src="@/assets/github.png" class="link-icon"
          /></a>
          <a href="https://space.bilibili.com/322210472"
            ><img src="@/assets/video.png" class="link-icon"
          /></a>
        </div> -->
        <!--  底部  -->
        <div class="copyright el-login-footer">
          Copyright &copy; {{ curYear }} Modify 💖 学海无涯
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { captcha } from '@/api/user';
  export default {
    name: 'Login',
    data() {
      const checkUsername = (rule, value, callback) => {
        if (value.length < 5 || value.length > 12) {
          return callback(new Error('请输入正确的用户名'));
        } else {
          callback();
        }
      };
      const checkPassword = (rule, value, callback) => {
        if (value.length < 6 || value.length > 12) {
          return callback(new Error('请输入正确的密码'));
        } else {
          callback();
        }
      };
      return {
        curYear: 0,
        lock: 'lock',
        loginForm: {
          username: 'admin',
          password: '123456',
          captcha: '625307', //模拟数据
          captchaId: '',
        },
        rules: {
          username: [{ validator: checkUsername, trigger: 'blur' }],
          password: [{ validator: checkPassword, trigger: 'blur' }],
        },
        logVerify: '',
        picPath: '',
      };
    },
    created() {
      this.loginVefify();
      this.curYear = new Date().getFullYear();
    },
    methods: {
      ...mapActions('user', ['LoginIn']),
      async login() {
        return await this.LoginIn(this.loginForm);
      },
      async submitForm() {
        this.$refs.loginForm.validate(async (v) => {
          if (v) {
            const flag = await this.login();
            if (!flag) {
              this.loginVefify();
            }
          } else {
            this.$message({
              type: 'error',
              message: '请正确填写登录信息',
              showClose: true,
            });
            this.loginVefify();
            return false;
          }
        });
      },
      changeLock() {
        this.lock === 'lock' ? (this.lock = 'unlock') : (this.lock = 'lock');
      },
      loginVefify() {
        captcha({}).then((ele) => {
          this.picPath = ele.data.picPath;
          this.loginForm.captchaId = ele.data.captchaId;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/style/login.scss';
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    margin-left: -20px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    // letter-spacing: 1px;
  }
</style>
