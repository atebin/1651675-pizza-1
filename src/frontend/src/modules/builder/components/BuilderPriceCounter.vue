<template>
  <div class="content__result">
    <p>Итого: {{ orderCost }} ₽</p>
    <button type="button" :class="classesButtonStart()" :disabled="!orderReady">
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    orderCost: {
      type: Number,
      required: true,
    },
    orderReady: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    classesButtonStart() {
      return ["button", { "button--disabled": !this.orderReady }];
    },
  },
};
</script>

<style></style>
