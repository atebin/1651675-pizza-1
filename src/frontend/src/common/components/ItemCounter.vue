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
    additionStileButtonPlus: {
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
        "counter--orange": true,
        ingridients__counter: true,
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
      return [
        {
          counter__button: true,
          "counter__button--disabled": true,
          "counter__button--plus": true,
        },
        this.additionStileButtonPlus,
      ];
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
      this.updateData(newValue);
      this.localValue = newValue;
    },

    updateData(newValue) {
      this.$emit("updateData", newValue);
    },
  },

  created() {
    this.updateCurrentValue();
  },
};
</script>

<style></style>
