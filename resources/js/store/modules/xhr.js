export default {

    namespaced: true,
    
    state: {
        loadingSpinner: {
            value: false,
            message: "Loading...",
        },

        snackbar: {
            value: false,
            message: "",
            timeout: 4000,
            color: "green",
            mode: "",
        },
        xhrRequest: {},
    },

    getters: {
        loadingSpinner(state) {
            return state.loadingSpinner;
        },
        snackbar(state) {
            return state.snackbar;
        },
    },
    mutations: {
        xhrReceived(state, payload) {

            state.xhrRequest = payload;
            if (state.xhrRequest.verbose) {
                console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \ndata: ${JSON.stringify(state.xhrRequest.data, null, 2)}`);
                //console.log(`xhr request: ${JSON.stringify(state.xhrRequest, null, 2)}`);
            }

            //if (state.xhrRequest.data.file) {
            //    console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \nFormData request: `);
            //} else {
            //    console.log(`xhr request: (${state.xhrRequest.action}) ${state.xhrRequest.endpoint} \ndata: ${JSON.stringify(state.xhrRequest.data, null, 2)}`);
            //}


            state.loadingSpinner.message = state.xhrRequest.messages.loading;
            state.loadingSpinner.value = true;
        },
        xhrSuccess(state, payload) {
            if (state.xhrRequest.verbose) {
                console.log("xhr.success res.data: " + JSON.stringify(payload.data));
            }
            state.loadingSpinner.value = false;

            if (state.xhrRequest.snackbar.onSuccess) {
                state.snackbar.color = 'green';
                state.snackbar.message = state.xhrRequest.messages.onSuccess;
                state.snackbar.value = true;
            }
        },

        xhrFailure(state, payload) {
            if (state.xhrRequest.verbose) {
                console.log("xhr.failure err: " + JSON.stringify(payload));
            }
            state.loadingSpinner.value = false;
            if (state.xhrRequest.snackbar.onFailure) {
                state.snackbar.color = 'red';
                state.snackbar.message = state.xhrRequest.messages.onFailure;
                state.snackbar.value = true;
            }
        },
    },
    actions: {
        xhr({ state, commit, getters, rootGetters }, payload) {
           if(!rootGetters["aut/isLoggedIn"]) {
            //Vue.router.push({ path: "/login" });
           }
           

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
                    return axios.delete(`${payload.endpoint}`, { "data": payload.data })
                        .then(res => { commit('xhrSuccess', res); return res; })
                        .catch(err => { commit('xhrFailure', err); throw err; });
                    break;
            };
        },
    }
}