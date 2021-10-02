<template>
  <section>
    <AppLayoutHeader
      :orderCost="0"
      :isAuthorized="isAuthorized"
      :setAuthorized="setAuthorized"
    />

    <LoginInner :setAuthorized="setAuthorized" />
  </section>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import LoginInner from "@/views/LoginInner.vue";

export default {
  name: "Login",

  components: {
    AppLayoutHeader,
    LoginInner,
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
  },
};
</script>

<style></style>
