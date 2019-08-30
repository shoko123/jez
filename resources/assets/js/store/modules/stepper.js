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
            return rootGetters["mgr/moduleItemName"];
        },
        header(state, getters, rootState, rootGetters) {
            let name = rootGetters["mgr/moduleItemName"];
            let action;
            let tag = ' (' + rootGetters["fnd/newItemTag"] + ')';
            if(rootGetters["mgr/isCreate"]) {
                action = "Create new ";
                //tag = rootGetters["fnd/newItemTag"];
            } else {
                action = "Update ";
                //tag =  rootGetters["fnd/newItemTag"];
            }
             return action + name + (rootGetters["mgr/isUpdate"] || state.step > 1 ? tag : '');
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
