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
            areaSeason: null,
            locus: null,
            areasSeasons: [],
            loci: [],
            finds: [],
        }
    },
    getters: {
        area_season_id(state) {
            return state.data.area_season_id;
        },
        locus_id(state) {
            return state.data.locus_id;
        },
        locus_no(state) {
            return state.data.locus_no;
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



        areaSeason(state) {
            return state.dataExtra.areaSeason;
        },
        locus(state) {
            return state.dataExtra.locus;
        },
        selectedItemId(state) {
            if (!state.dataExtra.locus) {
                return null;
            }
            return state.dataExtra.locus.id;
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

        areasSeasons(state, getters, rootState, rootGetters) {
            //if (!getters.collection) {
            //    return state.areasSeasons;
            //}

            if (getters.isCreate || !getters.collection) {
                return state.dataExtra.areasSeasons.map(x => {
                    return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
                });
            } else {

                //console.log('pkr/areasSeasons: ' + JSON.stringify(myAreasSeasons, null, 2));
                //return areasSeasons;
                return [
                    ...new Set(
                        getters.collection.map(item => {
                            let str = item.id_string.toString();
                            let sections = str.split(".");
                            return { id: item.area_id, id_string: str.slice(0, 4), tag: sections[0] + "/" + sections[1] };
                        })
                    )
                ];
            }
        },

        loci(state, getters, rootState, rootGetters) {
            if (!getters.collection) {
                return null;
            }

            if (getters.isCreate) {
                return null;
            } else {
                if (!getters.areaSeason) {
                    return null;
                }

                return getters.collection
                    .filter(item => {
                        let str = item.id_string.toString();
                        let sections = str.split(".");
                        return sections[0] + "/" + sections[1] === getters.areaSeason.tag;
                    })
                    .map(item => {
                        let str1 = item.id_string.toString();
                        let sections = str1.split(".");
                        return {
                            id: item.id,
                            id_string: str1.slice(0, 8),
                            locus_no: parseInt(sections[2], 10)
                        };
                    })
                    ;
            }
        },

        finds(state, getters, rootState, rootGetters) {
            if (!getters.collection) {
                return null;
            }

            if (getters.isCreate) {
                return null;
            } else {
                if (!state.dataExtra.locus) {
                    return null;
                }

                return getters.collection
                    .filter(item => {
                        let id_str = item.id_string.toString()
                        let locus_id_string = id_str.slice(0, 8);

                        return locus_id_string === getters.locus.id_string;
                    })
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

        areaSeason(state, payload) {
            state.dataExtra.areaSeason = payload;
        },

        locus(state, payload) {
            state.dataExtra.locus = payload;
        },
        areasSeasons(state, payload) {
            state.dataExtra.areasSeasons = payload;
        },

        loci(state, payload) {
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

            state.dataExtra.areaSeason = null;
            state.dataExtra.locus = null;
            state.dataExtra.finds = null;
        }
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            state.dataExtra.locus = null;
        },
        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //dispatch('finds');
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
                endpoint: `/api/areas/${state.data.areaSeason.id}/lociListForArea`,
                action: "get",
                data: null,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for area ${state.areaSeason.id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("loci", res.data.lociForArea);
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
