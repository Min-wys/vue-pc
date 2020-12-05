import {
  /* reqDelCart, reqUpdateCartCheck, */ reqGetCartList,
  reqUpdateCartCount
} from "@api/shopCart";

export default {
  state: {
    cartList: []
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
    }
  },

  mutations: {
    GET_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map(cart => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    }
  }
};
