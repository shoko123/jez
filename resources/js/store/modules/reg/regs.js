import u from './regsUtil';

export default {
    namespaced: true,

    state: {
        newItem: {
            areaSeasonIndex: null,
            locusIndex: null,
            findIndex: null,
            registration_categoryIndex: null,
            basket_noIndex: 0,
            artifact_noIndex: 0,
            piece_noIndex: 0,
            usePiece: false,
        },
        areasSeasonsObject: null,
        areasSeasonsKeys: [],
        lociObject: null,
        lociKeys: [],
        findsObject: null,
        findsKeys: [],
    },

    getters: {
        status(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                if (rootGetters["mgr/status"].isAreaSeason) {
                    return {
                        ready: state.newItem.areaSeasonIndex !== null,
                        itemId: state.newItem.areaSeasonIndex !== null ? getters["areasSeasons"][state.newItem.areaSeasonIndex].id : null
                    };
                } else if (rootGetters["mgr/status"].isLocus) {
                    return {
                        ready: state.newItem.locusIndex !== null,
                        itemId: state.newItem.locusIndex !== null ? getters["loci"][state.newItem.locusIndex].id : null
                    };
                } else if (rootGetters["mgr/status"].isFind) {
                    return {
                        ready: state.newItem.findIndex !== null,
                        itemId: state.newItem.findIndex !== null ? getters["finds"][state.newItem.findIndex].id : null
                    };
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    if (state.newItem.locusIndex === null) { return { ready: false } };
                    let tag = getters["areasSeasons"][state.newItem.areaSeasonIndex].text + "/" + getters["loci"][state.newItem.locusIndex].text;
                    return { ready: true, tag: tag };
                } else if (rootGetters["mgr/status"].isFind) {

                    if (state.newItem.areaSeasonIndex === null ||
                        state.newItem.locusIndex === null ||
                        state.newItem.registration_category === null) {
                        return { ready: false, tag: "" };
                    }

                    //validity checks
                    let B = getters["basketNos"][state.newItem.basket_noIndex].value;
                    let A = getters["artifactNos"][state.newItem.artifact_noIndex].value;
                    let P = getters["pieceNos"][state.newItem.piece_noIndex].value;
                    let usePiece = state.newItem.usePiece;

                    if ((usePiece && !P) || (!B && !A) || (B && !A && P)) {
                        return { ready: false, tag: "" };
                    }

                    //check that it doesn't already exist in DB.
                    if (getters["finds"].some(x => (
                        x['basket_no'] === B &&
                        x['artifact_no'] === A &&
                        x['piece_no'] === P))) {
                        return { ready: false, tag: "" };
                    }


                    //format tag
                    let tag = getters["areasSeasons"][state.newItem.areaSeasonIndex].text + '/';
                    tag += getters["loci"][state.newItem.locusIndex].text + '.';
                    tag += getters["registrationCategories"][state.newItem.registration_categoryIndex].text + '.';

                    if (B) { tag += "B" + B }
                    if (A) {
                        if (B) {
                            tag += ".";
                        }
                        tag += "A" + A;
                    }
                    if (P) { tag += ".P" + P }

                    return { ready: true, tag: tag };
                }
            }
        },

        areasSeasons(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isPicker) {
                let c = rootGetters["mgr/collections"]("main").collection;
                if (rootGetters["mgr/status"].isAreaSeason) {
                    return c.map(item => { return { text: item.dot, id: item.id } });
                } else if (rootGetters["mgr/status"].isLocus) {


                    const as = [...new Map(c.map(item =>
                        [item['dot'].slice(0, 4), item])).values()];
                    //format them
                    return as.map(x => {
                        return { text: x.dot.slice(0, 4), id: x.id };
                    });
                } else if (rootGetters["mgr/status"].isFind) {
                    //get distinct areasSesons object in collection by using first 4 characters of 'dot'.
                    const areasSeasonFromCollection = [...new Map(c.map(item =>
                        [item['dot'].slice(0, 4), item])).values()];

                    //format them
                    return areasSeasonFromCollection.map(x => {
                        return { text: x.dot.slice(0, 4), id: x.id };
                    });
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                return state.areasSeasonsKeys.map(x => { return { text: state.areasSeasonsObject[x].tag, id: state.areasSeasonsObject[x].id } })
            }
            return [];
        },

        loci(state, getters, rootState, rootGetters) {
            if (state.newItem.areaSeasonIndex === null) { return [] }
            if (rootGetters["mgr/status"].isPicker) {
                let c = rootGetters["mgr/collections"]("main").collection;
                //get all loci for selected area_season_id.
                if (rootGetters["mgr/status"].isLocus) {
                    let areaSeasonDot = getters["areasSeasons"][state.newItem.areaSeasonIndex].text;
                    return c
                        .filter(x => x.dot.slice(0, 4) === areaSeasonDot)
                        .map(y => { return { text: y.dot.split('.')[2], id: y.id }; });
                } else if (rootGetters["mgr/status"].isFind) {
                    let areaSeasonDot = getters["areasSeasons"][state.newItem.areaSeasonIndex].text;
                    let lociForAreaSeason = c.filter(x => x.dot.slice(0, 4) === areaSeasonDot)
                        .map(y => {
                            let pieces = y.dot.split('.');
                            return { text: pieces[2], id: y.id, dot: pieces[0] + '.' + pieces[1] + '.' + pieces[2] };
                        });
                    console.log(`loci for areaSeason:\n${JSON.stringify(lociForAreaSeason, null, 2)}`);



                    //get distinct loci objects from result above.               
                    const distictLoci = [...new Map(lociForAreaSeason.map(item => [
                        item.dot, item])).values()];

                    console.log("distictLoci:\n" + JSON.stringify(distictLoci, null, 2));

                    //format them
                    return distictLoci.map(x => {
                        return { text: x.text, dot: x.dot, tag: x.dot.replaceAll('.', '/') };
                    });
                }
            } else if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    let zeroTo999 = [...Array(1000).keys()];
                    //remove existing loci
                    let possibleLocusNos = zeroTo999.filter(x => { return !state.lociKeys.some(y => state.lociObject[y].locus_no === x); });
                    return possibleLocusNos.map(x => { return { text: x } });
                } else if (rootGetters["mgr/status"].isFind) {
                    return state.lociKeys.map(x => { return { text: state.lociObject[x].locus_no, id: state.lociObject[x].id } });
                }
            }
            return [];
        },

        finds(state, getters, rootState, rootGetters) {
            if ((!rootGetters["mgr/status"].isFind) || state.newItem.locusIndex === null) { return [] }
            if (rootGetters["mgr/status"].isPicker) {

                let c = rootGetters["mgr/collections"]("main").collection;
                let locusDot = getters["loci"][state.newItem.locusIndex].dot
                let length = locusDot.length;
                return c
                    .filter(x => x.dot.substring(0, length) === locusDot)
                    .map(y => { return { text: y.dot, id: y.id }; });
            } else if (rootGetters["mgr/status"].isCreate) {
                return state.findsKeys.map(x => { return state.findsObject[x]; });
            }
            return [];
        },
        showRegistrarFindDetails(state, getters, rootState, rootGetters) {
            return (rootGetters["mgr/status"].isCreate &&
                rootGetters["mgr/status"].isFind &&
                state.newItem.locusIndex !== null &&
                state.newItem.areaSeasonIndex !== null);
        },
        registrationCategories(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            return rootGetters["mgr/status"].moduleRegistrationOptions.map(x => { return { text: x } });
        },

        //always show all baskets
        basketNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            return arr1;
        },
        artifactNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };
            //if using piece_no, allow all artifacts
            if (state.newItem.usePiece) {
                arr1[0] = { value: 0, text: "None Selected" };
                return arr1;
            }

            //take away already existing artifacts
            //if basket selected, allow only artifact that don't already exist in basket.
            //B - basket_no
            let B = getters["basketNos"][state.newItem.basket_noIndex].value;

            state.findsKeys.forEach(function (x, index) {
                let find = state.findsObject[x];
                console.log("find for locus: " + JSON.stringify(find, null, 2));

                //remove artifact only when it has the same reregistration_category and basket_no
                if (find.registration_category === getters["registrationCategories"][state.newItem.registration_categoryIndex].text &&
                    find.basket_no === B) {
                    let index = arr1.map(x => x.value).indexOf(find.artifact_no);
                    console.log(`removing basket ${B} artifact ${find.artifact_no}`);
                    arr1.splice(index, 1);
                }
            })
            return arr1;
        },

        pieceNos(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate || !rootGetters["mgr/status"].isFind) return [];
            if (!state.newItem.usePiece) return [{ value: null }];
            let arr0 = [...Array(100).keys()];
            let arr1 = arr0.map(x => { return { value: x, text: x } });
            arr1[0] = { value: 0, text: "None Selected" };

            state.findsKeys.forEach(x => {
                let find = state.findsObject[x];
                console.log("finds for locus: " + JSON.stringify(find, null, 2));

                //remove piece when it has the same reregistration_category, basket_no, and artifact_no
                if (find.registration_category === getters["registrationCategories"][state.newItem.registration_categoryIndex].text &&
                    find.basket_no === getters["basketNos"][state.newItem.basket_noIndex].value &&
                    find.artifact_no === getters["artifactNos"][state.newItem.artifact_noIndex].value) {
                    //
                    let index = arr1.map(x => x.value).indexOf(find.piece_no);
                    console.log("removing pieces no. " + find.piece_no);
                    arr1.splice(index, 1);
                }
            })

            return arr1;
        },
        usePiece(state) {
            return state.newItem.usePiece;
        },
        newItem(state) {
            return state.newItem;
        },
    },
    mutations: {
        areasSeasonsObject(state, payload) {
            state.areasSeasonsObject = payload;
        },
        areasSeasonsKeys(state, payload) {
            state.areasSeasonsKeys = payload;
        },

        areaSeasonIndex(state, payload) {
            //console.log("regs/areaSeasonIndex.set:  " + JSON.stringify(payload, null, 2));
            state.newItem.areaSeasonIndex = payload;
        },

        lociObject(state, payload) {
            state.lociObject = payload;
        },
        lociKeys(state, payload) {
            state.lociKeys = payload;
        },
        locusIndex(state, payload) {
            //console.log("regs/locusIndex.set:  " + payload);
            state.newItem.locusIndex = payload;
        },

        findsObject(state, payload) {
            state.findsObject = payload;
        },
        findsKeys(state, payload) {
            state.findsKeys = payload;
        },

        findIndex(state, payload) {
            //console.log("regs/findIndex.set:  " + payload);
            state.newItem.findIndex = payload;
        },

        registration_categoryIndex(state, payload) {
            state.newItem.registration_categoryIndex = payload;
        },

        basket_noIndex(state, payload) {
            //console.log("regs/basket_noIndex.set( " + payload + " )");
            state.newItem.basket_noIndex = payload;
        },

        artifact_noIndex(state, payload) {
            //console.log("regs/artifact_noIndex.set( " + payload + " )");
            state.newItem.artifact_noIndex = payload;
        },
        piece_noIndex(state, payload) {
            state.newItem.piece_noIndex = payload;
        },
        usePiece(state, payload) {
            state.newItem.usePiece = payload;
        },
        clear(state) {
            //console.log("regs.clear()");
            state.newItem.areaSeasonIndex = null;
            state.newItem.locusIndex = null;
            state.newItem.findIndex = null;

            state.newItem.registration_categoryIndex = 0;
            state.newItem.basket_noIndex = 0;
            state.newItem.artifact_noIndex = 0;
            state.newItem.piece_noIndex = 0;
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //we only need to load loci if we create a new locus or find.
            //if we are picking from an existing collection, data is already available, and just needs to be filtered.
            //so all left to be done is reset locus_id.
            //area_season_id is already set by the two way binding with the element locus
            //console.log("regs/areaSeasonSelected");
            commit("areaSeasonIndex", payload);
            commit("stp/disableNextButton", true, { root: true });//Because we now need to reselect locus/find.
            commit("locusIndex", null);
            commit("findIndex", null);

            if (rootGetters["mgr/status"].isCreate) {
                u.loadAreaSeasonLoci(commit, dispatch, getters["areasSeasons"][state.newItem.areaSeasonIndex].id);
            } else {
                //console.log(`picker areaSeason selected loci.length: ${getters["loci"].length}`);
                //if picker and loci contain only one item, select it.
                if (getters["loci"].length === 1) {
                    dispatch("locusSelected", 0);
                }
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //console.log("regs/locusSelected");
            commit("locusIndex", payload);

            if (rootGetters["mgr/status"].isCreate) {
                if (rootGetters["mgr/status"].isLocus) {
                    commit("stp/disableNextButton", false, { root: true });
                } else if (rootGetters["mgr/status"].isFind) {
                    commit("findIndex", null);
                    commit("registration_categoryIndex", 0);
                    commit("basket_noIndex", 0);
                    commit("artifact_noIndex", 0);
                    commit("piece_noIndex", 0);
                    u.loadLocusFinds(rootGetters, commit, dispatch, getters["loci"][state.newItem.locusIndex].id)
                        .then(res => {
                            console.log("picker.afterlocusFinds returned");
                        });
                }
            } else {
                commit("findIndex", null);
                //console.log(`picker locus selected finds.length: ${getters["finds"].length}`);
                //if picker and finds contain only one item, select it.
                if (getters["finds"].length === 1) {
                    dispatch("findSelected", 0);
                }
            }
        },

        //picker only
        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //console.log("regs/findSelected");
            commit("findIndex", payload);
        },

        //create find only
        registration_categorySelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("registration_categoryIndex", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        basket_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("basket_noIndex", payload);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        artifact_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("artifact_noIndex", payload);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        piece_noSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("piece_noIndex", payload);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },
        usePiece({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("usePiece", payload);
            commit("basket_noIndex", 0);
            commit("artifact_noIndex", 0);
            commit("piece_noIndex", 0);
            commit("stp/disableNextButton", !getters["status"].ready, { root: true });
        },

        loadAreasSeasons({ state, getters, commit, dispatch, rootGetters }, payload) {
            u.loadAreasSeasons(commit, dispatch, payload)
        },

        //will be called before the creation of a new item (locus, or find).
        //copy some fields from current item defaults for new item here.
        prepare({ state, getters, commit, dispatch, rootGetters }, newItem) {
            console.log(`regs/prepare(): ${rootGetters["mgr/module"]}: ${JSON.stringify(rootGetters["mgr/item"], null, 2)}`);
            commit("clear");
            commit("stp/disableNextButton", true, { root: true });

            if (rootGetters["mgr/status"].isLocus) {

            } else if (rootGetters["mgr/status"].isFind) {

            }
        },

        //called before picker is displayed; put default behaviour here
        preparePicker({ state, getters, rootGetters, commit, dispatch }) {
            //console.log(`preparePicker length: ${getters["areasSeasons"].length} clear()`);
            commit("clear");
            //if we have only one areaSeason in current collection, choose it.
            if (getters["areasSeasons"].length === 1) {
                dispatch("areaSeasonSelected", 0);
            };

        },

        //copy data from registration module to new item (locus or find)
        copyRegistration({ state, getters, rootGetters, commit }) {
            if (rootGetters["mgr/status"].isLocus) {
                commit("loci/registrationData", {
                    area_season_id: getters["areasSeasons"][state.newItem.areaSeasonIndex].id,
                    locus_no: getters["loci"][state.newItem.locusIndex].text,
                }, { root: true });
            } else if (rootGetters["mgr/status"].isFind) {
                commit("fnd/registrationData", {
                    findable_type: rootGetters["mgr/module"],
                    locus_id: getters["loci"][state.newItem.locusIndex].id,
                    registration_category: getters["registrationCategories"][state.newItem.registration_categoryIndex].text,
                    basket_no: getters["basketNos"][state.newItem.basket_noIndex].value,
                    artifact_no: getters["artifactNos"][state.newItem.artifact_noIndex].value,
                    piece_no: state.newItem.usePiece ? getters["pieceNos"][state.newItem.piece_noIndex].value : 0,
                }, { root: true });
            }
        },
    }
}

