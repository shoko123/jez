import routes from '../../../routing/routesStore.js';
import jezConfig from '../../../config.js';
import { dotToTag } from './itemTag.js';
import { NavigationError, EmptyResultSetError, } from '../../../routing/errors.js';


export default {
    namespaced: true,
    modules: {
        routes: routes,
    },
    state: {
        appSettings: {
            readOnly: false,
            authorizedUsersOnly: true,
        },
        globalSettings: {
            perPageMedia: 18,
            perPageChips: 100,
            perPageTableRecords: 50,
            baseUrl: "",
        },

        collection: [],

        collections: {
            main: {
                collection: [],
                index: null,
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
            module: false,
            item: false,
            collection: false,
            chunk: false,
        },

        welcomeData: {
            counts: { items: null, media: null, baskets: null, artifacts: null },
            welcomePageParams: {},
            firstDot: null,
        },

        isPicker: false,
        itemDisplayOptionIndex: 0,
    },

    getters: {
        globalSettings(state) {
            return state.globalSettings;
        },

        appSettings(state) {
            return state.appSettings;
        },

        baseUrl(state) {
            return state.globalSettings.baseUrl;
        },
        module(state, rootState, getters, rootGetters) {
            return state.routes.current.module;
        },

        collections: (state, rootState, getters, rootGetters) => (name) => {
            if (!["main", "related", "media"].includes(name)) {
                console.log(`Wrong name (${name}) suppiled to collections`);
                return;
            }
            let c = { ...state.collections[name] };


            //"chunking (paging)" is done only for the "main" collection of the dig modules.
            //otherwise we simply "slice" the collection according to pageNo.
            //The actual chunking will be done in page() by either loading a chunk from DB (for "Media" & "Table" views),
            //or adding a tag (for "Chips" view).

            if (name !== "main" || state.routes.current.module == "About") {
                c.chunk = c.collection.slice(
                    c.pageNo * c.itemsPerPage,
                    (c.pageNo + 1) * c.itemsPerPage
                );
            }

            let header
            switch (name) {
                case "main":
                    header = state.routes.current.module + " Query Results";
                    break;

                case "related":
                    switch (state.routes.current.module) {
                        case "Area":
                        case "Season":
                            header = "Related Areas/Seasons"
                            break;
                        case "AreaSeason":
                            header = "Related Loci"
                            break;
                        case "Locus":
                            header = "Related Small Finds"
                            break;
                    }
                    break;
                case "media":
                    header = "Related Media";

            }
            c["header"] = header;
            c["chunkStartIndex"] = c.pageNo * c.itemsPerPage;
            return c;
        },

        //The following 3 are for debug only:
        collectionMain(state, rootState, getters, rootGetters) {

            let c = { ...state.collections.main };
            c["header"] = state.routes.current.module + "Query Results";
            c["chunkStartIndex"] = c.pageNo * c.itemsPerPage;
            return c;
        },

        collectionRelated(state, rootState, getters, rootGetters) {
            let c = state.collections.related;
            c.chunk = c.collection.slice(
                c.pageNo * c.itemsPerPage,
                (c.pageNo + 1) * c.itemsPerPage
            );

            let header;
            switch (state.routes.current.module) {
                case "Area":
                case "Season":
                    header = "Related Areas/Seasons"
                    break;
                case "AreaSeason":
                    header = "Related Loci"
                    break;
                case "Locus":
                    header = "Related Small Finds"
                    break;
            }
            c["header"] = header;
            return c;
        },
        collectionMedia(state) {
            let c = state.collections.media;
            c.chunk = c.collection.slice(
                c.pageNo * c.itemsPerPage,
                (c.pageNo + 1) * c.itemsPerPage
            );
            c["header"] = "Related Media";
            return c;
        },

        isImplemented: (state) => (module) => {
            return ["Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass", "Fauna"].includes(module);
        },

        item(state) {
            return  state.item;
        },

        welcomeData(state) {
            return state.welcomeData;
        },

        ready(state) {
            return state.ready;
        },
        status(state, getters, rootState, rootGetters) {

            function isDigModule() {
                return ["Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Fauna", "Flora", "Glass", "Metal", "Tbd"].includes(module);
            }

            function isFind() {
                return ["Pottery", "Stone", "Lithic", "Fauna", "Flora", "Glass", "Metal", "Tbd"].includes(module);
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


            let rs = state.routes.current;//routerStatus

            let module = rs.module;
            let moduleStaticInfo = jezConfig.modules[module];

            let status = {
                itemName: moduleStaticInfo.itemName,
                collectionName: moduleStaticInfo.collectionName,
                moduleStoreName: moduleStaticInfo.storeName,
                moduleRegistrationOptions: moduleStaticInfo.registrationOptions,
                module: rs.module,
                action: rs.action,
                id: rs.id,
                count: state.collections.main.collection.length,
                isAreaSeason: (rs.module === "AreaSeason"),
                isLocus: (rs.module === "Locus"),
                isFind: isFind(),
                isDigModule: isDigModule(),
                isCreate: (rs.action === "create"),
                isUpdate: (rs.action === "update"),
                isFilter: (rs.action === "filter"),
                isShow: (rs.action === "show"),
                isList: (rs.action === "list"),
                isWelcome: (rs.action === "welcome"),
                isTags: (rs.action === "tags"),
                isCreateLocus: (rs.action === "create" && rs.module === "Locus"),
                isCreateFind: (rs.action === "create" && isFind()),
                isMediaEdit: (rs.action === "media"),
                isAdmin: (rs.module === "Admin"),
                isRead: (rs.module === "Home" || rs.module === "Auth" || ["welcome", "show", "list", "filter"].includes(rs.action)),
                isEdit: ["create", "update", "media", "tags"].includes(rs.action),
                isPicker: state.isPicker,
                isFilterable: !["Auth", "About", "Area", "Season"].includes(rs.module),
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
            state.globalSettings.baseUrl = payload;
        },
        appSettings(state, payload) {
            state.appSettings = payload;
        },
        collections(state, payload) {
            state.collections[payload.name].collection = payload.collection;
        },
        index(state, payload) {
            state.collections.main.index = payload;
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
        collectionResetPageNo(state, payload) {
            state.collections[payload].pageNo = 0;
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
            //console.log("mgr/itemDisplayOptionIndex(): " + payload);
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

        deleteFromCollectionByIndex(state, payload) {
            let c = state.collections["main"].collection;
            console.log(`mgr.deleteFromCollectionByIndex(${payload}`);
            c.splice(payload, 1);
        },

        pushIntoCollection(state, item) {
            state.collections["main"].collection.push(item);
        },
    },
    actions: {
        initApp({ state, getters, rootGetters, commit, dispatch }, payload) {
            //set router to store for generic goTo() used by components, and navigation after delete, store, etc...)
            commit("mgr/routes/setRouter", payload, { root: true });

            //set server base addresses
            let baseUrl = `${window.location.protocol}//${window.location.host}`;
            commit("baseUrl", baseUrl);
            console.log("app.init() setting axios.baseURL to " + baseUrl);
            axios.defaults.baseURL = baseUrl;

            //enables axios debug
            axios.interceptors.response.use(null, error => {
                //console.log("axios interceptor error: " + JSON.stringify(error, null, 2));
                return Promise.reject(error);
            });

            //dispatch("mgr/initApp", null, { root: true });
            //load global settings and load media used by app
            dispatch("med/getBucketUrl", null, { root: true });

            //get current app setting (authorizedUsersOnly, readOnly)
            let xhrRequest = {
                endpoint: `/api/accessibility`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: `checking app status`, onSuccess: null, onFailure: null },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log(`app.init() OK. accessibility: ${JSON.stringify(res.data.accessibility, null, 2)}`);
                    commit('appSettings', res.data.accessibility);
                    return res;
                })
                .catch(err => {
                    console.log('initApp() failed! err: ' + err);
                    return err;
                })
        },

        query({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("ready", { entity: "collection", isReady: false });

            let action = (state.routes.to.module === "About") ? "get" : "post";

            //payload.params.lookups = JSON.parse(payload.params.lookups);
            //payload.params.tagParams = JSON.parse(payload.params.tagParams);

            console.log(`mgr.query() endpoint: ${state.routes.to.apiModuleUrl}. params: ${JSON.stringify(payload.params, null, 2)}`);
            let xhrRequest = {
                endpoint: state.routes.to.apiModuleUrl,
                action: action,
                data: payload.params,
                spinner: payload.spinner,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading collection", onSuccess: null, onFailure: "failed loading collection", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log(`mgr.query() OK. ${res.data.collection.length} records returned`);
                    if (res.data.collection.length < 1) {
                        commit('snackbar/snackbar', {
                            color: "orange",
                            message: "Query resulted with no matches, Please edit query and re-submit"
                        }, { root: true });
                        throw new EmptyResultSetError("Empty result set");
                    }

                    /*
                    //add tag to each item
                    res.data.collection.forEach(function (x, index) {
                        //console.log(`dot: ${dots[index]}) tag: ${tag}`);
                        x["tag"] = dotToTag({ module: state.routes.current.module, dot: x.dot });
                    });
                    */

                    commit('collections', { name: "main", collection: res.data.collection });
                    commit("ready", { entity: "collection", isReady: true });

                    if (getters["ready"]["item"]) {
                        //set item's index
                        let index = state.collections.main.collection.findIndex(x => x.id == state.item.id);
                        //console.log(`item(ready) setting index: ${index}`);
                        return dispatch("indexOfItemInMainCollection", index);
                    } else {
                        //console.log(`Item is not ready; setting page(1)`);
                        commit("ready", { entity: "chunk", isReady: false });
                        dispatch("page", { name: "main", page: 1 });
                    }
                    
                    return res;
                })
                .catch(err => {
                    console.log(`mgr/query - Failed to load collection. err: ${JSON.stringify(err, null, 2)}`);
                    throw err;
                })
        },

        loadItem({ state, getters, commit, dispatch }, payload) {

            //console.log(`mgr.loadItem. endpoint: ${state.globalSettings.baseUrl}/api/dig/show. payload: \n${JSON.stringify(payload, null, 2)}`);

            commit("ready", { entity: "item", isReady: false });

            let xhrRequest = {
                endpoint: `${state.globalSettings.baseUrl}/api/dig/show`,
                action: "post",
                data: payload,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading item...`, onSuccess: null, onFailure: "failed loading item", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("collectionResetPageNo", "related");
                    //save related collections
                    switch (state.routes.to.module) {
                        case "About":
                            //nothing to do.
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

                            commit('collections', {
                                name: "related",
                                collection: res.data.related.map(x => { return { dot: x, tag: dotToTag({ module: state.routes.to.module, dot: x }) } })
                            });

                            dispatch('aux/itemTags', {tags: res.data.tags, moduleTags: res.data.moduleTags }, { root: true });
                    }

                    res.data.item["tag"] = dotToTag({ module: state.routes.to.module, dot: res.data.item.dot });
                    console.log(`mgr.loadItem() "${res.data.item.dot}" loaded successfully`)
                    commit('item', res.data.item);
                    //commit('item', res.data.item);
                    commit("ready", { entity: "item", isReady: true });
                    if (state.routes.to.module !== "About") {
                        //console.log(`mgr/item commit media: ${JSON.stringify(res.data.itemMedia.collection, null, 2)}`)
                        commit('collections', { name: "media", collection: res.data.itemMedia.collection });
                    }

                    if (getters["ready"].collection) {
                        //set item's index
                        let index = state.collections.main.collection.findIndex(x => x.id == res.data.item.id);
                        //console.log(`collection(ready) setting index: ${index}`);
                        return dispatch("indexOfItemInMainCollection", index);
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to load item. err: ' + err);
                    return err;
                })
        },

        //delete item by id - must be accompanied by deleting corresponding find record.
        deleteCurrent({ state, getters, commit, dispatch }) {
            //console.log(`mgr/delete id: ${id}\ncollection: ${JSON.stringify(state.collection, null, 2)}`);
            //prepare delete request
            let xhrRequest = {
                endpoint: `${state.routes.current.apiModuleUrl}/${getters["item"].id}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting item...`, onSuccess: `Delete successful, redirected to first item`, onFailure: "failed to delete item", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("mgr/delete() successful");
                    //commit('deleteFromCollectionById', res.data.id);
                    let c = state.collections["main"].collection;
                    if (c.length > 0) {
                        let index = c.findIndex(x => x.id == res.data.id);
                        let newIndex = index - 1 === -1 ? 0 : index - 1;
                        commit('deleteFromCollectionByIndex', index);
                        //go to the first item in the collection.
                        dispatch('goToRoute', { module: state.routes.current.module, action: "show", dot: c[newIndex].dot });
                    } else {
                        //if we deleted the last item, we must load a new collection.
                        dispatch('goToRoute', { module: state.routes.current.module, action: "filter" });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr Failed to delete item. err: ' + err);
                    return err;
                })
        },

        //goToItem is true for any new Item, false when called in the context of updating a lookup field.
        store({ state, getters, commit, dispatch, rootGetters }, goToItem) {
            let newItem = {};
            switch (state.routes.current.module) {
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
                endpoint: `${state.routes.current.apiModuleUrl}/store`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newItem,
                spinner: true,
                verbose: false,
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
                        commit("ready", { entity: "chunk", isReady: false });
                    }
                    commit("ready", { entity: "item", isReady: false });
                    if (goToItem) {
                        dispatch('goToRoute', { module: state.routes.current.module, action: "show", dot: rootGetters["mgr/status"].isCreate ? res.data.item.dot : state.item.dot });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    dispatch('goToRoute', { module: state.routes.current.module, action: "show", dot: state.item.dot });
                    return err;
                });
        },
        /*
        prepareNew({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`mgr/prepare() payload" ${payload}`);
            //if we create a new item (locus or find), we must copy some data from current item
            //to the registration module.
            let toCopy = (payload === "update");// getters["status"].isUpdate;
            if (payload === "create") {
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
            dispatch('stp/populateSteps', payload, { root: true });
        },
        */

        initializeModule({ state, getters, commit, dispatch }, payload) {
            //console.log('mgr.initializeModule. apiBaseUrl: ' + state.routes.to.module);
            dispatch("clearModule");
            //only dig modules and 'About' are initialized
            if (["Home", "Auth", "Admin"].includes(state.routes.to.module)) { return }

            let xhrRequest = {
                endpoint: `/api/module-initializer`,
                action: "post",
                data: { "moduleName": state.routes.to.module, },
                spinner: false,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `initializing ${state.routes.to.module} module info`, onSuccess: null, onFailure: "failed loading module info", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('initModule returned: ');// + JSON.stringify(res, null, 2));
                    commit('welcomeData', res.data.welcomeData);
                    console.log(`initializeModule '${state.routes.to.module}' OK`);
                    //dispatch("aux/typesAndParams", res.data.typesAndParams, { root: true });

                    if (state.routes.to.module === "About") {
                        //About doesn't have any associated groups of parameters .
                        return res;
                    } else {
                        //Save dig modules` parameters in the category/group/param structure. 
                        return dispatch("aux/groups", res.data.groups, { root: true });
                    }
                })
        },

        toggleCollectionView({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`******mgr/toggle(${payload})`);
            let c = state.collections[payload];
            let newViewIndex = (c.view + 1) % c.views.length;
            let newView = c.views[newViewIndex];
            switch (payload) {
                case "main":
                    switch (newView) {
                        case "Media":
                            commit("itemsPerPage", { name: "main", ipp: state.globalSettings.perPageMedia });
                            commit("ready", { entity: "chunk", isReady: false });
                            break;

                        case "Chips":
                            commit("itemsPerPage", { name: "main", ipp: state.globalSettings.perPageChips });

                            break;
                        case "Table":
                            commit("itemsPerPage", { name: "main", ipp: state.globalSettings.perPageTableRecords });
                            commit("ready", { entity: "chunk", isReady: false });
                            break;
                    }
                    commit("collectionViewIndex", { name: "main", viewIndex: newViewIndex });
                    dispatch("page", { name: "main", page: 1 })
                    break;


                case "related":
                    switch (newView) {
                        case "Media":
                            commit("itemsPerPage", { name: "related", ipp: state.globalSettings.perPageMedia });
                            break;

                        case "Chips":
                            commit("itemsPerPage", { name: "related", ipp: state.globalSettings.perPageChips });
                            break;
                    }
                    commit("collectionViewIndex", { name: "related", viewIndex: newViewIndex });
                    dispatch("page", { name: "related", page: 1 })
                    break;
                default:
                    console.log(`******mgr/toggleCollectionView Wrong source: ${payload}`);
            }
        },


        indexOfItemInMainCollection({ state, getters, commit, dispatch }, payload) {
            //commit index and if needed load chunk and set new pageNo,
            let newPage = Math.floor(payload / state.collections.main.itemsPerPage);
            //console.log(`mgr/indexOfItemInMainCollection(${payload}) currentPage: ${state.collections.main.pageNo} nwPage: ${newPage}`);
            commit("index", payload);

            //the second

            if (newPage !== state.collections.main.pageNo ||
                state.routes.current.module !== state.routes.to.module
                || !state.ready.chunk) {
                return dispatch("page", { name: "main", page: newPage + 1 });
            }
        },

        page({ state, getters, commit, dispatch }, payload) {
            function loadChunk() {
                //console.log(`mgr/loadChunk(${payload.page})`);//meta: ${JSON.stringify(meta, null, 2)}
                let start = (payload.page - 1) * state.collections[payload.name].itemsPerPage;
                let length = state.collections[payload.name].itemsPerPage;
                //console.log(`mgr/page(${payload.page})`);
                let ids = state.collections[payload.name].collection.slice(start, start + length).map(x => x.id);
                //let tags = state.collections[payload.name].collection.slice(start, start + length).map(x => x.tag);
                let dots = state.collections[payload.name].collection.slice(start, start + length).map(x => x.dot);

                commit("ready", { entity: "chunk", isReady: false });
                let xhrRequest = {
                    endpoint: `/api/dig/chunk`,
                    action: "post",
                    data: {
                        "ids": ids,
                        "chunkType": state.collections[payload.name].views[state.collections[payload.name].view],
                        "module": state.routes.to.module
                    },
                    spinner: getters["status"].isList,
                    verbose: false,
                    snackbar: { onSuccess: false, onFailure: true, },
                    messages: { loading: `loading ${state.routes.current.module} chunk`, onSuccess: null, onFailure: "failed!!!", },
                };

                return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then((res) => {
                        //console.log('mgr/page loaded chunk: ' + JSON.stringify(res.data.collection, null, 2));
                        //add tags that are already in the collection.
                        res.data.collection.forEach(function (x, index) {
                            x["dot"] = dots[index];
                            //console.log(`dot: ${dots[index]}) tag: ${tag}`);
                            x["tag"] = dotToTag({ module: state.routes.current.module, dot: dots[index] });
                        });
                        //console.log('mgr/page loaded chunk: ' + JSON.stringify(res.data.collection, null, 2));
                        commit('chunk', res.data.collection);
                        commit("ready", { entity: "chunk", isReady: true });
                        //let chunkLength = res.data.collection.length;
                        //console.log(`returning page(${payload.page}) items [${start + 1} - ${start + chunkLength}]`);
                        return res;
                    })

            }

            //start here
            //console.log(`mgr/page(${payload.name}, ${payload.page})`);

            //No chunking for the "About" module. TODO check if context is routing middleware 
            //or paging with no url change to decide on source module (current or to).
            if (state.routes.to.module === "About") {
                commit("ready", { entity: "chunk", isReady: true });
                return;
            }
            let res;
            switch (payload.name) {
                case "main":
                    //console.log(`collectionReady: ${state.ready["collection"]} currentPage: ${state.collections.main.pageNo + 1}`);
                    //console.log(`view: ${state.collections[payload.name].views[state.collections[payload.name].view]}`);
                    switch (state.collections[payload.name].views[state.collections[payload.name].view]) {
                        case "Media":
                        case "Table":
                            if (state.ready["collection"] &&
                                (!state.ready["chunk"] ||
                                    state.collections.main.pageNo + 1 !== payload.page)) {
                                //console.log(`Calling loadChunk()`);
                                loadChunk()
                                    .then((res) => {
                                        commit("page", { name: payload.name, page: payload.page });
                                        commit("ready", { entity: "chunk", isReady: true });
                                    });
                            } else {
                                commit("page", { name: payload.name, page: payload.page });
                                commit("ready", { entity: "chunk", isReady: true });
                            }
                            break;
                        case "Chips":

                            commit("page", { name: payload.name, page: payload.page });

                            let c = getters.collections("main");
                            let chunk = c.collection.slice(
                                c.pageNo * c.itemsPerPage,
                                (c.pageNo + 1) * c.itemsPerPage
                            );

                            chunk.forEach(function (x, index) {
                                //console.log(`dot: ${dots[index]}) tag: ${tag}`);
                                x["tag"] = dotToTag({ module: state.routes.current.module, dot: x.dot });
                            });

                            commit('chunk', chunk);
                            commit("ready", { entity: "chunk", isReady: true });
                            break;
                    }

                    return res;
                    break;

                case "related":
                case "media":
                    commit("page", { name: payload.name, page: payload.page });
                    commit("ready", { entity: "chunk", isReady: true });
                    break;

                default:
                    console.log(`******mgr/page: Wrong source argument`);
                    break;
            }
        },

        clearModule({ state, getters, rootGetters, commit, dispatch }) {
            commit("item", null);
            commit("collections", { name: "main", collection: [] });
            commit("collections", { name: "related", collection: [] });
            commit("collections", { name: "media", collection: [] });
            commit("ready", { entity: "collection", isReady: false });
            commit("ready", { entity: "item", isReady: false });

            //commit("ready", { entity: "chunk", isReady: ["Area", "Season", "AreaSeason"].includes(state.routes.to.module) });
            commit("ready", { entity: "chunk", isReady: false });
            dispatch('aux/clearFilters', null, { root: true })
            commit('regs/clear', null, { root: true });
            commit("itemDisplayOptionIndex", 0);
            commit("collectionViewIndex", { name: "main", viewIndex: 0 });
            commit("itemsPerPage", { name: "main", ipp: state.globalSettings.perPageMedia });
            commit("collectionViewIndex", { name: "related", viewIndex: 0 });
            commit("itemsPerPage", { name: "related", ipp: state.globalSettings.perPageMedia });
        },

        goToRoute({ state, getters, rootGetters, commit, dispatch }, payload) {
            function getAdjancentDot() {
                let newIndex, m = state.collections["main"];
                switch (payload) {
                    case "next":
                        newIndex = (m.index === m.collection.length - 1) ? 0 : m.index + 1;
                        break;

                    case "prev":
                        newIndex = (m.index === 0) ? m.collection.length - 1 : m.index - 1;
                        break;
                }
                //console.log(`ADJANCT length: ${m.collection.length} index: ${m.index} newIndex: ${newIndex}`);
                return m.collection[newIndex].dot;
            }
            //console.log(`mgr/goToRoute() payload: ${payload}`);
            switch (payload) {
                case "next":
                case "prev":
                    payload = { module: state.routes.current.module, dot: getAdjancentDot(), action: "show" };
                    break;
                default:
            }
            dispatch('mgr/routes/goTo', payload, { root: true });
        },
    }

}