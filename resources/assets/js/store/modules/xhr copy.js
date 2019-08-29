//import axios from 'axios';

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
            timeout: 2000,
            color: "green",
            mode: "",
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
        xhrSuccess(state, payload) {
            console.log("login success setting user to : " + JSON.stringify(payload.user, null, 2));
            console.log("setting token to : " + JSON.stringify(payload.access_token));
            //axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            //state.user = payload.user;
        },
        xhrFailure(state, payload) {
            //state.user = null;
            //commit("isLoading", {value: false}, { root: true });
        },
    },
    actions: {
        xhr({ commit }, payload) {

            function stopSpinner() {
                commit("isLoading", {
                    value: false,
                    message: '',
                }, { root: true });
            }

            console.log('xhr payload ' + JSON.stringify(payload, null, 2));
            //return;


            //start spinner
            commit("isLoading", {
                value: true,
                message: payload.messages.whileLoading,
            }, { root: true });

            switch (payload.action) {
                case 'get':
                    return axios.get(`${payload.endpoint}`)
                        .then((res) => {
                            stopSpinner();

                            if (payload.flags.successLogToConsole) {
                                console.log("xhr.success res.data: " + JSON.stringify(res.data, null, 2));
                            }

                            if (payload.flags.successShowSnackBar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onSuccessSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }

                            return res;
                        })
                        .catch(err => {

                            stopSpinner();

                            if (payload.flags.failureShowSnackBar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onFailureSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            if (payload.flags.errorLogToConsole) {
                                console.log('xhr.get failed err: ' + err);
                            }
                            return err;
                        })
                    break;

                case 'post':
                    return axios.post(`${payload.endpoint}`, payload.data)
                        .then((res) => {
                            console.log('xhr.post.then res: ' + JSON.stringify(res, null, 2));
                            stopSpinner();

                            if (payload.flags.successShowSnackBar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onSuccessSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            return res;
                        })
                        .catch(err => {
                            console.log('xhr.post.catch err: ' + JSON.stringify(err, null, 2));
                            stopSpinner();
                            if (payload.flags.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onFailureSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            throw err.response.data
                            //return err;
                        })
                    break;

                case 'put':
                    return axios.put(`${payload.endpoint}`, payload.data)
                        .then((res) => {
                            stopSpinner();

                            if (payload.flags.successShowSnackBar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onSuccessSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            return res;
                        })
                        .catch(err => {
                            stopSpinner();
                            if (payload.flags.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onFailureSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            console.log('xhr.put failed err: ' + err);
                            return err;
                        })
                    break;


                case 'delete':
                    return axios.delete(`${payload.endpoint}`)
                        .then((res) => {
                            //console.log('xhr after delete res: ' + JSON.stringify(res, null, 2));
                            stopSpinner();

                            if (payload.flags.successShowSnackBar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onSuccessSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            return res;
                        })
                        .catch(err => {
                            stopSpinner();

                            if (payload.flags.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.onFailureSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                }, { root: true });
                            }
                            console.log('xhr.delete failed err: ' + err);
                            return err;
                        })
                    break;
            };
        },
    }
}