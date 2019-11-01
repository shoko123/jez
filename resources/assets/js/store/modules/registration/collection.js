export default {
    namespaced: false,
    state: {

    },

    getters: {
        fromCollectionAreasSeasons(state, getters, rootState, rootGetters) {
            let areasSeasons = getters["fromDbAreasSeasons"];
            console.log("fromCollectionAreasSeasons areasSeasons: " + JSON.stringify(areasSeasons, null, 2))
            if (!areasSeasons) {
                return null;
            }

            return areasSeasons.filter(x => {
                return rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].some(y => x.id_string === y.id_string.slice(0, 4)) : false;
            });
        },

        fromCollectionAreaSeasonLoci(state, getters, rootState, rootGetters) {
            let loci = rootGetters["mgr/collection"];
            if (!loci) {
                return null;
            }
            console.log("fromCollectionAreaSeasonLoci");// + JSON.stringify(item, null, 2));               
            return loci.filter(item => {
                return item.id_string.slice(0, 4) == getters.area.id_string;
            }).map(item => {
                let str1 = item.id_string.toString();
                let sections = str1.split(".");
                return {
                    id: (rootGetters["mgr/moduleItemName"] === "Locus") ? item.id : item.locus_id,
                    id_string: str1.slice(0, 8),
                    no: parseInt(sections[2], 10)
                };
            });
        },

        fromCollectionLocusFinds(state, getters, rootState, rootGetters) {
            let finds = rootGetters["mgr/collection"];
            if (!finds) {
                return null;
            }

            return finds.filter(x => {
                return x.locus_id == getters.locus_id;

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
        },
    },
    mutations: {

    },
    actions: {

    }
};
