//Handles discrete data related to a specific module, either lookup fields or tags with a uniform interface.
//Both are organized as groups and related params:
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
                rootGetters["fnd/item"].artifact_no !== null &&
                (rootGetters["fnd/item"].piece_no === null));

            //f2 - filter by scope: non artifacts see only periods tags ???
            let f2 = scopeIsArtifact ? f1 :
                f1.filter(x => (x.group_category === "Period"));

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
            return getters["all"].filter(x => {
                return x.params.some(x => x.selectedIn["itemParams"]);
            })
                .map(x => {
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
            return [...new Set(getters[`visible${name}`].map(x => x.group_category))]
                .map(y => {
                    return {
                        name: y,
                        selectedCount: getters[`selected${name}`].filter(x => x.group_category === y).reduce(
                            (accumulator, type) => accumulator + type.count,
                            0
                        )
                    }
                });
        },

        groupsForCategory: (state, getters) => (category, isFilter) => {
            let name = isFilter ? "visibleFilters" : "visibleNewParams";
            return getters[name].filter(x => x.group_category === category);
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
            state.groups = Object.assign({}, {});
            state.params = Object.assign({}, {});
        },
        paramAffectsAddTagGroups(state, payload) {
            //console.log(`paramAffectsAddTagGroups()\nkey: ${payload.paramKey}\naffects: ${JSON.stringify(payload.affects, null, 2)}`);
            state.params[payload.paramKey].affectsTagGroups.push(payload.affects);
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
            commit("clearParams", false);//clear itemParams (not filters)
            payload.forEach(x => {
                commit("selectParam", {
                    key: "T>" + x.type + ">" + x.id,
                    source: "itemParams",
                    value: true
                });
            });
        },

        toggleOneParam({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/toggleOneParam(): payload: ${JSON.stringify(payload, null, 2)}`);

            function unselectDependencies(payload) {
                console.log(`unselectDependencies: payload: ${JSON.stringify(payload, null, 2)}`);

                state.params[payload.paramKey].affectsTagGroups.forEach(g => {
                    state.groups[g].params.forEach(gp => {
                        if (state.params[gp].selectedIn[payload.isFilter ? "filters" : "newParams"]) {
                            console.log(`unselect param ${state.params[gp].key}`);
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
            for (const [key, value] of Object.entries(state.params)) {
                if (value.selectedIn.filters) {
                    commit("selectParam", { key: key, source: "filters", value: false });
                }
            }
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
            //console.log(`aux/savetypesAndParams() payload: ${JSON.stringify(payload, null, 2)}`);

            if (!rootGetters["mgr/status"].isFilterable) { return }

            const registrationParamSchema = new schema.Entity('registrationParams', {}, {
                idAttribute: (value, parent, key) => `R>${parent.name}>${value.name}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `R>${parent.name}>${value.name}`,
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
                        key: `L>${parent.column_name}>${value.id}`,
                        groupKey: `L>${parent.column_name}`,
                        selectedIn: { filters: false },
                        affectsTagGroups: [],
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
                        affectsTagGroups: [],
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

            //make params aware of their dependant groups
            getters["all"].forEach(x => {
                if (x.group_type === "Tag" && x.dependency !== null) {
                    //console.log(`PUSH dependencies key: ${x.key} dependency: ${JSON.stringify(x.dependency, null, 2)}`);
                    x.dependency.forEach(y => {
                        y.forEach(z => {
                            commit("paramAffectsAddTagGroups", { paramKey: z, affects: [x.key] });
                        })
                    })
                }
            })
        },

        queryCollection({ state, getters, rootGetters, commit, dispatch }, payload) {
            function queryParams() {
                let areas = [];
                let seasons = [];
                let media = [];
                let scopes = [];
                let registration_categories = [];
                let tagParams = [];
                let lookups = [];

                getters["selectedFilters"].forEach((group => {
                    switch (group.group_type) {
                        case "Registration":
                            switch (group.name) {
                                case "Areas":
                                    areas = group.params.map(x => x.name);
                                    break;
                                case "Seasons":
                                    seasons = group.params.map(x => parseInt(x.name, 10) - 2000);
                                    break;
                                case "Media":
                                    media = group.params.map(x => x.name);
                                    break;
                                case "registration_categories":
                                    registration_categories = group.params.map(x => x.name);
                                    break;
                                case "scopes":
                                    scopes = group.params.map(x => x.id);
                                    break;
                            }
                            break;
                        case "Lookup":
                            //format to objects with column_name and id array.
                            lookups.push({ column_name: group.column_name, ids: group.params.map(param => param.id) });
                            break;
                        case "Tag":
                            //format tagParams according to Spatie interface (types with tags).
                            tagParams.push({ type: group.str_id, tags: group.params.map(tag => { return { id: tag.id, name: tag.name }; }) });
                            break;
                    }

                }));
                return {
                    lookups: lookups,
                    tagParams: tagParams,
                    areas: areas,
                    seasons: seasons,
                    media: media,
                    registration_categories: registration_categories,
                    scopes: scopes,
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

            //first define the two db access functions. actual entry point is below them
            function syncTags(state, getters, rootGetters, tagGroupsToSync) {
                let tagsToSync = [];
                tagGroupsToSync.forEach(x => { tagsToSync.push({ type: x.type, tags: x.tags }) });

                console.log(`aux/sync(Tags) groups: ${JSON.stringify(tagsToSync, null, 2)}`);

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

                dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then(res => {
                        console.log("syncTags returned - success")
                        return res;
                    })
                    .catch(err => {
                        console.log('syncTags err: ' + err);
                        return err;
                    })
            }

            function updateItem(state, getters, rootGetters, lookupGroupsToUpdate) {
                let moduleName = rootGetters["mgr/moduleInfo"].storeModuleName;

                dispatch(`${moduleName}/prepare`, true, { root: true });
                dispatch('fnd/prepare', true, { root: true });

                //change lookup values
                lookupGroupsToUpdate.forEach(x => {

                    console.log("aux/lookupGroupToUpdate: " + JSON.stringify(lookupGroupsToUpdate, null, 2))
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

                dispatch("mgr/store", false, { root: true })
                    .then(res => {
                        console.log("aux/updateItem - returned success");
                    })
                    .catch(err => {
                        console.log('aux/updateItem err: ' + err);
                        return err;
                    })
            }

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
                            return { group_type: "Tag", type: x.str_id, tags: x.params.filter(y => y["selectedIn"]["newParams"]).map(y => { return { id: y.id, name: y.name } }) }
                    }
                });

            let tagGroupsToSync = groupsToSync.filter(x => x.group_type === "Tag");
            let lookupGroupsToUpdate = groupsToSync.filter(x => x.group_type === "Lookup");
            let requiresSyncTags = tagGroupsToSync.length > 0;
            let requiresUpdateItem = lookupGroupsToUpdate.length > 0;
            console.log(`sync() tags: ${tagGroupsToSync.length > 0} lookups: ${lookupGroupsToUpdate.length > 0}`);


            //////////////////
            var p1 = requiresSyncTags ? syncTags(state, getters, rootGetters, tagGroupsToSync) : null;
            var p2 = requiresUpdateItem ? updateItem(state, getters, rootGetters, lookupGroupsToUpdate) : null;


            Promise.all([p1, p2]).then(values => {

                commit('snackbar/displaySnackbar', {
                    isSuccess: true,
                    message: "Tags updated successfully"
                }, { root: true });
                console.log("sync finished both lookups and tags"); // [3, 1337, "foo"]
            });
        },
    },
}