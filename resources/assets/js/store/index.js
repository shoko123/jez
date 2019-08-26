import { getLocalUser } from "../general";

import  manager  from './modules/manager.js';
import  xhr  from './modules/xhr.js';
import  auth from './modules/auth.js';
import  picker  from './modules/picker.js';
import  stepper  from './modules/stepper.js';

import  find  from './modules/find.js';
import  gs from "./modules/gs";
import  locus  from './modules/locus.js';
const user = getLocalUser();

export default {

    modules: {
        mg: manager,
        aut: auth,
        pk: picker,
        xhr: xhr,
        stp: stepper,
        
        loc: locus,
        gss: gs,        
        fn: find,   
    },

    state: {
        
        customers: [],

        loading: {
            value: false,
            message: "Loading...",
            progressColor: "purple",
        },

        snackbar: {
            value: false,
            message: "",
            timeout: 2000,
            color: "green",
            mode: "",
        },
    },

    getters: {
 
        snackbar(state) {
            return state.snackbar;
        },
        isLoading(state) {
            return state.loading;
        },

        customers(state) {
            return state.customers;
        },
        showSubMenu(state) {
            if(typeof state.route === 'undefined') {
                return false;
            }
            return (typeof state.route.params.id !== 'undefined') ;
        },
    },
    mutations: {
        /*
        login(state) {
            state.loading.value = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading.value = false;
            state.currentUser = Object.assign({}, payload.user, { token: payload.access_token });

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading.value = false;
            state.auth_error = payload.error;
        },
        */
        logout(state) {
            //localStorage.removeItem("user");
            //state.isLoggedIn = false;
            //state.currentUser = null;
        },
        isLoading(state, payload) {
            //console.log('Store-isLoading: ' + JSON.stringify(payload));
            state.loading = payload;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        },

        snackbar(state, payload) {
            state.snackbar = payload;
        },
        test(payload) {
            console.log('store.index.test() payload: ' + JSON.stringify(payload, null, 2));
        }
    },
    actions: {
        /*
        login(context) {
            context.commit("login");
        },
        */
    }
};
