<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar class="ma-0 pa-0">
      <v-toolbar-title>Loci</v-toolbar-title>

      <v-toolbar-items>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
      </v-toolbar-items>

      <v-snackbar
        top
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>
  </v-container>
</template>

<script>
//import store from '../../app.js';
export default {
  
  //import store from '../app.js';

  name: "locus-main",

  /*
  beforeRouteEnter(to, from, next) {
    
    axios
      .get("/api/loci")
      .then(response => {
        console.log("loc main BeforeEnter OK");
        console.log(store.getters.isLoggedIn);
        //store.commit("loci", response.data.data);
        next();
      })
      .catch(err => {
        //alert('Routes Before enter axios error @LociGet');
        console.log("loc main BeforeEnter error " + err);
        next('/');//this.$router.push({ path: "/" });
      });
      
     next();
  },
  */

  created() {
    //this.$store.dispatch('areas');
    //this.$store.dispatch("loci");
  },

  data() {
    return {
      items: [
        {
          text: "Loci",
          disabled: false,
          href: "#"
        },
        {
          text: "filter1",
          disabled: false,
          href: "#"
        },
        {
          text: "filter2",
          disabled: true,
          href: "#"
        }
      ],

      snackbar: true,
      color: "green",
      mode: "",
      timeout: 3000,
      text: "Hello,snackbar!"
    };
  }
};
</script>

<style scoped>
.my {
  background: rgb(156, 8, 8);
}
</style>