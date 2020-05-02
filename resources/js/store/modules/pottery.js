export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
            registrationCategories: ["PT", "AR"],
        },

        newItem: {
            data: {
                id: null,
                periods: null,
                notes: null,
                description: null,
            },
            dataExtra: {
            },
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        /////New pottery

        periods(state) {
            return state.newItem.data.periods;
        },
        notes(state) {
            return state.newItem.data.notes;
        },
        measurements(state) {
            return state.newItem.data.measurements;
        },

        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {


        periods(state, payload) {
            state.newItem.data.periods = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        description(state, payload) {
            state.newItem.data.description = payload;
        },
        newItemData(state, payload) {
            state.newItem.data = payload;
        },

        prepareNewItem(state, newItem) {
            if (newItem) {
                state.newItem.data.id = null;
                state.newItem.data.periods = null;
                state.newItem.data.description = null;
                state.newItem.data.notes = null;
            } else {
                state.newItem.data.id = state.item.id;
                state.newItem.data.periods = state.item.periods;
                state.newItem.data.description = state.item.description;
                state.newItem.data.notes = state.item.notes;
            }
        },
        clear(state) {
            console.log("pottery.clear");
            state.collection = null;
            state.item = null;
            //state.newItem = null;           
        },
    },

    actions: {
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            commit("prepareNewItem", rootGetters["mgr/status"].isCreate);
            commit("fnd/prepareNewFind", rootGetters["mgr/status"].isCreate, { root: true });
        },
        prepareFilter({state, commit}, payload){
            commit("tag/setOrderedCategories", []/*state.tagOrderedCategories*/, { root: true });
        },
    }
}