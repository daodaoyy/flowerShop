<template>
  <div class="card">
    <li class="cart-li" v-for="(item, index) in showList" :key="index">
      <div class="title">
        <span class="product-name">{{item.product_name}}</span>
      </div>
      <div class="content">
        <img :src="getImgUrl(item.product_img)" class="product-img" />
        <div class="content-right">
          <span class="product-data">{{item.product_datas}}</span>
          <div class="product-number">
            <span id="dec" @click="decNumber(item.cart_id, index)"></span>
            <span class="number">{{item.product_number}}</span>
            <span id="add" @click="addNumber(item.cart_id,index)"></span>
          </div>
        </div>
      </div>
      <div class="handle">
        <button id="delete" @click="deleteCart(item.cart_id,index)">删除</button>
        <span class="product-price">&yen;{{item.product_price}}</span>
        <button id="pay" @click="toPay(item)">去结算</button>
      </div>

      <!-- 删除购物车弹框 -->
      <div class="cart-frame" v-show="cart_frame === index">
        <p class="frame-tag">您确认删除吗？</p>
        <div class="frame-btn">
          <button @click="sureDelete(item.cart_id,index)">确认</button>
          <button @click="outDelete">取消</button>
        </div>
      </div>
    </li>
    <!-- 遮罩 -->
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import { apiDeleteCart } from "../request/api";
import { apiChangeCart } from "../request/api";

export default {
  data() {
    return {
      islayer: false,
      cart_frame: -1
    };
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
    //解析图片
    getImgUrl(icon) {
      return require("../assets/" + icon);
    },
    //删除购物车
    deleteCart(id, index) {
      if (this.cart_frame === index) {
        this.cart_frame = -1;
      } else {
        this.cart_frame = index;
      }
      this.islayer = true;
    },
    //取消删除
    outDelete() {
      this.cart_frame = -1;
      this.islayer = false;
    },
    //确认删除购物车
    async sureDelete(id, index) {
      const params = {
        cart_id: id
      };
      const res = await apiDeleteCart(params);
      if (res.code) {
        this.showList.splice(index, 1);
        this.islayer = false;
        this.cart_frame = -1;
      }
    },
    //去结算
    async toPay(item) {
      this.$router.push("/PlaceOrder");
      localStorage.setItem("productInfo", JSON.stringify(item));
    },
    //增加购物车商品
    async addNumber(id, index) {
      this.showList[index].product_number += 1;
      const temp = this.showList[index].product_number;
      const params = {
        cart_id: id,
        product_number: temp
      };
      const res = await apiChangeCart(params);
    },
    //减少购物车商品
    async decNumber(id, index) {
      if (this.showList[index].product_number > 1) {
        this.showList[index].product_number -= 1;
        const temp = this.showList[index].product_number;
        const params = {
          cart_id: id,
          product_number: temp
        };
        const res = await apiChangeCart(params);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.cart-li {
  width: 9.4667rem;
  height: 5.3333rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0.4rem 0.2667rem 0 0.2667rem;
  background-color: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.1333rem;
}
.title {
  display: flex;
  align-items: center;
  padding-left: 0.5333rem;
  width: 100%;
  margin-bottom: 0.5333rem;
}
.product-name {
  font-size: 0.4267rem;
  color: #000;
  font-weight: bold;
  line-height: 0.48rem;
  height: 0.48rem;
}
.content {
  width: 100%;
  height: 2.6667rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0.2667rem;
}
.product-img {
  height: 2.6667rem;
  margin-right: 0.4rem;
  margin-left: 0.5333rem;
}
.product-data {
  width: 5.3333rem;
  font-size: 0.3733rem;
  color: #000;
  line-height: 0.5333rem;
  height: 0.6667rem;
  margin-right: 0.2667rem;
  margin-bottom: 1rem;
}
.content-right {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.handle {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#delete {
  width: 1.8rem;
  height: 0.7rem;
  text-align: center;
  line-height: 0.7rem;
  margin-right: 3.2rem;
  font-size: 0.32rem;
  border-radius: 0.5333rem;
}
#pay {
  width: 1.8rem;
  height: 0.7rem;
  text-align: center;
  color: #fff;
  background-color: #fe734a;
  line-height: 0.7rem;
  margin-right: 0.4rem;
  font-size: 0.3467rem;
  border-radius: 0.5333rem;
}
.product-price {
  font-size: 0.3733rem;
  color: #fe734a;
  line-height: 0.4267rem;
  height: 0.4267rem;
  margin-right: 0.4rem;
}
.number {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.48rem;
}
.product-number {
  width: 2.6667rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#dec {
  width: 0.48rem;
  height: 0.48rem;
  text-align: center;
  background: url("../assets/images/des.png") no-repeat;
  background-size: 100%;
  margin-right: 0.2rem;
}
#add {
  width: 0.48rem;
  height: 0.48rem;
  text-align: center;
  background: url("../assets/images/add.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
}
.cart-frame {
  width: 6rem;
  height: 3.4rem;
  border-radius: 0.2rem;
  background-color: #fff;
  position: fixed;
  bottom: 8.5rem;
  left: 2rem;
  z-index: 3;
}
.frame-tag {
  width: 100%;
  height: 2rem;
  font-size: 0.48rem;
  color: #000;
  text-align: center;
  line-height: 2rem;
  border-bottom: 0.0667rem #f2f3f5 solid;
}
.frame-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.frame-btn button:nth-child(1) {
  border-right: 0.0267rem #f2f3f5 solid;
}
.frame-btn button {
  width: 50%;
  font-size: 0.48rem;
  border-radius: 0 0 0 0.2rem;
  color: #000;
  text-align: center;
  line-height: 1.4rem;
  background-color: #fff;
}
.pay-shade {
  width: 100%;
  height: 7.5rem;
  background-color: #f2f3f5;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
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