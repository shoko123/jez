

<template>
  <v-app id="main">
    <MainMenu />
    <v-content class="ma-0 pa-0">
      <v-container fluid class="ma-0 pa-0">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
    <Loading />
    <Snackbar />
  </v-app>
</template>

<script>
import MainMenu from "./elements/menuMain.vue";
import Loading from "./elements/loadingSpinner.vue";
import Snackbar from "./elements/snackbar.vue";

export default {
  name: "main-app",
  components: { MainMenu, Loading, Snackbar },
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
        this.$store.dispatch("mg/routeChanged", { to, from });
        next();
      }
    });

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
    }
  }
};
</script>
