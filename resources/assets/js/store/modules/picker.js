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
        },
        dataExtra: {
            areasSeasons: null,
            loci: [],//all loci for current collection of finds, filtered from collection
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
            if (!rootGetters["mgr/collection"] || !state.data.area_season_id || rootGetters["mgr/status"].isCreateLocus) {
                return null;
            }

            if (rootGetters["mgr/status"].isCreate) {

                //otherwise, that is create find, we can choose any locus so we read from all loci for this areaSeason.
                console.log("pkr.getters.loci LOCI as part of new item");
                if (!state.dataExtra.loci) {
                    return null;
                }

                return state.dataExtra.loci.map(item => {
                    let sections = item.id_string.split(".");
                    return {
                        id: item.id,
                        id_string: item.id_string.slice(0, 8),
                        no: parseInt(sections[2], 10)
                    };
                });
            }
            else {
                //(not create) - populate loci from current collection
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
            //let isNewLocus = rootGetters["mgr/isLocus"] && rootGetters["mgr/isCreate"];


            if (rootGetters["mgr/status"].isCreateLocus) {
                console.log('picker locus new locus');
                if (!state.data.locus_no) {
                    return null;
                } else {
                    return {
                        id: null,
                        no: state.data.locus_no,
                        id_string: getters.area ? getters.area.id_string + '.' + state.data.locus_no : "",
                        tag: getters.area ? getters.area.tag + '/' + state.data.locus_no : "",
                    };
                };
            } else {
                if (!state.data.locus_id) {
                    return null;
                }
                let locus, locus_no;
                //console.log('picker locus_id B locus_no: ' + state.data.locus_no + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                locus = getters.loci ? getters.loci.find(x => {
                    return x.id === state.data.locus_id;
                }) : null;
                if (!locus) {
                    return null;
                }

                return {
                    id: state.data.locus_id,
                    no: locus.no,
                    id_string: getters.area.id_string + '.' + locus.no,
                    tag: getters.area ? getters.area.tag + '/' + locus.no : "",
                };
            }
            //console.log('picker locus, locus_id: ' + state.data.locus_id);
        },

        locusNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreateLocus || !getters.area) {
                return null;
            }
            console.log("pkr.getters.locusNos");

            let oneTo999 = ([...Array(1000).keys()])

            let existingAreaLoci = rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].filter(item => {
                return item.id_string.slice(0, 4) == getters.area.id_string;
            }).map(item => {
                let sections = item.id_string.toString().split(".");
                return parseInt(sections[2], 10);
            }) : [];

            let possibleLoci = oneTo999.filter(x => {
                return !existingAreaLoci.some(y => y === x);
            })
            return possibleLoci;
        },

        locus_no(state) {
            return state.data.locus_no;
        },

        finds(state, getters, rootState, rootGetters) {
            if (!state.data.locus_id) {
                return null;
            }

            if (rootGetters["mgr/isCreate"]) {
                //populate finds from DB. (for given locus)
                return state.dataExtra.finds;

            } else {
                //console.log("pkr.finds locus_id: " + getters.locus_id + "\nfinds: " + JSON.stringify(rootGetters["mgr/collection"], null, 2));
                let finds = rootGetters["mgr/collection"];
                if (!finds) {
                    return null;
                }

                return finds.filter(x => {
                    return x.locus_id == state.data.locus_id;

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
                            tag: item.tag,
                        };
                    });
            }
        },

        find(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/moduleItemName"] === "Area" ||
                rootGetters["mgr/moduleItemName"] === "Locus") {
                //console.log('picker locus not ready');// + JSON.stringify(locus, null, 2));
                return null;
            }

            //let locus_no = null;
            if (rootGetters["mgr/status"].isCreateFind) {
                if (!state.data.locus_id) {
                    return null;
                }

                let tag;
                switch (rootGetters["mgr/moduleItemName"]) {
                    case "Stone":
                        switch (state.data.registration_category) {
                            case "AR":
                                tag = state.data.item_no ? `AR.${state.data.item_no}` : null;
                            case "GS":
                                tag = (state.data.basket_no && state.data.item_no) ? `GS.${state.data.basket_no}.${state.data.item_no}` : null;
                        }

                    case "PotteryBasket":
                        tag = state.data.basket_no ? `PT.${state.data.basket_no}` : null;
                    case "Lithic":
                        switch (state.data.registration_category) {
                            case "AR":
                                tag = state.data.item_no ? `AR.${state.data.item_no}` : null;
                            case "FL":
                                tag = (state.data.basket_no && state.data.item_no) ? `FL.${state.data.basket_no}.${state.data.item_no}` : null;
                        }
                    case "Glass":
                    case "Pottery":
                        tag = state.data.item_no ? `AR.${state.data.item_no}` : null;
                }
                if (!tag) {
                    return null;
                } else {
                    return {
                        id: null,
                        findable_type: state.data.findable_type,
                        registration_category: state.data.registration_category,
                        basket_no: state.data.basket_no,
                        item_no: state.data.item_no,
                        tag: getters.locus ? getters.locus.tag + '.' + tag : "",
                    };
                }


                //locus_no = state.data.locus_no;
            } else {
                //console.log('picker locus_id B locus_no: ' + state.data.locus_no + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                let find = (getters.finds) ? getters.finds.find(x => {
                    return x.id === state.data.findable_id;
                }) : null;

                if (!find) {
                    console.log('picker find not found!');
                    return null;
                } else {
                    console.log('picker find: ' + JSON.stringify(find, null, 2));
                    return {
                        id: state.data.findable_id,
                        registration_category: find.registration_category,
                        basket_no: find.basket_no,
                        item_no: find.item_no,
                        id_string: find.id_string,
                        tag: find.tag,
                    };

                }
            }
        },

        registrationCategories(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/moduleItemName"]) {
                case "Stone":
                    return ["AR", "GS"];
                case "PotteryBasket":
                    return ["PT"];
                case "Lithic":
                    return ["AR", "LB"];
                case "Glass":
                    return ["AR"];
            }
        },
        registration_category(state) {
            return state.data.registration_category;
        },

        basketNos(state) {
            if (!state.dataExtra.finds) {
                return null;
            }
            //Array.from({length: N}, (v, k) => k+1)
            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1)
            switch (state.data.registration_category) {
                case "PT":
                    let possiblePTbasketNos = oneTo99.filter(x => {
                        return !state.dataExtra.finds.some(y => {
                            return (y.basket_no === x && y.findable_type === state.data.findable_type)
                        })
                    })
                    return possibleLoci;
                    return oneTo99;
                case "GS":
                case "FL":
                    return oneTo99; /*.filter(x => {
                        return !state.dataExtra.finds.some(y => {
                            return (y.basket_no === x && y.findable_type === state.data.findable_type)
                        })
                    });*/
                default:
                    return [];
            }
        },

        basket_no(state) {
            return state.data.basket_no;
        },
        itemNos(state) {
            if (!state.dataExtra.finds) {
                return null;
            }
            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1);

            switch (state.data.registration_category) {
                case "PT":
                    return [];
                case "AR":
                    return oneTo99.filter(x => {
                        return !state.dataExtra.finds.some(y => {
                            return (y.item_no === x && y.findable_type === state.data.findable_type)
                        })
                    });
                case "GS":
                case "FL":
                    return oneTo99.filter(x => {
                        return !state.dataExtra.finds.some(y => {
                            return (y.item_no === x &&
                                y.findable_type === state.data.findable_type &&
                                y.basket_no === state.data.basket_no &&
                                y.registration_category === state.data.registration_category)
                        })
                    });
            }
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
            //state.data.locus_id = null;
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

        finds(state, payload) {
            state.dataExtra.finds = payload;
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
            state.dataExtra.loci = null;
            state.dataExtra.finds = null;
        },

    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.areaSeasonSelected");
            //state.data.locus_id = null;

            if (rootGetters["mgr/status"].isCreate && rootGetters["mgr/isFind"]) {
                state.data.locus_id = null;//load loci
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
                //state.data.locus_id = null;
            }

        },
        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.locusSelected");
            if (rootGetters["mgr/status"].isCreateFind) {
                //if we create a new find, we must load the finds for this locus
                dispatch("locusFinds")
                    .then(res => {
                        console.log("picker.afterlocusFinds returned");
                    });
                console.log("picker.areaSeasonSelected after dispatch");
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
                dispatch("areaSeasonLoci");
            } else if (rootGetters["mgr/status"].isFind) {
                //////find/////
                state.data.area_season_id = rootGetters["mgr/item"].area_id;
                state.data.findable_type = rootGetters["mgr/status"].moduleItemName;
                dispatch("areaSeasonLoci")
                    .then(res => {
                        state.data.locus_id = rootGetters["mgr/item"].locus_id;
                        state.data.registration_category = state.data.basket_no = state.data.item_no = null;
                        dispatch("locusFinds")
                            .then(res => {
                                if (state.dataExtra.finds) {
                                    state.data.registration_category = state.dataExtra.finds[0].registration_category;
                                }
                            });
                    })
            }
        },


        //retrieve areasSeasons from DB
        areasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log("picker.dispatching areasSeasons");
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
                endpoint: `/api/areas/${state.data.area_season_id}/areaLoci`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading loci for area ${state.data.area_season_id}`, onSuccess: null, onFailure: null, },
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
        locusFinds({ state, getters, commit, dispatch, rootGetters }) {
            let xhrRequest = {
                endpoint: `/api/loci/${state.data.locus_id}/finds`,
                action: "get",
                data: null,
                verbose: true,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading finds for locus ${state.data.locus_id}`, onSuccess: null, onFailure: null, },
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
