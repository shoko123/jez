import { getLocalUser } from "../general";
import  locus  from './modules/locus.js';
import  stone  from './modules/stone.js';
import  appstatus  from './modules/app-status.js';
import  find  from './modules/find.js';
import  groundstone from "./modules/groundstone";
import  picker  from './modules/picker.js';

const user = getLocalUser();

export default {

    modules: {
        lo: locus,
        st: stone,
        gs: groundstone,
        ap: appstatus,
        fn: find,
        pk: picker,
        //au: auth
    },

    state: {
        currentUser: user,
        isLoggedIn: !!user,
        auth_error: null,
        
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
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        snackbar(state) {
            return state.snackbar;
        },
        currentUser(state) {
            return state.currentUser;
        },

        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        },
        showSubMenu(state) {
            return (typeof state.route.params.id !== 'undefined') ;
        },
    },
    mutations: {
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
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
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
    },
    actions: {
        login(context) {
            context.commit("login");
        },

        
        getCustomers(context) {
            axios.get('/api/customers')
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                })
        },
    }
};
