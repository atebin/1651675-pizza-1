<template>
  <section>
    <component
      :is="componentLayout"
      :isAuthorized="isAuthorized"
      @userAuthorize="$emit('userAuthorize')"
      @userUnauthorize="$emit('userUnauthorize')"
      :orderCost="orderCost"
      @updateOrder="updateOrder"
      @dropIngredient="dropIngredient"
    >
      <slot />
    </component>
  </section>
</template>

<script>
export default {
  name: "AppLayout",

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

  computed: {
    componentLayout: function () {
      let componentName = this.$route.meta.layout || "AppLayoutDefault";
      return () => import(`./${componentName}.vue`);
    },
  },

  created() {
    let routeNameForUnauthorized = this.$route.meta.routeNameForUnauthorized;
    if (!this.isAuthorized && routeNameForUnauthorized !== null) {
      this.$router.push({ name: routeNameForUnauthorized });
    }
  },
};
</script>

<style></style>
