<template>
  <div class="secret" v-title data-title="填写密保">
    <section>
      <div class="problem1">
        <span class="tag">问题1 您的初中班主任叫什么？</span>
        <input type="text" id="answer1" v-model="answer1" />
      </div>
      <div class="problem2">
        <span class="tag">问题2 您的小学叫什么？</span>
        <input type="text" id="answer2" v-model="answer2" />
      </div>
    </section>
    <footer>
      <button id="sub-problem" @click="subSecret">提交</button>
    </footer>
    <div class="sub-success" v-show="issuccess">设置成功！</div>
    <div class="overlayer" v-show="islayer"></div>
  </div>
</template>

<script>
import { apiCreateSecret } from "../../request/api";

export default {
  data() {
    return {
      islayer: false,
      issuccess: false,
      userInfo: {},
      answer1: "",
      answer2: ""
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    async subSecret() {
      const params = {
        user_id: this.userInfo.user_id,
        secret1: this.answer1,
        secret2: this.answer2
      };
      const res = await apiCreateSecret(params);
      if (res.code) {
        this.islayer = true;
        this.issuccess = true;
        setTimeout(() => {
          this.islayer = false;
          this.issuccess = false;
        }, 2000);
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
  width: 100%;
  margin-bottom: 1.4rem;
  padding: 0.1333rem 0 0 0;
}
.problem1 {
  margin-bottom: 0.2667rem;
}
.problem1,
.problem2 {
  width: 100%;
  height: 2.6667rem;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.tag {
  width: 100%;
  height: 1.0667rem;
  font-size: 0.4rem;
  color: #000;
  line-height: 1.0667rem;
  padding-left: 0.2667rem;
  margin-bottom: 0.0667rem;
  background-color: #fff;
}
#answer1,
#answer2 {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  font-size: 0.4rem;
  color: #000;
  line-height: 1.3333rem;
  padding-left: 0.2667rem;
}
#sub-problem {
  width: 100%;
  height: 1.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  line-height: 1.3333rem;
  text-align: center;
  font-size: 0.48rem;
  color: #fff;
  background-color: #00cade;
}
.sub-success {
  width: 6.6667rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 0.1333rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0.48rem;
  color: #000;
  z-index: 3;
  position: fixed;
  top: 5rem;
  left: 1.6rem;
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
