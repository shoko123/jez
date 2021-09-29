export default {
    namespaced: true,
    state: {
        user: null,
        permissions: [],
        roles: [],
    },
    getters: {
        isLoggedIn(state) {
            return state.user ? true : false;
        },
        userName(state) {
            return state.user ? state.user.name : "";
        },

        can: (state) => (permissionName) => {
            return state.permissions.includes(permissionName);
        },

        role: (state) => (roleName) => {
            return state.roles.includes(roleName);
        },

    },
    mutations: {
        loginSuccess(state, payload) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = Object.assign({}, payload.user, { token: payload.access_token });

            state.permissions = payload.permissions;
            state.roles = payload.roles;
            //console.log("login successful for user: " + state.user.name);
            //console.log("permissions : " + JSON.stringify(state.permissions, null, 2));
        },

        clear(state) {
            state.user = null;
            state.permissions = []; 
            state.roles = [];
        },
    },

    actions: {
        login({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: "/api/auth/login",
                action: "post",
                data: payload,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "logging in...", onSuccess: "Successfully logged in", onFailure: "" }
            };

            return dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => {
                    if (res.data.user !== null) {
                        commit('loginSuccess', res.data);
                        /*
                        commit('snackbar/displaySnackbar', {
                            isSuccess: true,
                            message: `Login successful as "${res.data.user.name}"`,
                        }, { root: true });
                        */
                        return res.data.user;
                    } else {
                        console.log("aut.login failed - wrong credentials");
                        commit('snackbar/displaySnackbar', {
                            isSuccess: false,
                            message: "Wrong Credentials! Please try again"
                        }, { root: true });
                        commit('clear');
                        return null;
                    }
                })
                .catch(err => {
                    console.log("aut.login failed. err: " + err);
                    commit('clear');
                });
        },

        logout({ state, getters, commit, dispatch, rootGetters }) {
            let xhrRequest = {
                endpoint: "/api/auth/logout",
                action: "post",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "logging out...", onSuccess: "Successfully logged out", onFailure: "" }
            };

            dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => { console.log("logout successful"); })
                .catch(err => { console.log("logout failure"); })
                .finally(() => {
                    commit("clear");
                    dispatch('mgr/goToRoute', "home", { root: true });
                });
        },
    }
}
