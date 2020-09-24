export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            base_type_id: 1,
            periods: null,
            description: null,
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
        base_type_id(state, payload) {
            state.newItem.base_type_id = payload;
        },
        periods(state, payload) {
            state.newItem.periods = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let current = rootGetters["mgr/item"];
            commit("id", toCopy ? current.id : null);
            commit("base_type_id", toCopy ? current.base_type_id : 1);
            commit("description", toCopy ? current.description : null); 
            commit("periods", toCopy ? current.periods : null);
        },
    }
}