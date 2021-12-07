//import pizza from "@/static/pizza.json";

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
  isFirstDataDownload: false,
});

export default {
  namespaced: true,

  state: createStructureState(),

  getters: {
    isFirstDataDownload(state) {
      return state.isFirstDataDownload;
    },

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
      if (argPizzaData !== null) {
        state.pizza = argPizzaData;
      } else {
        state.pizza.foundation.dough = normalizeDough(pizza.dough);
        state.pizza.foundation.diameter = normalizeSizes(pizza.sizes);
        state.pizza.foundation.sauce = normalizeSauces(pizza.sauces);
        state.pizza.ingredients = normalizeIngredients(pizza.ingredients);
      }
      */
      console.log("=====================");
      console.log(JSON.parse(JSON.stringify(argPizzaData)));
      console.log("=====================");
      state.pizza.foundation.dough = normalizeDough(argPizzaData.dough);
      console.log("---------------------");
      console.log(normalizeDough(argPizzaData.dough));
      console.log(state.pizza.foundation.dough);
      console.log("---------------------");
      state.pizza.foundation.diameter = normalizeSizes(argPizzaData.sizes);
      state.pizza.foundation.sauce = normalizeSauces(argPizzaData.sauces);
      state.pizza.ingredients = normalizeIngredients(argPizzaData.ingredients);

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER] = JSON.stringify(state.pizza);
      state.isFirstDataDownload = true;
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
      if (argPizzaName !== null) {
        state.pizzaName = argPizzaName;
      } else {
        state.pizzaName = "";
      }

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME] = JSON.stringify(
        state.pizzaName
      );
    },

    [PIZZA_BUILDER_NAME_UPDATE](state, newValue) {
      state.pizzaName = newValue.value;

      localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME] = JSON.stringify(
        state.pizzaName
      );
    },
  },

  actions: {
    async initModule({ commit, state }) {
      //const pizzaData = await () => {
      let pizzaData = {};
      if (
        state.isFirstDataDownload &&
        LOCAL_STORAGE_PIZZA_BUILDER in localStorage
      ) {
        //if (LOCAL_STORAGE_PIZZA_BUILDER in localStorage) {
        pizzaData = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_BUILDER]);

        commit(PIZZA_BUILDER_SET, pizzaData);
        //}
      } else {
        /*
        this.$api.dough.query().then((dough) => {
          console.log(dough);

          this.$api.sauces.query().then((sauces) => {
            console.log(sauces);

            this.$api.sizes.query().then((sizes) => {
              console.log(sizes);
            });
          });
        });
        */
        this.$api.dough.query().then((dough) => {
          console.log("dough");
          console.log(dough);
          pizzaData.dough = dough;

          this.$api.sauces.query().then((sauces) => {
            console.log("sauces");
            console.log(sauces);
            pizzaData.sauces = sauces;

            this.$api.sizes.query().then((sizes) => {
              console.log("sizes");
              console.log(sizes);
              pizzaData.sizes = sizes;

              this.$api.ingredients.query().then((ingredients) => {
                console.log("ingredients");
                console.log(ingredients);
                pizzaData.ingredients = ingredients;

                commit(PIZZA_BUILDER_SET, pizzaData);
              });
            });
          });
        });

        console.log("pizzaData");
        console.log(pizzaData);
      }
      //};

      let pizzaName = null;
      if (LOCAL_STORAGE_PIZZA_BUILDER_NAME in localStorage) {
        pizzaName = JSON.parse(localStorage[LOCAL_STORAGE_PIZZA_BUILDER_NAME]);
      }

      commit(PIZZA_BUILDER_NAME_SET, pizzaName);
    },

    clearPizzaBuilder({ commit, dispatch }) {
      // сначала обнуляем название пиццы
      commit(PIZZA_BUILDER_NAME_SET, null);

      // очищаем запись по пицце
      localStorage.removeItem(LOCAL_STORAGE_PIZZA_BUILDER);

      // затем переинициализируем модуль
      //commit(PIZZA_BUILDER_SET, null);
      dispatch("initModule");
    },

    editPizzaBuilder({ commit }, argData) {
      commit(PIZZA_BUILDER_SET, argData.pizza);
      commit(PIZZA_BUILDER_NAME_SET, argData.pizzaName);
    },

    updatePizzaBuilderName({ commit }, newValue) {
      commit(PIZZA_BUILDER_NAME_UPDATE, newValue);
    },

    updatePizzaBuilder({ commit }, newValue) {
      commit(PIZZA_BUILDER_UPDATE, newValue);
    },
  },
};
