import stoneTags from './stoneTags.js';

export default {
    namespaced: true,

    modules: {
        stoneTags: stoneTags,
    },
    state: {
        staticData: {
            displayOptions: ["data", "gallery", "all"],
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
        moduleStaticData(state) {
            return state.staticData;
        },
        newItem(state) {
            return state.newItem;
        },
    },

    mutations: {
        id(state, payload) {
            state.newItem.id = payload;
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
            let isUpdate = rootGetters["mgr/status"].isUpdate;
            let current = rootGetters["mgr/item"];
            commit("id", isUpdate ? current.id : null);
            commit("description", isUpdate ? current.description : null);
            commit("notes", isUpdate ? current.notes : null);
            commit("weight", isUpdate ? current.weight : null);
            commit("length", isUpdate ? current.length : null);
            commit("width", isUpdate ? current.width : null);
            commit("depth", isUpdate ? current.depth : null);
            commit("thickness_min", isUpdate ? current.thickness_min : null);
            commit("thickness_max", isUpdate ? current.thickness_max : null);
            commit("perforation_diameter_min", isUpdate ? current.perforation_diameter_min : null);
            commit("perforation_diameter_max", isUpdate ? current.perforation_diameter_max : null);
            commit("perforation_depth", isUpdate ? current.perforation_depth : null);
            commit("diameter", isUpdate ? current.diameter : null);
            commit("rim_diameter", isUpdate ? current.rim_diameter : null);
            commit("rim_thickness", isUpdate ? current.rim_thickness : null);
            commit("base_diameter", isUpdate ? current.base_diameter : null);
            commit("base_thickness", isUpdate ? current.base_thickness : null);
        },


    }
}