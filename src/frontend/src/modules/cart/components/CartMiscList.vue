<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="(miscItem, miscKey) in miscList"
        :key="miscKey"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="miscItem.image"
            width="39"
            height="60"
            :alt="miscItem.name"
          />
          <span>{{ miscItem.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            counterType="pizzaList"
            :counterValue="miscItem.value"
            :nameInput="miscItem.name"
            :counterChangeLimit="counterChangeLimit"
            vuexActionName="Cart/updateMiscCount"
            :vuexDataType="String(miscKey)"
          />

          <div class="additional-list__price">
            <b>{{ miscItem.price }}x{{ miscItem.value }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter.vue";
import { PIZZA_COUNTER_LIMIT_MAX } from "@/common/constants.js";

export default {
  name: "CartMiscList",

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
    miscList: function () {
      return this.$store.getters["Cart/miscList"];
    },
  },
}
</script>

<style scoped>
</style>
