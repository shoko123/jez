export default {
    namespaced: true,

    state: {
        spinner: {
            isOn: false,
            message: "",
        },
        //non-reactive, internal use
        xhrRequest: null,
    },

    getters: {
        spinner(state) {
            return state.spinner;
        },
    },

    mutations: {
        spinner(state, payload){
            state.spinner = payload;
        },
        xhrRequest(state, payload) {
            state.xhrRequest = payload;
        },
    },
    actions: {
        xhr({ state, commit, getters, rootGetters, dispatch }, payload) {
            if (!rootGetters["aut/isLoggedIn"]) {
                //should never reach this point, what the... just send to server.
            }
            commit('xhrRequest', payload);
            if (state.xhrRequest.verbose) {
                console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \ndata: ${JSON.stringify(state.xhrRequest.data, null, 2)}`);
            }
            if (state.xhrRequest.spinner) {
                commit("spinner", {isOn: true, message: state.xhrRequest.messages.loading});
            }


            return axios({
                url: payload.endpoint,
                method: payload.action,
                data: payload.data,
            }).then(res => { dispatch('success', res); return res; }
            ).catch(err => { dispatch('failure', err); throw err; });
        },

        success({ state, commit }, res) {
            commit("spinner", {isOn: false, message: ""});
            if (state.xhrRequest.snackbar.onSuccess) {
                commit('snackbar/displaySnackbar', {
                    isSuccess: true,
                    message: state.xhrRequest.messages.onSuccess,
                }, { root: true });
            }
            if (state.xhrRequest.verbose) {
                console.log(`xhr(success) res.data: ${JSON.stringify(res.data, null, 2)}`);
            }
        },

        failure({ state, commit, dispatch }, err) {
            commit("spinner", {isOn: false, message: ""});
            
            //check for authorization issues (expired tokens,...)
            if (err.response.status === 401) {
                commit('snackbar/displaySnackbar', {
                    isSuccess: false,
                    message: "Authorization Issues - Please login",
                }, { root: true });
                console.log(`xhr(401 error): ${JSON.stringify(err, null, 2)}`);
                commit('aut/clear', null, { root: true });
                dispatch('goToRoute', `/login`, { root: true });
                return;
            }
            if (state.xhrRequest.snackbar.onFailure) {
                commit('snackbar/displaySnackbar', {
                    isSuccess: false,
                    message: state.xhrRequest.messages.onFailure,
                }, { root: true });
            }
            console.log(`xhr(failure) error: ${JSON.stringify(err, null, 2)}`);
        },

        /*
        snackbar({ state, commit }, payload) {
            commit('snackbar/displaySnackbar', payload, { root: true });
        }
        */
    }
}