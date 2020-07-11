export default {
    namespaced: true,

    state: {
        loadingSpinner: {
            value: false,
        },
        xhrRequest: {},
    },

    getters: {
        loadingSpinner(state) {
            return state.loadingSpinner;
        },
    },

    mutations: {
        xhrReceived(state, payload) {
            state.xhrRequest = payload;
            if (state.xhrRequest.verbose) {
                console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \ndata: ${JSON.stringify(state.xhrRequest.data, null, 2)}`);
            }
            if (state.xhrRequest.spinner) {
                state.loadingSpinner.message = state.xhrRequest.messages.loading;
                state.loadingSpinner.value = true;
            }
        },

        xhrSuccess(state, payload) {
            if (state.xhrRequest.verbose) {
                console.log("xhr.success res.data: " + JSON.stringify(payload.data));
            }
            state.loadingSpinner.value = false;
        },

        xhrFailure(state, payload) {
            if (state.xhrRequest.verbose) {
                console.log("xhr.failure err: " + JSON.stringify(payload));
            }
            state.loadingSpinner.value = false;
        },
    },
    actions: {
        xhr({ state, commit, getters, rootGetters, dispatch }, payload) {
            if (!rootGetters["aut/isLoggedIn"]) {
                //Vue.router.push({ path: "/login" });
            }
            commit('xhrReceived', payload)

            switch (payload.action) {
                case 'get':
                    return axios.get(`${payload.endpoint}`)
                        .then(res => { commit('xhrSuccess', res); dispatch('snackbar', true); return res; })
                        .catch(err => { commit('xhrFailure', err); dispatch('snackbar', false); throw err; });
                    break;

                case 'post':
                    return axios.post(`${payload.endpoint}`, payload.data)
                        .then(res => { commit('xhrSuccess', res); dispatch('snackbar', true); return res; })
                        .catch(err => { commit('xhrFailure', err); dispatch('snackbar', false); throw err; });
                    break;

                case 'put':
                    return axios.put(`${payload.endpoint}`, payload.data)
                        .then(res => { commit('xhrSuccess', res); dispatch('snackbar', true); return res; })
                        .catch(err => { commit('xhrFailure', err); dispatch('snackbar', false); throw err; });
                    break;


                case 'delete':
                    return axios.delete(`${payload.endpoint}`, { "data": payload.data })
                        .then(res => { commit('xhrSuccess', res); dispatch('snackbar', true); return res; })
                        .catch(err => { commit('xhrFailure', err); dispatch('snackbar', false); throw err; });
                    break;
            };
        },

        snackbar({ state, commit }, isSuccess) {
            if (isSuccess && state.xhrRequest.snackbar.onSuccess || !isSuccess && state.xhrRequest.snackbar.onFailure) {
                commit('snackbar/displaySnackbar', {
                    isSuccess: isSuccess,
                    message: (isSuccess ? state.xhrRequest.messages.onSuccess : state.xhrRequest.messages.onFailure),
                }, { root: true });
            }
        }
    }
}