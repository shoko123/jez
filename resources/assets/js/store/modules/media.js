export default {
    namespaced: true,
    state: {
      areasSeasons: [],
    },

    getters: {
        
    },

    mutations: {
      
    },

    actions: {
        collection({ state, commit, dispatch }, payload) {
          return [1,2];
        },
        item({ commit, dispatch }, payload) {
           return 4;
        },
    }
}