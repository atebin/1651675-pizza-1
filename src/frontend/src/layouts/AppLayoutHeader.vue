<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
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
    <div v-if="!isAuthorized" class="header__user">
      <a href="#" class="header__login" @click.prevent="loginActivate()">
        <span>Войти</span>
      </a>
    </div>
    <div v-if="isAuthorized" class="header__user">
      <router-link to="/profile/">
        <picture>
          <source type="image/webp" :srcset="userData.avatar.webp" />
          <img
            :src="userData.avatar.jpg1x"
            :srcset="userData.avatar.jpg2x"
            :alt="userData.name"
            width="32"
            height="32"
          />
        </picture>

        <span>{{ userData.name }}</span>
      </router-link>
      <a href="#" class="header__logout" @click.prevent="userUnautorized">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { costFormat } from "@/common/functions.js";

export default {
  name: "AppLayoutHeader",

  computed: {
    orderCost: function () {
      return costFormat(this.$store.getters["Cart/orderCost"]);
    },

    isAuthorized: function () {
      return this.$store.getters["Auth/isAuthorized"];
    },

    userData: function () {
      let result = this.$store.getters["Auth/getUserData"];
      return result;
    },
  },

  methods: {
    loginActivate() {
      let routeNameForLogin = this.$route.meta.routeNameForLogin;
      if (routeNameForLogin !== null) {
        this.$router.push({ name: routeNameForLogin });
      }
    },

    userUnautorized() {
      this.$store.dispatch("Auth/setAuthorized", false);

      let routeNameForUnauthorized = this.$route.meta.routeNameForUnauthorized;
      if (routeNameForUnauthorized !== null) {
        this.$router.push({ name: routeNameForUnauthorized });
      }
    },
  },
};
</script>

<style></style>
