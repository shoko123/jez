//Handles discrete data related to a specific module, either lookup fields or tags with a uniform interface.
//Both are organized as types and related params:
//lookups - field name & ids.
//tags - tag_type & tag name (uses Spatie tagging system). 

import { normalize, schema } from 'normalizr';

export default {
    namespaced: true,
    state: {
        filters: null,
        filterParams: null,
        tags: null,
        tagParams: null,
        lookups: null,
        lookupParams: null,
        typesFromApi: [],

        groupKeys: [],
        groups: {},
        params: {},
    },
    getters: {
        //retrieve currently displayed newItem/filters types with their params.
        //Note that the number of types changes as we select params that enable dependant types.
        //Each param will have a 'selected' property to indicate selection.

        newItem(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isTags) { return []; }

            let types = [];
            let isArtifact = rootGetters["fnd/scale"] === 'Artifact';
            console.log(`aux/newItem`);

            //getters["typesAndParams"].filter(x => x.type_category !== 'filter').forEach(type => {

            getters["typesAndParams"].filter(x => (
                (x.filter_category === 'Module') ||
                (x.filter_category === 'Period'))
            ).forEach(type => {
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

                let add;// = true;

                //show only types that are either independent or those whos 'parent' is selected.

                if ((type.type_category !== "tag") ||
                    (type.type_category === "tag" && type.dependency === null)) {
                    //only tags are dependents, and in tags, only those that have dependency specified.
                    add = true;
                } else {
                    let dep = type.dependency;
                    if (dep.source === "Me") {
                        let myLookupParam = state.lookups[dep.field_name].params.find(x => state.lookupParams[x].name == dep.param_name);
                        if (myLookupParam === undefined) {
                            alert(`lookup ${dep.param_name} not found`);
                            add = true;
                        } else {
                            //console.log(`Filters Dependency(${type.display_name}) field_name: ${dep.field_name} found param: ${JSON.stringify(myLookupParam, null, 2)}`)
                            add = state.lookupParams[myLookupParam].selectedInNewItem;
                        }
                    } else {
                        let myType = state.tags[dep.tag_type_str_id];
                        //console.log(`myType: ${JSON.stringify(myType, null, 2)}`);
                        let myTagParam = state.tags[dep.tag_type_str_id].params.find(x => state.tagParams[x].name == dep.tag_name);

                        //let myLookupParam = myLookUp.params.find(x => state.lookupParams[x].name == dep.param_name);
                        if (myTagParam === undefined) {
                            alert(`tag ${dep.tag_name} not found`);
                            add = true;
                        } else {
                            //console.log(`Filters found param: ${JSON.stringify(myTagParam, null, 2)} adding tab ${type.display_name}`)
                            add = state.tagParams[myTagParam].selectedInNewItem;
                        }
                    }
                }

                if (add) {
                    types.push({
                        id: type.id,
                        name: type.name,
                        display_name: type.display_name,
                        filter_category: type.filter_category,
                        params: paramsForType,
                        noSelected: n,
                        required: type.type_category === 'lookup',
                        multiple: type.type_category === 'lookup' ? false : type.multiple,
                    })
                }
            })
            return types;
        },

        //this getter formats all params into groups+params with selection data in each of the param/selectedIn object.
        all(state, getters, rootState, rootGetters) {

            function lookupDetails(state, rootGetters, group, param) {
                let tableName = (group.column_name === "preservation_id") ? "fnd/item" : "mgr/item";
                let item = rootGetters[tableName];
                return {
                    ...param, selectedIn: {
                        filters: param.selectedIn.filters,
                        itemParams: item ? item[group.column_name] == param.id : false,
                        newParams: item && rootGetters["mgr/status"].isTags ? group.newLookupId == param.id : false,
                    }
                };
            }

            return state.groupKeys.map(key => {
                let group = state.groups[key.id];
                return {
                    ...group,
                    params: group.params.map(k => {
                        let param = state.params[k];
                        switch (group.group_type) {
                            case "Registration":
                            case "Tag":
                                return param;
                            case "Lookup":
                                return lookupDetails(state, rootGetters, group, param);
                        }
                    })
                }
            });
        },

        //helper - internal use
        isVisibleTagGroup: (state) => (group, isFilter) => {
            //console.log(`isVisibleTagGroup(group: ${JSON.stringify(group, null, 2)}, isFilter: ${isFilter})`);
            let d = group.dependency;
            if (d === null) { return true }
            let key;
            let selectedInName = isFilter ? "filters" : "newParams";
            if (d.source === "Tag") {
                key = "T>" + d.tag_type_str_id + ">" + d.id;
            } else {// "Me"
                key = "L>" + d.field_name + ">" + d.id;
            }

            console.log(`checking dependency. key: ${key} selectedInName: ${selectedInName}`);
            //console.log(`isVisible() key: ${key})`);
            let isVisible = state.params[key].selectedIn[selectedInName]
             console.log(`isVisible() key: ${key}), isVisible: ${isVisible}`);
            return state.params[key].selectedIn[selectedInName];
        },

        visibleFilters(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilterable ||
                !rootGetters["mgr/status"].isFilter) { return [] }
            return getters["all"].filter(x => {
                switch (x.group_type) {
                    case "Registration":
                    case "Lookup":
                        return true;
                    case "Tag":
                        return getters["isVisibleTagGroup"](x, true);
                }
                //console.log(`isVisible(${JSON.stringify(group, null, 2)})`);
            })
        },

        //filter according to two criteria:
        //item scope ("artifact" or not)
        //if group_type == "Tag" according to dependency
        visibleNewParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilterable ||
                !rootGetters["mgr/status"].isTags) { return [] };
            let typeIsLookupOrTag = getters["all"].filter(x => (x.group_types !== "Registration"));

            let scopeIsArtifact = (rootGetters["fnd/item"] &&
                rootGetters["fnd/item"].artifact_no !== null &&
                (rootGetters["fnd/item"].piece_no === null));

            let filteredByScope = scopeIsArtifact ? typeIsLookupOrTag :
                typeIsLookupOrTag.filter(x => (x.group_category === "Period") || (x.group_type === "Lookup" && x.name === "Preservation"));

            return filteredByScope.filter(x => {
                switch (x.group_type) {
                    case "Lookup":
                        return true;
                    case "Tag":
                        return getters["isVisibleTagGroup"](x, false);
                }
            })
        },



        selectedFilters(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilterable ||
                !["filter", "show", "list",].includes(rootGetters["mgr/status"].action)) { return [] }

            return getters["all"].filter(x => {
                return x.params.some(x => x.selectedIn["filters"]);
            }).map(x => {
                //let selectedParams = x.params.filter(y => y.selectedIn("filters"));
                let selectedParams = x.params
                    .filter(y => y.selectedIn["filters"])
                    .map(({ selectedIn, ...y }) => y)
                let group = { ...x };
                delete group.params
                group.selected = selectedParams;
                return group;
            })

            //remove and add properties to objects in an array
            //array.map(({ dropAttr1, dropAttr2, ...keepAttrs }) => keepAttrs)
            //Results.map(obj => ({ ...obj, Active: 'false' }))


        },

        selectedItemParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isShow || !rootGetters["mgr/item"]) { return [] };
            return getters["all"].filter(x => {
                return x.params.some(x => x.selectedIn["itemParams"]);
            })
            .map(x => {
                let selectedParams = x.params
                    .filter(y => y.selectedIn["itemParams"])
                    .map(({ selectedIn, ...y }) => y)
                let group = { ...x };
                delete group.params
                group.selected = selectedParams;
                return group;
            })
        },
        selectedNewParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isTags) { return [] };
            return getters["all"];
        },
        filterCategories(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilter) { return [] };
            return getters["all"];
        },
        
        filters(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilter) { return []; }


            console.log(`aux/filters`);
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
                let add;// = true;

                //show only types that are either independent or those whos 'parent' is selected.

                if ((type.type_category !== "tag") ||
                    (type.type_category === "tag" && type.dependency === null)) {
                    //only tags are dependents, and in tags, only those that have dependency specified.
                    add = true;
                } else {
                    let dep = type.dependency;
                    if (dep.source === "Me") {
                        let myLookupParam = state.lookups[dep.field_name].params.find(x => state.lookupParams[x].name == dep.param_name);
                        if (myLookupParam === undefined) {
                            alert(`lookup ${dep.param_name} not found`);
                            add = true;
                        } else {
                            //console.log(`Filters Dependency(${type.display_name}) field_name: ${dep.field_name} found param: ${JSON.stringify(myLookupParam, null, 2)}`)
                            add = state.lookupParams[myLookupParam].selectedInFilter;
                        }
                    } else {
                        let myType = state.tags[dep.tag_type_str_id];
                        //console.log(`tag_type_str_id: ${dep.tag_type_str_id}\nmyType: ${JSON.stringify(myType, null, 2)}`);
                        let myTagParam = state.tags[dep.tag_type_str_id].params.find(x => state.tagParams[x].name == dep.tag_name);

                        //let myLookupParam = myLookUp.params.find(x => state.lookupParams[x].name == dep.param_name);
                        if (myTagParam === undefined) {
                            alert(`tag ${dep.tag_name} not found`);
                            add = true;
                        } else {
                            //console.log(`Filters found param: ${JSON.stringify(myTagParam, null, 2)} adding tab ${type.display_name}`)
                            add = state.tagParams[myTagParam].selectedInFilter;
                        }
                    }
                }

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
        filtersGeneral(state, getters) {
            return getters["filters"].filter(x => x.filter_category === 'General');
        },
        filtersModule(state, getters) {
            return getters["filters"].filter(x => x.filter_category === 'Module');
        },
        filtersPeriod(state, getters) {
            return getters["filters"].filter(x => x.filter_category === 'Period');

        },

        itemSelected(state, getters, rootState, rootGetters) {
            let types = [];
            //let tags = getters["typesAndParams"].filter(x => (x.type_category === 'tag' || x.type_category === 'lookup'));

            let isArtifact = rootGetters["fnd/scale"] === 'Artifact';

            let tags = getters["typesAndParams"].filter(x => (
                (x.filter_category === 'Module' && isArtifact) ||
                (x.filter_category === 'Period'))
            )

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
                        id: (type.type_category === 'tag') ? type.str_id : type.id,
                        name: (type.type_category === 'tag') ? type.str_id : type.name,
                        display_name: type.display_name,
                        type_category: type.type_category,
                        filter_category: type.filter_category,
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
                    let typeToPush = {
                        id: (type.type_category === 'tag') ? type.str_id : type.id,
                        name: (type.type_category === 'tag') ? type.str_id : type.name,
                        display_name: type.display_name,
                        type_category: type.type_category,
                        filter_category: type.filter_category,
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

                filtersGeneral: getters["filtersSelected"].filter(x => x.filter_category === 'General').reduce(
                    (accumulator, type) => accumulator + type.noSelected,
                    0//item: (rootGetters[lookupTable][state.groups[key.id].column_name] == state.params[k].id),
                ),
                filtersModule: getters["filtersSelected"].filter(x => x.filter_category === 'Module').reduce(
                    (accumulator, type) => accumulator + type.noSelected,
                    0
                ),
                filtersPeriod: getters["filtersSelected"].filter(x => x.filter_category === 'Period').reduce(
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

        groupKeys(state, payload) {
            state.groupKeys = payload;
        },
        groupsAddProperties(state, payload) {
            console.log(`commit(groups) ${JSON.stringify(payload, null, 2)}`);
            state.groups = Object.assign({}, state.groups, payload);
        },
        paramsAddProperties(state, payload) {
            state.params = Object.assign({}, state.params, payload);
            //state.params = payload;
        },
        clearGroupsAndParams(state, payload) {
            state.groups = Object.assign({}, {});
            state.params = Object.assign({}, {});
        },


        //used to update a selection status of a parameter
        select(state, payload) {
            //console.log(`select() payload: ${JSON.stringify(payload, null, 2)}`);
            state[payload.name][payload.key] = { ...payload.value };
        },

        clearParams(state, payload) {
            for (const [key, value] of Object.entries(state.params)) {
                if (payload) {
                    value.selectedIn["filters"] = false;
                } else {
                    if (value.groupKey.charAt(0) === "T") {
                        value.selectedIn["itemParams"] = false;
                        value.selectedIn["newParams"] = false;
                    }
                }
            }
        },

        selectParam(state, payload) {
            state.params[payload.key]["selectedIn"][payload.source] = payload.value;
        },
    },

    actions: {
        //called when a new item is loaded. Deals only with tags (not lookups).
        //in one loop we both clear old selection and assign new.
        itemTagIds({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/itemTagIds: ${JSON.stringify(payload, null, 2)}`);
            let unSyncedIds = payload.slice()
            //TODO - in one loop
            for (const [key, value] of Object.entries(state.tagParams)) {
                let newParam = { ...value };
                let needsSync = false;
                newParam.selectedInNewItem = false;
                let index = payload.indexOf(value.id);

                if (index === -1) {
                    if (value.selectedInItem || value.selectedInNewItem) {
                        needsSync = true;
                        newParam.selectedInItem = false;
                    }
                } else {
                    unSyncedIds.splice(index, 1);
                    if (!value.selectedInItem) {
                        newParam.selectedInItem = true;
                        needsSync = true;
                    }
                }
                if (needsSync) {
                    commit("select", {
                        name: `tagParams`,
                        key: key,
                        value: newParam
                    });
                }
            }

        },

        itemTags({ state, getters, rootGetters, commit, dispatch }, payload) {
            commit("clearParams", false);//clear itemParams (not filters)
            payload.forEach(x => {
                commit("selectParam", {key: x.key, source: "itemParams", value: true});
            })
        },

        syncItemLookupsWithDiscreteRepresentation({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/syncItemWithDiscrete: ${JSON.stringify(state.lookupParams, null, 2)}`);
            let item = rootGetters["mgr/item"];

            //we use find only for preservation_id
            let find = rootGetters["fnd/item"];

            for (const [key, value] of Object.entries(state.lookups)) {
                //console.log(`**** aux/syncLookups(${value.column_name})`);
                let paramId = item[value.column_name];
                let paramName = item[value.item_name_field];

                //console.log(`ParamId: ${paramId} ParamName: ${paramName} params: ${JSON.stringify(value.params, null, 2)}`);

                value.params.forEach(function (x, index) {
                    let newParam = { ...state.lookupParams[x] };
                    let needsSync = false;
                    newParam.selectedInNewItem = false;

                    //required column name is in item. preservation_id is in find!
                    if (state.lookupParams[x].id === item[value.column_name] || state.lookupParams[x].id === find[value.column_name]) {
                        if (!newParam.selectedInItem) {
                            needsSync = true;
                            newParam.selectedInItem = true;
                        }
                    } else {
                        if (newParam.selectedInItem) {
                            needsSync = true;
                            newParam.selectedInItem = false;
                        }
                    }
                    if (needsSync) {
                        commit("select", {
                            name: `lookupParams`,
                            key: x,
                            value: newParam
                        });
                    }
                })
            }
        },
        //
        toggleOneParam({ state, getters, rootGetters, commit, dispatch }, payload) {
            let group = state.groups[payload.param.groupKey];
            switch(group.group_type){
                case "Registration":
                case "Lookup":

               

                case "Tag":
            }
        },

        toggleParam({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/toggleParam(): ${JSON.stringify(payload, null, 2)}`);
            let isFilterNotNewItem = rootGetters["mgr/status"].isFilter;
            let parent = getters["typesAndParams"][payload.typeGetterId];
            let name = `${payload.param_category}Params`;
            let key = payload.key;
            if (isFilterNotNewItem || payload.param_category === 'tag') {

                let newParam = { ...state[name][key] };

                let currentlySelected = isFilterNotNewItem ? newParam.selectedInFilter : newParam.selectedInNewItem;
                newParam[isFilterNotNewItem ? `selectedInFilter` : `selectedInNewItem`] = !currentlySelected;
                commit("select", {
                    name: name,
                    key: key,
                    value: newParam
                });

                if (currentlySelected) {
                    //if a lookup or a tag is unselected and it has dependents -> unselect them.
                    //find all tagTypes that are dependent on this param

                    let allDependents = getters["typesAndParams"].filter(x => x.type_category === 'tag' && x.dependency !== null);

                    let tagDependents = allDependents.filter(x => {
                        return ((x.dependency.source === "Me") &&
                            x.dependency.field_name === parent.column_name &&
                            x.dependency.param_name === newParam.name) ||
                            ((x.dependency.source === "Tag") &&
                                x.dependency.tag_type_str_id === parent.str_id &&
                                x.dependency.tag_name === newParam.name)
                    });
                    //console.log(`my dependets: ${JSON.stringify(tagDependents, null, 2)}`);
                    //console.log(`tags dependencies: ${JSON.stringify(tagDependents, null, 2)}`);
                    tagDependents.forEach(x => {
                        let name = `${x.type_category}Params`;

                        x.params.forEach(y => {
                            let newParam = { ...state[name][y.key] };
                            newParam.selectedInFilter = false;
                            commit("select", {
                                name: name,
                                key: newParam.key,
                                value: newParam
                            });
                        });
                    });
                }

            } else {
                let keyToSelect = payload.key;
                let paramToSelect = { ...state[name][keyToSelect] };
                if (paramToSelect.selectedInNewItem) {
                    //if already selected - do nothing
                    return;
                }
                paramToSelect.selectedInNewItem = true;

                let gettersParamToUnSelect = getters["typesAndParams"][payload.typeGetterId].params.find(x => x.selectedInNewItem);
                let keyToUnSelect = gettersParamToUnSelect.key;

                //unselect the currently selected, and then select this param.             
                let paramToUnSelect = { ...state[name][keyToUnSelect] };
                paramToUnSelect.selectedInNewItem = false;

                console.log(`tagger(newItem) select: ${JSON.stringify(paramToSelect, null, 2)}\nUnSelect: ${JSON.stringify(paramToUnSelect, null, 2)}`);

                //select current              
                commit("select", {
                    name: name,
                    key: keyToSelect,
                    value: paramToSelect
                });

                //unselect currently selected               
                commit("select", {
                    name: name,
                    key: keyToUnSelect,
                    value: paramToUnSelect
                });


                //unselect dependents
                let allDependents = getters["typesAndParams"].filter(x => x.type_category === 'tag' && x.dependency !== null);
                let tagDependents = allDependents.filter(x => {
                    return ((x.dependency.source === "Me") &&
                        x.dependency.field_name === parent.column_name &&
                        x.dependency.param_name === paramToUnSelect.name) ||
                        ((x.dependency.source === "Tag") &&
                            x.dependency.tag_type_str_id === parent.str_id &&
                            x.dependency.tag_name === paramToUnSelect.name)
                });
                //console.log(`my dependets: ${JSON.stringify(tagDependents, null, 2)}`);registrationGroupSchema
                //console.log(`tags dependencies: ${JSON.stringify(tagDependents, null, 2)}`);
                tagDependents.forEach(x => {
                    let name = `${x.type_category}Params`;

                    x.params.forEach(y => {
                        let newParam = { ...state[name][y.key] };
                        newParam.selectedInNewItem = false;
                        commit("select", {
                            name: name,
                            key: newParam.key,
                            value: newParam
                        });
                    });
                });

            }
        },
        unSelectDependents({ state, getters, commit, }, typeId) {

        },
        newItemTabInit({ state, getters, rootGetters, commit, dispatch }, typeId) {
            console.log(`aux/newItemTabInit(${typeId})`);
            /*
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
            */
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

        prepareTagger({ state, commit, dispatch }) {
            console.log("aux/prepareTagger (copy item -> newItem)");
            dispatch('fnd/prepare', true, { root: true });
            let paramCategories = ["tagParams", "lookupParams"];

            paramCategories.forEach(cat => {
                if (typeof state[cat] !== "undefined") {
                    for (const [key, value] of Object.entries(state[cat])) {
                        let newValue = { ...value };
                        newValue.selectedInNewItem = newValue.selectedInItem;
                        commit("select", {
                            name: cat,
                            key: key,
                            value: newValue
                        });
                    }
                }
            })
        },

        groups({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/savetypesAndParams() payload: ${JSON.stringify(payload, null, 2)}`);

            const registrationParamSchema = new schema.Entity('registrationParams', {}, {
                idAttribute: (value, parent, key) => `R>${parent.name}>${value.name}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        groupKey: `R>${parent.name}`,
                        selectedIn: { filters: false },
                    };
                },
            });

            const registrationGroupSchema = new schema.Entity('registrationGroups', {
                params: [registrationParamSchema],
            }, {
                idAttribute: (value, parent, key) => `R>${value.name}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `R>${value.name}`,
                        //selectedFilterParamKeys: [],
                    };
                },
            });

            //lookups
            const lookupParamSchema = new schema.Entity('lookupParams', {}, {
                idAttribute: (value, parent, key) => `L>${parent.column_name}>${value.id}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        groupKey: `L>${parent.column_name}`,
                        selectedIn: { filters: false },
                        affectsTagGroups: null,
                    };
                },
            });

            const lookupGroupSchema = new schema.Entity('lookupGroups', {
                params: [lookupParamSchema],
            }, {
                idAttribute: (value, parent, key) => `L>${value.column_name}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `L>${value.column_name}`,
                        newLookupId: 1,
                    };
                },
            });

            //tags
            const tagParamSchema = new schema.Entity('tagParams', {}, {
                idAttribute: (value, parent, key) => `T>${parent.str_id}>${value.id}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `T>${parent.str_id}>${value.id}`,
                        groupKey: `T>${parent.str_id}`,
                        selectedIn: { filters: false, itemParams: false, newParams: false },
                        affectsTagGroups: null,
                    };
                },
            });

            const tagGroupSchema = new schema.Entity('tagGroups', {
                params: [tagParamSchema],
            }, {
                idAttribute: (value, parent, key) => `T>${value.str_id}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `T>${value.str_id}`,
                    };
                },
            });

            const typeSchema = new schema.Array(
                {
                    Registration: registrationGroupSchema,
                    Lookup: lookupGroupSchema,
                    Tag: tagGroupSchema,
                },
                (input, parent, key) => input.group_type
            );

            //const mySchema = { typesAndParams: [typeSchema] };
            let normalizedData = normalize(payload, typeSchema);
            //console.log(`normalizedData: ${JSON.stringify(normalizedData, null, 2)}`);
            commit("clearGroupsAndParams", null);
            commit("groupKeys", normalizedData.result);

            commit("groupsAddProperties", normalizedData.entities.registrationGroups);
            commit("groupsAddProperties", normalizedData.entities.lookupGroups);
            commit("groupsAddProperties", normalizedData.entities.tagGroups);

            commit("paramsAddProperties", normalizedData.entities.registrationParams);
            commit("paramsAddProperties", normalizedData.entities.lookupParams);
            commit("paramsAddProperties", normalizedData.entities.tagParams);

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
                    //idAttribute: 'id'
                });

            const tagSchema = new schema.Entity('tags', {
                params: [tagItemSchema],
            }, { idAttribute: 'str_id', });


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
                let areas = [];
                let seasons = [];
                let media = [];
                let tagParams = [];
                let lookups = [];

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
                            //format to objects with column_name and id array.
                            lookups.push({ column_name: type.column_name, ids: type.params.map(param => param.id) });
                            break;
                        case "tag":
                            //format tagParams according to Spatie interface (types with tags).
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
            return dispatch("mgr/queryCollection", { queryParams: queryParams(), spinner: payload.spinner, gotoCollection: payload.gotoCollection }, { root: true });
        },

        sync({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log("aux/sync");
            let tagsToSync = [];
            let tags = getters["typesAndParams"].filter(x => x.type_category === 'tag');
            tags.forEach(x => {
                let needsSync = false;
                let selectedTags = [];
                x.params.forEach(y => {
                    if (state.tagParams[y.key].selectedInNewItem !== state.tagParams[y.key].selectedInItem) {
                        needsSync = true;
                    }
                })
                if (needsSync) {
                    x.params.filter(y => state.tagParams[y.key].selectedInNewItem).forEach(param => {
                        selectedTags.push({ id: param.id, name: param.name })
                    });
                    tagsToSync.push({
                        type: x.str_id,
                        tags: selectedTags
                    });
                }
            })


            let needToUpdateItemRecord = false;
            let newLookups = [];
            let lookups = getters["typesAndParams"].filter(x => x.type_category === 'lookup');
            lookups.forEach(x => {
                let lookup = {};
                let newId = null;
                x.params.forEach(y => {
                    if (state.lookupParams[y.key].selectedInNewItem !== state.lookupParams[y.key].selectedInItem) {
                        needToUpdateItemRecord = true;
                    }
                    if (state.lookupParams[y.key].selectedInNewItem) {
                        newId = state.lookupParams[y.key].id;
                    }
                })
                lookup.column_name = x.column_name;
                lookup.id = newId;
                newLookups.push(lookup);
            });

            if (needToUpdateItemRecord) {

                console.log("aux/Update newLookups: " + JSON.stringify(newLookups, null, 2))

                let moduleName = rootGetters["mgr/moduleInfo"].storeModuleName;
                //dispatch('fnd/prepare', true, { root: true });
                dispatch(`${moduleName}/prepare`, true, { root: true });

                newLookups.forEach(x => {
                    if (x.column_name === "preservation_id") {
                        let commitName = `fnd/${x.column_name}`;
                        console.log("commit preservation_id: " + commitName + " id: " + x.id);
                        commit(commitName, x.id, { root: true });
                    } else {
                        let commitName = `${moduleName}/${x.column_name}`;
                        console.log("commitName: " + commitName + " id: " + x.id);
                        commit(commitName, x.id, { root: true });
                    }
                });
                let newItem = rootGetters[`${moduleName}/newItem`];
                let newFind = rootGetters["fnd/newItem"];
                console.log("aux/Update item: " + JSON.stringify(newItem, null, 2));
                console.log("aux/Update find: " + JSON.stringify(newFind, null, 2));
                dispatch("mgr/store", false, { root: true }).then(res => {
                    console.log("aux - discrete data updated successfully");
                    //dispatch('aux/itemTagIds', res.data.tagIds, { root: true });
                    dispatch('syncItemLookupsWithDiscreteRepresentation', null);
                });
            }

            /*
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
            */
            ////////
            console.log("aux/tagsToSync: " + JSON.stringify(tagsToSync, null, 2));
            //sync only if there is anything to sync.
            if (tagsToSync.length > 0) {
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
                        dispatch('itemTagIds', res.data.tagIds);
                        return res;
                    })
                    .catch(err => {
                        console.log('mgr/store err: ' + err);
                        return err;
                    }).finally(() => {
                        //go back to item
                        rootGetters["getRouter"].go(-1);
                    });
            } else {
                rootGetters["getRouter"].go(-1);
            }
        },
    },

}