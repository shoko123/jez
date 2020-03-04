import mediaUtils from "./media/mediaUtils";

export default {
    namespaced: true,
    state: {
        locusFinds: null,
    },

    getters: {
        locusFinds(state, rootState, getters, rootGetters) {   
            return state.locusFinds ? mediaUtils.addSrc(state.locusFinds, rootGetters["med/storageUrl"]) : null;
        },
    },
       
    mutations: {
        locusFinds(state, payload) {
            state.locusFinds = payload;
        },
        clear(state) {           
            state.locusFinds = null;
        },
    },
};
