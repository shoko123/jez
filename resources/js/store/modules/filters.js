export default {
    namespaced: true,
    state: {
        globalTags: [
            { id: 1002, name: "drawing", type: "Media" },
            { id: 1003, name: "photo", type: "Media" },
            { id: 1004, name: "plan", type: "Media" },
            { id: 1005, name: "2012", type: "Seasons" },
            { id: 1006, name: "2013", type: "Seasons" },
            { id: 1007, name: "2014", type: "Seasons" },
            { id: 1008, name: "2015", type: "Seasons" },
            { id: 1009, name: "2016", type: "Seasons" },
            { id: 1010, name: "2017", type: "Seasons" },
            { id: 1011, name: "2018", type: "Seasons" },
            { id: 1012, name: "K", type: "Areas" },
            { id: 1013, name: "L", type: "Areas" },
            { id: 1014, name: "M", type: "Areas" },
            { id: 1015, name: "N", type: "Areas" },
            { id: 1016, name: "P", type: "Areas" },
            { id: 1017, name: "Q", type: "Areas" },
            { id: 1018, name: "S", type: "Areas" },
        ],
        globalTypes: [
            { type: "Media", mandatory: false, multiple: false, header: "Media", showInFilters: true, showInNewItem: false },
            { type: "Areas", mandatory: false, multiple: true, header: "Areas", showInFilters: true, showInNewItem: false },
            { type: "Seasons", mandatory: false, multiple: true, header: "Seasons", showInFilters: true, showInNewItem: false },],

        categories: [],
    },

    getters: {
       
        filtersByType(state, getters, rootState, rootGetters) {
            //currently only tag filters
            return rootGetters["tag/filterTagsByType"];
        },


        queryParams(state, getters, rootState, rootGetters) {
            //console.log(`queryParams typeSeasons: ${JSON.stringify(typeSeasons, null, 2)} typeMedia: ${JSON.stringify(typeMedia, null, 2)}`);
            return {
                tagParams: getters["filtersByType"].filter(x => x.type.includes(rootGetters["mgr/status"].itemName)),
                areas: [],//typeAreas.filters.tags.map(x => x.name),
                seasons: [],//typeSeasons.filters.tags.map(x => parseInt(x.name, 10) - 2000),
                media: [],//typeMedia.filters.tags.map(x => x.name),
            }
        },
    },

    mutations: {

    },

    actions: {
        xxx({ state, getters, rootGetters, commit }, payload) {
        },
    },


}