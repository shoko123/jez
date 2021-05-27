import routes from './routes.js';
import jezConfig from '../../../jezConfig.js';
import { NavigationError, EmptyResultSetError, } from '../../../errors.js';


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
            firstId: null,
        },

        isPicker: false,
        itemDisplayOptionIndex: 0,
    },

    getters: {
        baseUrl(state) {
            return state.baseUrl;
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

            if (name === "main" &&
                ["Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(state.routes.current.module) &&
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
            if (["Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(state.routes.current.module) &&
                ["Media", "Table"].includes(state.collections.main.views[state.collections.main.view])) {
                //chunk was loaded in 'page()'
            } else {
                c.chunk = c.collection.slice(
                    c.pageNo * c.itemsPerPage,
                    (c.pageNo + 1) * c.itemsPerPage
                );
                //console.log(`mgr/get[collections(${name})] returns:\n${JSON.stringify(c, null, 2)}`);
            }

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
            return ["Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass"].includes(module);
        },

        item(state) {
            return state.item;
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
            let moduleStaticInfo = jezConfig.myModules[module];

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
            let c = state.collections["main"].collection;
            c.push(item);
        },
    },
    actions: {
        query({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("ready", { entity: "collection", isReady: false });
            console.log(`mgr/query() to: ${JSON.stringify(state.routes.to, null, 2)}`);
            console.log(`mgr.query. endpoint: ${state.routes.to.apiModuleUrl}`);
            
            let action = (state.routes.to.module === "About") ? "get" : "post";
            let endpoint = state.routes.to.apiModuleUrl;
            switch (payload.module) {
                case "Locus":
                case "Pottery":
                case "Stone":
                case "Lithic":
                case "Glass":
                case "Metal":
                    endpoint += `/all`;
                    break;
                default:
                    break;//endpoint = endpoint;

            }
            //payload.params.lookups = JSON.parse(payload.params.lookups);
            //payload.params.tagParams = JSON.parse(payload.params.tagParams);

            console.log(`params: ${JSON.stringify(payload.params, null, 2)}`);
            let xhrRequest = {
                endpoint: endpoint,
                action: action,
                data: payload.params,
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
                        throw new EmptyResultSetError("Empty result set");
                    }

                    console.log(`mgr.collection loaded (${state.routes.to.module})`);
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
                    return res;
                })
                .catch(err => {
                    console.log(`mgr/query - Failed to load collection. err: ${JSON.stringify(err, null, 2)}`);
                    throw err;
                })
        },

        loadItem({ state, getters, commit, dispatch }, payload) {
            console.log('mgr.loadItem. endpoint: ' + `${state.routes.to.apiModuleUrl}/${payload}`);
            commit("ready", { entity: "item", isReady: false });

            let xhrRequest = {
                endpoint: `${state.routes.to.apiModuleUrl}/${payload}`,
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
                    switch (state.routes.to.module) {
                        case "About":
                            //nothing to 
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
                    if (state.routes.to.module !== "About") {
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
                        dispatch('goToRoute', { module: state.routes.current.module, action: "show", id: c[newIndex].id });
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
                    } else {
                        commit("ready", { entity: "item", isReady: false });
                    }
                    if (goToItem) {
                        dispatch('goToRoute', { module: state.routes.current.module, action: "show", id: res.data.item.id });
                    }
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    dispatch('goToRoute', { module: state.routes.current.module, action: "show", id: state.item.id });
                    return err;
                });
        },
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

        initializeModule({ state, getters, commit, dispatch }, payload) {
            console.log('mgr.initializeModule. apiBaseUrl: ' + state.routes.to.module);
            dispatch("clearModule");
            //only dig modules and 'About' are initialized
            if (["Home", "Auth"].includes(state.routes.to.module)) { return }

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
                    //dispatch("aux/typesAndParams", res.data.typesAndParams, { root: true });

                    if (state.routes.to.module === "About") {
                        //About doesn't have any associated groups of parameters .
                        return res;
                    } else {
                        //Save dig modules` parameters in the category/group/param structure. 
                        return dispatch("aux/groups", res.data.groups, { root: true });
                        return res;
                    }
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
                let source = state.routes.loading ? state.routes.to : state.routes.current;
                switch (source.module) {
                    case "Locus":
                    case "Pottery":
                    case "Stone":
                    case "Lithic":
                    case "Glass":
                    case "Metal":
                        break;
                    default:
                        //Area, Season, and AreaSeason don't need to load page (All data is in collection).
                        commit("ready", { entity: "chunk", isReady: true });
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
                //console.log(`mgr/loadPage(${payload.page})`);//meta: ${JSON.stringify(meta, null, 2)}
                let start = (payload.page - 1) * state.collections[payload.name].itemsPerPage;
                let length = state.collections[payload.name].itemsPerPage;
                //console.log(`mgr/page(${payload.page})`);
                let ids = state.collections[payload.name].collection.slice(start, start + length).map(x => x.id);
                let tags = state.collections[payload.name].collection.slice(start, start + length).map(x => x.tag);

                commit("ready", { entity: "chunk", isReady: false });
                let xhrRequest = {
                    endpoint: `${source.apiModuleUrl}/${endpoint}`,
                    action: "post",
                    data: { "ids": ids },
                    spinner: getters["status"].isList,
                    verbose: false,
                    snackbar: { onSuccess: false, onFailure: true, },
                    messages: { loading: `loading ${state.routes.current.module} chunk`, onSuccess: null, onFailure: "failed!!!", },
                };

                return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then((res) => {
                        //console.log('mgr/page loaded chunk: ' + JSON.stringify(res.data.collection, null, 2));
                        //add tags that are already in the 'all' collection.
                        res.data.collection.forEach(function (x, index) {
                            x["tag"] = tags[index];
                        });

                        commit('chunk', res.data.collection);
                        commit("ready", { entity: "chunk", isReady: true });
                        //let chunkLength = res.data.collection.length;
                        //console.log(`returning page(${payload.page}) items [${start + 1} - ${start + chunkLength}]`);
                        return res;
                    })

            }

            //start here
            console.log(`mgr/page(${payload.name}, ${payload.page})`);
            let res;

            switch (payload.name) {
                case "main":
                    //console.log(`page: ${payload.page} forceLoad: ${payload.forceLoad} currentPage: ${state.collections.main.pageNo + 1}`);
                    switch (state.collections[payload.name].views[state.collections[payload.name].view]) {
                        case "Media":
                        case "Table":
                            if (state.ready["collection"] &&
                                (payload.forceLoad ||
                                    state.collections.main.pageNo + 1 !== payload.page)) {
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

        clearModule({ state, getters, rootGetters, commit, dispatch }) {
            commit("item", null);
            commit("collections", { name: "main", collection: [] });
            commit("collections", { name: "related", collection: [] });
            commit("collections", { name: "media", collection: [] });
            commit("ready", { entity: "collection", isReady: false });
            commit("ready", { entity: "item", isReady: false });
            dispatch('aux/clearFilters', null, { root: true })
            commit("med/clear", null, { root: true });
            commit('regs/clear', null, { root: true });
            commit("itemDisplayOptionIndex", 0);
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
                    payload = { module: state.routes.current.module, id: getAdjancentId(), action: "show" };
                    break;
                default:
            }
            dispatch('mgr/routes/goTo', payload, { root: true });
        },
    }

}