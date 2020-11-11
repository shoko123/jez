export default {
    namespaced: true,
    getters: {
        menu(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/module"] !== "About") { return null };
            return {
                db: rootGetters["mgr/collection"].filter(x => x.tab === 0).map(x => { return { id: x.id, title: x.title } }),
                dig: rootGetters["mgr/collection"].filter(x => x.tab === 1).map(x => { return { id: x.id, title: x.title } }),
            };
        },
    },
}