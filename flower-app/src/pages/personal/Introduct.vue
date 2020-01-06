<template>
  <div class="introduct" v-title data-title="功能介绍">
    <section>
      <div class="app-rise">
        <p class="app-title">App简介</p>
        <p class="app-content">移动互联网购花平台，服务人性化、贺卡留言、在线选花等功能，订花移动化，随时随地就把花订了。</p>
      </div>
      <div class="points-rise">
        <p class="points-title">积分介绍</p>
        <div class="points-content">
          <p class="points-rule">
            <span class="offset">100个积分可抵消1元</span>
            <span class="reward">每消费1元可拥有1个积分</span>
          </p>
          <p>
            <span>白银会员</span>积分<= 2000
          </p>
          <p>
            <span>黄金会员</span>2000 < 积分 <= 5000
          </p>
          <p>
            <span>铂金会员</span>5000 < 积分 <= 8000
          </p>
          <p>
            <span>钻石会员</span>8000 <积分 <= 10000
          </p>
          <p>
            <span>皇冠会员</span>积分>10000
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {}
};
</script>

<style scoped>
section {
  padding: 0.04rem 0 0 0;
}
.app-rise {
  width: 100%;
  margin-bottom: 0.5333rem;
}
.app-title,
.points-title {
  padding-left: 0.4rem;
  width: 100%;
  height: 1.0667rem;
  background-color: #fff;
  font-size: 0.4267rem;
  color: #000;
  line-height: 1.0667rem;
  margin-bottom: 0.0667rem;
}
.app-content,
.points-content {
  width: 100%;
  background-color: #fff;
  font-size: 0.4rem;
  line-height: 0.6rem;
}
.app-content {
  height: 3rem;
  text-indent: 2em;
  padding: 0.2667rem 0.2rem 0 0.4rem;
}
.points-content {
  padding: 0.2667rem 0 0 0.4rem;
  height: 6.4rem;
}
.points-content p {
  width: 100%;
  line-height: 0.7rem;
  font-size: 0.4rem;
  color: #000;
}
.points-content :not(.points-rule) span {
  font-size: 0.4rem;
  color: #000;
  line-height: 0.7rem;
  font-weight: bold;
  margin-right: 0.5333rem;
}
.points-rule {
  margin-bottom: 0.2667rem;
  width: 100%;
}
.points-rule:before {
  content: "兑换规则：";
  font-size: 0.4rem;
  color: #000;
  line-height: 0.7rem;
  font-weight: bold;
  margin-right: 0.5333rem;
}
.offset,
.reward {
  font-size: 0.4rem;
  color: #000;
  display: inline-block;
  line-height: 0.7rem;
  width: 100%;
  margin-left: 2.1rem;
}
.points-rise {
  width: 100%;
}
</style>
