<template>
  <div class="popup">
    <a href="#" class="close">
      <span class="visually-hidden" @click.prevent="closePopup">
        Закрыть попап
      </span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="#" class="button" @click.prevent="closePopup">
        Отлично, я жду!
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",

  methods: {
    closePopup() {
      if (this.$store.getters["Orders/getInitModule"]) {
        // усли модуль Cart уже инициализирован - работем
        this.addOrderToList();
      } else {
        this.$store.dispatch("Orders/initModule").then(() => {
          // если нет - сначала инициализируем
          this.addOrderToList();
        });
      }
    },

    addOrderToList() {
      this.$store.dispatch("Orders/addOrderList");

      this.$nextTick(() => {
        this.$store.dispatch("Cart/clearModule");
        let isAuthorized = this.$store.getters["Auth/getAuthorized"];
        this.$router.push({ name: isAuthorized ? "Orders" : "Index" });
      });
    },
  },
};
</script>

<style scoped></style>
