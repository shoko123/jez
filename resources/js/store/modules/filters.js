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
           return rootGetters["tag/typesWithTagsShowInFilters"];
        },
    },

    mutations: {
 
    },
       
    actions: {
        xxx({ state, getters, rootGetters, commit }, payload) {           
        },
    },


}