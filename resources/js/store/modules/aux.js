//handles auxilary data related to a specific module, specifically filters and tags organized as types 
//and related params. The exposed common structure is used to filter module params and create/update tags 
//r/t a specific item.

import { normalize, schema } from 'normalizr';

export default {
    namespaced: true,
    state: {
        filterParams: null,
        tagParams: null,
        lookupParams: null,

        lookups: null,
        filters: null,
        tags: null,

        typesFromApi: [],
    },
    getters: {
        //retrieve currently displayed newItem/filters types with their params.
        //Note that the number of types changes as we select params that enable dependant options.
        //Each param will have a 'selected' property to indicate selection.

        filters(state, getters) {
            let types = [];
            getters["typesAndParams"].forEach(type => {
                let paramsForType = [];
                let n = 0;
                type.params.forEach(param => {
                    let paramFormatted = Object.assign({}, param);
                    paramFormatted.selected = param.selectedInFilter;
                    delete paramFormatted.selectedInFilter;
                    delete paramFormatted.selectedInItem;
                    delete paramFormatted.selectedInNewItem;

                    n += paramFormatted.selected ? 1 : 0;
                    paramsForType.push(paramFormatted);
                })
                let add = true;
                let params = [];
                //show only types that are either independent or those whos 'parent' is selected.

                /*
                if ((type.type_category !== "tag") ||
                    (type.type_category === "tag" && type.dependency === null)) {
                    add = true;
                } else {
                    switch (type.depends_on) {
                        case "lookup":
                            params = state.lookups[type.field_name];
                            let myLookupParam = params.find(x => state.lookupParams[x].name == type.param_name);
                            if (myLookupParam === undefined) {
                                console.log(`lookup ${type.param_name} not found`);
                                add = true;
                            } else {
                                add = myLookupParam.selectedInFilter;
                            }
                            break;

                        case "tag":
                            params = state.tags[type.field_name];
                            let myTagParam = state.tagParams.find(x => x.name == type.param_name);
                            if (myTagParam === undefined) {
                                console.log(`lookup ${type.param_name} not found`);
                                add = true;
                            } else {
                                add = myTagParam.selectedInFilter;
                            }
                            break;
                    }
                }
                */
                if (add) {
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
            getters["typesAndParams"].forEach(type => {
                let paramsForType = [];
                let n = 0;
                type.params.forEach(param => {
                    let paramFormatted = Object.assign({}, param);
                    paramFormatted.selected = param.selectedInNewItem;
                    delete paramFormatted.selectedInFilter;
                    delete paramFormatted.selectedInItem;
                    delete paramFormatted.selectedInNewItem;

                    n += paramFormatted.selected ? 1 : 0;
                    paramsForType.push(paramFormatted);
                })

                //show types dependant on their 'depends_on_id' null or param selected.
                //if (type.depends_on_id == null) {
                types.push({
                    id: type.id,
                    name: type.name,
                    display_name: type.display_name,
                    filter_category: type.filter_category,
                    params: paramsForType,
                    noSelected: n
                })
                //}
            })
            return types;
        },

        itemSelected(state, getters) {
            let types = [];
            let tags = getters["typesAndParams"].filter(x => x.type_category === 'tag');
            tags.forEach(type => {
                let paramsForType = [];
                type.params.forEach(param => {
                    if (param.selectedInItem) {
                        paramsForType.push({ id: param.id, name: param.name });
                    }
                })

                if (paramsForType.length > 0) {
                    types.push({
                        id: type.id,
                        name: type.name,
                        display_name: type.display_name,
                        params: paramsForType,
                        noSelected: paramsForType.length,
                    })
                }
            })
            return types;
        },

        filtersSelected(state, getters) {
            let types = [];
            getters["typesAndParams"].forEach(type => {
                let paramsForType = [];
                type.params.forEach(param => {
                    if (param.selectedInFilter) {
                        paramsForType.push({ id: param.id, name: param.name });
                    }
                })

                if (paramsForType.length > 0) {
                    let typeToPush = {
                        id: type.id,
                        name: type.name,
                        display_name: type.display_name,
                        type_category: type.type_category,
                        params: paramsForType,
                        noSelected: paramsForType.length,
                    }
                    if (type.type_category === 'lookup') {
                        typeToPush["column_name"] = type.column_name;
                    }
                    types.push(typeToPush);
                }
            })
            return types;
        },

        newItemSelected(state, getters) {
            let types = [];
            getters["typesAndParams"].forEach(type => {
                let paramsForType = [];
                type.params.forEach(param => {
                    if (param.selectedInNewItem) {
                        paramsForType.push({ id: param.id, name: param.name });
                    }
                })

                if (paramsForType.length > 0) {
                    types.push({
                        id: type.id,
                        name: type.name,
                        display_name: type.display_name,
                        params: paramsForType,
                        noSelected: paramsForType.length,
                    })
                }
            })
            return types;
        },

        //internal use
        typesAndParams(state, getters) {
            let typesAndParams = state.typesFromApi.map(apiType => state[apiType.schema][apiType.id]);
            return typesAndParams.map(x => {
                let tpFull = Object.assign({}, x);
                let params = tpFull.params.map(y => state[`${x.type_category}Params`][y]);
                tpFull.params = params;
                return tpFull;
            });
        },
        totalNoSelected(state, getters, rootState, rootGetters) {
            return {
                filters: getters["filtersSelected"].reduce(
                    (accumulator, type) => accumulator + type.noSelected,
                    0
                ),
                itemTags: getters["itemSelected"].reduce(
                    (accumulator, type) => accumulator + type.noSelected,
                    0
                ),
                newTags: getters["newItemSelected"].reduce(
                    (accumulator, type) => accumulator + type.noSelected,
                    0
                ),
            };
        },
    },
    mutations: {
        //First seven used by normalizr
        typesFromApi(state, payload) {
            state.typesFromApi = payload;
        },
        lookups(state, payload) {
            state.lookups = payload;
        },
        filters(state, payload) {
            state.filters = payload;
        },
        tags(state, payload) {
            state.tags = payload;
        },
        lookupParams(state, payload) {
            state.lookupParams = payload;
        },
        filterParams(state, payload) {
            state.filterParams = payload;
        },
        tagParams(state, payload) {
            state.tagParams = payload;
        },

        //used to update a selection status of a parameter
        select(state, payload) {
            console.log(`select() payload: ${JSON.stringify(payload, null, 2)}`);
            state[payload.name][payload.key] = payload.value;
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
    },

    actions: {
        //called when a new item is loaded
        itemTagIds({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`aux/itemTagIds: ${JSON.stringify(payload, null, 2)}`);
            //TODO - in one loop
            //clear old selections
            for (const [key, value] of Object.entries(state.tagParams)) {
                if (value.selectedInItem) {
                    let newParam = { ...value };
                    newParam.selectedInItem = false;
                    newParam.selectedInNewItem = false;
                    commit("select", {
                        name: `tagParams`,
                        key: key,
                        value: newParam
                    });
                }
            }

            //add item's selections
            payload.forEach(x => {
                for (const [key, value] of Object.entries(state.tagParams)) {
                    if (parseInt(key, 10) === x) {
                        let newParam = { ...value };
                        newParam.selectedInItem = true;
                        newParam.selectedInNewItem = true;
                        commit("select", {
                            name: `tagParams`,
                            key: x,
                            value: newParam
                        });
                    }
                }
            })
        },

        syncItemLookupsWithDiscreteRepresentation({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/syncItemWithDiscrete: ${JSON.stringify(state.lookupParams, null, 2)}`);            
            console.log(`***************`);
            let item = rootGetters["mgr/item"];

            for (const [key, value] of Object.entries(state.lookups)) {
                console.log(`**** aux/syncLookups(${value.column_name})`);
                let paramId = item[value.column_name];
                let paramName = item[value.item_name_field];

                console.log(`ParamId: ${paramId} ParamName: ${paramName} params: ${JSON.stringify(value.params, null, 2)}`);

                //iterate over params for this lookup
                value.params.forEach(function (x, index) {
                    if (state.lookupParams[x].id === paramId) {
                        //if we are currently at the one found in the item's field, select.
                        let newParam = { ...state.lookupParams[x] };
                        newParam.selectedInItem = true;
                        newParam.selectedInNewItem = true;
                        commit("select", {
                            name: `lookupParams`,
                            key: x,
                            value: newParam
                        });
                    } else if (state.lookupParams[x].selectedInItem) {
                        //for all the others, if selected -> unselect.
                        let newParam = { ...state.lookupParams[x] };
                        newParam.selectedInItem = false;
                        newParam.selectedInNewItem = false;
                        commit("select", {
                            name: `lookupParams`,
                            key: x,
                            value: newParam
                        });
                    }
                })
            }
        },

        toggleParam({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`aux/toggleParam(): ${JSON.stringify(payload, null, 2)}`);

            //console.log(`type: ${JSON.stringify(type, null, 2)}`);
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let noSelectedPerType = getters["typesAndParams"][payload.typeGetterId].noSelected;

            if (isFilterNotNewItem) {
                let name = `${payload.param_category}Params`;
                let key = payload.key;
                let newParam = { ...state[name][key] };
                newParam.selectedInFilter = !newParam.selectedInFilter;
                commit("select", {
                    name: name,
                    key: key,
                    value: newParam
                });
            } else {

            }
            return;
            //let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let currentList = isFilterNotNewItem ? state.filterParamIds : state.newItemParamIds;
            let isCurrentlySelected = currentList.includes(param.id);
            //let paramTypeId = state.params[paramId].local_type_id;
            let typeOfParam = state.types[param.local_type_id];

            /*
            let noSelectedPerType = currentList.reduce(
                (accumulator, param) => accumulator + ((state.params[param].local_type_id == param.local_type_id) ? 1 : 0),
                0
            );
                */

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

        clearFilters({ state, commit }) {
            let paramCategories = ["filterParams", "tagParams", "lookupParams"];

            paramCategories.forEach(cat => {
                if (typeof state[cat] !== "undefined") {
                    for (const [key, value] of Object.entries(state[cat])) {
                        if (value.selectedInFilter) {
                            let newValue = { ...value };
                            newValue.selectedInFilter = false;
                            commit("select", {
                                name: cat,
                                key: key,
                                value: newValue
                            });
                        }
                    }
                }
            })

        },

        predefinedFilter({ state, commit, rootGetters, dispatch }, payload) {
            dispatch("clearFilters");

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
                dispatch("clearFilters");
            }
        },

        prepareForNew({ state, commit }) {
            //commit("newItemIds", state.itemParamIds);
        },

        //use normalizr to convert api response to flat objects {types} and {params} with ids as keys 
        //and an array of typeIds.
        typesAndParams({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/savetypesAndParams() payload: ${JSON.stringify(payload, null, 2)}`);

            //filters
            const filterItemsProcessStrategy = (value, parent, key) => {
                return {
                    ...value,
                    param_category: 'filter',
                    key: value.name,
                    selectedInFilter: false,
                    typeGetterId: parent.local_type_id,
                };
            };

            const filterItemSchema = new schema.Entity('filterParams', {},
                {
                    processStrategy: filterItemsProcessStrategy,
                    idAttribute: 'name'
                });

            const filterSchema = new schema.Entity('filters', {
                params: [filterItemSchema],
            }, { idAttribute: 'display_name', });


            //lookups
            const lookupItemsProcessStrategy = (value, parent, key) => {
                return {
                    ...value,
                    param_category: 'lookup',
                    key: `${parent.id}-${value.id}`,
                    selectedInItem: false,
                    selectedInFilter: false,
                    selectedInNewItem: false,
                    typeGetterId: parent.local_type_id,
                };
            };

            const lookupItemSchema = new schema.Entity('lookupParams', {},
                {
                    processStrategy: lookupItemsProcessStrategy,
                    idAttribute: (value, parent, key) => (`${parent.id}-${value.id}`)
                    //idAttribute: 'name'
                });

            const lookupSchema = new schema.Entity('lookups', {
                params: [lookupItemSchema],
            }, { idAttribute: 'column_name', });

            //tags
            const tagItemsProcessStrategy = (value, parent, key) => {
                return {
                    ...value,
                    param_category: 'tag',
                    key: value.id,
                    selectedInItem: false,
                    selectedInFilter: false,
                    selectedInNewItem: false,
                    typeGetterId: parent.local_type_id,
                };
            };

            const tagItemSchema = new schema.Entity('tagParams', {},
                {
                    processStrategy: tagItemsProcessStrategy,
                    idAttribute: 'id'
                });

            const tagSchema = new schema.Entity('tags', {
                params: [tagItemSchema],
            }, { idAttribute: 'id', });


            const typeSchema = new schema.Array(
                {
                    lookups: lookupSchema,
                    tags: tagSchema,
                    filters: filterSchema
                },
                (input, parent, key) => `${input.type_category}s`
            );

            //const mySchema = { typesAndParams: [typeSchema] };
            let normalizedData = normalize(payload, typeSchema);
            //console.log(`normalizedData: ${JSON.stringify(normalizedData, null, 2)}`);
            commit("typesFromApi", normalizedData.result);

            commit("filters", normalizedData.entities.filters);
            commit("filterParams", normalizedData.entities.filterParams);

            commit("lookups", normalizedData.entities.lookups);
            commit("lookupParams", normalizedData.entities.lookupParams);

            commit("tags", normalizedData.entities.tags);
            commit("tagParams", normalizedData.entities.tagParams);
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

            function queryParamsNew() {
                let areas = [];
                let seasons = [];
                let media = [];
                let tagParams = [];
                let lookups = [];
                /*
                                for (const [key, value] of Object.entries(state.filterParams)) {
                                    if (value.selectedInFilter) {
                                        switch (getters["typesAndParams"][value.typeGetterId].name) {
                                            case "Areas":
                                                areas.push(value.name);
                                                break;
                                            case "Seasons":
                                                seasons.push(parseInt(value.name, 10) - 2000);
                                                break;
                                            case "Media":
                                                media.push(value.name);
                                                break;
                                        }
                                    }
                                }
                */
                //format tagParams according to Spatie interface (types with tags).

                getters["filtersSelected"].forEach((type => {
                    switch (type.type_category) {
                        case "filter":
                            switch (type.name) {
                                case "Areas":
                                    areas = type.params.map(x => x.name);
                                    break;
                                case "Seasons":
                                    seasons = type.params.map(x => parseInt(x.name, 10) - 2000);
                                    break;
                                case "Media":
                                    media = type.params.map(x => x.name);
                                    break;
                            }
                            break;
                        case "lookup":
                            lookups.push({ column_name: type.column_name, ids: type.params.map(param => param.id) });
                            break;
                        case "tag":
                            tagParams.push({ type: type.name, tags: type.params.map(tag => { return { id: tag.id, name: tag.name }; }) });
                            break;
                    }

                }));
                return {
                    lookups: lookups,
                    tagParams: tagParams,
                    areas: areas,
                    seasons: seasons,
                    media: media,
                };
            }


            //let activeFilters = state.filterParams.filter(x => x.selectedInFilter);
            //console.log(`query() activeFilters: ${JSON.stringify(activeFilters, null, 2)}`);
            //return;
            if (payload.clear) {
                dispatch("clearFilters");
            }
            return dispatch("mgr/queryCollection", { queryParams: queryParamsNew(), spinner: payload.spinner, gotoCollection: payload.gotoCollection }, { root: true });
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
    },

}