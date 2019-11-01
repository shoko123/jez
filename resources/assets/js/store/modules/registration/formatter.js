export default {
    namespaced: false,
    state: {

    },

    getters: {
        areaFormatter(state, getters, rootState, rootGetters) {
            if (!getters["area_season_id"]) {
                return null;
            }

            let area_season = (getters["fromDbAreasSeasons"]).find(x => {
                return x.id === getters["area_season_id"];
            });
            //console.log('area_season: ' + JSON.stringify(area_season, null, 2));
            return area_season == undefined ? null : area_season;
        },

        locusFormatter(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/moduleItemName"] === "Area") {
                console.log('get locus when itemName is Area returns null');// + JSON.stringify(locus, null, 2));
                return null;
            }

            if (rootGetters["mgr/status"].isCreateLocus) {
                console.log('picker locus new locus');
                if (!getters["locus_no"]) {
                    return null;
                } else {
                    return {
                        id: null,
                        no: getters["locus_no"],
                        id_string: getters.area ? getters.area.id_string + '.' + getters["locus_no"] : "",
                        tag: getters.area ? getters.area.tag + '/' + getters["locus_no"] : "",
                    };
                };
            } else {
                if (!getters["locus_id"]) {
                    return null;
                }
                let locus, locus_no;
                //console.log('picker locus_id B locus_no: ' + getters["locus_no"] + '\nloci: ' + JSON.stringify(state.dataExtra.loci, null, 2));
                locus = getters.loci ? getters.loci.find(x => {
                    return x.id === getters["locus_id"];
                }) : null;
                if (!locus) {
                    return null;
                }

                return {
                    id: getters["locus_id"],
                    no: locus.no,
                    id_string: getters.area.id_string + '.' + locus.no,
                    tag: getters.area ? getters.area.tag + '/' + locus.no : "",
                };
            }
            //console.log('picker locus, locus_id: ' + getters["locus_id"]);
        },
    },
    mutations: {

    },
    actions: {

    }
};
