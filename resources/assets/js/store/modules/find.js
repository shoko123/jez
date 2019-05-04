export default {
    state: {
        findData: {
            isCreate: null,
            step: 1,
            headerMessage: null,

            registration: {
                id: null,
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
                keep: null,
                drawn: null,
                level_top: null,
                level_bottom: null,
                quantity: null,

                //for polymorphism
                findType: null,
            }
        },
    },
    getters: {
        findFormData(state) {
            return state.findData;
        },
        headerMessage(state) {
            let message = state.findData.isCreate ? "Create new Groundstone" : "Update Groundstone";
            if (state.findData.registration.locus && state.findData.registration.itemNo) {
                message += ' (' + state.findData.registration.locus.area.year +
                    '.' + state.findData.registration.locus.area.area +
                    '.' + state.findData.registration.locus.locus +
                    '[' + state.findData.registration.registrationCategory + ']' +
                    'B' + state.findData.registration.basketNo +
                    'N' + state.findData.registration.itemNo + ')';
            }
            return message;
        },

    },
    mutations: {
        step(state, payload) {
            state.findData.step = payload;
        },
        isCreate(state, payload) {
            state.findData.isCreate = payload;
        },
        findRegistrationAreas(state, payload) {
            state.findData.registration.areas = payload;
        },
        findRegistrationLoci(state, payload) {
            state.findData.registration.loci = payload;
        },
        findRegistrationAreaId(state, payload) {
            state.findData.registration.areaId = payload;
        },
        findRegistrationLocusId(state, payload) {
            state.findData.registration.locusId = payload;
        },
        findRegistrationFindId(state, payload) {
            state.findData.registration.id = payload;
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

            state.findData.registration.locus = payload;
            state.findData.registration.finds = formatFinds(state.findData.registration.locus.finds);
            state.findData.registration.locusId = state.findData.registration.locus.id;
        },
        findRegistrationRegistrationCategory(state, payload) {
            state.findData.registration.registrationCategory = payload;
        },
        findRegistrationBasketNo(state, payload) {
            state.findData.registration.basketNo = payload;
        },
        findRegistrationItemNo(state, payload) {
            state.findData.registration.itemNo = payload;
        },

        findRegistrationRelatedPotteryBasket(state, payload) {
            console.log("store.find.set.related_pottery_basket: " + payload);
            state.findData.registration.related_pottery_basket = payload;
        },
        findRegistrationDate(state, payload) {
            state.findData.registration.date = payload;
        },
        findRegistrationSquare(state, payload) {
            state.findData.registration.square = payload;
        },
        findRegistrationKeep(state, payload) {
            state.findData.registration.Keep = payload;
        },
        findRegistrationDrawn(state, payload) {
            state.findData.registration.drawn = payload;
        },
        findRegistrationLevelTop(state, payload) {
            state.findData.registration.level_top = payload;
        },
        findRegistrationLevelBottom(state, payload) {
            state.findData.registration.level_bottom = payload;
        },
        findRegistrationStorageLocation(state, payload) {
            state.findData.registration.storage_location = payload;
        },

        findRegistrationDescription(state, payload) {
            //console.log("store.find.set.descriptio: " + payload);
            state.findData.registration.description = payload;
        },
        findRegistrationNotes(state, payload) {
            state.findData.registration.notes = payload;
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

        findCreate({ state, dispatch, rootGetters, root }, payload) {

            let find = {
                locus_id: state.findData.registration.locusId,
                registration_category: state.findData.registration.registrationCategory,
                basket_no: state.findData.registration.basketNo,
                item_no: state.findData.registration.itemNo,
                related_pottery_basket: state.findData.registration.related_pottery_basket,
                date: state.findData.registration.date,
                description: state.findData.registration.description,
                notes: state.findData.registration.notes,
                square: state.findData.registration.square,
                keep: state.findData.registration.keep,
                level_top: state.findData.registration.level_top,
                level_bottom: state.findData.registration.level_bottom,
                quantity: state.findData.registration.quantity,
                findable_type: "Groundstone",
                findable_id: state.findData.isCreate ? null : state.findData.registration.id,
            };


            let newGroundstone = {
                groundstone: rootGetters['gs/createData'],
                find: find,
            };
            //console.log("before create find: " + JSON.stringify(this.findFormData));
            console.log("store.find.findCreate my new groundstone: " + JSON.stringify(newGroundstone));

            if (state.findData.isCreate) {
                axios
                    .post("/api/groundstones/create", newGroundstone)
                    .then(res => {
                        console.log("success!\n" + JSON.stringify(res));
                        //add to groundstone list
                        //commit('gs/groundstoneAdd', res.data.groundstone, { root: true }) 


                    })
                    .catch(err => {
                        //alert("groundstone creation failed!");
                        console.log("groundstoneCreate failed\n" + err);
                    });
            } else {
                axios
                    .put("/api/groundstones/create", newGroundstone)
                    .then(res => {
                        console.log("success!\n" + JSON.stringify(res));
                        //add to groundstone list
                        //commit('gs/groundstoneAdd', res.data.groundstone, { root: true }) 


                    })
                    .catch(err => {
                        //alert("groundstone creation failed!");
                        console.log("groundstoneCreate failed\n" + err);
                    });



            }
        },




    }
}