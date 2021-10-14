<template>
  <section>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :dough="sourceData.foundation.dough"
            @updateOrder="updateOrder"
          />

          <BuilderSizeSelector
            :diameter="sourceData.foundation.diameter"
            @updateOrder="updateOrder"
          />

          <BuilderIngredientsSelector
            :sauce="sourceData.foundation.sauce"
            :ingredients="sourceData.ingredients"
            :order="order"
            @updateOrder="updateOrder"
          />

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="order.pizzaName"
              />
            </label>

            <BuilderPizzaView :order="order" @dropIngredient="dropIngredient" />

            <BuilderPriceCounter
              :orderCost="order.orderCost"
              :orderReady="order.orderReady"
            />
          </div>
        </div>
      </form>
    </main>

    <router-view @userAuthorize="$emit('userAuthorize')" />
  </section>
</template>

<script>
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import { normalizeDough } from "@/common/normalizeDough.js";
import { normalizeSizes } from "@/common/normalizeSizes.js";
import { normalizeSauces } from "@/common/normalizeSauces.js";
import { normalizeIngredients } from "@/common/normalizeIngredients.js";
import {
  INGREDIENT_COUNTER_LIMIT_MAX,
  LOCAL_STORAGE_SOURCE_DATA,
} from "@/common/constants.js";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizza: pizza,
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

  props: {},

  watch: {
    "order.pizzaName": function () {
      this.updateOrderReady();
    },

    "order.orderCost": function (newOrderCost) {
      this.updateOrderReady();
      this.$emit("setOrderCostInApp", newOrderCost);
    },
  },

  computed: {},

  created() {
    if (LOCAL_STORAGE_SOURCE_DATA in localStorage) {
      this.sourceData = JSON.parse(localStorage[LOCAL_STORAGE_SOURCE_DATA]);
    } else {
      this.sourceData.foundation.dough = normalizeDough(pizza.dough);
      this.sourceData.foundation.diameter = normalizeSizes(pizza.sizes);
      this.sourceData.foundation.sauce = normalizeSauces(pizza.sauces);
      this.sourceData.ingredients = normalizeIngredients(pizza.ingredients);
      this.sourceData.misc = misc;
      this.sourceData.user = user;
    }
  },

  methods: {
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

    /*
    updateOrder(newValue) {
      this.$emit("updateOrderInApp", newValue);
    },

    dropIngredient(addIngredient) {
      this.$emit("dropIngredient", addIngredient);
    },
    */
  },
};
</script>

<style></style>
