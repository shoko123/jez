require('./bootstrap');
import Vue from 'vue';
import { sync } from 'vuex-router-sync'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate'
import {routes} from './routes';
import StoreData from './store/index.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(Vuelidate);

const store = new Vuex.Store(StoreData);
const router = new VueRouter({
    routes,
    mode: 'history'
});

//start sync of router to vuex
const unsync = sync(store, router);

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify: new Vuetify(),
    components: {
        MainApp
    }
});