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

        count(state) {
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

        isCreate(state, getters, rootState, rootGetters) {
            return rootGetters['mg/isCreate'];
        },
    },

    mutations: {
        groundstones(state, payload) {
            //before saving:
            //make tag for navigator/picker
            //order by (year, area, locus, registration_category, [basket_no], item_no).

            //console.log('gss module set groundstones: ' + JSON.stringify(payload, null, 2));
            function makeTag(gs) {
                let sections = gs.id_string.split('.');
                let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) +  ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
                //console.log("tag: " + tag)
                return tag;
                /*
                let tag = (gs.find.registration_category == 'AR') ? gs.find.item_no :
                    gs.find.basket_no + '.' + gs.find.item_no;
                return gs.find.locus.area.year - 2000 + '/' +
                    gs.find.locus.area.area + '/' +
                    gs.find.locus.locus.toString().padStart(3, 0) + '.' +
                    gs.find.registration_category + '.' +
                    tag;
                    */
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

            //console.log('gs formatted list: ' + JSON.stringify(gs_formatted, null, 2));

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
        clear(state) {
            state.newItem.data.groundstone_type_id = null;
            state.newItem.data.material_id = null;
            state.newItem.data.weight = null;
            state.newItem.data.notes = null;
            state.newItem.data.measurements = null;
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
            //console.log('store.gs.set(materials)' + JSON.stringify(payload, null, 2));
            state.createData.extra.materials = payload;
            state.newItem.dataExtra.materials = payload;

        },
        groundstoneTypes(state, payload) {
                    //console.log('store.gs.set(groundstoneTypes)' + JSON.stringify(payload, null, 2));
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
        newItemData(state, payload) {            
            state.newItem.data = payload;
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
                    //copy area and locus details from current gs to fn/newItem/data.
                    //also set default for next probable gs.
                    commit("fn/area_id", state.groundstone.find.locus.area_id, { root: true });
                    commit("fn/locus_id", state.groundstone.find.locus.id, { root: true });
                    commit("fn/registration_category", state.groundstone.find.registration_category, { root: true });
                    commit("fn/findable_type", state.groundstone.find.findable_type, { root: true });
                    commit("fn/basket_no", null, { root: true });
                    commit("fn/item_no", null, { root: true });
                    commit("fn/clear", null, { root: true });
                    commit("clear");

                    xhrRequest.endpoint = `/api/areas`;
                    xhrRequest.action = `get`;
                    xhrRequest.data = null;

                    xhrRequest.flags.successShowSnackBar = false;
                    xhrRequest.flags.failureShowSnackBar = true;
                    xhrRequest.flags.successLogToConsole = false;
                    xhrRequest.flags.failureLogToConsole = false;

                    xhrRequest.messages.whileLoading = `loading areas`;
                    xhrRequest.messages.onSuccessSnackbar = null;
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

                    //load locus data and finds
                    dispatch("fn/findListForLocus", state.groundstone.find.locus.id, { root: true });

                case 'update':
                    console.log('gs.getData.update groundstone: ' + JSON.stringify(state.groundstone, null, 2));
                    //copy data from current groundstone to local createData

                    
                    state.createData.id = state.groundstone.id;
                    state.createData.groundstone_type_id = state.groundstone.groundstone_type_id;
                    state.createData.material_id = state.groundstone.material_id;
                    state.createData.weight = state.groundstone.weight;
                    state.createData.notes = state.groundstone.notes;
                    state.createData.measurements = state.groundstone.measurements;

                    /*
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
                        */

                        
                    commit('fn/newFindData', rootGetters['fn/find'], { root: true });
                    //copy this for correct tag shown at head of stepper
                    commit("fn/locus_id_string", state.groundstone.find.locus_id_string, { root: true });

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
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

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
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `loading groundstone with id: ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
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
            xhrRequest.messages.onSuccessSnackbar = `groundstone deleted successfully`;
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
                console.log("store.gs.store payload: " + JSON.stringify(newGroundstone, null, 2));
                //console.log("Create/Update called");
                let xhrRequest = { flags: {}, messages: {}, };
                xhrRequest.endpoint = '/api/groundstones/create';
                xhrRequest.action = rootGetters['mg/isCreate'] ? 'post' : 'put';
                                
                xhrRequest.data = newGroundstone;
    
                xhrRequest.flags.successShowSnackBar = true;
                xhrRequest.flags.failureShowSnackBar = true;
                xhrRequest.flags.successLogToConsole = true;
                xhrRequest.flags.failureLogToConsole = true;
    
                xhrRequest.messages.whileLoading = `saving groundstone`;
                xhrRequest.messages.onSuccessSnackbar = 'Groundstone created successfully';
                xhrRequest.messages.onFailureSnackbar = `failed to save groundstone`;
    
                return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then((res) => {
                        //once gs is saved in DB, we reload all groundstones - this will put it in the right order.
                        //this is wasteful, but OK for now.
                        //the redirection to the new/updated groundstone will be done in the component level (in gsNew)
                        //dispatch('gs/groundstones', null);
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