export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["locus and finds", "locus gallery", "finds gallery", "all",],
        },
        newItem: {
            data: {
                id: null,
                area_id: null,
                locus: null,
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
        area_id(state) {
            return state.newItem.data.area_id;
        },
        locus_no(state) {
            return state.newItem.data.locus;
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
        area_id(state, payload) {
            return state.newItem.data.area_id = payload;
        },
        locus_no(state, payload) {
            return state.newItem.data.locus = payload;
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
            //console.log('loc.mutation.prepare');
            /*
            if (payload.isCreate) {
                state.newItem.data.id = null;
                state.newItem.data.area_id = null;
                state.newItem.data.locus = null;
                state.newItem.data.square = null;
                state.newItem.data.date_opened = null;
                state.newItem.data.date_closed = null;
                state.newItem.data.level_opened = null;
                state.newItem.data.level_closed = null;
                state.newItem.data.locus_above = null;
                state.newItem.data.locus_below = null;
                state.newItem.data.locus_co_existing = null;
                state.newItem.data.description = null;
                state.newItem.data.deposit = null;
                state.newItem.data.registration_notes = null;
                state.newItem.data.clean = null;
            } else {
                //console.log("copy item -> newLocus. currentLocus: "  + JSON.stringify(payload.item, null, 2));               
                state.newItem.data = payload.data;
                state.newItem.tag = payload.tag;
            }
            */
        },

        copyRegistrationDetails(state, registration) {
            console.log("copy to locus registration " + JSON.stringify(registration, null, 2));
            state.newItem.data.area_id = registration.area.id;
            state.newItem.data.locus = registration.locus;
        },
        clear(state) {
            console.log("locus.clear");
            state.locus = null;
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
                delete data.area;
            } else {
                data = {
                    id: null,
                    area_id: null,
                    locus: null,
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
            //console.log("locus.action.prepare payload: " + JSON.stringify(payload, null, 2));          
        },

    },
};
