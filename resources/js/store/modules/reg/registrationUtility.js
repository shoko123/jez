export default {
    pickerLocus: function (state, getters, rootState, rootGetters) {
        let loci, areasSeasons = null;
        if (state.areasSeasons) {
            areasSeasons = state.areasSeasons.filter(x => {
                return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
            });
        }
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
            areasSeasons: areasSeasons,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            areaSeasonLoci: loci ? loci : [],
            locusSelected: state.newItem.locus.locus_no !== null,
            ready: state.newItem.locus.locus_no !== null,
            itemId: state.newItem.locus.id,
        }
    },

    pickerFind: function (state, getters, rootState, rootGetters) {
        let areasSeasons, loci, finds = null;
        if (state.areasSeasons) {
            areasSeasons = state.areasSeasons.filter(x => {
                return rootGetters["mgr/collection"].some(y => x.tag === y.tag.slice(0, 4));
            });
        }
        if (state.newItem.areaSeason.id) {
            loci = rootGetters["mgr/collection"].filter(x => {
                return (x.tag.slice(0, 4) == state.newItem.areaSeason.tag);
            }).map(item => {
                let locus_no = item.tag.toString().split('\/')[2].split('.')[0];
                return {
                    id: item.locus_id,
                    locus_no: parseInt(locus_no, 10),
                    tag: item.tag.split('.')[0],
                };
            });

            if (state.newItem.locus && state.newItem.locus.id) {
                finds = rootGetters["mgr/collection"].filter(x => {
                    return x.locus_id == state.newItem.locus.id;
                }).map(item => {
                    //console.log("mapping item: " + JSON.stringify(item, null, 2));
                    return {
                        id: item.id,
                        tag: item.tag,
                    };
                });
            }
        }

        return {
            areasSeasons: areasSeasons,
            areasSeason: state.newItem.areaSeason,
            areaSeasonSelected: state.newItem.areaSeason.id,
            areaSeasonLoci: loci ? loci : [],
            locus: state.newItem.locus,
            locusSelected: state.newItem.locus.id,
            finds: finds ? finds : [],
            find: state.newItem.find,
            ready: !!state.newItem.find.id,
            itemId: state.newItem.find.id,
        }
    },

    creatorLocus: function (state, getters, rootState, rootGetters) {

        let oneTo999 = ([...Array(1000).keys()])

        let locusNos = (state.areaSeasonLoci && state.newItem.areaSeason.id) ? oneTo999.filter(x => { return !state.areaSeasonLoci.some(y => y.locus_no === x); }) : [];
        let locusSelected = (state.newItem.locus.locus_no !== null);
        return {
            areasSeasons: state.areasSeasons,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            locusNos: locusNos,
            locusSelected: locusSelected,
            ready: locusSelected,
            tag: locusSelected ? state.newItem.areaSeason.tag + '/' + state.newItem.locus.locus_no : "",
        }
    },

    creatorFind: function (state, getters, rootState, rootGetters) {
        let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1);
        let basketNos = [], itemNos = [], isReady = false, findTag = "";

        if (state.locusFinds !== null && state.newItem.registrationOption.registration_category) {
            //we can get possible basket and item numbers only when locusFinds are loaded and 
            //a registration_category is chosen.
            findTag += `${state.newItem.locus.tag}.${state.newItem.registrationOption.registration_category}.`;
            
            //Here we populate possible basket and item numbers according to the regisration option
            if (state.newItem.registrationOption.basket && state.newItem.registrationOption.item) {
                //basket and item
                basketNos = oneTo99;
                itemNos = oneTo99.filter(x => {
                    return !state.locusFinds.some(y => {
                        return (y.basket_no === state.newItem.find.basket_no && y.item_no === x)
                    })
                });
                isReady = ((state.newItem.find.basket_no !== null) && (state.newItem.find.item_no !== null));
                findTag += `${state.newItem.find.basket_no}.${state.newItem.find.item_no}`;

            } else {
                if (state.newItem.registrationOption.basket) {
                    //basketNos only
                    basketNos = oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.basket_no === x && y.registration_category === state.newItem.registrationOption.registration_category)
                        })
                    });
                    isReady = (state.newItem.find.basket_no !== null);
                    findTag += `${state.newItem.find.basket_no}`;
                }
                if (state.newItem.registrationOption.item) {
                    //itemNos only
                    itemNos = oneTo99.filter(x => {
                        return !state.locusFinds.some(y => {
                            return (y.item_no === x && y.registration_category === state.newItem.registrationOption.registration_category)
                        })
                    });
                    isReady = (state.newItem.find.item_no !== null);
                    findTag += `${state.newItem.find.item_no}`;
                }
            }
            console.log("find: " + JSON.stringify(state.newItem.find, null, 2));
            //console.log("item_no: " + item_no);
        }

        return {
            areasSeasons: state.areasSeasons,
            areaSeasonSelected: !!state.newItem.areaSeason.id,
            areaSeasonLoci: state.areaSeasonLoci,
            locusFinds: state.locusFinds,
            locusSelected: state.newItem.locus.id !== null,
            showBasket: state.newItem.registrationOption.basket,
            showItem: state.newItem.registrationOption.item,
            registrationOptions: state.registrationOptions,
            basketNos: basketNos,
            itemNos: itemNos,
            find: state.newItem.find,
            ready: isReady,
            tag: isReady ? findTag : "",
        }
    },
  
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
