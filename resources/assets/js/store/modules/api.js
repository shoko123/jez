export default {
    namespaced: true,
    state: {
        jwt_token: null,
    },

    getters: {
    },

    actions: {
        xhr({ commit }, payload) {
            console.log('xhr payload ' + JSON.stringify(payload, null, 2));
            return;

            commit("isLoading", {
                value: true,
                message: payload.messages.loadingMessage,
            }, { root: true });

            switch (payload.action) {
                case 'get':
                    return axios.get(`${payload.endpoint}`)
                        .then((res) => {
                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showSuccessSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.successMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            return res;
                        })
                        .catch(err => {

                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.errorMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            console.log('Failed to load groundstones. err: ' + err);
                            return err;
                        })
                    break;

                case 'put':
                    return axios.get(`${payload.endpoint}, payload.data`)
                        .then((res) => {
                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showSuccessSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.successMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            return res;
                        })
                        .catch(err => {
                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.errorMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            console.log('Failed to load groundstones. err: ' + err);
                            return err;
                        })
                    break;



                case 'delete':
                    axios.delete(`${payload.endpoint}`)
                        .then((res) => {
                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showSuccessSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.successMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            return res;
                        })
                        .catch(err => {
                            commit("isLoading", {
                                value: false,
                                message: '',
                            }, { root: true });

                            if (payload.params.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.errorMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            console.log('Failed to load groundstones. err: ' + err);
                            return err;
                        })
                    break;
            };
        },
    }
}