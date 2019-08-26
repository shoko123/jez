

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
import MainMenu from "./elements/menuMain.vue";
import Loading from "./elements/jezLoading.vue";
import Snackbar from "./elements/jezSnackbar.vue";

export default {
  name: "main-app",
  components: { MainMenu, Loading, Snackbar },
  data() {
    return {};
  }
};
</script>
