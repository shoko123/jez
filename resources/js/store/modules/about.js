export default {
    namespaced: true,

    state: {
        item: null,
    },

    getters: {
        menu(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/module"] !== "About") { return null };
            return {
                db: rootGetters["mgr/collection"].filter(x => x.category_index === 0).map(x => { return { id: x.id, title: x.title } }),
                dig: rootGetters["mgr/collection"].filter(x => x.category_index === 1).map(x => { return { id: x.id, title: x.title } }),
            };
        },

        item(state) {
            //if(rootGetters["mgr/status"] !== "About") {return []};
        }
    },

    mutations: {
        item(state, payload) {
            state.item = payload;
        },
    },

    actions: {

    }
}