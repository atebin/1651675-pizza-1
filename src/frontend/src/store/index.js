import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test_1: true,
    test_2: "test 2!!!",
  },
  getters: {},
  mutations: {},
  actions: {
    initStore({ dispatch }) {
      dispatch("Auth/initModule");
      dispatch("Cart/initModule");
      dispatch("Builder/initModule");
    },
  },
  modules,
});
