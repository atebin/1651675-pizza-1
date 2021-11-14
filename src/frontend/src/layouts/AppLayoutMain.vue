<template>
  <section>
    <AppLayoutHeader />

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
};
</script>

<style></style>
