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

        itemName(state, getters, rootState, rootGetters) {
            return rootGetters['mg/moduleItemName'];
        },
        header(state, getters, rootState, rootGetters) {
            let action = rootGetters['mg/isCreate'] ? "Create new " : "Update ";
            let name = rootGetters['mg/moduleItemName'];
            //return rootGetters['mg/isCreate'] ? "Create new" : "Update";
            return action + name;
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
