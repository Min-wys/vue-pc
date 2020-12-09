<template>
  <button @click="buttonClick"><slot /></button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      isClick:false
    };
  },
  methods:{
    buttonClick (event) {
      if (this.isClick) return;
      this.isClick = true;
      this.$listeners.click(event).finally(() => {
        this.isClick = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>

</style>
