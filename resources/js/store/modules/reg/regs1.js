import u from './regsUtil';
import p from './picker';
import n from './newItem';
export default {
    namespaced: true,

    modules: {
        p, n
    },

    state: {
        newItem: {
            areaSeasonIndex: null,
            locusIndex: null,
            findIndex: null,
            registration_categoryIndex: null,
            basket_noIndex: 0,
            artifact_noIndex: 0,
            piece_noIndex: 0,
            usePiece: false,
        },
        areasSeasonsObject: null,
        areasSeasonsKeys: [],
        lociObject: null,
        lociKeys: [],
        findsObject: null,
        findsKeys: [],
    },

    getters: {
        lists(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/lists"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/lists"];
            } else {
                return null;
            }
        },


        flags(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/flags"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/flags"];
            } else {
                return null;
            }
        },

        selected(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["regs/p/selected"];
            } else if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["regs/n/selected"];
            } else {
                return null;
            }
        },

   

    },
    mutations: {
        clear(state) {

        },
    },

    actions: {
        //create find only
        registration_categorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("registration_categoryIndex", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        basket_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("basket_noIndex", payload);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        artifact_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("artifact_noIndex", payload);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        piece_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("piece_noIndex", payload);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        usePiece({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("usePiece", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            u.loadAreasSeasons(commit, dispatch, payload)
        },

        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`regs/prepare(): ${rootGetters["mgr/module"]}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            commit("clear");
            commit("stp/disableNextButton", true, { root: true });

            if (rootGetters["mgr/status"].isLocus) {

            } else if (rootGetters["mgr/status"].isFind) {

            }
        },

     
        //copy data from registration module to new item (locus or find)
        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                commit("loci/registrationData", {
                    area_season_id: getters["areasSeasons"][state.newItem.areaSeasonIndex].id,
                    locus_no: getters["loci"][state.newItem.locusIndex].text,
                }, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                commit("fnd/registrationData", {
                    findable_type: rootGetters["mgr/module"],
                    locus_id: getters["loci"][state.newItem.locusIndex].id,
                    registration_category: getters["registrationCategories"][state.newItem.registration_categoryIndex].text,
                    basket_no: getters["basketNos"][state.newItem.basket_noIndex].value,
                    artifact_no: getters["artifactNos"][state.newItem.artifact_noIndex].value,
                    piece_no: state.newItem.usePiece ? getters["pieceNos"][state.newItem.piece_noIndex].value : 0,
                }, { root: true });
            }
        },
    }
}

