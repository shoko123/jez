

<template>
  <v-app id="main">
    <MainMenu />
    <router-view></router-view>
    <!--Footer /-->
    <LoadingSpinner />
    <Snackbar />
    <v-dialog v-model="dialogMediaLightBox" persistent class="fill-height">
      <MediaLightBox />
    </v-dialog>
  </v-app>
</template>

<script>
import MainMenu from "./menus/MenuMain.vue";
import LoadingSpinner from "./elements/loadingSpinner.vue";
import Snackbar from "./elements/snackbar.vue";
import MediaLightBox from "./media/MediaLightBox.vue";
import Footer from "./elements/Footer.vue";

export default {
  name: "main-app",
  components: {
    MainMenu,
    Footer,
    LoadingSpinner,
    Snackbar,
    MediaLightBox
  },

  created() {
    this.$store.dispatch("init", this.$router);
  },
 
  computed: {
    dialogMediaLightBox() {
      return this.$store.getters["med/dialogMediaLightBox"];
    }
  }
};
</script>
