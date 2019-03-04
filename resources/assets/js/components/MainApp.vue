

<template>
  <v-app id="main">
    
    <Header/>
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
import Header from "./Header.vue";
import Loading from "./common/loading.vue";
import Snackbar from "./common/snackbar.vue";

export default {
  name: "main-app",
  components: { Header, Loading, Snackbar }
};
</script>
