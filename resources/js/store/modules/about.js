export default {
    namespaced: true,
    getters: {
        menu(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/module"] !== "About") { return null };
            let c = rootGetters["mgr/collections"]("main").collection;
            return [
                { name: "The Dig", icon: "mdi-pickaxe", data: c.filter(x => x.tab === 1).map(x => { return { dot: x.dot, id: x.id, title: x.title } }) },
                { name: "The Database", icon: "mdi-web", data: c.filter(x => x.tab === 2).map(x => { return { dot: x.dot, id: x.id, title: x.title } }) },
            ];
        }
    },
}