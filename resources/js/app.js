require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import router from './router';
import store from './store/store.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(Vuelidate);

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify: new Vuetify(),
    components: {
        MainApp
    }
});