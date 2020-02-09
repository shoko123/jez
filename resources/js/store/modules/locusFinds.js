import mediaCommon from "./media/mediaCommon";
export default {
    namespaced: true,
    state: {
        locusFinds: null,
    },

    getters: {
        locusFinds(state) {            
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
