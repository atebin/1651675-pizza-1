<template>
  <span :class="`filling filling--${codeComponent}`">
    {{ textComponent }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    textComponent: {
      type: String,
      required: true,
    },
    codeComponent: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
