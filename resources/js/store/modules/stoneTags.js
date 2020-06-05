

export default {
    namespaced: false,
    state: {

        defaultTagCategories: [
            { type: "Base-Type", mandatory: true, multiple: false, header: "base type", displayHeader: "BASE-TYPE", showInFilters: true, showInNewItem: true },
            { type: "Type-Passive", mandatory: true, multiple: true, header: "T:Passive", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Type-Active", mandatory: true, multiple: true, header: "T:Active", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Type-Active-Or-Passive", mandatory: true, multiple: false, header: "T:Act/pass", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Type-Vessel", mandatory: true, multiple: true, header: "T:Vessel", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Type-Non-Processor", mandatory: true, multiple: true, header: "T:non-processor", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },

            { type: "Vessel-Rim", mandatory: false, multiple: true, header: "Rim", displayHeader: "Rim", showInFilters: false, showInNewItem: false },
            { type: "Vessel-Wall", mandatory: false, multiple: true, header: "Wall", displayHeader: "Wall", showInFilters: false, showInNewItem: false },
            { type: "Vessel-Base", mandatory: false, multiple: true, header: "Base", displayHeader: "Base", showInFilters: false, showInNewItem: false },

            { type: "Material", mandatory: true, multiple: false, header: "material", displayHeader: "MATERIAL", showInFilters: true, showInNewItem: true },

            { type: "Preservation", mandatory: true, multiple: false, header: "preservation", displayHeader: "PRESERVATION", showInFilters: true, showInNewItem: true },
            { type: "Life-Stage", mandatory: true, multiple: true, header: "life stage", displayHeader: "LIFE STAGE", showInFilters: true, showInNewItem: true },
            { type: "Morphology", mandatory: false, multiple: true, header: "morphology", displayHeader: "MORPHOLOGY", showInFilters: true, showInNewItem: true },
            { type: "Profile", mandatory: false, multiple: true, header: "profile", displayHeader: "PROFILE", showInFilters: false, showInNewItem: false },
            { type: "Production", mandatory: false, multiple: true, header: "production", displayHeader: "PRODUCTION", showInFilters: true, showInNewItem: true },
            { type: "Use-Wear", mandatory: false, multiple: true, header: "use wear", displayHeader: "USE WEAR", showInFilters: true, showInNewItem: true },
        ],
        predefinedFilters: [{ name: "limestone", tags: [{ id: 5, type: "Material", name: "Limestone" }] }, { name: "flint", tags: [{ id: 7, type: "Material", name: "Flint or Chert" }] }],
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
            //console.log("stoneTags.tagToggled() payload: " + JSON.stringify(payload, null, 2));
            switch (payload.tag.type) {
                case "Base-Type":
                    dispatch("baseTypeChanged", payload);
                    break;

                default:

            }
        },

        baseTypeChanged({ state, getters, rootGetters, dispatch }, payload) {
            //console.log("stoneTags.baseTypeChanged() base-type: " + payload.tag.name + " selected: " + payload.wasSelected);
            let toggledTypeName;

            //get new type name
            switch (payload.tag.name) {
                case "Passive":
                    toggledTypeName = "Type-Passive";
                    break;
                case "Active (handheld)":
                    toggledTypeName = "Type-Active";
                    break;
                case "Active or Passive":
                    toggledTypeName = "Type-Active-Or-Passive";
                    break;
                case "Vessel":
                    toggledTypeName = "Type-Vessel";
                    break;
                case "Non-Processor":
                    toggledTypeName = "Type-Non-Processor";
                    break;
            }
            dispatch("manageProfileType", { toggledTypeName: toggledTypeName, wasSelected: payload.wasSelected });
            
            
            if(toggledTypeName === "Type-Active-Or-Passive"  && !rootGetters["mgr/status"].isFilter) {
                //set default tag to Fragment
                dispatch("managePreservationType", { wasSelected: payload.wasSelected });
            }
            
            if (toggledTypeName === "Type-Vessel") {
                dispatch("baseTypeVesselToggled", { toggledTypeName: toggledTypeName, wasSelected: payload.wasSelected });
            } else {
                dispatch("baseTypeNonVesselToggled", { toggledTypeName: toggledTypeName, wasSelected: payload.wasSelected });
            }
        },

        baseTypeVesselToggled({ state, getters, rootGetters, dispatch }, payload) {
            //console.log("baseTypeVesselToggled");
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let tabs = ["Vessel-Rim", "Vessel-Wall", "Vessel-Base"];

            tabs.forEach(type => {
                let index = state.tagCategories.map(x => x.type).indexOf(type);
                let newType = { ...state.tagCategories[index] };

                //show/hide tabs r/t vessel
                if (isFilterNotNewItem) {
                    newType.showInFilters = payload.wasSelected;
                } else {
                    newType.showInNewItem = payload.wasSelected;
                }
                state.tagCategories.splice(index, 1, newType);
            });

            if (!payload.wasSelected) {
                let tagsToUnSelect = rootGetters[`tag/tags`]
                    .filter(x => ((isFilterNotNewItem && x.selectedInFilter) || (!isFilterNotNewItem && x.selectedInNewItem)))
                    .filter(y => (y.type === "Vessel-Rim" || y.type === "Vessel-Wall" || y.type === "Vessel-Base"));
                //console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
                if (tagsToUnSelect.length > 0) {
                    dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
                }
            }
        },

        baseTypeNonVesselToggled({ state, getters, rootGetters, dispatch }, payload) {
            //console.log("BaseType NON VesselToggled");

            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;

            //show/hide this type as a tab in the appropriate table(filters or bewTags - make reactive by using splice)
            let index = state.tagCategories.map(x => x.type).indexOf(payload.toggledTypeName);
            let newType = { ...state.tagCategories[index] };

            if (isFilterNotNewItem) {
                newType.showInFilters = payload.wasSelected;
            } else {
                newType.showInNewItem = payload.wasSelected;
            }
            state.tagCategories.splice(index, 1, newType);

            //console.log("index: " + index + " newType: " + JSON.stringify(newType, null, 2));


            //Select/unSelect tags based on toggled base-type: criteria:
            // - if unSelect clear all tags for this base type.
            // - if select, select also 1 tag of the newly selected base-type
            // - make sure to use correct list (filter or newItem)
            if (payload.wasSelected) {
                if (isFilterNotNewItem) {
                    newType.showInFilters = payload.wasSelected;
                } else {
                    newType.showInNewItem = payload.wasSelected;
                }
            } else {
                //unselect
                let tagsToUnSelect = rootGetters[`tag/tags`]
                    .filter(x => ((isFilterNotNewItem && x.selectedInFilter) || (!isFilterNotNewItem && x.selectedInNewItem)))
                    .filter(y => y.type === payload.toggledTypeName);
                //console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
                if (tagsToUnSelect.length > 0) {
                    dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
                }
            }
        },
        manageProfileType({ state, getters, rootGetters, dispatch }, payload) {
            //console.log("manageProfileType");
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let show;
            switch (payload.toggledTypeName) {
                case "Type-Passive":
                case "Type-Active":
                case "Type-Active-Or-Passive":
                    show = true;
                    break;
                case "Type-Vessel":
                case "Type-Non-Processor":
                    show = false;
                    break;
            }

            //show/hide this type as a tab in the appropriate table(filters or bewTags - make reactive by using splice)
            let index = state.tagCategories.map(x => x.type).indexOf("Profile");
            let newType = { ...state.tagCategories[index] };

            if (isFilterNotNewItem) {
                newType.showInFilters = show && payload.wasSelected;
            } else {
                newType.showInNewItem = show && payload.wasSelected;
            }
            state.tagCategories.splice(index, 1, newType);

            if (!payload.wasSelected) {
                let tagsToUnSelect = rootGetters[`tag/tags`]
                    .filter(x => ((isFilterNotNewItem && x.selectedInFilter) || (!isFilterNotNewItem && x.selectedInNewItem)))
                    .filter(y => y.type === "Profile");
                //console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
                if (tagsToUnSelect.length > 0) {
                    dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
                }
            }
        },

        managePreservationType({ state, getters, rootGetters, dispatch }, payload) {         
            let tag = rootGetters[`tag/tags`].find(y => y.type === "Preservation" && y.name === "Fragment");
            console.log("managePreservationType() tag: " + JSON.stringify(tag, null, 2));
            if (payload.wasSelected) {
                dispatch("tag/select", tag, { root: true });
            }else {
                dispatch("tag/unSelect", tag, { root: true });
            }           
        },

        predefinedFilters({ state, getters, rootGetters, dispatch }, payload) {
            let tagsToSelect = [{ id: 5, type: "Material", name: "Limestone" }];
            dispatch("tag/selectList", tagsToSelect, { root: true });
        },

        tagReset(state) {
        },
    }
}