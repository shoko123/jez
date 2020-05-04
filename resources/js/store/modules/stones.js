export default {
    namespaced: true,
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
        },

        newItem: {
            id: null,
            notes: null,
            measurements: null,
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

        tagOrderedCategories: [
            "Typology",
            "Function",
            "Material",
            "Source",
            "Preservation",
            "Life-stage",
            "Morphology",
            "Profile",
            "Wear",
            "Production",
            "Use",
        ],

    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },
        newItemData(state) {
            return state.newItem;
        },

        /////New Stone fields
        weight(state) {
            return state.newItem.weight;
        },
        width(state) {
            return state.newItem.width;
        },
        length(state) {
            return state.newItem.length;
        },
        depth(state) {
            return state.newItem.depth;
        },
        thickness_min(state) {
            return state.newItem.thickness_min;
        },
        thickness_max(state) {
            return state.newItem.thickness_max;
        },
        perforation_diameter_min(state) {
            return state.newItem.perforation_diameter_min;
        },
        perforation_diameter_max(state) {
            return state.newItem.perforation_diameter_max;
        },
        perforation_depth(state) {
            return state.newItem.perforation_depth;
        },
        diameter(state) {
            return state.newItem.diameter;
        },
        rim_diameter(state) {
            return state.newItem.rim_diameter;
        },
        rim_thickness(state) {
            return state.newItem.thickness;
        },
        base_diameter(state) {
            return state.newItem.base_diameter;
        },
        base_thickness(state) {
            return state.newItem.base_thickness;
        },
        notes(state) {
            return state.newItem.notes;
        },
        measurements(state) {
            return state.newItem.measurements;
        },
    },

    mutations: {
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
        notes(state, payload) {
            state.newItem.notes = payload;
        },
        measurements(state, payload) {
            state.newItem.measurements = payload;
        },

        prepare(state, payload) {
            state.newItem = payload
        },

        clear(state) {
            console.log("stone.clear");
            state.newItem = null;
        },
    },

    actions: {
        prepare({ state, getters, rootGetters, commit, dispatch }, payload) {
            let data = {};
            if (rootGetters["mgr/status"].isUpdate) {
                data = Object.assign({}, rootGetters["mgr/item"]);
                delete data.tag;
                delete data.areaSeason;
                commit('prepare', data);
            } else if (rootGetters["mgr/status"].isCreate) {
                commit("notes", null);
                commit("measurements", null);                
                commit("weight", null);
                commit("length", null);
                commit("width", null);
                commit("depth", null);
                commit("thickness_min", null);
                commit("thickness_max", null);
                commit("perforation_diameter_min", null);
                commit("perforation_diameter_max", null);
                commit("perforation_depth", null);
                commit("diameter", null);
                commit("rim_diameter", null);
                commit("rim_thickness", null);
                commit("base_diameter", null);
                commit("base_thickness", null);

            }
        },

        prepareFilter({ state, commit }) {
            //console.log("payload: " + JSON.stringify(payload, null, 2));
            //console.log("categories: " + JSON.stringify(categories, null, 2));
            commit("tag/setOrderedCategories", state.tagOrderedCategories, { root: true });
        },
    }
}