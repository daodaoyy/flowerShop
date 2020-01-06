<template>
  <div class="order-list" v-title data-title="我的订单">
    <section>
      <ul class="order-tab">
        <li
          :class="{ 'active': $index==selectItem , 'unactive': $index!=selectItem}"
          v-for="(item, $index) in tabList"
          :key="$index"
          @click="selectTab(item,$index)"
        >{{item.tab_name}}</li>
        <span class="slide"></span>
      </ul>
      <ul class="order-ul">
        <orderCard :showList="showList" v-if="showList.length"></orderCard>
        <div class="not-data" v-else>
          <img src="../../assets/images/noorder.png" />
          <p>暂无订单~</p>
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
          <img src="../../assets/images/cart.png" />
          <a href>购物车</a>
        </li>
        <li @click="goOrder">
          <img src="../../assets/images/order_select.png" />
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
import Vue from "vue";
import orderCard from "../../components/OrderCard";
import { apiAllOrder, apiClassOrder } from "../../request/api";

export default {
  components: {
    orderCard: orderCard
  },
  data() {
    return {
      showList: [],
      userInfo: [],
      selectItem: 0,
      isActive: false,
      tabList: [
        {
          tab_id: 0,
          tab_name: "全部"
        },
        {
          tab_id: 1,
          tab_name: "待付款"
        },
        {
          tab_id: 2,
          tab_name: "待发货"
        },
        {
          tab_id: 3,
          tab_name: "待收货"
        }
      ]
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getAllOrder();
  },
  methods: {
    //获取用户全部订单
    async getAllOrder() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiAllOrder(params);
      this.showList = res.allOrder;
    },
    //tab选项卡切换
    async selectTab(item, index) {
      this.$nextTick(function() {
        this.tabList.forEach(function(item) {
          document.querySelector(".slide").style.left = index * 2.4933 + "rem";
        });
        this.selectItem = index;
      });
      const order_status = index - 1;
      const params = {
        user_id: this.userInfo.user_id,
        order_status: order_status
      };
      const res = await apiClassOrder(params);
      this.showList = res.classOrder;
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
    //   //点击返回上一页对应的商品详情页
    //   document.querySelector("header").addEventListener("click", () => {
    //     this.$router.go(-1);
    //   });
    // });
  }
};
</script>

<style scoped>
section {
  padding: 0.04rem 0 0 0;
  margin-bottom: 1.4rem;
}
.order-tab {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  margin-bottom: 0.5333rem;
}
.unactive {
  width: 1.8667rem;
  height: 1.6rem;
  flex: 1;
  text-align: center;
  line-height: 1.6rem;
  font-size: 0.4267rem;
  color: #000;
}
.active {
  width: 1.8667rem;
  height: 1.6rem;
  flex: 1;
  text-align: center;
  line-height: 1.6rem;
  font-size: 0.4267rem;
  color: #00cade;
}
.slide {
  width: 2.4933rem;
  height: 0.0667rem;
  background-color: #00cade;
  position: absolute;
  top: 1.6rem;
  left: 0;
  transition: left 0.3s;
}
.order-ul {
  width: 100%;
  padding: 0 0.3333rem 0 0.3333rem;
}
.not-data {
  margin-left: 2rem;
  margin-top: 3rem;
  width: 5rem;
}
.not-data img {
  width: 5rem;
  height: 5rem;
}
.not-data p {
  width: 5rem;
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
.footer-btn li:nth-child(3) a {
  color: #00cade;
}
</style>
