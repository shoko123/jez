export default {
    namespaced: true,

    state: {
       levels: null,
       locationSecondary: null,
       findType: null,
       id: null,

    },
   
    getters: {
        /*
        getCustomers({state, rootState}) {
            return rootState.st.stone;
            //return rootState.customers;
        }
        */
    },
     mutations: {
         routeChanged(state, payload) {
             console.log('store.manager.beforeRouteChanged' + JSON.stringify(payload.params, null, 2));
         },
    },
    actions: {
        
    }
}