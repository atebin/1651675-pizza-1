<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizza, pizzaKey) in pizzaList"
      :key="pizzaKey"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="/public/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.pizzaName"
        />
        <div class="product__text">
          <h2>{{ pizza.pizzaName }}</h2>
          <ul>
            <li>{{ commentPizzaDough(pizzaKey) }}</li>
            <li>{{ commentPizzaSauce(pizzaKey) }}</li>
            <li>{{ commentPizzaIngredients(pizzaKey) }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        counterType="pizzaList"
        :counterValue="pizza.pizzaCount"
        :nameInput="pizza.pizzaName"
        :counterChangeLimit="counterChangeLimit"
        vuexActionName="Cart/updatePizzaCount"
        :vuexDataType="String(pizzaKey)"
      />

      <div class="cart-list__price">
        <b>
          {{ pizzaCountAndCost(pizza.pizzaCount, pizza.pizzaCost) }}
        </b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="editPizza(pizzaKey)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";
import { PIZZA_COUNTER_LIMIT_MAX } from "@/common/constants.js";
import { costFormat } from "@/common/functions.js";

export default {
  name: "CartPizzaList",

  components: {
    ItemCounter,
  },

  data() {
    return {
      counterChangeLimit: {
        min: 0,
        max: PIZZA_COUNTER_LIMIT_MAX,
      },
    };
  },

  computed: {
    pizzaList: function () {
      return this.$store.getters["Cart/pizzaList"];
    },
  },

  methods: {
    componentFoundationPizza(argComponent, argIndex) {
      let items = this.pizzaList[argIndex].pizza.foundation[argComponent];
      let item = items.filter((element) => element.isChecked)[0];

      return item.name;
    },

    commentPizzaIngredients(argIndex) {
      let ingredients = this.pizzaList[argIndex].pizza.ingredients;
      let comment = "";

      ingredients.forEach((ingredient) => {
        let spacing = comment === "" ? "" : ", ";
        switch (true) {
          case ingredient.value === 1:
            comment += `${spacing}${ingredient.name}`;
            break;
          case ingredient.value > 1:
            comment += `${spacing}${ingredient.name} [ x${ingredient.value} ]`;
            break;
        }
      });

      return `Начинка: ${comment.toLowerCase()}`;
    },

    commentPizzaSauce(argIndex) {
      let sauceName = this.componentFoundationPizza(
        "sauce",
        argIndex
      ).toLowerCase();

      return `Соус: ${sauceName}`;
    },

    commentPizzaDough(argIndex) {
      let diameterName = this.componentFoundationPizza("diameter", argIndex);
      let doughName = this.componentFoundationPizza(
        "dough",
        argIndex
      ).toLowerCase();

      doughName = `${doughName.slice(0, -1)}м`;

      return `${diameterName}, на ${doughName} тесте`;
    },

    editPizza(argIndex) {
      let currentPizza = this.pizzaList[argIndex];
      let clonePizza = JSON.parse(JSON.stringify(currentPizza.pizza));

      this.$store.dispatch("Builder/editPizzaBuilder", {
        pizza: clonePizza,
        pizzaName: currentPizza.pizzaName,
      });

      this.$nextTick(() => {
        this.$router.push({ name: "Index" });
      });
    },

    pizzaCountAndCost(argCount, argCost) {
      return `${costFormat(argCost)}x${argCount} ₽`;
    },
  },
};
</script>

<style scoped></style>
