

export default {
    defaultTagCategories() {
        return [
            { type: "Base-Type", mandatory: true, multiple: false, header: "base type", showInFilters: true, showInNewTags: true },
            { type: "Type-Passive", mandatory: true, multiple: false, header: "T:Passive", showInFilters: false, showInNewTags: false },
            { type: "Type-Active", mandatory: true, multiple: false, header: "T:Active", showInFilters: false, showInNewTags: false },
            { type: "Type-Active-Or-Passive", mandatory: true, multiple: false, header: "T:Act/pass", showInFilters: false, showInNewTags: false },
            { type: "Type-Non-Processor", mandatory: true, multiple: false, header: "T:non-processor", showInFilters: false, showInNewTags: false },
            { type: "Material", mandatory: true, multiple: false, header: "material", showInFilters: true, showInNewTags: true },
            { type: "Preservation", mandatory: true, multiple: false, header: "preservation", showInFilters: true, showInNewTags: true },
            { type: "Source", mandatory: false, multiple: false, header: "source", showInFilters: true, showInNewTags: true },
            { type: "Life-Stage", mandatory: true, multiple: true, header: "life stage", showInFilters: true, showInNewTags: true },
            { type: "Morphology", mandatory: false, multiple: true, header: "morphology", showInFilters: true, showInNewTags: true },
            { type: "Profile", mandatory: false, multiple: true, header: "profile", showInFilters: true, showInNewTags: true },
            { type: "Production", mandatory: false, multiple: true, header: "production", showInFilters: true, showInNewTags: true },
            { type: "Use-Wear", mandatory: false, multiple: true, header: "use wear", showInFilters: true, showInNewTags: true },
        ];
    },
    baseTypeChanged: function (state, getters, rootGetters, payload) {
        console.log("stoneTags.baseTypeChanged() newBase: " + payload.tag.name);
        //console.log("tagCategories: " + JSON.stringify(state.tagCategories, null, 2));
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
            newType.showInNewTags = payload.wasSelected;
        }       
        state.tagCategories.splice(index, 1, newType);
        console.log("index: " + index + " newType: " + JSON.stringify(newType, null, 2));
        

        //unSelect all tags for all base-types
        let currentSelectedTypes =  rootGetters[`tag/${isFilterNotNewItem ? "typesWithTagsFiltersActive" : "typesWithTagsNewItemActive"}`]
        let tagsToUnSelect = [];
        currentSelectedTypes.forEach(type => {
            type.tags.forEach(tag => { 
                tagsToUnSelect.push(tag);
            })            
        });
        console.log("Unselect list: " + JSON.stringify(tagsToUnSelect, null, 2));
        //dispatch("tag/unSelectList", tagsToUnSelect, { root: true });
        
        




        
    },

    tagToggled(state, getters, rootState, rootGetters, commit, payload) {
        console.log("stoneTags.tagToggled() payload: " + JSON.stringify(payload, null, 2));
        switch (payload.tag.type) {
            case "Base-Type":
                this.baseTypeChanged(state, getters, rootGetters, payload);
                break;

            default:

        }
    },


    tagReset(state) {

    },
}