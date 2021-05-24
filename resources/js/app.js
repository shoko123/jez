require('./bootstrap');
import Vue from 'vue';
import vuetify from './vuetify';
import Vuelidate from 'vuelidate';
import router from './router';
import store from './store/store.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'


store.dispatch("init", router);


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.getters["aut/isLoggedIn"]) {
        next("/auth/login");
    } else if (to.path == "/auth/login" && store.getters["aut/isLoggedIn"]) {
        next("/");
    } else {
        console.log(`app/beforeEach from: ${from.path} to: ${to.path}`);
        store.dispatch("mgr/routes/routeChanged", { to, from })
            .then((res) => {
                store.dispatch("mgr/routes/navigationSuccess", null);
                next();
            }).catch(err => {
                console.log(`navigation error: ${JSON.stringify(err, null, 2)}`);
                next(false);
            });
    }
});



const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    components: {
        MainApp
    }
});

//Vue.use(Vuelidate);