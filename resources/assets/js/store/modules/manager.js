export default {
    namespaced: true,

    state: {
        module: null,
        action: null,
        findType: null,
        previousPath: null,
        //id: null,
        //collection: null,
        //item: null,
    },

    getters: {
        appStatus(state) {
            return state.appStatus;
        },
        
        
        
        moduleName(state) {
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
        
        //NOTE - although not used, functions must include state and rootState in order to work.
        isLoaded(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/isLoaded'];
        },
        collectionLoaded(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/collectionLoaded'];
        },
        itemLoaded(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/itemLoaded'];
        },
        index(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/index'];
        },
        getData(state, getters, rootState, rootGetters) {
            return state.module + '/getData';
        },


        item(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/item'];
        },

        collection(state, getters, rootState, rootGetters) {
            return rootGetters[state.module + '/collection'];
        },
        

        adjacents(state, getters, rootState, rootGetters) {
            if (!getters.itemLoaded || !getters.collectionLoaded) {
                return (null);
            }

            console.log('manager.next current item id ' + getters.item.id + ' at index ' + getters.index);
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
        }

    },
    mutations: {
        /*
        setAppStatus(state, payload) {
            state.appStatus = payload;
            console.log('store.manager.commit.setAppStatus: ' + JSON.stringify(state.appStatus, null, 2));
        },
        */
        parsePath(state, payload) {
            let sections = payload.to.path.split('/');
            state.previousPath = payload.from.path;
            //console.log('parsePaths.from ' + JSON.stringify(fromTokens, null, 2));
            //console.log('parsePaths.to: ' + JSON.stringify(sections, null, 2));
            //let path = payload.to.path;
            
            switch (sections[1]) {
                case '':
                    state.module = null;
                    state.needsData = false;
                    break;

                case 'login':
                    state.module = 'aut';
                    state.action = 'login';
                    state.needsData = false;
                    break;

                case 'loci':
                    state.module = 'loc';
                    state.action = sections[sections.length - 1];
                    state.id = payload.to.params ? payload.to.params.id : null;
                    state.findType = null;
                    state.needsData = true;
                    break;

                case 'finds':


                    state.action = sections[sections.length - 1];
                    state.needsData = true;
                    state.id = payload.to.params ? payload.to.params.id : null;
                    switch (sections[2]) {
                        case 'groundstones':
                            state.module = 'gss';
                            break

                        default:
                            state.module = 'unknown';
                            alert('unknown find type');
                            break

                    }
                    break;
                default:
                    state.needsData = false;
                    console.log('can\'t parse path');
            };

            state.action = sections[sections.length - 1]
            console.log('parsePaths payload.to.path: ' + JSON.stringify(payload.to.path, null, 2) + '\nsections: ' + JSON.stringify(sections, null, 2) + '\nstate: ' + JSON.stringify(state, null, 2));
        },

        isCreate(state, payload) {
            state.isCreate = payload;
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            commit('parsePath', payload);
            if (state.needsData) {
                //call getData action of current module (loc, gss, etc...)
                dispatch(getters.getData, state, { root: true })
            }
        },
    }
}