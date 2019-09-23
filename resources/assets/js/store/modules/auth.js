export default {
    namespaced: true,
    state: {
        loginMessage: null,
        user: null,
        jwtToken: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.user;
        },
        loginMessage(state) {
            return state.loginMessage;
        },
    },
    mutations: {
        loginSuccess(state, payload) {
            console.log("login success setting user to : " + JSON.stringify(payload.user, null, 2));
            console.log("setting token to : " + JSON.stringify(payload.access_token));
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = payload.user;
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
                verbose: true,
                snackbar: {onSuccess: false, onFailure: false, },
                messages: { loading:"logging in..." , onSuccess: "", onFailure: ""}
            };

            return dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => {
                    //console.log("auth.login success res: " + JSON.stringify(res, null, 2));
                    commit('loginSuccess', res.data);
                    //state.user = res.user;
                    return res;
                })
                .catch(err => {
                    state.user = null;
                    commit('loginFailure', err);
                    //console.log('auth.login failure. err: ' + err);
                    throw err;
                });
        },
    }
}
