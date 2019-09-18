export default {
    namespaced: true,
    state: {
        data: {
            area_season_id: null,
            locus_id: null,
            locus_no: null,
            registration_category: null,
            basket_no: null,
            item_no: null,
            findable_type: null,
            findable_id: null,
            registrationCategories: [],
            defaultRegistrationCategory: null,
        },
        dataExtra: {
            areasSeasons: null,
            allLoci: [],
            loci: [],
            finds: [],
        },
    },
    getters: {
        area_season_id(state) {
            return state.data.area_season_id;
        },
        area_season_id_string(state, getters) {
            console.log('area_season_id_string');
            if ((!state.dataExtra.areasSeasons) || (!state.data.area_season_id)) {
                return null;
            }

            let area_season = getters.areasSeasons.find(x => {
                return x.id === state.data.area_season_id;
            });
            console.log('area_season: ' + JSON.stringify(area_season, null, 2));
            return area_season ? area_season.id_string : null;
        },

        locus_id(state, getters) {
            return state.data.locus_id;
        },

        locus_no(state, getters, rootState, rootGetters) {
            if (
                rootGetters["mgr/isLocus"] &&
                rootGetters["mgr/isCreate"]) {
                return state.data.locus_no;
            } else {

                if ((!getters.loci) || (!state.data.locus_id)) {
                    return null;
                }
                //console.log('picker locus_id B locus_no: ' + state.data.locus_no + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                let locus = getters.loci.find(x => {
                    return x.locus_id === state.data.locus_id;
                });
                //console.log('picker locus_id C' + JSON.stringify(locus, null, 2));
                return locus ? locus.locus_no : null;
                return state.data.locus_no;
            }
        },
        locus(state, getters) {
            return {
                id: getters.locus_id,
                locus_no: getters.locus_no,
                id_string: getters.locus_id_string,
            }
        },
        locus_id_string(state, getters, rootState, rootGetters) {
            return getters.area_season_id_string + '.' + getters.locus_no;
        },


        find(state) {
            return state.data.registration_category;
        },


        registration_category(state) {
            return state.data.registration_category;
        },
        basket_no(state) {
            return state.data.basket_no;
        },
        item_no(state) {
            return state.data.item_no;
        },

        selectedItemId(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/moduleItemName"]) {
                case "Area":
                    return state.area_season_id;
                case "Locus":
                    return getters.locus_id;

                case "Groundstone":
                    return getters.findable_id;

            }
        },

        //private
        isCreate(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/isCreate"];
        },

        collection(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/collection"];
        },
        item(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/item"];
        },

        areasSeasonsAll(state, getters, rootState, rootGetters) {
            if (!state.dataExtra.areasSeasons) {
                return null;
            }
            return state.dataExtra.areasSeasons.map(x => {
                return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
            });
        },
        areasSeasons(state, getters, rootState, rootGetters) {
            if (getters.isCreate) {
                return getters.areasSeasonsAll;
            } else {
                //console.log('pkr/areasSeasons: ' + JSON.stringify(myAreasSeasons, null, 2));
                /*return areasSeasons;
                return [
                    ...new Set(
                        getters.collection.map(item => {
                            let str = item.id_string.toString();
                            let sections = str.split(".");
                            return { id: item.area_id, id_string: str.slice(0, 4), tag: sections[0] + "/" + sections[1] };
                        })
                    )
                ];
                */
                return getters.areasSeasonsAll ? getters.areasSeasonsAll.filter(x => {
                    return getters.collection ? getters.collection.some(y => x.id_string === y.id_string.slice(0, 4)) : false;
                }) : null;
            }
        },

        loci(state, getters, rootState, rootGetters) {
            if (!getters.collection || !state.data.area_season_id) {
                return null;
            }

            if (getters.isCreate) {
                //if new locus, fill possible locus number list
                if (rootGetters["mgr/moduleItemName"] === "Locus") {
                    console.log("pkr.getters.loci NEW LOCUS");
                    return ([...Array(1000).keys()].map
                        (x => {
                            return {
                                id: null,
                                id_string: null,
                                locus_no: x
                            };
                        })
                    )

                } //otherwise, populate from all available loci for this area_season
                else {
                    console.log("pkr.getters.loci LOCI as part of new item");
                    return state.allLoci.map(item => {
                        let str1 = item.id_string.toString();
                        let sections = str1.split(".");
                        return {
                            id: item.id,
                            id_string: str1.slice(0, 8),
                            locus_no: parseInt(sections[2], 10)
                        };
                    });
                }

            } //populate loci from current collection
            else {

                console.log("pkr.getters.loci LOCI from current collection");// + JSON.stringify(item, null, 2));               
                return getters.collection
                    .filter(item => {
                        return item.id_string.slice(0, 4) == getters.area_season_id_string;
                    })
                    .map(item => {
                        let str1 = item.id_string.toString();
                        let sections = str1.split(".");
                        return {
                            locus_id: (rootGetters["mgr/moduleItemName"] === "Locus") ? item.id : item.locus_id,
                            id_string: str1.slice(0, 8),
                            locus_no: parseInt(sections[2], 10)
                        };
                    });
            }
        },

        finds(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/collection"]) {
                return null;
            }

            if (getters.isCreate) {

                //populate baskets[] and items[] with possible values
                return null;
            } else {
                console.log("pkr.finds locus_id: " + getters.locus_id + "\nfinds: " + JSON.stringify(rootGetters["mgr/collection"], null, 2));
                return rootGetters["mgr/collection"]
                    .filter(x => {
                        return x.locus_id == getters.locus.id;
                        //let id_str = item.id_string.toString()
                        //let locus_id_string = id_str.slice(0, 8);

                        //return locus_id_string === getters.locus_id_string;
                    })
                    /*
                    return rootGetters["mgr/collection"]
                        .filter(x => {
                            return x.locus_id == getters.locus_id;
                            //let id_str = item.id_string.toString()
                            //let locus_id_string = id_str.slice(0, 8);
    
                            //return locus_id_string === getters.locus_id_string;
                        })
                        */
                    .map(item => {
                        //console.log("mapping item: " + JSON.stringify(item, null, 2));
                        let str = item.id_string.toString();
                        let sections = str.split(".");
                        return {
                            id: item.id,
                            id_string: item.id_string,
                            locus_no: parseInt(sections[2], 10),
                            registration_category: sections[3],
                            basket_no: sections[4],
                            item_no: sections[5],
                            tag: str.slice(9)
                        };
                    })
                    ;
            }
        },



    },
    mutations: {
        area_season_id(state, payload) {
            state.data.area_season_id = payload;
        },

        locus_id(state, payload) {
            state.data.locus_id = payload;
        },
        locus_no(state, payload) {
            state.data.locus_no = payload;
            state.data.locus_id = null;
        },
        registration_category(state, payload) {
            state.data.registration_category = payload;
        },
        basket_no(state, payload) {
            state.data.basket_no = payload;
        },
        item_no(state, payload) {
            state.data.item_no = payload;
        },

        areasSeasons(state, payload) {
            state.dataExtra.areasSeasons = payload;
        },

        loci(state, payload) {
            state.dataExtra.loci = payload;
        },
        allLoci(state, payload) {
            state.dataExtra.loci = payload;
        },
        finds(state, payload) {
            state.dataExtra.finds = payload;
        },
        clear(state) {
            console.log("picker.clear()");
            state.area_season_id = null;

            state.data.locus_id = null;
            state.data.registration_category = null;
            state.data.basket_no = null;
            state.data.item_no = null;
            state.data.findable_type = null;
            state.data.findable_id = null;

            state.dataExtra.finds = null;
        }
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            if (getters["mgr/isCreate"] && getters["mgr/moduleItemName"] === "Locus") {

            } else {
                state.data.locus_no = null;
            }
        },
        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.locusSelected");
        },
        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },
        registrationCategorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },

        //will be called before the creation of a new item.
        //set defaults for new item here.
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            dispatch("areasSeasons");
        },

        //retrieve areasSeasons from DB
        areasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            if (state.dataExtra.areasSeasons) {
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
                    commit("areasSeasons", res.data.areas);
                    return res;
                })
                .catch(err => {
                    console.log('stp.areas Failed to load areas: ' + err);
                    return err;
                })
        },
        //retrieve all loci that belong to a specific areaSeason from DB
        areaSeasonLoci({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = {
                endpoint: `/api/areas/${state.data.area_season_id}/lociListForArea`,
                action: "get",
                data: null,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for area ${state.data.area_season_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("allLoci", res.data.lociForArea);
                    return res;
                })
                .catch(err => {
                    console.log('update Failed to load loci: ' + err);
                    return err;
                })
        },
        //retrieve all finds that belong to a specific locus from DB
        finds({ state, getters, commit, dispatch, rootGetters }) {
            let xhrRequest = {
                endpoint: `/api/loci/${state.data.locus.id}/findList`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${state.locus.id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("finds", res.data.finds);
                    return res;
                })
                .catch(err => {
                    console.log('findListForLocus Failed to load finds: ' + err);
                    return err;
                })
        },

    }
}
