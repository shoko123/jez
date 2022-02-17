export default {
    namespaced: true,

    state: {
        selected: {
            areaSeason: null,
            locus: null,
            find: null,
        },
    },

    getters: {
        c(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/collections"]("main").collection;
        },

        lists(state, getters) {
            return {
                areasSeasons: getters.areasSeasons,
                loci: getters.loci,
                finds: getters.finds
            };
        },

        flags(state, getters, rootState, rootGetters) {
            return {
                isSelected: {
                    areaSeason: state.selected.areaSeason !== null,
                    locus: state.selected.locus !== null,
                    find: state.selected.find !== null
                },
                isReady: (
                    (rootGetters["mgr/status"].isAreaSeason && state.selected.areaSeason !== null) ||
                    (rootGetters["mgr/status"].isLocus && state.selected.locus !== null) ||
                    (rootGetters["mgr/status"].isFind && state.selected.find !== null)),

            };
        },

        selected(state, getters, rootState, rootGetters) {
            if (getters.flags.isReady) {
                let item = null;
                if (rootGetters["mgr/status"].isAreaSeason) {
                    item = state.selected.areaSeason.dot;
                } else if (rootGetters["mgr/status"].isLocus) {
                    item = state.selected.locus.dot;
                } else if (rootGetters["mgr/status"].isFind) {
                    item = state.selected.find.dot;
                }
                return { ...state.selected, dot: item };

            }
            return state.selected;
        },


        areasSeasons(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isPicker) {
                return [];
            }

            if (rootGetters["mgr/status"].isAreaSeason) {
                return getters.c.map(item => { return { dot: item.dot, text: item.dot.replace('.', '/') } });
            } else if (rootGetters["mgr/status"].isLocus || rootGetters["mgr/status"].isFind) {
                //return getters.c.map(x => { return { dot: x.dot.slice(0, 4), text: x.dot.slice(0, 4).replace('.', '/') } });
                const as = [...new Map(getters.c.map(item =>
                    [item['dot'].slice(0, 4), item])).keys()];
                //format them
                return as.map(item => { return { dot: item, text: item.replace('.', '/') } });
                //.map(x => { return { dot: x.dot.slice(0, 4), text: x.dot.slice(0, 4).replace('.', '/') } });
            }
            return [];
        },

        loci(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isPicker ||
                rootGetters["mgr/status"].isAreaSeason ||
                state.selected.areaSeason === null) { return [] }

            //get all loci for selected areaSeason.
            if (rootGetters["mgr/status"].isLocus) {
                return getters.c
                    .filter(x => x.dot.slice(0, 4) === state.selected.areaSeason.dot)
                    .map(y => { return { dot: y.dot, text: y.dot.split('.')[2] }; });

            } else if (rootGetters["mgr/status"].isFind) {

                let lociDots = getters.c.filter(x => x.dot.slice(0, 4) === state.selected.areaSeason.dot)
                    .map(y => {
                        let pieces = y.dot.split('.');
                        return { text: pieces[2], id: y.id, dot: pieces[0] + '.' + pieces[1] + '.' + pieces[2] };
                    });
                //console.log(`loci for areaSeason:\n${JSON.stringify(lociDots, null, 2)}`);

                //get distinct loci objects from result above.               
                const distictLoci = [...new Map(lociDots.map(item => [
                    item.dot, item])).values()];

                //console.log("distictLoci:\n" + JSON.stringify(distictLoci, null, 2));

                //format them
                return distictLoci.map(x => {
                    return { text: x.text, dot: x.dot };
                });
            }
        },


        finds(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isPicker ||
                rootGetters["mgr/status"].isAreaSeason ||
                rootGetters["mgr/status"].isLocus ||
                state.selected.locus === null) { return [] }
                let n = state.selected.locus.dot.split('.')[2].length;
                return getters.c
                .filter(x => { return x.dot.slice(0, n + 5) === state.selected.locus.dot && n === x.dot.split('.')[2].length})
                .map(y => { let p = y.dot.split('.');
                            let text = p[0] + '/' + p[1] +  '/' + p[2] + '.' + p[3] + '.' + p[4] + '.' + p[5];
                return { dot: y.dot, text }; });
        },

      

    },

    mutations: {
        areaSeason(state, payload) {
            state.selected.areaSeason = payload;
            //console.log(`picker.set(areaSeason) to:  ${JSON.stringify(payload, null, 2)}`);
        },
        locus(state, payload) {
            state.selected.locus = payload;
        },

        find(state, payload) {
            //console.log("regs/areaSeasonIndex.set:  " + JSON.stringify(payload, null, 2));
            state.selected.find = payload;
        },


        clear(state, payload) {
            state.selected[payload] = null;
        },
        clearAll(state, payload) {
            //console.log("regs.clear()");
            state.selected.areaSeason = null;
            state.selected.locus = null;
            state.selected.find = null;
        },
    },

    actions: {
        areaSeasonSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("areaSeason", payload);
            commit("locus", null);
            commit("find", null);

            //console.log(`areaSeason selected loci:  ${JSON.stringify(getters.loci, null, 2)}`);
            //if picker and loci contain only one item, select it.
            if (getters.loci.length === 1) {
                 console.log("select single possible locus");
                dispatch("locusSelected", getters.loci[0]);
            }
        },

        locusSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //console.log("regs/locusSelected");
            commit("locus", payload);
            commit("find", null);
            //if picker and finds contain only one item, select it.
            if (getters.finds.length === 1) {
                console.log("select single possible find");
                dispatch("findSelected", getters.finds[0]);
            }

        },


        findSelected({ state, getters, commit, dispatch, rootGetters }, payload) {
            //console.log("regs/findSelected");
            commit("find", payload);
        },

        //called before picker is displayed; put default behaviour here
        preparePicker({ state, getters, rootGetters, commit, dispatch }) {
            //console.log(`preparePicker length: ${getters["areasSeasons"].length} clear()`);
            commit("areaSeason", null);
            commit("locus", null);
            commit("find", null);
            //if we have only one areaSeason in current collection, choose it.
            if (getters["areasSeasons"].length === 1) {
                dispatch("areaSeasonSelected", getters["areasSeasons"][0]);
            };

        },
    }
}

