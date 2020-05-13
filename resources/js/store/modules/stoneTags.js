

export default {
    stoneCategories(state) {
        return [
            { type: "Typology", mandatory: true, multiple: false },
            { type: "Function", mandatory: true, multiple: true },
            { type: "Material", mandatory: true, multiple: false },
            { type: "Preservation", mandatory: true, multiple: false },
            { type: "Source", mandatory: false, multiple: false },
            { type: "Life-Stage", mandatory: true, multiple: true },
            { type: "Morphology", mandatory: false, multiple: true },
            { type: "Profile", mandatory: false, multiple: true },
            { type: "Production", mandatory: false, multiple: true },
            { type: "Use-Wear", mandatory: false, multiple: true },
        ];
    },
    tagCategories(state, getters, rootState, rootGetters) {
        return (rootGetters["mgr/status"].isCreate || rootGetters["mgr/status"].isUpdate)
         ? this.stoneCategories() : this.stoneCategories().map(x => {return {type: x.type}});
    }

}