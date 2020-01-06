<template>
  <div class="new-address" v-title data-title="添加地址">
    <section>
      <div class="receive-name">
        <span class="name-tag">收货人姓名：</span>
        <input type="text" class="name-text" value v-model="receiver" />
      </div>
      <div class="receive-phone">
        <span class="phone-tag">收货人电话：</span>
        <input type="text" class="phone-text" value v-model="address_phone" />
      </div>
      <div class="address-select">
        <span class="address-tag">省市区/县：</span>
        <Cascader :data="city" @on-change="getArea"></Cascader>
      </div>
      <div class="detile-address">
        <span class="detile-tag">详细地址：</span>
        <textarea class="detile-text" v-model="address_detile"></textarea>
      </div>
    </section>

    <!-- 添加成功弹框 -->
    <div class="new-success" v-show="newSuccess">添加成功！</div>
    <footer>
      <button id="submit-address" @click="subAddress">保存</button>
    </footer>

    <!-- 遮罩 -->
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import iView from "iview";
import "iview/dist/styles/iview.css";
import { data } from "../../util/city";
import { apiNewAddress } from "../../request/api";

export default {
  data() {
    return {
      newSuccess: false,
      islayer: false,
      userInfo: [],
      receiver: "",
      address_phone: "",
      address_detile: "",
      eroomInfo: {
        province: "",
        city: "",
        district: ""
      },
      city: []
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.city = data;
  },
  methods: {
    //获取选择的地址
    getArea(value, selectedData) {
      const areaName = selectedData.map(item => item.label);
      let chinaArea = [...areaName];
      if (chinaArea.length === 3) {
        this.eroomInfo.province = chinaArea[0];
        this.eroomInfo.city = chinaArea[1];
        this.eroomInfo.district = chinaArea[2];
      } else if (chinaArea.length == 2) {
        this.eroomInfo.city = chinaArea[0];
        this.eroomInfo.district = chinaArea[1];
      }
    },
    //添加地址
    async subAddress() {
      const params = {
        user_id: this.userInfo.user_id,
        province_name: this.eroomInfo.province,
        city_name: this.eroomInfo.city,
        district_name: this.eroomInfo.district,
        address_detile: this.address_detile,
        receiver: this.receiver,
        address_phone: this.address_phone
      };
      const res = await apiNewAddress(params);
      if (res.code) {
        this.newSuccess = true;
        this.islayer = true;
      }
      setTimeout(() => {
        this.$router.push("/AddressList");
        this.newSuccess = false;
        this.islayer = false;
      }, 2000);
    }
  },
  mounted() {
    console.log(this.value2);
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
}
.receive-name,
.receive-phone,
.address-select {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 0.5333rem;
  margin-bottom: 0.0267rem;
}
.detile-address {
  width: 100%;
  height: 2.6667rem;
  display: flex;
  justify-content: flex-start;
  padding: 0.2667rem 0 0 0.5333rem;
  background-color: #fff;
}
.detile-tag {
  font-size: 0.4rem;
  color: #636363;
  line-height: 0.8rem;
}
.detile-text {
  width: 6.6667rem;
  height: 2.1333rem;
  line-height: 0.8rem;
  font-size: 0.4267rem;
  color: #000;
  text-align: left;
  border: none;
}
.name-tag,
.phone-tag,
.address-tag {
  font-size: 0.4rem;
  color: #636363;
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
.address-text {
  width: 1.3333rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3467rem;
  color: #636363;
  text-align: left;
}
footer {
  width: 100%;
  height: 1.8667rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#submit-address {
  width: 8rem;
  height: 1.3333rem;
  background-color: #00cade;
  border-radius: 0.6667rem;
  text-align: center;
  line-height: 1.3333rem;
  color: #fff;
  font-size: 0.48rem;
}
.new-success {
  width: 6rem;
  height: 3.4rem;
  background-color: #fff;
  position: fixed;
  border-radius: 0.2rem;
  top: 7rem;
  left: 2rem;
  font-size: 0.64rem;
  color: #000;
  z-index: 4;
  line-height: 3.4rem;
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
<style>
.ivu-input {
  height: 0.8rem;
  font-size: 0.4267rem;
  line-height: 0.8rem;
}
.ivu-cascader .ivu-select-dropdown {
  min-height: 4.5rem;
}
.ivu-cascader-menu {
  height: 4.3rem;
}
.ivu-cascader .ivu-cascader-menu-item {
  font-size: 0.4rem !important;
}
</style>
