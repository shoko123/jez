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
            let tag = '(' + getters.tag + ')';
            let action = (rootGetters["mgr/isCreate"]) ? "Create new" : "Update";
            console.log('stp.header name: ' + name + ' action: ' + action + ' tag: ' + tag);
             return `${action} ${name} ${(rootGetters["mgr/isUpdate"] || state.step > 1) ? tag : ""}`;
        },
        tag(state, getters, rootState, rootGetters) {
            if(rootGetters["mgr/isCreate"]) {
                return rootGetters["pkr/item"] ? rootGetters["pkr/item"].tag : "";
            } else {
                return rootGetters["mgr/item"] ? rootGetters["mgr/item"].tag : "";
            }
        }
        

    },
    mutations: {
        stepArray(state, payload) {
            state.stepArray = payload;
        },
        step(state, payload) {
            state.step = payload;
        },
    },
    actions: {}
}
