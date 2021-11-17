import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    initStore({ dispatch }) {
      dispatch("Auth/initModule");
      dispatch("Cart/initModule");
      dispatch("Builder/initModule");
      dispatch("Orders/initModule");
    },
  },
  modules,
});
