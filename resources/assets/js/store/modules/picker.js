export default {
    namespaced: true,
    state: {
        data: {
            name: null,
            initial_shape: null,//button in menu, form in form components            

            tag: "GS 1",
            areas: null,
            area_id: null,
            loci: null,
            locus_id: null,
            finds: null,
            find_id: null,
            registration_category: null,
        },
    },

    getters: {
        picker(state) {
            return state.data;
        },

        area(state) {
            return state.area;
        },

        area_tag(state) {
            function makeTag() {
                let tag = (state.area.find.registration_category == 'AR') ? state.area.find.item_no :
                    state.area.find.basket_no + '.' + state.area.find.item_no;
                return state.area.find.locus.area.year - 2000 + '/' +
                    state.area.find.locus.area.area + '/' +
                    state.area.find.locus.locus + '.' +
                    state.area.find.registration_category + '.' +
                    tag;
            }

            return state.area ?
                {
                    id: state.area.id,
                    tag: makeTag(),
                    description: state.area.description
                } : null;
        },

        loci(state) {
            return state.loci;
        },
        locus_tag(state) {
            return state.loci;
        },
        tag(state) {
            return state.tag;
        }
    },

    mutations: {
        dataSetter(state, payload) {
            switch (payload.name) {
                case "area_id":
                    state.data.area_id = payload.data;
                    state.data.loci = state.data.areas.find(ar => ar.id === payload.data).loci;
                    break;

                case "locus_id":
                    state.data.locus_id = payload.data;
                    break;

                default:
                    alert('store.gs Unknown var ' + payload.name);
            }
            //state.createData.material = payload;
        },
        areasWithLoci(state, payload) {
            state.data.areas = payload.map(area => ({
                id: area.id,
                tag: area.year + "." + area.area,
                loci: area.loci
            }));
        },

        //for future use
        areas(state, payload) {
            state.data.areas = payload;
        },
        finds(state, payload) {
            if (payload.length === 0) {
                return;
            }
            function makeTag(gs) {
                let tag = gs.registration_category + '.';
                tag += (gs.registration_category == 'AR') ? gs.item_no :
                    gs.basket_no + '.' + gs.item_no;
                return tag;
            }


            state.data.finds = payload.filter(find => {
                return (find.findable_type == "Groundstone");
            }).map(gs => ({
                id: gs.findable_id,
                tag: makeTag(gs),
            }));;


            //state.data.finds = payload;
        },
    },

    actions: {

        areas({ commit }) {
            console.log('store.picker.action.areas');
            return axios.get("/api/areas/areasWithLoci")
                .then((res) => {
                    commit('areasWithLoci', res.data.areas);

                    //return data for next promise subscriber
                    return res.data.areas;
                })
                .catch(err => {
                    console.log('axios /api/areas/areasWithLoci returned with error: ' + err);

                    //return error for next promise subscriber
                    return (new Error('fail. err: ' + err));
                })
        },

        areasWithLoci({ commit, rootGetters }, payload) {

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.currentUser.token;

            return axios.get("/api/areas/areasWithLoci")
                .then((res) => {
                    commit('areasWithLoci', res.data.areas);

                    //return data for next promise subscriber
                    return res.data.areas;
                })
                .catch(err => {
                    console.log('axios /api/areas/areasWithLoci returned with error: ' + err);

                    //return error for next promise subscriber
                    return (new Error('fail'));
                });
        },
        locus({ commit, dispatch }, payload) {
            let myPayload = { locus_id: payload, mutate: false };
            return dispatch('locus', myPayload, { root: true })
                .then(res => {
                    commit('finds', res.finds);
                    return res.finds;
                })
                .catch(err => {
                    console.log("Error in dispatch: " + err);
                });
        },

    }
}