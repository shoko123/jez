export default {
    namespaced: true,
    state: {
        moduleBaseURL: 'loci',
        itemName: 'Locus',
        collectionName: 'loci',
        locus: null,
        loci: [],
        index: null
    },

    getters: {
        moduleStaticData(state) {
            return {
                baseURL: state.moduleBaseURL,
                itemName: state.itemName,
                collectionName: state.collectionName
            };
        },

        collection(state) {
            return state.loci;
        },

        item(state) {
            return state.locus;
        },
        index(state) {
            return state.index;
        },
    },
    mutations: {
        loci(state, payload) {
            //alert('loaded loci');
            state.loci = payload;
        },

        locus(state, payload) {
            state.locus = payload;
            state.index = state.loci.findIndex(loc => loc.id == payload.id);
            //console.log('loc.mutation.locus: ' + JSON.stringify(state.locus))
        },


    },
    actions: {
        getData({ state, dispatch, commit, getters, rootGetters }, payload) {
            console.log('loc.getData payload: ' + JSON.stringify(payload, null, 2));
            //let xhrRequest = { snackbar: {}, messages: {}, };
            switch (payload.action) {
                case 'welcome':
                    dispatch('collection');
                    break;

                case 'list':
                    dispatch('collection');
                    break;

                case 'show':
                    dispatch('item', payload.id);
                    break;

                case 'create':

                    break;

                case 'update':

                    break;

                default:
                    console.log('gs.getData error in payload');
            }
        },

        collection({ state, commit, dispatch }, payload) {
            state.loci = null;

            let xhrRequest = {
                endpoint: `/api/loci`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading loci", onSuccess: null, onFailure: "failed loading loci", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('loci collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('loci', res.data.loci);
                    return res;
                })
                .catch(err => {
                    console.log('loc Failed to load loci. err: ' + err);
                    return err;
                })
        },

        item({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/loci/${payload}`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading locus with id: ${payload}`, onSuccess: null, onFailure: "failed loading locus", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('locus', res.data.locus);
                    return res;
                })
                .catch(err => {
                    console.log('locus.action.item Failed to load locus. err: ' + err);
                    return err;
                })
        },
    }

};
