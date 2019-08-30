export default {

    namespaced: true,

    state: {
        loadingSpinner: {
            value: false,
            message: "Loading...",
            progressColor: "purple",
        },

        snackbar: {
            value: false,
            message: "",
            timeout: 4000,
            color: "green",
            mode: "",
        },

        xhrRequest: {
            endpoint: null,
            action: null,
            data: null,

            flags: {
                successShowSnackBar: null,
                failureShowSnackBar: true,
                verbose: null,

            },
            messages: {
                whileLoading: null,
                onSuccessSnackbar: null,
                onFailureSnackbar: null,
            }
        },
    },

    getters: {
        loadingSpinner(state) {
            return state.loadingSpinner;
        },
        snackbar(state) {
            return state.snackbar;
        }
    },
    mutations: {
        xhrReceived(state, payload) {
            state.xhrRequest = payload;
            if (state.xhrRequest.flags.verbose) {
                console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \ndata: ${JSON.stringify(state.xhrRequest.data, null, 2)}`);
            }

            state.loadingSpinner.message = state.xhrRequest.messages.whileLoading;
            state.loadingSpinner.value = true;
        },
        xhrSuccess(state, payload) {
            if (state.xhrRequest.flags.verbose) {
                console.log("xhr.success res.data: " + JSON.stringify(payload.data));
            }
            state.loadingSpinner.value = false;

            if (state.xhrRequest.flags.successShowSnackBar) {
                state.snackbar.color = 'green';
                state.snackbar.message = state.xhrRequest.messages.onSuccessSnackbar;
                state.snackbar.value = true;
            }
        },

        xhrFailure(state, payload) {
            if (state.xhrRequest.flags.verbose) {
                console.log("xhr.failure err: " + JSON.stringify(payload));
            }
            state.loadingSpinner.value = false;
            if (state.xhrRequest.flags.failreShowSnackBar) {
                state.snackbar.color = 'red';
                state.snackbar.message = state.xhrRequest.messages.onFailureSnackbar;
                state.snackbar.value = true;
            }
        },



        startSpinner(state, payload) {
            state.loadingSpinner.message = state.xhrRequest.messages.whileLoading;
            state.loadingSpinner.value = payload;
        },

    },
    actions: {
        xhr({ state, commit }, payload) {

            commit('xhrReceived', payload)


            switch (payload.action) {
                case 'get':
                    return axios.get(`${payload.endpoint}`)
                        .then(res => { commit('xhrSuccess', res); return res; })
                        .catch(err => { commit('xhrFailure', err); throw err; });
                    break;

                case 'post':
                    return axios.post(`${payload.endpoint}`, payload.data)
                        .then(res => { commit('xhrSuccess', res); return res; })
                        .catch(err => { commit('xhrFailure', err); throw err; });
                    break;

                case 'put':
                    return axios.put(`${payload.endpoint}`, payload.data)
                        .then(res => { commit('xhrSuccess', res); return res; })
                        .catch(err => { commit('xhrFailure', err); throw err; });
                    break;


                case 'delete':
                    return axios.delete(`${payload.endpoint}`)
                        .then(res => { commit('xhrSuccess', res); return res; })
                        .catch(err => { commit('xhrFailure', err); throw err; });
                    break;
            };
        },
    }
}