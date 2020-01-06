<template>
  <div class="card">
    <li class="order-li" v-for="(item, index) in showList" :key="index">
      <div class="order-header">
        <p class="order-id">{{item.order_id}}</p>
        <span class="order-status" v-if="item.order_status === 0">待付款</span>
        <span class="order-status" v-if="item.order_status === 1">待发货</span>
        <span class="order-status" v-if="item.order_status === 2">待收货</span>
        <span class="order-status" v-if="item.order_status === 3">已完成</span>
      </div>
      <div class="order-content">
        <div class="order-main">
          <img :src="require('../assets/'+item.product_img)" class="order-img" />
          <span class="order-name">{{item.product_name}}</span>
        </div>
        <span class="order-money">&yen;{{item.order_price}}</span>
      </div>
      <div class="order-handle">
        <span class="order-time">{{item.order_time}}</span>
        <div class="order-btn">
          <button
            id="order-cancel"
            v-if="item.order_status === 0"
            @click="cancelOrder(item.order_id,index)"
          >取消订单</button>
          <button id="order-pay" v-if="item.order_status === 0" @click="payOrder(item,index)">去支付</button>
          <button
            id="order-receive"
            v-if="item.order_status === 2"
            @click="receiveOrder(item.order_id,index)"
          >确认收货</button>
          <button
            id="order-remove"
            v-if="item.order_status === 3"
            @click="deleteOrder(item.order_id,index)"
          >删除订单</button>
          <button
            id="order-remind"
            v-if="item.order_status === 1"
            @click="redminOrder(item.order_id,index)"
          >提醒发货</button>
        </div>
      </div>
      <!-- 取消订单弹框 -->
      <div class="cancel-frame" v-show="cancel_frame === index">
        <p class="frame-tag">您确认取消吗？</p>
        <div class="frame-btn">
          <button @click="sureCancel(item.order_id,index)">确认</button>
          <button @click="outCancel">取消</button>
        </div>
      </div>
      <!-- 删除订单弹框 -->
      <div class="delete-frame" v-show="delete_frame === index">
        <p class="frame-tag">您确认删除吗？</p>
        <div class="frame-btn">
          <button @click="sureDelete(item.order_id,index)">确认</button>
          <button @click="outDelete">取消</button>
        </div>
      </div>
      <!-- 确认收货订单弹框 -->
      <div class="receive-frame" v-show="receive_frame === index">
        <p class="frame-tag">您确认收货吗？</p>
        <div class="frame-btn">
          <button @click="sureReceive(item.order_id,index)">确认</button>
          <button @click="outReceive">取消</button>
        </div>
      </div>
      <!-- 付款弹窗 -->
      <div class="pay-shade" v-show="isShade === index">
        <div class="pay-header">
          <span class="cancel" @click="cancel"></span>
          <span class="pay-title">确认付款</span>
        </div>
        <p class="pay-money">{{orderData.order_price}}</p>
        <p class="phone">
          订购人电话
          <span class="phone-detile">{{orderData.buyer_phone}}</span>
        </p>
        <p class="points">
          使用积分数
          <span class="points-qulity">{{orderData.points_number}}</span>
        </p>
        <button id="submit-pay" @click="subPay(item, index)">付款</button>
      </div>
    </li>
    <!-- 付款成功弹窗 -->
    <div class="pay-success" v-show="paySuccess">支付成功</div>
    <!-- 遮罩 -->
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import {
  apiReceiveOrder,
  apiDeleteOrder,
  apiProductDetile,
  apiUpdatePoints,
  apiUpdateProduct,
  apiOrderRedmin
} from "../request/api";
export default {
  data() {
    return {
      userInfo: [],
      user_points: 1000,
      isShade: -1,
      delete_frame: -1,
      cancel_frame: -1,
      receive_frame: -1,
      islayer: false,
      paySuccess: false,
      orderData: [],
      productData: []
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
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    //订单卡片点击取消订单
    cancelOrder(id, index) {
      if (this.cancel_frame === index) {
        this.cancel_frame = -1;
      } else {
        this.cancel_frame = index;
      }
      this.islayer = true;
    },
    //取消订单取消
    outCancel() {
      this.cancel_frame = -1;
      this.islayer = false;
    },
    //确认取消订单
    async sureCancel(id, index) {
      const params = {
        order_id: id
      };
      const res = await apiDeleteOrder(params);
      if (res.code) {
        //取消成功后删除列表对应的订单
        this.showList.splice(index, 1);
        this.islayer = false;
        this.cancel_frame = -1;
      }
    },
    //删除订单
    deleteOrder(id, index) {
      if (this.delete_frame === index) {
        this.delete_frame = -1;
      } else {
        this.delete_frame = index;
      }
      this.islayer = true;
    },
    //取消删除取消
    outDelete() {
      this.delete_frame = -1;
      this.islayer = false;
    },
    //确认删除订单
    async sureDelete(id, index) {
      const params = {
        order_id: id
      };
      const res = await apiDeleteOrder(params);
      if (res.code) {
        this.showList.splice(index, 1);
        this.islayer = false;
        this.delete_frame = -1;
      }
    },
    //确认收货
    receiveOrder(id, index) {
      console.log(index, id);
      if (this.receive_frame === index) {
        this.receive_frame = -1;
      } else {
        this.receive_frame = index;
      }
      this.islayer = true;
    },
    //取消收货
    outReceive() {
      this.receive_frame = -1;
      this.islayer = false;
    },
    //确认收货订单
    async sureReceive(id, index) {
      console.log(index, id);
      const params = {
        order_id: id,
        order_status: 3
      };
      const res = await apiReceiveOrder(params);
      if (res.code) {
        this.showList.splice(index, 1);
        this.islayer = false;
        this.receive_frame = -1;
      }
    },
    //提醒发货
    async redminOrder(id, index) {
      const params = {
        order_id: id,
        order_redmin: 1
      };
      const res = await apiOrderRedmin(params);
      if (res.code) {
        alert("已提醒~");
      }
    },
    //去支付订单
    async payOrder(item, index) {
      // this.isShade = true;
      if (this.isShade === index) {
        this.isShade = -1;
      } else {
        this.isShade = index;
      }
      this.islayer = true;
      this.orderData = item;
      //获取订单对应的商品详情
      const params = {
        product_id: item.product_id
      };
      const res = await apiProductDetile(params);
      this.productData = res.productDetile;
    },
    //取消付款,关闭弹框
    cancel() {
      this.isShade = false;
      this.islayer = false;
    },
    //付款
    async subPay(item, index) {
      console.log(index);
      //改变用户积分
      const points = this.user_points - item.points_number + item.order_price;
      const params1 = {
        user_id: this.userInfo.user_id,
        user_points: points
      };
      const res1 = await apiUpdatePoints(params1);
      //改变商品库存和销量
      const stock = this.productData.product_stock - item.product_number;
      const sell = this.productData.product_sell + item.product_number;
      const params2 = {
        product_id: this.productData.product_id,
        product_stock: stock,
        product_sell: sell
      };
      const res2 = await apiUpdateProduct(params2);
      //改变订单状态为待发货
      const params3 = {
        order_id: this.orderData.order_id,
        order_status: 1
      };
      const res3 = await apiReceiveOrder(params3);
      // 付款成功展示弹框并刷新订单页
      if (res1 && res2 && res3) {
        this.paySuccess = true;
        this.isShade = false;
        setTimeout(() => {
          //停留3秒
          this.showList.splice(index, 1);
          this.paySuccess = false;
          this.islayer = false;
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
.order-li {
  width: 9.3333rem;
  height: 6rem;
  border-radius: 0.2rem;
  background-color: #fff;
}
.order-li:not(:last-child) {
  margin-bottom: 0.2667rem;
}
.order-header {
  width: 100%;
  height: 1.3333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2667rem 0 0.2667rem;
}
.order-id {
  font-size: 0.3733rem;
  color: #787a89;
  line-height: 0.4rem;
}
.order-id:before {
  content: "订单号：";
  margin-right: 0.2667rem;
}
.order-status {
  font-size: 0.4267rem;
  color: #000;
  line-height: 0.48rem;
}
.order-content {
  width: 100%;
  height: 3.2rem;
  background-color: #f7f8fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2667rem 0 0.2667rem;
}
.order-img {
  width: 2.4rem;
  height: 2.6667rem;
  margin-right: 0.2667rem;
}
.order-name {
  font-size: 0.4rem;
  color: #000;
}
.order-money {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.48rem;
}
.order-money:before {
  content: "合计：";
  margin-right: 0.2rem;
}
.order-handle {
  width: 100%;
  height: 1.4667rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2667rem 0 0.2667rem;
}
.order-btn button {
  margin-left: 0.2667rem;
  width: 1.8667rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.32rem;
  border-radius: 0.5333rem;
}
.order-time {
  font-size: 0.3467rem;
  color: #707070;
}
#order-pay,
#order-receive {
  background-color: #fe734a;
  color: #fff;
}
.cancel-frame,
.delete-frame,
.receive-frame {
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
  content: url("../assets/images/cancel.png");
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
  content: url("../assets/images/pay_success.png");
  display: inline-block;
  vertical-align: sub;
  margin-left: 0.6667rem;
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