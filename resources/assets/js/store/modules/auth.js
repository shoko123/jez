export default {
    namespaced: true,
    state: {
        loginMessage: null,
        user: null,
        token: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.user ? true : false;
        },
        loginMessage(state) {
            return state.loginMessage;
        },
    },
    mutations: {
        loginSuccess(state, payload) {
            console.log("login success setting user to : " + JSON.stringify(payload.user, null, 2));
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = payload.user;
            state.token = payload.access_token;
            state.loginMessage = null;
        },
        loginFailure(state, payload) {
            console.log("aut.loginFailure");
            state.user = null;
            state.loginMessage = "Wrong email or password";
        },

        logout(state) {
            //NEED delete from server
            state.user = null;
        },
        clear(state) {
            
        }
    },

    actions: {
        jezLogin({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: "/api/auth/login",
                action: "post",
                data: payload,
                spinner: true,
                verbose: true,
                snackbar: {onSuccess: false, onFailure: false, },
                messages: { loading:"logging in..." , onSuccess: "", onFailure: ""}
            };

            return dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => {
                    commit('loginSuccess', res.data);
                    return res;
                })
                .catch(err => {
                    state.user = null;
                    commit('loginFailure', err);
                    throw err;
                });
        },
    }
}
