//Handles discrete data related to a specific module, either lookup fields or tags with a uniform interface.
//Both are organized as groups and related params:
//lookups - field name & ids.
//tags - tag_type & tag name (uses Spatie tagging system). 

import { normalize, schema } from 'normalizr';
export default {
    namespaced: false,
    actions: {
        normalizeGroups({ state, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`aux/normalizeGroups() payload: ${JSON.stringify(payload, null, 2)}`);

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
                idAttribute: (value, parent, key) => `${parent.isGlobalTag ? "T" : "M"}>${value.id}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `${parent.isGlobalTag ? "T" : "M"}>${value.id}`,
                        groupKey: `${parent.isGlobalTag ? "T" : "M"}>${parent.str_id}`,
                        selectedIn: { filters: false, itemParams: false, newParams: false },
                        affectsTagGroups: [],
                    };
                },
            });

            const tagGroupSchema = new schema.Entity('tagGroups', {
                params: [tagParamSchema],
            }, {
                idAttribute: (value, parent, key) => `${value.isGlobalTag ? "T" : "M"}>${value.str_id}`,
                processStrategy: (value, parent, key) => {
                    return {
                        ...value,
                        key: `${value.isGlobalTag ? "T" : "M"}>${value.str_id}`,
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
            //console.log(`normalizedData: ${JSON.stringify(normalizedData, null, 2)}`);

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
            //console.log(`aux/normalizeGroups() done`);
        },
    }
}