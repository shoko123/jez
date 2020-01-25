//import loader from './loader';
//import currentCollection from './currentCollection';

export default {
    namespaced: true,

    modules: {
        //loader: loader,
        //collection: currentCollection,
    },

    state: {
        registrationData: {
            area_season_id: null,
            locus_id: null,
            locus_no: null,
            registration_category: null,
            basket_no: null,
            item_no: null,
            findable_type: null,
            findable_id: null,
            scene_item: null,
        },
        areasSeasons: null,
        areaSeasonLoci: null,
        locusFinds: null,
    },
    getters: {
        areasSeasons(state, getters, rootState, rootGetters) {
            if (!state.areasSeasons || !rootGetters["mgr/collection"]) {
                return null
            };

            if (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind) {
                if (rootGetters["mgr/status"].isCreate) {
                    return state.areasSeasons;
                } else if (rootGetters["mgr/status"].isShow) {
                    //we could iterate over rootGetters["mgr/collection"] and get unique areas, but this is 
                    //somewhat expensive and also that collection may be of different thing (loci, finds)
                    //so instead, we load the areas array and select from there. 
                    return state.areasSeasons.filter(x => {
                        return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
                    });

                    //unused iteration over rootGetters["mgr/collection"] to extract unique areas (not working)
                    //let fromCollection = Array.from(new Set(rootGetters["mgr/collection"].map(x => { return { id: x.area_id, tag: x.tag.slice(0, 4)}})));
                    //console.log("areasSeasons fro collection: " + JSON.stringify(fromCollection, null, 2));                  
                }
            }
            return null;
        },

        areaSeasonLoci(state, getters, rootState, rootGetters) {
            if (!state.registrationData.area_season_id ||
                !state.areasSeasons ||
                !rootGetters["mgr/collection"]) {
                return null
            };

            if (rootGetters["mgr/status"].isFind) {
                return rootGetters["mgr/collection"].filter(x => {
                    return (x.tag.slice(0, 4) == getters["area"].tag);
                }).map(item => {

                    let locus_no = item.tag.toString().split('\/')[2];
                    if (locus_no.includes('\.')) {
                        locus_no.split('.')[0]
                    }
                    return {
                        id: (rootGetters["mgr/status"].itemName === "Locus") ? item.id : item.locus_id,
                        no: parseInt(locus_no, 10),
                        tag: item.tag,
                    };
                });
            }

            if (rootGetters["mgr/status"].isLocus) {
                if (rootGetters["mgr/status"].isCreate) {
                    //if we create a new locus, we fill this list with all loci for a chosen area (regardless of current collection).
                    //It will be used by locusNos which will contain all unused locus nos for a chosen area.
                    return state.areaSeasonLoci;
                }

                if (rootGetters["mgr/status"].isShow) {
                    //console.log("XXX area: " + (getters["area"] ? JSON.stringify(getters["area"], null, 2) : "null"));           
                    return rootGetters["mgr/collection"].filter(x => {
                        return (x.tag.slice(0, 4) == getters["area"].tag);
                    }).map(item => {

                        let locus_no = item.tag.toString().split('\/')[2];
                        if (locus_no.includes('\.')) {
                            locus_no.split('.')[0]
                        }
                        return {
                            id: (rootGetters["mgr/status"].itemName === "Locus") ? item.id : item.locus_id,
                            no: parseInt(locus_no, 10),
                            tag: item.tag,
                        };
                    });
                }
                //return state.areaSeasonLoci;
            }
        },

        area_season_id(state) {
            //protected, used by module files only
            return state.registrationData.area_season_id;
        },

        area(state, getters, rootState, rootGetters) {
            if (!state.registrationData.area_season_id || !state.areasSeasons) {
                //console.log("reg.area returns null area_season_id: " + state.registrationData.area_season_id);
                return null;
            }
            let area = state.areasSeasons.find(x => {
                return x.id === state.registrationData.area_season_id;
            });
            console.log("reg.area returns area: " + JSON.stringify(area, null, 2));

            return state.areasSeasons.find(x => {
                return x.id === state.registrationData.area_season_id;
            });
        },


        locus(state, getters, rootState, rootGetters) {
            if (!state.registrationData.locus_id) {
                return null;
            }

            return getters["areaSeasonLoci"].find(x => {
                return x.id === state.registrationData.locus_id;
            });
        },

        locusNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreateLocus || !state.registrationData.area_season_id || !state.areaSeasonLoci) {
                return null;
            }
            //console.log("allowedLocusNos pass 1");

            let oneTo999 = ([...Array(1000).keys()])

            let possibleLoci = oneTo999.filter(x => {
                return !state.areaSeasonLoci.some(y => y.locus === x);
            })
            return possibleLoci;
        },

        locus_no(state) {
            return state.registrationData.locus_no;
        },

        locus_id(state) {
            //protected, used by module files only.
            return state.registrationData.locus_id;
        },


        locusFinds(state, getters, rootState, rootGetters) {
            if (!state.registrationData.locus_id) {
                return null;
            }

            if (rootGetters["mgr/status"].isCreate) {

                return state.locusFinds

            } else if (rootGetters["mgr/status"].isShow) {

                return rootGetters["mgr/collection"].filter(x => {
                    return x.locus_id == state.registrationData.locus_id;

                }).map(item => {
                    //console.log("mapping item: " + JSON.stringify(item, null, 2));
                    let sections = item.tag.toString().split(".");
                    return {
                        id: item.id,
                        registration_category: sections[1],
                        basket_no: sections[1] === "GS" ? parseInt(sections[2], 10) : null,
                        item_no: sections[1] === "GS" ? parseInt(sections[3], 10) : parseInt(sections[2], 10),
                        tag: item.tag,
                    };
                });
            }
        },

        findable_type(state) {
            return state.registrationData.findable_type;
        },

        findable_id(state) {
            return state.registrationData.findable_id;
        },

        find(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFind || !getters["locusFinds"]) {
                return null;
            }

            return getters["locusFinds"].find(x => {
                return x.id === getters.findable_id;
            });
        },


        registrationCategories(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/status"].registrationCategories;
        },
        registration_category(state) {
            return state.registrationData.registration_category;
        },

        basketNos(state, getters, rootState, rootGetters) {
            if (!state.locusFinds) {
                return null;
            }

            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1)
            switch (getters.registration_category) {
                case "PT":
                    let possiblePTbasketNos = oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.basket_no === x && y.findable_type === getters.findable_type)
                        })
                    })
                    return possibleLoci;

                case "GS":
                case "FL":
                    return oneTo99;
                default:
                    return [];
            }
        },

        basket_no(state) {
            return state.registrationData.basket_no;
        },

        itemNos(state, getters, rootState, rootGetters) {
            if (!state.locusFinds) {
                return null;
            }
            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1);

            switch (getters.registration_category) {
                case "PT":
                    return [];
                case "AR":
                    return oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.item_no === x && y.findable_type === getters.findable_type)
                        })
                    });
                case "GS":
                case "FL":
                    return oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.item_no === x &&
                                y.findable_type === getters.findable_type &&
                                y.basket_no === getters.basket_no &&
                                y.registration_category === getters.registration_category)
                        })
                    });
            }
        },

        item_no(state) {
            return state.registrationData.item_no;
        },

        item(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/status"].itemName) {
                case "Area":
                    return getters.area;
                case "Locus":
                    return getters.locus;
                case "Stone":
                case "Pottery":
                    return getters.find;
                default:
                    return null
            }
        },
        registrationData(state) {
            //protected, used by module files only
            return state.registrationData;
        },
        registrationData(state) {
            //protected, used by module files only
            return state.registrationData;
        },
        tag(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate) {
                return null;
            }
            switch (rootGetters["mgr/status"].itemName) {
                case "Area":
                    return getters.area;
                case "Locus":

                    if (!getters["area"] || !state.registrationData.locus_no) {
                        return null;
                    }
                    return getters["area"].tag + "/" + state.registrationData.locus_no;
                case "Stone":
                case "Pottery":
                    return getters.find;
                default:
                    return null
            }


        }


    },
    mutations: {
        area_season_id(state, payload) {
            state.registrationData.area_season_id = payload;
        },

        locus_id(state, payload) {
            state.registrationData.locus_id = payload;
        },

        locus_no(state, payload) {
            state.registrationData.locus_no = payload;
        },

        findable_id(state, payload) {
            state.registrationData.findable_id = payload;
        },

        registration_category(state, payload) {
            state.registrationData.registration_category = payload;
        },

        basket_no(state, payload) {
            state.registrationData.basket_no = payload;
        },

        item_no(state, payload) {
            state.registrationData.item_no = payload;
        },


        areasSeasons(state, payload) {
            //console.log("loader.commit areasSeasons: " + JSON.stringify(payload, null, 2));
            state.areasSeasons = payload;
        },
        areaSeasonLoci(state, payload) {
            //console.log("loader.commit areaSeasonLoci: " + JSON.stringify(payload, null, 2));
            state.areaSeasonLoci = payload;
        },
        locusFinds(state, payload) {
            state.locusFinds = payload;
        },

        clear(state) {
            console.log("picker.clear()");
            state.registrationData.area_season_id = null;
            state.registrationData.locus_id = null;
            state.registrationData.registration_category = null;
            state.registrationData.basket_no = null;
            state.registrationData.item_no = null;
            state.registrationData.findable_type = null;
            state.registrationData.findable_id = null;
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            console.log("registration.areaSeasonSelected");
            if (rootGetters["mgr/status"].isCreate && (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind)) {
                state.registrationData.locus_id = null;//load loci
                dispatch("loadAreaSeasonLoci", state.registrationData.area_season_id)
                    .then(res => { });

            } else {
                console.log("picker.areaSeasonSelected did not dispatch");
            }

        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.locusSelected");
            if (rootGetters["mgr/status"].isCreateFind) {
                dispatch("loadLocusFinds", state.registrationData.locus_id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
            }
        },

        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },

        registrationCategorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.registrationCategorySelected");
            state.registrationData.basket_no = state.registrationData.item_no = null;
        },
        basketNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.basketNoSelected");
        },
        itemNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.itemNoSelected");
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("loader.dispatching areasSeasons");
            if (state.areasSeasons) {
                return;
            }
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
                    commit("areasSeasons", res.data.areas);
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
                messages: { loading: `loading loci for area ${area_season_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("areaSeasonLoci", res.data.lociForArea);
                    return res;
                })
        },
        loadLocusFinds({ state, getters, commit, dispatch, rootGetters }, locus_id) {
            let xhrRequest = {
                endpoint: `/api/loci/${locus_id}/finds?find_type=${getters["moduleInfo"].itemName}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${locus_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("locusFinds", res.data.finds);
                    return res;
                })
        },


        //will be called before the creation of a new item.
        //set defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`picker.prepare(): ${rootGetters["mgr/status"].itemName}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            if (!rootGetters["mgr/status"].isCreate) {
                return;
            }

            if (rootGetters["mgr/status"].isLocus) {
                //////locus/////
                state.registrationData.area_season_id = rootGetters["mgr/item"].area_id;
                state.registrationData.locus_no = null;
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.registrationData.area_season_id)
            } else if (rootGetters["mgr/status"].isFind) {
                //////find/////
                state.registrationData.area_season_id = rootGetters["mgr/item"].area_id;
                state.registrationData.findable_type = rootGetters["mgr/status"].itemName;
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.registrationData.area_season_id)
                    .then(res => {
                        state.registrationData.locus_id = rootGetters["mgr/item"].locus_id;
                        state.registrationData.registration_category = state.registrationData.basket_no = state.registrationData.item_no = null;
                        dispatch("loadLocusFinds", state.registrationData.locus_id)
                            .then(res => {
                                if (state.locusFinds) {
                                    state.registrationData.registration_category = state.locusFinds[0].registration_category;
                                }
                            });
                    })
            }
        },

    }
}
