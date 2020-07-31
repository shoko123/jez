export default {
    namespaced: true,
    state: {
        user: null,
        permissions: [],
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
    },
    mutations: {
        loginSuccess(state, payload) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = Object.assign({}, payload.user, { token: payload.access_token });

            state.permissions = [];
            //state.permissions = payload.permissions;
            
            payload.permissions.forEach(x => {
                state.permissions.push(x.charAt(0).toUpperCase() + x.slice(1));
            });
            

            //localStorage.setItem('user', JSON.stringify(payload.user));
            console.log("login success setting user to : " + JSON.stringify(state.user, null, 2));
            console.log("permissions : " + JSON.stringify(state.permissions, null, 2));
        },

        /*
        SET_USER_DATA(state, userData) {
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${
                userData.token
                }`
            state.user = userData
        },
        */

        loginFailure(state) {
            console.log("aut.loginFailure");
            state.user = null;
            this.$store.commit("aut/logout");
        },

        clear(state) {
            state.user = null;
            state.permissions = null;
        }, 
    },

    actions: {
        login({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: "/api/auth/login",
                action: "post",
                data: payload,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "logging in...", onSuccess: "Successfully logged in", onFailure: "Wrong email or password! Please try again." }
            };

            return dispatch("xhr/xhr", xhrRequest, { root: true })
                .then(res => {
                    commit('loginSuccess', res.data);
                    return res;
                })
                .catch(err => {
                    state.user = null;
                    commit('loginFailure', err);
                    throw err;
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
                    dispatch('goToRoute', `/login`, { root: true })
                });
        },
    }
}
