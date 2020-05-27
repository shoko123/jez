

export default {
    namespaced: false,
    state: {
        defaultTagCategories: [
            { type: "Base-Type", mandatory: true, multiple: false, header: "base type", showInFilters: true, showInNewItem: true },
            { type: "Type-Passive", mandatory: true, multiple: true, header: "T:Passive", showInFilters: false, showInNewItem: false },
            { type: "Type-Active", mandatory: true, multiple: true, header: "T:Active", showInFilters: false, showInNewItem: false },
            { type: "Type-Active-Or-Passive", mandatory: true, multiple: false, header: "T:Act/pass", showInFilters: false, showInNewItem: false },
            { type: "Type-Non-Processor", mandatory: true, multiple: true, header: "T:non-processor", showInFilters: false, showInNewItem: false },
            { type: "Material", mandatory: true, multiple: false, header: "material", showInFilters: true, showInNewItem: true },
            { type: "Preservation", mandatory: true, multiple: false, header: "preservation", showInFilters: true, showInNewItem: true },
            { type: "Source", mandatory: false, multiple: false, header: "source", showInFilters: true, showInNewItem: true },
            { type: "Life-Stage", mandatory: true, multiple: true, header: "life stage", showInFilters: true, showInNewItem: true },
            { type: "Morphology", mandatory: false, multiple: true, header: "morphology", showInFilters: true, showInNewItem: true },
            { type: "Profile", mandatory: false, multiple: true, header: "profile", showInFilters: true, showInNewItem: true },
            { type: "Production", mandatory: false, multiple: true, header: "production", showInFilters: true, showInNewItem: true },
            { type: "Use-Wear", mandatory: false, multiple: true, header: "use wear", showInFilters: true, showInNewItem: true },
        ],
        predefinedFilters: [{name: "limestone", tags: [{ id: 5, type: "Material", name: "Limestone" }]}, {name: "flint", tags: [{ id: 7, type: "Material", name: "Flint or Chert" }]}],
        BaseTypeOptions: ["Type-Passive", "Type-Active", "Type-Active-Or-Passive", "Type-Non-Processor"],
        tagCategories: [],
    },


    getters: {
        tagCategories(state) {
            return state.tagCategories;
        },
        tagCategoriesShow(state) {
            return state.tagCategories.filter(x => x.show);
        },
        BaseTypeOptions(state) {
            return state.BaseTypeOptions;
        },
    },
    mutations: {
        resetTagTypes(state) {
            state.tagCategories = state.defaultTagCategories;
        },
    },
    actions: {
        resetTagTypes({ commit }) {
            commit("resetTagTypes");
        },

        tagToggled({ state, getters, rootState, rootGetters, commit, dispatch }, payload) {
            console.log("stoneTags.tagToggled() payload: " + JSON.stringify(payload, null, 2));
            switch (payload.tag.type) {
                case "Base-Type":
                    dispatch("baseTypeChanged", payload);
                    break;

                default:

            }
        },

        baseTypeChanged({ state, getters, rootGetters, dispatch }, payload) {
            console.log("stoneTags.baseTypeChanged() base-type: " + payload.tag.name + " selected: " + payload.wasSelected);
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let newTypeName;

            //get new type name
            switch (payload.tag.name) {
                case "Passive":
                    newTypeName = "Type-Passive";
                    break;
                case "Active (handheld)":
                    newTypeName = "Type-Active";
                    break;
                case "Active or Passive":
                    newTypeName = "Type-Active-Or-Passive";
                    break;
                case "Non-Processor":
                    newTypeName = "Type-Non-Processor";
                    break;
            }

            let index = state.tagCategories.map(x => x.type).indexOf(newTypeName);
            console.log("index: " + index);

            //show/hide this type as a tab in the appropriate table(filters or bewTags - make reactive by using splice)
            let newType = { ...state.tagCategories[index] };
            if (isFilterNotNewItem) {
                newType.showInFilters = payload.wasSelected;
            } else {
                newType.showInNewItem = payload.wasSelected;
            }
            state.tagCategories.splice(index, 1, newType);

            console.log("index: " + index + " newType: " + JSON.stringify(newType, null, 2));


            //unSelect all tags for all base-types. criteria:
            // - selected in correct list (filter or newItem)
            // - only of types ["Type-Passive", "Type-Active","Type-Active-Or-Passive", "Type-Non-Processor"]
            //if (payload.wasSelected) {
            let tagsToUnSelect = rootGetters[`tag/tags`]
                .filter(x => ((isFilterNotNewItem && x.selectedInFilter) || (!isFilterNotNewItem && x.selectedInNewItem)))
                .filter(y => state.BaseTypeOptions.indexOf(y.type) !== -1)

            console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
            if (tagsToUnSelect.length > 0) {
                dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
            }
            //}
        },

        predefinedFilters({ state, getters, rootGetters, dispatch }, payload) {
            let tagsToSelect = [{ id: 5, type: "Material", name: "Limestone" }];
            dispatch("tag/selectList", tagsToSelect, { root: true });
    },

        tagReset(state) {
        },
    }
}