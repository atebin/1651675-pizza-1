<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData("payload");
      if (payload) {
        const transferData =
            JSON.parse(dataTransfer.getData("payload"));
        this.$emit("drop", transferData);
      }
    }
  }
};
</script>

<style></style>
