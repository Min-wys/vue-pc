import { reqGetBaseCategoryList } from "@api/home";

export default {
  state: {
    GetBaseCategoryList: []
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const GetBaseCategoryList = await reqGetBaseCategoryList();
      console.log(GetBaseCategoryList);
      commit("GET_CATEGORY_LIST", GetBaseCategoryList);
    }
  },
  mutations: {
    GET_CATEGORY_LIST(state, GetBaseCategoryList) {
      state.GetBaseCategoryList = GetBaseCategoryList;
    }
  }
};
