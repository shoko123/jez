export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
            registrationCategories: ["PT", "AR"],
        },
        newItem: {           
                id: null,
                periods: null,
                notes: null,
                description: null,      
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        /////New pottery

        periods(state) {
            return state.newItem.periods;
        },
        notes(state) {
            return state.newItem.notes;
        },
        measurements(state) {
            return state.newItem.measurements;
        },

        newItem(state) {
            return state.newItem;
        },
        //mandatory, used to sort and attach new tags.
        tagCategories(state) {
            return [];
        },
    },

    mutations: {
        periods(state, payload) {
            state.newItem.periods = payload;
        },
        notes(state, payload) {
            state.newItem.notes = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },

        prepareNewItem(state, newItem) {
            if (newItem) {
                state.newItem.id = null;
                state.newItem.periods = null;
                state.newItem.description = null;
                state.newItem.notes = null;
            } else {
                state.newItem.id = state.item.id;
                state.newItem.periods = state.item.periods;
                state.newItem.description = state.item.description;
                state.newItem.notes = state.item.notes;
            }
        },
        clear(state) {
            console.log("pottery.clear");     
        },
    },

    actions: {
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("prepareNewItem", rootGetters["mgr/status"].isCreate);
            commit("fnd/prepareNewFind", rootGetters["mgr/status"].isCreate, { root: true });
        },
        prepareFilter({state, commit}, payload){
          
        },
        resetTagTypes({commit}) {
            //
        },
    }
}