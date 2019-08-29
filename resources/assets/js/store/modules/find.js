export default {
    namespaced: true,
    state: {
        newItem: {
            data: {
                id: null,//findId
                registration_category: null,
                locus_id: null,
                basket_no: null,
                item_no: null,
                findable_type: null,
                findable_id: null,
                related_pottery_basket: null,
                date: null,
                description: null,
                notes: null,
                square: null,
                keep: false,
                drawn: false,
                level_top: null,
                level_bottom: null,
                quantity: null,
                storage_location: null,
            },
            dataExtra: {
                areas: null,//[]
                loci: null,//[]
                finds: null,//[]
                registrationCategories: ['PT', 'AR', 'GS', 'LB', 'FL'],
                area_id: null,
                itemTag: null,
                locus_id_string: null,
            },

        },

        find: null,
    },
    getters: {
        find(state) {
            return state.find;
        },
        
        newFindData(state) {
            return state.newItem.data;
        },
        
        newItemTag(state) {
            if (!state.newItem.dataExtra.locus_id_string) {
                return '';
            }

            let tag = state.newItem.dataExtra.locus_id_string.replace(/\./g, '/') + '.' + state.newItem.data.registration_category + '.';
            switch (state.newItem.data.registration_category) {
                case "GS":
                    if (state.find.findable_type == 'Groundstone') {
                        tag += state.newItem.data.basket_no + '.' + state.newItem.data.item_no;
                    }
                    break;

                case "PT":
                    tag += state.newItem.data.basket_no;
                    break;

                default:
                    tag += state.newItem.data.item_no;
            }
            return tag;
        },
       
        findNextId(state, getters, rootState) {
            //if for some reason we don't have our find or list set (hydrated)
            //we can't proceed
            if (!rootState.gs.groundstones || !rootState.gs.groundstone) {
                return (null);
            }

            let index = rootState.gs.groundstones.findIndex(gs => gs.id === rootState.gs.groundstone.id);

            if (index == rootState.gs.groundstones.length - 1) {
                index = 0;
            } else {
                ++index;
            }
            //console.log('store.findNextId: ' + rootState.gs.groundstones[index].id);
            return rootState.gs.groundstones[index].id;

        },
        findPrevId(state, getters, rootState) {
            //if for some reason we don't have our find or list set (hydrated)
            //we can't proceed.
            if (!rootState.gs.groundstones || !rootState.gs.groundstone) {
                return (null);
            }

            let index = rootState.gs.groundstones.findIndex(gs => gs.id === rootState.gs.groundstone.id);

            if (index == 0) {
                index = rootState.gs.groundstones.length - 1;
            } else {
                --index;
            }
            //console.log('store.findPrevId: ' + rootState.gs.groundstones[index].id);
            return rootState.gs.groundstones[index].id;
        },
        newItem(state) {
            return state.newItem;
        },

        areas(state) {
            return state.newItem.dataExtra.areas;
        },
        loci(state) {
            return state.newItem.dataExtra.loci;
        },
        findListForLocus(state) {
            return state.newItem.dataExtra.finds;
        },
        locusTag(state) {
            return state.newItem.dataExtra.locus_id_string;
        },

        area_id(state) {
            return state.newItem.dataExtra.area_id;
        },
        locus_id(state) {
            return state.newItem.data.locus_id;
        },
        registrationCategories(state) {
            return state.newItem.dataExtra.registrationCategories;
        },
        basket_no(state) {
            return state.newItem.data.basket_no;
        },
        item_no(state) {
            return state.newItem.data.item_no;
        },
        registration_category(state) {
            return state.newItem.data.registration_category;
        },
        findable_type(state) {
            return state.newItem.data.findable_type;
        },
        findable_id(state) {
            return state.newItem.data.findable_id;
        },

        date(state) {
            return state.newItem.data.date;
        },
        square(state) {
            return state.newItem.data.square;
        },
        keep(state) {
            return state.newItem.data.keep;
        },
        drawn(state) {
            return state.newItem.data.drawn;
        },
        level_top(state) {
            return state.newItem.data.level_top;
        },
        level_bottom(state) {
            return state.newItem.data.level_bottom;
        },
        storage_location(state) {
            //console.log("store.find.set.storage_location: " + payload);
            return state.newItem.data.storage_location;
        },

        description(state) {
            return state.newItem.data.description;
        },
        find_notes(state) {
            return state.newItem.data.notes;
        },
        related_pottery_basket(state) {
            return state.newItem.data.related_pottery_basket;
        },
    },
    mutations: {
        find(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.find = payload;
        },
        newItemTag(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.newItem.data = payload;
        },

        areas(state, payload) {
            console.log("find.mutate.areas payload: " + JSON.stringify(payload, null, 2));
            state.newItem.dataExtra.areas = payload.map(area => ({
                id: area.id,
                year: area.name,
                tag: area.year + "." + area.area,
                loci: area.loci
            }));
        },

        loci(state, payload) {
            state.newItem.dataExtra.loci = payload;
        },
        newFindData(state, payload) {
            state.newItem.data = payload;
        },

        findListForLocus(state, payload) {
            state.newItem.dataExtra.finds = payload.finds;
            state.newItem.dataExtra.locus_id_string = payload.id_string;
            //set default basket and item

        },

        area_id(state, payload) {
            state.newItem.dataExtra.area_id = payload;
        },
        locus_id(state, payload) {
            state.newItem.data.locus_id = payload;
        },
        locus_id_string(state, payload) {
            state.newItem.dataExtra.locus_id_string = payload;
        },
        registration_category(state, payload) {
            state.newItem.data.registration_category = payload;
        },

        basket_no(state, payload) {
            state.newItem.data.basket_no = payload;
        },
        item_no(state, payload) {
            state.newItem.data.item_no = payload;
        },

        findable_type(state, payload) {
            state.newItem.data.findable_type = payload;
        },
        findable_id(state, payload) {
            state.newItem.data.findable_id = payload;
        },
        date(state, payload) {
            state.newItem.data.date = payload;
        },
        square(state, payload) {
            state.newItem.data.square = payload;
        },
        related_pottery_basket(state, payload) {
            state.newItem.data.related_pottery_basket = payload;
        },
        keep(state, payload) {
            state.newItem.data.keep = payload;
        },
        drawn(state, payload) {
            state.newItem.data.drawn = payload;
        },
        level_top(state, payload) {
            state.newItem.data.level_top = payload;
        },
        level_bottom(state, payload) {
            state.newItem.data.level_bottom = payload;
        },
        storage_location(state, payload) {
            //console.log("store.find.set.storage_location: " + payload);
            state.newItem.data.storage_location = payload;
        },

        description(state, payload) {
            state.newItem.data.description = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        clear(state, payload) {
            state.newItem.data.related_pottery_basket = null;
            state.newItem.data.date = null;
            state.newItem.data.description = null;
            state.newItem.data.notes = null;
            state.newItem.data.square = null;
            state.newItem.data.keep = false,
            state.newItem.data.drawn = false,
            state.newItem.data.level_top = null;
            state.newItem.data.level_bottom = null;
            state.newItem.data.quantity = null;
            state.newItem.data.storage_location = null;           
        },
    },
    actions: {
        lociListForArea({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/areas/` + payload + `/lociListForArea`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.verbose = false;

            xhrRequest.messages.whileLoading = `loading loci for area ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("fn/loci", res.data.lociForArea, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('update Failed to load loci: ' + err);
                    return err;
                })
        },

        findListForLocus({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/loci/` + payload + `/findListForLocus`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.verbose = false;

            xhrRequest.messages.whileLoading = `loading loci for area ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("fn/findListForLocus", res.data, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('findListForLocus Failed to load finds: ' + err);
                    return err;
                })
        },

        findRegistrationLocusId({ commit, dispatch }, payload) {
            let myPayload = { locus_id: payload, mutate: false };
            return dispatch('locus', myPayload, { root: true })
                .then(res => {
                    commit('findRegistrationLocus', res);
                    return res;
                })
                .catch(err => {
                    console.log("Error in dispatch: " + err);
                });
        },
    }
}
