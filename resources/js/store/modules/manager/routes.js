import jezConfig from '../../../jezConfig.js';
export default {
    namespaced: true,
    state: {
        router: null,
        status: {
            module: "Home",
            modulePrevious: null,
            queryString: null,
            queryStringPrevious: null,
            action: null,
            actionPrevious: null,
            id: null,
            idPrevious: null,
            newId: null,
            newQueryString: null,
        },
        current: {
            module: null,
            action: null,
            id: null,
            queryString: null
        },
        to: {
            module: null,
            action: null,
            id: null,
            queryString: null
        },
    },
    getters: {
        getRouter(state) {
            return state.router;
        },
        status(state) {
            return state.status;
        },
        to(state) {
            return state.to;
        },
        current(state) {
            return state.current;
        },
    },
    mutations: {
        setRouter(state, payload) {
            //console.log(`mgr/setRouter() payload: `);//${JSON.stringify(payload, null, 2)}
            state.router = payload;
        },

        module(state, payload) {
            state.status.module = payload;
        },
        to(state, payload) {
            console.log(`mgr/router SET("to"): ${JSON.stringify(payload, null, 2)}`);//
            state.to = Object.assign({}, payload);
            //state.to = payload;
        },
        current(state, payload) {
            console.log(`mgr/router SET("current"): ${JSON.stringify(payload, null, 2)}`);//
            state.to = Object.assign({}, state.current, payload);
            //state.to = payload;
        },
        navigationSuccess(state) {
            
            state.current = Object.assign({}, state.current, state.to);
            console.log(`NAV success update 'to' -> 'current': ${JSON.stringify(state.current, null, 2)}`);//
        },

        modulePrevious(state, payload) {
            state.status.modulePrevious = payload;
        },
        action(state, payload) {
            state.status.action = payload;
        },
        actionPrevious(state, payload) {
            state.status.actionPrevious = payload;
        },
        id(state, payload) {
            state.status.id = payload;
        },
        idPrevious(state, payload) {
            state.status.idPrevious = payload;
        },
        queryString(state, payload) {
            state.status.queryString = payload;
        },
        queryStringPrevious(state, payload) {
            state.status.queryStringPrevious = payload;
        },
        newId(state, payload) {
            state.status.newId = payload;
        },
        newQueryString(state, payload) {
            state.status.newQueryString = payload;
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
                to.queryString = payload.query;
            }

            //console.log(`parsedTo: ${JSON.stringify(to, null, 2)}`);
            commit("to", to /*{ module, action, queryString, id }*/);
        },

        parseRoute({ state, commit, dispatch }, payload) {
            //TODO this needs a lot of work to make it more reasonable. However, it works for now.

            console.log(`\nParseRoute. *** From ***\nPath: ${JSON.stringify(payload.from.path, null, 2)}\nParams: ${JSON.stringify(payload.from.params, null, 2)}\nQuery: ${JSON.stringify(payload.from.query, null, 2)}`);
            console.log(`*** To ***\nPath: ${JSON.stringify(payload.to.path, null, 2)}\nParams: ${JSON.stringify(payload.to.params, null, 2)}\nQuery: ${JSON.stringify(payload.to.query, null, 2)}\n`);
            dispatch("parseTo", payload.to);

            let sections = payload.to.path.split('/');
            let action = sections[sections.length - 1];
            commit("modulePrevious", state.status.module);
            commit("idPrevious", state.status.id);
            commit("actionPrevious", state.status.action);
            if (action === "list") {
                if (state.status.queryString !== payload.to.query) {
                    commit("newQueryString", payload.to.query);
                    console.log(`ParseRoute.list Change in queryString checking validity:  ${JSON.stringify(payload.to.query, null, 2)}`);
                    if (true) {

                    } else {

                    }
                }
                commit("queryStringPrevious", state.status.queryString);

                //let parsedQuery = payload.to.query;
                //parsedQuery.lookups = JSON.parse(parsedQuery.lookups);
                //parsedQuery.tagParams = JSON.parse(parsedQuery.tagParams);
                //commit("queryString", parsedQuery);
                commit("queryString", payload.to.query);

            }
            //console.log('parsePaths.to: ' + payload.to.path);

            switch (sections[1]) {
                case '':
                    //whenever we change module we clear the old one. so let make the old one 'aut'
                    //TODO fix this nonesense

                    commit("module", 'Home');
                    break;

                case 'auth':
                    commit("module", 'Auth');
                    commit("action", action);
                    break;

                case 'dig-modules':
                    commit("action", action);
                    commit("id", payload.to.params ? payload.to.params.id : null);

                    //console.log('parsePaths.setAction: ' + state.status.action);
                    switch (sections[2]) {
                        case 'areas':
                            commit("module", 'Area');
                            break;
                        case 'seasons':
                            commit("module", 'Season');
                            break;
                        case 'areas-seasons':
                            commit("module", 'AreaSeason');
                            break;
                        case 'loci':
                            commit("module", 'Locus');
                            break;
                        case 'stones':
                            commit("module", 'Stone');
                            break;
                        case 'pottery':
                            commit("module", 'Pottery');
                            break;
                        case 'lithics':
                            commit("module", 'Lithic');
                            break;
                        case 'glass':
                            commit("module", 'Glass');
                            break;
                        case 'metals':
                            commit("module", 'Metal');
                            break
                        default:
                            commit("module", 'Unknown');
                            alert('unknown find type');
                            break
                    }
                    break;
                case 'about':
                    commit("module", 'About');
                    commit("action", action);
                    commit("id", payload.to.params ? payload.to.params.id : null);
                    break
                default:
                    console.log(`******* Parser can\'t parse path ${payload.to.path} *********`);
            }
        },

        /*
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`mgr/routeChanged to: ${payload.to.path} \nparams: ${JSON.stringify(payload.to.params, null, 2)} \nquery: ${JSON.stringify(payload.to.query, null, 2)}`);
            
            return dispatch("handleRouteChange", null);
        },
        */
        routeChanged({ state, getters, rootState, rootGetters, commit, dispatch }, payload) {

            function sameModule() {
                return (state.current.module === state.to.module)
            }

            function loadThings() {
                if (state.to.module === "Home") { return; }
                let empty = rootState.mgr.collections["main"].collection.length === 0;
                if (state.to.module === "About") {
                    //console.log('dispatcher About...');

                    if (empty) {
                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true });
                    }
                    if (state.to.action === "show") {
                        return dispatch("mgr/loadItem", state.to.id, { root: true });
                    }
                }
                else if (rootGetters["mgr/status"].isDigModule) {
                    switch (state.to.action) {
                        case "list":
                            console.log('mgr.loadThings.list ');// + JSON.stringify(res, null, 2));
                            //if same module, retrieve collection if not already populated
                            if (!sameModule() || empty) {
                                let params = rootGetters["aux/xhrFiltersFromNewQueryString"];
                                console.log(`params from queryString: ${JSON.stringify(params, null, 2)}`);
                                return dispatch("mgr/query", { params: params, spinner: true }, { root: true });
                            } else if (rootState.mgr.isDirtyChunk && rootGetters["mgr/ready"].item && rootGetters["mgr/ready"].collection) {
                                console.log('isDirty - calling page() ');
                                dispatch("mgr/page", { name: "main", page: state.collections["main"].pageNo + 1, forceLoad: true }, { root: true });
                                commit('mgr/dirtyChunk', false, { root: true });
                                return 0;
                            }
                            break;

                        case "show":
                            //console.log('mgr.dispatch(show)');// + JSON.stringify(res, null, 2));
                            if (sameModule()) {
                                //if no collection loaded yet, retrieve new module's collection and then item
                                if (empty) {
                                    //if same module, but collection empty, retrieve collection and then item
                                    return dispatch("mgr/query", { params: {}, spinner: true }, { root: true })
                                        .then((res) => {
                                            return dispatch("mgr/loadItem", state.to.id, { root: true });
                                            //return res;
                                        })
                                } else {
                                    if (state.current.id !== state.to.id ||
                                        state.current.action === "update" ||
                                        state.current.action === "tags") {
                                        //collection loaded - load item only
                                        return dispatch("mgr/loadItem", state.to.id, { root: true });
                                    } else {
                                        console.log("mgr - same item id - not loading")
                                    }
                                }
                            } else {
                                //if not same module, clear old module and retrieve new module's collection and then item 
                                return dispatch("mgr/loadItem", state.to.id, { root: true })
                                    .then((res) => {
                                        //console.log('mgr.routeChanged.show after loading item. loading collection...');
                                        return dispatch("mgr/query", { params: {}, spinner: true }, { root: true });
                                        return res;
                                    })
                            }
                            break;

                        case "create":
                        case "update":
                            dispatch("mgr/prepare", true, { root: true });
                            return 0;
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
            //if new module, wait until module's metadata (tags, lookups) are retrieved from DB.
            /////////////////////////////////////////////////////////////////////////


            //let routerStatus = rootGetters["mgr/routes/status"];
            dispatch('parseRoute', payload);
            if (!sameModule() && !["Home", "Auth"].includes(state.to.module)) {
                commit("mgr/ready", { entity: "collection", isReady: false }, { root: true });
                commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
                dispatch('mgr/initializeModule', null, { root: true })
                    .then(res => {
                        return loadThings();
                    });
            } else {
                return loadThings();
            }
        },        

        goTo({ state, rootState, getters, rootGetters }, payload) {
            //an abstraction layer above vue router to enable less cumbersome calls from components/vuex.
            function goToString() {
                let moduleBaseUrl = jezConfig.myModules[state.status.module].appBaseUrl;
                switch (payload) {
                    case "home":
                        return { path: "/" };
                    case "login":
                        return { path: "/auth/login" };
                    case "welcome":
                        return { path: `${moduleBaseUrl}/welcome` };
                    case "update":
                        return { path: `${moduleBaseUrl}/${state.status.id}/update` };
                    case "media":
                        return { path: `${moduleBaseUrl}/${state.status.id}/media` };
                    case "tags":
                        return { path: `${moduleBaseUrl}/${state.status.id}/tags` };
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
            console.log(`mgr.routes.goTo() payload: ${JSON.stringify(payload, null, 2)}`);

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
                    state.router.push({ path: newRoute.path });
                }
            } else {
                console.log(`mgr.routes.push() error in parsing path: ${newRoute.path}`);
            }
        },
    },

};
