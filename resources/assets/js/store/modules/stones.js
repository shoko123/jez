export default {
    namespaced: true,
    state: {
        staticData: {          
            displayOptions: ["data", "gallery", "all"],
            registrationCategories: ["AR", "GS"],
        },
     
        newItem: {
            data: {
                id: null,
                find_id: null,
                stone_type_id: null,
                material_id: null,
                weight: null,
                notes: null,
                measurements: null,
            },
            dataExtra: {
                materials: null,
                stone_types: null,
            },
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        materials(state) {
            return state.newItem.dataExtra.materials;
        },

        stoneTypes(state) {
            return state.newItem.dataExtra.stone_types;
        },

        /////New Stone
        stone_type_id(state) {
            return state.newItem.data.stone_type_id;
        },
        material_id(state) {
            return state.newItem.data.material_id;
        },

        weight(state) {
            return state.newItem.data.weight;
        },
        notes(state) {
            return state.newItem.data.notes;
        },
        measurements(state) {
            return state.newItem.data.measurements;
        },

        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        materials(state, payload) {
            state.newItem.dataExtra.materials = payload;

        },
        stoneTypes(state, payload) {
            state.newItem.dataExtra.stone_types = payload;
        },
        stone_type_id(state, payload) {
            state.newItem.data.stone_type_id = payload;
        },
        material_id(state, payload) {
            state.newItem.data.material_id = payload;
        },
        weight(state, payload) {
            state.newItem.data.weight = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        measurements(state, payload) {
            state.newItem.data.measurements = payload;
        },
        newItemData(state, payload) {
            state.newItem.data = payload;
        },
        deleteFromStore(state, payload) {
            console.log('gss.deleteFromStore id: ' + payload);
            state.stone = null;
            let index = state.stones.findIndex(st => st.id == payload);
            if (index === -1) {
                console.log('store - stone delete - couldn\'t find stone with id: ' + payload);
                return;
            }
            state.stones.splice(index, 1);
            //state.stones.splice(state.stones.findIndex(gs => gs.id === payload), 1);
        },


        stoneAdd(state, payload) {
            //console.log('store.stone.add Adding to gs array: ' + JSON.stringify(payload));
            if (state.stones) {
                state.stones.push(payload);
            }
        },

        prepare(state, newStone) {
            if (newStone) {
                state.newItem.data.id = null;
                state.newItem.data.find_id = null;
                state.newItem.data.stone_type_id = null;
                state.newItem.data.material_id = null;
                state.newItem.data.weight = null;
                state.newItem.data.notes = null;
                state.newItem.data.measurements = null;

            } else {
                state.newItem.data.id = state.stone.id;
                state.newItem.data.find_id = state.stone.find_id;
                state.newItem.data.stone_type_id = state.stone.stone_type_id;
                state.newItem.data.material_id = state.stone.material_id;
                state.newItem.data.weight = state.stone.weight;
                state.newItem.data.notes = state.stone.notes;
                state.newItem.data.measurements = state.stone.measurements;
            }
        },
        clear(state) {
            console.log("stone.clear");
            state.stones = null;
            state.stone = null;
            //state.newItem = null;           
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            
            let data = Object.assign({}, rootGetters["mgr/item"]);
            //delete data.tag;
            //delete data.area;

            commit("prepare", {
                isCreate: rootGetters["mgr/status"].isCreate,
                data: data,
                tag: rootGetters["mgr/item"].tag,
            });
            commit('fnd/prepare', rootGetters["mgr/status"].isCreate, { root: true });      
        },

        /*
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            dispatch("materials");
            dispatch("stoneTypes");

            commit("prepare", rootGetters["mgr/status"].isCreate);
            commit('fnd/prepareNewFind', rootGetters["mgr/status"].isCreate, { root: true });
        },
        */
        //delete stone by id - must be accompanied by deleting corresponding find record.


        materials({ commit, dispatch }) {
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
                }).catch((err) => {
                    //console.log(err)
                })
        },

        stoneTypes({ commit, dispatch }) {
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
                }).catch((err) => {
                    //console.log(err)
                })
        },
    }
}