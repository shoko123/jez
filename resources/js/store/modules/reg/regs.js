import { normalize, schema } from 'normalizr';
import registrationUtility from './registrationUtility';

export default {
    namespaced: true,

    state: {
        newItem: {
            //new
            areaSeasonIndex: null,
            locusIndex: null,
            findIndex: null,

            registration_category: null,
            basket_no: null,
            artifact_no: null,
            piece_no: null
        },
        //new
        areasSeasonsObject: null,
        areasSeasonsKeys: [],
        lociObject: null,
        lociKeys: [],
        findsObject: null,
        findsKeys: [],
    },

    getters: {
        status(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                if (rootGetters["mgr/status"].isLocus) {
                    return {
                        ready: state.newItem.locusIndex !== null,
                        itemId: state.newItem.locusIndex !== null ? getters["loci"][state.newItem.locusIndex].value : null
                    };
                } else if (rootGetters["mgr/status"].isFind) {
                    return {
                        ready: state.newItem.findIndex !== null,
                        itemId: state.newItem.findIndex !== null ? getters["finds"][state.newItem.findIndex].value : null
                    };
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    return {
                        ready: state.newItem.locusIndex !== null,
                        itemId: state.newItem.locusIndex !== null ? getters["loci"][state.newItem.locusIndex].value : null
                    };
                } else if (rootGetters["mgr/status"].isFind) {
                    //complex logic
                }
            }
        },
        areasSeasons(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                if (rootGetters["mgr/status"].isLocus) {
                    //get distinct areasSesons object in collection.
                    const areasSeasonFromCollection = [...new Map(rootGetters["mgr/collection"].map(item =>
                        [item.area_season_id, item])).values()];
                    //format them
                    return areasSeasonFromCollection.map(function (x) {
                        let tag = x.tag.split('\/')[0] + '/' + x.tag.split('\/')[1];
                        return { value: x.area_season_id, text: tag };
                    });
                } else if (rootGetters["mgr/status"].isFind) {
                    //get distinct areasSesons object in collection.
                    const areasSeasonFromCollection = [...new Map(rootGetters["mgr/collection"].map(item =>
                        [item['tag'].slice(0, 4), item])).values()];

                    //format them
                    return areasSeasonFromCollection.map(function (x) {
                        let tag = x.tag.split('\/')[0] + '/' + x.tag.split('\/')[1];
                        return { value: tag, text: tag };
                    });
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                return state.areasSeasonsKeys.map(function (x, index) { return { value: index, text: state.areasSeasonsObject[x].tag, id: state.areasSeasonsObject[x].id } })
            }
            return [];
        },

        loci(state, getters, rootState, rootGetters) {
            if (state.newItem.areaSeasonIndex === null) { return [] }
            if (rootGetters["mgr/status"].isPicker) {
                //get all loci with selected area.
                if (rootGetters["mgr/status"].isLocus) {
                    return rootGetters["mgr/collection"]
                        .filter(x => x.area_season_id === getters["areasSeasons"][state.newItem.areaSeasonIndex].value)
                        .map(y => { return { value: y.id, text: y.locus_no, }; });

                } else if (rootGetters["mgr/status"].isFind) {
                    let lociForAreaSeason = rootGetters["mgr/collection"]
                        .filter(x => x.tag.slice(0, 4) === getters["areasSeasons"][state.newItem.areaSeasonIndex].value)

                    //console.log("getters/loci:\n" + JSON.stringify(lociForAreaSeason, null, 2));

                    //get distinct loci objects from result above.               
                    const lociFromCollection = [...new Map(lociForAreaSeason.map(item =>
                        [item['tag'].split('.')[0], item])).values()];

                    //format them
                    return lociFromCollection.map(function (x) {
                        let tag = x.tag.split('.')[0];
                        return { value: x.locus_id, text: tag.split('\/')[2] };
                    });
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    let oneTo999 = [...Array(1000).keys()];
                    //remove existing loci
                    let possibleLocusNos = oneTo999.filter(x => { return !state.lociKeys.some(y => state.lociObject[y].locus_no === x); });                
                    return possibleLocusNos.map(function (x, index) { return { value: index, text: x } });
                } else if (rootGetters["mgr/status"].isFind) {
                    return state.lociKeys.map(x => { return { value: x, text: state.lociObject[x].locus_no, id: state.lociObject[x].id } });
                }
            }
            return [];
        },



        finds(state, getters, rootState, rootGetters) {
            if ((!rootGetters["mgr/status"].isFind) || state.newItem.locusIndex === null) { return [] }
            if (rootGetters["mgr/status"].isPicker) {
                return rootGetters["mgr/collection"]
                    .filter(x => x.locus_id === getters["loci"][state.newItem.locusIndex].value)
                    .map(y => { return { value: y.id, text: y.tag, }; });
            } else if (rootGetters["mgr/status"].isCreate) {
                return state.findsKeys.map(x => state.findsObject[x].tag);
            }
            return [];
        },


        registrationOption(state) {
            return state.newItem.registrationOption;
        },

        newItem(state) {
            return state.newItem;
        },
    },
    mutations: {

        areasSeasonsObject(state, payload) {
            //console.log("loader.commit areasSeasons: " + JSON.stringify(payload, null, 2));            
            state.areasSeasonsObject = payload;
        },
        areasSeasonsKeys(state, payload) {
            //console.log("loader.commit areasSeasons: " + JSON.stringify(payload, null, 2));            
            state.areasSeasonsKeys = payload;
        },

        areaSeasonIndex(state, payload) {
            console.log("regs/areaSeasonIndex.set:  " + JSON.stringify(payload, null, 2));
            state.newItem.areaSeasonIndex = payload;
        },

        lociObject(state, payload) {
            state.lociObject = payload;
        },
        lociKeys(state, payload) {
            state.lociKeys = payload;
        },
        locusIndex(state, payload) {
            console.log("regs/locusIndex.set:  " + payload);
            state.newItem.locusIndex = payload;
        },

        findsObject(state, payload) {
            state.findsObject = payload;
        },
        findsKeys(state, payload) {
            state.findsKeys = payload;
        },

        findIndex(state, payload) {
            console.log("regs/findIndex.set:  " + payload);
            state.newItem.findIndex = payload;
        },

        registrationOption(state, payload) {
            state.newItem.registrationOption = payload;
        },

        basket_no(state, payload) {
            //console.log("regs/basket_no.set( " + payload + " )");
            state.newItem.basket_no = payload;
        },

        artifact_no(state, payload) {
            //console.log("regs/artifact_no.set( " + payload + " )");
            state.newItem.artifact_no = payload;
        },
        piece_no(state, payload) {
            //console.log("regs/artifact_no.set( " + payload + " )");
            state.newItem.piece_no = payload;
        },

        clear(state) {
            console.log("regs.clear()");

            state.newItem.areaSeasonIndex = null;
            state.newItem.locusIndex = null;
            state.newItem.findIndex = null;

            state.newItem.registration_category = null;
            state.newItem.basket_no = null;
            state.newItem.artifact_no = null;
            state.newItem.piece_no = null;
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            //so all left to be done is reset locus_id.
            //area_season_id is already set by the two way binding with the element locus
            console.log("regs/areaSeasonSelected");
            commit("areaSeasonIndex", payload);
            commit("stp/disableNextButton", false, { root: true });
            commit("locusIndex", null);
            commit("findIndex", null);
            //commit("stp/disableNextButton", true, { root: true });

            if (rootGetters["mgr/status"].isCreate) {
                dispatch("loadAreaSeasonLoci", getters["areasSeasons"][state.newItem.areaSeasonIndex].id);
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/locusSelected");
            commit("locusIndex", payload);

           
            if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    commit("stp/disableNextButton", false, { root: true });
                } else if (rootGetters["mgr/status"].isFind) {
                    commit("findIndex", null);
                     dispatch("loadLocusFinds", getters["loci"][state.newItem.locusIndex].id)
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
                }
            }
        },

        //picker
        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/findSelected");
            commit("findIndex", payload);
        },

        //registrar
        registrationOptionSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/registrationOptionSelected: " + JSON.stringify(payload, null, 2));
            commit("registrationOption", payload);
            commit("stp/disableNextButton", true, { root: true });

        },
        basketNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/basketNoSelected");
            commit("basket_no", payload);
            commit("stp/disableNextButton", !getters.regs.ready, { root: true })
        },
        artifactNoSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs/artifactNoSelected");
            commit("artifact_no", payload);
            commit("stp/disableNextButton", !getters.regs.ready, { root: true });
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("regs.loadAreasSeasons() area_season_id: " + payload);

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
                    dispatch("normalizeAreasSeasons", res.data.collection);
                    return res;
                })
        },

        normalizeAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            const areaSeasonSchema = new schema.Entity('areaSeason');
            const areasSeasonsSchema = new schema.Array(areaSeasonSchema);
            let normalizedData = normalize(payload, areasSeasonsSchema);

            //console.log('normalizeAreasSeasons: ' + JSON.stringify(normalizedData, null, 2));
            commit("areasSeasonsObject", normalizedData.entities.areaSeason);
            commit("areasSeasonsKeys", normalizedData.result);
        },


        loadAreaSeasonLoci({ state, getters, commit, dispatch, rootGetters }, area_season_id) {
            let xhrRequest = {
                endpoint: `/api/areas/${area_season_id}/areaLoci`,
                action: "get",
                data: null,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for areaSeason ${area_season_id}`, onSuccess: null, onFailure: null, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    dispatch("normalizeLoci", res.data.lociForArea);
                    return res;
                })
        },

        normalizeLoci({ commit }, payload) {
            const locusSchema = new schema.Entity('locus');
            const lociSchema = new schema.Array(locusSchema);
            let normalizedData = normalize(payload, lociSchema);
            //console.log('normalizeLoci: ' + JSON.stringify(normalizedData, null, 2));
            commit("lociObject", normalizedData.entities.locus);
            commit("lociKeys", normalizedData.result);
        },

        loadLocusFinds({ state, getters, commit, dispatch, rootGetters }, locus_id) {
            let xhrRequest = {
                endpoint: `/api/loci/${locus_id}/finds?find_type=${rootGetters["mgr/appStatus"].module}`,
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
                    dispatch("normalizeFinds", res.data.finds);
                    return res;
                })
        },

        normalizeFinds({ commit }, payload) {
            console.log('normalizeFinds payload: ' + JSON.stringify(payload, null, 2));
            const findSchema = new schema.Entity('find', {}, {
                idAttribute: (value, parent, key) => (`${value.findable_type}(${value.findable_id})`)
            });

            const findsSchema = new schema.Array(findSchema);
            let normalizedData = normalize(payload, findsSchema);
            console.log('normalizeFinds: ' + JSON.stringify(normalizedData, null, 2));
            commit("findsObject", normalizedData.entities.find);
            commit("findsKeys", normalizedData.result);
        },

        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`regs/prepare(): ${rootGetters["mgr/appStatus"].module}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            commit("clear");
            commit("stp/disableNextButton", true, { root: true });
            if (state.areasSeasonsObject === null) {
                dispatch("loadAreasSeasons", null);
            }
            if (rootGetters["mgr/status"].isLocus) {

                //////locus////
                /*
                let areaSeason = state.areasSeasons.find(x => {
                    return x.id === rootGetters["mgr/item"].area_season.id;
                });
                commit("areaSeason", areaSeason);
                dispatch("loadAreaSeasonLoci", state.newItem.areaSeason.id)
                */
            } else if (rootGetters["mgr/status"].isFind) {

                //////find/////
                //save  registration options locally
                /*
                commit("registrationOptions", rootGetters["mgr/moduleInfo"].registrationOptions);

                let item = rootGetters["mgr/item"];
                let find = rootGetters["fnd/find"];
                let tag = item.tag;
                let areaSeasonTag = tag.split('\/')[0] + '/' + tag.split('\/')[1];
                let locusTag = tag.split('.')[0];
                let locus_no = parseInt(locusTag.split('\/')[2]);
                let registration_category = tag.split('.')[1];

                commit("areaSeason", { id: item.area_season_id, tag: areaSeasonTag });
                commit("locus", { id: item.locus_id, locus_no: locus_no, tag: locusTag });

                //commit("registration_category", registration_category);
                commit("basket_no", null);
                commit("artifact_no", null);

                dispatch("loadAreaSeasonLoci", state.newItem.areaSeason.id)
                    .then(res => {
                        dispatch("loadLocusFinds", state.newItem.locus.id);
                    })
                    */
            }
        },

        //called before picker is displayed; put default behaviour here
        preparePicker({ state, getters, rootGetters, commit, dispatch }) {
            console.log("preparePicker - clear()");
            commit("clear");
            if (rootGetters["mgr/status"].isFind) {

            }
        },

        //copies data from registration module to new item (locus or find)
        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                commit("loci/registrationData", {
                    area_season_id: getters["areasSeasons"][state.newItem.areaSeasonIndex].id,
                    locus_no:  getters["loci"][state.newItem.locusIndex].text,
                }, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                commit("fnd/registrationData", {
                    findable_type: rootGetters["mgr/appStatus"].module,
                    locus_id: state.newItem.locus.id,
                    registration_category: state.newItem.registrationOption.registration_category,
                    basket_no: state.newItem.find.basket_no,
                    artifact_no: state.newItem.find.artifact_no,
                    piece_no: state.newItem.find.piece_no,

                }, { root: true });
            }
        },
    }
}
