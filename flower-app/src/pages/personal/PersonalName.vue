<template>
  <div class="personal-name" v-title data-title="用户名">
    <section>
      <div class="old-name">
        <span class="name-tag">用户名</span>
        <input type="text" class="old-text" v-model="name" value :placeholder="userData.user_name" />
      </div>
      <div class="submit">
        <button id="submit-name" @click="submitName">确认</button>
      </div>
    </section>
  </div>
</template>

<script>
import { apiUpdateName } from "../../request/api";

export default {
  data() {
    return {
      userData: {},
      name: ""
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  },
  methods: {
    async submitName() {
      const params = {
        user_id: this.userData.user_id,
        user_name: this.name
      };
      const res = await apiUpdateName(params);
      if (res.code) {
        setTimeout(() => {
          this.$router.push("/PersonalMsg");
        }, 100);
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   //点击返回上一页
    //   document.querySelector("header").addEventListener("click", () => {
    //     this.$router.go(-1);
    //   });
    // });
  }
};
</script>

<style scoped>
section {
  padding: 0.8rem 0 0 0;
}
.old-name {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 0.5333rem;
  margin-bottom: 0.6667rem;
}
.name-tag {
  font-size: 0.4rem;
  color: #707070;
  line-height: 0.4rem;
  margin-right: 0.8rem;
}
.old-text {
  width: 4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3733rem;
  color: #000;
  text-align: left;
}
.submit {
  width: 100%;
  height: 3.3333rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#submit-name {
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
