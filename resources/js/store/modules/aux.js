//handles auxilary data related to a specific module, specifically filters and tags organized as types 
//and related params. The exposed common structure is used to filter module params and create/update tags 
//r/t a specific item.

import { normalize, schema } from 'normalizr';

export default {
    namespaced: true,
    state: {
        typeIds: [],
        types: {},
        params: {},
        itemParamIds: [],
        newItemParamIds: [],
        filterParamIds: [],
    },
    getters: {
        //First three are used to retrieve only the currently selected params for the item, newItem and filter.
        //That is only types with at least one param that is selected.
        //TODO combine the three and use 'source' as a parameter.
        itemSelected(state, getters) {
            let types = [];
            getters["typesAndParamIds"].forEach(type => {
                let selectedParamsForType = [];
                type.params.forEach(paramId => {
                    if (state.itemParamIds.includes(paramId)) {
                        selectedParamsForType.push(state.params[paramId]);
                    }
                })
                if (selectedParamsForType.length > 0) {
                    types.push({ id: type.id, display_name: type.display_name, params: selectedParamsForType })
                }
            })
            return types;
        },

        filtersSelected(state, getters) {
            let types = [];
            getters["typesAndParamIds"].forEach(type => {
                let selectedParamsForType = [];
                type.params.forEach(paramId => {
                    if (state.filterParamIds.includes(paramId)) {
                        selectedParamsForType.push(state.params[paramId]);
                    }
                })
                if (selectedParamsForType.length > 0) {
                    types.push({ id: type.id, name: type.name, display_name: type.display_name, type_category: type.type_category, filter_category: type.filter_category, params: selectedParamsForType })
                }
            })
            return types;
        },
        newItemSelected(state, getters) {
            let types = [];
            getters["typesAndParamIds"].forEach(type => {
                let selectedParamsForType = [];
                type.params.forEach(paramId => {
                    if (state.newItemParamIds.includes(paramId)) {
                        selectedParamsForType.push(state.params[paramId]);
                    }
                })
                if (selectedParamsForType.length > 0) {
                    types.push({ id: type.id, name: type.name, display_name: type.display_name, params: selectedParamsForType })
                }
            })
            return types;
        },

        //retrieve currently displayed newItem/filters types with their params.
        //Note that the number of types changes as we select params that enable dependant options.
        //Each param will have a 'selected' property to indicate selection.

        filters(state, getters) {
            let types = [];
            getters["typesAndParamIds"].forEach(type => {
                let paramsForType = [];
                let n = 0;
                type.params.forEach(paramId => {
                    let param = Object.assign({}, state.params[paramId]);
                    param.selected = state.filterParamIds.includes(paramId);
                    n += param.selected ? 1 : 0;
                    paramsForType.push(param);
                })

                //show types dependant on their 'depends_on_id' null or param selected.
                if (type.depends_on_id == null || state.filterParamIds.includes(type.depends_on_id)) {
                    types.push({
                        id: type.id,
                        name: type.name,
                        display_name: type.display_name,
                        filter_category: type.filter_category,
                        params: paramsForType,
                        noSelected: n
                    })
                }
            })
            return types;
        },

        newItem(state, getters) {
            let types = [];
            getters["typesAndParamIds"].forEach(type => {
                if (type.type_category == "Module" || type.type_category == "Period") {
                    let paramsForType = [];
                    let n = 0;
                    type.params.forEach(paramId => {
                        let param = Object.assign({}, state.params[paramId]);
                        param.selected = state.newItemParamIds.includes(paramId);
                        n += param.selected ? 1 : 0;
                        paramsForType.push(param);
                    })

                    //show types dependant on their 'depends_on_id' null or param selected.
                    if (type.depends_on_id == null || state.newItemParamIds.includes(type.depends_on_id)) {
                        types.push({
                            id: type.id,
                            name: type.name,
                            display_name: type.display_name,
                            type_category: type.type_category,
                            params: paramsForType,
                            noSelected: n
                        })
                    }
                }
            })
            return types;
        },

        totalNoSelected(state, getters, rootState, rootGetters) {
            return {
                filters: state.filterParamIds.length,
                itemTags: state.itemParamIds.length,
                newTags: state.newItemParamIds.length,
            };
        },
        //internal use
        typesAndParamIds(state, getters) {
            return state.typeIds.map(typeId => state.types[typeId]);
        },

        paramById: (state) => (item_id) => {
            return (state.params[item_id]);
        },
    },

    mutations: {
        typeIds(state, payload) {
            state.typeIds = payload;
        },
        types(state, payload) {
            state.types = payload;
        },
        params(state, payload) {
            state.params = payload;
        },

        //called by mgr after a new item was loaded
        itemTagIds(state, payload) {
            state.itemParamIds = payload;
        },

        //used to clear these lists
        filterIds(state, payload) {
            state.filterParamIds = payload;
        },
        newItemIds(state, payload) {
            state.newItemParamIds = payload;
        },

        modifyParamAndDependents(state, payload) {
            let activeList = payload.isFilterNotNewItem ? state.filterParamIds : state.newItemParamIds
            if (payload.actionIsSelect) {
                //console.log(`select ${payload.id}`);
                activeList.push(payload.id);
            } else {
                //console.log(`unSelect ${payload.id}`);
                let index = activeList.indexOf(payload.id);
                activeList.splice(index, 1);

                //if other types are dependent on current, unselect them.
                for (const [key, value] of Object.entries(state.types)) {
                    if (value.depends_on_id == payload.id) {
                        //console.log(`dependent found! need to unselect from ${JSON.stringify(value.params, null, 2)}`);
                        value.params.forEach(id => {
                            if (activeList.includes(id)) {
                                //console.log(`unselecting param with id: ${id}`)
                                let index = activeList.indexOf(id);
                                activeList.splice(index, 1);
                            }
                        })
                    }
                }
            }
        },

        clearFilters(state, payload) {
            state.filterParamIds = [];
        },
    },

    actions: {
        toggleParam({ state, getters, rootGetters, commit, dispatch }, param) {
            //console.log(`aux/toggleParam(${paramId}): ${JSON.stringify(state.params[paramId], null, 2)}`);

            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let currentList = isFilterNotNewItem ? state.filterParamIds : state.newItemParamIds;
            let isCurrentlySelected = currentList.includes(param.id);
            //let paramTypeId = state.params[paramId].local_type_id;
            let typeOfParam = state.types[param.local_type_id];
            
            
            let noSelectedPerType = currentList.reduce(
                (accumulator, param) => accumulator + ((state.params[param].local_type_id == param.local_type_id) ? 1 : 0),
                0
            );
            

            console.log(`isFilter: ${isFilterNotNewItem}\nisCurrentlySelected: ${isCurrentlySelected}\n noSelectedPerType: ${noSelectedPerType}\ntypeOfParam: ${JSON.stringify(typeOfParam, null, 2)}`);

            let tagModifyRequest = {
                id: param.id,
                isFilterNotNewItem: isFilterNotNewItem,
                actionIsSelect: !isCurrentlySelected,
            };

            if (isFilterNotNewItem || noSelectedPerType !== 1) {
                commit("modifyParamAndDependents", tagModifyRequest);
            } else {
                //executed only on newItem when the number of selected tags (for type) is 1.
                if (tagModifyRequest.actionIsSelect) {
                    //this tag is currently not selected
                    if (typeOfParam.multiple) {
                        commit("modifyParamAndDependents", tagModifyRequest);
                    } else {
                        //turn current selected->off, new->on.                       
                        let myType = getters["newItemSelected"].find(x => x.id === paramTypeId);
                        let tagToUnselectRequest = {
                            id: myType.params[0].id,
                            isFilterNotNewItem: isFilterNotNewItem,
                            actionIsSelect: false,
                        };
                        commit("modifyParamAndDependents", tagToUnselectRequest);
                        commit("modifyParamAndDependents", tagModifyRequest);
                    }
                } else {
                    //same tag
                    if (typeOfParam.required) {
                        //if required and selected tag clicked, do not toggle.
                        return;
                    } else {
                        commit("modifyParamAndDependents", tagModifyRequest);
                    }
                }
            }
        },

        newItemTabInit({ state, getters, rootGetters, commit, dispatch }, typeId) {
            console.log(`aux/newItemTabInit(${typeId})`);

            let type = state.types[typeId];
            let selectedPerType = getters["newItemSelected"].filter(
                type => type.id === typeId).map(p => p.id);

            let noSelectedPerType = selectedPerType.length;
            //console.log(`type: ${JSON.stringify(type, null, 2)}\n selectedParams: ${JSON.stringify(selectedPerType, null, 2)}`);

            if (type.required && noSelectedPerType === 0) {
                let tagModifyRequest = {
                    id: type.params[0],
                    isFilterNotNewItem: false,
                    actionIsSelect: true,
                };
                commit("modifyParamAndDependents", tagModifyRequest);
            } else if (!type.multiple && noSelectedPerType > 1) {
                unSelectedList = [...selectedPerType];
                unSelectedList.shift();

                unSelectedList.forEach(x => {
                    let tagUnselectRequest = {
                        id: x.id,
                        isFilterNotNewItem: false,
                        actionIsSelect: false,
                    };
                    commit("modifyParamAndDependents", tagUnselectRequest);
                });
            }
        },

        predefinedFilter({ state, commit, rootGetters, dispatch }, payload) {
            commit("clearFilters");

            //verify that filter is defined
            let err = false;
            let filter = null;
            for (const [key, value] of Object.entries(rootGetters[`${rootGetters["mgr/moduleInfo"].storeModuleName}/predefinedFilters`])) {
                if (key == payload) {
                    filter = value;
                    break;
                }
            }
            if (!filter) {
                console.log(`Error in predefined filters. " + ${payload} + " not found!`);
                return;
            }

            console.log("predefinedFilter: " + JSON.stringify(filter, null, 2));

            //verify that all types and tags actually exist and commit to local store 
            filter.forEach(x => {
                let tagFound = false;
                let typeId = null;

                for (const [key, value] of Object.entries(state.types)) {
                    if (value.name == x.type) {
                        typeId = value.id;
                        break;
                    }
                }

                if (!typeId) {
                    console.log("type " + x.type + " not found"); err = true;
                }

                tagFound = false;
                x.tags.forEach(tag => {
                    for (const [key, val] of Object.entries(state.params)) {
                        if (val.name === tag) {
                            tagFound = true;
                            let tagModifyRequest = {
                                id: val.id,
                                isFilterNotNewItem: true,
                                actionIsSelect: true,
                            };
                            commit("modifyParamAndDependents", tagModifyRequest);
                        }
                    }

                    if (!tagFound) {
                        console.log("tag " + tag + " not found"); err = true;
                    }

                })
            });

            if (err) {
                console.log(`Error in predefined filter "${payload}" - loading full collection`);
                commit("clearFilters");
            }
        },

        prepareForNew({ state, commit }) {
            commit("newItemIds", state.itemParamIds);
        },

        sync({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log("aux/sync");

            let tagsToSync = [];
            state.typeIds.filter(typeId => (state.types[typeId].type_category === "Module" || state.types[typeId].type_category === "Period")).forEach(typeId => {
                let selectedTags = [];
                let res = getters["newItemSelected"].find(type => type.id == typeId);
                if (res !== undefined) {
                    res.params.forEach(param => {
                        selectedTags.push({ id: param.id, name: param.name })
                    });
                }
                tagsToSync.push({
                    type: state.types[typeId].name,
                    tags: selectedTags
                });
            });

            ////////
            console.log("aux/tagsToSync: " + JSON.stringify(tagsToSync, null, 2));

            let xhrRequest = {
                endpoint: `/api/tags/sync`,
                action: `post`,
                data: {
                    digModel: rootGetters["mgr/appStatus"].module,
                    id: rootGetters["mgr/item"].id,
                    tagsByType: tagsToSync,
                },
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving tags", onSuccess: `tags saved sucessfully`, onFailure: `failed to save tags - redirected to previous screen`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    //update item tags                  
                    commit('itemTagIds', res.data.tagIds);
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

        //use normalizr to convert api response to flat objects {types} and {params} with ids as keys 
        //and an array of typeIds.
        typesAndParams({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/savetypesAndParams() payload: ${JSON.stringify(payload, null, 2)}`);

            let ti = { typesAndParams: payload };

            //add tag_id to all tags
            const itemsProcessStrategy = (value, parent, key) => {
                return { ...value, local_type_id: parent.local_type_id };
            };

            //param is boolean tagging
            const itemSchema = new schema.Entity('params', {},
                {
                    processStrategy: itemsProcessStrategy
                });

            //
            const typeSchema = new schema.Entity('types', {
                params: [itemSchema],
            }, { idAttribute: 'local_type_id', });

            const mySchema = { typesAndParams: [typeSchema] };
            let normalizedData = normalize(ti, mySchema);
            //console.log(`normalizedData: ${JSON.stringify(normalizedData, null, 2)}`);
            commit("typeIds", normalizedData.result.typesAndParams);
            commit("types", normalizedData.entities.types);
            commit("params", normalizedData.entities.params);
        },


        queryCollection({ state, getters, rootGetters, commit, dispatch }, payload) {
            function queryParams() {
                let res = getters["filtersSelected"].find(x => x.display_name === "Areas")
                let areas = (res === undefined) ? [] : res["params"].map(param => param.name);

                res = getters["filtersSelected"].find(x => x.display_name === "Seasons");
                let seasons = (res === undefined) ? [] : res["params"].map(param => parseInt(param.name, 10) - 2000);

                res = getters["filtersSelected"].find(x => x.display_name === "Media");
                let media = (res === undefined) ? [] : res["params"].map(param => param.name);


                //format tagParams according to Spatie interface (types with tags).
                let tagParams = [];
                (getters["filtersSelected"].filter(x => x.type_category == "Tag")).forEach((type => {
                    tagParams.push({ type: type.name, tags: type.params.map(tag => { return { id: tag.id, name: tag.name }; }) });
                }));

                return {
                    tagParams: tagParams,
                    areas: areas,
                    seasons: seasons,
                    media: media,
                };
            }
            if (payload.clear) {
                commit("clearFilters");
            }
            return dispatch("mgr/queryCollection", { queryParams: queryParams(), spinner: payload.spinner, gotoCollection: payload.gotoCollection }, { root: true });
        },
    },

}