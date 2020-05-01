export default {
    namespaced: true,
    state: {
        //array of all possible tags per item(locus, stone, pottery...)
        allTags: [],

        //tags for the currently shown item.
        itemTags: null,

        filters: [],
        newTags: [],

        //since thru current use of laravel-tags we can't control order of tabs,
        //we store it here.
        categories: [],
    },

    getters: {

        /*
        //not used, just an example of passing params to a getter.
        tagsFiltered: (state) => (type) => {
            return state.tags.filters(x => {
                return (x.type == type);
            });
        },
        */
        tags(state, getters, rootState, rootGetters) {
            if (state.allTags.length == 0) { return [] }
            //used by both filter, and Taggger components

            return state.allTags.map(tag => {
                let newTag = { ...tag };
                newTag.selected = rootGetters["mgr/status"].isFilter ?
                    (state.filters.map(x => x.id).indexOf(tag.id) !== -1)
                    : (state.newTags.map(x => x.id).indexOf(tag.id) !== -1);
                return newTag;
            })
        },

        tagsByType(state, getters, rootState, rootGetters) {
            let tagsSource = null;
            switch (rootGetters["mgr/status"].action) {
                case "filter":
                    tagsSource = state.filters;
                    break;

                case "show":
                    tagsSource = state.itemTags;
                    break;

                case "create":
                case "update":
                    tagsSource = state.newTags;
                    break;

                default:
                    tagsSource = [];
            }
            /*
            if (rootGetters["mgr/status"].isFilter) {
                tagsSource = state.filters;
            } else if (rootGetters["mgr/status"].isShow) {
                tagsSource = state.itemTags;
            } else if (rootGetters["mgr/status"].isUpdate || rootGetters["mgr/status"].isCreate) {
                tagsSource = state.newTags;
            } else {
                return [];
            }
            */

            let tagsByType = state.categories
                .map(x => {
                    let tags = [];
                    if (tagsSource.some(y => y.type === x)) {
                        tags = tagsSource
                            .filter(y => (x == y.type))
                            .map(y => { return { id: y.id, name: y.name } });
                    }
                    return {
                        type: x,
                        tags: tags
                    }
                });

            return tagsByType;
        },

        activeTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.tags.length > 0);
        },
        noSelected(state, getters, rootState, rootGetters) {
            let tagsSource = null;
            switch (rootGetters["mgr/status"].action) {
                case "filter":
                    tagsSource = state.filters;
                    break;

                case "show":
                    tagsSource = state.itemTags;
                    break;

                case "create":
                case "update":
                    tagsSource = state.newTags;
                    break;

                default:
                    tagsSource = [];
            }
            return tagsSource.length;
        },

        itemTags(state) {
            return state.itemTags;
        },

        categories(state) {
            return state.categories;
        },

        tagsReady(state) {
            return (state.allTags.length !== 0);
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
            //console.log("tag/toggle() index: " + payload.index + " tag: " + JSON.stringify(payload.tag, null, 2));
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
        filters(state, payload) {
            state.filters = payload;
        },

        clear(state) {
            state.allTags = [];
            state.itemTags = [];
            state.filters = [];
        },
        clearFilterSelections(state) {
            state.filters = [];
        },
        clearNewTagSelections(state) {
            state.newTags = [];
        },
    },

    actions: {

        prepareFilter({ commit }, payload) {
            commit("allTags", payload);
            //commit("clearFilterSelections");
            //commit("clearNewTagSelections");
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
        prepare({ getters, rootGetters, commit }, payload) {
            console.log("tags prepare()");
            if (rootGetters["mgr/status"].isCreate) {
                commit("clearNewTagSelections");
            } else {
                commit("newTags", getters["itemTags"]);
            }
        },
    },


}