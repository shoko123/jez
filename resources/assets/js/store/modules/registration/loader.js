export default {
    namespaced: true,
    state: {
        areasSeasons: null,
        areaSeasonLoci: null,
    },

    getters: {
        areasSeasons(state) {
            return state.areasSeasons ? state.areasSeasons.map(x => {
                return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
            }) : null;
        },
        areaSeasonLoci(state, getters, rootState, rootGetters) {
            console.log("pkr.getters.loci LOCI as part of new item");
            if (!state.areaSeasonLoci) {
                return null;
            }

            return state.areaSeasonLoci.map(item => {
                let sections = item.id_string.split(".");
                return {
                    id: item.id,
                    id_string: item.id_string.slice(0, 8),
                    no: parseInt(sections[2], 10)
                };
            });
        },
    },
    mutations: {
        areasSeasons(state, payload) {
            state.areasSeasons = payload;
        },
        areaSeasonLoci(state, payload) {
            console.log("loader.commit areaSeasonLoci: " + JSON.stringify(payload, null, 2));
            state.areaSeasonLoci = payload;
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
                    commit("areasSeasons", res.data.areas);
                    //commit("areasSeasons", res.data.areas );
                    return res;
                })
        },
        areaSeasonLoci({ state, getters, commit, dispatch, rootGetters }, area_season_id) {
            let xhrRequest = {
                endpoint: `/api/areas/${area_season_id}/areaLoci`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for area ${area_season_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("areaSeasonLoci", res.data.lociForArea);
                    return res;
                })
                .catch(err => {
                    console.log('update Failed to load loci: ' + err);
                    return err;
                });
        },

    }
};
