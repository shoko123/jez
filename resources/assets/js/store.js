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
        areas: [],
        locus: null,
        new_area: {},
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
        locus(state) {
            return state.locus;
        },
        areas(state) {
            return state.areas;
        },
        getAreaById: (state) => (id) => {
            return state.areas.find(ar => ar.id === id);
        },
        lociForArea (state) {
            return state.lociForArea;
        },
        newArea(state) {
            return state.area;
        }

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
            state.loading = false;
            //console.log('locus commit locus id: ' + state.locus.id);
        },
        setAreasList(state, payload) {
            state.areas = payload;
            state.loading = false;
        },
        lociForArea(state, payload) {
            state.lociForArea = payload;
            state.loading = false;
        },
        chooseNewArea(state, payload) {
            state.area = payload;
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


        LociGet(context) {
            //alert('before getLoci api');
            axios.get('/api/loci')
            .then((response) => {
                //context.commit('updateLoci', response.data.loci);
                context.commit('updateLoci', response.data.data);
            })
        },
        LocusGet(context, payload) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.get(`/api/loci/${payload}`)
                    .then((res) => {                       
                        context.commit('setLocus', res.data.data);  })
                    .catch(err => {console.log(err)})
                        
        },
        LocusDelete(context, payload) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.delete(`/api/loci/${payload}`)
                    .then((res) => {                       
                        context.commit('setLocus', res.data.data);  })
                    .catch(err => {console.log(err)})                
        },
        AreasList(context) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.get(`/api/areas`)
                    .then((res) => {                       
                        context.commit('setAreasList', res.data.areas);  })
                    .catch(err => {console.log(err)})                
        },
        lociForArea(context, payload) {
            axios.get(`/api/areas/${payload}/loci`)
                    .then((res) => {                       
                        context.commit('lociForArea', res.data.lociForArea);  })
                    .catch(err => {console.log(err)})                
        },
        
        

    }
};