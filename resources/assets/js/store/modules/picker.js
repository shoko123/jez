export default {
    namespaced: true,
    state: {

        name: null,
        initial_shape: null,//button in menu, form in form components            

        tag: null,
        areas: null,
        area_id: null,
        loci: null,
        locus_id: null,
        finds: null,
        find_id: null,
        registration_category: null,
    },

    getters: {
        areas(state) {
            return state.areas;
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


    },

    mutations: {
        areas(state, payload) {
            state.areas = payload;
        },

        area(state, payload) {
            state.area = payload;
        },
    },

    actions: {
        areas({ commit }) {
            console.log('store.area.action.groundstones');
            return axios.get(`/api/groundstones`)
                .then((res) => {
                    commit('groundstones', res.data);
                })
                .catch(err => {
                    console.log('Fail to load groundstones. err: ' + err);
                })
        },
    }
}