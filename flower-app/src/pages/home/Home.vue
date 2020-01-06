<template>
  <div class="home" v-title data-title="首页">
    <div class="banner">
      <slideshow :slides="slides" :inv="invTime"></slideshow>
    </div>
    <ul class="classify">
      <li @click="toFree">
        <img src="../../assets/images/flower1.png" />
        <p class="free-flowers">鲜花</p>
      </li>
      <li @click="toShield">
        <img src="../../assets/images/flower2.png" />
        <p class="shield-flowers">干花</p>
      </li>
      <li @click="toPot">
        <img src="../../assets/images/flower3.png" />
        <p class="pot-flowers">盆栽</p>
      </li>
    </ul>
    <section>
      <div class="hot">
        <p class="hot-title">推荐</p>
      </div>
      <ul class="flower-list">
        <card :showList="showList"></card>
      </ul>
    </section>
    <footer>
      <ul class="footer-btn">
        <li @click="goHome">
          <img src="../../assets/images/home_select.png" />
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
          <img src="../../assets/images/my.png" />
          <a href>我的</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import slides from "./Carousel.vue"; //引入轮播图组件
import card from "../../components/Card"; //引入商品卡片组件
import { apiHotProduct } from "../../request/api";

export default {
  components: {
    slideshow: slides,
    card: card
  },
  name: "home",
  data() {
    return {
      free: {
        category_id: 0,
        category_name: "鲜花"
      },
      shield: {
        category_id: 1,
        category_name: "干花"
      },
      pot: {
        category_id: 2,
        category_name: "盆栽"
      },
      invTime: 2000, //轮播图时间参数
      slides: [
        //轮播图图片数据
        {
          src: require("../../assets/images/banner1.png")
        },
        {
          src: require("../../assets/images/banner2.png")
        },
        {
          src: require("../../assets/images/banner3.png")
        }
      ],
      showList: []
    };
  },
  created() {
    this.getHotProduct();
  },
  methods: {
    //去鲜花列表
    toFree() {
      this.$router.push("/productlist");
      localStorage.setItem("category", JSON.stringify(this.free));
    },
    //去干花列表
    toShield() {
      this.$router.push("/productlist");
      localStorage.setItem("category", JSON.stringify(this.shield));
    },
    //去盆栽列表
    toPot() {
      this.$router.push("/productlist");
      localStorage.setItem("category", JSON.stringify(this.pot));
    },
    //获取热销商品列表
    async getHotProduct() {
      const res = await apiHotProduct();
      this.showList = res.hotProduct;
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
    // localStorage.setItem("category", JSON.stringify(this.category));
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 4rem;
  /* margin-top: 1.3333rem; */
}
.classify {
  width: 100%;
  height: 2.5rem;
  display: flex;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.1333rem;
}
.classify li {
  width: 1.3333rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.classify li img {
  width: 1.0667rem;
  height: 0.9333rem;
  margin-bottom: 0.2667rem;
}
.classify li p {
  font-size: 0.3733rem;
  color: #262426;
}
section {
  margin-bottom: 1.4rem;
}
.hot {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  padding-left: 0.2667rem;
  margin-bottom: 0.1333rem;
}
.hot-title {
  width: 100%;
  height: 1.3333rem;
  font-size: 0.4rem;
  color: #000;
  line-height: 1.3333rem;
  font-weight: bold;
}
.hot-title:before {
  content: url("../../assets/images/hot.png");
  display: inline-block;
  vertical-align: middle;
  height: 1.0933rem;
  margin-right: 0.3333rem;
}
.flower-list {
  width: 100%;
  padding: 0 0.1333rem 0 0.1333rem;
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
.footer-btn li:first-child a {
  color: #00cade;
}
</style>
