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

        tagsAvailable: null,
        tabs: null


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

        tagsReady(state) {
            return !!state.tagsAvailable;
        },

        tagsAvailable(state) {
            return state.tagsAvailable;
        },

        filterTabs(state) {
            return state.tabs;
        }


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


        prepareFilter(state, payload) {
            state.tagsAvailable = payload.tags;
            state.tabs = payload.tabs;
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

        prepareFilter({ commit }, payload) {
            //console.log("payload: " + JSON.stringify(payload, null, 2));
            //let tabs = [...new Set(payload.map(x => x.type))];
            
            let tabs = [...new Set(payload.map(x => x.type))].map(function (x, index) { return { text: x, index: index } });
            let tags = payload.map(x => ({...x, selected: false }));
            //console.log("tabs: " + JSON.stringify(tabs, null, 2));
            commit("prepareFilter", { tabs: tabs, tags: tags });

        }
    }
}