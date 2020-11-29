<template>
  <div class="typeNavPuter">
    <div class="typeNav">
      <div class="typeNav-container">
        <h2 class="all">全部商品分类</h2>
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
      <div class="sort">
        <div
          class="item"
          v-for="category in GetBaseCategoryList"
          :key="category.categoryId"
        >
          <h3>
            <a href="">{{ category.categoryName }}</a>
          </h3>
          <div class="item-list clearfix">
            <div class="subitem">
              <dl
                class="fore clearfix"
                v-for="child in category.categoryChild"
                :key="child.categoryId"
              >
                <dt>
                  <a href="">{{ child.categoryName }}</a>
                </dt>
                <dd>
                  <em
                    v-for="groySon in child.categoryChild"
                    :key="groySon.categoryId"
                  >
                    <a href="">{{ groySon.categoryName }}</a>
                  </em>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetBaseCategoryList } from "@api/home";

export default {
  name: "TypeNav",
  data() {
    return {
      GetBaseCategoryList: [],
    };
  },
  async mounted() {
    const getBaseCategoryList = await reqGetBaseCategoryList();
    console.log(getBaseCategoryList);
    this.GetBaseCategoryList = getBaseCategoryList.slice(0, 15);
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
}
.sort {
  width: 210px;
  height: 463px;
  position: relative;
  background-color: #fafafa;
  float: left;
  h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
  }
  .item-list {
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
    dt {
      width: 80px;
      float: left;
      a {
        font-size: 14px;
        font-weight: 700;
      }
    }
    dd {
      width: 550px;
      float: left;
      em {
        height: 20px;
        line-height: 20px;
      }
      a {
        padding: 0 10px;
        border-left: 1px solid #333;
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
