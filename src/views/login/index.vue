<template>
  <div class="login-container">
    <!--   :rules="loginRules"-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">抢购鸭总管理后台</h3>
      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.account"
          name="account"
          type="text"
          auto-complete="on"
          placeholder="account"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click="handleLogin"
        >Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  name: "Login",
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   callback();
    // };
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error("密码不能小于5位"));
    //     // this.$router.push("/login");
    //   } else {
    //     callback();
    //   }
    // };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      // loginRules: {
      //   account: [
      //     {
      //       required: true,
      //       trigger: "blur",
      //       validator: validateUsername
      //     }
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       trigger: "blur",
      //       validator: validatePass
      //     }
      //   ]
      // },
      loading: false,
      pwdType: "password"
    };
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect;
    //   },
    //   immediate: true
    // }
  },

  mounted() {},
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      if (this.loginForm.account === "") this.$message("账号不能为空！");
      else if (this.loginForm.password === "") this.$message("密码不能为空！");
      else if (this.loginForm.password.length < 5)
        this.$message("密码不能少于5位！");
      else {
        this.$store.dispatch("Login", this.loginForm);
        // sessionStorage.LOGIN_STATE = 1;  // 不在此处判断
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
