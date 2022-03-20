import jezConfig from '../config.js';
import { filtersFromQueryString } from "./queryString.js"
export default {
    namespaced: true,
    state: {
        router: null,

        current: {
            module: "Home",
            apiModuleUrl: "/api",
            moduleStoreFolder: "/",
            action: null,
            id: null,
            dotParams: {},
            dot: null,
            queryParams: null,
        },
        to: {
            module: null,
            apiModuleUrl: null,
            moduleStoreFolder: "/",
            action: null,
            id: null,
            dotParams: {},
            dot: null,
            queryParams: null,
        },
        localFilters: null,
        loading: false,
    },
    getters: {
        getRouter(state) {
            return state.router;
        },

        to(state) {
            return state.to;
        },
        current(state) {
            return state.current;
        },
        localFilters(state) {
            return state.localFilters;
        },
        toItemParams(state) {
            return { module: state.to.module, ...state.to.dotParams };
        }
    },
    mutations: {
        setRouter(state, payload) {
            //console.log(`mgr/setRouter() payload: `);//${JSON.stringify(payload, null, 2)}
            state.router = payload;
        },

        to(state, payload) {
           //console.log(`mgr/router SET("to"): ${JSON.stringify(payload, null, 2)}`);//
            state.to = { ...state.to, ...payload };
        },
        dot(state, payload) {            
            state.to.dot = payload;
        },
        dotParams(state, payload) {
            state.to.dotParams = Object.assign({}, payload)
            //state.to.dotParams = payload;
        },
        clearDotAndDotParams(state, payload) {
            state.to.dot = null;
            state.to.dotParams = {};
        },
        copyToToCurrent(state, payload) {
            //payload holds the name of property to copy.
            state.current[payload] = state.to[payload];
        },

        localFilters(state, payload) {
            //console.log(`routes/setLocalFilters: ${JSON.stringify(payload, null, 2)}`);
            state.localFilters = payload;
        },
        loading(state, payload) {
            state.loading = payload;
        },

    },
    actions: {
        parseTo({ state, commit }, payload) {
            //console.log(`mgr/router parseTo payload.params: ${JSON.stringify(payload.params, null, 2)}`);

            //parse the dot[seperated id parameters] and save to dotParams
            function parseDot(module, dot) {
                //console.log(`parseDot() module: ${module}, dot: ${dot}`);
                let arr = dot.split('.');
                let dotParams = {};
                switch (module) {
                    case "About":
                        dotParams.tab = parseInt(arr[0]);
                        dotParams.no = parseInt(arr[1]);
                        break;                    
                    case "Area":
                        dotParams.area = arr[0];
                        break;
                    case "Season":
                        dotParams.season = parseInt(arr[0]);
                        break;
                    case "AreaSeason":
                        dotParams.season = parseInt(arr[0]);
                        dotParams.area = arr[1];
                        break;
                    case "Locus":
                        dotParams.season = parseInt(arr[0]);
                        dotParams.area = arr[1];
                        dotParams.locus_no = parseInt(arr[2]);
                        break;
                    case "Pottery":
                    case "Stone":
                    case "Lithic":
                    case "Metal":
                    case "Glass":
                    case "Flora":
                    case "Fauna":
                    case "Tbd":
                        dotParams.season = parseInt(arr[0]);
                        dotParams.area = arr[1];
                        dotParams.locus_no = parseInt(arr[2]);
                        dotParams.registration_category = arr[3];
                        dotParams.basket_no = parseInt(arr[4]);
                        dotParams.artifact_no = parseInt(arr[5]);
                        break;
                }

                commit("dot", dot);
                commit("dotParams", dotParams);
                //console.log(`parseDot to: ${JSON.stringify(state.to, null, 2)}`);
            }

            let to = {};

            if (payload.params.hasOwnProperty("module")) {
                switch (payload.params.module) {
                    case "admin":
                        to.module = "Admin";
                        break;
                    case "about":
                        to.module = "About";
                        break;
                    case "auth":
                        to.module = "Auth";
                        break;
                    case "areas":
                        to.module = "Area";
                        break;
                    case "seasons":
                        to.module = "Season";
                        break;
                    case "areas-seasons":
                        to.module = "AreaSeason";
                        break;
                    case "loci":
                        to.module = "Locus";
                        break;
                    case "pottery":
                        to.module = "Pottery";
                        break;
                    case "stones":
                        to.module = "Stone";
                        break;
                    case "lithics":
                        to.module = "Lithic";
                        break;
                    case "glass":
                        to.module = "Glass";
                        break;
                    case 'metals':
                        to.module = "Metal";
                        break;
                    default:
                        console.log(`******* Parser can\'t find module name path ${payload.params.module} *********`);
                }
            } else {
                to.module = "Home";
            }

            if (!["Home", "Admin"].includes(to.module)) {
                to.apiModuleUrl = jezConfig.modules[to.module].apiBaseUrl;
            }
          
            if (payload.params.hasOwnProperty("action")) {
                to.action = payload.params.action;
            } else {
                to.action = null;
            }
            if (payload.params.hasOwnProperty("dot")) {
                parseDot(to.module, payload.params.dot);
            } else {
                commit("clearDotAndDotParams");
            }


            //query params will only be copied on 'list' action. (We don't want unnecessary reload of chunks).
            if (payload.params.hasOwnProperty("action") && payload.params.action === "list") {
                //console.log(`setting to.queryParams to: ${JSON.stringify(payload.query, null, 2)}`);
                to.queryParams = payload.query;
            }
            //console.log(`parseTo.done to: ${JSON.stringify(state.to, null, 2)}`);
            commit("to", to);

            return to;
        },


        routeChanged({ state, getters, rootState, rootGetters, commit, dispatch }, payload) {
            function sameModule() {
                return (state.current.module === state.to.module)
            }

            function toActionIsLogin() {
                return (state.to.action === 'login');
            }

            function deepEqual(x, y) {
                const ok = Object.keys, tx = typeof x, ty = typeof y;
                return x && y && tx === 'object' && tx === ty ? (
                    ok(x).length === ok(y).length &&
                    ok(x).every(key => deepEqual(x[key], y[key]))
                ) : (x === y);
            }
            function sameQueryString() {
                return deepEqual(state.current.queryParams, state.to.queryParams);
            }
            function sameItemId() {
                return state.current.id === state.to.id;
            }
            function sameDot() {
                return state.current.dot === state.to.dot;
            }

            function loadPrepare() {
                //console.log(`loadPrepare current: ${JSON.stringify(state.current, null, 2)} to: ${JSON.stringify(state.to, null, 2)}`);

                if (["Home", "Admin"].includes(state.to.module)) { return; }
                //let empty = rootState.mgr.collections["main"].collection.length === 0;
                if (state.to.module === "About") {
                    console.log('dispatcher About...');
                    if (!sameModule()) {
                        console.log("About from a different module");
                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true })
                            .then((res) => {
                                if (state.to.action === "show") {
                                    return dispatch("mgr/loadItem", state.to.id, { root: true });
                                }
                            })
                    } else if (state.to.action === "show") {
                        console.log("About show");
                        return dispatch("mgr/loadItem", getters.toItemParams, { root: true });
                    }
                    //return dispatch("mgr/loadItem", state.to.id, { root: true });

                }
                // else if (rootGetters["mgr/status"].isDigModule) {
                else if (["Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Fauna", "Flora", "Glass", "Metal", "Tbd"].includes(state.to.module)) {
                    //console.log('loadPrepare');
                    switch (state.to.action) {
                        case "list":
                            //if same module, retrieve collection if not already populated
                            let readyCollection = rootGetters["mgr/ready"].collection;
                            let sameQuery = sameQueryString();
                            //console.log(`loadPrepare(list) ready: ${readyCollection} same: ${sameQuery}`);
                            if (!readyCollection || !sameQuery) {
                                let params = filtersFromQueryString(state.to.queryParams);
                                //console.log(`params from queryString: ${JSON.stringify(params, null, 2)}`);
                                commit("localFilters", params.local);
                                return dispatch("mgr/query", { params: params.xhr, spinner: true }, { root: true });
                            }
                            return;

                        case "show":
                            //console.log('mgr.dispatch(show)');// + JSON.stringify(res, null, 2));
                            if (sameModule()) {
                                //if no collection loaded yet, retrieve new module's collection and then item
                                let readyCollection = rootGetters["mgr/ready"].collection;
                                let readyItem = rootGetters["mgr/ready"].item;
                                //let sameItem = sameItemId();
                                let sameItem = sameDot();
                                if (!readyCollection) {
                                    //if same module, but collection empty, retrieve collection and then item
                                    return dispatch("mgr/query", { params: {}, spinner: true }, { root: true })
                                        .then((res) => {
                                            return dispatch("mgr/loadItem", getters.toItemParams, { root: true });
                                        })
                                } else {
                                    //console.log(`routes("show") ready: ${JSON.stringify(rootGetters["mgr/ready"], null, 2)} same item id: ${sameItem}`)
                                    //if collection is OK check if a new item needs to be loded or the same item needs to be reloaded
                                    if (!sameItem || !readyItem) {
                                        //collection loaded - load item only
                                        return dispatch("mgr/loadItem", getters.toItemParams, { root: true });
                                    }
                                }
                            } else {
                                //if not same module, retrieve the new module's item and then collection
                                return dispatch("mgr/loadItem", getters.toItemParams, { root: true })
                                    .then((res) => {
                                        //console.log('mgr.routeChanged.show after loading item. loading collection...');
                                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true });
                                    })
                            }
                            return;

                        case "create":
                        case "update":

                            //TODO validate that we came from same module, item and that current.action == 'show'.
                            return dispatch("beforeNew", state.to.action);

                        case "tags":
                            return dispatch(`aux/prepareTagger`, null, { root: true });

                        case "welcome":
                        case "filter":
                            commit("mgr/ready", { entity: "collection", isReady: false }, { root: true });
                            commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
                            return;

                        case "media":
                            //currently no initialization needed (TODO reorder media screen )
                            return;

                        default:
                            alert("loadPrepare() invalid params");
                            throw new Error("loadPrepare() invalid params");
                    }
                }
            }

            //Code starts running here.

            /////////////////////////////////////////////////////////////////////////
            //if new module, block wait until initialization is done -
            //module's metadata (tags, lookups) are retrieved from DB.
            /////////////////////////////////////////////////////////////////////////
            //console.log(`routeChanged() current: ${JSON.stringify(state.current, null, 2)}\nto: ${JSON.stringify(state.to, null, 2)}`);
            if(toActionIsLogin()){
                return;
            }

            if (!sameModule()) {
                return dispatch('mgr/initializeModule', null, { root: true })
                    .then(() => {
                        return loadPrepare();
                    })
            } else {
                return loadPrepare();
            }
        },

        beforeNew({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`routing/beforeNew() payload" ${payload}`);
            //if we create a new item (locus or find), we must copy some data from current item
            //to the registration module.
            let isUpdate = (payload === "update");// getters["status"].isUpdate;
            if (!isUpdate) {
                dispatch("regs/n/prepare", isUpdate, { root: true });
            }

            //if item is a "find", we must copy some data from current item to the "find" module.
            if (rootGetters["mgr/status"].isFind) {
                console.log("routing/beforeCreate() calling fnd/prepare");
                dispatch('fnd/prepare', isUpdate, { root: true });
            }

            console.log("mgr/prepare calling " + rootGetters["mgr/status"].moduleStoreName + "/prepare");
            //after these preliminary actions, we finally call the item's prepare method in order to
            //copy data and load item specific tables (e.g. stone categories).
            dispatch(`${rootGetters["mgr/status"].moduleStoreName}/prepare`, isUpdate, { root: true });
            return dispatch('stp/populateSteps', !isUpdate, { root: true });
        },

        navigationSuccess({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`routes/navigation success()`);

            if (state.to.hasOwnProperty("id")) {
                commit("copyToToCurrent", "id");
                //state.current.id = state.to.id;
            }
            if (state.to.hasOwnProperty("dot")) {
                commit("copyToToCurrent", "dot");
                //state.current.id = state.to.id;
            }
            if (state.to.hasOwnProperty("action")) {
                commit("copyToToCurrent", "action");
                //state.current.action = state.to.action;

                if (state.to.action === 'list') {
                    dispatch("aux/setLocalFilters", state.localFilters, { root: true });
                }
                //if we move to containing item (e.g. Pottery -> Locus(show)), we must clear filters
                //both locally "localFilters" & at aux module.
                if (state.to.action === 'show' && state.to.module !== state.current.module) {
                    //console.log(`Going to item in a different module ${state.to.module}`)
                    commit("localFilters", null)
                    dispatch("aux/setLocalFilters", null, { root: true });
                }
            }
            if (state.to.hasOwnProperty("queryParams")) {
                commit("copyToToCurrent", "queryParams");
                //state.current.queryParams = state.to.queryParams;
            }
            if (state.to.hasOwnProperty("apiModuleUrl")) {
                commit("copyToToCurrent", "apiModuleUrl");
            }
            if (state.to.hasOwnProperty("dotParams")) {
                commit("copyToToCurrent", "dotParams");
                //state.current.id = state.to.id;
            }

            commit("copyToToCurrent", "module");
        },

        goTo({ state, rootState, getters, rootGetters }, payload) {
            //an abstraction layer above vue router to enable less cumbersome calls from components/vuex.
            function goToString() {
                let moduleBaseUrl = jezConfig.modules[state.current.module].appBaseUrl;
                switch (payload) {
                    case "home":
                        return { path: "/" };
                    case "login":
                        return { path: "/auth/login" };
                    case "dashboard":
                        return { path: "/admin/dashboard" };
                    case "welcome":
                        return { path: `${moduleBaseUrl}/welcome` };
                    case "update":
                        return { path: `${moduleBaseUrl}/${state.current.dot}/update` };
                    case "media":
                        return { path: `${moduleBaseUrl}/${state.current.dot}/media` };
                    case "tags":
                        return { path: `${moduleBaseUrl}/${state.current.dot}/tags` };
                    //case "list":
                    //   return `${moduleBaseUrl}/list`;
                    case "create":
                        return { path: `${moduleBaseUrl}/create` };
                    case "filter":
                        return { path: `${moduleBaseUrl}/filter` };
                    default:
                        console.log(`mgr.routes.goTo() illegal param: ${payload}`);
                        return null;
                }
            }
            function goToObject() {
                //console.log(`mgr.routes.goToObject: ${JSON.stringify(payload, null, 2)}`);
                let moduleBaseUrl = jezConfig.modules[payload.module].appBaseUrl;

                //verify that module, action and id (optional) exist
                switch (payload.action) {
                    case "welcome":
                    case "filter":
                        return { path: `${moduleBaseUrl}/${payload.action}` };
                    case "list":
                        return { path: `${moduleBaseUrl}/list`, params: payload.params };
                    case "create":
                        return { path: `${moduleBaseUrl}/${payload.action}` };
                    case "show":
                    case "update":

                        return { path: `${moduleBaseUrl}/${payload.dot}/${payload.action}` };
                    default:
                        console.log(`mgr.routes.goTo() illegal param: ${JSON.stringify(payload, null, 2)}`);
                        return null;
                }
            }

            //execution starts here
            //console.log(`mgr.routes.goTo() payload: ${JSON.stringify(payload, null, 2)}`);

            let newRoute = null;
            switch (typeof payload) {
                case "string":
                    if (payload === "back") {
                        return state.router.go(-1);
                    }
                    newRoute = goToString();
                    break;

                case "object":
                    newRoute = goToObject();
                    break;
                default:
                    console.log(`mgr.routes.goTo() illegal param: ${JSON.stringify(payload, null, 2)}`);
            }
            if (newRoute !== null) {
                //console.log(`mgr.routes.push() newRoute: ${JSON.stringify(newRoute, null, 2)}`);
                if (newRoute.hasOwnProperty("params")) {
                    state.router.push({ path: newRoute.path, query: newRoute.params/*JSON.stringify(newRoute.params) */ });//JSON.stringify(newRoute.params)
                } else {
                    state.router.push({ path: newRoute.path })
                }
            } else {
                console.log(`mgr.routes.push() error in parsing path: ${newRoute.path}`);
            }
        },
    },
};
