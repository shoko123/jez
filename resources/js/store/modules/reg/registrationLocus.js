export default {
    registration(state, getters, rootState, rootGetters) {

        if (rootGetters["mgr/status"].isPicker) {
            return {
                areasSeasons: getters["areasSeasons"],
                areaSeasonLoci: getters["areaSeasonLoci"],
                area: getters["area"],
                locus: getters["locus"],
                area_season_id: state.registrationData.area_season_id,
                locus_id: state.registrationData.locus_id,
                isReady: state.registrationData.locus_id ? true : false,
            };
        } else if (rootGetters["mgr/status"].isCreate) {
            let possibleLoci = [];
            if (getters["areaSeasonLoci"]) {
                //we can get possible locusNos only when areaSeasonLoci are loaded.
         
                let oneTo999 = ([...Array(1000).keys()])

                possibleLoci = oneTo999.filter(x => {
                    return !getters["areaSeasonLoci"].some(y => y.no === x);
                })
            }
            return {
                areasSeasons: getters["areasSeasons"],
                area_season_id: state.registrationData.area_season_id,
                area: getters["area"],
                locusNos: possibleLoci,
                locus_no: state.registrationData.locus_no,
                tag: (!!state.registrationData.locus_no && getters["area"]) ? getters["area"].tag + "/" + state.registrationData.locus_no : "",
                isReady: (!!state.registrationData.locus_no && getters["area"]),
            }
        }
    }
}
