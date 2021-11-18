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
      // эти модули инициализируем сразу
      dispatch("Auth/initModule");
      dispatch("Builder/initModule");

      // эти модули инициализруем по мере необходиомсти
      //dispatch("Cart/initModule");
      //dispatch("Orders/initModule");
    },
  },
  modules,
});
