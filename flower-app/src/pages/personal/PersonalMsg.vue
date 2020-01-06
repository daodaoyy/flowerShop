<template>
  <div class="personal-msg" v-title data-title="个人资料">
    <section>
      <div class="person-photo">
        <span class="photo-tag">头像</span>
        <img v-if="userData.user_icon" :src="getUserIcon(userData.user_icon)" class="photo-img" />
      </div>
      <div class="person-name" @click="nameEdit">
        <span class="name-tag">用户名</span>
        <span class="name-text">{{userData.user_name}}</span>
      </div>
      <div class="person-sex" @click="sexEdit">
        <span class="sex-tag">性别</span>
        <span class="sex-text">{{this.sex_name}}</span>
      </div>
      <div class="person-phone">
        <span class="phone-tag">手机账户</span>
        <span class="phone-text">{{userData.user_phone}}</span>
      </div>
      <div class="person-points">
        <span class="points-tag">积分总数</span>
        <span class="points-text">{{userData.user_points}}</span>
      </div>
      <div class="person-level">
        <span class="level-tag">会员等级</span>
        <span class="level-text">{{this.level}}</span>
      </div>
      <div class="logout">
        <button id="logout" @click="logout">退出登录</button>
      </div>
    </section>
    <footer v-show="is_sex">
      <div class="boy">
        <input
          type="radio"
          id="boy-radio"
          @click="boyRadio"
          name="radios"
          value="1"
          v-model="sex_id"
        />
        <label>男</label>
      </div>
      <div class="girl">
        <input
          type="radio"
          @click="girlRadio"
          id="girl-radio"
          name="radios"
          value="2"
          v-model="sex_id"
        />
        <label>女</label>
      </div>
      <button id="cancel" @click="cancel">取消</button>
    </footer>
    <div class="overlayer" v-show="is_sex"></div>
  </div>
</template>

<script>
import { apiGetUserData, apiChangeSex } from "../../request/api";

export default {
  data() {
    return {
      is_sex: false,
      userInfo: {},
      userData: {},
      level: "",
      sex_name: "",
      sex_id: "" //设置默认值为1，即设置第一个单选框'男'为选中
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getUserInfo();
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      const params = {
        user_id: this.userInfo.user_id
      };
      const res = await apiGetUserData(params);
      this.userData = res.userData[0];
      if (this.userData.user_level == 0) {
        this.level = "白银会员";
      } else if (this.userData.user_level == 1) {
        this.level = "黄金会员";
      } else if (this.userData.user_level == 2) {
        this.level = "铂金会员";
      } else if (this.userData.user_level == 3) {
        this.level = "钻石会员";
      } else if (this.userData.user_level == 4) {
        this.level = "皇冠会员";
      }
      //性别转换
      if (this.userData.user_sex == 0) {
        this.sex_name = "男";
      } else {
        this.sex_name = "女";
      }
      this.sex_id = this.userData.user_sex + 1;
      localStorage.setItem("userData", JSON.stringify(res.userData[0]));
    },
    //展示性别选则弹框
    sexEdit() {
      this.is_sex = true;
    },
    //选择男
    async boyRadio() {
      this.sex_name = "男";
      const params = {
        user_id: this.userData.user_id,
        user_sex: 0
      };
      const res = await apiChangeSex(params);
      if (res.code) {
        this.is_sex = false;
      }
    },
    //选择女
    async girlRadio() {
      this.sex_name = "女";
      const params = {
        user_id: this.userData.user_id,
        user_sex: 1
      };
      const res = await apiChangeSex(params);
      if (res.code) {
        this.is_sex = false;
      }
    },
    //图片解析
    getUserIcon(icon) {
      return require("../../assets/" + icon);
    },
    //修改用户名跳转编辑用户名页
    nameEdit() {
      this.$router.push("/PersonalName");
    },
    //去小性别修改，关闭性别选择弹框
    cancel() {
      this.is_sex = false;
    },
    //退出登录
    logout() {
      this.$router.push("/");
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
  padding: 0.5333rem 0 0 0;
}
.person-photo {
  width: 100%;
  height: 2.6667rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
  margin-bottom: 0.04rem;
}
.person-name,
.person-sex,
.person-phone,
.person-level,
.person-points {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem 0 0.5333rem;
  margin-bottom: 0.04rem;
}
.person-phone {
  margin-bottom: 0.2667rem;
}
.person-level {
  margin-bottom: 0.5333rem;
}
.photo-tag,
.name-tag,
.sex-tag,
.phone-tag,
.level-tag,
.points-tag {
  font-size: 0.4rem;
  color: #707070;
  line-height: 0.4rem;
  margin-right: 0.8rem;
}
.name-text:after,
.sex-text:after {
  content: url("../../assets/images/entry.png");
  display: inline-block;
  vertical-align: middle;
  pointer-events: auto;
  margin-left: 0.2667rem;
}
.name-text,
.sex-text,
.phone-text,
.points-text,
.level-text {
  font-size: 0.4rem;
  line-height: 0.48rem;
  color: #000;
}
.logout {
  width: 100%;
  height: 3.3333rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#logout {
  width: 8rem;
  height: 1.3333rem;
  background-color: #00cade;
  border-radius: 0.6667rem;
  text-align: center;
  line-height: 1.3333rem;
  color: #fff;
  font-size: 0.48rem;
}
footer {
  width: 100%;
  position: fixed;
  background-color: #f2f3f5;
  bottom: 0;
  left: 0;
  z-index: 3;
}
footer button {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  font-size: 0.4rem;
  color: #000;
}
.boy {
  margin-bottom: 0.04rem;
}
.girl {
  margin-bottom: 0.2667rem;
}
footer label {
  font-size: 0.4rem;
  color: #000;
}
#boy-radio,
#girl-radio {
  width: 0.4rem;
  height: 0.4rem;
  background-color: #fff;
  margin-right: 0.2667rem;
}
.boy,
.girl {
  width: 100%;
  height: 1.3333rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
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
