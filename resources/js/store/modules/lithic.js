export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            no_of_items: null,
            lithic_type_id: null,
            description: null,
            width: null,
            length: null,
            thickness: null,
            weight: null,
            burnt: null,
            rolled: null,
            hinge: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
        },
        no_of_items(state, payload) {
            state.newItem.no_of_items = payload;
        },
        lithic_type_id(state, payload) {
            state.newItem.lithic_type_id = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        width(state, payload) {
            state.newItem.width = payload;
        },
        length(state, payload) {
            state.newItem.length = payload;
        },
        thickness(state, payload) {
            state.newItem.thickness = payload;
        },
        weight(state, payload) {
            state.newItem.weight = payload;
        },
        burnt(state, payload) {
            state.newItem.burnt = payload;
        },
        rolled(state, payload) {
            state.newItem.rolled = payload;
        },
        hinge(state, payload) {
            state.newItem.hinge = payload;
        },

        clear(state) {
            console.log("stone.clear");
            state.newItem = null;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let current = rootGetters["mgr/item"];
            commit("id", toCopy ? current.id : null);
            commit("no_of_items", toCopy ? current.no_of_items : null);
            commit("lithic_type_id", toCopy ? current.lithic_type_id : null);
            commit("description", toCopy ? current.description : null);
            commit("length", toCopy ? current.length : null);
            commit("width", toCopy ? current.width : null);
            commit("thickness", toCopy ? current.thickness : null);
            commit("weight", toCopy ? current.weight : null);
        },
    }
}