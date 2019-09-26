export default {
    namespaced: true,
    state: {
        moduleBaseURL: 'finds/groundstones',
        itemName: 'Groundstone',
        collectionName: 'groundstones',
        groundstone: null,
        groundstones: null,
        index: null,
        groundstonesWithPagination: {
            groundstones: [],
            pagination: {
                current_page: null,
                first_page_url: null,
                from: null,
                last_page: null,
                last_page_url: null,
                next_page_url: null,
                path: null,
                per_page: null,
                prev_page_url: null,
                to: null,
                total: null
            },
        },


        newItem: {
            data: {
                id: null,
                find_id: null,
                groundstone_type_id: null,
                material_id: null,
                weight: null,
                notes: null,
                measurements: null,
            },
            dataExtra: {
                areas: null,//[]
                loci: null,//[]
                finds: null,//[]
                locusId: null,
                locus: null,
                materials: null,
                groundstone_types: null,
            },
        },
        registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }],
    },

    getters: {
        moduleStaticData(state) {
            return {
                baseURL: state.moduleBaseURL,
                itemName: state.itemName,
                collectionName: state.collectionName
            };
        },

        collection(state) {
            return state.groundstones;
        },
        item(state) {
            return state.groundstone;
        },
        //index of currently displayed groundstone in groundstones[]
        index(state) {
            return (state.index);
        },

        groundstonesWithPagination(state) {
            return state.groundstonesWithPagination;
        },

        count(state) {
            return state.groundstones ? state.groundstones.length : 0;
        },
        materials(state) {
            return state.newItem.dataExtra.materials;
        },
        groundstoneTypes(state) {
            return state.newItem.dataExtra.groundstone_types;
        },

        groundstone_type_id(state) {
            return state.newItem.data.groundstone_type_id;
        },
        material_id(state) {
            return state.newItem.data.material_id;
        },

        weight(state) {
            return state.newItem.data.weight;
        },
        notes(state) {
            return state.newItem.data.notes;
        },
        measurements(state) {
            return state.newItem.data.measurements;
        },

        newItem(state) {
            return state.newItem;
        },

        isCreate(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/isCreate"];
        },
    },

    mutations: {
        groundstones(state, payload) {
            function makeTag(gs) {
                let sections = gs.id_string.split('.');
                let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) + ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
                //console.log("tag: " + tag)
                return tag;
            };

            let gs_formatted = payload.map(function (gs) {
                return {
                    id: gs.id,
                    id_string: gs.id_string,
                    tag: makeTag(gs),
                    locus_id: gs.locus_id,
                    description: gs.find_description,
                }
            });

            gs_formatted.sort(function (a, b) {
                return (a.id_string > b.id_string) ? 1 : -1;
            });
            //console.log('gs formatted and ordered list: ' + JSON.stringify(gs_formatted, null, 2));
            state.groundstones = gs_formatted;
        },

        groundstonesWithPagination(state, payload) {
            state.groundstonesWithPagination.groundstones = payload.data;
            state.groundstonesWithPagination.pagination.current_page = payload.current_page,
                state.groundstonesWithPagination.pagination.first_page_url = payload.first_page_url,
                state.groundstonesWithPagination.pagination.from = payload.from,
                state.groundstonesWithPagination.pagination.last_page = payload.last_page,
                state.groundstonesWithPagination.pagination.last_page_url = payload.last_page_url,
                state.groundstonesWithPagination.pagination.next_page_url = payload.next_page_url,
                state.groundstonesWithPagination.pagination.path = payload.path,
                state.groundstonesWithPagination.pagination.per_page = payload.per_page,
                sstate.groundstonesWithPagination.pagination.prev_page_url = payload.prev_page_url,
                state.groundstonesWithPagination.pagination.to = payload.to,
                state.groundstonesWithPagination.pagination.total = payload.total
        },

        groundstone(state, payload) {
            state.groundstone = payload;
            state.index = state.groundstones.findIndex(gs => gs.id == state.groundstone.id);

            //make tag
            let sections = state.groundstone.id_string.split('.');
            let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) + ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
            state.groundstone.tag = tag;
        },

        materials(state, payload) {
            state.newItem.dataExtra.materials = payload;

        },
        groundstoneTypes(state, payload) {
            state.newItem.dataExtra.groundstone_types = payload;
        },

        groundstone_type_id(state, payload) {
            state.newItem.data.groundstone_type_id = payload;
        },
        material_id(state, payload) {
            state.newItem.data.material_id = payload;
        },
        weight(state, payload) {
            state.newItem.data.weight = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        measurements(state, payload) {
            state.newItem.data.measurements = payload;
        },
        newItemData(state, payload) {
            state.newItem.data = payload;
        },
        deleteFromStore(state, payload) {
            console.log('gss.deleteFromStore id: ' + payload);
            state.groundstone = null;
            let index = state.groundstones.findIndex(st => st.id == payload);
            if (index === -1) {
                console.log('store - groundstone delete - couldn\'t find groundstone with id: ' + payload);
                return;
            }
            state.groundstones.splice(index, 1);
            //state.groundstones.splice(state.groundstones.findIndex(gs => gs.id === payload), 1);
        },


        groundstoneAdd(state, payload) {
            //console.log('store.groundstone.add Adding to gs array: ' + JSON.stringify(payload));
            if (state.groundstones) {
                state.groundstones.push(payload);
            }
        },

        prepareNewGroundstone(state, newGroundstone) {
            if (newGroundstone) {
                state.newItem.data.id = null;
                state.newItem.data.find_id = null;
                state.newItem.data.groundstone_type_id = null;
                state.newItem.data.material_id = null;
                state.newItem.data.weight = null;
                state.newItem.data.notes = null;
                state.newItem.data.measurements = null;

            } else {
                state.newItem.data.id = state.groundstone.id;
                state.newItem.data.find_id = state.groundstone.find_id;
                state.newItem.data.groundstone_type_id = state.groundstone.groundstone_type_id;
                state.newItem.data.material_id = state.groundstone.material_id;
                state.newItem.data.weight = state.groundstone.weight;
                state.newItem.data.notes = state.groundstone.notes;
                state.newItem.data.measurements = state.groundstone.measurements;
            }
        },
        clear(state) {
            console.log("groundstone.clear");
            state.groundstones = null;
            state.groundstone = null;
            //state.newItem = null;           
        },
    },

    actions: {
        collection({ state, commit, dispatch }, payload) {
            state.groundstones = null;

            let xhrRequest = {
                endpoint: `/api/groundstones`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading groundstones", onSuccess: null, onFailure: "failed loading groundstones", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('groundstones', res.data.groundstones);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },
        item({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/groundstones/${payload}`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading groundstone with id: ${payload}`, onSuccess: null, onFailure: "failed loading groundstone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into two parts - grounstone and find.
                    commit('fnd/find', res.data.find, { root: true });
                    //TODO currently we can't delete find as part of gs because it is used for making tag - needs fix.
                    //delete res.data.groundstone.find;
                    commit('groundstone', res.data.groundstone);
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            /*
            let xhrRequest = {
                endpoint: `/api/areas`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading areas", onSuccess: null, onFailure: "failed loading areas", },
            };
            //TODO remove this after registration is done via generic picker
            dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    commit("fnd/areas", res.data.areas, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('gs.getData.create Failed to load areas: ' + err);
                    return err;
                })
                */
            dispatch("materials");
            dispatch("groundstoneTypes");

            commit("prepareNewGroundstone", rootGetters["mgr/isCreate"]);
            commit('fnd/prepareNewFind', rootGetters["mgr/isCreate"], { root: true });
        },

        //delete groundstone by id - must be accompanied by deleting corresponding find record.
        delete({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/groundstones/${payload}`,
                action: "delete",
                data: null,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting groundstone with id: ${payload}`, onSuccess: `Delete successfull, redirected to first groundstone`, onFailure: "failed to delete groundstone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('gss.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.groundstone.id);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to delete groundstone. err: ' + err);
                    return err;
                })

        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newGroundstone = {
                groundstone: state.newItem.data,
                find: rootGetters["fnd/newFindData"],
            };
            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.gs.store payload: " + JSON.stringify(newGroundstone, null, 2));
            let xhrRequest = {
                endpoint: `/api/groundstones/create`,
                action: getters.isCreate ? 'post' : 'put',
                data: newGroundstone,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving groundstone", onSuccess: `Groundstone ${getters.isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save groundstone`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.gs.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },


        materials({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/materials`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "loading materials", onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('materials', res.data.materials);
                    return res;
                }).catch((err) => {
                    //console.log(err)
                })
        },

        groundstoneTypes({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/groundstone-types`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "loading groundstone types", onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('groundstoneTypes', res.data.groundstone_types);
                    return res;
                }).catch((err) => {
                    //console.log(err)
                })
        },

    }
}