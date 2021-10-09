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
    <div class="header__cart"></div>
    <div class="header__user"></div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeaderBlank",
};
</script>

<style></style>
