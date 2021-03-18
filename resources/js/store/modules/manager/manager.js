import routes from './routes.js';
import jezConfig from '../../../jezConfig.js';


export default {
    namespaced: true,
    modules: {
        routes: routes,
    },
    state: {
        item: null,
        collection: [],
        collectionMeta: {
            displayOptionIndex: 0,
            displayOptions: ["Media", "Chips", "Table"],
            page: 1,
        },
        index: null,

        xhrStatus: {
            loadingItem: false,
            loadingCollection: false,
            loadingTags: false,
            storingItem: false,
            deletingItem: false,
        },

        welcomeData: {
            counts: { items: null, media: null, baskets: null, artifacts: null, pieces: null },
            welcomePageParams: {},
        },

        isPicker: false,
        itemDisplayOptionIndex: 0,
        collectionDisplayOptionIndex: 0,
        collectionDisplayOptions: ["Media", "Chips", "Table"],
        page: 1,
        isDirtyCollection: false,
    },


    getters: {
        item(state) {
            return state.item;
        },

        collection(state) {
            return state.collection;
        },

        collections: (state, rootState, getters, rootGetters) => (name) => {
            console.log("******mgr/collection***********");
            switch (name) {
                case "Collection":
                    return state.collection;

                case "ItemMedia":
                case "MediaEdit":
                    return rootGetters["med/itemMedia"];

                case "AreasSeasons":
                    return rootGetters["arsn/areasSeasons"];

                case "AreaSeasonLoci":
                    return rootGetters["arsn/loci"];

                case "LocusFinds":
                    return rootGetters["loci/locusFinds"];

                default:
                    console.log(
                        `******Wrong source argument (${name})for collectionForm`
                    );
                    return [];
            }
        },

        collectionMeta: (state, rootState, getters, rootGetters) => (name) => {
            function ipp(displayOption) {//Items Per Page
                switch (displayOption) {
                    case "Media":
                        return jezConfig.mediaPerPage;
                    case "Chips":
                        return jezConfig.chipsPerPage;
                    default:
                        return 200;
                }
            }
            console.log("******mgr/collectionMeta***********");
            let meta = {}, collection = [];
            switch (name) {
                case "Collection":
                    meta = state.collectionMeta;
                    //collection = state.collection;
                    break;

                case "ItemMedia":
                case "MediaEdit":
                    meta = rootGetters["med/itemMediaMeta"];
                    //collection = rootGetters["med/itemMedia"];
                    break;
                case "AreasSeasons":
                    meta = rootGetters["arsn/areasSeasonsMeta"];
                    //collection = rootGetters["med/areasSeasons"];
                    break;
                case "AreaSeasonLoci":
                    meta = rootGetters["arsn/lociMeta"];
                    //collection = rootGetters["arsn/loci"];
                    break;

                case "LocusFinds":
                    meta = rootGetters["loci/locusFindsMeta"];
                    //collection = rootGetters["loci/locusFinds"];
                    break;
                default:
                    console.log(
                        `******Wrong source argument (${name})for collectionForm`
                    );
            }

            meta["itemsPerPage"] = ipp(meta.displayOptions[meta.displayOptionIndex]);
            /*
            meta["itemsForCurrentPage"] = collection.slice(
                (meta.page - 1) * ipp(meta.displayOptions[meta.displayOptionIndex]),
                meta.page * ipp()
            );
            */
            return meta;

            return {
                displayOptions: displayOptions(),//state.collectionDisplayOptions,
                displayOptionIndex: state.collectionDisplayOptionIndex,
                page: state.page,
                itemsPerPage: ipp(),
                itemsForCurrentPage: state.collection.slice(
                    (state.page - 1) * ipp(),
                    state.page * ipp()
                )
            }
        },

        collectionMedia(state, getters) {
            return state.collection.map(x => {
                let y = { ...x };
                let text = null;
                switch (getters["module"]) {
                    case "Locus":
                    case "Stone":
                    case "Lithic":
                    case "Glass":
                    case "Metal":
                        text = x.description;
                        break;
                    case "Pottery":
                        text = x.periods;
                        break;
                }

                y["text"] = (text === null || text.length < 101) ? text : text.substr(0, 100) + '...';
                return y;
            });
        },

        index(state) {
            return state.index;
        },

        xhrStatus(state) {
            return state.xhrStatus;
        },

        adjacents(state, getters, rootState, rootGetters) {
            if (state.loadingItem || state.loadingCollection || state.collection.length === 0 || state.index === -1) {
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

        module(state, rootState, getters, rootGetters) {
            return rootGetters["mgr/routes/status"].module;
        },

        welcomeData(state, getters) {
            return state.welcomeData;
        },

        status(state, getters, rootState, rootGetters) {

            function isDigModule(module) {
                switch (module) {
                    case "Auth":
                    case "About":
                        return false;
                    default:
                        return true;
                }
            }

            function isFind(module) {
                switch (module) {
                    case "Pottery":
                    case "Lithic":
                    case "Stone":
                    case "Fauna":
                    case "Flora":
                    case "Glass":
                    case "Metal":
                    case "Tbd":
                        return true;

                    default:
                        return false;
                }
            }

            function hasMedia(module) {
                return (!rootGetters["med/itemMedia"] || (rootGetters["med/itemMedia"].length > 0));
            }

            function hasRelatedModules(module) {
                if (module === "Locus") {
                    if (!getters.item || !rootGetters["loci/locusFinds"]) {
                        return true;
                    } else {
                        return (rootGetters["loci/locusFinds"].length > 0);
                    }
                } else {
                    return false;
                }
            }
            function isDeleteable() {
                return (!hasMedia() && !hasRelatedModules(module));
            }
            let routerStatus = rootGetters["mgr/routes/status"];
            let module = routerStatus.module;
            let moduleStaticInfo = jezConfig.myModules[module];

            let status = {
                itemName: moduleStaticInfo.itemName,
                collectionName: moduleStaticInfo.collectionName,
                moduleAppBaseUrl: moduleStaticInfo.appBaseUrl,
                moduleApiBaseUrl: moduleStaticInfo.apiBaseUrl,
                moduleStoreName: moduleStaticInfo.storeName,
                moduleRegistrationOptions: moduleStaticInfo.registrationOptions,
                module: routerStatus.module,
                modulePrevious: routerStatus.modulePrevious,
                action: routerStatus.action,
                actionPrevious: routerStatus.actionPrevious,
                id: routerStatus.id,
                idPrevious: routerStatus.idPrevious,

                count: state.collection.length ? state.collection.length : "...",
                isAreaSeason: (routerStatus.module === "AreaSeason"),
                isLocus: (routerStatus.module === "Locus"),
                isFind: isFind(module),
                isDigModule: isDigModule(module),
                isCreate: (routerStatus.action === "create"),
                isUpdate: (routerStatus.action === "update"),
                isFilter: (routerStatus.action === "filter"),
                isShow: (routerStatus.action === "show"),
                isList: (routerStatus.action === "list"),
                isWelcome: (routerStatus.action === "welcome"),
                isTags: (routerStatus.action === "tags"),
                isCreateLocus: (routerStatus.action === "create" && routerStatus.module === "Locus"),
                isCreateFind: (routerStatus.action === "create" && isFind(module)),
                isMediaEdit: (routerStatus.action === "media"),
                isEdit: ["create", "update", "media", "tags"].includes(routerStatus.action),
                isPicker: state.isPicker,
                isFilterable: !["Auth", "About", "Area", "Season"].includes(routerStatus.module),
                hasMedia: hasMedia(module),
                hasRelatedModules: hasRelatedModules(module),
                isDeleteable: isDeleteable(module),


                //display
                itemDisplayOptions: moduleStaticInfo.itemDisplayOptions,
                itemDisplayOptionIndex: state.itemDisplayOptionIndex,
            };
            return status;
        },
    },
    mutations: {
        collection(state, payload) {
            state.collection = payload;
        },

        item(state, payload) {
            state.item = payload;
        },
        setIndex(state, payload) {
            //console.log(`mgr/setIndex(${payload})`);
            state.index = payload;
        },
        page(state, payload) {
            console.log(`mgr/page(${payload})`);
            state.collectionMeta.page = payload;
        },
        welcomeData(state, payload) {
            state.welcomeData = payload;
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

        itemDisplayOptionIndex(state, payload) {
            //console.log("mgr/displayOptionIndex(): " + payload);
            state.itemDisplayOptionIndex = payload;
        },

        toggleCollectionDisplayOption(state) {
            state.page = 1;
            console.log(`mgr/toggleCollectionDisplayOption(${(state.collectionDisplayOptionIndex + 1) % 3}`);
            state.collectionMeta.displayOptionIndex = ++state.collectionMeta.displayOptionIndex % 3;
        },

        isPicker(state, payload) {
            state.isPicker = payload;
        },

        deleteFromCollectionById(state, id) {
            console.log(`mgr.deleteFromCollectionById(${id}`);
            let index = state.collection.findIndex(x => x.id == id);
            console.log(`index: ${index}`);
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
            //parser.parseRoute(state, commit, payload);
            dispatch('mgr/routes/parseRoute', payload, { root: true });
            //dispatcher.handleRouteChange(state, getters, rootGetters, commit, dispatch);
            dispatch("handleRouteChange", null);
        },

        queryCollection({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("collection", []);
            commit('loadingCollection', true);
            console.log(`mgr.queryCollection. endpoint: ${getters["status"].moduleApiBaseUrl}`);
            //console.log(`tagParams: ${JSON.stringify(tagQueryParams, null, 2)}`);
            let action = (getters["module"] === "About") ? "get" : "post";
            console.log(`params: ${JSON.stringify(payload.queryParams, null, 2)}`);
            let xhrRequest = {
                endpoint: `${getters["status"].moduleApiBaseUrl}`,
                action: action,
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

                    console.log(`mgr.collection loaded (${getters["module"]})`);
                    commit('collection', res.data.collection);
                    // get index of current item in collection
                    commit("setIndex", state.item ? state.collection.findIndex(x => x.id == state.item.id) : -1);
                    commit('setDirtyCollection', false);
                    //console.log(`After return from query`);

                    //redirect to 'list/collection' path
                    if (payload.gotoCollection/*getters["status"].action == "filter"*/) {
                        dispatch('goToRoute', "list");
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
            console.log('mgr.loadItem. endpoint: ' + `${getters["status"].moduleApiBaseUrl}/${payload}`);
            commit('loadingItem', true);
            let xhrRequest = {
                endpoint: `${getters["status"].moduleApiBaseUrl}/${payload}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading item...`/* with id: ${payload} */, onSuccess: null, onFailure: "failed loading item", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //save related collections
                    switch (getters["module"]) {
                        case "About":
                            //
                            break;

                        case "Area":
                        case "Season":
                            commit('arsn/areasSeasons', res.data.areasSeasons, { root: true });
                            break;

                        case "AreaSeason":
                            commit('arsn/loci', res.data.loci, { root: true });
                            break;

                        case "Locus":
                            commit('loci/locusFinds', res.data.locusFinds, { root: true });
                            break;

                        case "Pottery":
                        case "Lithic":
                        case "Stone":
                        case "Metal":
                        case "Glass":
                        case "Flora":
                        case "Fauna":
                        case "Tbd":
                            commit('fnd/item', res.data.find, { root: true });
                            dispatch('aux/itemTags', res.data.tags, { root: true });

                    }

                    commit('item', res.data.item);
                    if (getters["module"] !== "About") {
                        commit('med/itemMedia', res.data.itemMedia, { root: true });
                    }

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
        deleteCurrent({ state, getters, commit, dispatch }) {
            //console.log(`mgr/delete id: ${id}\ncollection: ${JSON.stringify(state.collection, null, 2)}`);
            //prepare delete request
            let xhrRequest = {
                endpoint: `${getters["status"].moduleApiBaseUrl}/${getters["item"].id}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting item...`, onSuccess: `Delete successful, redirected to first item`, onFailure: "failed to delete item", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("mgr/delete item deleted from collection!");
                    commit('deleteFromCollectionById', res.data.id);
                    commit('setDirtyCollection', true);

                    if (state.collection.length > 0) {
                        //go to the first item in the collection.
                        dispatch('goToRoute', { module: getters["module"], action: "show", id: state.collection[0].id });
                    } else {
                        //if we deleted the last item, we must load a new collection.
                        dispatch('goToRoute', { module: getters["module"], action: "filter" });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to delete item. err: ' + err);
                    return err;
                })
        },

        store({ state, getters, commit, dispatch, rootGetters }, goToItem) {
            let newItem = {};
            switch (getters["module"]) {
                case "Area":
                    newItem = rootGetters["area/newItem"];
                    break;
                case "Season":
                    newItem = rootGetters["season/newItem"];
                    break;
                case "AreaSeason":
                    newItem = rootGetters["arsn/newItem"];
                    break;
                case "Locus":
                    newItem = rootGetters["loci/newItem"];
                    break;
                default:
                    if (getters["status"].isFind) {
                        newItem = { find: rootGetters["fnd/newItem"], item: rootGetters[`${getters["status"].moduleStoreName}/newItem`] };
                    } else {
                        console.log("mgr/store ***** UNSUPPORTED MODULE TYPE *****");
                        break;
                    }
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
                    if (goToItem) {
                        dispatch('goToRoute', { module: getters["module"], action: "show", id: res.data.item.id });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    dispatch('goToRoute', { module: getters["module"], action: "show", id: state.item.id });
                    return err;
                });
        },

        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log("mgr/prepare()");
            //if we create a new item (locus or find), we must copy some data from current item
            //to the registration module.
            let toCopy = getters["status"].isUpdate;
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
                dispatch('fnd/prepare', toCopy, { root: true });
            }

            console.log("mgr/prepare calling " + getters["status"].moduleStoreName + "/prepare");
            //after these preliminary actions, we finally call the item's prepare method in order to
            //copy data and load item specific tables (e.g. stone categories).
            dispatch(`${getters["status"].moduleStoreName}/prepare`, toCopy, { root: true });
            dispatch('stp/populateSteps', null, { root: true });
        },

        initializeModule({ state, getters, commit, dispatch }, payload) {
            //console.log('mgr.initializeModule. apiBaseUrl: ' + getters["status"].moduleApiBaseUrl);
            dispatch("clear");
            let xhrRequest = {
                endpoint: `/api/module-initializer`,
                action: "post",
                data: { "moduleName": getters["module"], },
                spinner: false,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `initializing ${getters["module"]} module info`, onSuccess: null, onFailure: "failed loading module info", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('mgr loadSummary after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('welcomeData', res.data.welcomeData);
                    //dispatch("aux/typesAndParams", res.data.typesAndParams, { root: true });
                    dispatch("aux/groups", res.data.groups, { root: true });
                    return res;
                })
        },

        toggleCollectionDisplayOption({ state, getters, commit }, payload) {
            console.log(`******mgr/toggle(${payload})`);
            switch (payload) {
                case "Collection":
                    commit("toggleCollectionDisplayOption");
                    break;

                case "ItemMedia":
                case "MediaEdit":
                    break;

                case "AreasSeasons":
                    break;

                case "AreaSeasonLoci":
                    break;

                case "LocusFinds":
                    break;

                default:
                    console.log(
                        `******Wrong source argument (${name})for collectionForm`
                    );
                    break;


            }
        },

        clear({ state, getters, rootGetters, commit, dispatch }) {
            commit("collection", [])
            commit("item", null);
            commit("itemDisplayOptionIndex", 0);
            commit("med/clear", null, { root: true });
            commit('regs/clear', null, { root: true });
        },

        goToRoute({ state, getters, rootGetters, commit, dispatch }, payload) {
            dispatch('mgr/routes/goTo', payload, { root: true });
        },

        handleRouteChange({ state, getters, rootGetters, commit, dispatch }) {

            function sameModule() {
                return (routerStatus.module == routerStatus.modulePrevious)
            }

            function updateAppStatus() {
                if (getters["module"] === "Home") { return; }
                if (getters["module"] === "About") {
                    //console.log('dispatcher About...');

                    if (state.collection.length === 0) {
                        dispatch("aux/queryCollection", { clear: true, spinner: true, gotoCollection: false }, { root: true });
                    }
                    if (routerStatus.action === "show") {
                        dispatch("loadItem", routerStatus.id);
                    }
                }
                else if (getters["status"].isDigModule) {
                    switch (routerStatus.action) {
                        case "list":
                            //console.log('mgr.routeChanged.list ');// + JSON.stringify(res, null, 2));
                            //if same module, retrieve collection if not already populated
                            if (!sameModule() || state.isDirtyCollection) {
                                dispatch("aux/queryCollection", { clear: true, spinner: true, gotoCollection: true }, { root: true });
                            }
                            break;

                        case "show":
                            if (sameModule()) {
                                //if no collection loaded yet, retrieve new module's collection and then item
                                if (!getters.collection.length) {
                                    //if same module, but collection empty, retrieve collection and then item
                                    dispatch("aux/queryCollection", { clear: false, spinner: true, gotoCollection: false }, { root: true })
                                        .then((res) => {
                                            dispatch("loadItem", routerStatus.id);
                                            return res;
                                        })
                                } else {
                                    if (routerStatus.idPrevious !== routerStatus.id ||
                                        routerStatus.actionPrevious === "update" ||
                                        routerStatus.actionPrevious === "tags") {
                                        //collection loaded - load item only
                                        dispatch("loadItem", routerStatus.id);
                                    } else {
                                        console.log("mgr - same item id - not loading")
                                    }
                                }
                            } else {
                                //if not same module, clear old module and retrieve new module's collection and then item 
                                dispatch("loadItem", routerStatus.id)
                                    .then((res) => {
                                        //console.log('mgr.routeChanged.show after loading item. loading collection...');
                                        dispatch("aux/queryCollection", { clear: true, spinner: false, gotoCollection: false }, { root: true });
                                        return res;
                                    })
                            }
                            break;

                        case "create":
                        case "update":
                            dispatch("prepare", true);
                            break;

                        case "tags":
                            dispatch(`aux/prepareTagger`, null, { root: true });
                            break;

                        //do nothing
                        case "welcome":
                        case "filter":
                            break;
                        default:
                    }
                }
            }

            //actual code starts running here

            /////////////////////////////////////////////////////////////////////////
            //if new module, can not proceed until module's data is retrieved from DB.
            /////////////////////////////////////////////////////////////////////////
            //if (getters["status"].isDigModule && !sameModule()) {


            let routerStatus = rootGetters["mgr/routes/status"];
            if (!sameModule() && !["Home", "Auth"].includes(getters["module"])) {
                dispatch('initializeModule')
                    .then(res => {
                        updateAppStatus();
                    });
            } else {
                updateAppStatus();
            }
        },
    }

}