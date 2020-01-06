<template>
  <div class="address" v-title data-title="我的地址">
    <section>
      <ul class="address-ul">
        <addressCard :showList="showList" v-if="showList.length"></addressCard>
        <div class="not-data" v-else>
          <img src="../../assets/images/noaddress.png" />
          <p>暂无地址~</p>
        </div>
      </ul>
    </section>
    <footer>
      <button id="add-address" @click="toAdd">+ 添加地址</button>
    </footer>
  </div>
</template>

<script>
import addressCard from "../../components/AddressCard";
import { apiAllAddress } from "../../request/api";

export default {
  components: {
    addressCard: addressCard
  },
  data() {
    return {
      userInfo: [],
      showList: []
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getAddressList();
  },
  methods: {
    //点击添加地址跳转到添加地址页
    toAdd() {
      this.$router.push({ path: "/NewAddress" });
    },
    //获地址列表
    async getAddressList() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiAllAddress(params);
      this.showList = res.allAddress;
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
  padding: 0.0667rem 0 0 0;
  margin-bottom: 2rem;
}
.address-ul {
  width: 100%;
}
.not-data {
  margin-left: 3.4rem;
  margin-top: 3.4rem;
  width: 3rem;
}
.not-data img {
  width: 3rem;
  height: 3rem;
}
.not-data p {
  width: 3rem;
  color: #000;
  font-size: 0.3733rem;
  text-align: center;
  height: 1.3333rem;
  line-height: 1.3333rem;
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
#add-address {
  width: 8rem;
  height: 1.3333rem;
  background-color: #00cade;
  border-radius: 0.6667rem;
  text-align: center;
  line-height: 1.3333rem;
  color: #fff;
  font-size: 0.48rem;
}
</style>
