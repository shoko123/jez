export default {
    namespaced: false,
    state: {

    },

    getters: {
        fromCollectionAreasSeasons(state, getters, rootState, rootGetters) {
            let areasSeasons = getters["fromDbAreasSeasons"];   
            console.log("fromCollectionAreasSeasons areasSeasons: " + JSON.stringify(areasSeasons,null, 2))         
            if (!areasSeasons) {
                return null;
            }

            return areasSeasons.filter(x => {
                return rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].some(y => x.id_string === y.id_string.slice(0, 4)) : false;
            });
        },

        fromCollectionAreaSeasonLoci(state) {
            console.log("pkr.getters.loci LOCI as part of new item");
            if (!state.areaSeasonLoci) {
                return null;
            }

            return state.areaSeasonLoci.map(item => {
                let sections = item.id_string.split(".");
                return {
                    id: item.id,
                    id_string: item.id_string.slice(0, 8),
                    no: parseInt(sections[2], 10)
                };
            });
        },

        fromCollectionLocusFinds(state) {
            return state.locusFinds;
        },
    },
    mutations: {

    },
    actions: {

    }
};
