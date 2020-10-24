export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            name: null,
            description: null,
            notes: null,
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
        name(state, payload) {
            state.newItem.name = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        notes(state, payload) {
            state.newItem.notes = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log("prepare Area");
            let item = rootGetters["mgr/item"];
            commit("id", item.id);
            commit("name", item.name);
            commit("description", item.description);
            commit("notes", item.notes);
        },
    }
}