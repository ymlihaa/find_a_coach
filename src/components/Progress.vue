<template>
  <div class="text-center">
    <v-progress-circular
      v-if="this.$store.state.loading == true"
      :size="70"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("isLoading");
  },
};
</script>



<style  scoped>
</style>