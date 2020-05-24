

export default {
    defaultTagCategories() {
        return [
            { type: "Base-Type", mandatory: true, multiple: false, header: "base type", show: true },
            { type: "Type-Passive", mandatory: true, multiple: false, header: "type", show: true },
            { type: "Type-Active", mandatory: true, multiple: false, header: "type", show: false },
            { type: "Type-Active-Or-Passive", mandatory: true, multiple: false, header: "type", show: false },
            { type: "Type-Non-Processor", mandatory: true, multiple: false, header: "type", show: false },
            { type: "Material", mandatory: true, multiple: false, header: "material", show: true },
            { type: "Preservation", mandatory: true, multiple: false, header: "preservation", show: true },
            { type: "Source", mandatory: false, multiple: false, header: "source", show: true },
            { type: "Life-Stage", mandatory: true, multiple: true, header: "life stage", show: true },
            { type: "Morphology", mandatory: false, multiple: true, header: "morphology", show: true },
            { type: "Profile", mandatory: false, multiple: true, header: "profile", show: true },
            { type: "Production", mandatory: false, multiple: true, header: "production", show: true },
            { type: "Use-Wear", mandatory: false, multiple: true, header: "use wear", show: true },
        ];
    },
    
    tagToggled(state, getters, rootState, rootGetters, commit , payload) {     
        console.log("stoneTags.tagToggled() payload: " + JSON.stringify(payload, null, 2));
    },
    tagReset(state) {

    },
}