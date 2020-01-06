<template>
  <div class="slide-show" @mouseover="clearRun" @mouseout="autoRun">
    <div class="slide-img">
      <transition name="slide-trans">
        <img v-if="isShow" :src="slides[nowIndex].src" />
      </transition>
      <transition name="slide-trans-old">
        <img v-if="!isShow" :src="slides[nowIndex].src" />
      </transition>
    </div>
    <ul class="slide-pages">
      <div class="yuan">
        <li v-for="(item,index) in slides" @click="goto(index)">
          <a :class="{on:index === nowIndex}"></a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowIndex: 0,
      isShow: true
    };
  },
  props: {
    //向首页父组件传递默认图片数组和默认时间参数
    slides: {
      Array,
      default: []
    },
    inv: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    preIndex() {
      //从第一张开始往后轮播
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextIndex() {
      //轮播到最后一张则index置0
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    goto(index) {
      //点击小圆圈则轮播到对应的图片
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
      }, 10);
    },
    autoRun() {
      //页面打开时开始循环轮播
      this.runId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearRun() {
      //触发时清除循环播放，停留到当前图片
      clearInterval(this.runId);
    }
  },
  mounted() {
    this.autoRun();
  }
};
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all 0.5s;
}
.slide-trans-enter {
  transform: translateX(100%);
}
.slide-trans-old-leave-active {
  transition: all 0.5s;
  transform: translateX(-100%);
}
.slide-show {
  position: relative;
  width: 100%;
  height: 4rem;
  overflow: hidden;
}
.slide-img {
  width: 100%;
  height: 100%;
}
.slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  top: 3.6rem;
  left: 46%;
  margin: 0;
}
.slide-pages li {
  cursor: pointer;
  list-style: none;
}
.slide-pages .yuan {
  display: flex;
  justify-content: center;
}
.slide-pages a {
  display: flex;
  margin-right: 0.3333rem;
  width: 0.1333rem;
  height: 0.1333rem;
  border-radius: 50%;
  background-color: #fff;
}
.slide-pages li .on {
  background: rgba(9, 188, 201, 0.8);
}
</style>