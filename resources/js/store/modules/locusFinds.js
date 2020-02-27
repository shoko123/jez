import mediaUtils from "./media/mediaUtils";

export default {
    namespaced: true,
    state: {
        locusFinds: null,
    },

    getters: {
        locusFinds(state, rootState, getters, rootGetters) {   
            console.log("locusFinds storageUrl: "  + rootGetters["med/storageUrl"]);
            return state.locusFinds ? mediaUtils.addSrc(state.locusFinds, rootGetters["med/storageUrl"]) : null;
            return state.locusFinds;
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
