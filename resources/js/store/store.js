import manager from './modules/manager/manager.js';
import xhr from './modules/xhr.js';
import auth from './modules/auth.js';
import regs from './modules/reg/regs.js';
import stepper from './modules/stepper.js';
import area from './modules/area.js';
import season from './modules/season.js';
import areaSeason from './modules/areaSeason.js';
import locus from './modules/locus.js';
import find from './modules/find.js';
import pottery from './modules/pottery';
import stones from './modules/stones.js';
import lithic from './modules/lithic';
import glass from './modules/glass';
import metal from './modules/metal';
import about from './modules/about';


import media from './modules/media.js';
//import tags from './modules/tags.js';
import aux from './modules/aux.js';
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
        med: media,
        regs: regs,
        aux: aux,
        snackbar: snackbar,

        area: area,
        season: season,
        arsn: areaSeason,
        loci: locus,
        fnd: find,
        pot: pottery,
        stones: stones,
        lith: lithic,
        glass: glass,
        mtl: metal,
        about: about,
    },
    state: {
        baseUrl: null
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        init({ state, getters, rootGetters, commit, dispatch }, payload) {
            //set router to store for generic goTo() used by components, and navigation after delete, store, etc...)
            commit("mgr/routes/setRouter", payload, { root: true });

            //set server base addresses
            let baseUrl = `${window.location.protocol}//${window.location.host}`;
            commit("mgr/baseUrl", baseUrl, { root: true });
            console.log("vuex.init() setting axios.baseURL to " + baseUrl);
            axios.defaults.baseURL = baseUrl;

            //enables axios debug
            axios.interceptors.response.use(null, error => {
                //console.log("axios interceptor error: " + JSON.stringify(error, null, 2));
                return Promise.reject(error);
            });

            //load images used by app
            dispatch("med/loadAppMedia");
        },
    }
});
