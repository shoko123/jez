export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            name: null,
            description: null,
            notes: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        copyCurrentToNew(state, payload) {
            state.newItem = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        notes(state, payload) {
            state.newItem.notes = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("copyCurrentToNew", rootGetters["mgr/item"]);
            console.log("prepare Area newItem: " + JSON.stringify(state.newItem, null, 2));
        },
    }
}