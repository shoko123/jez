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
                let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) +  ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
                //console.log("tag: " + tag)
                return tag;
            };
            
            let gs_formatted = payload.map(function (gs) {
                return {
                    id: gs.id,
                    id_string: gs.id_string,
                    tag: makeTag(gs),
                    locus_id: gs.find.locus_id,
                    description: gs.description,
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
            let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) +  ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
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

        clear(state) {
            state.newItem.data.groundstone_type_id = null;
            state.newItem.data.material_id = null;
            state.newItem.data.weight = null;
            state.newItem.data.notes = null;
            state.newItem.data.measurements = null;
        },
    },

    actions: {
        getData({ state, getters, commit, dispatch, rootGetters }, payload) {
            console.log('gs.getData payload: ' + JSON.stringify(payload, null, 2));
            let xhrRequest = { flags: {}, messages: {}, };
            switch (payload.action) {
                case 'welcome':
                    if (!getters.collectionLoaded) {
                        dispatch('collection');
                    }
                    break;

                case 'list':
                    if (!getters.collectionLoaded) {
                        dispatch('collection');
                    }
                    break;

                case 'show':
                    dispatch('item', payload.id);
                    break;

                case 'create':

                    //load loci, materials, and groundstone_types tables
                    //copy area and locus details from current gs to fnd/newItem/data.
                    //also set default for next probable gs.
                    commit("fnd/area_id", state.groundstone.find.locus.area_id, { root: true });
                    commit("fnd/locus_id", state.groundstone.find.locus.id, { root: true });
                    commit("fnd/registration_category", state.groundstone.find.registration_category, { root: true });
                    commit("fnd/findable_type", state.groundstone.find.findable_type, { root: true });
                    commit("fnd/basket_no", null, { root: true });
                    commit("fnd/item_no", null, { root: true });
                    commit("fnd/clear", null, { root: true });
                    commit("clear");

                    xhrRequest.endpoint = `/api/areas`;
                    xhrRequest.action = `get`;
                    xhrRequest.data = null;

                    xhrRequest.flags.successShowSnackBar = false;
                    xhrRequest.flags.failureShowSnackBar = true;
                    xhrRequest.flags.verbose = false;
                    

                    xhrRequest.messages.whileLoading = `loading areas`;
                    xhrRequest.messages.onSuccessSnackbar = null;
                    xhrRequest.messages.onFailureSnackbar = `failed loading areas`;
                    

                    
                    return dispatch('xhr/xhr', xhrRequest, { root: true })
                        .then(res => {
                            commit("fnd/areas", res.data.areas, { root: true });
                            return res;
                        })
                        .catch(err => {
                            console.log('gs.getData.create Failed to load areas: ' + err);
                            return err;
                        })
                    
                    //dispatch.materials





                    //dispatch('item', payload.id);
                    break;

                    //load locus data and finds
                    dispatch("fnd/findListForLocus", state.groundstone.find.locus.id, { root: true });

                case 'update':
                    console.log('gs.getData.update groundstone: ' + JSON.stringify(state.groundstone, null, 2));

                    
                    commit('fnd/newFindData', rootGetters["fnd/find"], { root: true });
                    //copy this for correct tag shown at head of stepper
                    commit("fnd/locus_id_string", state.groundstone.find.locus_id_string, { root: true });

                    state.newItem.data.id = state.groundstone.id;
                    state.newItem.data.groundstone_type_id = state.groundstone.groundstone_type_id;
                    state.newItem.data.material_id = state.groundstone.material_id;
                    state.newItem.data.weight = state.groundstone.weight;
                    state.newItem.data.notes = state.groundstone.notes;
                    state.newItem.data.measurements = state.groundstone.measurements;

                    //load loci, materials, and groundstone_types tables
                    
                    
                    //dispatch('item', payload.id);
                    
                    break;

                default:
                    console.log('gs.getData error in payload');
            }

        },
        collection({ commit, dispatch }, payload) {
            //console.log('store.gs.action.groundstones');
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/groundstones`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.verbose = false;

            xhrRequest.messages.whileLoading = `loading groundstones`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('groundstones', res.data);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },
        item({ commit, dispatch }, payload) {
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/groundstones/${payload}`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.verbose = false;

            xhrRequest.messages.whileLoading = `loading groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading locus`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into two parts - grounstone and find.
                    commit('fnd/find', res.data.groundstone.find, { root: true });
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

        //delete groundstone by id - must be accompanied by deleting corresponding find record.
        delete({ commit, dispatch }, payload) {
            console.log('gss.delete id: ' + payload);
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/groundstones/${payload}`;
            xhrRequest.action = `delete`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = true;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.verbose = false;

            xhrRequest.messages.whileLoading = `deleting groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = `Delete successfull, redirected to first groundstone`;
            xhrRequest.messages.onFailureSnackbar = `failed to delete groundstone`;

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

        store({ state, commit, dispatch, rootGetters, root }, payload) {   
                let newGroundstone = {
                    groundstone: state.newItem.data,
                    find: rootGetters["fnd/newFindData"],
                };
                //console.log("find.before create: " + JSON.stringify(this.findFormData));
                console.log("store.gs.store payload: " + JSON.stringify(newGroundstone, null, 2));
                //console.log("Create/Update called");
                let xhrRequest = { flags: {}, messages: {}, };
                xhrRequest.endpoint = '/api/groundstones/create';
                xhrRequest.action = rootGetters["mgr/isCreate"] ? 'post' : 'put';
                                
                xhrRequest.data = newGroundstone;
    
                xhrRequest.flags.successShowSnackBar = true;
                xhrRequest.flags.failureShowSnackBar = true;
                xhrRequest.flags.verbose = true;
    
                xhrRequest.messages.whileLoading = `saving groundstone`;
                xhrRequest.messages.onSuccessSnackbar = 'Groundstone ' +  (rootGetters["mgr/isCreate"] ? 'created ' : 'updated ') + 'successfully';
                xhrRequest.messages.onFailureSnackbar = `failed to save groundstone`;
    
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
       

        materials({ commit }) {          
            return axios.get(`/api/materials`)
                .then((res) => {
                    console.log('gss.materials returned')
                    commit('materials', res.data.materials);
                    return res;
                }).catch((err) => {
                    console.log(err)
                })
        },

        groundstoneTypes({ commit }) {
            return axios.get(`/api/groundstone-types`)
                .then((res) => {
                    console.log('gss.groundstoneTypes returned')
                    commit('groundstoneTypes', res.data.groundstone_types);
                    return res.data.groundstone_types;
                }).catch((err) => {
                    console.log(err)
                })
        },
       
    }
}