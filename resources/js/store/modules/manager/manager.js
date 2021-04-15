import routes from './routes.js';
import jezConfig from '../../../jezConfig.js';


export default {
    namespaced: true,
    modules: {
        routes: routes,
    },
    state: {
        baseUrl: null,

        collection: [],

        collections: {
            main: {
                collection: [],
                chunk: [],
                view: 0,
                views: ["Media", "Chips", "Table"],
                itemsPerPage: 18,
                pageNo: 0,
            },
            related: {
                collection: [],
                view: 0,
                views: ["Media", "Chips"],
                itemsPerPage: 18,
                pageNo: 0,
            },
            media: {
                collection: [],
                view: 0,
                views: ["Media"],
                itemsPerPage: 18,
                pageNo: 0,
            },
        },

        item: null,

        ready: {
            item: false,
            collection: false,
            chunk: false,
        },

        welcomeData: {
            counts: { items: null, media: null, baskets: null, artifacts: null, pieces: null },
            welcomePageParams: {},
        },

        isPicker: false,
        itemDisplayOptionIndex: 0,
        isDirtyCollection: false,
    },


    getters: {
        baseUrl(state) {
            return state.baseUrl;
        },

        collections: (state, rootState, getters, rootGetters) => (name) => {
            if (!["main", "related", "media"].includes(name)) {
                console.log(`Wrong name (${name}) suppiled to collections`);
                return;
            }
            let c = { ...state.collections[name] };

            if (name === "main" &&
                ["Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(rootGetters["mgr/routes/status"].module) &&
                ["Media", "Table"].includes(state.collections.main.views[state.collections.main.view])
            ) {
                //do nothing - chunk loaded by 'page()'
            } else {
                //paging is done by slicing the 'main' collection according to pageNo.
                c.chunk = c.collection.slice(
                    c.pageNo * c.itemsPerPage,
                    (c.pageNo + 1) * c.itemsPerPage
                );
                //console.log(`mgr/get[collections(${name})] returns:\n${JSON.stringify(c, null, 2)}`);
            }
            c["chunkStartIndex"] = c.pageNo * c.itemsPerPage;
            return c;
        },

        //The following 3 are for debug only:
        collectionMain(state, rootState, getters, rootGetters) {
            let c = { ...state.collections.main };
            if (["Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(rootGetters["mgr/routes/status"].module) &&
                ["Media", "Table"].includes(state.collections.main.views[state.collections.main.view])) {
                //chunk was loaded in 'page()'
            } else {
                c.chunk = c.collection.slice(
                    c.pageNo * c.itemsPerPage,
                    (c.pageNo + 1) * c.itemsPerPage
                );
                //console.log(`mgr/get[collections(${name})] returns:\n${JSON.stringify(c, null, 2)}`);
            }

            c["chunkStartIndex"] = c.pageNo * c.itemsPerPage;
            switch (state.collections.main.views[state.collections.main.view]) {
                case "Media":
                case "Table":
                    //console.log(`mgr/get[collectionsMain] returns:\n${JSON.stringify(c, null, 2)}`);
                    return c;

                case "Chips":
                    c.chunk = c.collection.slice(
                        c.pageNo * c.itemsPerPage,
                        (c.pageNo + 1) * c.itemsPerPage
                    );

                    //console.log(`mgr/get[collectionMain] returns:\n${JSON.stringify(c, null, 2)}`);
                    return c;
                default:
                    console.log("*****EEEE")
            }
        },
        collectionRelated(state) {
            let c = state.collections.related;
            c.chunk = c.collection.slice(
                c.pageNo * c.itemsPerPage,
                (c.pageNo + 1) * c.itemsPerPage
            );
            return c;
        },
        collectionMedia(state) {
            let c = state.collections.media;
            c.chunk = c.collection.slice(
                c.pageNo * c.itemsPerPage,
                (c.pageNo + 1) * c.itemsPerPage
            );
            return c;
        },

        isImplemented: (state) => (module) => {
            return ["Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(module);
        },

        item(state) {
            return state.item;
        },


        module(state, rootState, getters, rootGetters) {
            return rootGetters["mgr/routes/status"].module;
        },

        welcomeData(state) {
            return state.welcomeData;
        },

        ready(state) {
            return state.ready;
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

            function hasMedia() {
                return state.collections["media"].collection.length > 0;
            }

            function hasDependantModules() {
                //check only for "Locus" as we only allow create/delete for "Locus" and finds.
                switch (module) {
                    case "Locus":
                        return state.collections["related"].collection.length > 0;
                    default:
                        return false;
                }
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

                count: state.collections.main.collection.length,// ? state.collections.main.collection.length : "...",
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
                hasMedia: hasMedia(),
                hasDependantModules: hasDependantModules(),
                mayDelete: !hasMedia() && !hasDependantModules(),


                //display
                itemDisplayOptions: moduleStaticInfo.itemDisplayOptions,
                itemDisplayOptionIndex: state.itemDisplayOptionIndex,
            };
            return status;
        },
    },

    mutations: {
        baseUrl(state, payload) {
            state.baseUrl = payload;
        },
        collections(state, payload) {
            state.collections[payload.name].collection = payload.collection;
        },
        chunk(state, payload) {
            state.collections.main.chunk = payload;
        },
        page(state, payload) {
            //console.log(`mgr/setPage ${payload.name}(${payload.page})`);
            state.collections[payload.name].pageNo = payload.page - 1;
        },
        itemsPerPage(state, payload) {
            state.collections[payload.name].itemsPerPage = payload.ipp;
        },
        collectionViewIndex(state, payload) {
            //console.log(`mgr/collectionViewIndex() name: ${payload.name})`);
            state.collections[payload.name].view = payload.viewIndex;

        },
        collectionResetView(state, payload) {
            state.collections[payload].pageNo = 0;
            if (payload === "main") {
                state.collections[payload].view = 0;
            }
        },
        item(state, payload) {
            state.item = payload;
        },

        welcomeData(state, payload) {
            state.welcomeData = payload;
        },

        clear(state) {
            console.log("item.clear");
        },

        itemDisplayOptionIndex(state, payload) {
            console.log("mgr/displayOptionIndex(): " + payload);
            state.itemDisplayOptionIndex = payload;
        },

        ready(state, payload) {
            state.ready[payload.entity] = payload.isReady;
        },

        isPicker(state, payload) {
            state.isPicker = payload;
        },

        deleteFromCollectionById(state, id) {
            let c = state.collections["main"].collection;
            console.log(`mgr.deleteFromCollectionById(${id}`);
            let index = c.findIndex(x => x.id == id);
            console.log(`index: ${index}`);
            c.splice(index, 1);
        },
        pushIntoCollection(state, item) {
            let c = state.collections["main"].collection;
            c.push(item);
        },
        setDirtyCollection(state, payload) {
            state.isDirtyCollection = payload;
            //console.log("setDirtyCollection: " + payload);
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            dispatch('mgr/routes/parseRoute', payload, { root: true });
            dispatch("handleRouteChange", null);
        },

        handleRouteChange({ state, getters, rootGetters, commit, dispatch }) {

            function sameModule() {
                return (routerStatus.module == routerStatus.modulePrevious)
            }

            function updateAppStatus() {
                if (getters["module"] === "Home") { return; }
                if (getters["module"] === "About") {
                    //console.log('dispatcher About...');

                    if (state.collections["main"].collection.length === 0) {
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
                            //console.log('mgr.dispatch(show)');// + JSON.stringify(res, null, 2));
                            if (sameModule()) {
                                //if no collection loaded yet, retrieve new module's collection and then item
                                if (state.collections["main"].collection.length === 0) {
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
            //if new module, wait until module's metadata (tags) is retrieved from DB.
            /////////////////////////////////////////////////////////////////////////
            //if (getters["status"].isDigModule && !sameModule()) {


            let routerStatus = rootGetters["mgr/routes/status"];
            if (!sameModule() && !["Home", "Auth"].includes(getters["module"])) {
                commit("ready", { entity: "collection", isReady: false });
                commit("ready", { entity: "item", isReady: false });
                dispatch('initializeModule')
                    .then(res => {
                        updateAppStatus();
                    });
            } else {
                updateAppStatus();
            }
        },

        queryCollection({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("ready", { entity: "collection", isReady: false });
            console.log(`mgr.queryCollection. endpoint: ${getters["status"].moduleApiBaseUrl}`);
            //console.log(`tagParams: ${JSON.stringify(tagQueryParams, null, 2)}`);
            let action = (getters["module"] === "About") ? "get" : "post";
            let endpoint;
            switch (getters["module"]) {
                case "Locus":
                case "Pottery":
                case "Stone":
                case "Lithic":
                case "Glass":
                case "Metal":
                    endpoint = `${getters["status"].moduleApiBaseUrl}/all`;
                    break;
                default:
                    endpoint = getters["status"].moduleApiBaseUrl;

            }

            console.log(`params: ${JSON.stringify(payload.queryParams, null, 2)}`);
            let xhrRequest = {
                endpoint: endpoint,
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
                    commit('collections', { name: "main", collection: res.data.collection });
                    commit("ready", { entity: "collection", isReady: true });

                    if (getters["ready"]["item"]) {
                        //set page according to item's index
                        let c = state.collections["main"].collection;

                        let index = c.findIndex(x => x.id == getters["item"].id);


                        let page = Math.floor((index + 1) / state.collections.main.itemsPerPage) + 1;
                        dispatch("page", { name: "main", page: page, forceLoad: true });
                    } else {
                        dispatch("page", { name: "main", page: 1, forceLoad: true });
                    }
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
                })
        },

        loadItem({ state, getters, commit, dispatch }, payload) {
            console.log('mgr.loadItem. endpoint: ' + `${getters["status"].moduleApiBaseUrl}/${payload}`);
            commit("ready", { entity: "item", isReady: false });

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

                    let arr = ["media", "related"];
                    commit("collectionResetView", "related");
                    //save related collections
                    switch (getters["module"]) {
                        case "About":
                            //
                            break;

                        case "Area":
                        case "Season":
                            commit('collections', { name: "related", collection: res.data.areasSeasons });
                            break;

                        case "AreaSeason":
                            commit('collections', { name: "related", collection: res.data.loci });
                            break;

                        case "Locus":
                            commit('collections', { name: "related", collection: res.data.locusFinds });
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
                        //console.log(`mgr/item commit media: ${JSON.stringify(res.data.itemMedia.collection, null, 2)}`)
                        commit('collections', { name: "media", collection: res.data.itemMedia.collection });
                    }

                    commit("ready", { entity: "item", isReady: true });
                    if (getters["ready"].collection) {
                        //set page according to item's index
                        let index = state.collections.main.collection.findIndex(x => x.id == res.data.item.id);
                        let page = Math.floor((index + 1) / state.collections.main.itemsPerPage) + 1;
                        //console.log(`index: ${index} ipp: ${state.collections.main.itemsPerPage} page: ${page}`);//mgr/item commit media: ${JSON.stringify(res.data.itemMedia.collection, null, 2)}`)

                        dispatch("page", { name: "main", page: page, forceLoad: false });
                    }
                    // get index of current item in collection
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to load item. err: ' + err);
                    return err;
                })
                .finally(() => {
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
                    let c = state.collections["main"].collection;
                    if (c.length > 0) {
                        //go to the first item in the collection.
                        dispatch('goToRoute', { module: getters["module"], action: "show", id: c[0].id });
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

        toggleCollectionView({ state, getters, commit, dispatch }, payload) {
            console.log(`******mgr/toggle(${payload})`);
            let c = state.collections[payload];
            let newViewIndex = (c.view + 1) % c.views.length;
            let newView = c.views[newViewIndex];
            switch (payload) {
                case "main":
                    switch (newView) {
                        case "Media":
                            commit("itemsPerPage", { name: "main", ipp: 18 });
                            break;

                        case "Chips":
                            commit("itemsPerPage", { name: "main", ipp: 100 });

                            break;
                        case "Table":
                            commit("itemsPerPage", { name: "main", ipp: 50 });
                            break;
                    }
                    commit("collectionViewIndex", { name: "main", viewIndex: newViewIndex });
                    dispatch("page", { name: "main", page: 1, forceLoad: true })
                    break;


                case "related":
                    switch (newView) {
                        case "Media":
                            commit("itemsPerPage", { name: "related", ipp: 18 });
                            break;

                        case "Chips":
                            commit("itemsPerPage", { name: "related", ipp: 100 });
                            break;

                    }
                    commit("collectionViewIndex", { name: "related", viewIndex: newViewIndex });
                    dispatch("page", { name: "related", page: 1 })
                    break;
                default:
                    console.log(`******mgr/toggleCollectionView Wrong source: ${payload}`);
            }
        },

        page({ state, getters, commit, dispatch }, payload) {
            function loadChunck() {
                switch (getters["module"]) {
                    case "Locus":
                    case "Pottery":
                    case "Stone":
                    case "Lithic":
                    case "Glass":
                    case "Metal":
                        break;
                    default:
                        return;
                }

                let endpoint;
                switch (state.collections[payload.name].views[state.collections[payload.name].view]) {
                    case "Media":
                        endpoint = "chunk-media";
                        break;
                    case "Table":
                        endpoint = "chunk-table";
                        break;
                }
                console.log(`mgr/loadPage(${payload.page})`);//meta: ${JSON.stringify(meta, null, 2)}
                let start = (payload.page - 1) * state.collections[payload.name].itemsPerPage;
                let length = state.collections[payload.name].itemsPerPage;
                //console.log(`mgr/page(${payload.page})`);
                let ids = state.collections[payload.name].collection.slice(start, start + length).map(x => x.id);
                let tags = state.collections[payload.name].collection.slice(start, start + length).map(x => x.tag);

                let xhrRequest = {
                    endpoint: `${getters["status"].moduleApiBaseUrl}/${endpoint}`,
                    action: "post",
                    data: { "ids": ids },
                    spinner: getters["status"].isList,
                    verbose: false,
                    snackbar: { onSuccess: false, onFailure: true, },
                    messages: { loading: `loading ${getters["module"]} chunk`, onSuccess: null, onFailure: "failed!!!", },
                };

                return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then((res) => {
                        //console.log('mgr/page loaded chunk: ' + JSON.stringify(res.data.collection, null, 2));
                        //add tags that are already in the 'all' collection.
                        res.data.collection.forEach(function (x, index) {
                            x["tag"] = tags[index];
                        });

                        commit('chunk', res.data.collection);
                        let chunkLength = res.data.collection.length;
                        console.log(`returning page(${payload.page}) items [${start + 1} - ${start + chunkLength}]`);
                        return res;
                    })

            }

            //console.log(`mgr/page(${payload.name}, ${payload.page})`);
            let res;

            switch (payload.name) {
                case "main":
                    //console.log(`page: ${payload.page} forceLoad: ${payload.forceLoad} currentPage: ${state.collections.main.pageNo + 1}`);
                    switch (state.collections[payload.name].views[state.collections[payload.name].view]) {
                        case "Media":
                        case "Table":
                            if (state.ready["collection"] &&
                                (payload.forceLoad || state.collections.main.pageNo + 1 !== payload.page)) {
                                res = loadChunck();
                            }
                    }

                    commit("page", { name: payload.name, page: payload.page });
                    return res;
                    break;

                case "related":
                case "media":
                    commit("page", { name: payload.name, page: payload.page });
                    break;

                default:
                    console.log(`******mgr/page: Wrong source argument`);
                    break;
            }
        },

        clear({ state, getters, rootGetters, commit, dispatch }) {
            commit("item", null);
            commit("itemDisplayOptionIndex", 0);
            commit("med/clear", null, { root: true });
            commit('regs/clear', null, { root: true });

            commit("collectionViewIndex", { name: "main", viewIndex: 0 });
            commit("itemsPerPage", { name: "main", ipp: 18 });
            commit("collectionViewIndex", { name: "related", viewIndex: 0 });
            commit("itemsPerPage", { name: "related", ipp: 18 });
        },

        goToRoute({ state, getters, rootGetters, commit, dispatch }, payload) {
            function getAdjancentId() {
                let index, newIndex;
                let m = rootGetters["mgr/collections"]("main");
                let c = m.collection;
                switch (payload) {
                    case "next":
                        index = c.findIndex(x => x.id === state.item.id);
                        newIndex = (index == c.length - 1) ? 0 : index + 1;
                        break;

                    case "prev":
                        index = c.findIndex(x => x.id === state.item.id);
                        newIndex = (index === 0) ? c.length - 1 : index - 1;
                        break;
                }
                //console.log(`ADJANCT length: ${c.length} index: ${index} newIndex: ${newIndex}`);
                return c[newIndex].id;
            }

            switch (payload) {
                case "next":
                case "prev":
                    payload = { module: rootGetters["mgr/routes/status"].module, id: getAdjancentId(), action: "show" };
                    break;
                default:
            }
            dispatch('mgr/routes/goTo', payload, { root: true });
        },
    }

}