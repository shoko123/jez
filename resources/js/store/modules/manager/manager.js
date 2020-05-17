
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
                storeModuleName: "pottery",
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
        isDirtyCollection: false,
    },

    getters: {
        //NOTE - although not used, functions must include state and getters in order for the 'root' option to work.
        item(state, getters, rootState, rootGetters) {
            return state.item;
        },

        collection(state, getters, rootState, rootGetters) {
            if (!state.collection) {
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


        deleteFromCollection(state, index) {
            state.collection.splice(index, 1);
        },
        pushIntoCollection(state, item) {
            state.collection.push(item);
        },
        setDirtyCollection(state, payload) {
            state.isDirtyCollection = payload;
            console.log("setDirtyCollection: " + payload);
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            commit('parsePath', payload);
            dispatcher.handleRouteChange(state, getters, rootGetters, commit, dispatch, this);
        },

        queryCollection({ state, getters, rootGetters, commit, dispatch }) {
            state.collection = null;
            let tagQueryParams = rootGetters["tag/activeFilterTagsByType"];
            let itemQueryParams = "";
                    
            console.log(`mgr.queryCollection. endpoint: ${getters["moduleInfo"].apiBaseUrl}/query`);
            //console.log(`tagParams: ${JSON.stringify(tagQueryParams, null, 2)}`);
            //console.log(`params: ${JSON.stringify(payload, null, 2)}`);
            let xhrRequest = {
                endpoint: `${getters["moduleInfo"].apiBaseUrl}/query`,
                action: "post",
                data: { "tagParams": tagQueryParams, "itemParams": itemQueryParams },
                spinner: true,
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

                        //state.snackbar.color = 'red';
                        //state.snackbar.message = "Query resulted with no matches, Please edit query and resubmit";
                        //state.snackbar.value = true;
                        return res;
                    }

                    //console.log('mgr queryCollection after xhr res: ' + JSON.stringify(res.data.params, null, 2));
                    commit('collection', res.data.collection);
                    commit('med/collectionMedia', res.data.media, { root: true });
                    // get index of current item in collection
                    commit("setIndex", state.item ? state.collection.findIndex(x => x.id == state.item.id) : null);
                    commit('setDirtyCollection', false);
                    console.log(`After return from query`);
                    //redirect to 'list/collection' path

                    if (getters["status"].action == "filter") {
                        commit('goToRoute', rootGetters["getRouter"].currentRoute.path.replace("filter", "list"), { root: true });                   
                    }


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
                            commit('locusFinds/locusFinds', { items: res.data.locusFinds, media: res.data.locusFindsMedia }, { root: true });
                            break;

                    }
                    commit('med/scenes', res.data.media.scenes, { root: true });
                    commit('tag/itemTags', res.data.tags, { root: true });
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
                        commit('deleteFromCollection', index);
                        commit('setDirtyCollection', true);
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

        store({ state, getters, commit, dispatch, rootGetters }) {
            let newItem = {};

            if (getters["status"].isLocus) {
                newItem = rootGetters["loci/newItem"];
            } else if (getters["status"].isFind) {
                //merge find and item to a flat object
                newItem = { ...rootGetters["fnd/newFindData"], ...rootGetters[`${getters["moduleInfo"].storeModuleName}/newItemData`] };
                
                //store nulls as 0s in DB for easy sorting (see item's queries)
                if (newItem.basket_no == null) { newItem.basket_no = 0 }
                if (newItem.item_no == null) { newItem.item_no = 0 }
            }
            newItem.tagsByType = rootGetters["tag/activeNewItemTagsByType"];
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
                        commit('pushIntoCollection', res.data.item);
                    }
                    commit('setDirtyCollection', true);
                    //dispatch("clear");
                    commit('goToRoute', `${getters["moduleInfo"].appBaseUrl}/${res.data.item.id}/show`, { root: true });             
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
            dispatch(`tag/prepare`, null, { root: true });
            dispatch('stp/populateSteps', null, { root: true });
        },

         //a generic api call to get tags of a certain item
         prepareFilter({ state, getters, commit, dispatch, rootGetters, root }) {
            if(rootGetters["tag/tagsReady"]) {
                return;
            }
            dispatch('loadFilters')
        },
        
        loadFilters({ state, getters, commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/tags/query`,
                action: 'post',
                data: { type_prefix: getters.moduleInfo.itemName, },
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading available tags", onSuccess: ``, onFailure: ``, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
            .then(res => {
                let tagsFormatted = res.data.tags.map(tag => {
                    tag.type = tag.type.split(':')[1];
                    return tag;
                });
                //prepare tag module and then specific item module
                dispatch('tag/prepareFilter', tagsFormatted, { root: true });
                //dispatch(`${getters["moduleInfo"].storeModuleName}/prepareFilter`, null, { root: true });

                return res;
            })
            .catch(err => {
                console.log('mgr/store err: ' + err);
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
                    //console.log('mgr loadSummary after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('summary', res.data.summary);
                    return res;
                })
        },


        clear({ state, getters, rootGetters, commit, dispatch }) {
            state.collection = null;
            commit('regs/clear', null, { root: true })
            commit('tag/clear', null, { root: true })
        }
    }

}