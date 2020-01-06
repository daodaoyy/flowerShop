<template>
  <div class="password" v-title data-title="我的账户">
    <section>
      <div class="old-password">
        <span class="old-tag">您的旧密码：</span>
        <input type="password" class="old-text" value v-model="old_password" v-on:blur="writePass" />
      </div>
      <div class="new-password">
        <span class="new-tag">新密码：</span>
        <input type="password" class="new-text" value v-model="new_password" v-on:blur="editPass" />
      </div>
      <div class="sure-password">
        <span class="sure-tag">确认新密码：</span>
        <input type="password" class="sure-text" value v-model="sure_password" v-on:blur="surePass" />
      </div>
      <div class="submit">
        <button id="submit-password" @click="submitPass">确认</button>
      </div>
      <div class="old">密码输入错误</div>
      <div class="new">请输入6-16位数字或字母或_或-</div>
      <div class="sure">两次密码不一致</div>
      <div class="login" v-show="islogin">账号密码过期请重新登录!</div>
      <div class="overlayer" v-show="islayer"></div>
    </section>
  </div>
</template>

<script>
import { apiChangePass } from "../../request/api";

export default {
  data() {
    return {
      islayer: false,
      islogin: false,
      userData: {},
      old_password: "",
      new_password: "",
      sure_password: ""
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    //判断输入旧密码是否正确
    writePass() {
      let old = this.$md5(this.old_password);
      if (old != this.userData.user_password) {
        document.querySelector(".old").style.opacity = 1;
        setTimeout(() => {
          document.querySelector(".old").style.opacity = 0;
        }, 2000);
      }
    },
    //判断新密码格式是否正确
    editPass() {
      let re_pass = /^[\w_-]{6,16}$/;
      if (!re_pass.test(this.new_password)) {
        document.querySelector(".new").style.opacity = 1;
        setTimeout(() => {
          document.querySelector(".new").style.opacity = 0;
        }, 2000);
      }
    },
    //确认新密码
    surePass() {
      if (this.new_password != this.sure_password) {
        document.querySelector(".sure").style.opacity = 1;
        setTimeout(() => {
          document.querySelector(".sure").style.opacity = 0;
        }, 2000);
      }
    },
    //提交修改
    async submitPass() {
      const params = {
        user_id: this.userData.user_id,
        user_password: this.$md5(this.new_password)
      };
      const res = await apiChangePass(params);
      if (res.code) {
        this.islayer = true;
        this.islogin = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   //点击返回上一页
    //   document.querySelector("header").addEventListener("click", () => {
    //     this.$router.go(-1);
    //   });
    // });
  }
};
</script>

<style scoped>
section {
  padding: 0.8rem 0 0 0;
}
.old-password,
.new-password,
.sure-password {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 0.5333rem;
}
.old-password {
  margin-bottom: 0.4rem;
}
.new-password {
  margin-bottom: 0.0667rem;
}
.sure-password {
  margin-bottom: 0.6667rem;
}
.old-tag,
.new-tag,
.sure-tag {
  font-size: 0.4rem;
  color: #707070;
  line-height: 0.4rem;
}
.old-text,
.new-text,
.sure-text {
  width: 4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.4267rem;
  color: #000;
  text-align: left;
}
.submit {
  width: 100%;
  height: 3.3333rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#submit-password {
  width: 8rem;
  height: 1.3333rem;
  background-color: #00cade;
  border-radius: 0.6667rem;
  text-align: center;
  line-height: 1.3333rem;
  color: #fff;
  font-size: 0.48rem;
}
.old,
.new,
.sure {
  width: 8rem;
  height: 0.8rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.32rem;
  color: #000;
  background-color: #fff;
  border-radius: 0.1333rem;
  border: 0.0133rem solid #ccc;
  z-index: 3;
  opacity: 0;
  color: red;
  transition: opacity 1s;
}
.old {
  width: 5rem;
  position: fixed;
  top: 1.6rem;
  left: 3.5rem;
}
.new {
  width: 6rem;
  position: fixed;
  top: 3.5rem;
  left: 3rem;
}
.sure {
  width: 5rem;
  position: fixed;
  top: 4.8rem;
  left: 3.4rem;
}
.login {
  width: 7rem;
  height: 4rem;
  position: fixed;
  font-size: 0.48rem;
  color: #000;
  top: 5.3333rem;
  left: 1.5rem;
  background-color: #fff;
  text-align: center;
  line-height: 4rem;
  border-radius: 0.1333rem;
  z-index: 4;
}
.overlayer {
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
