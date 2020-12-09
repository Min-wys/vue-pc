<template>
  <div class="swiper-container" id="mySwiper" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in getList" :key="item.id">
        <img v-lazy="item.imgUrl" />
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
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    getList: {
      type: Array,
      required: true,
    },
  },

  watch: {
    /*
      有两种情况：
      mew swiper 的条件是:有可轮播的DOM元素和数据
      1. 上来是没有数据的，使用监视属性，数据变化了就更新元素
      2. 上来就有数据，watch没有用，使用mounted
      使用 this.$refs.swiper 取代 .swiper-container
      使用 this.$refs.swiper 才能保证轮播图组件使用的自己的swiper
    */
    getList() {
      if (this.Swiper) return;
      // this.$nextTick是等当前用户界面更新完毕，在触发其中的回调函数
      this.Swiper = this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      new Swiper(this.$refs.swiper, {
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
    },
  },
  mounted() {
    // 判断getList数据的长度，是零的就是第一种情况，上来没有数据情况，这是就不执行下面的初始化swiper,不去new swiper了
    if (!this.getList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang="less" scoped>
</style>
