import { normalizeUser } from "../../common/normalizeUser";
import { LIST_USER_ADDRESSES } from "@/common/constants.js";
import { USER_SET, USER_CLEAR_TEMP_PHONE } from "@/store/mutation-types.js";

const adressStructure = () => ({
  street: "",
  house: "",
  flat: "",
});

export default {
  namespaced: true,
  state: {
    isAuthorized: false,
    user: {},
    tempPhoneUser: "",
    listUserAdresses: [],
    adressTemplate: adressStructure(),
  },

  getters: {
    getAuthorized(state) {
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
    [USER_SET](state, argData = {}) {
      // Данные об авторизации пользователя и их обнуление, при необходимости
      state.isAuthorized = argData?.isAuthorized || false;
      state.user = argData?.userData || {};
      state.tempPhoneUser = argData?.userData?.phone || "";
      state.listUserAdresses = argData.addressesList || [];
    },

    [USER_CLEAR_TEMP_PHONE](state) {
      state.tempPhoneUser = "";
    },
  },

  actions: {
    initModule({ dispatch }) {
      dispatch("logout", false);
    },

    async login({ dispatch }, ud) {
      const data = await this.$api.auth.login(ud);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(USER_SET);
    },

    async getMe({ commit, dispatch }) {
      try {
        // Получаем информацию о пользователе
        this.$api.auth.getMe().then((userData) => {
          // создаем на сервере базу адресов пользователя, чтобы не вводить все каждый раз вручную
          dispatch("fillUserAddressesList").then(async () => {
            const addressesList = await this.$api.auth.getAddressesList();
            //await this.$api.auth.getAddressesList();
            commit(USER_SET, {
              isAuthorized: true,
              userData: normalizeUser(userData),
              addressesList,
            });
          });
        });
      } catch {
        // В случае ошибок запускаем разлогирование и очистку исходного состояния модуля
        dispatch("logout", false);
      }
    },

    async fillUserAddressesList() {
      const existingAddressesList = await this.$api.auth.getAddressesList();
      let listAdressesToAdd = [];

      LIST_USER_ADDRESSES.forEach((defaultAddress) => {
        let result = true;
        existingAddressesList.forEach((currentAddress) => {
          if (defaultAddress.name === currentAddress.name) {
            result = false;
          }
        });

        if (result) {
          listAdressesToAdd.push(defaultAddress);
        }
      });

      listAdressesToAdd.forEach(async (item) => {
        this.$api.auth.addressAdd(item);
      });
    },

    clearTempPhone({ commit }) {
      commit(USER_CLEAR_TEMP_PHONE);
    },
  },
};
