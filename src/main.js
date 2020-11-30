import Vue from "vue";

import store from "@store";
import App from "./App.vue";

import router from "./router";
import "./style/reset.css";
import "./plugins/element.js";
import "./mock/mockServe";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
