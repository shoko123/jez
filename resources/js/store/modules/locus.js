export default {
    namespaced: true,
    state: {   
        newItem: {
            id: null,
            area_season_id: null,
            locus_no: null,
            square: null,
            date_opened: null,
            date_closed: null,
            level_opened: null,
            level_closed: null,
            locus_above: null,
            locus_below: null,
            locus_co_existing: null,
            description: null,
            deposit: null,
            registration_notes: null,
            clean: null,
        },
        tag: null,
        dataExtra: {},
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
    },
    mutations: {
        id(state, payload) {
            return state.newItem.id = payload;
        },
        area_season_id(state, payload) {
            return state.newItem.area_season_id = payload;
        },
        locus_no(state, payload) {
            return state.newItem.locus_no = payload;
        },
        square(state, payload) {
            return state.newItem.square = payload;
        },
        date_opened(state, payload) {
            return state.newItem.date_opened = payload;
        },
        date_closed(state, payload) {
            return state.newItem.date_closed = payload;
        },
        level_opened(state, payload) {
            return state.newItem.level_opened = payload;
        },
        level_closed(state, payload) {
            return state.newItem.level_closed = payload;
        },
        locus_above(state, payload) {
            return state.newItem.locus_above = payload;
        },
        locus_below(state, payload) {
            return state.newItem.locus_below = payload;
        },
        locus_co_existing(state, payload) {
            return state.newItem.locus_co_existing = payload;
        },
        description(state, payload) {
            return state.newItem.description = payload;
        },
        deposit(state, payload) {
            return state.newItem.deposit = payload;
        },
        registration_notes(state, payload) {
            return state.newItem.registration_notes = payload;
        },
        clean(state, payload) {
            return state.newItem.clean = payload;
        },

        registrationData(state, registrationData) {
            console.log("loci/registrationData" + JSON.stringify(registrationData, null, 2));
            state.newItem = Object.assign(state.newItem, registrationData)
        },

        clear(state) {
            console.log("locus.clear");
            state.locus_no = null;
            state.loci = null;     
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let item  = rootGetters["mgr/item"];
            let isUpdate = rootGetters["mgr/status"].isUpdate;
             commit("id", isUpdate ? item.id : null);
             commit("area_season_id", isUpdate ? item.area_season_id : null);
             commit("locus_no", isUpdate ? item.locus_no : null);
             commit("square", isUpdate ? item.square : null);
             commit("date_opened", isUpdate ? item.date_opened : null);
             commit("date_closed", isUpdate ? item.date_closed : null);
             commit("level_opened", isUpdate ? item.level_opened : null);
             commit("level_closed", isUpdate ? item.level_closed : null);
             commit("locus_above", isUpdate ? item.locus_above : null);
             commit("locus_below", isUpdate ? item.locus_below : null);
             commit("locus_co_existing", isUpdate ? item.locus_co_existing : null);
             commit("description", isUpdate ? item.description : null);
             commit("deposit", isUpdate ? item.deposit : null);
             commit("registration_notes", isUpdate ? item.registration_notes : null);
             commit("clean", isUpdate ? item.clean : null);
        },      
    },
};
