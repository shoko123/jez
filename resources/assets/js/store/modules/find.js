export default {
    namespaced: true,
    state: {
        findCreateData: {
            isCreate: true,
            step: 1,
            headerMessage: null,
            locusHydrated: false,

            registration: {
                id: null,//findId
                areas: null,//[]
                loci: null,//[]
                finds: null,//[]
                areaId: null,
                locusId: null,
                locus: null,

                registrationCategory: 'GS',
                basketNo: null,
                itemNo: null,

                related_pottery_basket: null,
                date: null,
                description: null,
                notes: null,
                square: null,
                keep: false,
                drawn: false,
                level_top: null,
                level_bottom: null,
                quantity: null,

                //for polymorphism
                findType: null,
            }
        },
        newItem: {
            data: {
                id: null,//findId
                registration_category: null,
                locus_id: null,
                basket_no: null,
                item_no: null,
                findable_type: null,
                findable_id: null,
                related_pottery_basket: null,
                date: null,
                description: null,
                notes: null,
                square: null,
                keep: false,
                drawn: false,
                level_top: null,
                level_bottom: null,
                quantity: null,
                storage_location: null,
            },
            dataExtra: {
                areas: null,//[]
                loci: null,//[]
                finds: null,//[]
                registrationCategories: ['PT', 'AR', 'GS', 'LB', 'FL'],
                area_id: null,
                itemTag: null,
                locus_id_string: null,
            },

        },

        find: null,
    },
    getters: {
        find(state) {
            return state.find;
        },
        
        newFindData(state) {
            return state.newItem.data;
        },
        findFormData(state) {
            return state.findCreateData;
        },
        newItemTag(state) {

            if (!state.newItem.dataExtra.locus_id_string) {
                return '';
            }

            let tag = state.newItem.dataExtra.locus_id_string + ' ' + state.newItem.data.registration_category + '.';
            switch (state.newItem.data.registration_category) {
                case "GS":
                    if (state.find.findable_type == 'Groundstone') {
                        tag += state.newItem.data.basket_no + '.' + state.newItem.data.item_no;
                    }
                    break;

                case "PT":
                    tag += state.newItem.data.basket_no;
                    break;
                default:
                    tag += state.newItem.data.item_no;

            }
            return tag;
        },
        newItemHeaderMessage(state) {
            function makeTag() {
                let tag = (state.findCreateData.registration.registrationCategory == 'AR') ? state.findCreateData.registration.itemNo :
                    state.findCreateData.registration.basketNo + '.' + state.findCreateData.registration.itemNo;
                return state.findCreateData.registration.locus.area.year - 2000 + '/' +
                    state.findCreateData.registration.locus.area.area + '/' +
                    state.findCreateData.registration.locus.locus + '.' +
                    state.findCreateData.registration.registrationCategory + '.' +
                    tag;
            }
            let message = state.findCreateData.isCreate ? "Create new Groundstone " : "Update Groundstone ";
            if (state.findCreateData.registration.locus && state.findCreateData.registration.itemNo) {
                message += makeTag();
            }
            return message;
        },
        findNextId(state, getters, rootState) {
            //if for some reason we don't have our find or list set (hydrated)
            //we can't proceed
            if (!rootState.gs.groundstones || !rootState.gs.groundstone) {
                return (null);
            }

            let index = rootState.gs.groundstones.findIndex(gs => gs.id === rootState.gs.groundstone.id);

            if (index == rootState.gs.groundstones.length - 1) {
                index = 0;
            } else {
                ++index;
            }
            //console.log('store.findNextId: ' + rootState.gs.groundstones[index].id);
            return rootState.gs.groundstones[index].id;

        },
        findPrevId(state, getters, rootState) {
            //if for some reason we don't have our find or list set (hydrated)
            //we can't proceed
            if (!rootState.gs.groundstones || !rootState.gs.groundstone) {
                return (null);
            }

            let index = rootState.gs.groundstones.findIndex(gs => gs.id === rootState.gs.groundstone.id);

            if (index == 0) {
                index = rootState.gs.groundstones.length - 1;
            } else {
                --index;
            }
            //console.log('store.findPrevId: ' + rootState.gs.groundstones[index].id);
            return rootState.gs.groundstones[index].id;
        },
        newItem(state) {
            return state.newItem;
        },

        areas(state) {
            return state.newItem.dataExtra.areas;
        },
        loci(state) {
            return state.newItem.dataExtra.loci;
        },
        findListForLocus(state) {
            return state.newItem.dataExtra.finds;
        },
        locusTag(state) {
            return state.newItem.dataExtra.locus_id_string;
        },

        area_id(state) {
            return state.newItem.dataExtra.area_id;
        },
        locus_id(state) {
            return state.newItem.data.locus_id;
        },
        registrationCategories(state) {
            return state.newItem.dataExtra.registrationCategories;
        },
        basket_no(state) {
            return state.newItem.data.basket_no;
        },
        item_no(state) {
            return state.newItem.data.item_no;
        },
        registration_category(state) {
            return state.newItem.data.registration_category;
        },
        findable_type(state) {
            return state.newItem.data.findable_type;
        },
        findable_id(state) {
            return state.newItem.data.findable_id;
        },

        date(state) {
            return state.newItem.data.date;
        },
        square(state) {
            return state.newItem.data.square;
        },
        keep(state) {
            return state.newItem.data.keep;
        },
        drawn(state) {
            return state.newItem.data.drawn;
        },
        level_top(state) {
            return state.newItem.data.level_top;
        },
        level_bottom(state) {
            return state.newItem.data.level_bottom;
        },
        storage_location(state) {
            //console.log("store.find.set.storage_location: " + payload);
            return state.newItem.data.storage_location;
        },

        description(state) {
            return state.newItem.data.description;
        },
        find_notes(state) {
            return state.newItem.data.notes;
        },
        related_pottery_basket(state) {
            return state.newItem.data.related_pottery_basket;
        },
    },
    mutations: {
        find(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.find = payload;
        },
        newItemTag(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.newItem.data = payload;
        },

        step(state, payload) {
            state.findCreateData.step = payload;
            state.newItem.manager.step = payload;
        },
        isCreate(state, payload) {
            state.findCreateData.isCreate = payload;
        },
        locusHydrated(state, payload) {
            state.findCreateData.locusHydrated = payload;
        },
        findRegistrationAreas(state, payload) {
            state.findCreateData.registration.areas = payload;
        },
        findRegistrationLoci(state, payload) {
            state.findCreateData.registration.loci = payload;
        },
        findRegistrationAreaId(state, payload) {
            state.findCreateData.registration.areaId = payload;
        },
        findRegistrationLocusId(state, payload) {
            state.findCreateData.registration.locusId = payload;
        },

        findRegistrationFindId(state, payload) {
            //console.log('store.find.setFindId: ' + payload);
            state.findCreateData.registration.id = payload;
        },

        findRegistrationLocus(state, payload) {
            function formatFinds(finds) {
                if (!finds) {
                    return null;
                }

                function makeTag(find) {
                    let tag = find.registration_category;
                    switch (find.registration_category) {
                        case "AR":
                            tag += ".N" + find.item_no;
                            break;
                        case "PT":
                            tag += ".B" + find.basket_no;
                            break;
                        case "FL":
                            tag += ".N" + find.item_no;
                            break;
                        case "GS":
                            tag += ".N" + find.basket_no;
                            break;
                        case "LB":
                            tag += ".N" + find.item_no;
                            break;
                    }
                    return tag;
                }
                return finds.map(find => ({
                    id: find.id,
                    registrationCategory: find.registration_category,
                    findType: find.findable_type,
                    basketNo: find.basket_no ? find.basket_no : 0,
                    itemNo: find.item_no ? find.item_no : 0,
                    tag: makeTag(find),
                }));

            }

            state.findCreateData.registration.locus = payload;
            state.findCreateData.registration.finds = formatFinds(state.findCreateData.registration.locus.finds);
            state.findCreateData.registration.locusId = state.findCreateData.registration.locus.id;
        },


        findRegistrationRegistrationCategory(state, payload) {
            state.findCreateData.registration.registrationCategory = payload;
        },
        findRegistrationBasketNo(state, payload) {
            state.findCreateData.registration.basketNo = payload;
        },
        findRegistrationItemNo(state, payload) {
            state.findCreateData.registration.itemNo = payload;
        },

        findRegistrationRelatedPotteryBasket(state, payload) {
            state.findCreateData.registration.related_pottery_basket = payload;
        },
        findRegistrationDate(state, payload) {
            state.findCreateData.registration.date = payload;
        },
        findRegistrationSquare(state, payload) {
            //console.log("store.find.set.square: " + payload);
            state.findCreateData.registration.square = payload;
        },
        findRegistrationKeep(state, payload) {

            state.findCreateData.registration.keep = payload;
        },
        findRegistrationDrawn(state, payload) {
            state.findCreateData.registration.drawn = payload;
        },
        findRegistrationLevelTop(state, payload) {
            state.findCreateData.registration.level_top = payload;
        },
        findRegistrationLevelBottom(state, payload) {
            state.findCreateData.registration.level_bottom = payload;
        },
        findRegistrationStorageLocation(state, payload) {
            //console.log("store.find.set.storage_location: " + payload);
            state.findCreateData.registration.storage_location = payload;
        },

        findRegistrationDescription(state, payload) {
            //console.log("store.find.set.descriptio: " + payload);
            state.findCreateData.registration.description = payload;
        },
        findRegistrationNotes(state, payload) {
            state.findCreateData.registration.notes = payload;
        },
        findRegistrationClear(state, commit, payload) {
            state.findCreateData.step = 1;
            state.findCreateData.locusHydrated = false;

            //state.findCreateData.registration.id = null,
            //state.findCreateData.registration.areas = null,//[]
            //state.findCreateData.registration.loci = null,//[]
            //state.findCreateData.registration.finds = null,//[]
            //state.findCreateData.registration.areaId = null,
            state.findCreateData.registration.locusId = null;
            state.findCreateData.registration.locus = null;

            state.findCreateData.registration.registrationCategory = 'GS';
            state.findCreateData.registration.basketNo = null;
            state.findCreateData.registration.itemNo = null;

            state.findCreateData.registration.related_pottery_basket = null;
            state.findCreateData.registration.date = null;
            state.findCreateData.registration.description = null;
            state.findCreateData.registration.notes = null;
            state.findCreateData.registration.square = null;
            state.findCreateData.registration.keep = null;
            state.findCreateData.registration.drawn = null;
            state.findCreateData.registration.level_top = null;
            state.findCreateData.registration.level_bottom = null;
            state.findCreateData.registration.quantity = null;


            state.findCreateData.registration.findType = null;
            state.findCreateData.registration.notes = null;
            state.findCreateData.registration.storage_location = null;
        },



        areas(state, payload) {
            console.log("find.mutate.areas payload: " + JSON.stringify(payload, null, 2));
            state.newItem.dataExtra.areas = payload.map(area => ({
                id: area.id,
                year: area.name,
                tag: area.year + "." + area.area,
                loci: area.loci
            }));
        },

        loci(state, payload) {
            state.newItem.dataExtra.loci = payload;
        },
        newFindData(state, payload) {
            state.newItem.data = payload;
        },

        findListForLocus(state, payload) {
            state.newItem.dataExtra.finds = payload.finds;
            state.newItem.dataExtra.locus_id_string = payload.id_string;
            //set default basket and item

        },

        area_id(state, payload) {
            state.newItem.dataExtra.area_id = payload;
        },
        locus_id(state, payload) {
            state.newItem.data.locus_id = payload;
        },
        locus_id_string(state, payload) {
            state.newItem.dataExtra.locus_id_string = payload;
        },
        registration_category(state, payload) {
            state.newItem.data.registration_category = payload;
        },

        basket_no(state, payload) {
            state.newItem.data.basket_no = payload;
        },
        item_no(state, payload) {
            state.newItem.data.item_no = payload;
        },

        findable_type(state, payload) {
            state.newItem.data.findable_type = payload;
        },
        findable_id(state, payload) {
            state.newItem.data.findable_id = payload;
        },
        date(state, payload) {
            state.newItem.data.date = payload;
        },
        square(state, payload) {
            state.newItem.data.square = payload;
        },
        related_pottery_basket(state, payload) {
            state.newItem.data.related_pottery_basket = payload;
        },
        keep(state, payload) {
            state.newItem.data.keep = payload;
        },
        drawn(state, payload) {
            state.newItem.data.drawn = payload;
        },
        level_top(state, payload) {
            state.newItem.data.level_top = payload;
        },
        level_bottom(state, payload) {
            state.newItem.data.level_bottom = payload;
        },
        storage_location(state, payload) {
            //console.log("store.find.set.storage_location: " + payload);
            state.newItem.data.storage_location = payload;
        },

        description(state, payload) {
            state.newItem.data.description = payload;
        },
        notes(state, payload) {
            state.newItem.data.notes = payload;
        },
        clear(state, payload) {
            //state.newItem.data = null;
        },



    },
    actions: {
        step(state) {
            state.findCreateData.step = payload;
            state.newItem.manager.step = payload;
        },
        lociListForArea({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/areas/` + payload + `/lociListForArea`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `loading loci for area ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("fn/loci", res.data.lociForArea, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('update Failed to load loci: ' + err);
                    return err;
                })
        },

        findListForLocus({ state, getters, commit, dispatch, rootGetters }, payload) {
            let xhrRequest = { flags: {}, messages: {}, };
            xhrRequest.endpoint = `/api/loci/` + payload + `/findListForLocus`;
            xhrRequest.action = `get`;
            xhrRequest.data = null;

            xhrRequest.flags.successShowSnackBar = false;
            xhrRequest.flags.failureShowSnackBar = true;
            xhrRequest.flags.successLogToConsole = false;
            xhrRequest.flags.failureLogToConsole = false;

            xhrRequest.messages.whileLoading = `loading loci for area ${payload}`;
            xhrRequest.messages.onSuccessSnackbar = null;
            xhrRequest.messages.onFailureSnackbar = `failed loading loci`;

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    commit("fn/findListForLocus", res.data, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('findListForLocus Failed to load finds: ' + err);
                    return err;
                })
        },



        findRegistrationLocusId({ commit, dispatch }, payload) {
            let myPayload = { locus_id: payload, mutate: false };
            return dispatch('locus', myPayload, { root: true })
                .then(res => {
                    commit('findRegistrationLocus', res);
                    return res;
                })
                .catch(err => {
                    console.log("Error in dispatch: " + err);
                });
        },

        findCreate({ state, commit, dispatch, rootGetters, root }, payload) {

            let find = {
                id: state.findCreateData.registration.id,
                locus_id: state.findCreateData.registration.locusId,
                registration_category: state.findCreateData.registration.registrationCategory,
                basket_no: state.findCreateData.registration.basketNo,
                item_no: state.findCreateData.registration.itemNo,

                date: state.findCreateData.registration.date,
                related_pottery_basket: state.findCreateData.registration.related_pottery_basket,
                square: state.findCreateData.registration.square,
                level_top: state.findCreateData.registration.level_top,
                level_bottom: state.findCreateData.registration.level_bottom,
                keep: state.findCreateData.registration.keep,
                drawn: state.findCreateData.registration.drawn,
                description: state.findCreateData.registration.description,
                notes: state.findCreateData.registration.notes,
                storage_location: state.findCreateData.registration.storage_location,

                quantity: state.findCreateData.registration.quantity,

                findable_type: "Groundstone",
                findable_id: state.findCreateData.isCreate ? null : state.findCreateData.registration.id,
            };


            let newGroundstone = {
                groundstone: rootGetters['gs/createData'],
                find: find,
            };
            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.find.findCreate my new groundstone: " + JSON.stringify(newGroundstone, null, 2));
            console.log("Create/Update called");



            if (state.findCreateData.isCreate) {
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
        },
    }
}
