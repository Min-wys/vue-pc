import { reqGetBaseCategoryList } from "@api/home";

export default {
  state: {
    GetBaseCategoryList: []
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const GetBaseCategoryList = await reqGetBaseCategoryList();
      const getBaseCategoryList = GetBaseCategoryList.slice(0, 15);
      commit("GET_CATEGORY_LIST", getBaseCategoryList);
    }
  },
  mutations: {
    GET_CATEGORY_LIST(state, getBaseCategoryList) {
      state.GetBaseCategoryList = getBaseCategoryList;
    }
  }
};
