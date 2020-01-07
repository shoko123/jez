export default {
    namespaced: true,
    state: {
        staticData: {
            itemName: 'Pottery',
            collectionName: 'pottery',
            baseURL: '/finds/pottery',
            displayOptions: ['data','gallery', 'all'],
            registrationCategories: ['PT', 'AR'],
        },
        item: null,
        collection: null,
        index: null,

        newItem: {
            data: {
                id: null,
                find_id: null,
                periods: null,
                notes: null,
                description: null,
            },
            dataExtra: {
            },
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        collection(state) {
            return state.collection;
        },
        item(state) {
            return state.item;
        },
        //index of currently displayed item in collection[]
        index(state) {
            return (state.index);
        },


        /////New pottery

        periods(state) {
            return state.newItem.data.weight;
        },
        notes(state) {
            return state.newItem.data.notes;
        },
        measurements(state) {
            return state.newItem.data.measurements;
        },

        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        collection(state, payload) {
            state.collection = payload;
            console.log('ptr.mutation.collection');
            if (state.item) {
                state.index = state.collection.findIndex(x => x.id == state.item.id);
            } else {
                state.index = null;
            }
        },

        item(state, payload) {
            state.item = payload;

            if (state.collection) {
                state.index = state.collection.findIndex(x => x.id == state.item.id);
            } else {
                state.index = null;
            }
        },

        periods(state, payload) {
            state.newItem.data.periods = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        description(state, payload) {
            state.newItem.data.description = payload;
        },
        newItemData(state, payload) {
            state.newItem.data = payload;
        },
        deleteFromStore(state, payload) {
            console.log('ptr.deleteFromStore id: ' + payload);
            state.item = null;
            let index = state.collection.findIndex(x => x.id == payload);
            if (index === -1) {
                console.log('store - pottery delete - couldn\'t find pottery with id: ' + payload);
                return;
            }
            state.collection.splice(index, 1);
            //state.collection.splice(state.collection.findIndex(gs => gs.id === payload), 1);
        },


        prepareNewItem(state, newItem) {
            if (newItem) {
                state.newItem.data.id = null;
                state.newItem.data.find_id = null;
                state.newItem.data.periods = null;
                state.newItem.data.description = null;
                state.newItem.data.notes = null;
            } else {
                state.newItem.data.id = state.item.id;
                state.newItem.data.find_id = state.item.find_id;
                state.newItem.data.periods = state.item.periods;
                state.newItem.data.description = state.item.description;
                state.newItem.data.notes = state.item.notes;
            }
        },
        clear(state) {
            console.log("pottery.clear");
            state.collection = null;
            state.item = null;
            //state.newItem = null;           
        },
    },

    actions: {
        collection({ state, commit, dispatch }, payload) {
            state.collection = null;

            let xhrRequest = {
                endpoint: `/api/pottery`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading collection", onSuccess: null, onFailure: "failed loading collection", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('Pottery collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('collection', res.data.collection);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load collection. err: ' + err);
                    return err;
                })
        },
        item({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/pottery/${payload}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading pottery with id: ${payload}`, onSuccess: null, onFailure: "failed loading pottery", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into parts - grounpottery, find, and media.
                    commit('fnd/find', res.data.find, { root: true });
                    //commit('med/media', res.data.media, { root: true });
                    commit('med/scenes', res.data.media.scenes, { root: true });
                    commit('item', res.data.item);
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load collection. err: ' + err);
                    return err;
                })
        },
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("prepareNewItem", rootGetters["mgr/status"].isCreate);
            commit('fnd/prepareNewFind', rootGetters["mgr/status"].isCreate, { root: true });
        },

        //delete pottery by id - must be accompanied by deleting corresponding find record.
        delete({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/pottery/${payload}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting pottery with id: ${payload}`, onSuccess: `Delete successfull, redirected to first pottery`, onFailure: "failed to delete pottery", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('gss.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.item.id);
                    return res;
                })
                .catch(err => {
                    console.log('ptr Failed to delete pottery. err: ' + err);
                    return err;
                })

        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newItem = {
                pottery: state.newItem.data,
                find: rootGetters["fnd/newFindData"],
            };
            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.gs.store payload: " + JSON.stringify(newItem, null, 2));
            let xhrRequest = {
                endpoint: `/api/pottery/create`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newItem,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving pottery", onSuccess: `Pottery ${getters.isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save pottery item`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.ptr.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load collection. err: ' + err);
                    return err;
                })
        },
    }
}