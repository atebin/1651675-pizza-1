<template>
  <section v-if="isDataInStoreLoaded">
    <h1>Страница Orders</h1>
  </section>
</template>

<script>
export default {
  name: "Orders",

  computed: {
    isDataInStoreLoaded: function () {
      return this.$store.getters["Orders/getInitModule"];
    },
  },

  created() {
    if (!this.isDataInStoreLoaded) {
      // если модуль в STORE не инициализирован - запускаем инициализацию
      this.$store.dispatch("Orders/initModule");
    }
  },
};
</script>

<style scoped></style>
