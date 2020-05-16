

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
    this.$store.commit("mgr/setRouter", this.$router);
    this.$store.commit("setRouter", this.$router);
    //this.$store.dispatch("init");
    //set global route guard to handle
    //login and access to priviliged routes.
    console.log("setting global route guard");
    this.$router.beforeEach((to, from, next) => {
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

      if (requiresAuth && !this.isLoggedIn) {
        next("/login");
      } else if (to.path == "/login" && this.isLoggedIn) {
        next("/");
      } else {
        this.$store.dispatch("mgr/routeChanged", { to, from });
        next();
      }
    });
    let baseUrl = `${window.location.protocol}//${window.location.host}`;
    let storageUrl = `${window.location.protocol}//${window.location.host}/storage`;
    console.log("setting axios.baseURL to " + baseUrl);
    axios.defaults.baseURL = baseUrl;
    this.$store.commit("med/storageUrl", storageUrl);

    //handle unauthorized access to DB
    axios.interceptors.response.use(null, error => {
      console.log("axios interceptor error: " + JSON.stringify(error, null, 2));
 //console.log(error.response)
        if (error.response.status === 401) {
          //this.$router.push('login')
          this.$store.commit('aut/logout')
        }
        return Promise.reject(error)
      //if (error.reject.status == 401) {
      //return new Promise.reject(new Error(error));
      //this.$store.commit("logout");
      //this.$router.push("/login");
      // }

      //return Promise.reject(error);
      //
      //return Promise.reject(error);
    });
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    },
    dialogMediaLightBox() {
      return this.$store.getters["med/dialogMediaLightBox"];
    }
  }
};
</script>
