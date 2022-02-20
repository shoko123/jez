import u from './regsUtil';

export default {
    namespaced: true,

    state: {
        selected: {
            areaSeason: null,
            locus: null,
            registration_category: null,
            basket: 0,
            artifact: 0,
            piece: 0,
        },

        usePiece: false,

        existingAreasSeasons: [],
        existingLoci: [],
        existingFinds: [],
    },

    getters: {
        module(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/status"].module;
        },

        lists(state, getters) {
            return {
                areasSeasons: getters.areasSeasons,
                loci: getters.loci,
                registrationCategories: getters.registrationCategories,
                basketNos: getters.basketNos,
                artifactNos: getters.artifactNos,
                pieceNos: getters.pieceNos
            };
        },

        flags(state, getters, rootState, rootGetters) {
            return {
                isSelected: {
                    areaSeason: state.selected.areaSeason !== null,
                    locus: state.selected.locus !== null,
                    find: state.selected.find !== null,
                    registration_category: state.selected.registration_category !== null,
                    basket_no: state.selected.basket_no !== null,
                    artifact_no: state.selected.artifact_no !== null,
                    piece_no: state.selected.piece_no !== null,
                },
                isReady: (
                    (rootGetters["mgr/status"].isAreaSeason && state.selected.areaSeason !== null) ||
                    (rootGetters["mgr/status"].isLocus && state.selected.locus !== null) ||
                    (rootGetters["mgr/status"].isFind && state.selected.find !== null)),

            };
        },

        selected(state, getters, rootState, rootGetters) {
            if (getters.flags.isReady) {
                let item = null;
                if (rootGetters["mgr/status"].isAreaSeason) {
                    item = "***";//state.selected.areaSeason.dot;
                } else if (rootGetters["mgr/status"].isLocus) {
                    item = "***";//state.selected.locus.dot;
                } else if (rootGetters["mgr/status"].isFind) {
                    item = "***";//state.selected.find.dot;
                }
                return { ...state.selected, dot: item };
            }
            return state.selected;
        },


        areasSeasons(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate) {
                return [];
            }
            return state.areasSeasons;
        },

        loci(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate ||
                rootGetters["mgr/status"].isAreaSeason ||
                state.selected.areaSeason === null) { return [] }

        },

       
        registrationCategories(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return rootGetters["mgr/status"].moduleRegistrationOptions.map(x => { return { text: x } });
        },

        //always show all baskets
        basketNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return [];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            return arr1;
        },

        artifactNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return [];

            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            //if using piece_no, allow all artifacts
            if (state.newItem.usePiece) {
                arr1[0] = { value: 0, text: "None Selected" };
                return arr1;
            }

            //take away already existing artifacts
            //if basket selected, allow only artifact that don't already exist in basket.
            //B - basket_no
            let B = getters["basketNos"][state.newItem.basket_noIndex].value;

            state.findsKeys.forEach(function (x, index) {
                let find = state.findsObject[x];
                console.log("find for locus: " + JSON.stringify(find, null, 2));

                //remove artifact only when it has the same reregistration_category and basket_no
                if (find.registration_category === getters["registrationCategories"][state.newItem.registration_categoryIndex].text &&
                    find.basket_no === B) {
                    let index = arr1.map(x => x.value).indexOf(find.artifact_no);
                    console.log(`removing basket ${B} artifact ${find.artifact_no}`);
                    arr1.splice(index, 1);
                }
            })
            return arr1;
        },

        pieceNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return [];

            if (!state.newItem.usePiece) return [{ value: null }];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };

            state.findsKeys.forEach(x => {
                let find = state.findsObject[x];
                console.log("finds for locus: " + JSON.stringify(find, null, 2));

                //remove piece when it has the same reregistration_category, basket_no, and artifact_no
                if (find.registration_category === getters["registrationCategories"][state.newItem.registration_categoryIndex].text &&
                    find.basket_no === getters["basketNos"][state.newItem.basket_noIndex].value &&
                    find.artifact_no === getters["artifactNos"][state.newItem.artifact_noIndex].value) {
                    //
                    let index = arr1.map(x => x.value).indexOf(find.piece_no);
                    console.log("removing pieces no. " + find.piece_no);
                    arr1.splice(index, 1);
                }
            })

            return arr1;
        }, 
        
        showRegistrarFindDetails(state, getters, rootState, rootGetters) {
            return false;
            return (rootGetters["mgr/status"].isCreate &&
                rootGetters["mgr/status"].isFind &&
                state.newItem.locusIndex !== null &&
                state.newItem.areaSeasonIndex !== null);
        },

        usePiece(state) {
            return state.usePiece;
        },

    },

    mutations: {
        areaSeason(state, payload) {
            state.selected.areaSeason = payload;
        },
        locus(state, payload) {
            state.selected.locus = payload;
        },


        basket(state, payload) {
            state.selected.basket = payload;
        },
        artifact(state, payload) {
            state.selected.artifact = payload;
        }, 
        piece(state, payload) {
            state.selected.piece = payload;
        },
        usePiece(state, payload) {
            state.usePiece = payload;
        },

        clear(state, payload) {
            state.selected[payload] = null;
        },
        clearAll(state, payload) {
            //console.log("regs.clear()");
            state.selected.areaSeason = null;
            state.selected.locus = null;
            state.selected.find = null;
            state.loci = [];
            state.finds = [];
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            //so all left to be done is reset locus_id.
            //area_season_id is already set by the two way binding with the element locus
            //console.log("regs/areaSeasonSelected");
            commit("areaSeasonIndex", payload);
            commit("stp/disableNextButton", true, { root: true });//Because we now need to reselect locus/find.
            commit("locusIndex", null);
            commit("findIndex", null);

            if (rootGetters["mgr/status"].isCreate) {
                u.Loci(commit, dispatch, getters["areasSeasons"][state.newItem.areaSeasonIndex].id);
            } else {
                //console.log(`picker areaSeason selected loci.length: ${getters["loci"].length}`);
                //if picker and loci contain only one item, select it.
                if (getters["loci"].length === 1) {
                    dispatch("locusSelected", 0);
                }
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //console.log("regs/locusSelected");
            commit("locusIndex", payload);

            if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    commit("stp/disableNextButton", false, { root: true });
                } else if (rootGetters["mgr/status"].isFind) {
                    commit("findIndex", null);
                    commit("registration_categoryIndex", 0);
                    commit("basket_noIndex", 0);
                    commit("artifact_noIndex", 0);
                    commit("piece_noIndex", 0);
                    u.loadLocusFinds(rootGetters, commit, dispatch, getters["loci"][state.newItem.locusIndex].id)
                        .then(res => {
                            console.log("picker.afterlocusFinds returned");
                        });
                }
            } else {
                commit("findIndex", null);
                //console.log(`picker locus selected finds.length: ${getters["finds"].length}`);
                //if picker and finds contain only one item, select it.
                if (getters["finds"].length === 1) {
                    dispatch("findSelected", 0);
                }
            }
        },

       

        //create find only
        registration_categorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("registration_categoryIndex", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        basketSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("basket_noIndex", payload);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        artifactSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("artifact_noIndex", payload);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        pieceSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("piece_noIndex", payload);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        usePiece({ state, getters, commit, dispatch, rootGetters }, payload) {
            /*
            commit("usePiece", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
            */
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            //u.loadAreasSeasons(commit, dispatch, payload)
        },

        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepareCreate({ state, getters, commit, dispatch, rootGetters }) {
            console.log(`regs/newItem.prepareCreate()`);
            commit("clear");
            if (state.areasSeasons.length === 0) {
                u.loadAreasSeasons(commit, dispatch);
            }

        },
        prepareUpdate({ state, getters, commit, dispatch, rootGetters }, registration) {
            console.log(`regs/newItem.prepareUpdate(): ${rootGetters["mgr/module"]}: ${JSON.stringify(registration, null, 2)}`);
            commit("clear");
            if (state.areasSeasons.length === 0) {
                u.loadAreasSeasons(commit, dispatch);
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

