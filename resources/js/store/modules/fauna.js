export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            material_id: 1,
            base_type_id: 1,
            description: null,
            measurements: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
        },
        material_id(state, payload) {
            state.newItem.material_id = payload;
        },        
        base_type_id(state, payload) {
            state.newItem.base_type_id = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        measurements(state, payload) {
            state.newItem.measurements = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let current = rootGetters["mgr/item"];
            commit("id", toCopy ? current.id : null);
            commit("material_id", toCopy ? current.material_id : 1);
            commit("base_type_id", toCopy ? current.base_type_id : 1);
            commit("description", toCopy ? current.description : null);
            commit("measurements", toCopy ? current.measurements : null);
        },

    }
}