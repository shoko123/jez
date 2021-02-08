export default {
    namespaced: true,
    getters: {
        menu(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/module"] !== "About") { return null };
            return [
                { name: "The Dig", icon: "mdi-pickaxe", data: rootGetters["mgr/collection"].filter(x => x.tab === 1).map(x => { return { id: x.id, title: x.title } }) },
                { name: "The Database", icon: "mdi-web", data: rootGetters["mgr/collection"].filter(x => x.tab === 2).map(x => { return { id: x.id, title: x.title } }) },
            ];
        }
    },
}