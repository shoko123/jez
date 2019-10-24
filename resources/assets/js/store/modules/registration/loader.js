export default {
    namespaced: true,
    state: {
        areasSeasons: null,
    },

    getters: {
        areasSeasons(state) {
            return state.areasSeasons ? state.areasSeasons.map(x => {
                return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
            }) : null;
        },
    },
    mutations: {
        areasSeasons(state, payload) {
            state.areasSeasons = payload;
        },
    },
    actions: {     
        //retrieve areasSeasons from DB
        areasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("loader.dispatching areasSeasons");
            if (state.areasSeasons) {
                return;
            }
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
                    console.log('loader.areasSeasons dispatch returned, before commit: ' + JSON.stringify(res.data.areas, null, 2));
                    commit("areasSeasons", res.data.areas );
                    //commit("areasSeasons", res.data.areas );
                    return res;
                })
        },

    }
};
