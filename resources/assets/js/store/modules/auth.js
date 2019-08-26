export default {
    state: {
        user: null,
        jwtToken: null,
    },
    getters: {
        jwtToken(state) {
            return state.find;
        },
    },
    mutations: {
        jwtToken(state, payload) {
            state.jwtToken = payload;
        },
        user(state, payload) {
            state.user = payload;
        },
    },
    
    actions: {
        
    }
}
