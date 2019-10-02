require('./bootstrap');
import Vue from 'vue';
import { sync } from 'vuex-router-sync'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import {routes} from './routes';
import StoreData from './store/index.js';
import MainApp from './components/MainApp.vue';
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VeeValidate);

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
    components: {
        MainApp
    }
});