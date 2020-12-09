<template>
  <div class="header">
    <div class="header-top">
      <div class="header-main">
        <div class="header-top-left">
          <span>尚品汇欢迎您！</span>
          <p v-if="$store.state.user.name">
            请
            <span>{{ $store.state.user.name }}</span>
            <button>退出</button>
          </p>
          <p v-else>
            请
            <router-link to="/login">登录 </router-link>
            <router-link to="/register"> 注册</router-link>
          </p>
        </div>
        <ul class="header-top-right">
          <li>
            <router-link to="/center">我的订单</router-link>
          </li>
          <li>
            <router-link to="/shopcart">我的购物车</router-link>
          </li>
          <li>
            <a href="#">我的尚品汇</a>
          </li>
          <li>
            <a href="#">尚品汇会员</a>
          </li>
          <li>
            <a href="#">企业采购</a>
          </li>
          <li>
            <a href="#">关注尚品汇</a>
          </li>
          <li>
            <a href="#">合作招商</a>
          </li>
          <li>
            <a href="#" class="border">商家后台</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="header-bottom">
      <router-link to="/">
        <img src="./images/logo.png" />
      </router-link>
      <div class="form">
        <form class="header-bottom-search">
          <input type="text" name="header-bottom-text" v-model="searchText" />
          <button @click="search" type="button">搜索</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // 搜索框输入的内容
      searchText: "",
    };
  },
  methods: {
    // 点击搜索按钮跳转页面
    search() {
      // 完善路径
      const { searchText } = this;
      // 方式一
      // const params = searchText ? `/${searchText}` : "";
      // const location = "/search" + params;
      // this.$router.push(location);

      // 方式二
      const location = {
        name: "search",
      };
      if (searchText) {
        location.params = {
          searchText,
        };
      }
      const { categoryName } = this.$route.query;
      if (categoryName) {
        location.query = this.$route.query;
      }
      if (this.$route.name === "search") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    },
  },
  mounted() {
    // 绑定清空搜索框的事件
    this.$bus.$on("clearKeyword", () => {
      this.searchText = "";
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1200px;
}
.header-top {
  width: 100%;
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.header-main {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.header-top-left {
  display: flex;
  a {
    text-decoration: none;
    color: #666;
    border-right: 1px solid #666;
    padding: 0px 5px;
  }
  a:last-child {
    border: none;
  }
}
.header-top-right {
  display: flex;
  justify-content: space-between;
  a {
    padding: 0 10px;
    border-right: 1px solid #666;
    text-decoration: none;
  }
  li:last-child a {
    border-right: none;
  }
}
.header-bottom {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  img {
    margin-left: 45px;
  }
}
.form {
  display: flex;
  align-items: center;
}
.header-bottom-search {
  display: flex;
  input {
    width: 490px;
    height: 32px;
    box-sizing: border-box;
    border: 2px solid #ea4a36;
    outline: none;
  }
  button {
    height: 32px;
    width: 68px;
    background-color: #ea4a36;
    border: none;
    color: #fff;
    cursor: pointer;
    outline: none;
  }
}
</style>
