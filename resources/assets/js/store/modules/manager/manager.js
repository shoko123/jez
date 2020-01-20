
import parser from './routeParser.js';
import utility from './utility.js';
import config from './config.js';

export default {
    namespaced: true,

    modules: {
        parser: parser,
        //status: status,
        config: config,
    },

    state: {
        myModules: [
            {
                module: "loci",
                itemName: "Locus",
                collectionName: "loci",
                appBaseUrl: "/loci",
                apiBaseUrl: "/api/loci",
            },
            {
                module: "pottery",
                itemName: "Pottery",
                collectionName: "pottery",
                appBaseUrl: "/finds/pottery",
                apiBaseUrl: "/api/pottery",
            },
            {
                module: "stones",
                itemName: "Stone",
                collectionName: "stones",
                appBaseUrl: "/finds/stones",
                apiBaseUrl: "/api/stones",
            },
        ],


        item: null,
        collection: null,
        index: null,
        status: {
            //module: null,
            modulePrevious: null,
            action: null,
            actionPrevious: null,
            findType: null,
            id: null,
            idPrevious: null,
            pathPrevious: null,
        },
        module: null,
        displayOptions: null,
        displayOptionsIndex: 0,
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


        adjacents(state, getters, rootState, rootGetters) {
            if (!state.collection || !state.item) {
                console.log('adjacents not ready - no item, or no collection');
                return;
            }
            if (getters.index === -1) {
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
            console.log('adjacent is: ' + JSON.stringify(adjacents, null, 2));
            return adjacents;
        },

        moduleInfo(state, getters) {
            let selectedModule = state.module;
            return state.myModules.find(x => {
                return x.module == selectedModule;
            });

        },

        status(state, getters, rootState, rootGetters) {
            function isImplemented() {
                switch (state.module) {
                    case "stones":
                    case "pottery":
                    case "loci":
                        return true;
                    default:
                        return false;
                }
            }

            function isFind() {
                switch (state.module) {
                    case "stones":
                    case "glass":
                    case "pottery":
                    case "lithics":
                        return true;

                    default:
                        return false;
                }
            }
            function registrationCategories() {
                if (!isFind()) {
                    return null;
                }
                return rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].registrationCategories : null;
            }
            //notice -plurals
            function getDisplayOptions() {
                let displayOptionsArr = rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].displayOptions : null;
                if (displayOptionsArr) {
                    state.displayOptions = displayOptionsArr;
                }
                return displayOptionsArr;
            }
            //notice -single
            function getDisplayOption() {
                if (!state.displayOptions) {
                    return null;
                }
                return { index: state.displayOptionsIndex, text: state.displayOptions[state.displayOptionsIndex] };
            }

            function hasMedia() {
                if (!rootGetters["med/scenes"]) {
                    return true;
                } else {
                    return rootGetters["med/scenes"].length ? true : false;
                }
            }
            function hasRelatedModules() {
                if (state.module === 'loci') {
                    if (!getters.item) {
                        return true;
                    } else {
                        return rootGetters["locusItems/locusItems"] ? true : false;
                    }
                } else {
                    return false;
                }
            }
            function isDeleteable() {
                return (!hasMedia() && !hasRelatedModules());
            }


            let status = {
                itemName: getters["moduleInfo"] ? getters["moduleInfo"].itemName : null,//rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].itemName : null,
                collectionName: getters["moduleInfo"] ? getters["moduleInfo"].collectionName : null,//rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].collectionName : null,
                moduleAppBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].appBaseUrl : null,//rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].moduleAppBaseUrl : null,
                moduleApiBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].apiBaseUrl : null,//rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].moduleApiBaseUrl : null,

                displayOptions: getDisplayOptions(),//rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].displayOptions : null,
                registrationCategories: registrationCategories(),
                moduleName: state.module,
                modulePrevious: state.status.modulePrevious,
                pathPrevious: state.status.pathPrevious,
                action: state.status.action,
                actionPrevious: state.status.actionPrevious,
                id: state.status.id,
                idPrevious: state.status.idPrevious,

                isImplemented: isImplemented(),
                count: getters.collection ? getters.collection.length : 0,
                isLocus: (state.module === "loci"),
                isFind: isFind(),
                isCreate: (state.status.action === "create"),
                isUpdate: (state.status.action === "update"),
                isShow: (state.status.action === "show"),
                isCreateLocus: (state.status.action === "create" && state.module === "loci"),
                isCreateFind: (state.status.action === "create" && isFind()),
                isMediaEdit: (state.status.action === "media"),
                isEdit: (state.status.action === "create" || state.status.action === "update" || state.status.action === "media"),
                displayOption: getDisplayOption(),
                hasMedia: hasMedia(),
                hasRelatedModules: hasRelatedModules(),
                isDeleteable: isDeleteable(),
            };
            return status;
        },

        getBaseAddressFromItemName: (state, getters) => (itemName) => {
            switch (itemName) {
                case "Stone":
                    return `/finds/stones`;
                case "Lithic":
                    return `/finds/lithics`;
                case "Pottery": return `/finds/potterys`;
            }
        },
    },
    mutations: {
        parsePath(state, payload) {

            //TODO this needs a lot of work to make more reasonable, but it works for now.

            let sections = payload.to.path.split('/');
            state.status.pathPrevious = payload.from.path;
            state.status.modulePrevious = state.module;
            state.status.idPrevious = state.status.id;
            state.status.actionPrevious = state.status.action;
            //console.log('parsePaths.from ' + JSON.stringify(fromTokens, null, 2));
            //console.log('parsePaths.to: ' + JSON.stringify(sections, null, 2));
            //let path = payload.to.path;

            switch (sections[1]) {
                case '':
                    //whenever we change module we clear the old one. so let make the old one 'aut'
                    //TODO fix this nonesense
                    state.status.modulePrevious = state.module = 'aut';
                    break;

                case 'login':
                    state.module = 'aut';
                    state.status.action = 'login';
                    break;

                case 'loci':
                    state.module = 'loci';
                    state.status.action = sections[sections.length - 1];
                    state.status.id = payload.to.params ? payload.to.params.id : null;
                    //state.status.actionPrevious = null;
                    break;

                case 'finds':
                    state.status.action = sections[sections.length - 1];
                    state.status.id = payload.to.params ? payload.to.params.id : null;
                    switch (sections[2]) {
                        case 'stones':
                            state.module = 'stones';
                            break

                        case 'pottery':
                            state.module = 'pottery';
                            break

                        default:
                            state.module = 'unknown';
                            alert('unknown find type');
                            break

                    }
                    break;
                default:
                    console.log('can\'t parse path');
            };

            state.status.action = sections[sections.length - 1]
            console.log('parsePaths to.path: ' + JSON.stringify(payload.to.path, null, 2) + '\nsections: ' + JSON.stringify(sections, null, 2));
            console.log('parsePaths state.module: ' + state.module);
            console.log('parsePaths status: ' + JSON.stringify(state.status, null, 2));
        },
        collection(state, payload) {
            state.collection = payload;
            if (state.item) {
                state.index = state.collection.findIndex(x => x.id == state.item.id);
            } else {
                state.index = null;
            }
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

            if (state.collection) {
                state.index = state.collection.findIndex(x => x.id == state.item.id);
            } else {
                state.index = null;
            }
        },




        deleteFromStore(state, payload) {
            console.log('mgr/deleteFromStore id: ' + payload);
        },

        addToStore(state, payload) {
            //console.log('mgr/addToStore: ' + JSON.stringify(payload));        
        },

        prepareNew(state, newitem) {

        },
        clear(state) {
            console.log("item.clear");
        },
        changeDisplayOption(state, getters) {
            //console.log('changeDisplayOption before index: ' + state.displayOptionsIndex)
            state.displayOptionsIndex = ++state.displayOptionsIndex % state.displayOptions.length;
            //console.log('changeDisplayOption after index: ' + state.displayOptionsIndex)
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            function sameModule() {
                return (state.module == state.status.modulePrevious)
            }

            commit('parsePath', payload);
            //console.log('mgr.routeChanged.show sameModule: ' + sameModule());
            if (!sameModule()) {
                state.collection = null;

                commit('reg/clear', null, { root: true })
            }

            switch (state.status.action) {
                case "show":

                    if (sameModule()) {
                        //if no collection loaded yet, retrieve new module's collection and then item
                        if (!getters.collection) {
                            //if same module, but collection empty, retrieve collection and then item
                            dispatch("loadCollection", null)
                                .then((res) => {
                                    console.log('mgr.routeChanged.show after loading collection. loading item...');// + JSON.stringify(res, null, 2));
                                    dispatch("loadItem", state.status.id)
                                    return res;
                                })
                                .then((res) => {
                                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                                    console.log('mgr.show after loading item');
                                    //dispatch("pkr/prepareItem", false, { root: true });
                                    return res;
                                })
                                .catch(err => {
                                    console.log('mgr.show failed to load');
                                    return err;
                                })
                        } else {
                            if (state.status.idPrevious !== state.status.id || state.status.actionPrevious === "update") {
                                //collection loaded - load item only
                                console.log("mgr - new item id - loading")
                                dispatch("loadItem", state.status.id)
                                    .then((res) => {
                                        //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                                        console.log('mgr.show after loading item');
                                        //dispatch("pkr/prepareItem", false, { root: true });
                                        return res;
                                    })
                            } else {
                                console.log("mgr - same item id - not loading")
                            }
                        }
                    }
                    else {
                        state.displayOptionsIndex = 0;
                        //if not same module, clear old module and retrieve new module's collection and then item 
                        //dispatch(`${getters.stattus.modulePrevious + '/clear'}`, null, { root: true })
                        dispatch("loadItem", state.status.id)
                            .then((res) => {
                                console.log('mgr.routeChanged.show after loading item. loading collection...');// + JSON.stringify(res, null, 2));
                                dispatch("loadCollection", null);
                                return res;
                            })
                            .then((res) => {
                                //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                                console.log('mgr.show after loading item');
                                //dispatch("pkr/prepareItem", false, { root: true });
                                return res;
                            })
                            .catch(err => {
                                console.log('mgr.show failed to load');
                                return err;
                            })
                    }
                    break;

                case "welcome":
                //dispatch("pkr/loadAreasSeasons", null, { root: true });


                case "list":
                    console.log('mgr.routeChanged.list or welcome');// + JSON.stringify(res, null, 2));
                    //if same module, retrieve collection if not already populated
                    //if(!sameModule() || !getters.collection) {
                    //dispatch("mgr/loadCollection", null, { root: true });
                    dispatch("loadCollection", null);
                    //}
                    break;

                case "create":
                    dispatch(`${state.module + '/prepareNewItem'}`, true, { root: true });
                    dispatch("reg/prepareItem", true, { root: true });
                case "update":

                    //console.log("update call utility item: " + JSON.stringify(utility.util1(rootGetters), null, 2));
                    //dispatch(`${state.module + '/prepareNewItem'}`, null, { root: true });
                    dispatch("prepare", null);
                default:
            }
        },
        loadCollection({ state, getters, commit, dispatch }, payload) {
            state.collection = null;
            console.log('mgr.loadCollection. apiBaseUrl: ' + getters["moduleInfo"].apiBaseUrl);
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
                    switch (state.module) {
                        case "stones":
                        case "pottery":
                            commit('fnd/find', res.data.find, { root: true });
                            break;

                        case "loci":
                            //TODO commit locusFinds  as a seperate entity
                            commit('locusFinds/locusFinds', res.data.locusFinds, { root: true });
                            break;

                    }
                    commit('med/scenes', res.data.media.scenes, { root: true });
                    commit('item', res.data.item);
                    return res;
                })
                .catch(err => {
                    //console.log('mgr Failed to load collection. err: ' + err);
                    return err;
                })
        },
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("prepareNewitem", rootGetters["mgr/status"].isCreate);
            commit('fnd/prepareNewFind', rootGetters["mgr/status"].isCreate, { root: true });
        },
        prepare({ state, getters, commit, dispatch, rootGetters }, payload) {
            //this function prepares app for create/update according to current item.
            //currently we deal with only 2 cases locus, and finds.
            if (getters["status"].isLocus) {
                let data = rootGetters["mgr/item"];
                let dataExtra = { tag: rootGetters["mgr/item"].tag};
                delete data.id_string;
                delete data.tag;
                delete data.area;
                
                dispatch("loci/prepare",
                    {
                        isCreate: rootGetters["mgr/status"].isCreate,
                        data: rootGetters["mgr/item"],
                        dataExtra: dataExtra,
                    },
                    { root: true });
            } else if (getters["status"].isFind) {

            }
            //commit("prepareNewitem", rootGetters["mgr/status"].isCreate);
            //commit('fnd/prepareNewFind', rootGetters["mgr/status"].isCreate, { root: true });
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
                    console.log('mgr.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.item.id);
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to delete item. err: ' + err);
                    return err;
                })
        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newitem = {};
            if (getters["status"].isLocus) {
                newitem = {locus: rootGetters["loci/newItemData"]};
            } else if (getters["status"].isFind) {

            }            
            //console.log("mgr/store before xhr payload: " + JSON.stringify(newitem, null, 2));
            
            let xhrRequest = {
                endpoint: `${getters.status.moduleApiBaseUrl}/store`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newitem,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "storing item", onSuccess: `item ${getters.isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save item`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.gs.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('item Failed to load collection. err: ' + err);
                    return err;
                })
        },

    }

}