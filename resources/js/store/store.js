import manager from './modules/manager/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
import regs from './modules/reg/regs.js';
import stepper from './modules/stepper.js';
import locus from './modules/locus.js';
import find from './modules/find.js';
import stones from './modules/stones.js';
import pottery from './modules/pottery';
import media from './modules/media.js';
import tags from './modules/tags.js';
import filters from './modules/filters.js';
import snackbar from './modules/snackbar.js';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        mgr: manager,
        aut: auth,
        xhr: xhr,
        stp: stepper,
        loci: locus,
        stones: stones,
        pottery: pottery,
        fnd: find,
        med: media,
        regs: regs,
        tag: tags,
        filters: filters,
        snackbar: snackbar,
    },
    state: {
        router: null,
    },
    getters: {
        getRouter(state) {
            return state.router;
        },
    },
    mutations: {
        setRouter(state, payload) {
            state.router = payload;
        },
        goToRoute(state, route) {
            state.router.push({ path: `${route}` });
        },
    },
    actions: {
        init({ state, getters, rootGetters, commit, dispatch }, payload) {
            //set router to store (used by manager after delete, store, etc...)
            commit("setRouter", payload);

            //set server base addresses
            let baseUrl = `${window.location.protocol}//${window.location.host}`;
            let storageUrl = `${window.location.protocol}//${window.location.host}/storage`;
            console.log("setting axios.baseURL to " + baseUrl);
            axios.defaults.baseURL = baseUrl;
            commit("med/storageUrl", storageUrl, { root: true });

            //handle unauthorized access to DB
            axios.interceptors.response.use(null, error => {
                console.log("axios interceptor error: " + JSON.stringify(error, null, 2));
                //console.log(error.response)
                if (error.response.status === 401) {
                    //this.$router.push('login')
                    this.$store.commit("aut/logout");
                }
                return Promise.reject(error);
            });
            dispatch("med/loadAppMedia")
        },
    }

});
