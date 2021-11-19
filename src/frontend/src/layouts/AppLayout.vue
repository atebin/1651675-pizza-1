<template>
  <section>
    <component :is="componentLayout">
      <slot />
    </component>
  </section>
</template>

<script>
export default {
  name: "AppLayout",

  computed: {
    componentLayout: function () {
      let componentName = this.$route.meta.layout || "AppLayoutDefault";
      return () => import(`./${componentName}.vue`);
    },

    isAuthorized: function () {
      return this.$store.getters["Auth/isAuthorized"];
    },
  },

  watch: {
    isAuthorized: {
      immediate: true,
      handler: function (newValue) {
        if (this.$route.name === null) {
          return false;
        }

        let routeNameForUnauthorized =
          this.$route.meta.routeNameForUnauthorized;
        if (!newValue && routeNameForUnauthorized !== null) {
          this.$router.push({ name: routeNameForUnauthorized });
        }
      },
    },
  },
};
</script>

<style></style>
