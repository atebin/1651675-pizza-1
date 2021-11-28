import miscListLoad from "@/static/misc.json";
import { normalizeMisc } from "@/common/normalizeMisc.js";

import {
  CHECK_INIT_FULL_MODULE_CART,
  MISC_LIST_SET,
  PIZZA_LIST_SET,
  PIZZA_LIST_ADD,
  PIZZA_LIST_UPDATE,
  PIZZA_LIST_COUNT_UPDATE,
  MISC_LIST_COUNT_UPDATE,
  CURRENT_PHONE_SET,
  CURRENT_PHONE_UPDATE,
  CURRENT_ADRESS_SET,
  CURRENT_ADRESS_UPDATE,
} from "@/store/mutation-types";

import {
  LOCAL_STORAGE_PIZZA_LIST,
  LOCAL_STORAGE_MISC_LIST,
  LOCAL_STORAGE_USER_PHONE,
  LOCAL_STORAGE_USER_ADRESS,
  LOCAL_STORAGE_ORDER_COST_IN_CART,
} from "@/common/constants.js";

export default {
  namespaced: true,

  state: {
    isInitFullModule: false,
    pizzaList: [],
    miscList: [],
    phone: "",
    adress: {},
  },

  getters: {
    orderCost(state) {
      let result = 0;

      if (state.isInitFullModule) {
        state.pizzaList.forEach((pizza) => {
          result += pizza.pizzaCost * pizza.pizzaCount;
        });

        state.miscList.forEach((misc) => {
          result += misc.price * misc.value;
        });

        if (LOCAL_STORAGE_ORDER_COST_IN_CART in localStorage) {
          if (
            result !==
            JSON.parse(localStorage[LOCAL_STORAGE_ORDER_COST_IN_CART])
          ) {
            localStorage[LOCAL_STORAGE_ORDER_COST_IN_CART] =
              JSON.stringify(result);
          }
        }
      } else {
        if (LOCAL_STORAGE_ORDER_COST_IN_CART in localStorage) {
          result = JSON.parse(localStorage[LOCAL_STORAGE_ORDER_COST_IN_CART]);
        }
      }

      return result;
    },

    phone(state, getters, rootState, rootGetters) {
      return {
        enteredPhone: state.phone,
        defaultPhone: rootGetters["Auth/phone"],
        tempPhone: rootGetters["Auth/tempPhone"],
      };
    },

    pizzaList(state) {
      return state.pizzaList;
    },

    miscList(state) {
      return state.miscList;
    },

    getAdress(state) {
      return state.adress;
    },

    getInitFullModule(state) {
      return state.isInitFullModule;
    },
  },

  mutations: {
    [CHECK_INIT_FULL_MODULE_CART](state) {
      state.isInitFullModule = true;
    },

    [PIZZA_LIST_SET](state, isClearStore = false) {
      if (isClearStore) {
        let newArray = [];
        state.pizzaList = newArray;
        localStorage[LOCAL_STORAGE_PIZZA_LIST] = JSON.stringify(newArray);
        return true;
      }

      if (LOCAL_STORAGE_PIZZA_LIST in localStorage) {
        state.pizzaList = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_LIST]);
      }
    },

    [MISC_LIST_SET](state, isClearStore = false) {
      if (isClearStore) {
        let newArray = normalizeMisc(miscListLoad);
        state.miscList = newArray;
        localStorage[LOCAL_STORAGE_MISC_LIST] = JSON.stringify(newArray);
        return true;
      }

      if (LOCAL_STORAGE_MISC_LIST in localStorage) {
        state.miscList = JSON.parse(localStorage[LOCAL_STORAGE_MISC_LIST]);
      } else {
        state.miscList = normalizeMisc(miscListLoad);
      }
    },

    [CURRENT_PHONE_SET](state, argPhone) {
      if (LOCAL_STORAGE_USER_PHONE in localStorage) {
        state.phone = JSON.parse(localStorage[LOCAL_STORAGE_USER_PHONE]);
      } else {
        state.phone = argPhone.defaultPhone;
        localStorage[LOCAL_STORAGE_USER_PHONE] = JSON.stringify(
          argPhone.defaultPhone
        );
      }
    },

    [CURRENT_ADRESS_SET](state, argAdressTemplate) {
      if (LOCAL_STORAGE_USER_ADRESS in localStorage) {
        state.adress = JSON.parse(localStorage[LOCAL_STORAGE_USER_ADRESS]);
      } else {
        state.adress = argAdressTemplate;
        localStorage[LOCAL_STORAGE_USER_ADRESS] =
          JSON.stringify(argAdressTemplate);
      }
    },

    [PIZZA_LIST_ADD](state, argNewPizza) {
      state.pizzaList.push(argNewPizza);
      localStorage[LOCAL_STORAGE_PIZZA_LIST] = JSON.stringify(state.pizzaList);
    },

    [PIZZA_LIST_UPDATE](state, argData) {
      state.pizzaList.splice(argData.index, 1, argData.pizza);
      localStorage[LOCAL_STORAGE_PIZZA_LIST] = JSON.stringify(state.pizzaList);
    },

    [PIZZA_LIST_COUNT_UPDATE](state, argData) {
      state.pizzaList[argData.index].pizzaCount = argData.count;
      localStorage[LOCAL_STORAGE_PIZZA_LIST] = JSON.stringify(state.pizzaList);
    },

    [MISC_LIST_COUNT_UPDATE](state, argData) {
      state.miscList[argData.index].value = argData.count;
      localStorage[LOCAL_STORAGE_MISC_LIST] = JSON.stringify(state.miscList);
    },

    [CURRENT_PHONE_UPDATE](state, newValue) {
      state.phone = newValue;
      localStorage[LOCAL_STORAGE_USER_PHONE] = JSON.stringify(newValue);
    },

    [CURRENT_ADRESS_UPDATE](state, newValue) {
      state.adress = newValue;
      localStorage[LOCAL_STORAGE_USER_ADRESS] = JSON.stringify(newValue);
    },
  },

  actions: {
    initDefaultModule() {
      // Действий для дефолтной инициализации не требуется.
      // Action создан для включения в функцию инициализации всего STOR'а.
    },

    initFullModule({ commit, getters, rootGetters }) {
      commit(PIZZA_LIST_SET);
      commit(MISC_LIST_SET);
      commit(CURRENT_PHONE_SET, getters.phone);
      commit(CURRENT_ADRESS_SET, rootGetters["Auth/getAdressTemplate"]);

      commit(CHECK_INIT_FULL_MODULE_CART);
    },

    addPizza({ state, commit }, argNewPizza) {
      let isPizzaInList = { state: false, index: null, count: 0 };

      state.pizzaList.forEach((pizza, index) => {
        if (pizza.pizzaName === argNewPizza.pizzaName) {
          isPizzaInList.state = true;
          isPizzaInList.index = index;
          isPizzaInList.count = pizza.pizzaCount;
        }
      });

      if (isPizzaInList.state) {
        commit(PIZZA_LIST_UPDATE, {
          pizza: {
            pizza: argNewPizza.pizza,
            pizzaCost: argNewPizza.pizzaCost,
            pizzaCount: isPizzaInList.count,
            pizzaName: argNewPizza.pizzaName,
          },
        });
      } else {
        commit(PIZZA_LIST_ADD, argNewPizza);
      }
    },

    updatePizzaCount({ commit }, newValue) {
      commit(PIZZA_LIST_COUNT_UPDATE, {
        index: newValue.type,
        count: newValue.value,
      });
    },

    updateMiscCount({ commit }, newValue) {
      commit(MISC_LIST_COUNT_UPDATE, {
        index: newValue.type,
        count: newValue.value,
      });
    },

    editPhone({ commit }, newValue) {
      commit(CURRENT_PHONE_UPDATE, newValue);
    },

    editAdress({ commit }, newValue) {
      commit(CURRENT_ADRESS_UPDATE, newValue);
    },

    clearAdress({ commit, rootGetters }) {
      commit(CURRENT_ADRESS_UPDATE, rootGetters["Auth/getAdressTemplate"]);
    },

    clearModule({ commit }) {
      commit(PIZZA_LIST_SET, true);
      commit(MISC_LIST_SET, true);
    },
  },
};
