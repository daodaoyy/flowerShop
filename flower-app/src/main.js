// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import remConfig from "./flexible/flexible.js";
import common from "./assets/style/common.css";
import axios from "axios";
import iView from "iview";
import "iview/dist/styles/iview.css";
import md5 from "js-md5";
// import store from "./store";

Vue.use(iView);
Vue.config.productionTip = false;
//引入axios建立请求
Vue.prototype.axios = axios;
Vue.prototype.$md5 = md5;
Vue.directive("title", {
  inserted: function(el) {
    document.title = el.dataset.title;
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  iView,
  remConfig,
  common,
  components: { App },
  template: "<App/>"
});
