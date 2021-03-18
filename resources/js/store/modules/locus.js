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
        locusFinds: [],
        locusFindsMeta: {
            displayOptionIndex: 0,
            displayOptions: ["Media", "Chips", "Table"],
            page: 1,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
        locusFinds(state) {
            return state.locusFinds;
        },
        locusFindsMeta(state) {
            return state.locusFindsMeta;
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

        locusFinds(state, payload) {
            //console.log(`loci/locusFinds: ` + JSON.stringify(payload, null, 2));
            state.locusFinds = payload;
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let item  = rootGetters["mgr/item"];
            let toCopy = payload;
             commit("id", toCopy ? item.id : null);
             commit("area_season_id", toCopy ? item.area_season_id : null);
             commit("locus_no", toCopy ? item.locus_no : null);
             commit("square", toCopy ? item.square : null);
             commit("date_opened", toCopy ? item.date_opened : null);
             commit("date_closed", toCopy ? item.date_closed : null);
             commit("level_opened", toCopy ? item.level_opened : null);
             commit("level_closed", toCopy ? item.level_closed : null);
             commit("locus_above", toCopy ? item.locus_above : null);
             commit("locus_below", toCopy ? item.locus_below : null);
             commit("locus_co_existing", toCopy ? item.locus_co_existing : null);
             commit("description", toCopy ? item.description : null);
             commit("deposit", toCopy ? item.deposit : null);
             commit("registration_notes", toCopy ? item.registration_notes : null);
             commit("clean", toCopy ? item.clean : null);
        },      
    },
};
