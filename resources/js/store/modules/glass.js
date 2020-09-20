export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            description: null,
            rim_diameter: null,
            base_diameter: null,
            bangle_diameter: null,
            bead_diameter: null,
            pontil_diameter: null,
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
        description(state, payload) {
            state.newItem.description = payload;
        },
        base_type_id(state, payload) {
            state.newItem.base_type_id = payload;
        },

        rim_diameter(state, payload) {
            state.newItem.rim_diameter = payload;
        },

        base_diameter(state, payload) {
            state.newItem.base_diameter = payload;
        },
        bangle_diameter(state, payload) {
            state.newItem.bangle_diameter = payload;
        },
        bead_diameter(state, payload) {
            state.newItem.bead_diameter = payload;
        },
        pontil_diameter(state, payload) {
            state.newItem.pontil_diameter = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let current = rootGetters["mgr/item"];
            commit("id", toCopy ? current.id : null);
            commit("base_type_id", toCopy ? current.base_type_id : 1);
            commit("description", toCopy ? current.description : null);
            commit("rim_diameter", toCopy ? current.rim_diameter : null);
            commit("base_diameter", toCopy ? current.base_diameter : null);
            commit("bangle_diameter", toCopy ? current.bangle_diameter : null);
            commit("bead_diameter", toCopy ? current.bead_diameter : null);
            commit("pontil_diameter", toCopy ? current.pontil_diameter : null);
        },
    }
}