export default {
    namespaced: true,

    state: {
        areasSeasons: [],
        loci: [],
        areasSeasonsMeta: {
            displayOptionIndex: 0,
            displayOptions: ["Media", "Chips", "Table"],
            page: 1,
        },
        lociMeta: {
            displayOptionIndex: 0,
            displayOptions: ["Media", "Chips", "Table"],
            page: 1,
        },
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
        //if module is Area or Season it will hold related areasSeasons
        areasSeasons(state) {
            return state.areasSeasons;
        },
        
        areasSeasonsMeta(state) {
            return state.areasSeasonsMeta;
        },
        //if module is AreaSeason it will hold related loci
        loci(state) {
            return state.loci;
        },
        lociMeta(state) {
            return state.lociMeta;
        },
        
    },

    mutations: {
        areasSeasons(state, payload) {
            state.areasSeasons = payload;
        },
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