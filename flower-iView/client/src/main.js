import Vue from 'vue';

import router from '@src/router';
import App from '@src/App.vue';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css'

//引入axios建立请求
Vue.prototype.axios = axios;

Vue.use(iView)
new Vue({
  el: '#app',
  router,
  iView,
  render: h => h(App)
});
