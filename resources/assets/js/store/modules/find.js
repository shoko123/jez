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

        findCreate({ dispatch, commit, getters, rootGetters }, payload) {

            let find = {
                locus_id: state.findData.registration.locusId,
                registration_category: this.findFormData.registration.registrationCategory,
                basket_no: this.findFormData.registration.basketNo,
                item_no: this.findFormData.registration.itemNo,
                related_pottery_basket: this.findFormData.registration.related_pottery_basket,
                date: this.findFormData.registration.date,
                description: this.findFormData.registration.description,
                notes: this.findFormData.registration.notes,
                square: this.findFormData.registration.square,
                keep: this.findFormData.registration.keep,
                level_top: this.findFormData.registration.level_top,
                level_bottom: this.findFormData.registration.level_bottom,
                quantity: this.findFormData.registration.quantity,
                findable_type: "Groundstone",
                findable_id: null
              };
        
              let newGroundstone = {
                groundstone: this.groundstoneFormData,
                find: find,
              };
              //console.log("before create find: " + JSON.stringify(this.findFormData));
              console.log("before create " + JSON.stringify(newGroundstone));
        
                
              axios
                .post("/api/groundstones/create", newGroundstone)
                .then(res => {
                  console.log("success!\n" + JSON.stringify(res));
                  
                  this.$store.commit("snackbar", {
                    value: true,
                    message: "groundstone created",
                    timeout: 4000,
                    color: "green"
                  });
                  //alert("groundstone + find created! id: " + res.data.id);
                  //router.push({ path: `/user/${userId}` }) // -> /user/123
                  //this.$router.push({ path: `/groundstones/${res.data.groundstone.id}` });
                })
                .catch(err => {
                  //alert("groundstone creation failed!");
                  console.log("groundstoneCreate failed\n" + err);
                });
                
            },



    }
}