

export default {
    filterOrderedCategories() {
        return [
            "Typology",
            "Function",
            "Material",
            "Source",
            "Preservation",
            "Life-stage",
            "Morphology",
            "Profile",
            "Production",
            "Use-Wear",
        ];
    },

    stoneCategories(state) {
        return [
            { type: "Typology", mandatory: true, multiple: false },
            { type: "Function", mandatory: true, multiple: true },
            { type: "Material", mandatory: true, multiple: false },
            { type: "Preservation", mandatory: true, multiple: false },
            { type: "Source", mandatory: false, multiple: false },
            { type: "Life-stage", mandatory: true, multiple: false },
            { type: "Morphology", mandatory: true, multiple: false },
            { type: "Profile", mandatory: false, multiple: false },
            { type: "Production", mandatory: false, multiple: true },
            { type: "Use-Wear", mandatory: false, multiple: true },
        ];
    },
    tagCategories(state, getters, rootState, rootGetters) {
        if(rootGetters["mgr/status"].isFilter || rootGetters["mgr/status"].isShow) {
            return this.stoneCategories().map(x => {return {type: x.type}});
        } else if(rootGetters["mgr/status"].isCreate || rootGetters["mgr/status"].isUpdate) {
            return this.stoneCategories();
        }
        return [];
    }

}