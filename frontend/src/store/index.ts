import { createStore } from "vuex";

export default createStore({
  state: {
    validLogin: false,
  },
  getters: {},
  mutations: {
    SET_VALID(state, status) {
      state.validLogin = status;
    },
  },
  actions: {},
  modules: {},
});
