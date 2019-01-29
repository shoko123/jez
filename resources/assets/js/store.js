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
        auth_error: null,
        maxLocusNoForArea: null,
        customers: [],

        areas: [],
        
        loading: {
            value: false,
            message: "Loading...",
            progressColor: "purple",
        },

        loci_buttons: [],

        /*
                area: {
                    id: 2,
                    year: 2013,
                    area: "S"
                },
                */
        locus: {
            locus_id: 5,
            area_id: 2,
            locus_no: 10,
            dig_year: 2017
        },

        loci: [],

        new_locus_tag: {},
        locus_nav_buttons: {
            update: false,
            new: false,
            delete: false,
            loci: false,
        },
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
        


        findLocusById: (state) => (locus_id) => {
            return state.loci.find(lo => lo.id == locus_id);
        },

        findLocusByTag: (state) => (locus_tag) => {
            return state.loci.find(lo => lo.dig_year == locus_tag.year &&
                lo.area == locus_tag.year &&
                lo.locus_no == locus_tag.locus_no);
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
        //area(state) {
        //    return state.area;
        //},

        locus(state) {
            return state.locus;
        },

        getAreaById: (state) => (id) => {
            return state.areas.find(ar => ar.id === id);
        },
        newLocusTag(state) {
            return state.new_locus_tag;
        },
        area(state) {
            return state.area;
        },
        locus_nav_buttons(state) {
            return state.locus_nav_buttons;
        },

        mainMenuItems(state) {
            return state.mainMenuItems;
        },
        loci_buttons(state) {
            return state.loci_buttons;
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
        updateCustomers(state, payload) {
            state.customers = payload;
        },


        loci(state, payload) {
            //alert('loaded loci');
            state.loci = payload;
        },

        locus(state, payload) {
            //alert('loaded loci');
            state.locus = payload;
        },
        locusDeleteFromList(state, payload) {
            //alert('loaded loci');
            let index = state.loci.findIndex(lo => lo.id === payload);
            if (index === -1) {
                console.log('store - locus delete - couldn\'t find locus with id: ' + payload);
                return;
            }

            state.loci.splice(index, 1);
            //alert('loaded loci');

        },
        locusNext(state) {
            let index = state.loci.findIndex(lo => lo.id === state.locus.id);
            if(index == state.loci.length - 1){
                state.locus = state.loci[0];
               }else{
                state.locus = state.loci[++index];
               }
            

        },
        locusPrev(state) {
            let index = state.loci.findIndex(lo => lo.id === state.locus.id);
            if(index ==  0){
                state.locus = state.loci[state.loci.length -1];
               }else{
                state.locus = state.loci[--index];
               }
        },


        areas(state, payload) {
            state.areas = payload;
        },

        locus_nav_buttons(state, payload) {
            state.locus_nav_buttons = payload;
        },

        //area(state, payload) {
        //   state.area = payload;
        //},


        newLocusTag(state, payload) {
            state.new_locus_tag = payload;
        },
        isLoading(state, payload) {
            //console.log('Store-isLoading: ' + JSON.stringify(payload));
            state.loading = payload;
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
                    //alert("locus " + res.data.data.locus_id + " deleted");
                    //context.commit('setLocus', res.data.data);
                })
                .catch(err => { console.log(err) })
        },
        loci_buttons(context, payload) {
            console.log('loci_buttons' + JSON.stringify(payload));
        },
    }
};
