export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
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

        tagOrderedCategories: ["Material", "Source", "Preservation", "Life-stage", "Typology", "Morphological", "Production", "Use", "Function"],

    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },
        newItemData(state) {
            return state.newItem;
        },

        materials(state) {
            return state.materials;
        },

        stoneTypes(state) {
            return state.stone_types;
        },

        /////New Stone fields
        stone_type_id(state) {
            return state.newItem.stone_type_id;
        },
        material_id(state) {
            return state.newItem.material_id;
        },

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

        prepare1({ state, commit }) {
            //console.log("payload: " + JSON.stringify(payload, null, 2));
            //console.log("categories: " + JSON.stringify(categories, null, 2));
            commit("tag/setOrderedCategories", state.tagOrderedCategories, { root: true });
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

        submitQuery({ state, getters, rootGetters, commit, dispatch }, router) {
            if (!rootGetters["tag/selectedTags"]) { return; }

            let dirtyTypes = rootGetters["tag/categories"].filter(x => { return rootGetters["tag/selectedTags"].some(y => (x == y.type)) });
            console.log("stone.submit() dirtyTypes: " + JSON.stringify(dirtyTypes, null, 2));
            let tagQueryParams = dirtyTypes.map(x => { return { type: x, tags: (rootGetters["tag/selectedTags"].filter(y => (x == y.type)).map(y => { return { id: y.id, name: y.name } })) } });
            console.log("stone.submit() query params: " + JSON.stringify(tagQueryParams, null, 2));
            dispatch("mgr/queryCollection", { queryParams: tagQueryParams, router: router }, { root: true })
        },

        submitQuery2({ state, getters, rootGetters, commit, dispatch }, router) {
            let filters = rootGetters["tag/filters"];

            let selectedFilterTypes = [...new Set(filters.map(item => item.type))];
            let tagQueryParams = selectedFilterTypes
                .map(x => {
                    return {
                        type: x, 
                        tags: (filters
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } }))
                    }
                });

            console.log("stone.submit() query params: " + JSON.stringify(tagQueryParams, null, 2));
            dispatch("mgr/queryCollection", { queryParams: tagQueryParams, router: router }, { root: true })
        },

    }
}