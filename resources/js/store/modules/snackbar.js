export default {
    namespaced: true,
    state: {
        snackbar: {
            value: false,
            message: "",
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
        snackbar(state, payload) {
            state.snackbar.color = typeof payload === 'string' ? 'green' : payload.color;
            state.snackbar.message = typeof payload === 'string' ? payload : payload.message;
            state.snackbar.value = true;
        },
    },

    actions: {


    }
}