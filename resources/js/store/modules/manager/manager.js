
import parser from './routeParser.js';
import status from './status.js';
import dispatcher from './dispatcher.js';
import config from './config.js';

export default {
    namespaced: true,

    state: {
        item: null,
        collection: [],
        index: null,

        xhrStatus: {
            loadingItem: false,
            loadingCollection: false,
            loadingTags: false,
            storingItem: false,
            deletingItem: false,
        },

        status: {
            module: null,
            modulePrevious: null,
            action: null,
            actionPrevious: null,
            findType: null,
            id: null,
            idPrevious: null,
            pathPrevious: null,
        },

        moduleDetails: {
            itemCount: null,
            imageCount: null,
        },

        displayOptions: null,
        displayOptionsIndex: 0,
        isPicker: false,
        isDirtyCollection: false,
    },

    getters: {
        //NOTE - although not used, functions must include state and getters in order for the 'root' option to work.
        item(state) {
            return state.item;
        },

        collection(state) {
            return state.collection;
        },

        index(state) {
            return state.index;
        },

        xhrStatus(state) {
            return state.xhrStatus;
        },

        myModules(state, getters) {
            return config.myModules;
        },

        adjacents(state, getters, rootState, rootGetters) {
            if (state.loadingItem || state.loadingCollection) {
                return;
            }
            if (state.index === -1) {
                console.log('item not found index: ' + getters.index);
                return;
            }

            //console.log('manager.adjacents: id ' + getters.item.id + ' at index ' + getters.index);
            //console.log('manager.next current item: item: ' + JSON.stringify(getters.item, null, 2));
            let nextIndex = null,
                prevIndex = null,
                adjacents = { next: null, prev: null };

            nextIndex = (state.index == state.collection.length - 1) ? 0 : state.index + 1;
            prevIndex = (state.index == 0) ? state.collection.length - 1 : state.index - 1;
            adjacents.next = state.collection[nextIndex].id;
            adjacents.prev = state.collection[prevIndex].id;
            //console.log('adjacent is: ' + JSON.stringify(adjacents, null, 2));
            return adjacents;
        },

        moduleInfo(state, getters) {
            let selectedModule = state.status.module;
            return getters.myModules.find(x => {
                return x.module == selectedModule;
            });
        },
        moduleDetails(state) {
            return state.moduleDetails;
        },

        status(state, getters, rootState, rootGetters) {
            return status.status(state, getters, rootState, rootGetters);
        },
    },
    mutations: {
        parsePath(state, payload) {
            parser.parseRoute(state, payload);
        },
        collection(state, payload) {
            state.collection = payload;
        },
        item(state, payload) {
            state.item = payload;
        },
        setIndex(state, payload) {
            state.index = payload;
        },
        moduleDetails(state, payload) {
            state.moduleDetails = payload;
        },
        loadingItem(state, payload) {
            state.xhrStatus.loadingItem = payload;
        },
        loadingCollection(state, payload) {
            state.xhrStatus.loadingCollection = payload;
        },
        clear(state) {
            console.log("item.clear");
        },
        changeDisplayOption(state, getters) {
            //console.log('changeDisplayOption before index: ' + state.displayOptionsIndex)
            state.displayOptionsIndex = ++state.displayOptionsIndex % state.displayOptions.length;
            //console.log('changeDisplayOption after index: ' + state.displayOptionsIndex)
        },
        isPicker(state, payload) {
            state.isPicker = payload;
        },

        deleteFromCollection(state, index) {
            state.collection.splice(index, 1);

        },
        pushIntoCollection(state, item) {
            state.collection.push(item);
        },
        setDirtyCollection(state, payload) {
            state.isDirtyCollection = payload;
            //console.log("setDirtyCollection: " + payload);
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            commit('parsePath', payload);
            dispatcher.handleRouteChange(state, getters, rootGetters, commit, dispatch, this);
        },

        queryCollection({ state, getters, rootGetters, commit, dispatch }, payload) {
            state.collection = [];
            commit('loadingCollection', true);
            console.log(`mgr.queryCollection. endpoint: ${getters["moduleInfo"].apiBaseUrl}/index`);
            //console.log(`tagParams: ${JSON.stringify(tagQueryParams, null, 2)}`);
            //console.log(`params: ${JSON.stringify(payload, null, 2)}`);
            let xhrRequest = {
                endpoint: `${getters["moduleInfo"].apiBaseUrl}/index`,
                action: "post",
                data: payload.queryParams,//rootGetters["aux/queryParams"],
                spinner: payload.spinner,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading collection", onSuccess: null, onFailure: "failed loading collection", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    if (res.data.collection.length < 1) {
                        commit('snackbar/displaySnackbar', {
                            isSuccess: false,
                            message: "Query resulted with no matches, Please edit query and re-submit"
                        }, { root: true });
                        return res;
                    }

                    console.log(`mgr.collection loaded (${getters.moduleInfo.itemName})`);
                    commit('collection', res.data.collection);
                    commit('med/collectionMedia', res.data.collectionMedia, { root: true });
                    // get index of current item in collection
                    commit("setIndex", state.item ? state.collection.findIndex(x => x.id == state.item.id) : null);
                    commit('setDirtyCollection', false);
                    //console.log(`After return from query`);

                    //redirect to 'list/collection' path
                    if (payload.gotoCollection/*getters["status"].action == "filter"*/) {
                        dispatch('goToRoute', `${getters["moduleInfo"].appBaseUrl}/list`, { root: true });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to load collection. err: ' + err);
                    return err;
                })
                .finally(() => {
                    commit('loadingCollection', false);                 
                })
        },

        loadItem({ state, getters, commit, dispatch }, payload) {
            console.log('mgr.loadItem. endpoint: ' + `${getters["moduleInfo"].apiBaseUrl}/${payload}`);
            commit('loadingItem', true);
            let xhrRequest = {
                endpoint: `${getters["moduleInfo"].apiBaseUrl}/${payload}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading item with id: ${payload}`, onSuccess: null, onFailure: "failed loading item", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into parts - item, find (for finds), locusFinds (for locus) and media.
                    switch (state.status.module) {
                        case "stones":
                        case "pottery":
                            commit('fnd/item', res.data.find, { root: true });
                            break;

                        case "loci":
                            //TODO commit locusFinds  as a seperate entity
                            //commit('locusFinds/locusFinds', { items: res.data.locusFinds, media: res.data.locusFindsMedia }, { root: true });
                            commit('med/locusFindsMedia', res.data.locusFindsMedia, { root: true });
                            break;

                    }
                    commit('med/itemMedia', res.data.itemMedia, { root: true });
                    commit('tag/itemTags', res.data.tags, { root: true });
                    commit('aux/itemTagIds', res.data.tagIds, { root: true });
                    
                    commit('item', res.data.item);


                    // get index of current item in collection
                    commit("setIndex", state.collection.findIndex(x => x.id == state.item.id));
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to load item. err: ' + err);
                    return err;
                })
                .finally(() => {
                    commit('loadingItem', false);
                })
        },

        //delete item by id - must be accompanied by deleting corresponding find record.
        delete({ state, getters, commit, dispatch }, id) {
            //save item index in local collection.
            //console.log(`mgr/delete id: ${id}\ncollection: ${JSON.stringify(state.collection, null, 2)}`);
            let index = state.collection.findIndex(x => x.id ===  id);
            if (index === -1) {
                console.log("can't find item in local collection - abort delete");
                return;
            }

            //prepare delete request
            let xhrRequest = {
                endpoint: `${getters.status.moduleApiBaseUrl}/${id}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting item with id: ${id}`, onSuccess: `Delete successfull, redirected to first item`, onFailure: "failed to delete item", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("mgr/delete item deleted from collection!");
                    commit('deleteFromCollection', index);
                    commit('med/deleteFromCollectionMedia', index, { root: true });
                    commit('setDirtyCollection', true);

                    if (state.collection.length > 0) {
                        //go to the first item in the collection.
                        dispatch('goToRoute', `${getters["moduleInfo"].appBaseUrl}/${state.collection[0].id}/show`, { root: true });
                    } else {
                        //if we deleted the last item, we must load a new collection.
                        dispatch('goToRoute', `${getters["moduleInfo"].appBaseUrl}/filter`, { root: true });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to delete item. err: ' + err);
                    return err;
                })
        },

        store({ state, getters, commit, dispatch, rootGetters }) {
            let newItem = {};

            if (getters["status"].isLocus) {
                newItem = rootGetters["loci/newItem"];
            } else if (getters["status"].isFind) {
                //add find and item to the request.
                newItem = { find: rootGetters["fnd/newItem"], item: rootGetters[`${getters["moduleInfo"].storeModuleName}/newItem`] };

                //store nulls as 0s in DB for easy sorting (see item's queries)
                if (newItem.find.basket_no == null) { newItem.find.basket_no = 0 }
                if (newItem.find.item_no == null) { newItem.find.item_no = 0 }
            }
            //console.log("mgr/store before xhr payload: " + JSON.stringify(newItem, null, 2));
            //return;

            let xhrRequest = {
                endpoint: `${getters.status.moduleApiBaseUrl}/store`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newItem,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "storing item", onSuccess: `item ${getters["status"].isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save item - redirected to previous screen`, },
            };
            //console.log("mgr/store before xhr payload: " + JSON.stringify(xhrRequest, null, 2));
            //return;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    if (rootGetters["mgr/status"].isCreate) {
                        //the server returns an item that is formatted to be inserted into "collection".                       
                        commit('pushIntoCollection', res.data.item);
                    }
                    commit('setDirtyCollection', true);
                    //dispatch("clear");
                    dispatch('goToRoute', `${getters["moduleInfo"].appBaseUrl}/${res.data.item.id}/show`, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    dispatch('goToRoute', `${getters["moduleInfo"].appBaseUrl}/${state.item.id}/show`, { root: true });
                    return err;
                });
        },

        prepare({ state, getters, rootGetters, commit, dispatch }) {
            console.log("mgr/prepare()");
            //if we create a new item (locus or find), we must copy some data from current item 
            //to the registration module.
            if (getters["status"].isCreate) {
                console.log("mgr/prepare calling regs/prepare");
                dispatch("regs/prepare", null, { root: true });
            } else {
                //update
                commit("stp/disableNextButton", false, { root: true });
            }

            //if item is a "find", we must copy some data from current item to the "find" module.
            if (getters["status"].isFind) {
                console.log("mgr/prepare calling fnd/prepare");
                dispatch('fnd/prepare', null, { root: true });
            }

            console.log("mgr/prepare calling " + getters["moduleInfo"].storeModuleName + "/prepare");
            //after these preliminary actions, we finally call the item's prepare method in order to 
            //copy data and load item specific tables (e.g. stone categories).
            dispatch(`${getters["moduleInfo"].storeModuleName}/prepare`, null, { root: true });
            dispatch('stp/populateSteps', null, { root: true });
        },

        loadModuleTags({ state, getters, commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/tags/index`,
                action: 'post',
                data: { "moduleName": getters["moduleInfo"].itemName, },
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading available tags", onSuccess: ``, onFailure: ``, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    //prepare tag module and then specific item module
                    dispatch('tag/loadModuleTags', res.data.tags, { root: true });
                    console.log(`mgr.tag/types loaded (${getters.moduleInfo.itemName})`);
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    return err;
                })
        },

        initializeModule({ state, getters, commit, dispatch }, payload) {
            //console.log('mgr.initializeModule. apiBaseUrl: ' + getters["moduleInfo"].apiBaseUrl);
            let xhrRequest = {
                endpoint: `/api/module-initializer`,
                action: "post",
                data:  { "moduleName": getters["moduleInfo"].itemName, },
                spinner: false,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `initializing ${getters["moduleInfo"].itemName} module info`, onSuccess: null, onFailure: "failed loading module info", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('mgr loadSummary after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('moduleDetails', {itemCount: res.data.itemCount, imageCount: res.data.imageCount});
                    dispatch("aux/typesAndParams", res.data.typesAndParams, { root: true });
                    return res;
                })
        },

        clear({ state, getters, rootGetters, commit, dispatch }) {
            state.collection = [];
            commit('regs/clear', null, { root: true })
            commit('tag/clear', null, { root: true })
        }
    }

}