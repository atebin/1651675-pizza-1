<template>
  <section>
    <AppLayoutHeader
      :orderCost="orderCost"
      :isAuthorized="isAuthorized"
      :setAuthorized="setAuthorized"
    />

    <h1>Страница Orders</h1>
  </section>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  components: {
    AppLayoutHeader,
  },

  props: {
    isAuthorized: {
      type: Boolean,
      required: true,
    },

    setAuthorized: {
      type: Function,
      required: true,
    },

    orderCost: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
