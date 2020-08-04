export default {
    namespaced: true,
    state: {
        //array of all possible tags per module(locus, stone, pottery...)
        moduleTags: [],

        //all tag types per module
        moduleTypes: [],

        //tags for the currently shown item, newTags, and filters.
        filters: [],
        itemTags: [],
        newTags: [],

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
            { type: "Media", mandatory: false, multiple: false, header: "Media", displayHeader: "MEDIA", showInFilters: true, showInNewItem: false },
            { type: "Areas", mandatory: false, multiple: true, header: "Areas", displayHeader: "AREAS", showInFilters: true, showInNewItem: false },
            { type: "Seasons", mandatory: false, multiple: true, header: "Seasons", displayHeader: "SEASONS", showInFilters: true, showInNewItem: false },]
    },

    getters: {
        tags(state, getters, rootState, rootGetters) {
            let allTags = [...state.moduleTags, ...state.globalTags];

            return allTags.map(x => {
                let tag = { ...x };
                tag.selectedInFilter = state.filters.map(x => x.id).includes(tag.id);
                tag.selectedInItem = state.itemTags.map(x => x.id).includes(tag.id);
                tag.selectedInNewItem = state.newTags.map(x => x.id).includes(tag.id);
                return tag;
            })
        },

        typesWithTags(state, getters, rootState, rootGetters) {
            let allTypes = [...state.moduleTypes, ...state.globalTypes];
            let typesWithTags = allTypes
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

        moduleTypes(state, getters, rootState, rootGetters) {
            return state.moduleTypes;
        },

        typesWithTagsShowInFilters(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.showInFilters);
        },

        typesWithTagsShowInNewItem(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.showInNewItem);
        },

        typesWithTagsFiltersActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.filters.noSelected > 0).map(x => { return { type: x.type, header: x.displayHeader, tags: x.filters.tags } });
        },

        typesWithTagsNewItemActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.newTags.noSelected > 0).map(x => { return { type: x.type, header: x.displayHeader, tags: x.newTags.tags } });
        },
        typesWithTagsItemTagsActive(state, getters, rootState, rootGetters) {
            return getters["typesWithTags"].filter(x => x.itemTags.noSelected > 0).map(x => { return { type: x.type, header: x.displayHeader, tags: x.itemTags.tags } });
        },

        queryParams(state, getters, rootState, rootGetters) {
            let typeAreas = getters["typesWithTags"].find(x => x.type === "Areas");
            let typeSeasons = getters["typesWithTags"].find(x => x.type === "Seasons");
            let typeMedia = getters["typesWithTags"].find(x => x.type === "Media");

            //quick fix return [] filters if filters are not loaded yet. TODO use loadingFilters indicator instead.
            if (typeof typeAreas == 'undefined' || typeof typeSeasons == 'undefined' || typeof typeMedia == 'undefined') {
                return {
                    tagParams: [],
                    areas: [],
                    seasons: [],
                    media: []
                };
            }
            //console.log(`queryParams typeSeasons: ${JSON.stringify(typeSeasons, null, 2)} typeMedia: ${JSON.stringify(typeMedia, null, 2)}`);
            return {
                tagParams: getters["typesWithTagsFiltersActive"].filter(x => x.type.includes(rootGetters["mgr/status"].itemName)),
                areas: typeAreas.filters.tags.map(x => x.name),
                seasons: typeSeasons.filters.tags.map(x => parseInt(x.name, 10) - 2000),
                media: typeMedia.filters.tags.map(x => x.name),
            }
        },

        tagsToStore(state, getters, rootState, rootGetters) {
            //tagParams: getters["typesWithTagsFiltersActive"].filter(x => x.type.includes(rootGetters["mgr/status"].itemName)),
            let toStore = [];
            state.moduleTypes.forEach(x => {
                toStore.push({ type: x.type, tags: state.newTags.filter(y => y.type === x.type) });
            });
            return toStore;
        },

        totalNoSelected(state, getters, rootState, rootGetters) {
            return {
                filters: state.filters.length,
                itemTags: state.itemTags ? state.itemTags.length : 0,
                newTags: state.newTags.length,
            };
        },
    },

    mutations: {
        moduleTags(state, payload) {
            //console.log(`tag/moduleTags.setter() payload: ${JSON.stringify(payload, null, 2)}`);
            state.moduleTags = payload;
        },
        moduleTypes(state, payload) {
            //console.log(`tag/moduleTypes.setter() payload: ${JSON.stringify(payload, null, 2)}`);
            state.moduleTypes = payload;
        },

        itemTags(state, payload) {
            state.itemTags = payload;
        },

        //used by welcome page to set some predefined filters
        filters(state, payload) {
            state.filters = payload;
        },
        newTags(state, payload) {
            state.newTags = payload;
        },

        clear(state) {
            console.log('tag/clear');
            state.moduleTags = [];
            state.itemTags = [];
            state.filters = [];
        },

        modifyTag(state, payload) {
            //console.log(`*****tag/modifyTag("${payload.tag.name}") of type "${payload.tag.type}" in list "${payload.isFilterNotNewItem ? "filters" : "new tags"}" - ${payload.actionIsSelect ? "SELECT" : "UNSELECT"}`);

            let activeList = payload.isFilterNotNewItem ? state.filters : state.newTags
            if (payload.actionIsSelect) {
                activeList.push(payload.tag);
            } else {
                let index = activeList.map(x => x.id).indexOf(payload.tag.id);
                activeList.splice(index, 1);
            }
        },
        modifyType(state, payload) {
            //console.log(`tag/modifyType()`);
            //console.log(`tag/mutation.modifyType() payload: ${JSON.stringify(payload, null, 2)}`);
            let typeList = state.moduleTags.map(x => x.type).includes(payload.type) ? state.moduleTypes : state.globalTypes;
            let index = typeList.map(x => x.type).indexOf(payload.type);
            typeList.splice(index, 1, payload);
        },
    },

    actions: {
        toggleTag({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`tag/toggleTag() payload: ${JSON.stringify(payload, null, 2)}`);
            let typeParams = getters["typesWithTags"].find(x => x.type == payload.type);

            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;

            let currentList = isFilterNotNewItem ? state.filters : state.newTags;
            let actionIsSelect = !currentList.some(x => x.id == payload.id);
            let noSelectedPerType = currentList.filter(x => x.type == payload.type).length;
            let isModuleTag = state.moduleTags.map(x => x.type).includes(payload.type);

            delete payload.selectedInFilter;
            delete payload.selectedInItem;
            delete payload.selectedInNewItem;

            let tagModifyRequest = {
                tag: payload,
                isFilterNotNewItem: isFilterNotNewItem,
                actionIsSelect: actionIsSelect,
                isModuleTag: isModuleTag,
            };

            if (isFilterNotNewItem || noSelectedPerType !== 1) {
                dispatch("modifyTag", tagModifyRequest);
            } else {
                //executed only on newItem when the number of selected tags (for type) is 1.
                if (actionIsSelect) {
                    //this tag is currently not selected
                    if (typeParams.multiple) {
                        dispatch("modifyTag", tagModifyRequest);
                    } else {
                        //turn current selected->off, new->on.
                        let tagToUnSelect = currentList.find(x => x.type === payload.type);
                        let tagToUnselectRequest = {
                            tag: tagToUnSelect,
                            isFilterNotNewItem: isFilterNotNewItem,
                            actionIsSelect: false,
                            isModuleTag: isModuleTag,
                        };
                        dispatch("modifyTag", tagToUnselectRequest);
                        dispatch("modifyTag", tagModifyRequest);
                    }
                } else {
                    //same tag
                    if (typeParams.mandatory) {
                        //if mandatory and selected tag clicked, do not toggle.
                        return;
                    } else {
                        dispatch("modifyTag", tagModifyRequest);
                    }
                }
            }
        },

        modifyTag({ state, commit, rootGetters, dispatch }, payload) {
            //console.log(`modifyTag() payload: ${JSON.stringify(payload, null, 2)}`);
            commit("modifyTag", payload);
            if (payload.isModuleTag) {
                dispatch(`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagToggled`, payload, { root: true });
            }
        },

        typeTabSelected({ state, getters, rootGetters, commit, dispatch }, typeName) {
            console.log(`tag/typeTabSelected(${typeName})`);

            let isFilterNotNewItem = (rootGetters["mgr/status"].isFilter);
            let typeParams = getters["typesWithTags"].find(x => x.type == typeName);
            let currentList = isFilterNotNewItem ? state.filters : state.newTags;
            let noSelectedPerType = currentList.filter(x => x.type == typeName).length;
            let isModuleTag = state.moduleTags.map(x => x.type).includes(typeName);
            let tagsPerType = [];

            getters["tags"].filter(x => x.type == typeName).forEach(x => {
                tagsPerType.push(x);
            });

            if (typeParams.mandatory && noSelectedPerType === 0) {
                let tagSelectRequest = {
                    tag: tagsPerType[0],
                    isFilterNotNewItem: isFilterNotNewItem,
                    actionIsSelect: true,
                    isModuleTag: isModuleTag,
                };
                dispatch("modifyTag", tagSelectRequest);
                return;
            }
            if (!typeParams.multiple && noSelectedPerType > 1) {
                tagsPerType.shift();

                tagsPerType.forEach(x => {
                    let tagUnSelectRequest = {
                        tag: x,
                        isFilterNotNewItem: isFilterNotNewItem,
                        actionIsSelect: false,
                        isModuleTag: isModuleTag,
                    };
                    dispatch("modifyTag", tagUnSelectRequest);
                });
            }
        },

        clearFilterSelections({ state, rootGetters, commit, dispatch }) {
            commit("moduleTypes", rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagTypes`]);
            commit("filters", []);
        },

        clearNewTagSelections({ state, rootGetters, commit, dispatch }) {
            console.log("clearNewTagSelections");
            commit("moduleTypes", rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagTypes`]);
            commit("newTags", []);
        },

        prepareForNew({ state, rootGetters, dispatch }, payload) {
            console.log("tags prepareForNew()");
            dispatch("clearNewTagSelections");

            let toCopy = [...state.itemTags];
            console.log("prepare copy these tags to newTags" + JSON.stringify(toCopy, null, 2));
            toCopy.forEach(tag => {
                let tagToSelectRequest = {
                    tag: tag,
                    isFilterNotNewItem: false,
                    actionIsSelect: true,
                    isModuleTag: state.moduleTags.map(x => x.type).includes(tag.type),
                };
                dispatch("modifyTag", tagToSelectRequest);
            });

        },
        loadModuleTags({ rootGetters, commit }, payload) {
            commit("moduleTags", payload);
            commit("moduleTypes", rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/tagTypes`]);
        },

        sync({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log("tag/sync: " + JSON.stringify(getters.tagsToStore, null, 2));

            let xhrRequest = {
                endpoint: `/api/tags/sync`,
                action: `post`,
                data: {
                    digModel: rootGetters["mgr/status"].itemName,
                    id: rootGetters["mgr/item"].id,
                    tagsByType: getters.tagsToStore,
                },
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving tags", onSuccess: `tags saved sucessfully`, onFailure: `failed to save tags - redirected to previous screen`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    //update item tags                  
                    commit('tag/itemTags', res.data.tags, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    return err;
                }).finally(() => {
                    //go back to item
                    rootGetters["getRouter"].go(-1);

                });
        },
    },


}