export default {
    namespaced: true,
    state: {
        moduleBaseURL: 'finds/groundstones',
        itemName: 'groundstone',
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
        createDataExtra: {
            materials: null,
            groundstone_types: null,
        },

        createData: {
            extra: {
                materials: null,
                groundstone_types: null,
            },
            groundstone_type_id: null,
            material_id: null,
            weight: null,
            notes: null,
            measurements: null,
            id: null,
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
            manager: {
                headerMessage: null,
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
        isLoaded(state) {
            return (state.groundstones === null) ? false : true;
        },
        collectionLoaded(state) {
            return (state.groundstones === null) ? false : true;
        },
        itemLoaded(state) {
            return (state.groundstone === null) ? false : true;
        },
        index(state) {
            return (state.index);
        },
        groundstoneFormatted(state) {

            function makeTag() {
                let tag = (state.groundstone.find.registration_category == 'AR') ? state.groundstone.find.item_no :
                    state.groundstone.find.basket_no + '.' + state.groundstone.find.item_no;
                return state.groundstone.find.locus.area.year - 2000 + '/' +
                    state.groundstone.find.locus.area.area + '/' +
                    state.groundstone.find.locus.locus.toString().padStart(3, 0) + '.' +
                    state.groundstone.find.registration_category + '.' +
                    tag;
            }

            return state.groundstone ?
                {
                    id: state.groundstone.id,
                    tag: makeTag(),
                    description: state.groundstone.description
                } : null;
        },

        groundstonesWithPagination(state) {
            return state.groundstonesWithPagination;
        },

        createData(state) {
            return state.createData;
        },

        groundstonesCount(state) {
            return state.groundstones ? state.groundstones.length : 0;
        },
        materials(state) {
            //return state.createData.extra.materials;
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
        newItemHeaderMessage(state, getters, rootState, rootGetters) {
            return rootGetters['fn/newItemHeaderMessage'];
        },

        isCreate(state, getters, rootState, rootGetters) {
            return rootGetters['mgr/isCreate'];
        },
    },

    mutations: {
        groundstones(state, payload) {
            //before saving:
            //make tag for navigator/picker
            //order by (year, area, locus, registration_category, [basket_no], item_no).

            //console.log('gss module set groundstones: ' + JSON.stringify(payload, null, 2));
            function makeTag(gs) {
                let tag = (gs.find.registration_category == 'AR') ? gs.find.item_no :
                    gs.find.basket_no + '.' + gs.find.item_no;
                return gs.find.locus.area.year - 2000 + '/' +
                    gs.find.locus.area.area + '/' +
                    gs.find.locus.locus.toString().padStart(3, 0) + '.' +
                    gs.find.registration_category + '.' +
                    tag;
            };
            function makeIdString(gs) {
                let tag = (gs.find.registration_category == 'AR') ? gs.find.item_no :
                    gs.find.basket_no + '.' + gs.find.item_no;
                return gs.find.locus.area.year - 2000 + '.' +
                    gs.find.locus.area.area + '.' +
                    gs.find.locus.locus.toString() + '.' +
                    gs.find.registration_category + '.' +
                    tag;
            };

            let gs_formatted = payload.map(function (gs) {
                return {
                    id: gs.id,
                    id_string: makeIdString(gs),
                    tag: makeTag(gs),
                    locus_id: gs.find.locus_id,
                    description: gs.description,
                }
            });

            //console.log('gs formatted list: ' + JSON.stringify(gs_formatted, null, 2));

            gs_formatted.sort(function (a, b) {
                return (a.tag > b.tag) ? 1 : -1;
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
            let tag = (payload.find.registration_category == 'AR') ? payload.find.item_no :
                payload.find.basket_no + '.' + payload.find.item_no;

            state.groundstone.tag = payload.find.locus.area.year - 2000 + '/' +
                payload.find.locus.area.area + '/' +
                payload.find.locus.locus.toString().padStart(3, 0) + '.' +
                payload.find.registration_category + '.' +
                tag;

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
        //createData(state, payload) {
        //    state.createData = payload;
        //},
        createDataClear(state) {
            state.createData.groundstone_type_id = null;
            state.createData.material_id = null;
            state.createData.weight = null;
            state.createData.notes = null;
            state.createData.measurements = null;
        },

        formDataNotes(state, payload) {
            state.createData.notes = payload;
        },

        formDataFindId(state, payload) {
            state.createData.id = payload;
        },


        createDataSetter(state, payload) {
            switch (payload.name) {
                case "weight":
                    state.createData.weight = payload.data;
                    break;

                case "material_id":
                    state.createData.material_id = payload.data;
                    //console.log('store.gs.set(material_id) ' + payload.data);
                    break;

                case "groundstone_type_id":
                    state.createData.groundstone_type_id = payload.data;
                    break;

                case "measurements":
                    state.createData.measurements = payload.data;
                    break;

                default:
                    alert('store.gs Unknown var ' + payload.name);
            }
            //state.createData.material = payload;
        },

        materials(state, payload) {
            console.log('store.gs.set(materials)' + JSON.stringify(payload, null, 2));
            state.createData.extra.materials = payload;
            state.newItem.dataExtra.materials = payload;

        },
        groundstoneTypes(state, payload) {
                    console.log('store.gs.set(groundstoneTypes)' + JSON.stringify(payload, null, 2));
                    state.createData.extra.groundstone_types = payload;
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
                    
                    xhrRequest.endpoint = `/api/areas`;
                    xhrRequest.action = `get`;
                    xhrRequest.data = null;

                    xhrRequest.flags.successShowSnackBar = false;
                    xhrRequest.flags.failureShowSnackBar = true;
                    xhrRequest.flags.successLogToConsole = false;
                    xhrRequest.flags.failureLogToConsole = false;

                    xhrRequest.messages.whileLoading = `loading areas`;
                    xhrRequest.messages.onSuccesSnackbar = null;
                    xhrRequest.messages.onFailureSnackbar = `failed loading areas`;
                    

                    
                    return dispatch('xhr/xhr', xhrRequest, { root: true })
                        .then((res) => {
                            commit("fn/areas", res.data.areas, { root: true });
                            return res;
                        })
                        .catch(err => {
                            console.log('update Failed to load loci: ' + err);
                            return err;
                        })
                    //dispatch('item', payload.id);
                    break;

                case 'update':
                    console.log('gs.getData.update groundstone: ' + JSON.stringify(state.groundstone, null, 2));
                    //copy data from current groundstone to local createData

                    state.createData.id = state.groundstone.id;
                    state.createData.groundstone_type_id = state.groundstone.groundstone_type_id;
                    state.createData.material_id = state.groundstone.material_id;
                    state.createData.weight = state.groundstone.weight;
                    state.createData.notes = state.groundstone.notes;
                    state.createData.measurements = state.groundstone.measurements;

                    //copy data from current find to find's createData.
                    let currentFind = rootGetters['fn/find'];
                    console.log('gs.getData.update find: ' + JSON.stringify(currentFind, null, 2));
                    let findCreateData = {};
                    findCreateData.id = currentFind.id;
                    findCreateData.registration_category = currentFind.registration_category;
                    findCreateData.basket_no = currentFind.basket_no;
                    findCreateData.item_no = currentFind.item_no;
                    findCreateData.related_pottery_basket = currentFind.related_pottery_basket;
                    findCreateData.date = currentFind.date;
                    findCreateData.description = currentFind.description;
                    findCreateData.notes = currentFind.notes;
                    findCreateData.square = currentFind.square;
                    findCreateData.keep = currentFind.keep;
                    findCreateData.drawn = currentFind.drawn;
                    findCreateData.level_top = currentFind.level_top;
                    findCreateData.level_bottom = currentFind.level_bottom;
                    findCreateData.quantity = currentFind.quantity;

                    commit('fn/newItemData', findCreateData, { root: true });


                    //load loci, materials, and groundstone_types tables
                    
                    xhrRequest.endpoint = `/api/areas`;
                    xhrRequest.action = `get`;
                    xhrRequest.data = null;

                    xhrRequest.flags.successShowSnackBar = false;
                    xhrRequest.flags.failureShowSnackBar = true;
                    xhrRequest.flags.successLogToConsole = false;
                    xhrRequest.flags.failureLogToConsole = false;

                    xhrRequest.messages.whileLoading = `loading areas`;
                    xhrRequest.messages.onSuccesSnackbar = null;
                    xhrRequest.messages.onFailureSnackbar = `failed loading areas`;
                    

                    
                    return dispatch('xhr/xhr', xhrRequest, { root: true })
                        .then((res) => {
                            commit("fn/areas", res.data.areas, { root: true });
                            return res;
                        })
                        .catch(err => {
                            console.log('update Failed to load loci: ' + err);
                            return err;
                        })
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
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `loading groundstones`;
            xhrRequest.messages.onSuccesSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('groundstones', res.data);
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load groundstones. err: ' + err);
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
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `loading groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccesSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading locus`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into two parts - grounstone and find.
                    commit('fn/find', res.data.groundstone.find, { root: true });
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
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `deleting groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccesSnackbar = `groundstone deleted successfully`;
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
                    find: rootGetters['fn/newFindData'],
                };
                //console.log("find.before create: " + JSON.stringify(this.findFormData));
                console.log("store.find.findCreate my new groundstone: " + JSON.stringify(newGroundstone, null, 2));
                console.log("Create/Update called");
    
    
                /*
                if (state.getters.isCreate) {
                    //after creating a groundstone, we need to add the gs with all the extra 
                    //info (find, images) to the groundstone array. So,
                    //1 create gs.
                    //2 reload groundstone list (will sort, and put in right place)
                    //CHANGE: get ordered at DB level and insert new gs data to list without DB access.
    
                    return new Promise((resolve, reject) => {
                        axios.
                            post("/api/groundstones/create", newGroundstone)
                            .then(res => {
                                //console.log("after create res: " + JSON.stringify(res, null, 2));
    
                                //dispatch('gs/groundstone', res.data.groundstone.id)
                                dispatch('gs/groundstones', null, { root: true })
                                    .then(gs => {
                                        console.log("successfully load list with new groundstone");
                                        //    commit('gs/groundstoneAdd', gs.data.groundstone);
                                        resolve(res.data.groundstone)
                                        //resolve(gs.data.groundstone)
                                    });
                                //return res;
                            })
                            .catch(err => {
                                console.log("groundstoneCreate failed\n" + err);
                                return reject(new Error('store.find.findCreate(POST) groundstone create failed'));
                            });
                    });
                }
                else {
                    return axios
                        .put("/api/groundstones/create", newGroundstone)
                        .then(res => {
                            //console.log("PUT success!\n" + JSON.stringify(res, null, 2));
                            return res;
                        })
                        .catch(err => {
                            //alert("groundstone creation failed!");
                            return (new Error('store.find.findCreate(PUT) groundstone update failed'));
                        });
                }
                */
             
                /*
            console.log('gss.delete id: ' + payload);
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/groundstones/${payload}`;
            xhrRequest.action = `delete`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = true;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `deleting groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccesSnackbar = `groundstone deleted successfully`;
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
            */

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