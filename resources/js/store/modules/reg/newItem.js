import u from './regsUtil';

export default {
    namespaced: true,

    state: {
        selected: {
            areaSeason: null,
            locus: null,
            registration_category: null,
            basket: null,
            artifact: null,
        },

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
            };
        },

        flags(state, getters, rootState, rootGetters) {
            return {
                isSelected: {
                    areaSeason: state.selected.areaSeason !== null,
                    locus: state.selected.locus !== null,
                    find: state.selected.find !== null,
                    registration_category: state.selected.registration_category !== null,
                    basket: state.selected.basket !== null,
                    artifact: state.selected.artifact !== null,
                },
                isReady: (
                    (rootGetters["mgr/status"].isAreaSeason && state.selected.areaSeason !== null) ||
                    (rootGetters["mgr/status"].isLocus && state.selected.locus !== null) ||
                    (rootGetters["mgr/status"].isFind && ((state.selected.basket !== null && state.selected.basket.value !== 0) || (state.selected.artifact !== null && state.selected.artifact.value !== 0)))),
                showFindRegistration: rootGetters["mgr/status"].isFind && state.selected.areaSeason && state.selected.locus

            };
        },

        selected(state, getters, rootState, rootGetters) {
            if (getters.flags.isReady) {
                let item = null;
                if (rootGetters["mgr/status"].isAreaSeason) {
                    item = { dot: state.selected.areaSeason.dot, tag: state.selected.areaSeason.dot.replaceAll('.', '/'), id: state.selected.areaSeason.id };
                } else if (rootGetters["mgr/status"].isLocus) {
                    item = { dot: state.selected.locus.dot, tag: state.selected.locus.dot.replaceAll('.', '/'), id: state.selected.locus.id };
                } else if (rootGetters["mgr/status"].isFind) {
                    item = {
                        dot: state.selected.locus.dot + '.' + state.selected.registration_category.value + '.' + state.selected.basket.value + '.' + state.selected.artifact.value,
                        tag: state.selected.locus.dot.replaceAll('.', '/') + '.' + state.selected.registration_category.value + '.' + state.selected.basket.value + '.' + state.selected.artifact.value,
                        locus_id: state.selected.locus.id,
                        registration_category: state.selected.registration_category.value,
                        basket_no: state.selected.basket.value,
                        artifact_no: state.selected.artifact.value
                    };
                }
                return { ...state.selected, item };
            }
            return state.selected;
        },


        areasSeasons(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate) {
                return [];
            }
            return state.existingAreasSeasons.map(x => { return { id: x.id, dot: x.dot, text: x.dot.replace('.', '/') } });
        },

        loci(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate ||
                rootGetters["mgr/status"].isAreaSeason ||
                state.selected.areaSeason === null) { return [] }
            if (rootGetters["mgr/status"].isLocus) {
                if (state.selected.areaSeason == null) {
                    return [];
                }
                //possible new locus numbers to choose from
                let zeroTo999 = [...Array(1000).keys()];
                //remove existing loci
                let possibleLocusNos = zeroTo999.filter(x => { return !state.existingLoci.some(y => y.locus_no === x); });
                return possibleLocusNos.map(x => { return {  value: x,  dot: state.selected.areaSeason.dot + '.' + x, text: x} })
            } else if (rootGetters["mgr/status"].isFind) {
                if (state.selected.areaSeason == null) {
                    return [];
                }
                return state.existingLoci.map(x => { return { id: x.id, dot: x.dot, text: x.locus_no } });
            }
        },


        registrationCategories(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return rootGetters["mgr/status"].moduleRegistrationOptions.map(x => { return { value: x, text: x } });
        },

        basketNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind || state.selected.locus == null) return [];

            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            return arr1;
        },

        artifactNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            //console.log("selected: " + JSON.stringify(state.selected, null, 2));
            state.existingFinds.forEach(function (x, index) {
                console.log("find for locus: " + JSON.stringify(x, null, 2));

                //remove artifact only when it has the same registration_category, basket, and artifact
                if (x.registration_category === state.selected.registration_category.value &&
                    x.basket_no === state.selected.basket.value) {
                    console.log(`removing artifact no ${x.artifact_no}`);
                    const indexToRemove = arr1.findIndex(y => y.value === x.artifact_no);
                    arr1.splice(indexToRemove, 1);
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
    },

    mutations: {
        existingAreasSeasons(state, payload) {
            state.existingAreasSeasons = payload;
        },
        existingLoci(state, payload) {
            state.existingLoci = payload;
        },

        existingFinds(state, payload) {
            state.existingFinds = payload;
        },

        setSelected(state, payload) {
            state.selected[payload.name] = payload.data;
        },

        clearAll(state, payload) {
            //console.log("regs.clear()");
            state.selected.areaSeason = null;
            state.selected.locus = null;
            state.selected.registration_category = null;
            state.selected.basket = null;
            state.selected.artifact = null;
            state.existingAreasSeasons = [];
            state.existingLoci = [];
            state.existingFinds = [];
        },
    },

    actions: {
        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`regs/newItem.prepare(). isUpdate: ${payload}`);
            commit("clearAll");
            if (!payload && state.existingAreasSeasons.length === 0) {
                console.log(`regs/newItem(create). existingAreasSeason[] is empty - loading`);
                return dispatch('loadAreasSeasons');
            }

        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs.loadAreasSeasons()");

            let xhrRequest = {
                endpoint: `/api/areas-seasons`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading areas/seasons", onSuccess: null, onFailure: "failed loading areas/seasons", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    commit("existingAreasSeasons", res.data.collection);
                })
        },

        loadAreaSeasonLoci({ state, commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/areas-seasons/${state.selected.areaSeason.id}/loci`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for areaSeason ${state.selected.areaSeason.id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("existingLoci", res.data.lociForArea);
                })
        },

        loadLocusFinds({ state, getters, rootGetters, commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/loci/${state.selected.locus.id}/finds?find_type=${rootGetters["mgr/module"]}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${state.selected.locus.dot}`, onSuccess: null, onFailure: null, },
            };
            console.log('loadLocusFinds xhrRequest: ' + JSON.stringify(xhrRequest, null, 2));
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("existingFinds", res.data.finds);
                })
        },

        selected({ state, getters, commit, dispatch, rootGetters }, payload) {
            dispatch(`${payload.name}Selected`, payload.data);
        },

        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`newItem/areaSeasonSelected payload: ${JSON.stringify(payload, null, 2)}`);

            commit("setSelected", { name: "areaSeason", data: payload });
            commit("existingLoci", []);
            commit("existingFinds", []);
            commit("stp/disableNextButton", true, { root: true });
            if (rootGetters["mgr/status"].isLocus) {
                commit("setSelected", { name: "locus", data: null });

            } else if (rootGetters["mgr/status"].isFind) {

                commit("setSelected", { name: "locus", data: null });
                //commit("setSelected", {name: "registration_category", payload});
                commit("setSelected", { name: "basket", data: null });
                commit("setSelected", { name: "artifact", data: null });
            }
            if (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind) {
                dispatch("loadAreaSeasonLoci");
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`newItem/locusSelected payload: ${JSON.stringify(payload, null, 2)}`);

            commit("setSelected", { name: "locus", data: payload });

            commit("existingFinds", []);
            if (rootGetters["mgr/status"].isLocus) {
                commit("stp/disableNextButton", false, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                //commit("setSelected", {name: "registration_category", payload});
                commit("setSelected", { name: "basket", data: getters.basketNos[0] });
                commit("setSelected", { name: "artifact", data: getters.artifactNos[0] });
                commit("stp/disableNextButton", !getters.flags.isReady, { root: true });
                dispatch("loadLocusFinds");
                dispatch("registration_categorySelected", getters.registrationCategories[0]);
            }
        },

        registration_categorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`newItem/registration_categorySelected payload: ${JSON.stringify(payload, null, 2)}`);
            commit("setSelected", { name: "registration_category", data: payload });
            commit("setSelected", { name: "basket", data: getters.basketNos[0] });
            commit("setSelected", { name: "artifact", data: getters.artifactNos[0] });
            commit("stp/disableNextButton", !getters.flags.isReady, { root: true });
        },
        basketSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`newItem/basketSelected payload: ${JSON.stringify(payload, null, 2)}`);
            commit("setSelected", { name: "basket", data: payload });
            commit("setSelected", { name: "artifact", data: getters.artifactNos[0] });
            commit("stp/disableNextButton", !getters.flags.isReady, { root: true });
        },
        artifactSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log(`newItem/artifactSelected payload: ${JSON.stringify(payload, null, 2)}`);
            commit("setSelected", { name: "artifact", data: payload });
            commit("stp/disableNextButton", !getters.flags.isReady, { root: true });
        },

        //copy data from registration module to new item (locus or find)
        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                commit("loci/registrationData", {
                    area_season_id: state.selected.areaSeason.id,
                    locus_no: state.selected.locus.value,
                }, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                commit("fnd/registrationData", {
                    findable_type: rootGetters["mgr/module"],
                    locus_id: state.selected.locus.id,
                    registration_category: state.selected.registration_category.value,
                    basket_no: state.selected.basket.value,
                    artifact_no: state.selected.artifact.value,
                }, { root: true });
            }
        },
    }
}

