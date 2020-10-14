import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyload from 'vue-lazyload'
import axios from "axios";
Vue.prototype.axios = axios;

// import "./pxrem";

import { getToken } from "./store/user";
import enter from "./utils/checkFirstTime";
import { Swipe, SwipeItem, Popup, Progress, Rate, Icon, ImagePreview,Toast, Tab, Tabs, List, Cell } from 'vant';
import 'vant/lib/index.css';
require('../src/api/gt.js')
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

const token = getToken();
if(token){
  enter.setEnter();
}
Vue.prototype.$initGeet = initGeetest

Vue.config.productionTip = false;
Vue.use(VueLazyload)

Vue.use(Swipe).use(SwipeItem).use(Popup).use(Progress).use(Rate).use(Icon).use(ImagePreview).use(Toast).use(Tab).use(Tabs).use(List).use(Cell);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
