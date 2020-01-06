<template>
  <div class="card">
    <li
      class="flower-card"
      v-for="(item, index) in showList"
      :key="index"
      @click="handleWatch(item)"
    >
      <div class="left-img">
        <img :src="getImgUrl(item.product_img)" />
      </div>
      <div class="right-content">
        <span class="flower-name">{{item.product_name}}</span>
        <p class="flower-data">{{item.product_datas}}</p>
        <p class="flower-taget">{{item.product_desc}}</p>
        <p class="flower-price">
          <span class="price">&yen;{{item.product_price}}</span>
          <span class="sell">已售{{item.product_sell}}件</span>
        </p>
      </div>
    </li>
  </div>
</template>

<script>
import { apiCreateCart } from "../request/api";

export default {
  data() {
    return {};
  },
  props: {
    //向首页父组件传递默认数组
    showList: {
      Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    handleWatch(row) {
      this.$router.push("/ProductDetile");
      localStorage.setItem("productInfo", JSON.stringify(row));
    },
    getImgUrl(icon) {
      return require("../assets/" + icon);
    }
  }
};
</script>

<style scoped>
.flower-card {
  width: 9.7rem;
  height: 5.3333rem;
  display: flex;
  flex-flow: row;
  border-radius: 0.2rem;
  background-color: #fff;
}
.flower-card:not(:last-child) {
  margin-bottom: 0.2667rem;
}
.left-img {
  width: 4.5333rem;
  height: 5.3333rem;
}
.left-img img {
  width: 100%;
  height: 100%;
  border-radius: 0.2rem 0 0 0.2rem;
}
.right-content {
  flex: 1;
  padding: 0.3333rem 0.4rem 0 0.4rem;
}
.flower-name {
  display: inline-block;
  font-size: 0.48rem;
  color: #000;
  line-height: 0.5333rem;
  margin-bottom: 0.0667rem;
}
.flower-data {
  font-size: 0.3733rem;
  color: #000;
  line-height: 0.48rem;
  margin-bottom: 0.4667rem;
}
.flower-taget {
  font-size: 0.3733rem;
  color: #000;
  height: 0.9rem;
  line-height: 0.9rem;
  border-top: 3px solid #f2f3f5;
  border-bottom: 3px solid #f2f3f5;
  margin-bottom: 0.9333rem;
}
.flower-price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  font-size: 0.5067rem;
  color: #fe734a;
  line-height: 0.6rem;
}
.sell {
  font-size: 0.3467rem;
  color: #797a7d;
  line-height: 0.4rem;
}
</style>