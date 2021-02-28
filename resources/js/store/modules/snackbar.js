export default {
    namespaced: true,
    state: {
        snackbar: {
            value: false,
            color: "",
            timeout: 4000,
        },
    },

    getters: {
        snackbar(state) {
            return state.snackbar;
        },
    },

    mutations: {
        displaySnackbar(state, payload) {
            state.snackbar.color = payload.isSuccess ? 'green' : 'red';
            state.snackbar.message = payload.message;
            state.snackbar.value = true;
        },
    },

    actions: {


    }
}