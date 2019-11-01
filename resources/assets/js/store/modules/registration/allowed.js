export default {
    namespaced: false,
    state: {

    },

    getters: {
        allowedLocusNos(state, getters, rootState, rootGetters) {
            let area = getters["area"];
            //console.log("allowedLocusNos area: " + JSON.stringify(area, null, 2));
        
            if (!rootGetters["mgr/status"].isCreateLocus || !area) {
                console.log("allowedLocusNos returns null");
                return null;
            }
            //console.log("allowedLocusNos pass 1");

            let oneTo999 = ([...Array(1000).keys()])

            let existingAreaLoci = rootGetters["mgr/collection"] ? rootGetters["mgr/collection"].filter(item => {
                return item.id_string.slice(0, 4) == area.id_string;
            }).map(item => {
                let sections = item.id_string.toString().split(".");
                return parseInt(sections[2], 10);
            }) : [];
            //console.log("allowedLocusNos existingAreaLoci: " + JSON.stringify(existingAreaLoci, null, 2));
            let possibleLoci = oneTo999.filter(x => {
                return !existingAreaLoci.some(y => y === x);
            })
            return possibleLoci;
        },
        
       //return getters.area;
    },
    mutations: {

    },
    actions: {

    }
};
