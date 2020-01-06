<template>
  <div class="cart-list" v-title data-title="购物车">
    <section>
      <ul class="cart-ul">
        <cartCard :showList="showList" v-if="showList.length"></cartCard>
        <div class="not-data" v-else>
          <img src="../../assets/images/nocart.png" />
          <p>您的购物车空空如也~</p>
        </div>
      </ul>
    </section>
    <footer>
      <ul class="footer-btn">
        <li @click="goHome">
          <img src="../../assets/images/home.png" />
          <a href>首页</a>
        </li>
        <li @click="goCart">
          <img src="../../assets/images/cart_select.png" />
          <a href>购物车</a>
        </li>
        <li @click="goOrder">
          <img src="../../assets/images/order.png" />
          <a href>订单</a>
        </li>
        <li @click="goPersonal">
          <img src="../../assets/images/my.png" />
          <a href>我的</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import cartCard from "../../components/CartCard";
import { apiCartList } from "../../request/api";

export default {
  components: {
    cartCard: cartCard
  },
  data() {
    return {
      showList: [],
      userInfo: []
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getCartList();
  },
  methods: {
    //获取用户购物车列表
    async getCartList() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiCartList(params);
      this.showList = res.cartList;
    },
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
  padding: 0.1333rem 0 0 0;
  margin-bottom: 1.4rem;
}
.cart-ul {
  width: 100%;
  padding: 0 0.2667rem 0 0.2667rem;
}
.not-data {
  margin-left: 2rem;
  margin-top: 3.4rem;
  width: 6rem;
}
.not-data img {
  width: 6rem;
  height: 5.3333rem;
}
.not-data p {
  width: 6rem;
  color: #000;
  font-size: 0.3733rem;
  text-align: center;
  height: 1.3333rem;
  line-height: 1.3333rem;
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
.footer-btn li:nth-child(2) a {
  color: #00cade;
}
</style>
