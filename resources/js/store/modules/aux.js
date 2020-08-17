//handles auxilary data related to a specific module, specifically filters and tags organized as types 
//and related items. The exposed common structure is used to filter module items and create/update tags 
//r/t a specific item.

import { normalize, schema } from 'normalizr';

export default {
    namespaced: true,
    state: {

    },
    getters: {

    },

    mutations: {
        typesAndItems({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/saveTypesAndItems() payload: ${JSON.stringify(payload, null, 2)}`);

            let ti = { typesAndItems: payload };

            const itemsProcessStrategy = (value, parent, key) => {
                return { ...value, selectedInItem: false, selectedInNewItem: false, selectedInFilters: false, };
            };

            const typesProcessStrategy = (value, parent, key) => {
                return { ...value, showInItem: false, showInNewItem: false, showInFilters: false, };
            };
            // 
            const itemSchema = new schema.Entity('items', {},
                {
                    processStrategy: itemsProcessStrategy
                });

            //
            const typeSchema = new schema.Entity('types', {
                items: [itemSchema]
            }, {
                processStrategy: typesProcessStrategy
            });

            const mySchema = { typesAndItems: [typeSchema] };


            let normalizedData = normalize(ti, mySchema);
            console.log(`normalizedData: ${JSON.stringify(normalizedData, null, 2)}`);
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