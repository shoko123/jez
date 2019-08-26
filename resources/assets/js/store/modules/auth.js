export default {
    namespaced: true,
    state: {
        user: null,
        jwtToken: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.user;
        },
    },
    mutations: {
        loginSuccess(state, payload) {
            console.log("login success setting user to : " + JSON.stringify(payload.user, null, 2));
            console.log("setting token to : " + JSON.stringify(payload.access_token));
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = payload.user;
        },
        loginFailure(state, payload) {
            state.user = null;
            //commit("isLoading", {value: false}, { root: true });
        },
        logout(state) {
            state.user = null;
        },
    },

    actions: {
        jezLogin({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = { flags: {}, messages: {} };
            xhrRequest.endpoint = "/api/auth/login";
            xhrRequest.action = "post";

            xhrRequest.data = payload;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = false;
            xhrRequest.flags.successLogToConsole = true;
            xhrRequest.flags.failureLogToConsole = true;

            xhrRequest.messages.whileLoading = "logging in...";

            return dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => {
                    console.log("login success res.data: " + JSON.stringify(res.data, null, 2));
                    commit('loginSuccess', res.data);
                    //state.user = res.user;
                    //axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`
                    return res;
                })
                .catch(err => {
                    state.user = null;
                    //console.log('login failure. err: ' + err);
                    return err;
                });
        },
    }
}
