<template>
  <header class="header">
    <div class="header__logo">
      <a href="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="/cart/">{{ orderCost }} ₽</a>
    </div>
    <div class="header__user">
      <a href="/profile/">
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
      </a>
      <a href="#" class="header__logout" @click.prevent="setAuthorized(false)">
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeaderAuthorized",

  props: {
    orderCost: {
      type: Number,
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
