export default {
    namespaced: true,
    state: {
        step: 1,
        header: '',
        stepArray: [],
    },
    getters: {
        stepArray(state) {
            return state.stepArray;
        },

        step(state) {
            return state.step;
        },
        
        header(state, getters, rootState, rootGetters) {
            return rootGetters['mg/isCreate'] ? "Create new" : "Update";
        },
    },
    mutations: {
        stepArray(state, payload) {
            state.stepArray = payload;
        },

        step(state, payload) {
            state.step = payload;
        },
    },

    actions: {

    }
}
