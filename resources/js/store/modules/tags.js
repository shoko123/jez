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


        typesWithTags(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isItem) { return [] }
            //console.log("tagSByType() tagsSource: " + JSON.stringify(tagsSource, null, 2));
            let typesWithTags = rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagCategories`]
                .map(x => {
                    let newType = {
                        ...x,
                        filters: {},
                        itemTags: {},
                        newTags: {}
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
            return typesWithTags;
        },

        typesWithTagsShow(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isItem) { return [] }
            return getters["typesWithTags"].filter(x => x.show);
        },

        typesWithTagsFiltersActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.filters.noSelected > 0).map(x => { return { type: x.type, tags: x.filters.tags } });
        },
        typesWithTagsNewItemActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.newTags.noSelected > 0).map(x => { return { type: x.type, tags: x.newTags.tags } });
        },
        typesWithTagsItemTagsActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.itemTags.noSelected > 0).map(x => { return { type: x.type, header: x.header, tags: x.itemTags.tags } });
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

        selectTag(state, payload) {
            //console.log(`selectTag() payload: ${JSON.stringify(payload, null, 2)}`);
            delete payload.tag.selectedInFilter;
            delete payload.tag.selectedInItem;
            delete payload.tag.selectedInNewItem;

            if (payload.isFilterNotNewItem) {
                state.filters.push(payload.tag);
            } else {
                state.newTags.push(payload.tag);
            }
        },

        unSelectTag(state, payload) {
            //console.log(`unSelectTag() payload: ${JSON.stringify(payload, null, 2)}`);
            if (payload.isFilterNotNewItem) {
                let index = state.filters.map(x => x.id).indexOf(payload.tag.id);
                state.filters.splice(index, 1);
            } else {
                let index = state.newTags.map(x => x.id).indexOf(payload.tag.id);
                state.newTags.splice(index, 1);
            }
        },
    },

    actions: {

        prepareFilter({ commit }, payload) {
            console.log("tag/prepareFilter()");
            commit("allTags", payload);
            //commit("clearFilterSelections");
            //commit("clearNewTagSelections");
        },

        toggleTag({ state, getters, rootGetters, commit, dispatch }, payload) {
            let typeParams = rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagCategories`].find(x => x.type == payload.tag.type);
            let currentList = payload.isFilterNotNewItem ? state.filters : state.newTags;
            let isSelected = currentList.some(x => x.id == payload.tag.id);
            let noSelectedPerType = currentList.filter(x => x.type == payload.tag.type).length;
            
            //console.log(`tag/toggleTag() payload: ${JSON.stringify(payload, null, 2)} \ntypeParams: ${JSON.stringify(typeParams, null, 2)}`);
            //console.log(`\nisSelected: ${isSelected} noSelectedPerType: ${noSelectedPerType}`);
            if (payload.isFilterNotNewItem) {
                //filter
                if (isSelected) {
                    dispatch("unSelect", payload);
                } else {
                    dispatch("select", payload);
                }
            } else {
                //newItemTags
                if (noSelectedPerType !== 1) {
                    //if current number of selected tags is not 1, we can toggle safely without considering
                    //mandatory and multiple limitations on type.
                    if (isSelected) {
                        dispatch("unSelect", payload);
                    } else {
                        dispatch("select", payload)
                    }
                    return;
                }

                //executed only when number of selected tags (for tab) is 1.
                if (isSelected) {
                    //same tag
                    if (typeParams.mandatory) {
                        //if mandatory and selected tag clicked, do not toggle.
                        return;
                    } else {
                        dispatch("unSelect", payload);
                    }
                } else {
                    //this tag is currently not selected
                    if (typeParams.multiple) {
                        dispatch("select", payload);
                    } else {
                        //turn current selected->off, new->on.
                        //let tagToUnSelect = state.tags.find(x => (x.type === payload.type.type && (payload.isFilterNotNewItem ? x.selectedInFilter : x.selectedInNewItem)));
                        let tagToUnSelect = currentList.find(x => x.type === payload.tag.type);
                        dispatch("select", payload);
                        payload.tag = tagToUnSelect;
                        dispatch("unSelect", payload);
                    }
                }
            }
        },

        typeTabSelected({ state, getters, rootGetters, commit, dispatch }, payload) {
            let typeParams = rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagCategories`].find(x => x.type == payload.type);
            let currentList = payload.isFilterNotNewItem ? state.filters : state.newTags;
            let noSelectedPerType = currentList.filter(x => x.type == payload.type).length;
            let possibleTagsPerType = state.allTags.filter(x => x.type == payload.type);
            //console.log(`tag/typeTabSelected() payload: ${JSON.stringify(payload, null, 2)} \ntypeParams: ${JSON.stringify(typeParams, null, 2)}`);
            //console.log(`noSelectedPerType: ${noSelectedPerType}`);
            
            if (typeParams.mandatory && noSelectedPerType === 0) {
                let params = { tag: possibleTagsPerType[0], isFilterNotNewItem: payload.isFilterNotNewItem }              
                dispatch("select", params);
                return;
            }
            if (
                !typeParams.multiple &&
                noSelectedPerType > 1
            ) {
                let tagsToUnselect = [...currentList];
                for (var i = 1; i < tagsToUnselect.length; i++) {
                    let params = { tag: tagsToUnselect[i], isFilterNotNewItem: payload.isFilterNotNewItem }
                    dispatch("unSelect", params);
                }
            }
        },
        select({ getters, rootGetters, commit, dispatch }, payload) {
            commit("selectTag", payload);
            dispatch(`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagToggled`, { ...payload, wasSelected: true }, { root: true });
        },

        unSelect({ getters, rootGetters, commit, dispatch }, payload) {
            commit("unSelectTag", payload);
            dispatch(`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagToggled`, { ...payload, wasSelected: false }, { root: true });
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