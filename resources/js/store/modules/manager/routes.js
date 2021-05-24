import jezConfig from '../../../jezConfig.js';

export default {
    namespaced: true,
    state: {
        router: null,
        current: {
            module: "Home",
            action: null,
            id: null,
            queryParams: null,
        },
        to: {
            module: null,
            action: null,
            id: null,
            queryParams: null,
        },
        localFilters: null,
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
    },
    mutations: {
        setRouter(state, payload) {
            //console.log(`mgr/setRouter() payload: `);//${JSON.stringify(payload, null, 2)}
            state.router = payload;
        },


        to(state, payload) {
            //console.log(`mgr/router SET("to"): ${JSON.stringify(payload, null, 2)}`);//
            state.to = Object.assign({}, payload);
            //state.to = payload;
        },
        current(state, payload) {
            //console.log(`mgr/router SET("current"): ${JSON.stringify(payload, null, 2)}`);
            state.to = Object.assign({}, state.current, payload);
            //state.to = payload;
        },
        localFilters(state, payload) {
            console.log(`routes/setLocalFilters: ${JSON.stringify(payload, null, 2)}`);
            state.localFilters = payload;
        },

    },
    actions: {
        parseTo({ state, commit }, payload) {
            //console.log(`mgr/router parseTo payload: ${JSON.stringify(payload, null, 2)}`);//            
            let to = {};

            if (payload.params.hasOwnProperty("module")) {
                switch (payload.params.module) {
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
            if (payload.params.hasOwnProperty("id")) {
                to.id = parseInt(payload.params.id, 10);
            }
            if (payload.params.hasOwnProperty("action")) {
                to.action = payload.params.action;
            }
            if (Object.keys(payload.query).length > 0) {
                to.queryParams = payload.query;
            }


            //console.log(`parsedTo: ${JSON.stringify(to, null, 2)}`);
            commit("to", to /*{ module, action, queryString, id }*/);
            return to;
        },

        routeChanged({ state, getters, rootState, rootGetters, commit, dispatch }, payload) {

            function sameModule() {
                return (state.current.module === state.to.module)
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

            function loadPrepare() {
                if (state.to.module === "Home") { return; }
                //let empty = rootState.mgr.collections["main"].collection.length === 0;
                if (state.to.module === "About") {
                    //console.log('dispatcher About...');
                    if (!rootGetters["mgr/ready"].collection) {
                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true });
                    }
                    if (state.to.action === "show") {
                        return dispatch("mgr/loadItem", state.to.id, { root: true });
                    }
                }
                else if (rootGetters["mgr/status"].isDigModule) {
                    console.log('loadPrepare');
                    switch (state.to.action) {
                        case "list":
                            console.log('mgr.loadPrepare.list ');// + JSON.stringify(res, null, 2));
                            //if same module, retrieve collection if not already populated
                            let readyCollection = rootGetters["mgr/ready"].collection;
                            let sameQuery = sameQueryString();
                            //console.log(`loadPrepare(list) ready: ${readyCollection} same: ${sameQuery}`);
                            if (!readyCollection || !sameQuery) {
                                let params = rootGetters["aux/filtersFromNewQueryString"];
                                console.log(`params from queryString: ${JSON.stringify(params, null, 2)}`);
                                commit("localFilters", params.local);
                                return dispatch("mgr/query", { params: params.xhr, spinner: true }, { root: true });
                            }
                            break;

                        case "show":
                            //console.log('mgr.dispatch(show)');// + JSON.stringify(res, null, 2));
                            if (sameModule()) {
                                //if no collection loaded yet, retrieve new module's collection and then item
                                let readyCollection = rootGetters["mgr/ready"].collection;
                                let readyItem = rootGetters["mgr/ready"].item;
                                let sameItem = sameItemId();



                                if (!readyCollection) {
                                    //if same module, but collection empty, retrieve collection and then item
                                    return dispatch("mgr/query", { params: {}, spinner: true }, { root: true })
                                        .then((res) => {
                                            return dispatch("mgr/loadItem", state.to.id, { root: true });
                                            //return res;
                                        })
                                } else {
                                    //console.log(`routes("show") ready: ${JSON.stringify(rootGetters["mgr/ready"], null, 2)} same item id: ${sameItem}`)
                                    //if collection is OK check if a new item needs to be loded or the same item needs to be reloaded
                                    if (!sameItem || !readyItem) {
                                        //collection loaded - load item only
                                        return dispatch("mgr/loadItem", state.to.id, { root: true });
                                    }
                                }
                            } else {
                                //if not same module, retrieve the new module's item and then collection
                                return dispatch("mgr/loadItem", state.to.id, { root: true })
                                    .then((res) => {
                                        //console.log('mgr.routeChanged.show after loading item. loading collection...');
                                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true });
                                    })
                            }
                            break;

                        case "create":
                        case "update":
                            //TODO validate that we came from same module, item and that current.action == 'show'.

                            return dispatch("mgr/prepareNew", state.to.action, { root: true });
                            break;

                        case "tags":
                            dispatch(`aux/prepareTagger`, null, { root: true });
                            return 0;
                            break;


                        case "welcome":
                        case "filter":
                            commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
                            return 0;
                            break;
                        default:
                    }
                }
            }

            //actual code starts running here

            /////////////////////////////////////////////////////////////////////////
            //if new module, block wait until module's metadata (tags, lookups) are retrieved from DB.
            /////////////////////////////////////////////////////////////////////////

            console.log("routeChanged");
            return dispatch('parseTo', payload.to)
                .then(res => {

                    console.log(`after parseTo`);
                    console.log(`current: ${JSON.stringify(state.current, null, 2)}`);
                    console.log(`to: ${JSON.stringify(state.to, null, 2)}`);
                    //If navigation is to a different module, initialize it (block async)
                    if (!sameModule()) {
                        return dispatch('mgr/initializeModule', null, { root: true })
                            .then(res => {
                                return loadPrepare();
                            });
                    } else {
                        return loadPrepare();
                    }
                });

        },

        goTo({ state, rootState, getters, rootGetters }, payload) {
            //an abstraction layer above vue router to enable less cumbersome calls from components/vuex.
            function goToString() {
                let moduleBaseUrl = jezConfig.myModules[state.current.module].appBaseUrl;
                switch (payload) {
                    case "home":
                        return { path: "/" };
                    case "login":
                        return { path: "/auth/login" };
                    case "welcome":
                        return { path: `${moduleBaseUrl}/welcome` };
                    case "update":
                        return { path: `${moduleBaseUrl}/${state.current.id}/update` };
                    case "media":
                        return { path: `${moduleBaseUrl}/${state.current.id}/media` };
                    case "tags":
                        return { path: `${moduleBaseUrl}/${state.current.id}/tags` };
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
                let moduleBaseUrl = jezConfig.myModules[payload.module].appBaseUrl;

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
                        return { path: `${moduleBaseUrl}/${payload.id}/${payload.action}` };
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
        navigationSuccess({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`routes/navigation success()`);
            state.current.module = state.to.module;
            if (state.to.hasOwnProperty("id")) {
                state.current.id = state.to.id;
            }
            if (state.to.hasOwnProperty("action")) {
                state.current.action = state.to.action;

                if (state.to.action === 'list') {
                    dispatch("aux/setLocalFilters", state.localFilters, { root: true }).then(res => {
                        console.log(`routes/navigation success() calling setlocalFilters() with params: ${JSON.stringify(state.localFilters, null, 2)}`);
                    });
                }
            }
            if (state.to.hasOwnProperty("queryParams")) {
                state.current.queryParams = state.to.queryParams;
            }
            //state.current = Object.assign({}, state.current, state.to);
            //console.log(`NAV success update 'to' -> 'current': ${JSON.stringify(state.current, null, 2)}`);//
        },
    },

};
