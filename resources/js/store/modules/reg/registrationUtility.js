import { findConfig } from './configFindsAllowedRegistrations.js';

export default {
    util1: function (state, getters, rootGetters) {
        return rootGetters["mgr/status"].isLocus;
    },

    pickerLocus: function (state, getters, rootState, rootGetters) {
        let loci = null;
        if (state.newItem.areaSeason) {
            loci = rootGetters["mgr/collection"].filter(x => {
                return (x.tag.slice(0, 4) == state.newItem.areaSeason.tag);
            }).map(item => {
                return {
                    id: item.id,
                    locus_no: parseInt(item.tag.toString().split('\/')[2], 10),
                    tag: item.tag,
                };
            });
        }

        return {
            areasSeasons: state.areasSeasons.filter(x => {
                return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
            }),
            areasSeason: state.newItem.areaSeason,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            loci: loci ? loci : [],
            locus: state.newItem.locus,
            locusSelected: !!state.newItem.locus.id,
            ready: !!state.newItem.locus.id,
            itemId: state.newItem.locus.id
        }
    },

    pickerFind: function (state, getters, rootState, rootGetters) {
        //return "pickerFind";
        let loci, finds = null;
        if (state.newItem.areaSeason.id) {
            loci = rootGetters["mgr/collection"].filter(x => {
                return (x.tag.slice(0, 4) == state.newItem.areaSeason.tag);
            }).map(item => {
                let locus_no = item.tag.toString().split('\/')[2].split('.')[0];
                //if (locus_no.includes('\.')) {
                //    locus_no.split('.')[0]
                //}
                return {
                    id: item.locus_id,
                    locus_no: parseInt(locus_no, 10),
                    tag: item.tag.split('.')[0],
                };
            });

            if (state.newItem.locus.id) {
                finds = rootGetters["mgr/collection"].filter(x => {
                    return x.locus_id == state.newItem.locus.id;
                }).map(item => {
                    //console.log("mapping item: " + JSON.stringify(item, null, 2));
                    let sections = item.tag.toString().split(".");
                    return {
                        id: item.id,
                        //registration_category: sections[1],
                        //basket_no: sections[1] === "GS" ? parseInt(sections[2], 10) : null,
                        //item_no: sections[1] === "GS" ? parseInt(sections[3], 10) : parseInt(sections[2], 10),
                        tag: item.tag,
                    };
                });

            }

        }

        return {
            areasSeasons: state.areasSeasons.filter(x => {
                return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
            }),
            areasSeason: state.newItem.areaSeason,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            loci: loci ? loci : [],
            locus: state.newItem.locus,
            locusSelected: !!state.newItem.locus.id,
            finds: finds ? finds : [],
            find: state.newItem.find,
            ready: !!state.newItem.find.id,
            itemId: state.newItem.find.id
        }
    },

    creatorLocus: function (state, getters, rootState, rootGetters) {

        let oneTo999 = ([...Array(1000).keys()])

        let locusNos = (state.areaSeasonLoci && state.newItem.areaSeason.id) ? oneTo999.filter(x => { return !state.areaSeasonLoci.some(y => y.locus_no === x); }) : [];
        let locusSelected = (state.newItem.locus.locus_no !== null);
        return {
            areasSeasons: state.areasSeasons,
            areasSeason: state.newItem.areaSeason,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            locusNos: locusNos,
            locus: state.newItem.locus,
            locusSelected: locusSelected,
            ready: locusSelected,
            tag: locusSelected ? state.newItem.areaSeason.tag + '/' + state.newItem.locus.locus_no : "",
        }
    },

    creatorFind: function (state, getters, rootState, rootGetters) {
        return {
            areasSeasons: state.areasSeasons,
            areasSeason: state.newItem.areaSeason,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            locusNos: locusNos,
            locus: state.newItem.locus,
            locusSelected: locusSelected,
            ready: locusSelected,
            tag: locusSelected ? state.newItem.areaSeason.tag + '/' + state.newItem.locus.locus_no : "",
            findConfig: findConfig,
        }
        console.log("findConfig: " + JSON.stringify(findConfig, null, 2));
    },

    registrationFind(state, getters, rootState, rootGetters) {

        let storeModuleName = rootGetters["mgr/moduleInfo"].storeModuleName;
        let moduleStaticData = rootGetters[`${storeModuleName}/moduleStaticData`];
        if (!moduleStaticData) {
            return null;
        }
        //console.log("registrationFind/registration moduleStaticData: " + JSON.stringify(moduleStaticData, null, 2));
        let registrationCategories = moduleStaticData.allowedRegistrations.map(x => x.registration_category);
        let registrationOption = moduleStaticData.allowedRegistrations.find(x => x.registration_category === state.registrationData.registration_category);

        if (registrationOption === undefined) {
            console.log("findRegistration - can't find registionOption");
            return null;
        } else {
            console.log("registrationFind/registration registrationOption: " + JSON.stringify(registrationOption, null, 2));
        }
        let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1);
        let basketNos = [], itemNos = [], isReady = false, findTag = "";

        if (getters["locusFinds"]) {
            //we can get possible basket and item numbers only when locusFinds are loaded.

            //Here we populate possible basket and item numbers according to the regisration option
            if (registrationOption.basket && registrationOption.item) {
                //basket and item
                basketNos = oneTo99;
                itemNos = oneTo99.filter(x => {
                    return !state.locusFinds.some(y => {
                        return (y.basket_no === state.registrationData.basket_no && y.item_no === x)
                    })
                });
                isReady = !!state.registrationData.basket_no && !!state.registrationData.item_no;
                findTag = `${state.registrationData.basket_no}.${state.registrationData.item_no}`;

            } else {
                if (registrationOption.basket) {
                    //basketNos only
                    basketNos = oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.basket_no === x)
                        })
                    });
                    isReady = !!state.registrationData.basket_no;
                    findTag = `${state.registrationData.basket_no}`;
                }
                if (registrationOption.item) {
                    //itemNos only
                    itemNos = oneTo99.filter(x => {
                        return !getters.locusFinds.some(y => {
                            return (y.item_no === x)
                        })
                    });
                    isReady = !!state.registrationData.item_no;
                    findTag = `${state.registrationData.item_no}`;
                }
            }
        }

        return {
            areasSeasons: getters["areasSeasons"],
            areaSeasonLoci: getters["areaSeasonLoci"],
            locusFinds: getters["locusFinds"],
            areaSeason: getters["areaSeason"],
            locus: getters["locus"],
            area_season_id: state.registrationData.area_season_id,
            locus_id: state.registrationData.locus_id,
            showBasket: registrationOption.basket,
            showItem: registrationOption.item,
            registrationCategories: registrationCategories,
            registration_category: state.registrationData.registration_category,
            basketNos: basketNos,
            itemNos: itemNos,
            basket_no: state.registrationData.basket_no,
            item_no: state.registrationData.item_no,
            isReady: isReady,
            tag: isReady ? `${getters["locus"].tag}.${state.registrationData.registration_category}.${findTag}` : "",
        };

    },


    /*
    pickerAreasSeasons: function (state, getters, rootState, rootGetters) {
        if (!state.areasSeasons || !rootGetters["mgr/collection"]) {
            return null;
        };

        if (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind) {
            if (rootGetters["mgr/status"].isCreate) {
                return state.areasSeasons;
            } else if (rootGetters["mgr/status"].isShow) {
                //we could iterate over rootGetters["mgr/collection"] and get unique areas, but this is 
                //somewhat expensive and also that collection may be of different thing (loci, finds)
                //so instead, we load the areas array and select from there. 
                return state.areasSeasons.filter(x => {
                    return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
                });
            }
        }
        return null;
    },
    
    creatorAreasSeasons: function (state, getters, rootState, rootGetters) {
        if (!state.areasSeasons || !rootGetters["mgr/collection"]) {
            return null;
        };

        if (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind) {
            if (rootGetters["mgr/status"].isCreate) {
                return state.areasSeasons;
            } else if (rootGetters["mgr/status"].isShow) {
                //we could iterate over rootGetters["mgr/collection"] and get unique areas, but this is 
                //somewhat expensive and also that collection may be of different thing (loci, finds)
                //so instead, we load the areas array and select from there. 
                return state.areasSeasons.filter(x => {
                    return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
                });
            }
        }
        return null;
    },

    
    areaSeason(state, getters, rootState, rootGetters) {
        if (!state.newItem.area_season_id || !state.areasSeasons) {
            //console.log("reg.areaSeason returns null area_season_id: " + state.newItem.area_season_id);
            return null;
        }
        let areaSeason = state.areasSeasons.find(x => {
            return x.id === state.newItem.area_season_id;
        });
        //console.log("reg.areaSeason returns areaSeason: " + JSON.stringify(areaSeason, null, 2));

        return state.areasSeasons.find(x => {
            return x.id === state.newItem.area_season_id;
        });
    },

    areaSeasonLoci(state, getters, rootState, rootGetters) {
        if (!state.newItem.area_season_id ||
            !state.areasSeasons ||
            !rootGetters["mgr/collection"]) {
            return null
        };

        if (rootGetters["mgr/status"].isFind) {
            if (rootGetters["mgr/status"].isCreate) {
                return state.areaSeasonLoci;
            }

            if (rootGetters["mgr/status"].isShow) {
                return rootGetters["mgr/collection"].filter(x => {
                    return (x.tag.slice(0, 4) == getters["areaSeason"].tag);
                }).map(item => {
                    let locus_no = item.tag.toString().split('\/')[2];
                    if (locus_no.includes('\.')) {
                        locus_no.split('.')[0]
                    }
                    return {
                        id: (rootGetters["mgr/status"].itemName === "Locus") ? item.id : item.locus_id,
                        locus_no: parseInt(locus_no, 10),
                        tag: item.tag,
                    };
                });
            }
        }

        if (rootGetters["mgr/status"].isLocus) {
            if (rootGetters["mgr/status"].isCreate) {
                //if we create a new locus, we fill this list with all loci for a chosen areaSeason (regardless of current collection).
                //It will be used by locusNos which will contain all unused locus nos for a chosen areaSeason.
                return state.areaSeasonLoci;
            }

            if (rootGetters["mgr/status"].isShow) {
                //console.log("XXX areaSeason: " + (getters["areaSeason"] ? JSON.stringify(getters["areaSeason"], null, 2) : "null"));           
                return rootGetters["mgr/collection"].filter(x => {
                    return (x.tag.slice(0, 4) == getters["areaSeason"].tag);
                }).map(item => {

                    let locus_no = item.tag.toString().split('\/')[2];
                    if (locus_no.includes('\.')) {
                        locus_no.split('.')[0]
                    }
                    return {
                        id: (rootGetters["mgr/status"].itemName === "Locus") ? item.id : item.locus_id,
                        locus_no: parseInt(locus_no, 10),
                        tag: item.tag,
                    };
                });
            }
            //return state.areaSeasonLoci;
        }
    },
    */
    locusFinds(state, getters, rootState, rootGetters) {
        if (!state.newItem.locus_id) {
            return null;
        }

        if (rootGetters["mgr/status"].isCreate) {
            return state.locusFinds ? state.locusFinds : null;
        } else if (rootGetters["mgr/status"].isShow) {
            return rootGetters["mgr/collection"].filter(x => {
                return x.locus_id == state.newItem.locus_id;
            }).map(item => {
                //console.log("mapping item: " + JSON.stringify(item, null, 2));
                let sections = item.tag.toString().split(".");
                return {
                    id: item.id,
                    registration_category: sections[1],
                    basket_no: sections[1] === "GS" ? parseInt(sections[2], 10) : null,
                    item_no: sections[1] === "GS" ? parseInt(sections[3], 10) : parseInt(sections[2], 10),
                    tag: item.tag,
                };
            });
        }
    },

}
