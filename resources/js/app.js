require('./bootstrap');
import Vue from 'vue';
import vuetify from './vuetify';
import Vuelidate from 'vuelidate';
import router from './routing/router';
import store from './store/store.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuelidate);
store.dispatch("mgr/initApp", router, { root: true });

const app = new Vue({
    store,
    router,
    vuetify,
    components: {
        MainApp
    }
}).$mount('#app');

