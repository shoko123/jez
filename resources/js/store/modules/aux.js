//Handles discrete data related to a specific module, either lookup fields or tags with a uniform interface.
//Both are organized as groups and related params:
//lookups - field name & ids.
//tags - tag_type & tag name (uses Spatie tagging system). 

import normalizeGroups from './aux_groups.js';
export default {
    namespaced: true,
    modules: {
        normalizeGroups: normalizeGroups,
    },
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
        //this getter formats all params into groups+params with selection data in each of the param/selectedIn object.
        all(state, getters, rootState, rootGetters) {

            function lookupDetails(state, rootGetters, group, param) {
                let lookupSource = (group.column_name === "preservation_id") ? "fnd/item" : "mgr/item";
                let item = rootGetters[lookupSource];
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

        isVisibleTagGroup: (state) => (group, isFilter) => {
            function isSelected(d, isFilter) {
                if (d.charAt(0) === "T") {
                    //console.log(`isVisibleTagGroup: ${JSON.stringify(d, null, 2)}, isFilter: ${isFilter})`);
                    return state.params[d].selectedIn[isFilter ? "filters" : "newParams"];
                } else {
                    if (isFilter) {

                        return state.params[d].selectedIn["filters"];
                    } else {
                        let chopped = d.split(">");
                        let groupKey = "L>" + chopped[1];
                        return (state.groups[groupKey].newLookupId === parseInt(chopped[2]));
                    }
                }
            }

            let ds = group.dependency;
            //console.log(`isVisibleTagGrop(${group.key}) dependency: ${JSON.stringify(ds, null, 2)}, isFilter: ${isFilter})`);

            if (ds === null) { return true }
            return ds.every(x => { return x.some(y => { return isSelected(y, isFilter) }) });

        },

        visibleFilters(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilterable) { return [] }
            return getters["all"].filter(x => {
                switch (x.group_type) {
                    case "Registration":
                    case "Lookup":
                        return true;
                    case "Tag":
                        return getters["isVisibleTagGroup"](x, true);
                }
            }).map(x => {
                //let selectedParams = x.params.filter(y => y.selectedIn("filters"));            
                let group = { ...x };
                group.count = x.params.filter(y => y.selectedIn["filters"]).length;
                return group;
            })
        },

        //filter according to two criteria:
        //item scope ("artifact" or not)
        //if group_type == "Tag" according to dependency
        visibleNewParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isFilterable ||
                !rootGetters["mgr/status"].isTags) { return [] };

            //f1 - not registration
            let f1 = getters["all"].filter(x => (x.group_types !== "Registration"));

            let scopeIsArtifact = (rootGetters["fnd/item"] &&
                rootGetters["fnd/item"].artifact_no !== 0);

            //f2 - filter by scope: non artifacts see only periods tags ???
            let f2 = scopeIsArtifact ? f1 :
                f1.filter(x => (x.category === "Period"));

            //f3 - all remaining lookups, and visible newParams tags.
            return f2.filter(x => {

                switch (x.group_type) {
                    case "Lookup":
                        return true;
                    case "Tag":
                        return getters["isVisibleTagGroup"](x, false);
                }
            }).map(x => {
                return {
                    ...x,
                    required: x.group_type === "Lookup", multiple: x.group_type === "Tag" && x.multiple,
                    count: x.params.filter(y => y.selectedIn["newParams"]).length
                }
            });
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
                group.params = selectedParams;
                group.count = selectedParams.length;
                return group;
            })
        },

        selectedItemParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isShow || !rootGetters["mgr/item"]) { return [] };
            let scopeIsBasket = (rootGetters["mgr/status"].isFind &&
                rootGetters["fnd/item"] &&
                rootGetters["fnd/item"].basket_no > 0 &&
                (rootGetters["fnd/item"].artifact_no === 0));

            //2 filters:
            // (1) if scope is basket (currently only Pottery) allow only period tags.
            //(this will change with other modules [think Flora])
            // (2) allow only selected
            return getters["all"].filter(x => {
                return scopeIsBasket ? x.category === "Period" : true;
            }).filter(x => {
                return x.params.some(x => x.selectedIn["itemParams"]);
            }).map(x => {
                let selectedParams = x.params
                    .filter(y => y.selectedIn["itemParams"])
                    .map(({ selectedIn, ...y }) => y)
                let group = { ...x };

                group.params = selectedParams;
                group.count = selectedParams.length;
                return group;
            })
        },

        selectedNewParams(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isTags) { return [] };
            return getters["all"].filter(x => {
                return x.params.some(x => x.selectedIn["newParams"]);
            })
                .map(x => {
                    let selectedParams = x.params
                        .filter(y => y.selectedIn["newParams"])
                        .map(({ selectedIn, ...y }) => y)
                    let group = { ...x };

                    group.params = selectedParams;
                    group.count = selectedParams.length;
                    return group;
                });
        },

        categories: (state, getters) => (isFilter) => {
            let name = isFilter ? "Filters" : "NewParams"
            return [...new Set(getters[`visible${name}`].map(x => x.category))]
                .map(y => {
                    return {
                        name: y,
                        selectedCount: getters[`selected${name}`].filter(x => x.category === y).reduce(
                            (accumulator, type) => accumulator + type.count,
                            0
                        )
                    }
                });
        },

        categoriesFilter(state, getters) {
            return [...new Set(getters[`visibleFilters`].map(x => x.category))]
                .map(y => {
                    return {
                        name: y,
                        selectedCount: getters[`selectedFilters`].filter(x => x.category === y).reduce(
                            (accumulator, type) => accumulator + type.count,
                            0
                        )
                    }
                });
        },
        categoriesNewParams(state, getters) {
            return [...new Set(getters[`visibleNewParams`].map(x => x.category))]
                .map(y => {
                    return {
                        name: y,
                        selectedCount: getters[`selectedNewParams`].filter(x => x.category === y).reduce(
                            (accumulator, type) => accumulator + type.count,
                            0
                        )
                    }
                });
        },

        groupsForCategory: (state, getters) => (category, isFilter) => {
            let name = isFilter ? "visibleFilters" : "visibleNewParams";
            return getters[name].filter(x => x.category === category);
        },

        lookupNames(state, getters) {
            return getters["all"].filter(x => x.group_type === "Lookup").map(y => y.column_name);
        },
    },

    mutations: {
        groupKeys(state, payload) {
            state.groupKeys = payload;
        },
        groupsAddProperties(state, payload) {
            //console.log(`commit(groups) ${JSON.stringify(payload, null, 2)}`);
            state.groups = Object.assign({}, state.groups, payload);
        },
        paramsAddProperties(state, payload) {
            state.params = Object.assign({}, state.params, payload);
            //state.params = payload;
        },
        clearGroupsAndParams(state, payload) {
            //console.log(`aux/clearGroupsAndParams`);//(groups) ${JSON.stringify(payload, null, 2)}`);
            state.groups = Object.assign({}, {});
            state.params = Object.assign({}, {});
        },
        paramAffectsAddTagGroups(state, payload) {
            //console.log(`paramAffectsAddTagGroups()\nkey: ${payload.paramKey}\naffects: ${JSON.stringify(payload.affects, null, 2)}`);
            state.params[payload.paramKey].affectsTagGroups.push(payload.affects);
        },

        clear(state, payload) {
            let filters = payload.includes("filters");
            let itemParams = payload.includes("itemParams");
            let newParams = payload.includes("newParams");

            for (const [key, value] of Object.entries(state.params)) {
                if (filters && value.selectedIn["filters"]) {
                    value.selectedIn["filters"] = false;
                }
                if (value.groupKey.charAt(0) === "T") {
                    if (itemParams && value.selectedIn["itemParams"]) {
                        value.selectedIn["itemParams"] = false;
                    }
                    if (newParams && value.selectedIn["newParams"]) {
                        value.selectedIn["newParams"] = false;
                    }
                }
            }
        },

        selectParam(state, payload) {
            //console.log(`******selectParam()\npayload: ${JSON.stringify(payload, null, 2)}`);

            let group = state.groups[(state.params[payload.key]).groupKey];
            switch (group.group_type) {
                case "Registration":
                case "Tag":
                    state.params[payload.key]["selectedIn"][payload.source] = payload.value;
                    break;

                case "Lookup":
                    if (payload.source === "filters") {
                        state.params[payload.key]["selectedIn"][payload.source] = payload.value;
                    }
                    else {//newParams
                        group.newLookupId = payload.value;
                    }
                    break;
            }
        },

    },

    actions: {
        itemTags({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/itemTags: ${JSON.stringify(payload, null, 2)}`);
            commit("clear", ["itemParams"]);//clear itemParams (not filters)
            payload.forEach(x => {
                commit("selectParam", {
                    key: `T>${x.id}`,
                    source: "itemParams",
                    value: true
                });
            });
        },

        setLocalFilters({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/setLocalFilters: ${JSON.stringify(payload, null, 2)}`);
            commit("clear", ["filters"]);

            //set filters from queryString
            if (payload !== null) {
                payload.forEach(x => commit("selectParam", {
                    key: x,
                    source: "filters",
                    value: true
                }));
            }
        },


        toggleOneParam({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/toggleOneParam(): payload: ${JSON.stringify(payload, null, 2)}`);

            function unselectDependencies(payload) {
                //console.log(`unselectDependencies: payload: ${JSON.stringify(payload, null, 2)}`);

                state.params[payload.paramKey].affectsTagGroups.forEach(g => {
                    state.groups[g].params.forEach(gp => {
                        if (state.params[gp].selectedIn[payload.isFilter ? "filters" : "newParams"]) {
                            //console.log(`unselect param ${state.params[gp].key}`);
                            commit("selectParam", { key: state.params[gp].key, source: payload.isFilter ? "filters" : "newParams", value: false });

                            //recursively unselect dependants
                            if (state.params[gp].affectsTagGroups.length > 0) {
                                unselectDependencies({ paramKey: state.params[gp].key, isFilter: payload.isFilter });
                            }
                        }
                    })

                });
            }

            let param = state.params[payload.key];
            let group = state.groups[param.groupKey];
            let selectedInName = payload.isFilter ? "filters" : "newParams";
            let currentValue = param.selectedIn[selectedInName];

            //console.log(`aux/toggleOneParam(): group: ${JSON.stringify(group, null, 2)}`);
            //console.log(`param: ${JSON.stringify(param, null, 2)}`);
            //console.log(`selectedInName: ${selectedInName}`);
            switch (group.group_type) {
                case "Registration":
                    commit("selectParam", { key: payload.key, source: selectedInName, value: !currentValue });
                    break;


                case "Lookup":

                    if (payload.isFilter) {
                        commit("selectParam", { key: payload.key, source: "filters", value: !currentValue });
                        if (currentValue && param.affectsTagGroups.length > 0) {
                            unselectDependencies({ paramKey: payload.key, isFilter: payload.isFilter });
                        }
                    } else {
                        //on Lookup newParams value is saved in the group.newLookupId field.

                        let currentId = group.newLookupId;
                        let newId = param.id;
                        //console.log(`aux/toggleLookup() current id: ${currentId} new id: ${newId}`);

                        //if already selected, don't unselect.
                        if (currentId === newId) { return; }

                        //select the new param.
                        commit("selectParam", { key: payload.key, source: "newParams", value: newId });

                        //unselect dependencies.
                        let currentlySelectedParamKey = group.key + ">" + currentId;
                        unselectDependencies({ paramKey: currentlySelectedParamKey, isFilter: false });
                    }
                    break;
                case "Tag":
                    if (payload.isFilter) {
                        //currentValue = param.selectedIn[selectedInName];
                        commit("selectParam", { key: payload.key, source: "filters", value: !currentValue });
                        if (currentValue && param.affectsTagGroups.length > 0) {
                            unselectDependencies({ paramKey: payload.key, isFilter: payload.isFilter });
                        }
                    } else {
                        //newParams

                        //Tag groups have a "multiple" property that dictate how a tag should be toggled.
                        if (group.multiple) {
                            commit("selectParam", { key: payload.key, source: selectedInName, value: !currentValue });
                            if (currentValue && param.affectsTagGroups.length > 0) {
                                unselectDependencies({ paramKey: payload.key, isFilter: payload.isFilter });
                            }
                        } else {
                            //find the currently selected param
                            let currentlySelectedParamKey = group.params.find(x => state.params[x].selectedIn["newParams"]);
                            if (currentlySelectedParamKey === undefined) {
                                //select the new param.
                                commit("selectParam", { key: payload.key, source: "newParams", value: true });
                            } else {
                                console.log(`Toggle(Tag,single) currently selected param: ${JSON.stringify(currentlySelectedParamKey, null, 2)}`);

                                //select the new param (unless already selected)
                                if (currentlySelectedParamKey !== payload.key) {
                                    commit("selectParam", { key: payload.key, source: "newParams", value: true });
                                }
                                //unselect the currently selected param 
                                commit("selectParam", { key: currentlySelectedParamKey, source: "newParams", value: false });

                                //unselect dependencies.
                                unselectDependencies({ paramKey: currentlySelectedParamKey, isFilter: false });
                            }
                        }
                    }
            }
        },

        clearFilters({ state, commit }) {
            commit("clear", ["filters"]);
        },

        prepareTagger({ state, rootState, getters, rootGetters, commit, dispatch }) {
            //console.log("aux/prepareTagger (copy item -> newItem)");
            //dispatch('fnd/prepare', true, { root: true });
            //copy lookup field values to group.newLookupId
            getters["all"].forEach(g => {
                switch (g.group_type) {
                    case "Registration":
                        break;

                    case "Lookup":
                        let newId = (g.column_name === "preservation_id") ?
                            rootGetters["fnd/item"]["preservation_id"] :
                            rootGetters["mgr/item"][g.column_name];
                        commit("selectParam", {
                            key: g.key + ">" + newId,
                            source: "newParams",
                            value: newId
                        });
                        break;

                    case "Tag":
                        g.params.forEach(p => {
                            if (p["selectedIn"]["newParams"] !== p["selectedIn"]["itemParams"]) {
                                commit("selectParam", {
                                    key: p.key,
                                    source: "newParams",
                                    value: p["selectedIn"]["itemParams"],
                                });
                            }
                        })
                        break;
                }
            })
        },

        groups({ state, getters, rootGetters, commit, dispatch }, payload) {
            dispatch("normalizeGroups", payload);
        },

        sync({ state, getters, rootGetters, commit, dispatch }, payload) {
            //First define the two db access functions (one for tags, one for lookup columns).
            //Entry point is below them.
            function syncTags(state, getters, rootGetters, params) {
                let tagsToSync = [];
                params.tagGroupsToSync.forEach(x => { tagsToSync.push({ type: x.type, tags: x.tags }) });

                console.log(`aux/sync(${params.isGlobalTag ? "Global" : "Module"}) groups: ${JSON.stringify(tagsToSync, null, 2)}`);

                let xhrRequest = {
                    endpoint: params.isGlobalTag ? `/api/tags/sync` : `/api/tags/sync-module`,
                    action: `post`,
                    data: {
                        digModel: rootGetters["mgr/module"],
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
                        console.log(`syncTags(${params.isGlobalTag ? "Global" : "Module"}) returned - success`);
                        return res;
                    })
                    .catch(err => {
                        console.log(`syncTags(${params.isGlobalTag ? "Global" : "Module"}) error: ${err}`);
                        return err;
                    })
            }

            function updateLookups(state, getters, rootGetters, lookupGroupsToUpdate) {
               
                let list = [];
                lookupGroupsToUpdate.forEach(x => { list.push({ column_name: x.column_name, id: x.id }) });
                let xhrRequest = {
                    endpoint: `/api/tags/lookups`,
                    action: `put`,
                    data: {
                        digModel: rootGetters["mgr/module"],
                        id: rootGetters["mgr/item"].id,
                        list: list,
                    },
                    spinner: true,
                    verbose: false,
                    snackbar: { onSuccess: true, onFailure: true, },
                    messages: { loading: "updating lookups tags", onSuccess: `lookup updated sucessfully`, onFailure: `failed to update lookups`, },
                };

                return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then(res => {
                        console.log(`updateLookups() returned - success`);
                        return res;
                    })
                    .catch(err => {
                        console.log(`updateLookups() error: ${err}`);
                        return err;
                    })
            }

            //start here
            let groupsToSync = getters["all"]
                .filter(x => {
                    switch (x.group_type) {
                        case "Registration":
                            return false;
                        case "Lookup":
                        case "Tag":
                            return x.params.some(y => y["selectedIn"]["itemParams"] !== y["selectedIn"]["newParams"]);
                    }
                })
                .map(x => {
                    switch (x.group_type) {
                        case "Lookup":
                            return { group_type: "Lookup", column_name: x.column_name, id: x.newLookupId };
                        case "Tag":

                            return { group_type: x.isGlobalTag ? "GlobalTag" : "ModuleTag", type: x.str_id, tags: x.params.filter(y => y["selectedIn"]["newParams"]).map(y => { return { id: y.id, name: y.name } }) }
                    }
                });

            let globalTagGroupsToSync = groupsToSync.filter(x => x.group_type === "GlobalTag");
            let moduleTagGroupsToSync = groupsToSync.filter(x => x.group_type === "ModuleTag");
            let lookupGroupsToUpdate = groupsToSync.filter(x => x.group_type === "Lookup");
            let requiresGlobalTagsSync = globalTagGroupsToSync.length > 0;
            let requiresModuleTagsSync = moduleTagGroupsToSync.length > 0;

            let requiresUpdateItem = lookupGroupsToUpdate.length > 0;

            console.log(`sync() global tags: ${globalTagGroupsToSync.length > 0} module tags: ${moduleTagGroupsToSync.length > 0} lookups: ${lookupGroupsToUpdate.length > 0}`);


            //////////////////
            var p1 = requiresGlobalTagsSync ? syncTags(state, getters, rootGetters, { tagGroupsToSync: globalTagGroupsToSync, isGlobalTag: true }) : null;
            var p2 = requiresModuleTagsSync ? syncTags(state, getters, rootGetters, { tagGroupsToSync: moduleTagGroupsToSync, isGlobalTag: false }) : null;
            var p3 = requiresUpdateItem ? updateLookups(state, getters, rootGetters, lookupGroupsToUpdate) : null;

            commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
            return Promise.all([p1, p2, p3])
                .then(values => {
                    commit('snackbar/displaySnackbar', {
                        isSuccess: true,
                        message: "Tags updated successfully"
                    }, { root: true });
                    console.log("aux/sync success"); // [3, 1337, "foo"]
                    //commit("mgr/ready", { entity: "item", isReady: true }, { root: true });
                    return;
                }).catch(err => {
                    commit('snackbar/displaySnackbar', {
                        isSuccess: false,
                        message: "Tags update failed!"
                    }, { root: true });
                    commit("mgr/ready", { entity: "item", isReady: true }, { root: true });
                    console.log('aux/sync failed err: ' + err);
                    return err;
                });
        },
    },
}