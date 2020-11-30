import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from "@api/home";

export default {
  state: {
    GetBaseCategoryList: [],
    getBannersList: [],
    getFloorsList: []
  },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const GetBaseCategoryList = await reqGetBaseCategoryList();
      const getBaseCategoryList = GetBaseCategoryList.slice(0, 15);
      commit("GET_CATEGORY_LIST", getBaseCategoryList);
    },
    // 模拟数据获取轮播图数据
    async getBanners({ commit }) {
      const getBanners = await reqGetBanners();
      console.log(getBanners);
      commit("GET_BANNERS", getBanners);
    },

    // 模拟数据获取楼层数据
    async getFloors({ commit }) {
      const getFloors = await reqGetFloors();
      console.log(getFloors);
      commit("GET_FLOORS", getFloors);
    }
  },
  mutations: {
    GET_CATEGORY_LIST(state, getBaseCategoryList) {
      state.GetBaseCategoryList = getBaseCategoryList;
    },
    // 直接修改轮播图数据
    GET_BANNERS(state, getBanners) {
      state.getBannersList = getBanners;
    },
    // 直接修改楼层数据
    GET_FLOORS(state, getFloors) {
      state.getFloorsList = getFloors;
    }
  }
};
