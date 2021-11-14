<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!isCartNoEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <div v-if="isCartNoEmpty">
          <CartPizzaList />

          <CartMiscList />

          <CartDelivery />
        </div>
      </div>
    </main>
    <section v-if="isCartNoEmpty" class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ orderCost }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import CartPizzaList from "@/modules/cart/components/CartPizzaList.vue";
import CartMiscList from "@/modules/cart/components/CartMiscList.vue";
import CartDelivery from "@/modules/cart/components/CartDelivery.vue";
import { costFormat } from "@/common/functions.js";

export default {
  name: "Cart",

  components: {
    CartPizzaList,
    CartMiscList,
    CartDelivery,
  },

  computed: {
    orderCost: function () {
      return costFormat(this.$store.getters["Cart/orderCost"]);
    },

    isCartNoEmpty: function () {
      return this.$store.getters["Cart/pizzaList"].length > 0;
    },
  },
};
</script>

<style scoped></style>
