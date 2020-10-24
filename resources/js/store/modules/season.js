export default {
    namespaced: true,

    state: {
        newItem: {
            id: null,
            season: null,
            description: null,
            staff: null,
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
        season(state, payload) {
            state.newItem.season = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        staff(state, payload) {
            state.newItem.staff = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log("prepare Season");
            let item = rootGetters["mgr/item"];
            commit("id", item.id);
            commit("season", item.season);
            commit("description", item.description);
            commit("staff", item.staff);
        },
    }
}