

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
   created() {
    console.log('setting global route guard');
    this.$router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        

        if (requiresAuth && !this.isLoggedIn) {
            next('/login');
        } else if (to.path == '/login' && this.isLoggedIn) {
            next('/');
        } else {
            /////
            this.$store.dispatch('mg/routeChanged', {to, from});
            ////
            next();
        }
    });

    axios.interceptors.response.use(null/*
        (response) => {
            console.log('axios interceptor response: ' + JSON.stringify(response, null, 2));
            return Promise.resolve(response);
        }*/,
        (error) => {
            console.log('axios interceptor error: ' + JSON.stringify(error, null, 2));
            if (error.resposne.status == 401) {
                console.log('axios interceptor: 401');
                this.$store.commit('logout');
                this.$router.push('/login');
            }

            return Promise.reject(error);
        });
  /*
    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    } else {
        console.log('axios interceptor: user is null!!!!');
    }
    */




   },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["aut/isLoggedIn"];
    }
  },
};
</script>
