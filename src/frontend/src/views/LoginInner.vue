<template>
  <section>
    <div class="sign-form">
      <a href="#" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <input type="email" name="email" placeholder="example@mail.ru" />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input type="password" name="pass" placeholder="***********" />
          </label>
        </div>
        <button type="submit" class="button" @click.prevent="authorization()">
          Авторизоваться
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginInner",

  props: {
    setAuthorized: {
      type: Function,
      required: true,
    },
  },

  methods: {
    authorization() {
      this.setAuthorized(true);
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style></style>
