<template>
  <div :class="classesNameComponent">
    <p v-if="!isTextIntroEmpty">{{ textIntro }}</p>

    <label
      v-for="item in arrayData"
      :key="item.code"
      :class="classesNameLabel + (isTextIntroEmpty ? item.code : '')"
    >
      <input
        type="radio"
        :name="nameInput"
        :value="item.code"
        :class="{ 'visually-hidden': isRadioStylized }"
        v-model="localValue"
      />
      <b v-if="isTextNamePlusDescription(item)">{{ item.name }}</b>
      <span v-if="isTextNamePlusDescription(item)">{{ item.description }}</span>
      <span v-if="!isTextNamePlusDescription(item)">{{ item.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    arrayData: {
      type: Array,
      required: true,
    },
    nameInput: {
      type: String,
      required: true,
    },
    classesNameComponent: {
      type: String,
      required: true,
    },
    classesNameLabel: {
      type: String,
      required: true,
    },
    textIntro: {
      type: String,
      default: "",
    },
    isRadioStylized: {
      type: Boolean,
      default: true,
    },
  },

  data: () => {
    return {
      localValue: "-",
    };
  },

  watch: {
    arrayData: {
      deep: true,
      handler() {
        this.updateCurrentValue();
      },
    },

    localValue: function () {
      this.$emit("updateData", this.localValue);
    },
  },

  computed: {
    isTextIntroEmpty: function () {
      return this.textIntro === "";
    },
  },

  methods: {
    isTextNamePlusDescription(item) {
      return "description" in item;
    },

    updateCurrentValue() {
      this.$nextTick(() => {
        let elemChecked = this.arrayData.filter((elem) => {
          return elem.isChecked;
        });

        if (elemChecked.length === 1) {
          this.localValue = elemChecked[0].code;
        }
      });
    },
  },

  created() {
    this.updateCurrentValue();
  },
};
</script>

<style></style>
