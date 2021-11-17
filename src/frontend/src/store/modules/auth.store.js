import users from "@/static/user.json";
import { normalizeUser } from "@/common/normalizeUser.js";
import {
  USER_SET,
  USER_AUTHORIZED,
  USER_CLEAR_TEMP_PHONE,
} from "@/store/mutation-types.js";
import { LOCAL_STORAGE_USER_AUTHORIZED } from "@/common/constants.js";

const adressStructure = () => ({
  street: "",
  house: "",
  flat: "",
});

export default {
  namespaced: true,
  state: {
    user: {},
    tempPhoneUser: "",
    listUserAdresses: [],
    isAuthorized: false,
    adressTemplate: adressStructure(),
  },

  getters: {
    isAuthorized(state) {
      return state.isAuthorized;
    },

    phone(state) {
      let phone = "";

      if ("phone" in state.user) {
        phone = state.user.phone;
      }

      return phone;
    },

    tempPhone(state) {
      return state.tempPhoneUser;
    },

    listUserAdresses(state) {
      return state.listUserAdresses;
    },

    adressInfo(state) {
      let adressNameList = [
        {
          name: "Заберу сам",
          type: "self",
          adressShow: false,
          adressActive: false,
          indexInAdressList: null,
        },
        {
          name: "Новый адрес",
          type: "new",
          adressShow: true,
          adressActive: true,
          indexInAdressList: null,
        },
      ];

      if (state.isAuthorized) {
        state.listUserAdresses.forEach((adress, index) => {
          adressNameList.push({
            name: adress.name,
            type: "user",
            adressShow: true,
            adressActive: false,
            indexInAdressList: index,
          });
        });
      }

      return adressNameList;
    },

    getAdressTemplate(state) {
      let result = {};
      for (let item in state.adressTemplate) {
        result = { ...result, [item]: "" };
      }
      return result;
    },

    getUserData(state) {
      let result = {
        id: state.user.id || null,
        name: state.user.name || "",
        avatar: state.user.avatar || { webp: null, jpg1x: null, jpg2x: null },
      };
      return result;
    },
  },

  mutations: {
    [USER_SET](state) {
      // Данные об авторизации пользователя
      let isAuthorized = state.isAuthorized;
      if (LOCAL_STORAGE_USER_AUTHORIZED in localStorage) {
        isAuthorized = JSON.parse(localStorage[LOCAL_STORAGE_USER_AUTHORIZED]);
        state.isAuthorized = isAuthorized;
      } else {
        localStorage[LOCAL_STORAGE_USER_AUTHORIZED] = isAuthorized;
      }

      // Данные пользователя и его телефон для заказа
      if (isAuthorized) {
        state.user = normalizeUser(users);
        state.tempPhoneUser = users.phone;
      } else {
        state.user = {};
      }

      // Список адресов пользователя
      if (isAuthorized) {
        let allUserAdresses = [
          {
            name: "Дом",
            street: "Советская",
            house: "125а",
            flat: "14",
          },
          {
            name: "Работа",
            street: "Ленина",
            house: "25",
            flat: "",
          },
          {
            name: "Дача",
            street: "Зеленая",
            house: "3",
            flat: "",
          },
        ];
        state.listUserAdresses = allUserAdresses;
      } else {
        state.listUserAdresses = [];
      }
    },

    [USER_AUTHORIZED](state, newValue) {
      state.isAuthorized = newValue;
      localStorage[LOCAL_STORAGE_USER_AUTHORIZED] = newValue;
    },

    [USER_CLEAR_TEMP_PHONE](state) {
      state.tempPhoneUser = "";
    },
  },

  actions: {
    initModule({ commit }) {
      commit(USER_SET);
    },

    setAuthorized({ commit, dispatch }, newValue) {
      return dispatch("setAuthorized_1", newValue).then(() => {
        commit(USER_SET);
      });
    },

    setAuthorized_1({ commit }, newValue) {
      commit(USER_AUTHORIZED, newValue);
    },

    clearTempPhone({ commit }) {
      commit(USER_CLEAR_TEMP_PHONE);
    },
  },
};
