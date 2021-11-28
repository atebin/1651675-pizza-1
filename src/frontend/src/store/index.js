import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules/index";
import { uniqueId } from "lodash";
import { MESSAGE_LIVE_TIME } from "@/common/constants.js";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutation-types.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: [],
  },
  plugins: [VuexPlugins],
  getters: {
    getNotifications(state) {
      return state.notification;
    },
  },
  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notification = [...state.notification, notification];
    },

    [DELETE_NOTIFICATION](state, id) {
      state.notification = state.notification.filter(
        (notification) => notification.id !== id
      );
    },
  },
  actions: {
    initStore({ dispatch }) {
      // Все модули инициализруем по мере необходиомсти
      // Перечисленные ниже модули инициализируем сразу
      dispatch("Auth/initModule");
      dispatch("Builder/initModule");
      dispatch("Cart/initDefaultModule");
    },

    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: uniqueId(),
      };

      console.log("createNotification - in");
      commit(ADD_NOTIFICATION, uniqueNotification);

      setTimeout(
        () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
        MESSAGE_LIVE_TIME
      );
      console.log("createNotification - out");
    },
  },
  modules,
});
