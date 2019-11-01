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

        allowedRegistrationCategories(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/moduleItemName"]) {
                case "Stone":
                    return ["AR", "GS"];
                case "PotteryBasket":
                    return ["PT"];
                case "Lithic":
                    return ["AR", "LB"];
                case "Glass":
                    return ["AR"];
            }
        },

        allowedBasketNos(state, getters, rootState, rootGetters) {
            if (!getters["fromDbLocusFinds"]) {
                return null;
            }

            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1)
            switch (getters.registration_category) {
                case "PT":
                    let possiblePTbasketNos = oneTo99.filter(x => {
                        return !getters["fromDbLocusFinds"].some(y => {
                            return (y.basket_no === x && y.findable_type === getters.findable_type)
                        })
                    })
                    return possibleLoci;

                case "GS":
                case "FL":
                    return oneTo99;
                default:
                    return [];
            }
        },

        allowedItemNos(state, getters, rootState, rootGetters) {
            let oneTo99 = Array.from({ length: 99 }, (v, k) => k + 1);

            switch (getters.registration_category) {
                case "PT":
                    return [];
                case "AR":
                    return oneTo99.filter(x => {
                        return !getters["fromDbLocusFinds"].some(y => {
                            return (y.item_no === x && y.findable_type === getters.findable_type)
                        })
                    });
                case "GS":
                case "FL":
                    return oneTo99.filter(x => {
                        return !getters["fromDbLocusFinds"].some(y => {
                            return (y.item_no === x &&
                                y.findable_type === getters.findable_type &&
                                y.basket_no === getters.basket_no &&
                                y.registration_category === getters.registration_category)
                        })
                    });
            }
        }
    },
    mutations: {

    },
    actions: {

    }
};
