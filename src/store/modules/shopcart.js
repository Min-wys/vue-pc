import { reqDelCart, reqUpdateCartCheck, reqGetCartList, reqUpdateCartCount } from "@api/shopCart";

export default {
  state: {
    cartList: [],
    // 存储成功页面的数据
    successCartList: {}
  },
  getters: {},
  actions: {
    // 获取购物车的数据
    async getCartList({ commit }) {
      const cartList = await reqGetCartList();
      commit("GET_CART_LIST", cartList);
    },
    // 添加购物车的数据
    async updateCartCount({ commit }, { skuId, skuNum }) {
      // 发送请求
      await reqUpdateCartCount(skuId, skuNum);
      commit("UPDATE_CART_COUNT", { skuId, skuNum });
      // console.log(commit);
    },
    // 更新数据状态
    async updateCartCheck({ commit }, { skuId, isChecked }) {
      await reqUpdateCartCheck(skuId, isChecked);
      commit("UPDATE_CART_CHECK", { skuId, isChecked });
    },
    // 删除元素
    async delCart({ commit }, skuId) {
      await reqDelCart(skuId);
      commit("DEL_CART", skuId);
    },
    // 全选按钮
    async allCheck({ state, dispatch }, checked) {
      const isChecked = checked ? "1" : "0";
      let promises = [];
      state.cartList.forEach(item => {
        // 购物项的状态与目标状态不一样
        if (item.isChecked !== isChecked) {
          // 分发给checkCartItem, 得到其返回的promise对象
          const promise = dispatch("updateCartCheck", { skuId: item.skuId, isChecked });
          // 保存到数组中
          promises.push(promise);
        }
      });
      return Promise.all(promises);
    }
  },

  mutations: {
    // 获取总数据
    GET_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
    // 自己手动更新商品个数数据
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map(cart => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
    // 更新商品的选中状态
    UPDATE_CART_CHECK(state, { skuId, isChecked }) {
      state.cartList.forEach(cart => {
        if (cart.skuId === skuId) {
          cart.isChecked = isChecked;
        }
      });
    },
    // 删除元素
    DEL_CART(state, skuId) {
      state.cartList = state.cartList.filter(cart => cart.skuId !== skuId);
    },
    // 成功页面的数据
    SUCCESS_LIST(state, { skuInfo, ProductDetail }) {
      // state.successCartList = [skuInfo];
      state.successCartList = { skuInfo, ProductDetail };
    }
  }
};
