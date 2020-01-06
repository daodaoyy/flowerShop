<template>
  <div class="flower-detile" v-title :data-title="productData.product_name">
    <section>
      <img
        v-if="productData.product_img"
        :src="getImgUrl(productData.product_img)"
        class="flower-img"
      />
      <div class="flower-content">
        <div class="flower-msg">
          <p class="flower-name">{{productData.product_name}}</p>
          <p class="flower-price">&yen;{{productData.product_price}}</p>
        </div>
        <div class="flower-sell">已售{{productData.product_sell}}件</div>
      </div>
      <p class="flower-language">{{productData.product_language}}</p>
      <p class="flower-datas">{{productData.product_datas}}</p>
    </section>
    <footer>
      <div class="cart-page">
        <span class="cart-icon" @click="toCart"></span>
        <span class="cart-number" v-show="isShow">{{this.product_number}}</span>
        <p class="cart-word">购物车</p>
      </div>
      <button id="cart-btn" name="cart" @click="getCart">加入购物车</button>
      <button id="buy-btn" name="buy" @click="buyNew(productData)">立即购买</button>
    </footer>
    <!-- 添加购物车弹框 -->
    <div class="add-cart">已添加~</div>
  </div>
</template>

<script>
import { apiCreateCart, apiGetOneCart, apiChangeCart } from "../../request/api";
export default {
  data() {
    return {
      isShow: false,
      product_number: "",
      productData: []
    };
  },
  created() {
    this.productData = JSON.parse(localStorage.getItem("productInfo"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getCartData();
  },
  methods: {
    //获取某个购物车
    async getCartData() {
      const params = {
        user_id: this.userInfo.user_id,
        product_id: this.productData.product_id
      };
      const resGetCart = await apiGetOneCart(params);
      if (resGetCart.code) {
        this.isShow = true;
        this.product_number = resGetCart.product_number;
      }
    },
    //解析图片
    getImgUrl(icon) {
      return require("../../assets/" + icon);
    },
    //点击购物车跳转到购物车列表
    toCart() {
      this.$router.push("/CartList");
    },
    //添加到购物车
    async getCart() {
      const params1 = {
        user_id: this.userInfo.user_id,
        product_id: this.productData.product_id
      };
      const resGetCart = await apiGetOneCart(params1);
      //判断购物车是否有该商品、没有添加，有就更新数量
      if (resGetCart.code == 0) {
        const params2 = {
          user_id: this.userInfo.user_id,
          product_id: this.productData.product_id,
          product_img: this.productData.product_img,
          product_name: this.productData.product_name,
          product_datas: this.productData.product_datas,
          product_number: 1,
          product_price: this.productData.product_price,
          isdelete: false
        };
        const resAddCart = await apiCreateCart(params2);
        if (resAddCart.code) {
          this.isShow = true;
          this.product_number = 1;
          document.querySelector(".add-cart").style.opacity = 1;
          setTimeout(() => {
            document.querySelector(".add-cart").style.opacity = 0;
          }, 1000);
        }
      } else {
        const params3 = {
          cart_id: resGetCart.cart_id,
          product_number: resGetCart.product_number + 1
        };
        const resChangeCart = await apiChangeCart(params3);
        this.product_number = this.product_number + 1;
      }
    },
    //立即购买
    buyNew(row) {
      this.$router.push("/PlaceOrder");
      localStorage.setItem("productInfo", JSON.stringify(row));
    }
  },
  mounted() {
    // setTimeout(() => {
    //   //加计时器，避免require延时加载图片时监听事件出错
    //   this.$nextTick(() => {
    //     //点击返回上一页（首页列表和商品分类列表页）
    //     document.querySelector("header").addEventListener("click", () => {
    //       this.$router.go(-1);
    //     });
    //   });
    // }, 100);
  }
};
</script>

<style scoped>
section {
  margin-bottom: 1.4rem;
}
.flower-img {
  width: 100%;
  height: 9rem;
}
.flower-content {
  width: 100%;
  height: 1.8667rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
  margin-bottom: 0.2rem;
}
.flower-name {
  font-size: 0.4667rem;
  line-height: 0.4667rem;
  color: #000;
  margin-bottom: 0.3333rem;
}
.flower-price {
  font-size: 0.4667rem;
  line-height: 0.4667rem;
  color: #fe734a;
}
.flower-sell {
  font-size: 0.3733rem;
  color: #979ba2;
}
.flower-language {
  margin-bottom: 0.0667rem;
}
.flower-language,
.flower-datas {
  width: 100%;
  height: 1.6rem;
  line-height: 0.5rem;
  font-size: 0.3467rem;
  background-color: #fff;
  padding: 0.2667rem 0 0 0.5333rem;
}
.flower-language:before {
  content: "花语";
  margin-right: 0.2667rem;
  font-weight: bold;
}
.flower-datas:before {
  content: "材料";
  margin-right: 0.2667rem;
  font-weight: bold;
}
.add-cart {
  width: 2.6667rem;
  height: 0.8rem;
  background-color: #fff;
  font-size: 0.3733rem;
  color: #000;
  text-align: center;
  line-height: 0.8rem;
  position: fixed;
  bottom: 1.3333rem;
  left: 4rem;
  z-index: 3;
  border-radius: 0.0667rem;
  opacity: 0;
  transition: opacity 1.5s;
}
footer {
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
}
#cart-btn,
#buy-btn {
  width: 4rem;
  line-height: 1.6rem;
  text-align: center;
  font-size: 0.4667rem;
  color: #fff;
}
.cart-page {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.cart-icon {
  width: 100%;
  height: 0.65rem;
  line-height: 0.65rem;
  text-align: center;
  font-size: 0.6rem;
}
.cart-icon:before {
  content: url("../../assets/images/cart-small2.png");
  width: 1.0667rem;
  height: 0.6667rem;
  display: inline-block;
  vertical-align: middle;
}
.cart-number {
  position: fixed;
  bottom: 1.2rem;
  left: 1.25rem;
  font-size: 0.32rem;
  width: 0.5333rem;
  height: 0.5333rem;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  line-height: 0.5333rem;
  text-align: center;
}
.cart-word {
  width: 100%;
  line-height: 0.6667rem;
  text-align: center;
  font-size: 0.4rem;
  color: #707070;
}
#cart-btn {
  background-color: #00cade;
}
#buy-btn {
  background-color: #fe734a;
}
</style>
