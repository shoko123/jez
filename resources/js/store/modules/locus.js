export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["locus and finds", "locus gallery", "finds gallery", "all",],
        },
        newItem: {
            data: {
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
        //newItemForCollection: null,
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        //new locus data
        id(state) {
            return state.newItem.data.id;
        },
        area_season_id(state) {
            return state.newItem.data.area_season_id;
        },
        locus_no(state) {
            return state.newItem.data.locus_no;
        },
        square(state) {
            return state.newItem.data.square;
        },
        date_opened(state) {
            return state.newItem.data.date_opened;
        },
        date_closed(state) {
            return state.newItem.data.date_closed;
        },
        level_opened(state) {
            return state.newItem.data.level_opened;
        },
        level_closed(state) {
            return state.newItem.data.level_closed;
        },
        locus_above(state) {
            return state.newItem.data.locus_above;
        },
        locus_below(state) {
            return state.newItem.data.locus_below;
        },
        locus_co_existing(state) {
            return state.newItem.data.locus_co_existing;
        },
        description(state) {
            return state.newItem.data.description;
        },
        deposit(state) {
            return state.newItem.data.deposit;
        },
        registration_notes(state) {
            return state.newItem.data.registration_notes;
        },
        clean(state) {
            return state.newItem.data.clean;
        },
        newItemData(state) {
            return state.newItem.data;
        },
    },
    mutations: {

        //new locus data
        id(state, payload) {
            return state.newItem.data.id = payload;
        },
        area_season_id(state, payload) {
            return state.newItem.data.area_season_id = payload;
        },
        locus_no(state, payload) {
            return state.newItem.data.locus_no = payload;
        },
        square(state, payload) {
            return state.newItem.data.square = payload;
        },
        date_opened(state, payload) {
            return state.newItem.data.date_opened = payload;
        },
        date_closed(state, payload) {
            return state.newItem.data.date_closed = payload;
        },
        level_opened(state, payload) {
            return state.newItem.data.level_opened = payload;
        },
        level_closed(state, payload) {
            return state.newItem.data.level_closed = payload;
        },
        locus_above(state, payload) {
            return state.newItem.data.locus_above = payload;
        },
        locus_below(state, payload) {
            return state.newItem.data.locus_below = payload;
        },
        locus_co_existing(state, payload) {
            return state.newItem.data.locus_co_existing = payload;
        },
        description(state, payload) {
            return state.newItem.data.description = payload;
        },
        deposit(state, payload) {
            return state.newItem.data.deposit = payload;
        },
        registration_notes(state, payload) {
            return state.newItem.data.registration_notes = payload;
        },
        clean(state, payload) {
            return state.newItem.data.clean = payload;
        },
        // end of new locus data

        prepare(state, payload) {
            state.newItem.data = payload;
            console.log('loc.prepare newItem.data: ' + JSON.stringify(state.newItem.data, null, 2));
        },

        registrationData(state, registrationData) {
            console.log("loci/registrationData" +  JSON.stringify(registrationData, null, 2));
            Object.assign(state.newItem.data, registrationData)
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
            let data = null;
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["mgr/item"]);
                delete data.tag;
                delete data.areaSeason;
            } else {
                data = {
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
                }
            }
            commit("prepare", data)
            //console.log("locus_id.action.prepare payload: " + JSON.stringify(payload, null, 2));          
        },

    },
};
