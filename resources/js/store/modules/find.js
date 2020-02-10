export default {
    namespaced: true,
    state: {
        find: null,
        newItem: {
            data: {
                find_id: null,//findId
                registration_category: null,
                locus_id: null,
                basket_no: null,
                item_no: null,
                findable_type: null,
                findable_id: null,
                related_pottery_basket: null,
                date: null,
                description: null,
                notes: null,
                square: null,
                keep: false,
                drawn: false,
                level_top: null,
                level_bottom: null,
                quantity: null,
                storage_location: null,
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
        drawn(state) {
            return state.newItem.data.drawn;
        },
        level_top(state) {
            return state.newItem.data.level_top;
        },
        level_bottom(state) {
            return state.newItem.data.level_bottom;
        },
        storage_location(state) {
            //console.log("store.find.set.storage_location: " + payload);
            return state.newItem.data.storage_location;
        },

        description(state) {
            return state.newItem.data.description;
        },
        notes(state) {
            return state.newItem.data.notes;
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
        drawn(state, payload) {
            state.newItem.data.drawn = payload;
        },
        level_top(state, payload) {
            state.newItem.data.level_top = payload;
        },
        level_bottom(state, payload) {
            state.newItem.data.level_bottom = payload;
        },
        storage_location(state, payload) {
            //console.log("store.find.set.storage_location: " + payload);
            state.newItem.data.storage_location = payload;
        },

        description(state, payload) {
            state.newItem.data.description = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }) {
            let data = {};
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["fnd/find"]);
                data.find_id = data.id;
                delete data.id;
            } else {            
                data.related_pottery_basket = null;
                data.date = null;
                data.description = null;
                data.notes = null;
                data.square = null;
                data.keep = false,
                data.drawn = false,
                data.level_top = null;
                data.level_bottom = null;
                data.quantity = null;
                data.storage_location = null;
            }
            commit('prepare', data);
        },
    }
}
