<template>
  <div class="content__result">
    <p>Итого: {{ orderCost }} ₽</p>
    <button
      type="button"
      :class="classesButtonStart()"
      :disabled="!pizzaReady"
      @click="addPizzaToOrder"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { costFormat } from "@/common/functions.js";

export default {
  name: "BuilderPriceCounter",

  computed: {
    orderCost: function () {
      return costFormat(this.$store.getters["Builder/pizzaCost"]);
    },
    pizzaReady: function () {
      let nameChecked = this.$store.getters["Builder/pizzaName"] !== "";

      let ingredients = this.$store.getters["Builder/ingredients"];
      let ingredientsChecked =
        ingredients.filter((item) => {
          return item.value > 0;
        }).length > 0;

      return nameChecked && ingredientsChecked;
    },
  },

  methods: {
    classesButtonStart() {
      return ["button", { "button--disabled": !this.pizzaReady }];
    },

    addPizzaToOrder() {
      if (this.$store.getters["Cart/getInitModule"]) {
        // усли модуль Cart уже инициализирован - работем
        this.addPizzaToOrder_work();
      } else {
        this.$store.dispatch("Cart/initModule").then(() => {
          // если нет - сначала инициализируем
          this.addPizzaToOrder_work();
        });
      }
    },

    addPizzaToOrder_work() {
      let clonePizza = JSON.parse(
        JSON.stringify(this.$store.getters["Builder/pizza"])
      );

      this.$store.dispatch("Cart/addPizza", {
        pizzaName: this.$store.getters["Builder/pizzaName"],
        pizzaCost: this.$store.getters["Builder/pizzaCost"],
        pizzaCount: 1,
        pizza: clonePizza,
      });

      this.$store.dispatch("Builder/clearPizzaBuilder");

      this.$nextTick(() => {
        this.$router.push({ name: "Cart" });
      });
    },
  },
};
</script>

<style></style>
