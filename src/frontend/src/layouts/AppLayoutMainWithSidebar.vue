<template>
  <section>
    <AppLayoutHeader
      :isAuthorized="isAuthorized"
      :orderCost="orderCost"
      @userUnauthorize="$emit('userUnauthorize')"
    />

    <div class="layout_with_sidebar">
      <div>Sidebar !!!</div>
      <slot />
    </div>
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

<style scoped>
.layout_with_sidebar {
  display: grid;
  grid-template-columns: 30% 70%;
  column-gap: 20px;
}
</style>
