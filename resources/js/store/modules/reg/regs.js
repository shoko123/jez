import registrationUtility from './registrationUtility';

export default {
    namespaced: true,

    state: {
        newItem: {
            areaSeason: { id: null, tag: null },
            locus: { id: null, locus_no: null, tag: null },
            find: { id: null, basket_no: null, item_no: null, tag: null },
            registrationOption: { registration_category: null, basket: false, item: false },
        },
        areasSeasons: null,
        areaSeasonLoci: null,
        locusFinds: null,
        registrationOptions: [],
        
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
        },
        areaSeason(state) {
            return state.newItem.areaSeason;
        },
        locus(state) {
            return state.newItem.locus;
        },
        locus_no(state) {
            return state.newItem.locus.locus_no;
        },
        registrationOption(state) {
            return state.newItem.registrationOption;
        }, 
        basket_no(state) {
            return state.newItem.find.basket_no;
        },
        registrationOption(state) {
            return state.newItem.find.registrationOption;
        },
    },
    mutations: {
        areasSeasons(state, payload) {
            //console.log("loader.commit areasSeasons: " + JSON.stringify(payload, null, 2));
            state.areasSeasons = payload;
        },
        areaSeason(state, payload) {
            console.log("regs assign areaSeason: " + JSON.stringify(payload, null, 2));
            state.newItem.areaSeason = {};
            Object.assign(state.newItem.areaSeason, payload);
            //state.newItem.areaSeason.id = payload.id;
        },

        areaSeasonLoci(state, payload) {
            state.areaSeasonLoci = payload;
        },
        locus(state, payload) {
            state.newItem.locus = payload;
        },
        locus_no(state, payload) {
            state.newItem.locus.locus_no = payload;
        },


        locusFinds(state, payload) {
            state.locusFinds = payload;
        },

        find(state, payload) {
            console.log("regs/find(set)");
            state.newItem.find = payload;
        },

        findable_id(state, payload) {
            state.newItem.find.id = payload;
        },
        registrationOptions(state, payload) {
            state.registrationOptions = payload;
        },
        registrationOption(state, payload) {
            state.newItem.registrationOption = payload;
        },
     
        basket_no(state, payload) {
            console.log("regs/basket_no.set( " + payload + " )");
            state.newItem.find.basket_no = payload;
        },

        item_no(state, payload) {
            console.log("regs/item_no.set( " + payload + " )");
            state.newItem.find.item_no = payload;
        },

        clear(state) {
            console.log("regs.clear()");
            Object.assign(state.newItem.areaSeason, { id: null, tag: null });
            Object.assign(state.newItem.locus, { id: null, locus_no: null, tag: null });
            Object.assign(state.newItem.find, { id: null, registration_category: null, basket_no: null, item_no: null, tag: null });
            //state.newItem.areaSeason = null;
            //state.newItem.locus = null;
            //state.newItem.find = null;

            /*
           state.newItem.areaSeason.id = 1;
           state.newItem.areaSeason.tag = null;
           state.newItem.locus.id = null;
           state.newItem.locus.locus_no = null;
           state.newItem.locus.tag = null;
           state.newItem.find.id = null;
           state.newItem.registrationOption.registration_category = null;
           state.newItem.find.basket_no = null;
           state.newItem.find.item_no = null;
           state.newItem.find.tag = null;
           */
            //state.areasSeasons = null;
            state.areaSeasonLoci = null;
            state.locusFinds = null;

        },
        clearLocus(state) {
            console.log("regs/clearLocus");
            state.newItem.locus = { id: null, locus_no: null, tag: "" };
        },
        clearFind(state) {
            console.log("regs/clearFind");
            state.newItem.find = {
                id: null,
                registration_category: state.newItem.registrationOption.registration_category,
                basket_no: null,
                item_no: null,
                tag: ""
            }
            return;
            state.newItem.find.id = null;
            //state.newItem.registrationOption.registration_category
            state.newItem.find.basket_no = null;
            state.newItem.find.item_no = null;
            state.newItem.find.tag = "";
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, areaSeason) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            //so all left to be done is reset locus_id.
            //area_season_id is already set by the two way binding with the element locus
            console.log("regs/areaSeasonSelected");
            commit("areaSeason", areaSeason);
            commit("clearLocus", null);
            commit("stp/disableNextButton", true, { root: true });

            //commit("locus_no", null);

            if (rootGetters["mgr/status"].isCreate) {
                dispatch("loadAreaSeasonLoci", state.newItem.areaSeason.id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/locusSelected");
            commit("locus", payload);
            commit("clearFind");
            commit("stp/disableNextButton", true, { root: true });

            
            if (rootGetters["mgr/status"].isCreateFind) {
                dispatch("loadLocusFinds", state.newItem.locus.id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
            }
        },

        locusNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/locusNoSelected");
            commit("locus_no", payload);
            if (rootGetters["mgr/status"].isCreateLocus) {
                commit("stp/disableNextButton", !getters.regs.ready, { root: true });
            } else {
                commit("stp/disableNextButton", true, { root: true });
            }
        },

        //picker
        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            let find = { id: payload.id, tag: payload.tag }
            commit("find", find)
        },

        //registrar
        registrationOptionSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/registrationOptionSelected: " + JSON.stringify(payload, null, 2));
            commit("registrationOption", payload);
            commit("clearFind");
            commit("stp/disableNextButton", true, { root: true });

        },
        basketNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/basketNoSelected");
            commit("basket_no", payload);
            commit("stp/disableNextButton", !getters.regs.ready, { root: true });

        },
        itemNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/itemNoSelected");
            commit("item_no", payload);
            commit("stp/disableNextButton", !getters.regs.ready, { root: true });

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
            console.log(`regs/prepare(): ${rootGetters["mgr/status"].itemName}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            commit("clear");
            commit("stp/disableNextButton", true, { root: true });
            if (rootGetters["mgr/status"].isLocus) {
                //////locus/////

                let areaSeason = state.areasSeasons.find(x => {
                    return x.id === rootGetters["mgr/item"].area_season.id;
                });
                commit("areaSeason", areaSeason);
                //commit("clearLocus", null);
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.newItem.areaSeason.id)
            } else if (rootGetters["mgr/status"].isFind) {
                //////find/////
                let item = rootGetters["mgr/item"];
                let tag = item.tag;
                let areaSeasonTag = tag.split('\/')[0] + '/' + tag.split('\/')[1];
                let locusTag = tag.split('.')[0];
                let locus_no = parseInt(locusTag.split('\/')[2]);
                let registration_category = tag.split('.')[1];
                commit("areaSeason", { id: item.area_season_id, tag: areaSeasonTag });
                commit("locus", { id: item.locus_id, locus_no: locus_no, tag: locusTag });
                //let registration_category = (rootGetters["mgr/item"].tag).toString().split('.')[1];
                //console.log("regs/prepare get registrationOptions: " + JSON.stringify(registrationUtility.registrationOption(), null, 2))
                commit("registrationOptions", registrationUtility.registrationOption());
                //commit("registration_category", registration_category);
                commit("basket_no", null);
                commit("item_no", null);
                
                //console.log('reg/prepare newItem: ' + registration_category);
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.newItem.areaSeason.id)
                    .then(res => {
                        //commit("locus_id", rootGetters["mgr/item"].locus_id);
                        //commit("basket_no", null);
                        //commit("item_no", null);
                        dispatch("loadLocusFinds", state.newItem.locus.id);
                    })
            }
        },

        copyItemToPicker({ state, getters, rootGetters, commit, dispatch }) {
            commit("clearLocus");
            return;
            let areaSeason = state.areasSeasons.find(x => {
                return x.id === rootGetters["mgr/item"].area_season.id;
            });
            console.log('reg/copyItemToPicker areaSeason from collection: ' + JSON.stringify(areaSeason, null, 2));
            commit("areaSeason", areaSeason);



        },

        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                commit("loci/registrationData", {
                    area_season_id: state.newItem.areaSeason.id,
                    locus_no: state.newItem.locus.locus_no,
                }, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                commit("fnd/registrationData", {
                    findable_type: rootGetters["mgr/status"].itemName,
                    locus_id: state.newItem.locus.id,
                    registration_category: state.newItem.registrationOption.registration_category,
                    basket_no: state.newItem.find.basket_no,
                    item_no: state.newItem.find.item_no,
                }, { root: true });
            }
        },
    }
}
