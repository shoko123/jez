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
            if (rootGetters["mgr/status"].itemName === "Area") {
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
                //console.log('picker locus_id B locus_no: ' + getters["locus_no"] + '\nloci: ' + JSON.stringify(gettersExtra.loci, null, 2));
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

        findFormatter(state, getters, rootState, rootGetters) {
            //let locus_no = null;
            if (rootGetters["mgr/status"].isCreateFind) {
                if (!getters["locus_id"]) {
                    return null;
                }

                let tag;
                switch (rootGetters["mgr/status"].itemName) {
                    case "Stone":
                        switch (getters.registration_category) {
                            case "AR":
                                tag = getters.item_no ? `AR.${getters.item_no}` : null;
                            case "GS":
                                tag = (getters.basket_no && getters.item_no) ? `GS.${getters.basket_no}.${getters.item_no}` : null;
                        }

                    case "Lithic":
                        switch (getters.registration_category) {
                            case "AR":
                                tag = getters.item_no ? `AR.${getters.item_no}` : null;
                            case "FL":
                                tag = (getters.basket_no && getters.item_no) ? `FL.${getters.basket_no}.${getters.item_no}` : null;
                        }
                    case "Glass":
                    case "Pottery":
                        tag = getters.basket_no ? `PT.${getters.basket_no}` : `AR.${getters.item_no}`;
                }
                if (!tag) {
                    return null;
                } else {
                    return {
                        id: null,
                        findable_type: getters.findable_type,
                        registration_category: getters.registration_category,
                        basket_no: getters.basket_no,
                        item_no: getters.item_no,
                        tag: getters.locus ? getters.locus.tag + '.' + tag : "",
                    };
                }


                //locus_no = getters.locus_no;
            } else {
                //console.log('picker locus_id B locus_no: ' + getters.locus_no + '\nloci: ' + JSON.stringify(gettersExtra.loci, null, 2));
                let find = (getters.finds) ? getters.finds.find(x => {
                    return x.id === getters.findable_id;
                }) : null;

                if (!find) {
                    console.log('picker find not found!');
                    return null;
                } else {
                    console.log('picker find: ' + JSON.stringify(find, null, 2));
                    return {
                        id: getters.findable_id,
                        registration_category: find.registration_category,
                        basket_no: find.basket_no,
                        item_no: find.item_no,
                        id_string: find.id_string,
                        tag: find.tag,
                    };
                }
            }
        }



    },
    mutations: {

    },
    actions: {

    }
};
