require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import {routes} from './routes';
import StoreData from './store';
import MainApp from './components/MainApp.vue';
import {initialize} from './core/general';
import DateFilter from './filters/DateFilter';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.filter('date', DateFilter);


import 'vuetify/dist/vuetify.min.css'

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
