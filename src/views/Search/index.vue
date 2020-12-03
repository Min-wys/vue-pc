<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 标签要展示俩种，一种是搜索框的，一个是三级列表 -->
            <!-- 有数据的时候展示 -->
            <li class="with-x" v-show="initProductList.keyword">
              关键字：{{ initProductList.keyword }}<i @click="delKeyword">×</i>
            </li>
            <li class="with-x" v-show="initProductList.categoryName">
              分类名称: {{ initProductList.categoryName
              }}<i @click="delCategoryName">×</i>
            </li>
            <!-- 品牌的标签 -->
            <li class="with-x" v-show="initProductList.trademark">
              品牌： {{ initProductList.trademark.split(":")[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <!-- 品牌属性的标签 -->
            <li
              class="with-x"
              v-for="(prop, index) in initProductList.props"
              :key="prop"
            >
              {{ prop.split(":")[2] }}:{{ prop.split(":")[1]
              }}<i @click="delProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 1.实现active标签的切换 -->
                <!-- 当active类名为true的时候，使用active类名 -->

                <!-- 2.实现综合标签的图标的切换 -->

                <!-- 3.实现价格标签的图标的切换 -->
                <li
                  :class="{ active: initProductList.order.indexOf('1') > -1 }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合<i
                      :class="{
                        iconfont: true,
                        'icon-xiafan': isAllShow,
                        'icon-shangfan': !isAllShow,
                      }"
                    ></i
                  ></a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li>
                  <a>价格</a>
                </li>
                <li
                  :class="{ active: initProductList.order.indexOf('2') > -1 }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格<span>
                      <!-- 这俩个图标都显示都是true，deactive不点击的时候是原本的样子，点击后，一个变成灰色。来回切换 默认是升序 deactive是变灰色-->
                      <i
                        :class="{
                          iconfont: true,
                          'icon-xiangshangjiantou ': true,
                          deactive:
                            initProductList.order.indexOf('2') > -1 &&
                            isPriceDown,
                        }"
                      ></i>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-xiangxiajiantou ': true,
                          deactive:
                            initProductList.order.indexOf('2') > -1 &&
                            !isPriceDown,
                        }"
                      ></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="initProductList.pageNo"
            :pager-count="7"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="5"
            background
            layout="prev, pager, next, jumper, total, sizes"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TypeNav from "@comps/TypeNav";
import SearchSelector from "./SearchSelector/SearchSelector";

export default {
  name: "Search",
  data() {
    return {
      initProductList: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: "",
      },
      isAllShow: true,
      isPriceDown: false,
    };
  },
  watch: {
    // $route: {
    //   handler() {
    //     this.updateProductList();
    //   },
    //   immediate: true,
    // },

    $route() {
      this.updateProductList();
    },
  },
  components: {
    SearchSelector,
    TypeNav,
  },
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  methods: {
    ...mapActions(["getProductList"]),
    updateProductList(pageNo = 1) {
      // 获取输入框的关键字
      const { searchText: keyword } = this.$route.params;
      // 获取query参数，三级列表
      const {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;
      // 要传递的参数
      const options = {
        ...this.initProductList,
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
        pageNo,
      };
      // 将新的数据赋值给data中的数据
      this.initProductList = options;
      // 发送请求获取数据
      this.getProductList(options);
    },
    // 删除keyword标签
    delKeyword() {
      // 先清空keyword中的数据，让标签隐藏，然后重新发送请求，展示新的数据
      this.initProductList.keyword = "";

      // 触发清空搜索框的事件
      this.$bus.$emit("clearKeyword");

      // $route上的数据是只读的,通过跳转过来，触发watch，去发送请求
      const location = {
        name: "search",
        query: this.$route.query,
      };
      this.$router.replace(location);
    },
    // 删除delCategoryName标签
    delCategoryName() {
      // 将数据中的query参数都清空，让标签隐藏，在重新发送获取新的请求
      this.initProductList.categoryName = "";
      this.initProductList.category1Id = "";
      this.initProductList.category2Id = "";
      this.initProductList.category3Id = "";
      // 通过跳转
      const location = {
        name: "search",
        params: this.$route.params,
      };
      this.$router.replace(location);
    },
    // 删除品牌的标签
    delTrademark() {
      // 清除品牌的数据
      this.initProductList.trademark = "";
      // 重新发送请求
      this.updateProductList();
    },
    // 删除品牌属性标签
    delProp(index) {
      this.initProductList.props.splice(index, 1);
      this.updateProductList();
    },
    // 功能实现：点击品牌请求品牌的数据进行展示
    addTrademark(trademark) {
      // 修改数据
      this.initProductList.trademark = trademark;
      this.updateProductList();
    },
    // 功能实现：点击品牌请求品牌属性的数据进行展示
    addProps(prop) {
      this.initProductList.props.push(prop);
      this.updateProductList();
    },
    // 综合选项
    setOrder(order) {
      // 解构数组
      let [orderNum, orderType] = this.initProductList.order.split(":");
      // 第一次点击不会变换箭头，如果传进来的order和上一次order相同，证明是点击的第二次
      if (order === orderNum) {
        // 在判断点击的是综合还是排序
        if (order === "1") {
          this.isAllShow = !this.isAllShow;
        } else {
          this.isPriceDown = !this.isPriceDown;
        }
        // 改变升序还是降序数据
        orderType = orderType === "desc" ? "asc" : "desc";
      } else {
        // 是第一次点击，价格的排序要是默认的升序
        if (order === "1") {
          orderType = this.isAllShow ? "desc" : "asc";
        } else {
          // 价格，初始化图标颜色
          this.isPriceDown = false;
          orderType = "asc";
        }
      }
      // 重新赋值，响应式
      this.initProductList.order = `${order}:${orderType}`;
      // 发送请求
      this.updateProductList();
    },
    // 当每页条数发生变化时触发
    handleSizeChange(pageSize) {
      this.initProductList.pageSize = pageSize;
      this.updateProductList();
    },
    // 当页码发生变化触发
    handleCurrentChange(pageNo) {
      this.updateProductList(pageNo);
    },
  },
  mounted() {
    this.updateProductList();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                justify-content: space-around;
                align-content: center;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                i {
                  margin-left: 5px;
                }
              }
              span {
                display: flex;
                flex-direction: column;
                line-height: 9px;
                margin-left: 5px;
                i {
                  font-size: 12px;
                  &.deactive {
                    color: rgba(255, 255, 255, 0.5);
                  }
                }
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
