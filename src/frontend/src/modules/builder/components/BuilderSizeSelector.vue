<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <RadioButton
        :arrayData="diameter"
        nameInput="diameter"
        classesNameComponent="sheet__content diameter"
        classesNameLabel="diameter__input diameter__input--"
        @updateOrder="updateOrder"
      />
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },

  props: {
    diameter: {
      type: Array,
      required: true,
    },
  },

  methods: {
    updateOrder(newValue) {
      this.$emit("updateOrder", newValue);
    },
  },
};
</script>

<style></style>
