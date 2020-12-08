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
import store from "../store";

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

const router = new VueRouter({
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
const permissionPaths = ["/pay", "/paySuccess", "/trade"];
// 配置路由导航
router.beforeEach((to, from, next) => {
  // 当访问的是"/pay", "/paySuccess", "/trade"这三个页面时，并且没有token的时候，就去登录页面，去登录，是其他页面的时候，就直接跳去其他页面
  if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    return next("/login");
  }
  next();
});
export default router;
