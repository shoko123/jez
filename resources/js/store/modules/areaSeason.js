export default {
    namespaced: true,

    state: {
        loci: [],
        newItem: {
            id: null,
            description: null,
            staff: null,
        },
    },

    getters: {
        newItem(state) {
            return state.newItem;
        },
        loci(state) {
            return state.loci;

        }
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        staff(state, payload) {
            state.newItem.staff = payload;
        },
        loci(state, payload) {
            state.loci = payload;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log("prepare AreaSeason");
            let item = rootGetters["mgr/item"];
            commit("id", item.id);
            commit("description", item.description);
            commit("staff", item.staff);
        },
    }
}