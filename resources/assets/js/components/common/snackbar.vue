<template>
  <v-snackbar 
    v-model="snackbar.value"
    top
    right
    :color="snackbar.color"
    :timeout="snackbar.timeout">    
    {{snackbar.message}}
    <!--v-btn flat color="snackbar.color" @click.native="show = false">Close</v-btn-->
  </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
  data () {
    return {
      show: false,
      message: ''
    }
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    }
  },
  methods:{
      close() {
          
      }
  }

}
</script>