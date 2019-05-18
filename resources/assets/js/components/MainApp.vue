

<template>
  <v-app id="main">
    
    <MainMenu/>
    <v-content class="ma-0 pa-0">
      <v-container fluid class="ma-0 pa-0">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
    <Loading/>
    <Snackbar/>
  </v-app>
</template>


<script>
import MainMenu from "./mainMenu.vue";
import Loading from "./common/loading.vue";
import Snackbar from "./common/snackbar.vue";

export default {
  name: "main-app",
  components: { MainMenu, Loading, Snackbar },

watch: {
    $route(to, from) {
      //console.log('mainApp.watch($route) to: ' + to.path + '\n' + JSON.stringify(to.params));
      //console.log('state.route.params: ' + JSON.stringify(this.$store.state.route.params, null, 2));
      //console.log('mainApp.checking route: ' + this.$store.state.route.path);
      /*
      switch (to.params) {
        case "locusWelcome":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_WELCOME;
          break;

        case "locusShow":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_SHOW;
          break;

        case "locusNew":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_NEW;
          break;

        case "locusFilters":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_FILTERS;
          break;

        case "locusDisplayOptions":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_DISPLAY_OPTIONS;
          break;

        case "locusList":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_LIST;
          break;

        case "locusFilteredList":
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_LIST_FILTERED;

          break;

        default:
          this.state = LOCUS_HEADER_DISPLAY_STATE.LOCUS_HEADER_LOCUS_WELCOME;
      }
      //console.log(
      //  "locusHeader.watch($route) route changed to: " + to.path + " name: " + to.name
      //);
      */
    }, 
    deep: true,

    
    
  },


};
</script>
