<template>
  <div class="typeNavPuter">
    <div @mouseleave="isSearchShow = false">
      <div class="typeNav">
        <div class="typeNav-container">
          <h2 class="all" @mouseenter="isSearchShow = true">全部商品分类</h2>
          <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
          </nav>
        </div>
      </div>
      <div class="sortOuter">
        <!-- 给父元素绑定点击事件，性能高 -->
        <transition name="search">
          <div
            class="sort"
            @click="goSeach"
            v-show="isHomeShow || isSearchShow"
          >
            <div
              class="item"
              v-for="category in GetBaseCategoryList"
              :key="category.categoryId"
            >
              <h3>
                <!-- 给a标签绑定自定义属性，方便获取数据 -->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore clearfix"
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        >{{ child.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="groySon in child.categoryChild"
                        :key="groySon.categoryId"
                      >
                        <a
                          :data-categoryName="groySon.categoryName"
                          :data-categoryId="groySon.categoryId"
                          :data-categoryType="3"
                          >{{ groySon.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TypeNav",
  // data() {
  //   return {
  //     GetBaseCategoryList: [],
  //   };
  // },
  // async mounted() {
  //   const getBaseCategoryList = await reqGetBaseCategoryList();
  //   console.log(getBaseCategoryList);
  //   this.GetBaseCategoryList = getBaseCategoryList.slice(0, 15);
  // },
  data() {
    return {
      isHomeShow: this.$route.path === "/",
      isSearchShow: false,
    };
  },
  computed: {
    ...mapState({
      GetBaseCategoryList: (state) => state.home.GetBaseCategoryList,
    }),
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    // 点击分类跳转到search组件，传递query参数，使用自定义属性
    goSeach(e) {
      // 解构元素身上的自定义属性
      const { categoryname, categoryid, categorytype } = e.target.dataset;
      // 使用的是事件委托，判断点击的是哪一个元素在进行跳转，不是a标签的不跳转
      if (!categoryname) return;
      const loation = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      const { searchText } = this.$route.params;
      if (searchText) {
        loation.params = {
          searchText,
        };
      }
      if (this.$route.name === "search") {
        this.$router.replace(loation);
      } else {
        this.$router.push(loation);
      }
      this.isSearchShow = false;
    },
  },
  mounted() {
    // 判断数据的长度，如果长度不为零，就不需要重新发送请求
    if (this.GetBaseCategoryList.length) return;
    this.getCategoryList();
  },
};
</script>

<style lang="less" scoped>
.typeNav {
  border-bottom: 2px solid #e1251b;
}
.typeNav-container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}
.all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  vertical-align: bottom;
  margin-bottom: -2px;
}
.nav {
  width: 730px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  a {
    font-size: 16px;
    color: #333;
  }
}
.sortOuter {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.sort {
  width: 210px;
  height: 468px;
  // position: relative;
  position: absolute;
  top: 0;
  z-index: 9999;
  background-color: #fafafa;
  float: left;
  &.search-enter-active {
    transition: height 0.5s;
    overflow: hidden;
  }
  &.search-enter {
    height: 0px;
  }

  h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
  }
  h3:hover {
    background-color: #b3aeae;
  }
  .item-list {
    border: 1px solid #b3aeae;
    position: absolute;
    left: 210px;
    top: 0px;
    width: 730px;
    height: 100%;
    background-color: #fafafa;
    display: none;
  }
  .fore {
    margin: 5px;
    display: flex;
    dt {
      width: 85px;
      a {
        font-size: 14px;
        font-weight: 700;
      }
    }
    dd {
      width: 550px;
      em {
        height: 20px;
        line-height: 20px;
      }
      a {
        padding: 0 10px;
        border-left: 1px solid #b3aeae;
      }
    }
  }
}
.item:hover {
  .item-list {
    display: block;
  }
}
</style>
