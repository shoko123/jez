export default {
    namespaced: true,
    state: {
        jwt_token: null,
    },

    getters: {
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
                                    message: payload.messages.onSuccesSnackbar,
                                    timeout: 4000,
                                    color: "green"
                                });
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
                                });
                            }
                            if (payload.flags.errorLogToConsole) {
                                console.log('xhr.get failed err: ' + err);
                            }
                            return err;
                        })
                    break;

                case 'post':
                    return axios.post(`${payload.endpoint}, payload.data`)
                        .then((res) => {
                            stopSpinner();

                            if (payload.flags.showSuccessSnackbar) {
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
                            stopSpinner();
                            if (payload.flags.showErrorSnackbar) {
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
                        return axios.put(`${payload.endpoint}, payload.data`)
                            .then((res) => {
                                stopSpinner();
    
                                if (payload.flags.showSuccessSnackbar) {
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
                                stopSpinner();
                                if (payload.flags.showErrorSnackbar) {
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
                    return axios.delete(`${payload.endpoint}`)
                        .then((res) => {
                            //console.log('xhr after delete res: ' + JSON.stringify(res, null, 2));
                            stopSpinner();

                            if (payload.flags.showSuccessSnackbar) {
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
                            stopSpinner();

                            if (payload.flags.showErrorSnackbar) {
                                commit("snackbar", {
                                    value: true,
                                    message: payload.messages.errorMessage,
                                    timeout: 4000,
                                    color: "green"
                                });
                            }
                            console.log('Failed to delete. err: ' + err);
                            return err;
                        })
                    break;
            };
        },
    }
}