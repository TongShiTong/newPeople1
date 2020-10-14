import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
Vue.prototype.axios = axios;

// import "./pxrem";

import { getToken } from "./store/user";
import enter from "./utils/checkFirstTime";
import { Swipe, SwipeItem, Popup, Progress, Rate, Icon, ImagePreview,Toast } from 'vant';
import 'vant/lib/index.css';
require('../src/api/gt.js')

const token = getToken();
if(token){
  enter.setEnter();
}
Vue.prototype.$initGeet = initGeetest

Vue.config.productionTip = false;

Vue.use(Swipe).use(SwipeItem).use(Popup).use(Progress).use(Rate).use(Icon).use(ImagePreview).use(Toast);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
