import { getLocalUser } from "./core/auth";

const user = getLocalUser();
/*
let Locus =
        {
            id: "",
            area_id: "",
            locus: "",
            square: "",
            date_opened: "",
            date_closed: "",
            level_opened: "",
            level_closed: "",
            locus_above: "",
            locus_below: "",
            locus_co_existing: "",
            description: "",
            deposit: "",
            registration_notes: "",
            clean: "",
        },
        area: {
            year: "",
            area: "",
            area_id: "",
        },
*/
export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        maxLocusNoForArea: null,
        customers: [],

        areas: [],
        loci: [],
        new_locus_tag: {},
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
        /*
            return {
                id: loc.id,
                area_id: loc.area_id,
                locus_no: loc.locus_no,
                dig_year: area.year,
                area_name: area.area,
                square: loc.square,
                date_opened: loc.date_opened,
                date_closed: loc.date_closed,
                level_opened: loc.level_opened,
                level_closed: loc.level_closed,
                locus_above: loc.locus_above,
                locus_below: loc.locus_below,
                locus_co_existing: loc.locus_co_existing,
                description: loc.description,
                deposit: loc.deposit,
                registration_notes: loc.registration_notes,
                clean: loc.clean,
                tag: area.year + '.' + area.area + '.' + loc.locus_no,
            };

            //return {};

        },
            */
        findLocusById: (state) => (locus_id) => {
            return state.loci.find(lo => lo.id == locus_id);
        },

        findLocusByTag: (state) => (locus_tag) => {
            return state.loci.find(lo => lo.dig_year == locus_tag.year &&
                                         lo.area == locus_tag.year &&
                                         lo.locus_no  == locus_tag.locus_no);
        },
        //add tag to areas
        areas(state) {
            //return state.areas;
            return state.areas.map(ar => ({
                tag: ar.year + "." + ar.area,
                year: ar.year,
                area: ar.area,
                id: ar.id
            }));
        },
       
        getAreaById: (state) => (id) => {
            return state.areas.find(ar => ar.id === id);
        },
        newLocusTag(state) {
            return state.new_locus_tag;
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
            state.currentUser = Object.assign({}, payload.user, { token: payload.access_token });

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


        loci(state, payload) {
            //alert('loaded loci');
            state.loci = payload;
        },
       
        areas(state, payload) {
            state.areas = payload;
        },
        
        newLocusTag(state, payload) {
            state.new_locus_tag = payload;
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        },

        areas(context) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.get(`/api/areas`)
                .then((res) => {
                    context.commit('areas', res.data.areas);
                })
                .catch(err => { console.log(err) })
        },

        area(context, payload) {
            context.commit('area', payload);
        },

        getCustomers(context) {
            axios.get('/api/customers')
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                })
        },
        newLocusTag(context, payload) {
            context.commit('newLocusTag', payload);
        },

        loci(context) {
            //alert('before getLoci api');
            axios.get('/api/loci')
                .then((response) => {
                    context.commit('loci', response.data.data);
                })
                .catch(err => {
                    //alert('STORE axios error @LociGet');
                    console.log(err.response);
                    //router.push({ path: "/" })
                })
        },
        LocusDelete(context, payload) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.delete(`/api/loci/${payload}`)
                .then((res) => {
                    alert("locus " + res.data.data.locus_id + " deleted");
                    //context.commit('setLocus', res.data.data);
                })
                .catch(err => { console.log(err) })
        },




    }
};