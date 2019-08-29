<template>
  <v-layout row justify-center>
    <v-dialog v-model="loading.value" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="7" :color="loading.progressColor"></v-progress-circular>
          <h1 v-if="loading.message != null">{{loading.message}}</h1>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "loadingSpinner",

  computed: {
    loading() {
      return this.$store.getters["xhr/loadingSpinner"];
    }
  },
};
</script>

<style>
.dialog.centered-dialog,
.v-dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
</style>