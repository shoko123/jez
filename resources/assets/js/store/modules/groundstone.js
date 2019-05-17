export default {
    namespaced: true,
    state: {
        groundstone: null,
        groundstones: null,
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
        registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }],
    },

    getters: {
        groundstones(state) {
            return state.groundstones;
        },

        groundstone(state) {
            return state.groundstone;
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
            return state.createData.extra.materials;
        },
        groundstoneTypes(state) {
            return state.createData.extra.groundstone_types;
        },
    },

    mutations: {
        groundstones(state, payload) {
            //before saving:
            //make tag for navigator/picker
            //order by (year, area, locus, registration_category, [basket_no], item_no).

            //console.log('gs list: ' + JSON.stringify(payload, null, 2));
            function makeTag(gs) {
                let tag = (gs.find.registration_category == 'AR') ? gs.find.item_no :
                    gs.find.basket_no + '.' + gs.find.item_no;
                return gs.find.locus.area.year - 2000 + '/' +
                    gs.find.locus.area.area + '/' +
                    gs.find.locus.locus.toString().padStart(3, 0) + '.' +
                    gs.find.registration_category + '.' +
                    tag;
            }

            let gs_formatted = payload.map(function (gs) {
                return {
                    id: gs.id,
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






            //state.groundstones = payload;
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
        },

        groundstoneDelete(state, payload) {
            state.groundstone = null;
            let index = state.groundstones.findIndex(st => st.id == payload);
            if (index === -1) {
                console.log('store - groundstone delete - couldn\'t find groundstone with id: ' + payload);
                return;
            }
            console.log('store - mutation groundstone delete - deleting: ' + payload);
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
            //console.log('store.gs.set(materials)' + JSON.stringify(payload, null, 2));
            state.createData.extra.materials = payload;
        },
        groundstoneTypes(state, payload) {
            //console.log('store.gs.set(groundstoneTypes)' + JSON.stringify(payload, null, 2));
            state.createData.extra.groundstone_types = payload;
        },
    },

    actions: {
        groundstones({ commit }) {
            console.log('store.groundstone.action.groundstones');
            return axios.get(`/api/groundstones`)
                .then((res) => {
                    commit('groundstones', res.data);
                })
                .catch(err => {
                    console.log('Fail to load groundstones. err: ' + err);
                })
        },

        groundstoneGetNextId({ state, dispatch }, payload) {
            return new Promise((resolve, reject) => {
                //if for some reason we don't have our groundstone or list set (hydrated)
                //we can't proceed
                if (!state.groundstones || !state.groundstone) {
                    console.log('store.groundstoneGetNextId rejecting...');
                    reject(null);
                }
                let index = state.groundstones.findIndex(gs => gs.id === state.groundstone.id);
                let nextGroundstoneId = null;
                if (payload === 'next') {

                    if (index == state.groundstones.length - 1) {
                        index = 0;
                    } else {
                        ++index;
                    }
                    //console.log('new id: ' + newId);
                    nextGroundstoneId = state.groundstones[index].id;
                } else {
                    if (index == 0) {
                        index = state.groundstones.length - 1;
                    } else {
                        --index;
                    }
                    nextGroundstoneId = state.groundstones[index].id;
                }
                //console.log('store.gsNext(' + payload + ') nextId: ' + state.groundstones[index].id);
                dispatch('groundstone', state.groundstones[index].id)
                    .then(res => {
                        resolve(nextGroundstoneId);
                    })
                    .catch(err => {
                        rej("failed to retrieve groundstone");
                    });




                //dispatch('groundstone', state.groundstones[index].id);
                //resolve(nextGroundstoneId);



            })
        },
        //get full groundstone object by id
        groundstone({ commit }, payload) {
            //let user = rootGetters.currentUser;
            //let token = user.token;
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get(`/api/groundstones/${payload}`)
                .then((res) => {
                    //console.log('store.gs.get(groundstone)' + JSON.stringify(res, null, 2));


                    //res.data.groundstone.find = null;
                    commit('groundstone', res.data.groundstone);


                    //we seperate the data into two parts - grounstone and find.
                    commit('find', res.data.groundstone.find, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('store.groundstone axios returned err: ' + err.response);
                })
        },

        //delete groundstone by id - must be accompanied by deleting corresponding find record.
        groundstoneDelete({ state, commit }, payload) {
            return axios
                .delete(`/api/groundstones/${payload}`)
                .then(res => {
                    commit("groundstoneDelete", payload);
                })
                .catch(err => console.log(err));
        },

        materials({ commit }) {
            return axios.get(`/api/materials`)
                .then((res) => {
                    commit('materials', res.data.materials);
                    return res;
                }).catch((err) => {
                    console.log(err)
                })
        },

        groundstoneTypes({ commit }) {
            return axios.get(`/api/groundstone-types`)
                .then((res) => {
                    commit('groundstoneTypes', res.data.groundstone_types);
                    return res.data.groundstone_types;
                }).catch((err) => {
                    console.log(err)
                })
        }


    }
}