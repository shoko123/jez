

export default {
    namespaced: false,
    state: {

        defaultTagCategories: [
            { type: "Stone:Base-Type", mandatory: false, multiple: false, header: "base type", displayHeader: "BASE-TYPE", showInFilters: true, showInNewItem: true },
            { type: "Stone:Type-Passive", mandatory: true, multiple: true, header: "T:Passive", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Stone:Type-Active", mandatory: true, multiple: true, header: "T:Active", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Stone:Type-Active-Or-Passive", mandatory: true, multiple: false, header: "T:Act/pass", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Stone:Type-Vessel", mandatory: true, multiple: true, header: "T:Vessel", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },
            { type: "Stone:Type-Non-Processor", mandatory: true, multiple: true, header: "T:non-processor", displayHeader: "TYPE", showInFilters: false, showInNewItem: false },

            { type: "Stone:Vessel-Rim", mandatory: false, multiple: false, header: "Rim", displayHeader: "Rim", showInFilters: false, showInNewItem: false },
            { type: "Stone:Vessel-Wall", mandatory: false, multiple: true, header: "Wall", displayHeader: "Wall", showInFilters: false, showInNewItem: false },
            { type: "Stone:Vessel-Base", mandatory: false, multiple: false, header: "Base", displayHeader: "Base", showInFilters: false, showInNewItem: false },

            { type: "Stone:Material", mandatory: true, multiple: false, header: "material", displayHeader: "MATERIAL", showInFilters: true, showInNewItem: true },

            { type: "Stone:Preservation", mandatory: true, multiple: false, header: "preservation", displayHeader: "PRESERVATION", showInFilters: true, showInNewItem: true },
            { type: "Stone:Life-Stage", mandatory: false, multiple: true, header: "life stage", displayHeader: "LIFE STAGE", showInFilters: true, showInNewItem: true },
            { type: "Stone:Morphology", mandatory: false, multiple: true, header: "morphology", displayHeader: "MORPHOLOGY", showInFilters: true, showInNewItem: true },
            { type: "Stone:Profile", mandatory: false, multiple: true, header: "profile", displayHeader: "PROFILE", showInFilters: false, showInNewItem: false },
            { type: "Stone:Production", mandatory: false, multiple: true, header: "production", displayHeader: "PRODUCTION", showInFilters: true, showInNewItem: true },
            { type: "Stone:Use-Wear", mandatory: false, multiple: true, header: "use wear", displayHeader: "USE WEAR", showInFilters: true, showInNewItem: true },
        ],
        predefinedFilters: [{ name: "limestone", tags: [{ id: 5, type: "Stone:Material", name: "Limestone" }] }, { name: "flint", tags: [{ id: 7, type: "Stone:Material", name: "Flint or Chert" }] }],
        BaseTypeOptions: ["Type-Passive", "Type-Active", "Type-Active-Or-Passive", "Type-Non-Processor"],
        tagCategories: [],
    },


    getters: {
        tagCategories(state) {
            return state.tagCategories;
        },

        tagTypes(state) {
            return state.defaultTagCategories;
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
            //console.log("stoneTags.tagToggled()");

            //console.log("stoneTags.tagToggled() payload: " + JSON.stringify(payload, null, 2));
           


            switch (payload.tag.type) {
                case "Stone:Base-Type":
                    dispatch("baseTypeChanged", payload);
                    break;

                default:

            }
        },

        baseTypeChanged({ state, getters, rootGetters, dispatch }, payload) {
            let toggledTypeName;

            //get new type name
            switch (payload.tag.name) {
                case "Passive":
                    toggledTypeName = "Stone:Type-Passive";
                    break;
                case "Active (handheld)":
                    toggledTypeName = "Stone:Type-Active";
                    break;
                case "Active or Passive":
                    toggledTypeName = "Stone:Type-Active-Or-Passive";
                    break;
                case "Vessel":
                    toggledTypeName = "Stone:Type-Vessel";
                    break;
                case "Non-Processor":
                    toggledTypeName = "Stone:Type-Non-Processor";
                    break;
            }
            payload.toggledTypeName = toggledTypeName;

            dispatch("manageProfileType", payload);
            //console.log("toggledTypeName: " + toggledTypeName);
            
            if(toggledTypeName === "Stone:Type-Active-Or-Passive"  && !rootGetters["mgr/status"].isFilter) {
                //set default tag to Fragment
                dispatch("managePreservationType", payload);
            }
            
            if (toggledTypeName === "Stone:Type-Vessel") {
                dispatch("baseTypeVesselToggled", payload);
            } else {
                dispatch("baseTypeNonVesselToggled", payload);
            }
        },

        baseTypeVesselToggled({ state, commit, rootGetters, dispatch }, payload) {
            console.log("baseTypeVesselChanged() payload with toggledTypeName: " + JSON.stringify(payload, null, 2));

            //show/hide tabs related to this tag's type
            let tabs = ["Stone:Vessel-Rim", "Stone:Vessel-Wall", "Stone:Vessel-Base"];

            tabs.forEach(type => {
                let origType = state.defaultTagCategories.find(x => x.type  === type);
                let newType = { ...origType };

                if (payload.isFilterNotNewItem) {
                    newType.showInFilters = payload.actionIsSelect;
                } else {
                    newType.showInNewItem = payload.actionIsSelect;
                }
                commit("tag/modifyType", newType,  { root: true });
            });

            //if action is unselect we need to unselect all the tags r/t this base-type 
            if (!payload.actionIsSelect) {
                let tagsToUnSelect = rootGetters[`tag/tags`]
                    .filter(x => ((payload.isFilterNotNewItem && x.selectedInFilter) || (!payload.isFilterNotNewItem && x.selectedInNewItem)))
                    .filter(y => (y.type === "Stone:Vessel-Rim" || y.type === "Stone:Vessel-Wall" || y.type === "Stone:Vessel-Base"));
                console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
                tagsToUnSelect.forEach(tag => {
                    let tagToUnselectRequest = {
                        tag: tag,
                        isFilterNotNewItem: false,
                        actionIsSelect: false,
                        isModuleTag: true,
                    };
                    commit("tag/modifyTag", tagToUnselectRequest,  { root: true });                    
                })
            }
        },

        baseTypeNonVesselToggled({ state, commit, rootGetters }, payload) {
            //console.log("baseTypeNonVesselChanged() payload: " + JSON.stringify(payload, null, 2));
            
            //show/hide tabs related to this tag's type
            let origType = state.defaultTagCategories.find(x => x.type  === payload.toggledTypeName);
            let newType = { ...origType };
            //console.log("newType: " + JSON.stringify(newType, null, 2));
            if (payload.isFilterNotNewItem) {
                newType.showInFilters = payload.actionIsSelect;
            } else {
                newType.showInNewItem = payload.actionIsSelect;
            }
            //console.log("newType: " + JSON.stringify(newType, null, 2));
            commit("tag/modifyType", newType,  { root: true });

             //if action is unselect we need to unselect all the tags r/t this base-type 
             if (!payload.actionIsSelect) {
                let tagsToUnSelect = rootGetters[`tag/tags`]
                    .filter(x => ((payload.isFilterNotNewItem && x.selectedInFilter) || (!payload.isFilterNotNewItem && x.selectedInNewItem)))
                    .filter(y => y.type === payload.toggledTypeName);
                console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));

                tagsToUnSelect.forEach(tag => {
                    let tagToUnselectRequest = {
                        tag: tag,
                        isFilterNotNewItem: false,
                        actionIsSelect: false,
                        isModuleTag: true,
                    };
                    commit("tag/modifyTag", tagToUnselectRequest,  { root: true });                    
                })
            }
        },
        manageProfileType({ state, getters, rootGetters, dispatch }, payload) {
            return;
            //console.log("manageProfileType");
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let show;
            switch (payload.toggledTypeName) {
                case "Stone:Type-Passive":
                case "Stone:Type-Active":
                case "Stone:Type-Active-Or-Passive":
                    show = true;
                    break;
                case "Stone:Type-Vessel":
                case "Stone:Type-Non-Processor":
                    show = false;
                    break;
            }

            //show/hide this type as a tab in the appropriate table(filters or bewTags - make reactive by using splice)
            let index = state.tagCategories.map(x => x.type).indexOf("Stone:Profile");
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
                    .filter(y => y.type === "Stone:Profile");
                //console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
                if (tagsToUnSelect.length > 0) {
                    dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
                }
            }
        },

        managePreservationType({ state, getters, rootGetters, dispatch }, payload) {    
            return;     
            let tag = rootGetters[`tag/tags`].find(y => y.type === "Preservation" && y.name === "Fragment");
            console.log("managePreservationType() tag: " + JSON.stringify(tag, null, 2));
            if (payload.wasSelected) {
                dispatch("tag/select", tag, { root: true });
            }else {
                dispatch("tag/unSelect", tag, { root: true });
            }           
        },

        predefinedFilters({ commit }, payload) {
            let tagsToSelect = [{ id: 5, type: "Stone:Material", name: "Limestone" }];
            tagsToSelect.forEach(tag => {
                let tagToSelectRequest = {
                    tag: tag,
                    isFilterNotNewItem: true,
                    actionIsSelect: true,
                };
                commit("tag/modifyTag", tagToSelectRequest,  { root: true });                    
            });
            //dispatch("tag/selectList", tagsToSelect, { root: true });
        },

        tagReset(state) {
        },
    }
}