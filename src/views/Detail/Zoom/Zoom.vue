<template>
  <div class="spec-preview">
    <img :src="imgMiddleUrl" />
    <div class="event" @mousemove="move" ref="event"></div>
    <div class="big" ref="bigOuter">
      <img :src="imgBigUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    // 接受图片数据
    imgBigUrl: String,
    imgMiddleUrl: String,
  },
  mounted() {},
  methods: {
    move(event) {
      // 获取蒙版的宽高
      const maskWidth = this.$refs.mask.clientWidth;
      const maskHeight = this.$refs.mask.clientHeight;

      // 计算蒙版移动距离
      // 鼠标到浏览器的距离 - event（中图外层div）到浏览器的距离 - 蒙版的宽度
      const maskMove = {
        x:
          event.clientX -
          this.$refs.event.getBoundingClientRect().left -
          maskWidth / 2,
        y:
          event.clientY -
          this.$refs.event.getBoundingClientRect().top -
          maskHeight / 2,
      };

      // 判断临界值
      if (maskMove.x >= this.$refs.event.clientWidth - maskWidth) {
        maskMove.x = this.$refs.event.clientWidth - maskWidth;
      } else if (maskMove.x <= 0) {
        maskMove.x = 0;
      }
      if (maskMove.y >= this.$refs.event.clientHeight - maskHeight) {
        maskMove.y = this.$refs.event.clientHeight - maskHeight;
      } else if (maskMove.y <= 0) {
        maskMove.y = 0;
      }

      // 将计算出的值赋值给模板
      this.$refs.mask.style.left = maskMove.x + "px";
      this.$refs.mask.style.top = maskMove.y + "px";
      // 计算比例
      const scale =
        (this.$refs.bigOuter.clientWidth - this.$refs.big.offsetWidth) /
        (this.$refs.event.clientWidth - this.$refs.mask.offsetWidth);
      // 大图移动的距离
      this.$refs.big.style.left = scale * maskMove.x + "px";
      this.$refs.big.style.top = scale * maskMove.y + "px";

      // this.$refs.big.style.left = -2 * maskMove.x + "px";
      // this.$refs.big.style.top = -2 * maskMove.y + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
