export default {
    namespaced: true,

    state: {
        appStatus: {
            subject: null,
            action: null,
            moduleName: null,
            tableName: null,
            itemName: null,
            findType: null,
            id: null,
        },

    },

    getters: {
        appStatus(state) {
            return state.appStatus;
        },
        tableFullName(state) {
            return state.appStatus.moduleName + '/' + state.appStatus.tableName;
        },
        itemFullName(state) {
            return state.appStatus.moduleName + '/' + state.appStatus.itemName;
        },
        moduleName(state) {
            return state.appStatus.moduleName;
        },
        isLoaded(state, rootGetters) {
            if (!state.appStatus.moduleName) {
                return false;
            } else {
                //let moduleName = state.appStatus.moduleName;
                //return rootGetters[state.appStatus.moduleName + '/isLoaded'];
                return rootGetters['gss/isLoaded'];
                //return loaded;
            }
            //return !(rootGetters[manager.moduleName + '/isLoaded'])
        },
    },
    mutations: {
        setAppStatus(state, payload) {
            state.appStatus = payload;
            console.log('store.manager.commit.setAppStatus: ' + JSON.stringify(state.appStatus, null, 2));
        },
    },
    actions: {
        routeChanged({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log('store.manager.action.beforeRouteChanged to: ' + payload.path + '\nname: ' + payload.name + '\nparams: ' + JSON.stringify(payload.params, null, 2));
            let manager = {};
            switch (payload.name) {
                case 'login':
                    manager.subject = 'login';
                    manager.action = null;
                    break;

                case 'welcome':
                    manager.subject = payload.params.findType;
                    manager.action = 'showSummary';
                    break;

                case 'showItem':
                    manager.subject = payload.params.findType;
                    manager.action = 'showItem';
                    break;

                case 'showCollection':
                    manager.subject = payload.params.findType;
                    manager.action = 'showCollection';
                    break;

                default:
                //alert('store.manager bad route name ' + payload.name);
                //this.$router.push({ path: `/` });

            }


            switch (manager.subject) {
                case 'pottery-baskets':
                    manager.moduleName = 'pt';
                    manager.tableName = 'pottery_baskets';
                    manager.itemName = 'pottery_basket';
                    break;

                case 'groundstones':
                    manager.moduleName = 'gss';
                    manager.tableName = 'groundstones';
                    manager.itemName = 'groundstone';
                    break;

                default:
                //alert('store.manager bad subject name ' + state.subject);
                //this.$router.push({ path: `/` });
            }
            commit('setAppStatus', manager);
            //possible actions on route change are loading an item or a collection.
            //console.log('needsLoading: ' + state.needsLoading);
            //if (state.needsLoading) {
            //    dispatch('api/service', null, { root: true });
            //}
            if (!state.appStatus.moduleName) {
                return;
            }
            //let isLoaded = getters.isLoaded;
            let isLoaded = rootGetters[state.appStatus.moduleName + '/isLoaded'];
            console.log('isLoaded: ' + isLoaded);
            if (!isLoaded) {
                
                let fullName = getters.tableFullName;
                console.log('manager fullName: ' + fullName);

                commit("isLoading", {
                    value: true,
                    message: "loading groundstones"
                  }, { root: true});


                dispatch(fullName, null, { root: true })
                    .then((res) => {
                        console.log('APIService returned OK');
                        commit("isLoading", {
                            value: false,
                          }, { root: true});
                    })
                    .catch((err) => {
                        console.log('APIService returned err: ' + err);
                        commit("isLoading", {
                            value: false,
                          }, { root: true});
                    })
                //dispatch('api/service', params, { root: true });
            }
        },

    }
}