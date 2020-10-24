export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            season: null,
            description: null,
            staff: null,
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
        staff(state, payload) {
            state.newItem.staff = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("copyCurrentToNew", rootGetters["mgr/item"]);
            console.log("prepare Season newItem: " + JSON.stringify(state.newItem, null, 2));
        },
    }
}