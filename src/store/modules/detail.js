import { reqGetProductDetail } from "@api/detail";

export default {
  state: {
    productDetail: {
      // 详情页的头部信息
      categoryView: [],
      // 商品的属性
      spuSaleAttrList: [],
      // 当前这个商品的信息
      skuInfo: []
    }
  },
  getters: {
    categoryView(state) {
      return state.productDetail.categoryView;
    },
    spuSaleAttrList(state) {
      return state.productDetail.spuSaleAttrList;
    },
    skuInfo(state) {
      return state.productDetail.skuInfo;
    }
  },
  actions: {
    async getProductDetail({ commit }, id) {
      const productDetail = await reqGetProductDetail(id);
      commit("GET_PRODUCT_DETAIL", productDetail);
    }
  },
  mutations: {
    GET_PRODUCT_DETAIL(state, productDetail) {
      state.productDetail = productDetail;
    }
  }
};
