import pizza from "@/static/pizza.json";

import { normalizeDough } from "@/common/normalizeDough.js";
import { normalizeSizes } from "@/common/normalizeSizes.js";
import { normalizeSauces } from "@/common/normalizeSauces.js";
import { normalizeIngredients } from "@/common/normalizeIngredients.js";

import {
  PIZZA_BUILDER_STATE_CREATE,
  PIZZA_BUILDER_SET,
  PIZZA_BUILDER_UPDATE,
  PIZZA_BUILDER_NAME_SET,
  PIZZA_BUILDER_NAME_UPDATE,
} from "@/store/mutation-types";

import {
  LOCAL_STORAGE_PIZZA_BUILDER,
  LOCAL_STORAGE_PIZZA_BUILDER_NAME,
} from "@/common/constants.js";

const createStructureState = () => ({
  pizza: {
    foundation: {
      dough: [],
      diameter: [],
      sauce: [],
    },
    ingredients: [],
  },
  pizzaName: "",
});

export default {
  namespaced: true,

  state: createStructureState(),
  /*
  state: {
    pizza: {
      foundation: {
        dough: [],
        diameter: [],
        sauce: [],
      },
      ingredients: [],
    },
    pizzaName: "",
  },
  */

  getters: {
    ingredients(state) {
      return state.pizza.ingredients;
    },

    sauce(state) {
      return state.pizza.foundation.sauce;
    },

    dough(state) {
      return state.pizza.foundation.dough;
    },

    diameter(state) {
      return state.pizza.foundation.diameter;
    },

    pizzaName(state) {
      return state.pizzaName;
    },

    pizza(state) {
      return state.pizza;
    },

    pizzaCost(state) {
      ///////////////////////////////////////////////
      //  costFoundation
      //
      let costFoundation = {
        summa: {
          data: {},
          total: 0,
        },
        multiplier: {
          data: {},
          total: 1,
        },
      };
      let foundation = state.pizza.foundation;

      for (let itemFoundationName in foundation) {
        let itemFoundation = foundation[itemFoundationName];

        if (itemFoundation.length > 0) {
          switch (true) {
            case "price" in itemFoundation[0]: {
              itemFoundation.forEach((item) => {
                if (item.isChecked) {
                  costFoundation.summa.data = {
                    ...costFoundation.summa.data,
                    [itemFoundationName]: item.price,
                  };

                  costFoundation.summa.total += item.price;
                }
              });
              break;
            }
            case "multiplier" in itemFoundation[0]: {
              itemFoundation.forEach((item) => {
                if (item.isChecked) {
                  costFoundation.multiplier.data = {
                    ...costFoundation.multiplier.data,
                    [itemFoundationName]: item.multiplier,
                  };

                  costFoundation.multiplier.total *= item.multiplier;
                }
              });
              break;
            }
          }
        }
      }

      ///////////////////////////////////////////////
      //  costFoundation
      //

      let costIngredients = 0;

      state.pizza.ingredients.forEach((item) => {
        if (item.value > 0) {
          costIngredients += item.price * item.value;
        }
      });

      ///////////////////////////////////////////////
      //  result
      //

      return (
        (costFoundation.summa.total + costIngredients) *
        costFoundation.multiplier.total
      );
    },
  },

  mutations: {
    [PIZZA_BUILDER_STATE_CREATE](state) {
      Object.assign(state, createStructureState());
    },

    [PIZZA_BUILDER_SET](state, argPizzaData) {
      /*
      if (LOCAL_STORAGE_PIZZA_BUILDER in localStorage) {
        state.pizza = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_BUILDER]);
      } else {
        state.pizza.foundation.dough = normalizeDough(pizza.dough);
        state.pizza.foundation.diameter = normalizeSizes(pizza.sizes);
        state.pizza.foundation.sauce = normalizeSauces(pizza.sauces);
        state.pizza.ingredients = normalizeIngredients(pizza.ingredients);
      }
      */
      if (argPizzaData !== null) {
        state.pizza = argPizzaData;
      } else {
        state.pizza.foundation.dough = normalizeDough(pizza.dough);
        state.pizza.foundation.diameter = normalizeSizes(pizza.sizes);
        state.pizza.foundation.sauce = normalizeSauces(pizza.sauces);
        state.pizza.ingredients = normalizeIngredients(pizza.ingredients);
      }

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER] = JSON.stringify(state.pizza);
    },

    [PIZZA_BUILDER_UPDATE](state, newValue) {
      let arrData = [];

      switch (newValue.type) {
        case "foundation": {
          arrData = state.pizza.foundation[newValue.name];
          arrData.forEach((item) => {
            item.isChecked = item.code === newValue.value;
          });
          break;
        }
        case "ingredients": {
          state.pizza.ingredients.forEach((item) => {
            if (item.code === newValue.name) {
              item.value = newValue.value;
            }
          });
          break;
        }
      }

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER] = JSON.stringify(state.pizza);
    },

    [PIZZA_BUILDER_NAME_SET](state, argPizzaName) {
      /*
      if (LOCAL_STORAGE_PIZZA_BUILDER_NAME in localStorage) {
        state.pizzaName = JSON.parse(
          localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME]
        );
      } else {
        state.pizzaName = "";
      }
      */
      if (argPizzaName !== null) {
        state.pizzaName = argPizzaName;
      } else {
        state.pizzaName = "";
      }
    },

    [PIZZA_BUILDER_NAME_UPDATE](state, newValue) {
      state.pizzaName = newValue.value;

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME] = JSON.stringify(
        state.pizzaName
      );
    },
  },

  actions: {
    initModule({ commit }) {
      let pizzaData = null;
      if (LOCAL_STORAGE_PIZZA_BUILDER in localStorage) {
        pizzaData = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_BUILDER]);
      }

      let pizzaName = null;
      if (LOCAL_STORAGE_PIZZA_BUILDER_NAME in localStorage) {
        pizzaName = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME]);
      }

      commit(PIZZA_BUILDER_SET, pizzaData);
      commit(PIZZA_BUILDER_NAME_SET, pizzaName);
    },

    clearPizzaBuilder({ commit }) {
      commit(PIZZA_BUILDER_SET, null);
      commit(PIZZA_BUILDER_NAME_SET, null);
    },

    editPizzaBuilder({ commit }, argData) {
      commit(PIZZA_BUILDER_SET, argData.pizza);
      commit(PIZZA_BUILDER_NAME_SET, argData.pizzaName);
    },

    updatePizzaBuilderName({ commit }, newValue) {
      commit(PIZZA_BUILDER_NAME_UPDATE, newValue);
    },

    updatePizzaBuilder({ commit }, newValue) {
      /*
      if (!(newValue.type in state.order.pizza)) {
        let errorDescription = `Метод updateOrder получил ошибочный тип данных, который не может быть обработан. `;
        errorDescription += `Данные для проверки: type=${newValue.type} name=${newValue.name} value=${newValue.value}`;
        console.error(errorDescription);
        return false;
      }
      */

      /////////////////////////////////////////////////////////////////////////////////////
      commit(PIZZA_BUILDER_UPDATE, newValue);
    },
  },
};
