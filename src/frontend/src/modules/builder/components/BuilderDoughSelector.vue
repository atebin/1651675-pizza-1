<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <RadioButton
        :arrayData="dough"
        nameInput="dough"
        classesNameComponent="sheet__content dough"
        classesNameLabel="dough__input dough__input--"
        vuexActionName="Builder/updatePizzaBuilder"
        vuexDataType="foundation"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },

  computed: {
    dough() {
      return this.$store.getters["Builder/dough"];
    },
  },
};
</script>

<style></style>
