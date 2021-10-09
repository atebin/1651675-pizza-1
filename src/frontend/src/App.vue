<template>
  <div id="app">
    <AppLayout
      :isAuthorized="appState.isAuthorized"
      @userUnauthorize="setAuthorized(false)"
      @userAuthorize="setAuthorized(true)"
      :sourceData="sourceData"
      :order="order"
      :orderCost="appState.orderCost"
      @updateOrder="updateOrder"
      @dropIngredient="dropIngredient"
    >
      <router-view :isAuthorized="appState.isAuthorized" />
    </AppLayout>
  </div>
</template>

<script>
const LOCAL_STORAGE_APP_STATE = "_1651675_app_state";
const LOCAL_STORAGE_SOURCE_DATA = "_1651675_source_data";

import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import { normalizeDough } from "@/common/normalizeDough.js";
import { normalizeSizes } from "@/common/normalizeSizes.js";
import { normalizeSauces } from "@/common/normalizeSauces.js";
import { normalizeIngredients } from "@/common/normalizeIngredients.js";
import { INGREDIENT_COUNTER_LIMIT_MAX } from "@/common/constants.js";

import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data() {
    return {
      appState: {
        isAuthorized: false,
        orderCost: 0,
      },

      sourceData: {
        foundation: {
          dough: [],
          diameter: [],
          sauce: [],
        },
        ingredients: [],
        misc: [],
        user: {},
      },
      order: {
        pizza: {
          foundation: {},
          ingredients: {},
        },
        pizzaName: null,
        orderCost: 0,
        orderReady: false,
      },
    };
  },

  created() {
    if (LOCAL_STORAGE_APP_STATE in localStorage) {
      let userDataSaved = JSON.parse(localStorage[LOCAL_STORAGE_APP_STATE]);
      this.appState.isAuthorized = userDataSaved.isAuthorized;
      this.order.orderCost = userDataSaved.orderCost;
    } else {
      localStorage[LOCAL_STORAGE_APP_STATE] = JSON.stringify(this.isAuthorized);
    }

    if (LOCAL_STORAGE_SOURCE_DATA in localStorage) {
      this.sourceData = JSON.parse(localStorage[LOCAL_STORAGE_SOURCE_DATA]);
    } else {
      this.sourceData.foundation.dough = normalizeDough(pizza.dough);
      this.sourceData.foundation.diameter = normalizeSizes(pizza.sizes);
      this.sourceData.foundation.sauces = normalizeSauces(pizza.sauces);
      this.sourceData.ingredients = normalizeIngredients(pizza.ingredients);
      this.sourceData.misc = misc;
      this.sourceData.user = user;
    }
  },

  watch: {
    appState: {
      deep: true,
      handler(newState) {
        localStorage[LOCAL_STORAGE_APP_STATE] = JSON.stringify(newState);
      },
    },

    "order.pizzaName": function () {
      this.updateOrderReady();
    },

    "order.orderCost": function () {
      this.updateOrderReady();
      this.appState.orderCost = this.order.orderCost;
    },
  },

  methods: {
    setAuthorized(newState) {
      this.appState.isAuthorized = newState;

      if (!newState) {
        let routeNameForUnauthorized =
          this.$route.meta.routeNameForUnauthorized;
        if (!this.appState.isAuthorized && routeNameForUnauthorized !== null) {
          this.$router.push({ name: routeNameForUnauthorized });
        }
      }
    },

    updateOrder(newValue) {
      if (!(newValue.type in this.order.pizza)) {
        let errorDescription = `Метод updateOrder получил ошибочный тип данных, который не может быть обработан. `;
        errorDescription += `Данные для проверки: type=${newValue.type} name=${newValue.name} value=${newValue.value}`;
        console.error(errorDescription);
        return false;
      }

      if (newValue.name in this.order.pizza[newValue.type]) {
        this.order.pizza[newValue.type][newValue.name] = newValue.value;
      } else {
        this.$set(
          this.order.pizza[newValue.type],
          newValue.name,
          newValue.value
        );
      }

      this.$nextTick(() => {
        this.syncSourceData(newValue);
        this.updateOrderCost();
      });
    },

    syncSourceData(newValue) {
      if (newValue.type === "foundation") {
        this.sourceData.foundation[newValue.name].forEach((item) => {
          if (item.code === newValue.value) {
            item.isChecked = true;
          } else {
            item.isChecked = false;
          }
        });
      }

      if (newValue.type === "ingredients") {
        this.sourceData.ingredients.forEach((item) => {
          if (item.code === newValue.name) {
            item.value = newValue.value;
          }
        });
      }

      localStorage[LOCAL_STORAGE_SOURCE_DATA] = JSON.stringify(this.sourceData);
    },

    updateOrderCost() {
      this.order.orderCost = 0;

      this.$nextTick(() => {
        let costFoudation =
          this.getCostOrderFoundation("dough", "price") +
          this.getCostOrderFoundation("sauce", "price");
        let costIngredients = this.getCostOrderIngredients();
        let costMultiplier = this.getCostOrderFoundation(
          "diameter",
          "multiplier"
        );

        this.order.orderCost =
          (costFoudation + costIngredients) * costMultiplier;
      });
    },

    getCostOrderFoundation(dataName, dataField) {
      let objOrder = null;
      let arrSourceData = [];

      if (dataName !== "-") {
        objOrder = this.order.pizza.foundation[dataName];
        arrSourceData = this.sourceData.foundation[dataName];
      }

      let result = 0;
      arrSourceData.forEach((element) => {
        if (element.code === objOrder) {
          switch (true) {
            case dataField === "price":
              result += Number(element.price);
              break;
            case dataField === "multiplier":
              result = Number(element.multiplier);
              break;
          }
        }
      });
      return result;
    },

    getCostOrderIngredients() {
      let objOrder = this.order.pizza.ingredients;
      let arrSourceData = this.sourceData.ingredients;

      let result = 0;
      arrSourceData.forEach((element) => {
        if (element.code in objOrder) {
          result += Number(element.price) * Number(objOrder[element.code]);
        }
      });

      return result;
    },

    dropIngredient(addIngredient) {
      if (addIngredient in this.order.pizza.ingredients) {
        let newValue = this.order.pizza.ingredients[addIngredient] + 1;
        if (newValue <= INGREDIENT_COUNTER_LIMIT_MAX) {
          this.updateOrder({
            type: "ingredients",
            name: addIngredient,
            value: newValue,
          });
        }
      }
    },

    updateOrderReady() {
      this.order.orderReady =
        this.order.orderCost > 0 &&
        !(this.order.pizzaName === null || this.order.pizzaName === "");
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
