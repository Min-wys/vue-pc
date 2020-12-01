<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="banners in getBannersList"
        :key="banners.id"
      >
        <img :src="banners.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// import Swiper from "swiper";
import "swiper/swiper-bundle.css";

import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    getBannersList: {
      type: Array,
      require: true,
    },
  },

  watch: {
    getBannersList() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          autoplay: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },

          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     new Swiper(".swiper-container", {
  //       loop: true,
  //       autoplay: true,
  //       pagination: {
  //         el: ".swiper-pagination",
  //       },

  //       navigation: {
  //         nextEl: ".swiper-button-next",
  //         prevEl: ".swiper-button-prev",
  //       },
  //     });
  //   });
  // },
};
</script>

<style lang="less" scoped>
</style>
