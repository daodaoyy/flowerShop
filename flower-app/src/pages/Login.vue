<template>
  <div class="login">
    <section>
      <div class="section-form">
        <input
          type="text"
          v-model="phone"
          name="userphone"
          id="userphone"
          placeholder="请输入账号"
          v-on:blur="phoneBlur"
        />
        <p :class="{ 'true-phone': isPhone, 'redmin-phone': errorPhone }">请输入正确的手机号</p>
        <input
          type="password"
          v-on:blur="passBlur"
          v-model="password"
          name="password"
          id="password"
          placeholder="请输入密码"
        />
        <p :class="{ 'true-pass': isPassword, 'redmin-pass': errorPassword }">请输入6-16位数字或字母或_或-</p>
        <button id="login" @click="toLogin">登录</button>
      </div>
    </section>
    <footer>
      <div class="footer-form">
        <button id="register" @click="toRegister">新用户注册</button>
        <div class="line"></div>
        <button id="forget" @click="toForget">忘记密码？</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { apiGetUserInfo } from "../request/api";

export default {
  data() {
    return {
      password: "",
      phone: "",
      isPassword: true,
      isPhone: true,
      errorPhone: false,
      errorPassword: false
    };
  },
  methods: {
    //跳转到注册页
    toRegister() {
      this.$router.push("/Register");
    },
    //跳转到忘记密码页
    toForget() {
      this.$router.push("/Forget");
    },
    //判断账户格式
    phoneBlur() {
      let re_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!re_phone.test(this.phone)) {
        this.isPhone = false;
        this.errorPhone = true;
      } else {
        this.isPhone = true;
        this.errorPhone = false;
      }
    },
    //判断密码格式
    passBlur() {
      let re_pass = /^[\w_-]{6,16}$/;
      if (!re_pass.test(this.password)) {
        this.isPassword = false;
        this.errorPassword = true;
      } else {
        this.isPassword = true;
        this.errorPassword = false;
      }
    },
    //点击登录进行验证
    async toLogin() {
      if (this.phone === "") {
        this.isPhone = false;
        this.errorPhone = true;
      }
      if (this.password === "") {
        this.isPassword = false;
        this.errorPassword = true;
      }
      if (this.isPassword && this.phone && this.isPhone && this.password) {
        const params = {
          user_phone: this.phone,
          user_password: this.$md5(this.password)
        };
        const res = await apiGetUserInfo(params);
        if (res.userData != "") {
          localStorage.setItem("userInfo", JSON.stringify(res.userData[0]));
          this.$router.push("/Home");
        } else {
          alert("账号或密码错误");
        }
      }
    }
  }
};
</script>

<style scoped>
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #fff;
  font-size: 0.4rem;
  opacity: 0.5;
}
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: cover;
}
.true-phone,
.true-pass {
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  margin-top: 0.3rem;
  opacity: 0;
}
.redmin-phone,
.redmin-pass {
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  margin-top: 0.3rem;
}
.redmin-password {
  margin-bottom: 0.2rem;
}
section {
  padding: 5rem 0 0 1.6667rem;
  width: 100%;
  height: 9.5rem;
  z-index: 3;
}
.section-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 6.6667rem;
  height: 1.2rem;
  justify-content: center;
}
#userphone,
#password {
  width: 6.6667rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.4667rem;
  color: #fff;
  background: rgba(132, 176, 189, 0.2);
  margin-top: 0.2rem;
  border-radius: 0.0667rem;
}
#login {
  font-size: 0.5333rem;
  color: #fff;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0);
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.footer-form {
  display: flex;
  align-items: center;
  align-content: center;
  width: 6.6667rem;
  height: 0.9333rem;
  justify-content: center;
}
#register,
#forget {
  width: 2.6667rem;
  height: 0.9333rem;
  text-align: center;
  line-height: 0.9333rem;
  font-size: 0.3733rem;
  color: #fff;
  background: rgba(0, 0, 0, 0);
  opacity: 0.5;
}
.line {
  width: 0.04rem;
  height: 0.5333rem;
  background: #fff;
  opacity: 0.5;
  margin-left: 0.08rem;
}
</style>
