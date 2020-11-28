<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 登录注册的时候不显示footer组件 -->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>
