export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["locus and finds", "locus gallery", "finds gallery", "all",],
        },
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

        //newItemForCollection: null,
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        //new locus data
        id(state) {
            return state.newItem.id;
        },
        area_season_id(state) {
            return state.newItem.area_season_id;
        },
        locus_no(state) {
            return state.newItem.locus_no;
        },
        square(state) {
            return state.newItem.square;
        },
        date_opened(state) {
            return state.newItem.date_opened;
        },
        date_closed(state) {
            return state.newItem.date_closed;
        },
        level_opened(state) {
            return state.newItem.level_opened;
        },
        level_closed(state) {
            return state.newItem.level_closed;
        },
        locus_above(state) {
            return state.newItem.locus_above;
        },
        locus_below(state) {
            return state.newItem.locus_below;
        },
        locus_co_existing(state) {
            return state.newItem.locus_co_existing;
        },
        description(state) {
            return state.newItem.description;
        },
        deposit(state) {
            return state.newItem.deposit;
        },
        registration_notes(state) {
            return state.newItem.registration_notes;
        },
        clean(state) {
            return state.newItem.clean;
        },
        newItem(state) {
            return state.newItem;
        },
        
        //mandatory, used to sort and attach new tags.
        tagTypes(state) {
            return [];
        },
    },
    mutations: {

        //new locus data
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
        // end of new locus data

        registrationData(state, registrationData) {
            console.log("loci/registrationData" + JSON.stringify(registrationData, null, 2));
            state.newItem = Object.assign(state.newItem, registrationData)
        },

        clear(state) {
            console.log("locus.clear");
            state.locus_no = null;
            state.loci = null;
            //state.newItem = null;           
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

        tagToggled({ state, getters, rootState, rootGetters, commit, dispatch }, payload) {
            
        },
        resetTagTypes({commit}) {
            //
        },        
    },
};
