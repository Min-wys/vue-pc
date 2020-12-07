import { reqRegister, reqLogin } from "@api/user";

export default {
  state: {
    token: localStorage.getItem("token") || "",
    name: localStorage.getItem("name") || ""
  },
  getters: {},
  actions: {
    async register({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code });
      console.log(commit);
    },
    async login({ commit }, { phone, password }) {
      const data = await reqLogin(phone, password);
      commit("LOGIN", data);
    }
  },
  mutations: {
    LOGIN(state, data) {
      state.name = data.name;
      state.token = data.token;
    }
  }
};
