import stoneUtility from './stoneUtility';

export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
            allowedRegistrations: [
                { registration_category: "AR", basket: false, item: true },
                { registration_category: "GS", basket: true, item: true },],
        },

        newItem: {
            id: null,
            stone_type_id: null,
            material_id: null,
            weight: null,
            stone_notes: null,
            measurements: null,
        },
        materials: null,
        stone_types: null,

        stoneTypologiesMain: [
            { id: 1, name: "Grinding Stones" },
            { id: 2, name: "Active Processors \"not Grinding Stones\" (pestles, grinders, abraders, etc...)" },
            { id: 3, name: "Passive \"Bottom\" Elements (morters, vessels, pallettes, anvils, basins, etc...)" },
            { id: 4, name: "Perforated Objects (weights, digging sticks, etc...)" },
            { id: 5, name: "Elements with no active griding faces (Architectural, incised pebbles, sling stones, etc...)" }
        ],
        stone_typology_main_id: null,
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },
        
        newItem(state, getters, rootState, rootGetters) {
            return stoneUtility.newItem(state, getters, rootState, rootGetters);
        },
    
        //example of passing arguments to getters
        stoneTypologyMainName (state) {
            return id => {
                return state.stoneTypologiesMain.find(x => x.id === id)
            }
        },
    },

    mutations: {

        stone_type_id(state, payload) {
            state.newItem.stone_type_id = payload;
        },
        material_id(state, payload) {
            state.newItem.material_id = payload;
        },
        weight(state, payload) {
            state.newItem.weight = payload;
        },
        notes(state, payload) {
            state.newItem.stone_notes = payload;
        },
        measurements(state, payload) {
            state.newItem.measurements = payload;
        },

        materials(state, payload) {
            state.materials = payload;

        },
        stoneTypes(state, payload) {
            state.stone_types = payload;
        },

        prepare(state, payload) {
            state.newItem = payload
        },

        clear(state) {
            console.log("stone.clear");
            state.newItem = state.materials = state.stoneTypes = null;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let data = {};
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["mgr/item"]);
                data.material_id = data.material ? data.material.id : null;
                data.stone_type_id = data.stone_type ? data.stone_type.id : null;
                data.stone_notes = data.notes;
                data.weight = data.weight;
                delete data.notes;
                delete data.tag;
                delete data.areaSeason;
                delete data.material;
                delete data.stone_type;
            } else if (rootGetters["mgr/status"].isCreate) {
                data.material_id = 100;
                data.stone_type_id = 100;
                data.weight = null;
                data.stone_notes = null;
                data.measurements = null;
            }

            commit('prepare', data);
            dispatch("getStoneRelatedTables", null);
        },

        getStoneRelatedTables({ state, commit, dispatch }) {
            if (!state.materials || !state.stone_types) {
                dispatch("loadMaterials", null)
                    .then((res) => {
                        dispatch("loadStoneTypes", null)
                    })
            }
        },

        loadMaterials({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/materials`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "loading materials", onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('materials', res.data.materials);
                    return res;
                })
        },

        loadStoneTypes({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/stone-types`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "loading stone types", onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('stoneTypes', res.data.stone_types);
                    return res;
                })
        },
    }
}