<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      :class="classesButtonMinus"
      @click="counterChange('minus')"
      :disabled="isButtonDisabledMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="'counter_' + nameInput"
      class="counter__input"
      v-model="localValue"
      @change="inputChange"
    />
    <button
      type="button"
      :class="classesButtonPlus"
      @click="counterChange('plus')"
      :disabled="isButtonDisabledPlus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { INGREDIENT_COUNTER_LIMIT_MAX } from "@/common/constants.js";

export default {
  name: "ItemCounter",

  props: {
    nameInput: {
      type: String,
      required: true,
    },
    counterValue: {
      type: Number,
      required: true,
    },
    orderIngredients: {
      type: Object,
      required: true,
    },
    indexInArray: {
      type: Number,
      required: true,
    },
  },

  data: () => {
    return {
      localValue: "-",
      counterChangeStep: {
        plus: 1,
        minus: -1,
      },
      counterChangeLimit: {
        min: 0,
        max: INGREDIENT_COUNTER_LIMIT_MAX,
      },
    };
  },

  watch: {
    counterValue: function () {
      this.updateCurrentValue();
    },
    orderIngredients: {
      deep: true,
      handler(updatedIngredients) {
        if (this.nameInput in updatedIngredients) {
          if (updatedIngredients[this.nameInput] !== this.localValue) {
            this.localValue = updatedIngredients[this.nameInput];
          }
        }
      },
    },
  },

  computed: {
    classesButtonMinus: function () {
      return {
        counter__button: true,
        "counter__button--disabled": true,
        "counter__button--minus": true,
      };
    },

    classesButtonPlus: function () {
      return {
        counter__button: true,
        "counter__button--disabled": true,
        "counter__button--plus": true,
      };
    },

    isButtonDisabledMinus: function () {
      return this.localValue <= this.counterChangeLimit.min;
    },

    isButtonDisabledPlus: function () {
      return this.localValue >= this.counterChangeLimit.max;
    },
  },

  methods: {
    updateCurrentValue() {
      this.localValue = this.counterValue;
      this.updateOrder(this.counterValue);
    },

    inputChange(event) {
      let newValue = Math.round(Number(event.target.value));
      this.localCounterChange(newValue);
    },

    counterChange(step) {
      let newValue = this.localValue + this.counterChangeStep[step];
      this.localCounterChange(newValue);
    },

    localCounterChange(argValue) {
      let newValue = Math.min(
        Math.max(argValue, this.counterChangeLimit.min),
        this.counterChangeLimit.max
      );
      this.updateOrder(newValue);
      this.localValue = newValue;
    },

    updateOrder(newValue) {
      this.$emit("updateOrder", {
        type: "ingredients",
        name: this.nameInput,
        value: newValue,
      });
    },
  },

  created() {
    this.updateCurrentValue();
  },
};
</script>

<style></style>
