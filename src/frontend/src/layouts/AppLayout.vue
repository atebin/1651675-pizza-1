<template>
  <section>
    <div class="layout_header">
      <component
        :is="activeComponent"
        :orderCost="orderCost"
        @userUnauthorize="$emit('userUnauthorize')"
      />
    </div>

    <slot class="layout_page"></slot>
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

    setAuthorized: {
      type: Function,
      required: true,
    },
  },

  computed: {
    activeComponent: function () {
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
