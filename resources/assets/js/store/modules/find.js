export default {
    state: {
        findCreateData: {
            isCreate: null,
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
        find: null,
    },
    getters: {
        find(state) {
            return state.find;
        },

        findFormData(state) {
            return state.findCreateData;
        },
        headerMessage(state) {
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

    },
    mutations: {
        find(state, payload) {
            //console.log("store.commit(find)" + JSON.stringify(payload, null, 2));
            state.find = payload;
        },
        step(state, payload) {
            state.findCreateData.step = payload;
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
            state.findCreateData.step = 1,
                state.findCreateData.locusHydrated = false

            //state.findCreateData.registration.id = null,
            //state.findCreateData.registration.areas = null,//[]
            //state.findCreateData.registration.loci = null,//[]
            //state.findCreateData.registration.finds = null,//[]
            //state.findCreateData.registration.areaId = null,
            state.findCreateData.registration.locusId = null,
                state.findCreateData.registration.locus = null,

                state.findCreateData.registration.registrationCategory = 'GS',
                state.findCreateData.registration.basketNo = null,
                state.findCreateData.registration.itemNo = null,

                state.findCreateData.registration.related_pottery_basket = null,
                state.findCreateData.registration.date = null,
                state.findCreateData.registration.description = null,
                state.findCreateData.registration.notes = null,
                state.findCreateData.registration.square = null,
                state.findCreateData.registration.keep = null,
                state.findCreateData.registration.drawn = null,
                state.findCreateData.registration.level_top = null,
                state.findCreateData.registration.level_bottom = null,
                state.findCreateData.registration.quantity = null,


                state.findCreateData.registration.findType = null,
                state.findCreateData.registration.notes = null;
            state.findCreateData.registration.storage_location = null;
        },
    },
    actions: {
        findRegistrationLocusId({ commit, dispatch }, payload) {
            let myPayload = { locus_id: payload, mutate: false };
            return dispatch('locus', myPayload)
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
            //console.log("before create find: " + JSON.stringify(this.findFormData));
            //console.log("store.find.findCreate my new groundstone: " + JSON.stringify(newGroundstone, null, 2));
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
                            dispatch('gs/groundstones', null)
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



            /*
            if (state.findCreateData.isCreate) {
                //after creating a groundstone, we need to add the gs with all the extra 
                //info (find, images) to the groundstone array. So,
                //1 create gs.
                //2 retreive newly created gs.
                //3 add this gs to the groundstone array.

                return new Promise((resolve, reject) => {
                    axios.
                        post("/api/groundstones/create", newGroundstone)
                        .then(res => {
                            //console.log("after create res: " + JSON.stringify(res, null, 2));


                            dispatch('gs/groundstone', res.data.groundstone.id)
                            .then(gs => {
                                //console.log("after calling newly create gs: " + JSON.stringify(gs, null, 2)); 
                                commit('gs/groundstoneAdd', gs.data.groundstone);
                                resolve(gs.data.groundstone)
                            });
                            return res;
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
        },




    }
}