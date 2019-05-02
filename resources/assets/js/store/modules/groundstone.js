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

        formData: {
            description: null,
            notes: null,
            type: null
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
            return state.groundstone ? {
                id: state.groundstone,
                tag: 'Groundstone(' + state.groundstone.id + ') - ' + state.groundstone.find.registration_category + ':' + state.groundstone.find.locus.area.year + '.' +
                    state.groundstone.find.locus.area.area + '.' +
                    state.groundstone.find.locus.locus + '.B' +
                    state.groundstone.find.basket_no + '.N' +
                    state.groundstone.find.item_no,
                description: state.groundstone.description
            } : null;
        },

        groundstonesWithPagination(state) {
            return state.groundstonesWithPagination;
        },

        groundstonesFormatted(state) {
            if (!state.groundstones) {
                return null;
            }

            //return state.groundstones;
            return state.groundstones.map(groundstone => ({
                id: groundstone.id,
                tag: 'Groundstone(' + groundstone.id + ') - ' + groundstone.find.registration_category + groundstone.find.locus.area.year + '.' +
                    groundstone.find.locus.area.area + '.' +
                    groundstone.find.locus.locus + 'B' +
                    groundstone.find.basket_no + 'N' +
                    groundstone.find.item_no,
                description: groundstone.description
            }));
        },

        formData(state) {
            return state.formData;
        },





        groundstonesCount(state) {
            return state.groundstones ? state.groundstones.length : 0;
        },


    },

    mutations: {
        groundstones(state, payload) {



            state.groundstones = payload;
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


        formDataDescription(state, payload) {
            state.formData.description = payload;
        },
        formDataNotes(state, payload) {
            state.formData.notes = payload;
        },
        formDataType(state, payload) {
            state.formData.type = payload;
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


        groundstone({ commit }, payload) {
            //let user = rootGetters.currentUser;
            //let token = user.token;
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return axios.get(`/api/groundstones/${payload}`)
                .then((response) => {
                    commit('groundstone', response.data.groundstone);
                })
                .catch(err => {
                    console.log('store.groundstone axios returned err: ' + err.response);
                })
        },

        groundstoneNext(context) {
            let index = context.state.groundstones.findIndex(lo => lo.id === context.state.groundstone.id);
            if (index == context.state.groundstones.length - 1) {
                index = 0;
            } else {
                ++index;
            }

            context.dispatch('groundstone', context.state.groundstones[index].id)
                .then((response) => {
                    return new Promise((resolve, reject) => {
                        resolve(48);
                    })
                    //return response;
                })
                .catch(err => {
                    console.log('Error in groundstoneNext ' + err.response);
                })
        },
        groundstonePrev(context) {
            let index = context.state.groundstones.findIndex(lo => lo.id === context.state.groundstone.id);
            if (index == 0) {
                index = context.state.groundstones.length - 1;
            } else {
                --index;
            }
            context.dispatch('groundstone', context.state.groundstones[index].id)
                .then((response) => {
                    //nothing to do;
                })
                .catch(err => {
                    console.log('Error in groundstonePrev ' + err.response);
                })
        },

        groundstoneDelete({ state, commit }, payload) {
            return axios
                .delete(`/api/groundstones/${payload}`)
                .then(res => {
                    commit("groundstoneDelete", payload);
                })
                .catch(err => console.log(err));
        },
    }
}