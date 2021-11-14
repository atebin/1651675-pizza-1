<template>
  <div class="counter" :class="classesItemCounter">
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
export default {
  name: "ItemCounter",

  props: {
    counterType: {
      type: String,
      required: true,
    },
    nameInput: {
      type: String,
      required: true,
    },
    counterValue: {
      type: Number,
      required: true,
    },
    counterChangeLimit: {
      type: Object,
      required: true,
    },
    vuexActionName: {
      type: String,
      required: true,
    },
    vuexDataType: {
      type: String,
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
    };
  },

  watch: {
    counterValue: function () {
      this.updateCurrentValue();
    },
  },

  computed: {
    classesItemCounter: function () {
      return {
        "counter--orange": this.counterType === "ingredients",
        ingridients__counter: this.counterType === "ingredients",
        "cart-list__counter": this.counterType === "pizzaList",
      };
    },

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
        "counter__button--orange": this.counterType === "pizzaList",
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
      this.$store.dispatch(this.vuexActionName, {
        type: this.vuexDataType,
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
