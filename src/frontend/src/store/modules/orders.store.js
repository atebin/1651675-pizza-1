import {
  CHECK_INIT_MODULE_ORDER,
  ORDER_LIST_ADD,
} from "@/store/mutation-types.js";

export default {
  namespaced: true,
  state: {
    isInitModule: false,
    orderList: [],
  },

  getters: {
    getInitModule(state) {
      return state.isInitModule;
    },
  },

  mutations: {
    [CHECK_INIT_MODULE_ORDER](state) {
      state.isInitModule = true;
    },

    [ORDER_LIST_ADD](state, newOrder) {
      state.orderList.push(newOrder);
    },
  },

  actions: {
    initModule({ commit }) {
      console.log("initModule in Orders");

      commit(CHECK_INIT_MODULE_ORDER);
    },

    addOrderList({ commit, rootGetters }) {
      let newOrder = {
        pizzaList: rootGetters["Cart/pizzaList"],
        miscList: rootGetters["Cart/miscList"].filter((item) => {
          return item.value > 0;
        }),
        orderCost: rootGetters["Cart/orderCost"],
        phone: rootGetters["Cart/phone"].enteredPhone,
        adress: rootGetters["Cart/getAdress"],
        userId: rootGetters["Auth/getUserData"].id,
      };

      newOrder = JSON.parse(JSON.stringify(newOrder));

      commit(ORDER_LIST_ADD, newOrder);
    },
  },
};
