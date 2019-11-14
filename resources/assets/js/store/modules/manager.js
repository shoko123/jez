export default {
    namespaced: true,

    state: {
        module: null,
        action: null,
        findType: null,
        id: null,
        previousPath: null,
        previousModule: null,
        previousId: null,
        previousAction: null,
        isFind: false,
        isRead: true,
    },

    getters: {
        status(state, getters, rootState, rootGetters) {
            let status = {
                moduleItemName: rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].itemName : null,
                moduleCollectionName: rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].collectionName : null,
                moduleBaseURL: rootGetters[state.module + '/moduleStaticData'] ? rootGetters[state.module + '/moduleStaticData'].baseURL : null,
                moduleFolderName: state.module,
                previousModule: state.previousModule,
                previousPath: state.previousPath,               
                action: state.action,
                previousAction: state.previousAction,
                id: state.id,
                previousId: state.previousId,
                
                isLocus: (getters.moduleItemName === "Locus"),
                isFind: getters.isFind,
                isCreate: (state.action === 'create'),
                isUpdate: (state.action === 'update'),
                isRead: (state.action === 'show' || state.action === 'list'),
                isCreateLocus: (state.action === 'create' && state.module === 'loc'),
                isCreateFind: (state.action === 'create' && getters.isFind),            
            };

            return status;
        },
        moduleFolderName(state) {
            return state.module;
        },

        moduleBaseURL(state, getters, rootState, rootGetters) {
            let moduleStaticData = rootGetters[state.module + '/moduleStaticData'];
            return moduleStaticData ? moduleStaticData.baseURL : null;
        },

        moduleItemName(state, getters, rootState, rootGetters) {
            let moduleStaticData = rootGetters[state.module + '/moduleStaticData'];
            return moduleStaticData ? moduleStaticData.itemName : null;
        },
        moduleCollectionName(state, getters, rootState, rootGetters) {
            let moduleStaticData = rootGetters[state.module + '/moduleStaticData'];
            return moduleStaticData ? moduleStaticData.collectionName : null;
        },
        isLocus(state, getters) {
            return (getters.moduleItemName === "Locus") ? true : false;
        },
        isFind(state, getters) {
            switch (getters.moduleItemName) {
                case "Stone":
                case "Glass":
                case "Pottery":
                case "PotteryBasket":
                case "Lithic":
                    return true;

                default:
                    return false;
            }
        },
        //NOTE - although not used, functions must include state and getters in order for the 'root' option to work.

        index(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/index'];
        },

        item(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/item'];
        },

        collection(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/collection'];
        },
        count(state, getters, rootState, rootGetters) {
            return getters.collection ? getters.collection.length : 0;
        },

        adjacents(state, getters, rootState, rootGetters) {
            //if (state.action !== "show") {
            //    return;
            //} 
            if (!getters.collection || !getters.item) {
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

            nextIndex = (getters.index == getters.collection.length - 1) ? 0 : getters.index + 1;
            prevIndex = (getters.index == 0) ? getters.collection.length - 1 : getters.index - 1;
            adjacents.next = getters.collection[nextIndex].id;
            adjacents.prev = getters.collection[prevIndex].id;
            console.log('adjacent is: ' + JSON.stringify(adjacents, null, 2));
            return adjacents;
        },
        isCreate(state) {
            return state.action === 'create';
        },
        isUpdate(state) {
            return state.action === 'update';
        },
        previousPath(state) {
            return state.previousPath;
        },
        getBaseAddressFromItemName: (state, getters) => (itemName) => {
            switch (itemName) {
                case "Stone":
                    return `/finds/stones`;
                case "Lithic":
                    return `/finds/lithics`;
                case "Pottery": return `/finds/potterys`;
            }
        }
    },
    mutations: {

        parsePath(state, payload) {

            //TODO this needs a lot of work to make more reasonable, but it works for now.

            let sections = payload.to.path.split('/');
            state.previousPath = payload.from.path;
            state.previousModule = state.module;
            state.previousId = state.id;
            state.previousAction = state.action;
            //console.log('parsePaths.from ' + JSON.stringify(fromTokens, null, 2));
            //console.log('parsePaths.to: ' + JSON.stringify(sections, null, 2));
            //let path = payload.to.path;

            switch (sections[1]) {
                case '':
                    //whenever we change module we clear the old one. so let make the old one 'aut'
                    //TODO fix this nonesense
                    state.previousModule = state.module = 'aut';
                    break;

                case 'login':
                    state.module = 'aut';
                    state.action = 'login';
                    break;

                case 'loci':
                    state.module = 'loc';
                    state.action = sections[sections.length - 1];
                    state.id = payload.to.params ? payload.to.params.id : null;
                    state.findType = null;
                    break;

                case 'finds':
                    state.action = sections[sections.length - 1];
                    state.id = payload.to.params ? payload.to.params.id : null;
                    switch (sections[2]) {
                        case 'stones':
                            state.module = 'stn';
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

            state.action = sections[sections.length - 1]
            console.log('parsePaths payload.to.path: ' + JSON.stringify(payload.to.path, null, 2) + '\nsections: ' + JSON.stringify(sections, null, 2));
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            function sameModule() {
                return (getters.status.moduleFolderName == getters.status.previousModule)
            }

            commit('parsePath', payload);
            console.log('mgr.routeChanged.show sameModule: ' + sameModule() + ' collection: ' + !!getters.collection + ' status: ' + JSON.stringify(getters.status, null, 2));
            if (!sameModule()) {
                if (getters.status.previousModule) {
                    commit(`${getters.status.previousModule + '/clear'}`, null, { root: true });
                }
                commit('pkr/clear', null, { root: true })
            }

            switch (state.action) {
                case "show":

                    if (sameModule()) {
                        //if no collection loaded yet, retrieve new module's collection and then item
                        if (!getters.collection) {
                            //if same module, but collection empty, retrieve collection and then item
                            dispatch(`${state.module + '/collection'}`, null, { root: true })
                                .then((res) => {
                                    console.log('mgr.routeChanged.show after loading collection. loading item...');// + JSON.stringify(res, null, 2));
                                    dispatch(`${state.module + '/item'}`, state.id, { root: true });
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
                            if(state.previousId !== state.id || state.previousAction === 'update') {
                            //collection loaded - load item only
                            console.log("mgr - new item id - loading")
                            dispatch(`${state.module + '/item'}`, state.id, { root: true })
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
                        //if not same module, clear old module and retrieve new module's collection and then item 
                        //dispatch(`${getters.stattus.previousModule + '/clear'}`, null, { root: true })
                        dispatch(`${state.module + '/item'}`, state.id, { root: true })
                            .then((res) => {
                                console.log('mgr.routeChanged.show after loading item. loading collection...');// + JSON.stringify(res, null, 2));
                                dispatch(`${state.module + '/collection'}`, null, { root: true });
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
                    dispatch(`${state.module + '/collection'}`, null, { root: true });
                    //}
                    break;

                case "create":
                    dispatch(`${state.module + '/prepareNewItem'}`, true, { root: true });
                    dispatch("pkr/prepareItem", true, { root: true });
                case "update":
                    dispatch(`${state.module + '/prepareNewItem'}`, null, { root: true });
                default:
            }
        },
    }
}