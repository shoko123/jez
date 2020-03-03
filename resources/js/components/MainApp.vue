

<template>
  <v-app id="main">
    <MainMenu />
    <SubMenu />
    <router-view></router-view>
    <v-footer app></v-footer>
    <Loading />
    <Snackbar />
    <v-dialog v-model="dialogMediaLightBox" persistent class="fill-height">
        <MediaLightBox />
      </v-dialog>
  </v-app>
</template>
<!--meta name="api-base-url" content="{{ url('/api') }}" /-->
<script>
import MainMenu from "./menus/MenuMain.vue";
import SubMenu from "./menus/SubMenu.vue";
import Loading from "./elements/loadingSpinner.vue";
import Snackbar from "./elements/snackbar.vue";
import MediaLightBox from "./media/MediaLightBox.vue";
export default {
  name: "main-app",
  components: { MainMenu, SubMenu, Loading, Snackbar, MediaLightBox },
  created() {
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
    console.log("setting axios.baseURL to " + window.location.protocol + "//" + window.location.host);
    axios.defaults.baseURL = window.location.protocol + "//" + window.location.host;

    console.log("setting storage url to " + window.location.protocol + "//" + window.location.host + "/storage");
    this.$store.commit("med/storageUrl", window.location.protocol + "//" + window.location.host + "/storage");
    //handle unauthorized access to DB
    axios.interceptors.response.use(null, error => {
      console.log("axios interceptor error: " + JSON.stringify(error, null, 2));

      //if (error.reject.status == 401) {
      //return new Promise.reject(new Error(error));
      //this.$store.commit("logout");
      //this.$router.push("/login");
      // }

      //return Promise.reject(error);
      //
      return Promise.reject(error);
    });
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    },
     dialogMediaLightBox: {
      get() {
        return this.$store.getters["med/dialogMediaLightBox"];
      },
      set(data) {
        this.$store.commit("med/dialogMediaLightBox", data);
      }
    }
  }
};
</script>
