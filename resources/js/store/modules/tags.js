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
            return state.allTags.map(tag => {
                let newTag = { ...tag };          
                newTag.selected = (rootGetters["mgr/status"].isFilter || rootGetters["mgr/status"].isWelcome) ?
                    (state.filters.map(x => x.id).indexOf(tag.id) !== -1)
                    : (state.newTags.map(x => x.id).indexOf(tag.id) !== -1);
                   
                return newTag;
            })
        },

        tagsByType(state, getters, rootState, rootGetters) {
            let tagsSource = null;
            switch (rootGetters["mgr/status"].action) {
                case "filter":
                case "welcome":
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

            //console.log("tagSByType() tagsSource: " + JSON.stringify(tagsSource, null, 2));


            let tagsByType = rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagCategories`]
                .map(x => {
                    let tags = [];
                    let newType = { ...x };
                    if (tagsSource.some(y => y.type === x.type)) {
                        tags = tagsSource
                            .filter(y => (x.type == y.type))
                            .map(y => { return { id: y.id, name: y.name } });
                    }

                    newType.tags = tags;
                    newType.noSelected = tags.length;
                    return newType;
                });
            return tagsByType;
        },

        activeTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.noSelected > 0);
        },
       
        totalNoSelected(state, getters, rootState, rootGetters) {
            return getters["activeTagsByType"].reduce( function(a, b){
                return a + b["noSelected"];
            }, 0);
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

        itemTags(state, payload) {
            state.itemTags = payload;
        },

        //newTags(state, payload) {
        //    state.newTags = payload;
        //},

        //used by welcome page to set some predefined filters
        filters(state, payload) {
            state.filters = payload;
        },
        copyCurrentToNew(state) {
            state.newTags = [...state.itemTags]
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

        toggleTag({ state, getters, rootGetters, commit }, tag) {
            let listName, index;
            if (rootGetters["mgr/status"].isFilter || rootGetters["mgr/status"].isWelcome) {
                index = state.filters.map(x => x.id).indexOf(tag.id);
                listName = "filter";
            } else {
                index = state.newTags.map(x => x.id).indexOf(tag.id);
                listName = "newTag";
            }

            commit("toggleTag", {
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
                commit("copyCurrentToNew");
            }
        },
    },


}