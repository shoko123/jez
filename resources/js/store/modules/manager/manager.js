
import parser from './routeParser.js';
import status from './status.js';
import dispatcher from './dispatcher.js';

export default {
    namespaced: true,

    state: {
        myModules: [
            {
                module: "loci",
                itemName: "Locus",
                collectionName: "loci",
                storeModuleName: "loci",
                appBaseUrl: "/loci",
                apiBaseUrl: "/api/loci",
            },
            {
                module: "pottery",
                itemName: "Pottery",
                collectionName: "pottery",
                storeModuleName: "pot",
                appBaseUrl: "/finds/pottery",
                apiBaseUrl: "/api/pottery",
            },
            {
                module: "stones",
                itemName: "Stone",
                collectionName: "stones",
                storeModuleName: "stones",
                appBaseUrl: "/finds/stones",
                apiBaseUrl: "/api/stones",
            },
        ],


        item: null,
        collection: null,
        index: null,
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
        summary: {
            itemCount: null,
            imageCount: null,
        },
        
        displayOptions: null,
        displayOptionsIndex: 0,
        isPicker: false,
    },

    getters: {
        //NOTE - although not used, functions must include state and getters in order for the 'root' option to work.
        item(state, getters, rootState, rootGetters) {
            return state.item;
        },

        collection(state, getters, rootState, rootGetters) {
            if(!state.collection) {
                return null;
            }
            return state.collection;
        },
        
        index(state) {
            return state.index;
        },


        adjacents(state, getters, rootState, rootGetters) {
            if (!state.collection || !state.item) {
                //console.log('adjacents not ready - no item, or no collection');
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
            return state.myModules.find(x => {
                return x.module == selectedModule;
            });
        },
        summary(state) {            
            return state.summary;
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

        collectionWithPagination(state, payload) {
            state.collectionWithPagination.collection = payload.data;
            state.collectionWithPagination.pagination.current_page = payload.current_page,
                state.collectionWithPagination.pagination.first_page_url = payload.first_page_url,
                state.collectionWithPagination.pagination.from = payload.from,
                state.collectionWithPagination.pagination.last_page = payload.last_page,
                state.collectionWithPagination.pagination.last_page_url = payload.last_page_url,
                state.collectionWithPagination.pagination.next_page_url = payload.next_page_url,
                state.collectionWithPagination.pagination.path = payload.path,
                state.collectionWithPagination.pagination.per_page = payload.per_page,
                sstate.collectionWithPagination.pagination.prev_page_url = payload.prev_page_url,
                state.collectionWithPagination.pagination.to = payload.to,
                state.collectionWithPagination.pagination.total = payload.total
        },

        item(state, payload) {
            state.item = payload;
        },
        setIndex(state, payload) {
            state.index = payload;
        },
        summary(state, payload) {
            state.summary = payload;
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
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            commit('parsePath', payload);            
            dispatcher.handleRouteChange(state, getters, rootGetters, commit, dispatch);
        },

        loadCollection({ state, getters, commit, dispatch }, payload) {
            state.collection = null;
            console.log('mgr.loadCollection. endpoint: ' + getters["moduleInfo"].apiBaseUrl);
            let xhrRequest = {
                endpoint: getters["moduleInfo"].apiBaseUrl,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading collection", onSuccess: null, onFailure: "failed loading collection", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('mgr loadCollection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('collection', res.data.collection);
                    commit('med/collectionMedia', res.data.media, { root: true });
                    // get index of current item in collection
                    //if (state.item) {
                    commit("setIndex", state.item ? state.collection.findIndex(x => x.id == state.item.id) : null);
                   // } else {
                     //   commit("setIndex", null);
                    //}
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to load collection. err: ' + err);
                    return err;
                })
        },

        loadItem({ state, getters, commit, dispatch }, payload) {
            console.log('mgr.loadItem. endpoint: ' + `${getters["moduleInfo"].apiBaseUrl}/${payload}`);
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
                            commit('fnd/find', res.data.find, { root: true });
                            break;

                        case "loci":
                            //TODO commit locusFinds  as a seperate entity
                            commit('locusFinds/locusFinds', {items: res.data.locusFinds, media: res.data.locusFindsMedia}, { root: true });
                            break;

                    }
                    commit('med/scenes', res.data.media.scenes, { root: true });
                    commit('item', res.data.item);
                    
                    // get index of current item in collection
                    commit("setIndex", state.collection ? state.collection.findIndex(x => x.id == state.item.id) : null);
                    return res;
                })
                .catch(err => {
                    //console.log('mgr Failed to load collection. err: ' + err);
                    return err;
                })
        },

        loadSummary({ state, getters, commit, dispatch }, payload) {
            //console.log('mgr.loadSummary. apiBaseUrl: ' + getters["moduleInfo"].apiBaseUrl);
            let xhrRequest = {
                endpoint: `${getters["moduleInfo"].apiBaseUrl}/summary`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading summary info", onSuccess: null, onFailure: "failed loading info", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('mgr loadCollection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('summary', res.data.summary);
                    return res;
                })
        },

        //delete item by id - must be accompanied by deleting corresponding find record.
        delete({ state, getters, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `${getters.status.moduleApiBaseUrl}/${payload}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting item with id: ${payload}`, onSuccess: `Delete successfull, redirected to first item`, onFailure: "failed to delete item", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('mgr.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    const index = state.collection.findIndex(x => x.id === res.data.item.id);
                    if (index > -1) {
                        console.log("mgr/delete item deleted from collection!");
                        state.collection.splice(index, 1);
                    } else {
                        console.log("mgr/delete item deleted from DB but not found in collection!");
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to delete item. err: ' + err);
                    return err;
                })
        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newItem = {};

            if (getters["status"].isLocus) {
                newItem = rootGetters["loci/newItemData"];
            } else if (getters["status"].isFind) {
                //merge find and item to a flat object
                newItem = {...rootGetters["fnd/newFindData"],...rootGetters[`${getters["moduleInfo"].storeModuleName}/newItemData`]};              
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
                messages: { loading: "storing item", onSuccess: `item ${getters["status"].isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save item`, },
            };
            //console.log("mgr/store before xhr payload: " + JSON.stringify(xhrRequest, null, 2));
            //return;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    if (rootGetters["mgr/status"].isCreate) {
                        //the server returns an item that is formatted to be inserted into "collection".
                        state.collection.push(res.data.item);
                    }
                    //dispatch("clear");
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    return err;
                })
        },

        prepare({ state, getters, rootGetters, commit, dispatch }) {
            console.log("mgr/prepare()");
            //if we create a new item (locus or find), we must copy some data from current item 
            //to the registration module.
            if (getters["status"].isCreate) {
                console.log("mgr/prepare calling reg/prepare");
                dispatch("reg/prepare", null, { root: true });
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
        },

        clear({ state, getters, rootGetters, commit, dispatch }) {
            commit('reg/clear', null, { root: true })
        }
    }

}