export default {
   namespaced: false,
    state: {
        router: null,
    },
    getters: {
        getRouter(state) {
            return state.router;
        },
    },
    mutations: {
        setRouter(state, payload) {
            console.log(`mgr/setRouter() payload: `);//${JSON.stringify(payload, null, 2)}
            state.router = payload;
        },
    },
    actions: {
        goToRoute({ state }, route) {
            state.router.push({ path: `${route}` });
        },
    }

};
