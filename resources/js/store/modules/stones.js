export default {
    namespaced: true,

    state: {
        staticData: {
            predefinedFilters: {
                perforated: [{type: "Stone:Morphology", tags: ["Perforation",]}],
                limestone: [{type: "Stone:Material", tags: ["Limestone",]},],
            }
        },

        newItem: {
            id: null,
            description: null,
            notes: null,
            weight: null,
            length: null,
            width: null,
            depth: null,
            thickness_min: null,
            thickness_max: null,
            perforation_diameter_min: null,
            perforation_diameter_max: null,
            perforation_depth: null,
            diameter: null,
            rim_diameter: null,
            rim_thickness: null,
            base_diameter: null,
            base_thickness: null,
        },
    },

    getters: {
        predefinedFilters(state) {
            return state.staticData.predefinedFilters;
        },
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
        },

        base_type_id(state, payload) {
            state.newItem.base_type_id = payload;
        },

        material_id(state, payload) {
            state.newItem.material_id = payload;
        },

        preservation_id(state, payload) {
            state.newItem.preservation_id = payload;
        },
        weight(state, payload) {
            state.newItem.weight = payload;
        },
        width(state, payload) {
            state.newItem.width = payload;
        },
        length(state, payload) {
            state.newItem.length = payload;
        },
        depth(state, payload) {
            state.newItem.depth = payload;
        },
        thickness_min(state, payload) {
            state.newItem.thickness_min = payload;
        },
        thickness_max(state, payload) {
            state.newItem.thickness_max = payload;
        },
        perforation_diameter_min(state, payload) {
            state.newItem.perforation_diameter_min = payload;
        },
        perforation_diameter_max(state, payload) {
            state.newItem.perforation_diameter_max = payload;
        },
        perforation_depth(state, payload) {
            state.newItem.perforation_depth = payload;
        },
        diameter(state, payload) {
            state.newItem.diameter = payload;
        },
        rim_diameter(state, payload) {
            state.newItem.rim_diameter = payload;
        },
        rim_thickness(state, payload) {
            state.newItem.rim_thickness = payload;
        },
        base_diameter(state, payload) {
            state.newItem.base_diameter = payload;
        },
        base_thickness(state, payload) {
            state.newItem.base_thickness = payload;
        },
        description(state, payload) {
            state.newItem.description = payload;
        },
        notes(state, payload) {
            state.newItem.notes = payload;
        },

        clear(state) {
            console.log("stone.clear");
            state.newItem = null;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let toCopy = payload;
            let current = rootGetters["mgr/item"];
            commit("id", toCopy ? current.id : null);
            commit("base_type_id", toCopy ? current.base_type_id : null);
            commit("material_id", toCopy ? current.material_id : null);
            commit("preservation_id", toCopy ? current.preservation_id : null);

            commit("description", toCopy ? current.description : null);
            commit("notes", toCopy ? current.notes : null);
            commit("weight", toCopy ? current.weight : null);
            commit("length", toCopy ? current.length : null);
            commit("width", toCopy ? current.width : null);
            commit("depth", toCopy ? current.depth : null);
            commit("thickness_min", toCopy ? current.thickness_min : null);
            commit("thickness_max", toCopy ? current.thickness_max : null);
            commit("perforation_diameter_min", toCopy ? current.perforation_diameter_min : null);
            commit("perforation_diameter_max", toCopy ? current.perforation_diameter_max : null);
            commit("perforation_depth", toCopy ? current.perforation_depth : null);
            commit("diameter", toCopy ? current.diameter : null);
            commit("rim_diameter", toCopy ? current.rim_diameter : null);
            commit("rim_thickness", toCopy ? current.rim_thickness : null);
            commit("base_diameter", toCopy ? current.base_diameter : null);
            commit("base_thickness", toCopy ? current.base_thickness : null);
        },
    }
}