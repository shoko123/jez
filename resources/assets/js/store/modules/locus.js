export default {
    namespaced: true,
    state: {
        staticData: {            
            itemName: 'Locus',
            collectionName: 'loci',
            baseURL: 'loci',
            displayOptions: ['data', 'gallery', 'small finds', 'all',],
        },
      
        locus: null,
        loci: [],
        index: null,

        newItem: {
            data: {
                id: null,
                area_id: null,
                locus: null,
                square: null,
                date_opened: null,
                date_closed: null,
                level_opened: null,
                level_closed: null,
                locus_above: null,
                locus_below: null,
                locus_co_existing: null,
                description: null,
                deposit: null,
                registration_notes: null,
                clean: null,
            },
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        collection(state) {
            return state.loci;
        },

        item(state, getters, rootState, rootGetters) {
            if (!state.locus) {
                return null;
            }
            state.locus.finds.forEach(x => {
                if (x.image) {
                    let srcThumbnail = `${rootGetters["med/storageUrl"]}/DB/images/thumbnails/${x.image.id.toString().padStart(6, '0') + "_tn." + x.image.extension}`;
                    x.srcThumbnail = srcThumbnail;
                } else {
                    x.srcThumbnail = null;
                }
            });
            return state.locus;
        },
        index(state) {
            return state.index;
        },

        
        //new locus data
        id(state) {
            return state.newItem.data.id;
        },
        area_id(state) {
            return state.newItem.data.area_id;
        },
        locus_no(state) {
            return state.newItem.data.locus;
        },
        square(state) {
            return state.newItem.data.square;
        },
        date_opened(state) {
            return state.newItem.data.date_opened;
        },
        date_closed(state) {
            return state.newItem.data.date_closed;
        },
        level_opened(state) {
            return state.newItem.data.level_opened;
        },
        level_closed(state) {
            return state.newItem.data.level_closed;
        },
        locus_above(state) {
            return state.newItem.data.locus_above;
        },
        locus_below(state) {
            return state.newItem.data.locus_below;
        },
        locus_co_existing(state) {
            return state.newItem.data.locus_co_existing;
        },
        description(state) {
            return state.newItem.data.description;
        },
        deposit(state) {
            return state.newItem.data.deposit;
        },
        registration_notes(state) {
            return state.newItem.data.registration_notes;
        },
        clean(state) {
            return state.newItem.data.clean;
        },
        newItemData(state) {
            return state.newItem.data;
        },

    },
    mutations: {
        loci(state, payload) {
            console.log('loc.mutation.loci');
            state.loci = payload;
            if (state.locus) {
                state.index = state.loci.findIndex(loc => loc.id == state.locus.id);
            } else {
                state.index = null;
            }
        },

        locus(state, payload) {
            console.log('loc.mutation.locus');
            state.locus = payload;
            //console.log('loc.mutation.locus: ' + JSON.stringify(state.locus, null, 2));
            if (state.loci) {
                state.index = state.loci.findIndex(loc => loc.id == state.locus.id);
            } else {
                state.index = null;
            }
            //console.log('loc.mutation: ' + state.index);                    
        },

        //new locus data
        id(state, payload) {
            return state.newItem.data.id = payload;
        },
        area_id(state, payload) {
            return state.newItem.data.area_id = payload;
        },
        locus_no(state, payload) {
            return state.newItem.data.locus = payload;
        },
        square(state, payload) {
            return state.newItem.data.square = payload;
        },
        date_opened(state, payload) {
            return state.newItem.data.date_opened = payload;
        },
        date_closed(state, payload) {
            return state.newItem.data.date_closed = payload;
        },
        level_opened(state, payload) {
            return state.newItem.data.level_opened = payload;
        },
        level_closed(state, payload) {
            return state.newItem.data.level_closed = payload;
        },
        locus_above(state, payload) {
            return state.newItem.data.locus_above = payload;
        },
        locus_below(state, payload) {
            return state.newItem.data.locus_below = payload;
        },
        locus_co_existing(state, payload) {
            return state.newItem.data.locus_co_existing = payload;
        },
        description(state, payload) {
            return state.newItem.data.description = payload;
        },
        deposit(state, payload) {
            return state.newItem.data.deposit = payload;
        },
        registration_notes(state, payload) {
            return state.newItem.data.registration_notes = payload;
        },
        clean(state, payload) {
            return state.newItem.data.clean = payload;
        },
        // end of new locus data

        prepareNewLocus(state, isCreate) {
            console.log('loc.mutation.prepareNewLocus');
            if (isCreate) {
                state.newItem.data.id = null;
                state.newItem.data.area_id = null;
                state.newItem.data.locus = null;
                state.newItem.data.square = null;
                state.newItem.data.date_opened = null;
                state.newItem.data.date_closed = null;
                state.newItem.data.level_opened = null;
                state.newItem.data.level_closed = null;
                state.newItem.data.locus_above = null;
                state.newItem.data.locus_below = null;
                state.newItem.data.locus_co_existing = null;
                state.newItem.data.description = null;
                state.newItem.data.deposit = null;
                state.newItem.data.registration_notes = null;
                state.newItem.data.clean = null;
            } else {
                state.newItem.data.id = state.locus.id;
                state.newItem.data.area_id = state.locus.area_id;
                state.newItem.data.locus = state.locus.locus;
                state.newItem.data.square = state.locus.square;
                state.newItem.data.date_opened = state.locus.date_opened;
                state.newItem.data.date_closed = state.locus.date_closed;
                state.newItem.data.level_opened = state.locus.level_opened;
                state.newItem.data.level_closed = state.locus.level_closed;
                state.newItem.data.locus_above = state.locus.locus_above;
                state.newItem.data.locus_below = state.locus.locus_below;
                state.newItem.data.locus_co_existing = state.locus.locus_co_existing;
                state.newItem.data.description = state.locus.description;
                state.newItem.data.deposit = state.locus.deposit;
                state.newItem.data.registration_notes = state.locus.registration_notes;
                state.newItem.data.clean = state.locus.clean;
            }
        },
        copyRegistrationDetails(state, registration) {
            console.log("copy to locus registration " + JSON.stringify(registration, null, 2));
            state.newItem.data.area_id = registration.area.id;
            state.newItem.data.locus = registration.locus;

        },
        clear(state) {
            console.log("locus.clear");
            state.locus = null;
            state.loci = null;
            //state.newItem = null;           
        },
    },
    actions: {
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            if (rootGetters["mgr/status"].isCreate) {
                commit("prepareNewLocus", true);
                //dispatch('pkr/prepareItem', null, { root: true });
            } else {
                commit("prepareNewLocus", false);
            }
        },

        collection({ state, commit, dispatch }, payload) {
            state.loci = null;

            let xhrRequest = {
                endpoint: `/api/loci`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading loci", onSuccess: null, onFailure: "failed loading loci", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('loci collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('loci', res.data.loci);
                    //dispatch('pkr/areas', state.loci, { root: true })
                    return res;
                })
                .catch(err => {
                    console.log('loc Failed to load loci. err: ' + err);
                    return err;
                })
        },

        item({ commit, dispatch }, payload) {
            //TODO check if locus is found in local loci[]. If not, load loci[].
            let xhrRequest = {
                endpoint: `/api/loci/${payload}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading locus with id: ${payload}`, onSuccess: null, onFailure: "failed loading locus", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    //commit('med/media', res.data.media, { root: true });
                    commit('med/scenes', res.data.media.scenes, { root: true });
                    commit('locus', res.data.locus);
                    return res;
                })
                .catch(err => {
                    console.log('locus.action.item Failed to load locus. err: ' + err);
                    return err;
                })
        },

        delete({ commit, dispatch }, payload) {
            //we assume that locus is deleteable - done at editor level
            //TODO check here
            let xhrRequest = {
                endpoint: `/api/loci/${payload}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting locus with id: ${payload}`, onSuccess: `Delete successfull, redirected to first locus`, onFailure: "failed to delete locus", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('loc.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.locus.id);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to delete locus. err: ' + err);
                    return err;
                })

        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {

            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.loc.store payload: " + JSON.stringify(rootGetters["loc/newItemData"], null, 2));
            //let newLocus = {
            //    locus: rootGetters["loc/newItemData"],
            //};
            let xhrRequest = {
                endpoint: `/api/loci/store`,
                action: (rootGetters["mgr/status"].isCreate) ? 'post' : 'put',
                data: state.newItem.data,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving locus", onSuccess: `Locus ${rootGetters["mgr/status"].isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save locus`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.loc.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('loc Failed to store locus. err: ' + err);
                    return err;
                })
        },

    }
};
