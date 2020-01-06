<template>
  <div class="place-order" v-title data-title="提交订单">
    <section>
      <div class="address" @click="editAddress">
        <div class="address-msg">
          <p class="receiver" v-if="addressData">
            {{addressData.receiver}}
            <span
              class="address-phone"
              v-if="addressData"
            >{{addressData.address_phone}}</span>
          </p>
          <p class="address-detile" v-if="addressData">
            {{addressData.province_name}}{{addressData.city_name}}
            {{addressData.district_name}}{{addressData.address_detile}}
          </p>
        </div>
        <a href class="address-modify"></a>
      </div>
      <div class="buyer-name">
        <span class="name-tag">订购人姓名：</span>
        <input v-model="buyer_name" type="text" class="name-text" required value />
      </div>
      <div class="buyer-phone">
        <span class="phone-tag">订购人电话：</span>
        <input v-model="buyer_phone" type="text" class="phone-text" value />
      </div>
      <div class="keywords">
        留言：
        <textarea class="words-edit" v-model="order_words"></textarea>
      </div>
      <div class="price-msg">
        <div class="cost">
          <div class="cost-handle">
            <span id="dec" @click="decNumber"></span>
            <span class="number">{{this.product_number}}</span>
            <span id="add" @click="addNumber"></span>
          </div>
          <span class="origin-cost">&yen; {{productData.product_price*this.product_number}}</span>
        </div>
        <div class="points-select">
          <input name="check" type="checkbox" id="points-check" @click="checkPoints($event)" value />
          <p class="discount">
            优惠：
            <span class="dis-money">&yen; {{this.order_dec}}</span>
          </p>
        </div>
        <div class="sum-points">您已拥有 {{user_points}} 积分（单次最多可使用2000积分）</div>
        <div :class="{ checked: isChecked, 'points-detile': notChecked }">
          <span class="remind">请输入积分数量：</span>
          <input type="text" v-model="pointsNumber" class="points-number" value />
          <button id="submit-points" @click="submitPoints">确定</button>
        </div>
      </div>

      <!-- 付款弹窗 -->
      <div class="pay-shade" v-show="isshade">
        <div class="pay-header">
          <span class="cancel" @click="cancel"></span>
          <span class="pay-title">确认付款</span>
        </div>
        <p class="pay-money">{{this.order_price}}</p>
        <p class="phone">
          订购人电话
          <span class="phone-detile">{{this.buyer_phone}}</span>
        </p>
        <p class="points">
          使用积分数
          <span class="points-qulity">{{this.pointsNumber}}</span>
        </p>
        <button id="submit-pay" @click="subPay">付款</button>
      </div>
    </section>
    <!-- 付款成功弹窗 -->
    <div class="pay-success" v-show="paySuccess">支付成功</div>

    <footer>
      <span class="sum-price">&yen; {{this.order_price}}</span>
      <button id="account" @click="goAccount">去付款</button>
    </footer>

    <!-- 遮罩 -->
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import {
  apiNewOrder,
  apiGetUserData,
  apiGetOneCart,
  apiUpdatePoints,
  apiUpdateProduct,
  apiReceiveOrder,
  apiDefaultAddress
} from "../../request/api";

export default {
  data() {
    return {
      isshade: false,
      islayer: false,
      isChecked: false,
      notChecked: true,
      paySuccess: false,
      order_id: "",
      order_price: 0,
      order_dec: 0,
      user_points: "",
      level: "",
      pointsNumber: 0,
      order_words: "",
      buyer_name: "",
      buyer_phone: "",
      order_time: "",
      product_number: 1,
      productData: [],
      userInfo: [],
      addressData: {}
    };
  },
  created() {
    this.productData = JSON.parse(localStorage.getItem("productInfo"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.addressData = JSON.parse(localStorage.getItem("defaultAddress"));
    this.getAddress();
    this.getUserInfo();
    this.getCartData();
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiGetUserData(params);
      this.user_points = res.userData[0].user_points;
    },
    //获取某个购物车
    async getCartData() {
      const params = {
        user_id: this.userInfo.user_id,
        product_id: this.productData.product_id
      };
      const resGetCart = await apiGetOneCart(params);
      if (resGetCart.code) {
        this.product_number = resGetCart.product_number;
        this.order_price = this.productData.product_price * this.product_number;
      } else {
        this.order_price = this.productData.product_price;
      }
    },
    //获取默认地址
    async getAddress() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiDefaultAddress(params);
      if (!res.addressData[0]) {
        localStorage.removeItem("defaultAddress");
      }
    },
    //去地址列表
    editAddress() {
      this.$router.push("/AddressList");
    },
    //减少商品
    decNumber() {
      if (this.product_number > 1) {
        this.product_number -= 1;
        this.order_price =
          this.productData.product_price * this.product_number - this.order_dec;
      }
    },
    //增加商品
    addNumber() {
      this.product_number += 1;
      this.order_price =
        this.productData.product_price * this.product_number - this.order_dec;
    },
    //计算积分优惠后的价格
    submitPoints() {
      console.log(this.user_points);
      if (this.pointsNumber > this.user_points) {
        alert("您当前积分不足哟~");
      } else if (this.pointsNumber > 2000) {
        alert("您本次最多可使用2000积分哟~");
      } else {
        this.order_dec = this.pointsNumber / 100;
        this.order_price =
          this.productData.product_price * this.product_number - this.order_dec;
      }
    },
    //选择积分
    checkPoints(e) {
      let checked = e.target.checked;
      if (checked) {
        this.isChecked = true;
        this.notChecked = false;
      } else {
        this.isChecked = false;
        this.notChecked = true;
      }
    },
    //点击去付款生成订单并弹出付款弹框
    async goAccount() {
      this.isshade = true;
      this.islayer = true;
      //获取当前时间戳
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      this.order_time = y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      this.order_id = "" + this.userInfo.user_id + h + m + s;
      //向后台传参
      const params = {
        order_id: this.order_id,
        order_time: this.order_time,
        order_price: this.order_price,
        order_words: this.order_words,
        order_status: 0,
        product_number: this.product_number,
        buyer_name: this.buyer_name,
        buyer_phone: this.buyer_phone,
        user_id: this.userInfo.user_id,
        points_number: this.pointsNumber,
        product_id: this.productData.product_id,
        product_img: this.productData.product_img,
        address_id: 1,
        product_name: this.productData.product_name
      };
      const res = await apiNewOrder(params);
      if (res.code) {
        console.log(res.code);
      }
    },
    //取消付款,关闭弹框
    cancel() {
      this.isshade = false;
      this.islayer = false;
    },
    //付款
    async subPay() {
      //改变用户积分和积分等级
      const points = this.user_points - this.pointsNumber + this.order_price;
      if (points <= 2000) {
        this.level = 0;
      } else if (2000 < points <= 5000) {
        this.level = 1;
      } else if (5000 < points <= 8000) {
        this.level = 2;
      } else if (8000 < points <= 10000) {
        this.level = 3;
      } else if (10000 < points) {
        this.level = 4;
      }
      const params1 = {
        user_id: this.userInfo.user_id,
        user_points: points,
        user_level: this.level
      };
      const res1 = await apiUpdatePoints(params1);
      //改变商品库存和销量
      const stock = this.productData.product_stock - this.product_number;
      const sell = this.productData.product_sell + this.product_number;
      const params2 = {
        product_id: this.productData.product_id,
        product_stock: stock,
        product_sell: sell
      };
      const res2 = await apiUpdateProduct(params2);
      //改变订单状态为待发货
      const params3 = {
        order_id: this.order_id,
        order_status: 1
      };
      const res3 = await apiReceiveOrder(params3);
      //付款成功展示弹框并跳转到订单页
      if (res1 && res2 && res3) {
        this.paySuccess = true;
        this.isshade = false;
        setTimeout(() => {
          //3000秒后调转订单列表
          this.$router.push("/OrderList");
        }, 3000);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
section {
  margin-bottom: 1.4rem;
}
.address {
  width: 100%;
  height: 1.8667rem;
  background-color: #fff;
  border-top: 0.04rem solid #f2f3f5;
  padding: 0 0.5333rem 0 0.5333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}
.receiver,
.address-phone {
  font-size: 0.4267rem;
  color: #000;
  line-height: 0.48rem;
  margin-bottom: 0.1333rem;
}
.address-phone {
  margin-left: 0.4rem;
}
.address-detile {
  font-size: 0.3467rem;
  line-height: 0.4rem;
  color: #707070;
}
.address-modify:before {
  content: url("../../assets/images/entry.png");
  display: inline-block;
  vertical-align: middle;
  pointer-events: auto;
}
.buyer-name,
.buyer-phone {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 0.5333rem;
  margin-bottom: 0.0267rem;
}
.name-tag,
.phone-tag {
  font-size: 0.4rem;
  color: #707070;
  line-height: 0.4rem;
}
.name-text,
.phone-text {
  width: 4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.4267rem;
  color: #000;
  text-align: left;
}
.buyer-phone {
  margin-bottom: 0.0667rem;
}
.keywords {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
  font-size: 0.3467rem;
  color: #707070;
  margin-bottom: 1.3333rem;
}
.words-edit {
  flex: 1;
  border: none;
  height: 0.5333rem;
  font-size: 0.3467rem;
  color: #000;
  line-height: 0.4rem;
}
.price-msg {
  width: 100%;
  padding-top: 0.4rem;
}
.cost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  border-top: 0.04rem solid #f2f3f5;
  padding: 0 0.5333rem 0 0.5333rem;
  border-bottom: 0.1333rem solid #f2f3f5;
}
.cost-handle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#dec {
  width: 0.48rem;
  height: 0.48rem;
  text-align: center;
  background: url("../../assets/images/des.png") no-repeat;
  background-size: 100%;
  margin-right: 0.2rem;
}
#add {
  width: 0.48rem;
  height: 0.48rem;
  text-align: center;
  background: url("../../assets/images/add.png") no-repeat;
  background-size: 100%;
  margin-left: 0.2rem;
}
.number,
.origin-cost {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.5rem;
}
.points-select {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
}
#points-check {
  width: 0.4rem;
  height: 0.4rem;
}
#points-check:after {
  content: "使用积分";
  width: 1.6rem;
  line-height: 0.48rem;
  display: inline-block;
  vertical-align: middle;
  pointer-events: auto;
  font-size: 0.3733rem;
  color: #000;
  margin-left: 0.6667rem;
}
.discount {
  font-size: 0.4rem;
  color: #fe734a;
}
.dis-money {
  font-size: 0.4rem;
  color: #fe734a;
}
.sum-points {
  width: 100%;
  height: 0.6rem;
  padding-left: 0.5rem;
  background-color: #fff;
  font-size: 0.32rem;
  color: #fe734a;
  line-height: 0.6rem;
  border-bottom: 0.0667rem solid #f2f3f5;
}
.points-detile {
  opacity: 0;
  background-color: #fff;
}
.checked {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
}
.remind {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.4rem;
}
.points-number {
  width: 2.1333rem;
  height: 0.8rem;
  text-align: center;
  border: 0.0133rem solid #707070;
  margin-right: 0.6667rem;
  font-size: 0.3733rem;
  color: #000;
}
#submit-points {
  width: 1.6rem;
  height: 0.8rem;
  background-color: #00cade;
  color: #fff;
  font-size: 0.3733rem;
  line-height: 0.8rem;
  text-align: center;
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
.pay-header {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  margin-bottom: 0.04rem;
}
.cancel:before {
  content: url("../../assets/images/cancel.png");
  display: inline-block;
  vertical-align: middle;
  margin: 0 3.2rem 0 0.4rem;
}
.pay-title {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.48rem;
}
.pay-money:before {
  content: "¥";
  font-size: 0.4267rem;
  color: #000;
}
.pay-money {
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  font-size: 0.7rem;
  color: #000;
  font-weight: bold;
  line-height: 1.6rem;
  text-align: center;
}
.phone {
  margin-bottom: 0.04rem;
}
.phone,
.points {
  width: 100%;
  height: 1.3333rem;
  font-size: 0.3733rem;
  background-color: #fff;
  color: #707070;
  line-height: 1.3333rem;
  padding: 0 0 0 0.4rem;
}
.phone-detile,
.points-qulity {
  font-size: 0.3733rem;
  color: #000;
  margin-left: 4.9333rem;
}
#submit-pay {
  width: 100%;
  height: 1.3333rem;
  font-size: 0.48rem;
  line-height: 1.3333rem;
  text-align: center;
  background-color: #fff;
  margin-top: 0.1333rem;
  color: #000;
}
.pay-success {
  width: 8rem;
  height: 4rem;
  border-radius: 0.1333rem;
  background-color: #fff;
  position: fixed;
  top: 6.6667rem;
  left: 1rem;
  font-size: 0.8533rem;
  color: #000;
  z-index: 4;
  line-height: 4rem;
  text-align: center;
}
.pay-success:after {
  content: url("../../assets/images/pay_success.png");
  display: inline-block;
  vertical-align: sub;
  margin-left: 0.6667rem;
}
footer {
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 0.2667rem;
}
.sum-price {
  font-size: 0.5333rem;
  color: #fe734a;
}
.sum-price:before {
  content: "合计：";
  color: #707070;
  font-size: 0.4267rem;
}
#account {
  width: 4rem;
  height: 100%;
  background-color: #fe734a;
  font-size: 0.48rem;
  color: #fff;
  line-height: 1.6rem;
  text-align: center;
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
