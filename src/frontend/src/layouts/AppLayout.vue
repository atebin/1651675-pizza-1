<template>
  <section @userAuthorize="$emit('userAuthorize')">
    <div class="layout_header">
      <component
        :is="componentHeader"
        :orderCost="orderCost"
        @userUnauthorize="$emit('userUnauthorize')"
      />
    </div>

    <component
      :is="componentPage"
      @userAuthorize="$emit('userAuthorize')"
      :sourceData="sourceData"
      :order="order"
      @updateOrder="updateOrder"
      @dropIngredient="dropIngredient"
    >
      <slot></slot>
    </component>
  </section>
</template>

<script>
export default {
  name: "AppLayout",

  props: {
    sourceData: {
      type: Object,
      required: true,
    },

    order: {
      type: Object,
      required: true,
    },

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
    componentHeader: function () {
      if (this.$route.meta.layout === "AppLayoutHeaderBlank") {
        return () => import("./AppLayoutHeaderBlank.vue");
      }

      if (this.$route.meta.layout === "AppLayoutHeader") {
        return this.isAuthorized
          ? () => import("./AppLayoutHeaderAuthorized.vue")
          : () => import("./AppLayoutHeaderUnauthorized.vue");
      }

      return null;
    },

    componentPage: function () {
      let componentName = "Index";

      if ("component" in this.$route.meta) {
        componentName = this.$route.meta.component;
      }

      return () => import(`../views/${componentName}.vue`);
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
