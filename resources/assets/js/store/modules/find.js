export default {
    namespaced: true,
    state: {
        find: null,
        newItem: {
            data: {
                id: null,//findId
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
        find_notes(state) {
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

        prepareNewFind(state, newFind) {
            if (newFind) {
                state.newItem.data.related_pottery_basket = null;
                state.newItem.data.date = null;
                state.newItem.data.description = null;
                state.newItem.data.notes = null;
                state.newItem.data.square = null;
                state.newItem.data.keep = false;
                state.newItem.data.drawn = false;
                state.newItem.data.level_top = null;
                state.newItem.data.level_bottom = null;
                state.newItem.data.quantity = null;
                state.newItem.data.storage_location = null;
            } else {
                state.newItem.data.id = state.find.id;
                state.newItem.data.locus_id = state.find.locus_id;
                state.newItem.data.registration_category = state.find.registration_category;
                state.newItem.data.basket_no = state.find.basket_no;
                state.newItem.data.item_no = state.find.item_no;
                state.newItem.data.findable_type = state.find.findable_type;
                state.newItem.data.findable_id = state.find.findable_id;
                state.newItem.data.related_pottery_basket = state.find.related_pottery_basket;
                state.newItem.data.date = state.find.date;
                state.newItem.data.description = state.find.description
                state.newItem.data.notes = state.find.notes;
                state.newItem.data.square = state.find.square;
                state.newItem.data.keep = state.find.keep;
                state.newItem.data.drawn = state.find.drawn;
                state.newItem.data.level_top = state.find.level_top;
                state.newItem.data.level_bottom = state.find.level_bottom;
                state.newItem.data.storage_location = state.find.storage_location;
                state.newItem.data.quantity = state.find.quantity;
            }
        },

        copyRegistrationDetails(state, registrationData) {
            console.log("fnd/copyRegistrationDetails");
            state.newItem.data.findable_type = registrationData.findable_type;
            state.newItem.data.locus_id = registrationData.locus_id;
            state.newItem.data.registration_category = registrationData.registration_category;
            state.newItem.data.basket_no = registrationData.basket_no;
            state.newItem.data.item_no = registrationData.item_no;
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
   
    }
}
