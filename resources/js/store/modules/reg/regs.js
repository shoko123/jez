import registrationUtility from './registrationUtility';

export default {
    namespaced: true,

    modules: {
        //loader: loader,
        //collection: currentCollection,
    },

    state: {
        newItem: {
            areaSeason: {},
            locus: { id: null, locus_no: null, tag: null },
            find: {id: null, registration_category: null, basket_no: null, item_no: null, tag: null},
        },
        areasSeasons: null,
        areaSeasonLoci: null,
        locusFinds: null,
        registrationCategories: null,
    },

    getters: {
        regs(state, getters, rootState, rootGetters) {

            //if we are not in picker or create, return null
            if (!rootGetters["mgr/status"].isPicker && !rootGetters["mgr/status"].isCreate) {
                return null;
            };

            if (rootGetters["mgr/status"].isPicker) {
                //picker
                if (rootGetters["mgr/status"].isLocus) {
                    return registrationUtility.pickerLocus(state, getters, rootState, rootGetters);
                } else {
                    return registrationUtility.pickerFind(state, getters, rootState, rootGetters);
                }
            } else {
                //creator
                if (rootGetters["mgr/status"].isLocus) {
                    return registrationUtility.creatorLocus(state, getters, rootState, rootGetters);
                } else {
                    return registrationUtility.creatorFind(state, getters, rootState, rootGetters);
                }
            }
        }
    },
    mutations: {
        areaSeason(state, payload) {
            state.newItem.areaSeason = payload;
        },

        locus(state, payload) {
            state.newItem.locus = payload;
        },

        locusClear(state) {
            state.newItem.locus= {id: null, locus_no: null, tag: null};
        },

        locus_no(state, payload) {
            state.newItem.locus.locus_no = payload;
        },
        find(state, payload) {
            console.log( "regs/find(set)");
            state.newItem.find = payload;
        },

        findable_id(state, payload) {
            state.newItem.find.id = payload;
        },

        registration_category(state, payload) {
            state.newItem.find.registration_category = payload;
        },

        basket_no(state, payload) {
            state.newItem.find.basket_no = payload;
        },

        item_no(state, payload) {
            state.newItem.find.item_no = payload;
        },

        areasSeasons(state, payload) {
            //console.log("loader.commit areasSeasons: " + JSON.stringify(payload, null, 2));
            state.areasSeasons = payload;
        },
        areaSeasonLoci(state, payload) {
            state.areaSeasonLoci = payload;
        },
        locusFinds(state, payload) {
            state.locusFinds = payload;
        },
        registrationCategories(state, payload) {
            state.registrationCategories = payload;
        },

        clear(state) {
            console.log("registration.clear()");
            state.newItem.areaSeason.id = null;
            state.newItem.areaSeason.tag = null;
            state.newItem.locus.id = null;
            state.newItem.locus.locus_no = null;
            state.newItem.locus.tag = null;
            state.newItem.find.id = null;
            state.newItem.find.registration_category = null;
            state.newItem.find.basket_no = null;
            state.newItem.find.item_no = null;
            state.newItem.find.tag = null;
            
            state.areaSeasonLoci = null;
            state.locusFinds = null;
            state.registrationCategories
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, areaSeason) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            //so all left to be done is reset locus_id.
            //area_season_id is already set by the two way binding with the element locus
            commit("areaSeason", areaSeason);
            commit("locusClear", null);
            commit("locus_no", null);
            console.log("registration/areaSeasonSelected");
            if (rootGetters["mgr/status"].isCreate) {
                dispatch("loadAreaSeasonLoci", state.newItem.area.id);
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("registration/locusSelected");
            commit("locus", payload)
            if (rootGetters["mgr/status"].isCreateFind) {
                dispatch("loadLocusFinds", state.newItem.locus.id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
            }
        },

        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            let find = {id: payload.id, tag: payload.tag}
            commit("find", find)
        },

        registrationCategorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.registrationCategorySelected");
            state.newItem.basket_no = state.newItem.find.item_no = null;
        },
        basketNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.basketNoSelected");
        },
        itemNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.itemNoSelected");
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            
            if (state.areasSeasons) {
                return;
            }
            console.log("regs loadAreasSeasons()");

            let xhrRequest = {
                endpoint: `/api/areas`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading areas", onSuccess: null, onFailure: "failed loading areas", },
            };
            dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    //console.log('loader.areasSeasons dispatch returned, before commit: ' + JSON.stringify(res.data.areas, null, 2));
                    commit("areasSeasons", res.data.collection);
                    return res;
                })
        },

        loadAreaSeasonLoci({ state, getters, commit, dispatch, rootGetters }, area_season_id) {
            let xhrRequest = {
                endpoint: `/api/areas/${area_season_id}/areaLoci`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for areaSeason ${area_season_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("areaSeasonLoci", res.data.lociForArea);
                    return res;
                })
        },

        loadLocusFinds({ state, getters, commit, dispatch, rootGetters }, locus_id) {
            let xhrRequest = {
                endpoint: `/api/loci/${locus_id}/finds?find_type=${rootGetters["mgr/status"].itemName}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${locus_id}`, onSuccess: null, onFailure: null, },
            };
            console.log('loadLocusFinds xhrRequest: ' + JSON.stringify(xhrRequest, null, 2));
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("locusFinds", res.data.finds);
                    return res;
                })
        },


        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`registration/prepare(): ${rootGetters["mgr/status"].itemName}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            commit("clear");
            if (rootGetters["mgr/status"].isLocus) {
                //////locus/////
                commit("area_season_id", rootGetters["mgr/item"].area_season_id);
                commit("locus_no", null);
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.newItem.area_season_id)
            } else if (rootGetters["mgr/status"].isFind) {
                //////find/////
                commit("area_season_id", rootGetters["mgr/item"].area_season_id);
                commit("locus_id", rootGetters["mgr/item"].locus_id);
                //commit("registration_category", rootGetters["mgr/status"].itemName);
                //let registration_category = (rootGetters["mgr/item"].tag).toString().split('.')[1];

                commit("registration_category", (rootGetters["mgr/item"].tag).toString().split('.')[1]);

                //console.log('reg/prepare newItem: ' + registration_category);
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.newItem.area_season_id)
                    .then(res => {
                        commit("locus_id", rootGetters["mgr/item"].locus_id);
                        commit("basket_no", 0);
                        commit("item_no", 0);
                        dispatch("loadLocusFinds", state.newItem.locus_id);
                    })
            }
        },

        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                //registrationLocus.copyLocusRegistration(state, getters, rootGetters, commit);
            } else if (rootGetters["mgr/status"].isFind) {
                //registrationFind.copyFindRegistration(state, getters, rootGetters, commit);
            }
        }
    }
}
