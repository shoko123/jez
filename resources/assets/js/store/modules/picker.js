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
            areaLociAll: [],
            loci: [],
            finds: [],
        },
    },
    getters: {
        areasSeasons(state, getters, rootState, rootGetters) {
            if (!state.dataExtra.areasSeasons) {
                return null;
            }
            let areasSeasons = state.dataExtra.areasSeasons.map(x => {
                return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
            });

            if (rootGetters["mgr/isCreate"]) {
                return areasSeasons;
            } else {
                return areasSeasons.filter(x => {
                    return rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].some(y => x.id_string === y.id_string.slice(0, 4)) : false;
                });
            }
        },
        area(state, getters) {
            if (!state.data.area_season_id) {
                return null;
            }

            let area_season = getters.areasSeasons.find(x => {
                return x.id === state.data.area_season_id;
            });

            console.log('area_season: ' + JSON.stringify(area_season, null, 2));
            return {
                id: state.data.area_season_id,
                id_string: area_season ? area_season.id_string : null,
                tag: area_season ? area_season.tag : null,
            }
        },

        loci(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/collection"] || !state.data.area_season_id) {
                return null;
            }
            if (rootGetters["mgr/isCreate"]) {
                //if new locus, fill possible locus number list
                if (rootGetters["mgr/moduleItemName"] === "Locus") {
                    console.log("pkr.getters.loci NEW LOCUS");

                    let zeroTo999 = ([...Array(1000).keys()].map
                        (x => { return { id: null, id_string: null, no: x }; }))

                    let loci = rootGetters["mgr/collection"];
                    if (!loci) {
                        return null;
                    }
                    let existingAreaLoci = rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].filter(item => {
                        return item.id_string.slice(0, 4) == getters.area.id_string;
                    }).map(item => {
                        let sections = item.id_string.toString().split(".");
                        //let sections = str1.split(".");
                        return { no: parseInt(sections[2], 10) };
                    }) : [];

                    let possibleLoci = zeroTo999.filter(x => {
                        return !existingAreaLoci.some(y => y.no === x.no);
                    })
                    return possibleLoci;

                } //otherwise, that is for all finds, we can choose any locus so we read from all loci for this areaSeason.
                else {
                    console.log("pkr.getters.loci LOCI as part of new item");
                    if (!state.areaLociAll) {
                        return null;
                    }

                    return state.dataExtra.areaLociAll.map(item => {
                        let sections = item.id_string.toString().split(".");
                        return {
                            id: item.id,
                            id_string: str1.slice(0, 8),
                            no: parseInt(sections[2], 10)
                        };
                    });
                }

            } //populate loci from current collection
            else {
                let loci = rootGetters["mgr/collection"];
                if (!loci) {
                    return null;
                }
                console.log("pkr.getters.loci LOCI from current collection");// + JSON.stringify(item, null, 2));               
                return loci.filter(item => {
                    return item.id_string.slice(0, 4) == getters.area.id_string;
                })
                    .map(item => {
                        let str1 = item.id_string.toString();
                        let sections = str1.split(".");
                        return {
                            id: (rootGetters["mgr/moduleItemName"] === "Locus") ? item.id : item.locus_id,
                            id_string: str1.slice(0, 8),
                            no: parseInt(sections[2], 10)
                        };
                    });
            }
        },

        locus(state, getters, rootState, rootGetters) {
            //if (rootGetters["mgr/moduleItemName"] === "Area" || !state.data.locus_id || (rootGetters["mgr/isLocus"] &&
            //    rootGetters["mgr/isCreate"] && !state.data.locus_no)) {
                
                if (rootGetters["mgr/moduleItemName"] === "Area") {
                    console.log('picker locus not ready');// + JSON.stringify(locus, null, 2));
                return null;
            }
            let isNewLocus = rootGetters["mgr/isLocus"] && rootGetters["mgr/isCreate"];


            if (rootGetters["mgr/isLocus"] && rootGetters["mgr/isCreate"]) {
                console.log('picker locus new locus');
                return {
                    id: null,
                    no: state.data.locus_no,
                    id_string: getters.area ? getters.area.id_string + '.' + state.data.locus_no : "",
                };
            } else {
                if(!state.data.locus_id) {
                    return null;
                }
                let locus, locus_no;
                //console.log('picker locus_id B locus_no: ' + state.data.locus_no + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                if (getters.loci) {
                    locus = getters.loci.find(x => {
                        return x.id === state.data.locus_id;
                    });
                    //console.log('picker locus_id C' + JSON.stringify(locus, null, 2));
                    locus_no = locus ? locus.no : null;
                } else {
                    locus_no = null;
                }
                return {
                    id: state.data.locus_id,
                    no: locus_no,
                    id_string: getters.area.id_string + '.' + locus_no,
                };
            }

            console.log('picker locus, locus_id: ' + state.data.locus_id);

        },

        finds(state, getters, rootState, rootGetters) {
            if (!state.data.locus_id) {
                return null;
            }

            if (rootGetters["mgr/isCreate"]) {

                //populate baskets[] and items[] with possible values
                return null;
            } else {
                //console.log("pkr.finds locus_id: " + getters.locus_id + "\nfinds: " + JSON.stringify(rootGetters["mgr/collection"], null, 2));
                let finds = rootGetters["mgr/collection"];
                if (!finds) {
                    return null;
                }

                return finds.filter(x => {
                    return x.locus_id == getters.locus.id;

                })
                    .map(item => {
                        //console.log("mapping item: " + JSON.stringify(item, null, 2));
                        let str = item.id_string.toString();
                        let sections = str.split(".");
                        return {
                            id: item.id,
                            id_string: item.id_string,
                            registration_category: sections[3],
                            basket_no: sections[3] === "GS" ? parseInt(sections[4], 10) : null,
                            item_no: sections[3] === "GS" ? parseInt(sections[5], 10) : parseInt(sections[4], 10),
                            locus_no: parseInt(sections[2], 10),
                            tag: str.slice(9)
                        };
                    });
            }
        },

        find(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/moduleItemName"] === "Area" ||
                rootGetters["mgr/moduleItemName"] === "Locus" ||
                !state.data.findable_id || !getters.finds) {
                //TODO check specific find validation for new find
                //(rootGetters["mgr/isFind"] &&
                //rootGetters["mgr/isCreate"] && !state.data.locus_no)) {
                //console.log('picker locus not ready');// + JSON.stringify(locus, null, 2));
                return null;
            }

            let isNewFind = rootGetters["mgr/isFind"] && rootGetters["mgr/isCreate"];
            //let locus_no = null;
            if (isNewFind) {
                //locus_no = state.data.locus_no;
            } else {
                //console.log('picker locus_id B locus_no: ' + state.data.locus_no + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                let find = getters.finds.find(x => {
                    return x.id === state.data.findable_id;
                });
                if (find) {
                    console.log('picker find: ' + JSON.stringify(find, null, 2));
                    return {
                        id: isNewFind ? null : state.data.findable_id,
                        registration_category: isNewFind ? null : find.registration_category,
                        basket_no: isNewFind ? null : find.basket_no,
                        item_no: isNewFind ? null : find.item_no,
                        id_string: isNewFind ? null : find.id_string,
                    };
                } else {
                    console.log('picker find not found!');
                    return null;
                }
            }
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
                    return state.data.area_season_id;
                case "Locus":
                    return state.data.locus_id;

                case "Groundstone":
                    return state.data.findable_id;

            }
        },
        tag(state, getters, rootState, rootGetters) {
                    switch (rootGetters["mgr/moduleItemName"]) {
                        case "Area":
                            return state.data.area_season_id ? getters.area.id_string : "";
                        case "Locus":
                            return state.data.locus_id ? getters.locus.id_string : "";

                        case "Groundstone":
                            return state.data.findable_id ? getters.find.id_string : "";
                    }
                },
        //private








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
            console.log("locus_no commited");
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

        areasSeasons(state, payload) {
            state.dataExtra.areasSeasons = payload;
        },

        loci(state, payload) {
            state.dataExtra.loci = payload;
        },
        areaLociAll(state, payload) {
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
            console.log("picker.areaSeasonSelected");
            state.data.locus_id = null;

            if (rootGetters["mgr/isCreate"] && (rootGetters["mgr/isLocus"] || rootGetters["mgr/isLocus"])) {
                //load loci
                console.log("picker.areaSeasonSelected before dispatch");
                dispatch("areaSeasonLoci")
                    .then(res => {
                        //set default locus_no
                        //commit('locus_no', res.data.lociForArea);

                        //this.basket_no = (PTs.length == 0) ? 1 : 1 + PTs.reduce((max, p) => (p.basket_no > max ? p.basket_no : max), 0);
                        //state.user = res.user;
                        //return res;
                    });
                console.log("picker.areaSeasonSelected after dispatch");
            } else {
                console.log("picker.areaSeasonSelected did not dispatch");
                state.data.locus_id = null;
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
                    commit("areaLociAll", res.data.lociForArea);
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
