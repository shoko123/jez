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
            if (!state.allTags) { return [] }
            //used by both filter, and Taggger components

            return state.allTags.map(tag => {
                let newTag = { ...tag };
                newTag.selected = rootGetters["mgr/status"].isFilter ?
                    (state.filters.map(x => x.id).indexOf(tag.id) !== -1)
                    : (state.newTags.map(x => x.id).indexOf(tag.id) !== -1);
                return newTag;
            })
        },

        filters(state) {
            return state.filters;
        },

        newTags(state) {
            return state.newTags;
        },

        tagsByType(state, getters, rootState, rootGetters) {
            let tags = rootGetters["mgr/status"].isFilter ? state.filters : state.newTags;

            let selectedTypes = [...new Set(tags.map(item => item.type))];
            let tagsByType = selectedTypes
                .map(x => {
                    return {
                        type: x,
                        tags: (tags
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } }))
                    }
                });
            return tagsByType;
        },

        filterByType(state, getters, rootState, rootGetters) {
            let tags = rootGetters["mgr/status"].isFilter ? state.filters : state.newTags;

            let selectedTypes = [...new Set(tags.map(item => item.type))];
            let tagsByType = selectedTypes
                .map(x => {
                    return {
                        type: x,
                        tags: (tags
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } }))
                    }
                });
            return tagsByType;
        },

        newTagsByAllTypes(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate && !rootGetters["mgr/status"].isUpdate) {
                return null;
            }

            let tagsPerType = state.categories
                .map(x => {
                    let tags = [];
                    if (state.newTags.some(y => y.type === x)) {
                        tags = state.newTags
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } });
                    } else {

                    }
                    return {
                        type: x,
                        tags: tags
                    }
                });

            return tagsPerType;
            /*
            let selectedTypes = [...new Set(state.newTags.map(item => item.type))];
            let tagsByType = selectedTypes
                .map(x => {
                    return {
                        type: x,
                        tags: (state.newTags
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } }))
                    }
                });
            let notSelectedTypes = state.categories.filter(x => !(selectedTypes.some(y => y.type === x)));
            notSelectedTypes.forEach((e) => {
                tagsByType.push({type: e, tags: []})              
              })
            return tagsByType;
            */
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
        },

        setOrderedCategories(state, payload) {
            state.categories = payload;
        },


        toggleFilter(state, payload) {
            console.log("tag/toggle() index: " + payload.index + " tag: " + JSON.stringify(payload.tag, null, 2));
            if (payload.action === "add") {
                delete payload.tag.selected;
                if (payload.listName == "filter") {
                    state.filters.push(payload.tag);
                } else {
                    state.newTags.push(payload.tag);
                }
            } else {
                if (payload.listName == "filter") {
                    state.filters.splice(payload.index, 1);
                } else {
                    state.newTags.splice(payload.index, 1);
                }
            }
        },

        itemTags(state, payload) {
            state.itemTags = payload;
        },
        newTags(state, payload) {
            state.newTags = payload;
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
            let listName, index;
            if (rootGetters["mgr/status"].isFilter) {
                index = state.filters.map(x => x.id).indexOf(tag.id);
                listName = "filter";
            } else {
                index = state.newTags.map(x => x.id).indexOf(tag.id);
                listName = "newTag";
            }

            commit("toggleFilter", {
                listName: listName,
                index: index,
                tag: tag,
                action: index == -1 ? "add" : "remove",
            });
        },
        prepare({ getters, commit }, payload) {
            console.log("tags prepare()");
            commit("newTags", getters["itemTags"]);
        },
    },


}