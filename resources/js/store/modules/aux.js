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
                    types.push({ id: type.id, name: type.name, display_name: type.display_name, parameter_type: type.parameter_type, params: selectedParamsForType })
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
                    types.push({ id: type.id, display_name: type.display_name, params: selectedParamsForType })
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
                type.params.forEach(paramId => {
                    let param = Object.assign({}, state.params[paramId]);
                    param.selected = state.filterParamIds.includes(paramId);
                    paramsForType.push(param);
                })

                //show types dependant on their 'depends_on_tag_id' null or param selected.
                if (type.depends_on_tag_id == null || state.filterParamIds.includes(type.depends_on_tag_id)) {
                    types.push({ id: type.id, display_name: type.display_name, params: paramsForType })
                }
            })
            return types;
        },

        newItem(state, getters) {
            return state.typeIds.map(typeId => state.types[typeId]);
        },

        //params sent to server@index
        queryParams(state, getters, rootState, rootGetters) {
            let res = getters["filtersSelected"].find(x => x.display_name === "Areas")
            let areas = (res === undefined) ? [] : res["params"].map(param => param.name);

            res = getters["filtersSelected"].find(x => x.display_name === "Seasons");
            let seasons = (res === undefined) ? [] : res["params"].map(param => parseInt(param.name, 10) - 2000);

            res = getters["filtersSelected"].find(x => x.display_name === "Media");
            let media = (res === undefined) ? [] : res["params"].map(param => param.name);


            //format tagParams according to Spatie interface (types with tags).
            let tagParams = [];
            (getters["filtersSelected"].filter(x => x.parameter_type == "module-tag")).forEach((type => {
                tagParams.push({ type: type.name, tags: type.params.map(tag => { return { id: tag.id, name: tag.name }; }) });
            }));
            //console.log(`queryParams typeSeasons: ${JSON.stringify(typeSeasons, null, 2)} typeMedia: ${JSON.stringify(typeMedia, null, 2)}`);
            return {
                tagParams: tagParams,
                areas: areas,
                seasons: seasons,
                media: media,
            };
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

        modifyParam(state, payload) {
            //console.log(`*****tag/modifyParam("${payload.tag.name}") of type "${payload.tag.type}" in list "${payload.isFilterNotNewItem ? "filters" : "new tags"}" - ${payload.actionIsSelect ? "SELECT" : "UNSELECT"}`);

            let activeList = payload.isFilterNotNewItem ? state.filterParamIds : state.newItemParamIds
            if (payload.actionIsSelect) {
                console.log(`select ${payload.id}`);
                activeList.push(payload.id);
            } else {
                console.log(`unSelect ${payload.id}`);
                let index = activeList.indexOf(payload.id);
                activeList.splice(index, 1);
            }
        },
        clearFilters(state, payload) {
            state.filterParamIds = [];
        },

        clearNewTags(state, payload) {
            state.newItemParamIds = [];
        },
    },

    actions: {
        toggleParam({ state, getters, rootGetters, commit, dispatch }, paramId) {
            console.log(`aux/toggleParam(${paramId}): ${JSON.stringify(state.params[paramId], null, 2)}`);

            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let currentList = isFilterNotNewItem ? state.filterParamIds : state.newItemParamIds;
            let isCurrentlySelected = currentList.includes(paramId);
            let paramTypeId = state.params[paramId].type_id;
            let typeOfParam = state.types[paramTypeId];
            let noSelectedPerType = currentList.reduce(
                (accumulator, param) => accumulator + ((state.params[param].type_id == paramTypeId) ? 1 : 0),
                0
            );

            console.log(`isFilter: ${isFilterNotNewItem}, isCurrentlySelected: ${isCurrentlySelected}, noSelectedPerType: ${noSelectedPerType}`);

            let tagModifyRequest = {
                id: paramId,
                isFilterNotNewItem: isFilterNotNewItem,
                actionIsSelect: !isCurrentlySelected,
            };

            if (isFilterNotNewItem || noSelectedPerType !== 1) {
                commit("modifyParam", tagModifyRequest);
            } else {
                //executed only on newItem when the number of selected tags (for type) is 1.
                if (actionIsSelect) {
                    //this tag is currently not selected
                    if (typeOfParam.multiple) {
                        commit("modifyParam", tagModifyRequest);
                    } else {
                        //turn current selected->off, new->on.
                        let tagToUnSelect = currentList.find(x => x.type === payload.type);
                        let tagToUnselectRequest = {
                            tag: tagToUnSelect,
                            isFilterNotNewItem: isFilterNotNewItem,
                            actionIsSelect: false,
                        };
                        commit("modifyParam", tagToUnselectRequest);
                        commit("modifyParam", tagModifyRequest);
                    }
                } else {
                    //same tag
                    if (typeOfParam.mandatory) {
                        //if mandatory and selected tag clicked, do not toggle.
                        return;
                    } else {
                        commit("modifyParam", tagModifyRequest);
                    }
                }
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
                            commit("modifyParam", tagModifyRequest);
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
                commit("modifyParam", tagToSelectRequest);
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


        typesAndParams({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/savetypesAndParams() payload: ${JSON.stringify(payload, null, 2)}`);

            let ti = { typesAndParams: payload };

            const itemsProcessStrategy = (value, parent, key) => {
                return { ...value, type_id: parent.id };
            };

            // 
            const itemSchema = new schema.Entity('params', {},
                {
                    processStrategy: itemsProcessStrategy
                });

            //
            const typeSchema = new schema.Entity('types', {
                params: [itemSchema]
            });

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
                (getters["filtersSelected"].filter(x => x.parameter_type == "module-tag")).forEach((type => {
                    tagParams.push({ type: type.name, tags: type.params.map(tag => { return { id: tag.id, name: tag.name }; }) });
                }));

                return {
                    tagParams: tagParams,
                    areas: areas,
                    seasons: seasons,
                    media: media,
                };
            }

            let params = {};
            switch (payload.queryType) {
                case "clear":
                    commit("clearFilters");
                    break;

                case "predefined"://get from module. for now ignore
                case "current":
                    params = queryParams();
                    break;

            }

            return dispatch("mgr/queryCollection", { queryParams: params, spinner: payload.spinner, gotoCollection: payload.gotoCollection }, { root: true });
        },
    },

}