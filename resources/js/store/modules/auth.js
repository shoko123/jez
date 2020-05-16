export default {
    namespaced: true,
    state: {
        loginMessage: null,
        user: null,
        permissions: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.user ? true : false;
        },
        loginMessage(state) {
            return state.loginMessage;
        },
    },
    mutations: {
        loginSuccess(state, payload) {                        
            axios.defaults.headers.common["Authorization"] = `Bearer ${payload.access_token}`
            state.user = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem('user', JSON.stringify(payload.user));
            console.log("login success setting user to : " + JSON.stringify(state.user, null, 2));      
            state.loginMessage = null;
        },


        SET_USER_DATA (state, userData) {
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${
              userData.token
            }`
            state.user = userData
          },
         
        loginFailure(state, payload) {
            console.log("aut.loginFailure");
            state.user = null;
            state.loginMessage = "Wrong email or password";
        },

        logout(state) {
            //NEED delete from server
            state.user = null;
            localStorage.removeItem('user')
            //location.reload()
        },
        clear(state) {
            
        }
    },

    actions: {
        jezLogin({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: "/api/auth/login",
                action: "post",
                data: payload,
                spinner: true,
                verbose: false,
                snackbar: {onSuccess: false, onFailure: false, },
                messages: { loading:"logging in..." , onSuccess: "", onFailure: ""}
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
    }
}
