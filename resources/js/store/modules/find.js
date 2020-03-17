export default {
    namespaced: true,
    state: {
        find: null,
        newItem: {
            data: {
                
                registration_category: null,
                locus_id: null,
                basket_no: null,
                item_no: null,
                findable_type: null,
                findable_id: null,
                related_pottery_basket: null,
                date: null,
                find_description: null,
                find_notes: null,
                square: null,
                keep: false,
                level_top: null,
                level_bottom: null,
            },
        },
    },
    getters: {
        find(state) {
            return state.find;
        },

        newFindData(state) {
            return state.newItem.data;
        },
        newItem(state) {
            return state.newItem;
        },

        date(state) {
            return state.newItem.data.date;
        },
        square(state) {
            return state.newItem.data.square;
        },
        keep(state) {
            return state.newItem.data.keep;
        },

        level_top(state) {
            return state.newItem.data.level_top;
        },
        level_bottom(state) {
            return state.newItem.data.level_bottom;
        },

        find_description(state) {
            return state.newItem.data.find_description;
        },
        find_notes(state) {
            return state.newItem.data.find_notes;
        },
        related_pottery_basket(state) {
            return state.newItem.data.related_pottery_basket;
        },
    },
    mutations: {
        find(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.find = payload;
        },

        prepare(state, data) {
            state.newItem.data = data;
        },

        registrationData(state, registrationData) {
            console.log("fnd/registrationData" +  JSON.stringify(registrationData, null, 2));
            Object.assign(state.newItem.data, registrationData)
        },

        date(state, payload) {
            state.newItem.data.date = payload;
        },
        square(state, payload) {
            state.newItem.data.square = payload;
        },
        related_pottery_basket(state, payload) {
            state.newItem.data.related_pottery_basket = payload;
        },
        keep(state, payload) {
            state.newItem.data.keep = payload;
        },

        level_top(state, payload) {
            state.newItem.data.level_top = payload;
        },
        level_bottom(state, payload) {
            state.newItem.data.level_bottom = payload;
        },

        find_description(state, payload) {
            state.newItem.data.find_description = payload;
        },
        
        find_notes(state, payload) {
            state.newItem.data.find_notes = payload;
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }) {
            let data = {};
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["fnd/find"]);
                //since we have to send a flat form to server, we change the following fields
                data.find_description = data.description;
                data.find_notes = data.notes;
                
                delete data.id;
                delete data.description;
                delete data.notes;
            } else {            
                data.related_pottery_basket = null;
                data.date = null;
                data.find_description = null;
                data.find_notes = null;
                data.square = null;
                data.keep = false,
                data.level_top = null;
                data.level_bottom = null;
            }
            commit('prepare', data);
        },
    }
}
