export default {
    namespaced: true,
    state: {
        router: null,
        status: {
            module: null,
            modulePrevious: null,
            action: null,
            actionPrevious: null,
            id: null,
            idPrevious: null,
            isPicker: false,
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
            console.log(`mgr/setRouter() payload: `);//${JSON.stringify(payload, null, 2)}
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
    },
    actions: {
        goToRoute({ state }, route) {
            state.router.push({ path: `${route}` });
        },

        parseRoute({ state, commit }, payload) {
            //TODO this needs a lot of work to make more reasonable, but it works for now.

            let sections = payload.to.path.split('/');

            commit("modulePrevious", state.status.module);
            commit("idPrevious", state.status.id);
            commit("actionPrevious", state.status.action);

            //console.log('parsePaths.to: ' + payload.to.path);

            switch (sections[1]) {
                case '':
                    //whenever we change module we clear the old one. so let make the old one 'aut'
                    //TODO fix this nonesense

                    commit("module", 'Home');
                    break;

                case 'login':
                    commit("module", 'Auth');
                    commit("action", 'login');
                    break;

                case 'dig-modules':
                    commit("action", sections[sections.length - 1]);
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
                    commit("action", sections[sections.length - 1]);
                    commit("id", payload.to.params ? payload.to.params.id : null);
                    break
                default:
                    console.log('can\'t parse path');
            }
        },
    },

};
