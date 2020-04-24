export default {
    namespaced: true,
    state: {
        //array of all possible tags per item(locus, stone, pottery...)
        allTags: null,

        //tags for the currently shown item.
        itemTags: null,

        filters: [],
        newTags: [],

        //since thru current use of laravel-tags we can't control order of tabs,
        //we store it here.
        categories: null,
    },

    getters: {
        //not used, just an example of passing params to a getter.
        tagsFiltered: (state) => (type) => {
            return state.tags.filter(x => {
                return (x.type == type);
            });
        },

        tags(state, getters, rootState, rootGetters) {
            if(!state.allTags) { return []}
            //used by both collection filter, and TagsNew components
            if (rootGetters["mgr/status"].action == "filter") {
                return state.allTags.map(tag => {
                    let newTag = { ...tag };
                    newTag.selected = (state.filters.map(x => x.id).indexOf(tag.id) !== -1);
                    return newTag;
                })
            }
        },

        filters(state) {
            return state.filters;
        },

        newTags(state) {
            return state.newTags;
        },

        itemTags(state) {
            return state.itemTags;
        },

        categories(state) {
            return state.categories;
        },

        ready(state) {
            return !!state.allTags;
        },
    },

    mutations: {

        allTags(state, payload) {
            state.allTags = payload;
            //state.filters.push({"id":6,"type":"Material","name":"Chalk","selected":false});
        },

        setOrderedCategories(state, payload) {
            state.categories = payload;
        },


        toggleFilter(state, payload) {
            console.log("tag/toggle() index: " + payload.index + " tag: " + JSON.stringify(payload.tag, null, 2));
            if (payload.action === "add") {
                state.filters.push(payload.tag);
            } else {
                state.filters.splice(payload.index, 1);
            }
        },
   
        itemTags(state, payload) {
            state.itemTags = payload;
        },
      
        clear(state) {
            state.allTags = null;
            state.itemTags = null;
        },
    },

    actions: {
        
        prepareFilter({ commit }, payload) {
            commit("allTags", payload);
        },

        toggleTag({ state, getters, rootGetters, commit }, tag) {
            let listName = rootGetters["mgr/status"].isFilter ? "filter" : "newTags";
            let index = state.filters.map(x => x.id).indexOf(tag.id);

            commit("toggleFilter", {
                listName: listName,
                index: index,
                tag: tag,
                action: index == -1 ? "add" : "remove",
            });
        },
    },


}