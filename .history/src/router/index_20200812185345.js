import Vue from "vue";
import VueRouter from "vue-router";
import { getRecomendId, setRecomendId , setKey, getKey, clearToken } from "../store/user";

import restoreUrl from "../utils/restoreUrl";


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: resolve => require(['@/views/Login'],resolve),
  },
  {
    path: "/",
    name: "Home",
    component: resolve => require(['@/views/Home'],resolve),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/web",
    name: "Web",
    component: resolve => require(['@/views/Web'],resolve),
  },
  {
    path: "/weixin",
    name: "weixin",
    component: resolve => require(['@/views/Weixin'],resolve),
  },
  {
    path: "/rule",
    name: "rule",
    component: resolve => require(['@/views/Rule'],resolve),
  },{
    path: "/tips",
    name: "tips",
    component: resolve => require(['@/views/Tips'],resolve),
  },
];

const router = new VueRouter({
  routes,
});

/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
  // 微信分享时，微信会在地址栏添加额外参数
  if (restoreUrl.isWeChatUrl()) {
    window.location.href = restoreUrl.getProjectUrl();
  }

 
  if(restoreUrl.getKey()) {
    const url = restoreUrl.getKey();
    if(getKey() != url) {
      clearToken();
    }
  }
 
 

  let recomendId = getRecomendId();
  let key = restoreUrl.getKey();
  if(key) {
    setKey(key);
  }
  // if (!key) {
  //   key = restoreUrl.getKey();
  //   if (key) {
  //     setKey(key);
  //   }
  // }


  if (!recomendId) {
    recomendId = restoreUrl.getRecomendId();
    if (recomendId) {
      setRecomendId(recomendId);
    }
  }

  next();
});

export default router;
