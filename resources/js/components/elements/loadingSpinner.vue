<template>
  <v-overlay :value="spinner.isOn" :z-index="300">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <h1 v-if="spinner.message != null">{{spinner.message}}</h1>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    spinner() {
      return this.$store.getters["xhr/spinner"];
    }
  }
};
</script>

