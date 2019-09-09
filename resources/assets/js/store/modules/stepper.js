export default {
    namespaced: true,
    state: {
        step: 1,
        header: '',
        stepArray: [],
        areas: [],
        lociForArea: [],
        findsForLocus: [],
    },
    getters: {
        stepArray(state) {
            return state.stepArray;
        },

        step(state) {
            return state.step;
        },

        itemName(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/moduleItemName"];
        },
        header(state, getters, rootState, rootGetters) {
            let name = rootGetters["mgr/moduleItemName"];
            let action;
            let tag = ' (' + rootGetters["mgr/newItemTag"] + ')';
            if(rootGetters["mgr/isCreate"]) {
                action = "Create new ";
                //tag = rootGetters["fnd/newItemTag"];
            } else {
                action = "Update ";
                //tag =  rootGetters["fnd/newItemTag"];
            }
             return action + name + (rootGetters["mgr/isUpdate"] || state.step > 1 ? tag : '');
        },
        areas(state) {
            return state.areas;
        },
        

    },
    mutations: {
        stepArray(state, payload) {
            state.stepArray = payload;
        },

        step(state, payload) {
            state.step = payload;
        },
        areas(state, payload) {
            state.areas = payload;
        },
    },

    actions: {
        areas({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: `/api/areas`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading areas", onSuccess: null, onFailure: "failed loading areas", },
            };
            dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    commit("areas", res.data.areas);
                    return res;
                })
                .catch(err => {
                    console.log('stp.areas Failed to load areas: ' + err);
                    return err;
                })
        },
        areaLoci({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: `/api/areas/${payload}/lociListForArea`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for area ${payload}`, onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("areas", res.data.lociForArea, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('update Failed to load loci: ' + err);
                    return err;
                })
        },

        locusFinds({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: `/api/loci/${payload}/findList`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${payload}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("fnd/findListForLocus", res.data, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('findListForLocus Failed to load finds: ' + err);
                    return err;
                })
        },

    }
}
