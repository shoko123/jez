export default {
    namespaced: true,
    state: {
        categories: [],
    },

    getters: {
        filters(state, getters, rootState, rootGetters) {
            //currently only tag filters
            return rootGetters["tag/tags"];
        },

        filtersByType(state, getters, rootState, rootGetters) {
           //currently only tag filters
           return rootGetters["tag/tagsByType"].map(x => x.filters);
        },
    },

    mutations: {
        setFilterCategories(state, payload) {
            state.categories = payload;
        },
    },
       
    actions: {
        prepareFilter({ commit }, payload) {
            console.log("tag/prepareFilter()");

            commit("allTags", payload);
            //commit("clearFilterSelections");
            //commit("clearNewTagSelections");
        },

        toggleTag({ state, getters, rootGetters, commit }, tag) {
           
        },
        prepare({ getters, rootGetters, commit }, payload) {
           
        },
    },


}