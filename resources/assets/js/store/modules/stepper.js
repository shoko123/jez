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
            let name = rootGetters['mg/moduleItemName'];
            let action;
            let tag = ' (' + rootGetters['fn/newItemTag'] + ')';
            if(rootGetters['mg/isCreate']) {
                action = "Create new ";
                //tag = rootGetters['fn/newItemTag'];
            } else {
                action = "Update ";
                //tag =  rootGetters['fn/newItemTag'];
            }
             return action + name + (rootGetters['mg/isUpdate'] || state.step > 1 ? tag : '');
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
