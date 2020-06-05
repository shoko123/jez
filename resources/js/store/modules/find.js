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
            find_description: null,
            find_notes: null,
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
            console.log("fnd/registrationData" + JSON.stringify(registrationData, null, 2));
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

        find_description(state, payload) {
            state.newItem.find_description = payload;
        },

        find_notes(state, payload) {
            state.newItem.find_notes = payload;
        },
    },
    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }) {
            let isUpdate = rootGetters["mgr/status"].isUpdate;
            let current = rootGetters["fnd/item"];
            let registrationData = {
                findable_type: isUpdate ? current.findable_type : null,
                findable_id: isUpdate ? current.findable_id : null,
                locus_id: isUpdate ? current.locus_id : null,
                registration_category: isUpdate ? current.registration_category : null,
                basket_no: isUpdate ? current.basket_no : null,
                item_no: isUpdate ? current.item_no : null
            }
            commit("registrationData", registrationData);

            commit("related_pottery_basket", isUpdate ? current.related_pottery_basket : null);
            commit("date", isUpdate ? current.date : null);
            commit("find_description", isUpdate ? current.description : null);
            commit("find_notes", isUpdate ? current.notes : null);
            commit("square", isUpdate ? current.square : null);
            commit("keep", isUpdate ? current.keep : null);
            commit("level_top", isUpdate ? current.level_top : null);
            commit("level_bottom", isUpdate ? current.level_bottom : null);
        },
    }
}
