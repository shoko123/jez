<template>
  <v-snackbar 
    v-model="snackbar.value"
    top
    right
    :color="snackbar.color"
    :timeout="snackbar.timeout">    
    {{snackbar.message}}
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  computed: {
    snackbar() {
      return this.$store.getters["xhr/snackbar"];
    }
  },
}
</script>