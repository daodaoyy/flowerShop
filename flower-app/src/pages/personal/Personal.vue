<template>
  <div class="personal" v-title data-title="我的账户">
    <section>
      <div class="person-msg" @click="goMsg">
        <p class="msg-tag">个人资料</p>
        <a href class="msg-edit"></a>
      </div>
      <div class="person-password" @click="goPassword">
        <p class="password-tag">修改密码</p>
        <a href class="password-edit"></a>
      </div>
      <div class="person-secret" @click="goSecret">
        <p class="secret-tag">设置密保</p>
        <a href class="secret-edit"></a>
      </div>
      <div class="person-address" @click="goAddress">
        <p class="address-tag">收货地址</p>
        <a href class="address-edit"></a>
      </div>
      <div class="app-introduct" @click="goIntroduct">
        <p class="introduct-tag">功能介绍</p>
        <a href class="introduct-edit"></a>
      </div>
    </section>
    <footer>
      <ul class="footer-btn">
        <li @click="goHome">
          <img src="../../assets/images/home.png" />
          <a href>首页</a>
        </li>
        <li @click="goCart">
          <img src="../../assets/images/cart.png" />
          <a href>购物车</a>
        </li>
        <li @click="goOrder">
          <img src="../../assets/images/order.png" />
          <a href>订单</a>
        </li>
        <li @click="goPersonal">
          <img src="../../assets/images/my-select.png" />
          <a href>我的</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    //跳转到首页
    goHome() {
      this.$router.push("/Home");
    },
    //跳转到购物车页
    goCart() {
      this.$router.push("/CartList");
    },
    //跳转到订单页
    goOrder() {
      this.$router.push("/OrderList");
    },
    //跳转到个人中心页
    goPersonal() {
      this.$router.push("/Personal");
    },
    //跳转到个人资料页
    goMsg() {
      this.$router.push("/PersonalMsg");
    },
    //跳转到修改密码页
    goPassword() {
      this.$router.push("/Password");
    },
    //跳转到设置密保页
    goSecret() {
      this.$router.push("/Secret");
    },
    //跳转到收货地址页
    goAddress() {
      this.$router.push("/AddressList");
    },
    //跳转到功能介绍页
    goIntroduct() {
      this.$router.push("/Introduct");
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
.person-msg,
.person-password,
.person-secret,
.person-address,
.app-introduct {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
  margin-bottom: 0.5333rem;
}
.msg-tag,
.msg-edit,
.password-tag,
.password-edit,
.address-tag,
.address-edit,
.secret-tag,
.secret-edit,
.introduct-tag,
.introduct-edit {
  font-size: 0.4rem;
  line-height: 0.48rem;
  color: #000;
}
.secret-edit,
.msg-edit:after,
.password-edit:after,
.address-edit:after,
.introduct-edit:after {
  content: url("../../assets/images/entry.png");
  display: inline-block;
  vertical-align: middle;
  pointer-events: auto;
  margin-left: 0.2667rem;
}
.person-password {
  margin-bottom: 0.0667rem;
}
.person-address {
  margin-bottom: 1.0667rem;
}
.app-introduct {
  margin-bottom: 0.04rem;
}
footer {
  width: 100%;
  height: 1.3333rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer-btn {
  width: 100%;
  height: 1.3333rem;
  display: flex;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
}
.footer-btn li {
  width: 1.3333rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.footer-btn li img {
  width: 0.8533rem;
  height: 0.8533rem;
}
.footer-btn li a {
  font-size: 0.3467rem;
  color: #262426;
}
.footer-btn li:nth-child(4) a {
  color: #00cade;
}
</style>
