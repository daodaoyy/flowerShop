<template>
  <div class="address-card">
    <li class="address-li" v-for="(item, index) in showList" :key="index">
      <div class="address-msg">
        <p class="receive">
          <span class="receive-name">{{item.receiver}}</span>
          <span class="receive-phone">{{item.address_phone}}</span>
        </p>
        <p
          class="detile"
        >{{item.province_name}}{{item.city_name}}{{item.district_name}}{{item.address_detile}}</p>
      </div>
      <div class="address-handle">
        <div class="default-handle">
          <div class="default" v-if="item.isdefault">默认地址</div>
          <div class="notdefault" v-else @click="setDefault(item.address_id, showList)">设置默认</div>
        </div>
        <button id="delete" @click="deleteAddress(item.address_id, index)"></button>
      </div>

      <!-- 删除地址弹框 -->
      <div class="address-frame" v-show="address_frame === index">
        <p class="frame-tag">您确认删除吗？</p>
        <div class="frame-btn">
          <button @click="sureDelete(item.address_id,index)">确认</button>
          <button @click="outDelete">取消</button>
        </div>
      </div>
    </li>

    <!-- 遮罩 -->
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import { apiDeleteAddress, apiChangeAddress } from "../request/api";

export default {
  data() {
    return {
      address_frame: -1,
      islayer: false
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
    //删除地址
    deleteAddress(id, index) {
      console.log(id, index);
      if (this.address_frame === index) {
        this.address_frame = -1;
      } else {
        this.address_frame = index;
      }
      this.islayer = true;
    },
    //取消删除
    outDelete() {
      this.address_frame = -1;
      this.islayer = false;
    },
    //确认删除地址
    async sureDelete(id, index) {
      console.log(id, index);
      const params = {
        address_id: id
      };
      const res = await apiDeleteAddress(params);
      if (res.code) {
        this.showList.splice(index, 1);
        this.islayer = false;
        this.address_frame = -1;
      }
    },
    //设置默认地址
    async setDefault(address_id, showList) {
      const params = {
        isdefault_id: "",
        notdefault_id: ""
      };
      showList.forEach(function(item, index) {
        if (item.isdefault) {
          params.notdefault_id = item.address_id;
        }
        if (item.address_id == address_id) {
          item.isdefault = 1;
          params.isdefault_id = address_id;
          localStorage.setItem("defaultAddress", JSON.stringify(item));
        } else if (item.address_id != address_id) {
          item.isdefault = 0;
        }
      });
      const res = await apiChangeAddress(params);
    }
  }
};
</script>

<style scoped>
.address-li {
  width: 100%;
  height: 2.4rem;
  padding: 0 0 0 0.4rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  margin-bottom: 0.0667rem;
  align-content: center;
}
.address-msg {
  margin-bottom: 0.1333rem;
}
.address-msg,
.address-handle {
  width: 9.6rem;
}
.receive {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.48rem;
  margin-bottom: 0.0667rem;
}
.detile {
  font-size: 0.3467rem;
  color: #707070;
  line-height: 0.4rem;
}
.address-handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.default-handle {
  width: 1.6667rem;
  line-height: 0.6667rem;
  height: 0.6667rem;
  display: flex;
  align-items: center;
}
.default {
  font-size: 0.3467rem;
  width: 4rem;
  color: #000;
}
.notdefault {
  font-size: 0.3467rem;
  width: 4rem;
  color: #fe734a;
}
#delete {
  width: 0.48rem;
  height: 0.5333rem;
  background: url("../assets/images/delete.png") no-repeat;
  background-size: 100%;
  margin-right: 0.8rem;
}
.address-frame {
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