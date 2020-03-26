<template>
  <v-snackbar 
    v-model="snackbar.value"
    top
    left
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
      return this.$store.getters["snackbar/snackbar"];
    }
  },
}
</script>