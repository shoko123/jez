export default {
    registration(state, getters, rootState, rootGetters) {
        if (rootGetters["mgr/status"].isPicker) {
            return {
                areasSeasons: getters["areasSeasons"],
                areaSeasonLoci: getters["areaSeasonLoci"],
                locusFinds: getters["locusFinds"],
                area: getters["area"],
                locus: getters["locus"],
                find: getters["find"],
                area_season_id: state.registrationData.area_season_id,
                locus_id: state.registrationData.locus_id,
                findable_type: state.registrationData.findable_type,
                findable_id: state.registrationData.findable_id,
                isReady: !!state.registrationData.findable_id,
            };
        } else if (rootGetters["mgr/status"].isCreate) {
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

            if(getters["locusFinds"]) {
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
                            return !state.locusFinds.some(y => {
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
                area: getters["area"],
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
        }
    }
}
