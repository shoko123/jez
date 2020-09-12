export default {
    namespaced: true,
    state: {
        find: null,
        newItem: {
            findable_type: null,
            findable_id: null,
            registration_category: null,
            locus_id: null,
            basket_no: null,
            item_no: null,

            related_pottery_basket: null,
            date: null,
            description: null,
            notes: null,
            square: null,
            keep: false,
            level_top: null,
            level_bottom: null,
        },
    },
    getters: {
        item(state) {
            return state.find;
        },

        newItem(state) {
            return state.newItem;
        },
    },
    mutations: {
        item(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.find = payload;
        },

        registrationData(state, registrationData) {
            state.newItem.findable_type = registrationData.findable_type;
            state.newItem.findable_id = registrationData.findable_id;
            state.newItem.locus_id = registrationData.locus_id;
            state.newItem.registration_category = registrationData.registration_category;
            state.newItem.basket_no = registrationData.basket_no;
            state.newItem.item_no = registrationData.item_no;
        },

        date(state, payload) {
            state.newItem.date = payload;
        },
        square(state, payload) {
            state.newItem.square = payload;
        },
        related_pottery_basket(state, payload) {
            state.newItem.related_pottery_basket = payload;
        },
        keep(state, payload) {
            state.newItem.keep = payload;
        },

        level_top(state, payload) {
            state.newItem.level_top = payload;
        },
        level_bottom(state, payload) {
            state.newItem.level_bottom = payload;
        },

        description(state, payload) {
            state.newItem.description = payload;
        },

        notes(state, payload) {
            state.newItem.notes = payload;
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            
            let toCopy = payload;
            let current = rootGetters["fnd/item"];
            let registrationData = {
                findable_type: toCopy ? current.findable_type : null,
                findable_id: toCopy ? current.findable_id : null,
                locus_id: toCopy ? current.locus_id : null,
                registration_category: toCopy ? current.registration_category : null,
                basket_no: toCopy ? current.basket_no : null,
                item_no: toCopy ? current.item_no : null
            }
            commit("registrationData", registrationData);

            commit("related_pottery_basket", toCopy ? current.related_pottery_basket : null);
            commit("date", toCopy ? current.date : null);
            commit("description", toCopy ? current.description : null);
            commit("notes", toCopy ? current.notes : null);
            commit("square", toCopy ? current.square : null);
            commit("keep", toCopy ? current.keep : null);
            commit("level_top", toCopy ? current.level_top : null);
            commit("level_bottom", toCopy ? current.level_bottom : null);
            console.log("fnd/prepare newFind: " + JSON.stringify(getters["newItem"], null, 2));
        },
    }
}
