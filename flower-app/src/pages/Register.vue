<template>
  <div class="register">
    <section>
      <div class="section-form">
        <input
          type="text"
          v-model="phone"
          v-on:blur="phoneBlur"
          name="userphone"
          id="userphone"
          placeholder="请输入账户"
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
        <input
          type="password"
          v-model="surepass"
          v-on:blur="sureBlur"
          name="confirm"
          id="confirm"
          placeholder="确认密码"
        />
        <p :class="{ 'sure-pass': isSurepass, 'redmin-sure': errorSurepass }">两次输入不一致</p>
        <button id="register" @click="submitReg">注册</button>
      </div>
    </section>
    <footer>
      <div class="footer-form">
        <button id="taget">已有账号？</button>
        <div class="line"></div>
        <button id="login" @click="toLogin">直接登陆</button>
      </div>
    </footer>
    <div class="reg-success" v-show="issuccess">注册成功请登录！</div>
    <div class="reg-error" v-show="iserror">账户已存在！请直接登录</div>
  </div>
</template>

<script>
import {
  apiCreateUser,
  // apiGetUserPhone,
  apiFindUserPhone
} from "../request/api";

export default {
  data() {
    return {
      password: "",
      phone: "",
      surepass: "",
      isPassword: true,
      isPhone: true,
      isSurepass: true,
      errorPhone: false,
      errorSurepass: false,
      errorPassword: false,
      issuccess: false,
      iserror: false
    };
  },
  methods: {
    //判断账号格式
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
    //判断第二次密码是否一致
    sureBlur() {
      if (this.password != this.surepass) {
        this.isSurepass = false;
        this.errorSurepass = true;
      } else {
        this.isSurepass = true;
        this.errorSurepass = false;
      }
    },
    //已有账号直接登陆
    toLogin() {
      this.$router.push("/");
    },
    //提交注册
    async submitReg() {
      const params1 = {
        user_phone: this.phone
      };
      const params2 = {
        user_phone: this.phone,
        user_password: this.$md5(this.password)
      };
      const res1 = await apiFindUserPhone(params1);
      if (res1.userData[0]) {
        //已存在账户
        this.iserror = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } else {
        //不存在则注册
        const res2 = await apiCreateUser(params2);
        if (res2.code) {
          this.issuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
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
.register {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: cover;
}
section {
  padding: 5rem 0 0 1.6667rem;
  width: 100%;
  height: 11rem;
  z-index: 2;
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
#password,
#confirm {
  width: 6.6667rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.4667rem;
  color: #fff;
  background: rgba(132, 176, 189, 0.2);
  border-radius: 0.0667rem;
}
#userphone,
#password,
#confirm {
  margin-top: 0.2rem;
}
.true-phone,
.true-pass,
.sure-pass {
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  margin-top: 0.3rem;
  opacity: 0;
}
.redmin-phone,
.redmin-pass,
.redmin-sure {
  width: 100%;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  margin-top: 0.3rem;
}
#register {
  font-size: 0.5333rem;
  color: #fff;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0);
}
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.footer-form {
  display: flex;
  align-items: center;
  align-content: center;
  width: 6.6667rem;
  height: 0.9333rem;
  justify-content: center;
}
#taget,
#login {
  width: 2.2rem;
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
.reg-success,
.reg-error {
  width: 6.6667rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 0.0667rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0.48rem;
  color: #000;
  z-index: 3;
  position: fixed;
  top: 5.4rem;
  left: 1.6rem;
}
</style>
