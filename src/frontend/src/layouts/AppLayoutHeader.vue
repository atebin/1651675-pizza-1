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
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <a
        href="#"
        class="header__logout"
        @click.prevent="$emit('userUnauthorize')"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
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
