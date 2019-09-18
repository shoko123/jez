export default {
    namespaced: true,

    state: {
        module: null,
        action: null,
        findType: null,
        previousPath: null,
    },

    getters: {
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
                case "Groundstone":
                case "Glass":
                case "Pottery":
                case "PotteryBasket":
                case "Lithic":
                    return true;

                default:
                    return false;
            }
        },
        //NOTE - although not used, functions must include state and rootState in order to work.

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
                console.log('adjacent problem: no item, no collection');
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
        newItemTag(state, getters, rootState, rootGetters) {

            switch (state.module) {
                case "loc":
                    return rootGetters["loc/newItemTag"];
                case "gss":
                case "ptr":
                case "ptb":
                    return rootGetters["fnd/newItemTag"];
            }
        },

    },
    mutations: {

        parsePath(state, payload) {
            let sections = payload.to.path.split('/');
            state.previousPath = payload.from.path;
            //console.log('parsePaths.from ' + JSON.stringify(fromTokens, null, 2));
            //console.log('parsePaths.to: ' + JSON.stringify(sections, null, 2));
            //let path = payload.to.path;

            switch (sections[1]) {
                case '':
                    state.module = null;
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
                    console.log('can\'t parse path');
            };

            state.action = sections[sections.length - 1]
            console.log('parsePaths payload.to.path: ' + JSON.stringify(payload.to.path, null, 2) + '\nsections: ' + JSON.stringify(sections, null, 2) + '\nstate: ' + JSON.stringify(state, null, 2));
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log('store.manager.action.beforeRouteChanged to: ' + payload.to.path + '\nname: ' + payload.to.name + '\nparams: ' + JSON.stringify(payload.to.params, null, 2));
            commit('parsePath', payload);

            switch (state.action) {
                case "show":
                    dispatch(`${state.module + '/item'}`, state.id, { root: true });
                    dispatch("pkr/areasSeasons", null,  { root: true })
                    break;

                case "welcome":
                case "list":
                    dispatch(`${state.module + '/collection'}`, null, { root: true });
                    break;

                case "create":
                    dispatch("pkr/prepareNewItem", null, { root: true });
                case "update":
                    dispatch(`${state.module + '/prepareNewItem'}`, null, { root: true });
                default:
            }
        },
    }
}