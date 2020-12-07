import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@views/Home";
import Login from "@views/Login";
import Register from "@views/Register";
import Search from "@views/Search";
import Detail from "@views/Detail";
import AddCartSuccess from "@views/AddCartSuccess";
import ShopCart from "@views/ShopCart";
import Pay from "@views/Pay";
import PaySuccess from "@views/PaySuccess";
import Trade from "@views/Trade";
import Center from "@views/Center";

// 改写push/replace方法
const { push } = VueRouter.prototype;
const { replace } = VueRouter.prototype;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  return replace.call(this, location, onComplete, () => {});
};
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFooterHide: true
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFooterHide: true
      }
    },
    {
      // ? 表示searchText是一个可选的参数
      name: "search",
      path: "/search/:searchText?",
      component: Search
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail
    },
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart
    },
    {
      name: "pay",
      path: "/pay",
      component: Pay
    },
    {
      name: "paySuccess",
      path: "/paySuccess",
      component: PaySuccess
    },
    {
      name: "trade",
      path: "/trade",
      component: Trade
    },
    {
      name: "center",
      path: "/center",
      component: Center
    }
  ],
  // 每次切换路由页面滚动条位置
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
