<template>
  <component
    :is="activeComponent"
    :orderCost="orderCost"
    :setAuthorized="setAuthorized"
  />
</template>

<script>
import AppLayoutHeaderAuthorized from "./AppLayoutHeaderAuthorized.vue";
import AppLayoutHeaderUnauthorized from "./AppLayoutHeaderUnauthorized.vue";
import AppLayoutHeaderBlank from "./AppLayoutHeaderBlank.vue";

export default {
  name: "AppLayoutHeader",

  props: {
    orderCost: {
      type: Number,
      required: true,
    },

    isAuthorized: {
      type: Boolean,
      required: true,
    },

    setAuthorized: {
      type: Function,
      required: true,
    },
  },

  computed: {
    activeComponent: function () {
      if (this.$route.meta.layout === "AppLayoutHeaderBlank") {
        return AppLayoutHeaderBlank;
      }

      if (this.$route.meta.layout === "AppLayoutHeader") {
        return this.isAuthorized
          ? AppLayoutHeaderAuthorized
          : AppLayoutHeaderUnauthorized;
      }

      return null;
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
