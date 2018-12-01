import { getLocalUser } from "./core/auth";

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: [],
        loci: [],
        locus: null,
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
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
        loci(state) {
            return state.loci;
        },
        getLocus(state) {
            return state.locus;
        },

    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        },
        updateLoci(state, payload) {
            state.loci = payload;
        },
        setLocus(state, payload) {
            state.locus = payload;
        }
        
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
        getLoci(context) {
            alert('before getLoci api');
            axios.get('/api/loci')
            .then((response) => {
                //context.commit('updateLoci', response.data.loci);
                context.commit('updateLoci', response.data.data);
            })
        },
        getLocus(context, payload) {
            //axios.get(`/api/loci/${payload}`)
            //        .then((response) => {
            //            this.locus = response.data.locus;
             //           context.commit('setLocus', response.data);
            //        });
        },
        


    }
};