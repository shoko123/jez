import jezConfig from '../../../jezConfig.js';
export default {
    namespaced: true,
    state: {
        router: null,
        status: {
            module: "Home",
            modulePrevious: null,
            qParams: null,
            qParamsPrevious: null,
            action: null,
            actionPrevious: null,
            id: null,
            idPrevious: null,
        },
    },
    getters: {
        getRouter(state) {
            return state.router;
        },
        status(state) {
            return state.status;
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
        qParams(state, payload) {
            state.status.qParams = payload;
        },
        qParamsPrevious(state, payload) {
            state.status.qParamsPrevious = payload;
        },
    },
    actions: {

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
                console.log(`mgr.routes.push() newRoute: ${JSON.stringify(newRoute, null, 2)}`);
                if (newRoute.hasOwnProperty("params")) {
                    state.router.push({ path: newRoute.path, query: newRoute.params/*JSON.stringify(newRoute.params) */});//JSON.stringify(newRoute.params)
                } else {
                    state.router.push({ path: newRoute.path });
                }
            } else {
                console.log(`mgr.routes.push() error in parsing path: ${newRoute.path}`);
            }
        },

        parseRoute({ state, commit }, payload) {
            //TODO this needs a lot of work to make it more reasonable. However, it works for now.

            let sections = payload.to.path.split('/');
            let action = sections[sections.length - 1];
            commit("modulePrevious", state.status.module);
            commit("idPrevious", state.status.id);
            commit("actionPrevious", state.status.action);
            if (action === "list") {
                commit("qParamsPrevious", state.status.qParams);
                //let parsedQuery = payload.to.query;
                //parsedQuery.lookups = JSON.parse(parsedQuery.lookups);
                //parsedQuery.tagParams = JSON.parse(parsedQuery.tagParams);
                //commit("qParams", parsedQuery);
                commit("qParams", payload.to.query);

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
    },

};
