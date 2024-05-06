<template>
  <div class="loadingContainer">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.loadingContainer {
  width: max-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
}
</style>
