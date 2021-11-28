<template>
  <section>
    <div class="sign-form">
      <a href="#" class="close close--white" @click.prevent="$router.go(-1)">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="test.html" method="post" @submit.prevent="checkUserData()">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <!--input
              type="email"
              name="email"
              placeholder="example@mail.ru"
              v-model="email"
            /-->
            <input name="email" placeholder="example@mail.ru" v-model="email" />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <input
              type="password"
              name="pass"
              placeholder="***********"
              v-model="password"
            />
          </label>
        </div>
        <!--button type="submit" class="button" @click.prevent="authorization()">
          Авторизоваться
        </button-->
        <button type="submit" class="button">Авторизоваться</button>
      </form>
      <ul class="notification-list">
        <li v-if="validations.email.error !== ''" class="notification-item">
          E-mail: {{ String(validations.email.error).toLowerCase() }}
        </li>
        <li v-if="validations.password.error !== ''" class="notification-item">
          Пароль: {{ String(validations.password.error).toLowerCase() }}
        </li>
        <li
          v-for="(elem, key) in notifications"
          :key="key"
          class="notification-item"
        >
          {{ elem }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
//import { validator } from "@/common/mixins/";
import validator from "@/common/mixins/validator";

export default {
  name: "Login",

  mixins: [validator],

  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    notifications: function () {
      let result = [];
      this.$store.getters["getNotifications"].forEach((elem) => {
        result.push(elem.text);
      });
      return result;
    },
  },

  watch: {
    email: function () {
      this.$clearValidationErrors();
    },
    password: function () {
      this.$clearValidationErrors();
    },
  },

  methods: {
    checkUserData() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      this.authorization();
    },

    authorization() {
      //this.$store.dispatch("setAuthorized", true);
      /*
      this.$store.dispatch("Auth/login", {
        email: "user@example.com",
        password: "user@example.com",
      });
      */
      this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });

      /*
      this.$nextTick(() => {
        this.$router.go(-1);
      });
      */
    },
  },
};
</script>

<style scoped>
.notification-list {
  color: red;
  text-align: center;
  padding: 10px;
  margin: 0;
}

.notification-item {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
