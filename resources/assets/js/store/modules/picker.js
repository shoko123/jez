export default {
    namespaced: true,
    state: {
        area_season_id: null,
        
        locus_id: null,
        registration_category: null,
        basket_no: null,
        item_no: null,
        findable_type: null,
        findable_id: null,

        areaSeason: null,
        locus: null,
        areasSeasons: [],
        loci: [],
        finds: [],

    },
    getters: {


        area_season_id(state) {
            return state.area_season_id;
        },
        locus_id(state) {
            return state.locus_id;
        },
        registration_category(state) {
            return state.registration_category;
        },
        basket_no(state) {
            return state.basket_no;
        },
        item_no(state) {
            return state.item_no;
        },


        
        areaSeason(state) {
            return state.areaSeason;
        },
        locus(state) {
            return state.locus;
        },
        selectedItemId(state) {
            if (!state.locus) {
                return null;
            }
            return state.locus.id;
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

        tag(state) {
            return state.id_string;
        },



        areasSeasons(state, getters, rootState, rootGetters) {
            if (!getters.collection) {
                return null;
            }

            if (getters.isCreate) {
                return state.areasSeasons;
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
                if (!getters.locus) {
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
            state.area_season_id = payload;
        },
        locus_id(state, payload) {
            state.locus_id = payload;
        },
        registration_category(state, payload) {
            state.registration_category = payload;
        },
        basket_no(state, payload) {
            state.basket_no = payload;
        },
        item_no(state, payload) {
            state.item_no = payload;
        },
        
        areaSeason(state, payload) {
            state.areaSeason = payload;
        },

        locus(state, payload) {
            state.locus = payload;
        },
        areasSeasons(state, payload) {
            state.areasSeasons = payload;
        },

        loci(state, payload) {
            state.loci = payload;
        },
        finds(state, payload) {
            state.finds = payload;
        },
        clear(state) {
            console.log("picker.clear()");
            state.area_season_id = null;
        
            state.locus_id = null;
            state.registration_category = null;
            state.basket_no = null;
            state.item_no = null;
            state.findable_type = null;
            state.findable_id = null;
    
            state.areaSeason = null;
            state.locus = null;   
            state.finds = null;       
        }
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            state.locus = null;
        },
        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //dispatch('finds');
        },
        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },
        registrationCategorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {

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
                endpoint: `/api/areas/${state.areaSeason.id}/lociListForArea`,
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
                endpoint: `/api/loci/${state.locus.id}/findList`,
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
