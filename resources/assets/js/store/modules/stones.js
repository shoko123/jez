export default {
    namespaced: true,
    state: {
        staticData: {          
            itemName: 'Stone',
            collectionName: 'stones',
            baseURL: 'finds/stones',
            displayOptions: ['stone data', 'gallery', 'large image'],
            registrationCategories: ['AR', 'GS'],
        },
        stone: null,
        stones: null,
        index: null,
        stonesWithPagination: {
            stones: [],
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
                stone_type_id: null,
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
                stone_types: null,
            },
        },
    },

    getters: {
        moduleStaticData(state) {
            return state.staticData;
        },

        collection(state) {
            return state.stones;
        },
        item(state) {
            return state.stone;
        },
        //index of currently displayed stone in stones[]
        index(state) {
            return (state.index);
        },

        stonesWithPagination(state) {
            return state.stonesWithPagination;
        },

        count(state) {
            return state.stones ? state.stones.length : 0;
        },

        materials(state) {
            return state.newItem.dataExtra.materials;
        },

        stoneTypes(state) {
            return state.newItem.dataExtra.stone_types;
        },

        /////New Stone
        stone_type_id(state) {
            return state.newItem.data.stone_type_id;
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
    },

    mutations: {
        stones(state, payload) {
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
                    description: gs.description,
                }
            });

            /*
            gs_formatted.sort(function (a, b) {
                return (a.id_string > b.id_string) ? 1 : -1;
            });
            */
            //console.log('gs formatted and ordered list: ' + JSON.stringify(gs_formatted, null, 2));
            state.stones = gs_formatted;
            console.log('stn.mutation.stones');
            state.loci = payload;
            if(state.stone) {     
                state.index = state.stones.findIndex(x => x.id == state.stone.id); 
            } else {
                state.index = null;
            }
        },

        stonesWithPagination(state, payload) {
            state.stonesWithPagination.stones = payload.data;
            state.stonesWithPagination.pagination.current_page = payload.current_page,
                state.stonesWithPagination.pagination.first_page_url = payload.first_page_url,
                state.stonesWithPagination.pagination.from = payload.from,
                state.stonesWithPagination.pagination.last_page = payload.last_page,
                state.stonesWithPagination.pagination.last_page_url = payload.last_page_url,
                state.stonesWithPagination.pagination.next_page_url = payload.next_page_url,
                state.stonesWithPagination.pagination.path = payload.path,
                state.stonesWithPagination.pagination.per_page = payload.per_page,
                sstate.stonesWithPagination.pagination.prev_page_url = payload.prev_page_url,
                state.stonesWithPagination.pagination.to = payload.to,
                state.stonesWithPagination.pagination.total = payload.total
        },

        stone(state, payload) {
            state.stone = payload;

            if(state.stones) {     
                state.index = state.stones.findIndex(x => x.id == state.stone.id); 
            } else {
                state.index = null;
            }

            //state.index = state.stones.findIndex(gs => gs.id == state.stone.id);

            //make tag
            let sections = state.stone.id_string.split('.');
            let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10) + '.' + sections[3] + '.' + parseInt(sections[4], 10) + ((sections[3] == "GS") ? '.' + parseInt(sections[5], 10) : '');
            state.stone.tag = tag;
        },

        materials(state, payload) {
            state.newItem.dataExtra.materials = payload;

        },
        stoneTypes(state, payload) {
            state.newItem.dataExtra.stone_types = payload;
        },
        stone_type_id(state, payload) {
            state.newItem.data.stone_type_id = payload;
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
            state.stone = null;
            let index = state.stones.findIndex(st => st.id == payload);
            if (index === -1) {
                console.log('store - stone delete - couldn\'t find stone with id: ' + payload);
                return;
            }
            state.stones.splice(index, 1);
            //state.stones.splice(state.stones.findIndex(gs => gs.id === payload), 1);
        },


        stoneAdd(state, payload) {
            //console.log('store.stone.add Adding to gs array: ' + JSON.stringify(payload));
            if (state.stones) {
                state.stones.push(payload);
            }
        },

        prepareNewStone(state, newStone) {
            if (newStone) {
                state.newItem.data.id = null;
                state.newItem.data.find_id = null;
                state.newItem.data.stone_type_id = null;
                state.newItem.data.material_id = null;
                state.newItem.data.weight = null;
                state.newItem.data.notes = null;
                state.newItem.data.measurements = null;

            } else {
                state.newItem.data.id = state.stone.id;
                state.newItem.data.find_id = state.stone.find_id;
                state.newItem.data.stone_type_id = state.stone.stone_type_id;
                state.newItem.data.material_id = state.stone.material_id;
                state.newItem.data.weight = state.stone.weight;
                state.newItem.data.notes = state.stone.notes;
                state.newItem.data.measurements = state.stone.measurements;
            }
        },
        clear(state) {
            console.log("stone.clear");
            state.stones = null;
            state.stone = null;
            //state.newItem = null;           
        },
    },

    actions: {
        collection({ state, commit, dispatch }, payload) {
            state.stones = null;

            let xhrRequest = {
                endpoint: `/api/stones`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading stones", onSuccess: null, onFailure: "failed loading stones", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('stones', res.data.stones);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load stones. err: ' + err);
                    return err;
                })
        },
        item({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/stones/${payload}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading stone with id: ${payload}`, onSuccess: null, onFailure: "failed loading stone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into parts - grounstone, find, and media.
                    commit('fnd/find', res.data.find, { root: true });
                    commit('med/media', res.data.media, { root: true });
                    commit('stone', res.data.stone);
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load stones. err: ' + err);
                    return err;
                })
        },
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            dispatch("materials");
            dispatch("stoneTypes");

            commit("prepareNewStone", rootGetters["mgr/status"].isCreate);
            commit('fnd/prepareNewFind', rootGetters["mgr/status"].isCreate, { root: true });
        },

        //delete stone by id - must be accompanied by deleting corresponding find record.
        delete({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/stones/${payload}`,
                action: "delete",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting stone with id: ${payload}`, onSuccess: `Delete successfull, redirected to first stone`, onFailure: "failed to delete stone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('gss.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.stone.id);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to delete stone. err: ' + err);
                    return err;
                })

        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newStone = {
                stone: state.newItem.data,
                find: rootGetters["fnd/newFindData"],
            };
            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.gs.store payload: " + JSON.stringify(newStone, null, 2));
            let xhrRequest = {
                endpoint: `/api/stones/create`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newStone,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving stone", onSuccess: `Stone ${getters.isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save stone`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.gs.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load stones. err: ' + err);
                    return err;
                })
        },


        materials({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/materials`,
                action: "get",
                data: null,
                spinner: true,
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

        stoneTypes({ commit, dispatch }) {
            let xhrRequest = {
                endpoint: `/api/stone-types`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: false, },
                messages: { loading: "loading stone types", onSuccess: null, onFailure: null, },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit('stoneTypes', res.data.stone_types);
                    return res;
                }).catch((err) => {
                    //console.log(err)
                })
        },
    }
}