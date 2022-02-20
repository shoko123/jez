import u from './regsUtil';
import p from './picker';
import n from './newItem';
export default {
    namespaced: true,

    modules: {
        p, n
    },

    state: {

    },
    getters: {
        lists(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/lists"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/lists"];
            } else {
                return null;
            }
        },


        flags(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/flags"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/flags"];
            } else {
                return null;
            }
        },

        selected(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/selected"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/selected"];
            } else {
                return null;
            }
        },
    },
    mutations: {
        clear(state) {

        },
    },

    actions: {
        selected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/selected");
            let target = rootGetters["mgr/status"].isPicker ? "p" : "n";
            dispatch(`regs/${target}/selected`, payload, { root: true });
        },
        prepare({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/prepare - do nothing");
        },
    }
}
