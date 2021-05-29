require('./bootstrap');
import Vue from 'vue';
import vuetify from './vuetify';
import Vuelidate from 'vuelidate';
import router from './routing/router';
import store from './store/store.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'

store.dispatch("init", router);

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    components: {
        MainApp
    }
});

Vue.use(Vuelidate);