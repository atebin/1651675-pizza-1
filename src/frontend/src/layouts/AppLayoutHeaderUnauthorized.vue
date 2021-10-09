<template>
  <header class="header">
    <div class="header__logo">
      <router-link to='/' class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart/">{{ orderCost }} ₽</router-link>
    </div>
    <div class="header__user">
      <a href="#" class="header__login" @click.prevent="loginActivate()">
        <span>Войти</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeaderUnauthorized",

  props: {
    orderCost: {
      type: Number,
      required: true,
    },
  },

  methods: {
    loginActivate() {
      let routeNameForLogin = this.$route.meta.routeNameForLogin;

      if (routeNameForLogin !== null) {
        this.$router.push({ name: routeNameForLogin });
      }
    },
  },
};
</script>

<style></style>
