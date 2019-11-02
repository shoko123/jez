import loader from './loader';
import collection from './collection';
import allowed from './allowed';
import formatter from './formatter'

export default {
    namespaced: true,

    modules: {
        loader: loader,
        collection: collection,
        allowed: allowed,
        formatter: formatter,
    },

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
            scene_item: null,
        },
    },
    getters: {
        areasSeasons(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/isCreate"]) {
                return getters["fromDbAreasSeasons"];
            } else {
                return getters["fromCollectionAreasSeasons"];
            }
        },

        area_season_id(state) {
            //protected, used by module files only
            return state.data.area_season_id;
        },
        area(state, getters, rootState, rootGetters) {
            return getters["areaFormatter"];
        },

        loci(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/collection"] || !state.data.area_season_id || rootGetters["mgr/status"].isCreateLocus) {
                return null;
            }

            if (rootGetters["mgr/status"].isCreate) {
                return getters["fromDbAreaSeasonLoci"];
            }
            else {
                return getters["fromCollectionAreaSeasonLoci"];
            }
        },

        locus(state, getters, rootState, rootGetters) {
            return getters["locusFormatter"];
        },

        locusNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isUpdate) {
                return null;
            }
            if (!rootGetters["mgr/status"].isCreateLocus || !getters.area) {
                return null;
            }
            return getters["allowedLocusNos"];
        },

        locus_no(state) {
            return state.data.locus_no;
        },

        locus_id(state) {
            //protected, used by module files only.
            return state.data.locus_id;
        },


        finds(state, getters, rootState, rootGetters) {
            if (!state.data.locus_id) {
                return null;
            }

            if (rootGetters["mgr/isCreate"]) {
                return getters["fromDbLocusFinds"];
            } else {
                return getters["fromCollectionLocusFinds"];
            }
        },

        findable_type(state) {
            return state.data.findable_type;
        },

        findable_id(state) {
            return state.data.findable_id;
        },

        find(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/isFind"]) {
                return null;
            }
            return getters["findFormatter"];
        },

        
        registrationCategories(state, getters, rootState, rootGetters) {
            return getters.allowedRegistrationCategories;
        },
        registration_category(state) {
            return state.data.registration_category;
        },
        
        basketNos(state, getters, rootState, rootGetters) {
            return getters.allowedBasketNos;
        },

        basket_no(state) {
            return state.data.basket_no;
        },

        itemNos(state, getters, rootState, rootGetters) {
            return getters.allowedItemNos;
        },

        item_no(state) {
            return state.data.item_no;
        },

        item(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/moduleItemName"]) {
                case "Area":
                    return getters.area;
                case "Locus":
                    return getters.locus;
                case "Stone":
                    return getters.find;
                default:
                    return null
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

        findable_id(state, payload) {
            state.data.findable_id = payload;
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
        
        clear(state) {
            console.log("picker.clear()");
            state.data.area_season_id = null;
            state.data.locus_id = null;
            state.data.registration_category = null;
            state.data.basket_no = null;
            state.data.item_no = null;
            state.data.findable_type = null;
            state.data.findable_id = null;
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.areaSeasonSelected");
            if (rootGetters["mgr/status"].isCreate && rootGetters["mgr/isFind"]) {
                state.data.locus_id = null;//load loci
                dispatch("loadAreaSeasonLoci", state.data.area_season_id)
                    .then(res => { });

            } else {
                console.log("picker.areaSeasonSelected did not dispatch");
            }

        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.locusSelected");
            if (rootGetters["mgr/status"].isCreateFind) {
                dispatch("loadLocusFinds", state.data.locus_id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
            }
        },

        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },

        registrationCategorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.registrationCategorySelected");
            state.data.basket_no = state.data.item_no = null;
        },
        basketNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.basketNoSelected");
        },
        itemNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {

        },

        //will be called before the creation of a new item.
        //set defaults for new item here.
        prepareItem({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`picker.prepareItem(): ${rootGetters["mgr/moduleItemName"]}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            if (!rootGetters["mgr/status"].isCreate) {
                return;
            }

            if (rootGetters["mgr/status"].isLocus) {
                //////locus/////
                state.data.area_season_id = rootGetters["mgr/item"].area_id;
                state.data.locus_no = null;
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.data.area_season_id)
            } else if (rootGetters["mgr/status"].isFind) {
                //////find/////
                state.data.area_season_id = rootGetters["mgr/item"].area_id;
                state.data.findable_type = rootGetters["mgr/status"].moduleItemName;
                //dispatch("areaSeasonLoci")
                dispatch("loadAreaSeasonLoci", state.data.area_season_id)
                    .then(res => {
                        state.data.locus_id = rootGetters["mgr/item"].locus_id;
                        state.data.registration_category = state.data.basket_no = state.data.item_no = null;
                        dispatch("loadLocusFinds", state.data.locus_id)
                            .then(res => {
                                if (getters["fromDbLocusFinds"]) {
                                    state.data.registration_category = getters["fromDbLocusFinds"][0].registration_category;
                                }
                            });
                    })
            }
        },

    }
}
