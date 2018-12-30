require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import {routes} from './routes';
import StoreData from './store';
import MainApp from './components/MainApp.vue';
import {initialize} from './core/general';
import DateFilter from './filters/DateFilter';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.filter('date', DateFilter);


import 'vuetify/dist/vuetify.min.css'

const store = new Vuex.Store(StoreData);
//const vee = new VeeValidate();
const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(store, router);

const app = new Vue({
    el: '#app',
     store,
     router, 
    //vee,
    components: {
        MainApp
    }
});

export default store;
