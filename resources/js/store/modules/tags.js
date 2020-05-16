export default {
    namespaced: true,
    state: {
        //array of all possible tags per item(locus, stone, pottery...)
        allTags: [],

        //tags for the currently shown item, newItem, and filters.
        filters: [],
        itemTags: [],
        newTags: [],
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
            //add selected field according to the app's "action" status
            return state.allTags.map(x => {
                let tag = { ...x };
                tag.selectedInFilter = (state.filters.map(x => x.id).indexOf(tag.id) !== -1);
                tag.selectedInItem = (state.itemTags.map(x => x.id).indexOf(tag.id) !== -1);
                tag.selectedInNewItem = (state.newTags.map(x => x.id).indexOf(tag.id) !== -1);
                return tag;
            })
        },

        tagsByType(state, getters, rootState, rootGetters) {
            //console.log("tagSByType() tagsSource: " + JSON.stringify(tagsSource, null, 2));
            let tagsByType = rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagCategories`]
                .map(x => {
                    let newType = {
                        ...x, filters: { ...x },
                        itemTags: { ...x },
                        newTags: { ...x }
                    };

                    newType.filters.tags = state.filters
                        .filter(y => (x.type == y.type))
                        .map(y => { return { id: y.id, name: y.name } });
                    newType.filters.noSelected = newType.filters.tags.length;

                    newType.itemTags.tags = state.itemTags
                        .filter(y => (x.type == y.type))
                        .map(y => { return { id: y.id, name: y.name } });
                    newType.itemTags.noSelected = newType.itemTags.tags.length;

                    newType.newTags.tags = state.newTags
                        .filter(y => (x.type == y.type))
                        .map(y => { return { id: y.id, name: y.name } });
                    newType.newTags.noSelected = newType.newTags.tags.length;

                    return newType;
                });
            return tagsByType;
        },

        activeFilterTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.filters.noSelected > 0).map(x => { return { type: x.type, tags: x.filters.tags } });
        },

        activeItemTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.itemTags.noSelected > 0).map(x => { return { type: x.type, tags: x.itemTags.tags } });
        },

        activeNewItemTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.newTags.noSelected > 0).map(x => { return { type: x.type, tags: x.newTags.tags } });
        },

        totalNoSelected(state, getters, rootState, rootGetters) {
            return {
                filters: state.filters.length,
                itemTags: state.itemTags.length,
                newTags: state.newTags.length,
            };
        },

        tagsReady(state) {
            return (state.allTags.length !== 0);
        },
    },

    mutations: {

        allTags(state, payload) {
            state.allTags = payload;
        },

        toggleTag(state, payload) {
            console.log("tag/toggle()  tag: " + JSON.stringify(payload.tag, null, 2));
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

        clearAllButMe(state, payload) {

        },

        itemTags(state, payload) {
            state.itemTags = payload;
        },

        //used by welcome page to set some predefined filters
        filters(state, payload) {
            state.filters = payload;
        },
        
        //for updating item tags
        copyCurrentToNew(state) {
            if (state.itemTags) {
                state.newTags = [...state.itemTags]
            } else {
                state.newTags = [];
            }
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
            console.log("tag/prepareFilter()");
            commit("allTags", payload);
            //commit("clearFilterSelections");
            //commit("clearNewTagSelections");
        },

        toggleTag({ state, getters, rootGetters, commit }, payload) {
            let listName, index;
            if (payload.listName == "filters") {
                index = state.filters.map(x => x.id).indexOf(payload.tag.id);
                listName = "filter";
            } else {
                index = state.newTags.map(x => x.id).indexOf(payload.tag.id);
                listName = "newTag";
            }

            commit("toggleTag", {
                listName: listName,
                index: index,
                tag: payload.tag,
                action: index == -1 ? "add" : "remove",
            });
        },

        prepare({ getters, rootGetters, commit }, payload) {
            console.log("tags prepare()");
            if (rootGetters["mgr/status"].isCreate) {
                commit("clearNewTagSelections");
            } else {
                commit("copyCurrentToNew");
            }
        },
    },


}