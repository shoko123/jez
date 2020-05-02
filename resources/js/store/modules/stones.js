export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
        },

        newItem: {
            id: null,

            weight: null,
            stone_notes: null,
            measurements: null,
        },

        tagOrderedCategories: [
            "Typology",
            "Function",
            "Material",
            "Source",
            "Preservation",
            "Life-stage",
            "Morphological",
            "Profile",
            "Wear",
            "Production",
            "Use",
        ],

    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },
        newItemData(state) {
            return state.newItem;
        },

        /////New Stone fields
        weight(state) {
            return state.newItem.weight;
        },
        notes(state) {
            return state.newItem.stone_notes;
        },
        measurements(state) {
            return state.newItem.measurements;
        },
    },

    mutations: {
        weight(state, payload) {
            state.newItem.weight = payload;
        },
        notes(state, payload) {
            state.newItem.stone_notes = payload;
        },
        measurements(state, payload) {
            state.newItem.measurements = payload;
        },

        prepare(state, payload) {
            state.newItem = payload
        },

        clear(state) {
            console.log("stone.clear");
            state.newItem = null;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let data = {};
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["mgr/item"]);              
                data.stone_notes = data.notes;
                data.weight = data.weight;
                delete data.notes;
                delete data.tag;
                delete data.areaSeason;
               
            } else if (rootGetters["mgr/status"].isCreate) {
                data.weight = null;
                data.stone_notes = null;
                data.measurements = null;
            }
            commit('prepare', data);
        },

        prepareFilter({ state, commit }) {
            //console.log("payload: " + JSON.stringify(payload, null, 2));
            //console.log("categories: " + JSON.stringify(categories, null, 2));
            commit("tag/setOrderedCategories", state.tagOrderedCategories, { root: true });
        },
    }
}