export default {
    namespaced: true,

    state: {
        loci: [],
        newItem: {
            id: null,
            description: null,
            summary: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
        loci(state) {
            return state.loci;
        }
    },

    mutations: {
        copyCurrentToNew(state, payload) {
            state.newItem = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        summary(state, payload) {
            state.newItem.summary = payload;
        },

        loci(state, payload) {
            state.loci = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("copyCurrentToNew", rootGetters["mgr/item"]);
            console.log("prepare AreaSeason newItem: " + JSON.stringify(state.newItem, null, 2));
        },
    }
}