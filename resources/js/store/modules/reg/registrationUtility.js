export default {
    util1: function (state, getters, rootGetters) {
        return rootGetters["mgr/status"].isLocus;
    },


    areasSeasons: function (state, getters, rootState, rootGetters) {
        if (!state.areasSeasons || !rootGetters["mgr/collection"]) {
            return null
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

                //unused iteration over rootGetters["mgr/collection"] to extract unique areas (not working)
                //let fromCollection = Array.from(new Set(rootGetters["mgr/collection"].map(x => { return { id: x.area_id, tag: x.tag.slice(0, 4)}})));
                //console.log("areasSeasons fro collection: " + JSON.stringify(fromCollection, null, 2));                  
            }
        }
        return null;
    },

    areaSeasonLoci(state, getters, rootState, rootGetters) {
        if (!state.registrationData.area_season_id ||
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
                    return (x.tag.slice(0, 4) == getters["area"].tag);
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
                //if we create a new locus, we fill this list with all loci for a chosen area (regardless of current collection).
                //It will be used by locusNos which will contain all unused locus nos for a chosen area.
                return state.areaSeasonLoci;
            }

            if (rootGetters["mgr/status"].isShow) {
                //console.log("XXX area: " + (getters["area"] ? JSON.stringify(getters["area"], null, 2) : "null"));           
                return rootGetters["mgr/collection"].filter(x => {
                    return (x.tag.slice(0, 4) == getters["area"].tag);
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
    locusFinds(state, getters, rootState, rootGetters) {
        if (!state.registrationData.locus_id) {
            return null;
        }

        if (rootGetters["mgr/status"].isCreate) {
            return state.locusFinds ? state.locusFinds : null;
        } else if (rootGetters["mgr/status"].isShow) {
            return rootGetters["mgr/collection"].filter(x => {
                return x.locus_id == state.registrationData.locus_id;
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
