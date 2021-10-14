<template>
  <section>
    <AppLayoutHeader
      :isAuthorized="isAuthorized"
      :orderCost="orderCost"
      @userUnauthorize="$emit('userUnauthorize')"
    />

    <slot />
  </section>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader.vue";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
  },

  props: {
    orderCost: {
      type: Number,
      required: true,
    },

    isAuthorized: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },

    dropIngredient(addIngredient) {
      this.$emit("dropIngredient", addIngredient);
    },
  },
};
</script>

<style></style>
