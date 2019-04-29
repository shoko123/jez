export default {
    state: {
        findData: {
            isCreate: null,
            step: 1,
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
                level_top: null,
                level_bottom: null,
                quantity: null,


                findType: null,
            }
        },

    },
    getters: {
        findFormData(state) {
            return state.findData;
        },
        headerMessage(state) {
            return state.findData.isCreate ? "Create new find" : "Update find";
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
                    basketNo: find.basket_no,
                    itemNo: find.item_no,
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
    }
}