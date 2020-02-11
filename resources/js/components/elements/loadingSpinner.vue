<template>
  <v-overlay :value="loading.value" :z-index="300">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <h1 v-if="loading.message != null">{{loading.message}}</h1>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters["xhr/loadingSpinner"];
    }
  }
};
</script>

