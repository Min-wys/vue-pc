import Vue from "vue";

import store from "@store";
import App from "./App.vue";

import router from "./router";
import "./style/reset.css";
import "./plugins/element.js";
import "./mock/mockServe";
import "./style/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    // 定义全局事假总线
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  store
}).$mount("#app");
