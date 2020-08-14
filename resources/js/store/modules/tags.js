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
    },
    getters: {
        tags(state, getters, rootState, rootGetters) {
            //let allTags = [...state.moduleTags];

            return state.moduleTags.map(x => {
                let tag = { ...x };
                tag.selectedInFilter = state.filters.map(x => x.id).includes(tag.id);
                tag.selectedInItem = state.itemTags.map(x => x.id).includes(tag.id);
                tag.selectedInNewItem = state.newTags.map(x => x.id).includes(tag.id);
                return tag;
            })
        },

        tagsByType(state, getters, rootState, rootGetters) {
            //let allTypes = [...state.moduleTypes, ...state.globalTypes];
            let tagsByType = state.moduleTypes
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
            return tagsByType;
        },

        itemTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.itemTags.noSelected > 0).map(x => { return { type: x.type, header: x.header, tags: x.itemTags.tags } });
        },

        filterTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.showInFilters).map(x => { return { type: x.type, header: x.header, tags: x.filters.tags } });
        },

        filterTagsByTypeActive(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.filters.noSelected > 0).map(x => { return { type: x.type, header: x.header, tags: x.filters.tags } });
        },

        newItemTagsByType(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.showInNewItem);
        },

        newItemTagsByTypeActive(state, getters, rootState, rootGetters) {
            return getters["tagsByType"].filter(x => x.newTags.noSelected > 0).map(x => { return { type: x.type, header: x.header, tags: x.newTags.tags } });
        },



        queryParams(state, getters, rootState, rootGetters) {
            /*
            let typeAreas = getters["tagsByType"].find(x => x.type === "Areas");
            let typeSeasons = getters["tagsByType"].find(x => x.type === "Seasons");
            let typeMedia = getters["tagsByType"].find(x => x.type === "Media");
 
            //quick fix return [] filters if filters are not loaded yet. TODO use loadingFilters indicator instead.
            
            if (typeof typeAreas == 'undefined' || typeof typeSeasons == 'undefined' || typeof typeMedia == 'undefined') {
                return {
                    tagParams: [],
                    areas: [],
                    seasons: [],
                    media: []
                };
            }
            */
            //console.log(`queryParams typeSeasons: ${JSON.stringify(typeSeasons, null, 2)} typeMedia: ${JSON.stringify(typeMedia, null, 2)}`);
            return {
                tagParams: getters["filterTagsByTypeActive"].filter(x => x.type.includes(rootGetters["mgr/status"].itemName)),
                areas: [],//typeAreas.filters.tags.map(x => x.name),
                seasons: [],// typeSeasons.filters.tags.map(x => parseInt(x.name, 10) - 2000),
                media: [],//typeMedia.filters.tags.map(x => x.name),
            };
        },

        tagsToStore(state, getters, rootState, rootGetters) {
            //tagParams: getters["filterTagsByTypeActive"].filter(x => x.type.includes(rootGetters["mgr/status"].itemName)),
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
            console.log(`tag/toggleTag() payload: ${JSON.stringify(payload, null, 2)}`);
            let typeParams = getters["tagsByType"].find(x => x.type == payload.type);

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
            let typeParams = getters["tagsByType"].find(x => x.type == typeName);
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