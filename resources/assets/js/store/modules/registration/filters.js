export default {
    namespaced: true,
    state: {

    },

    getters: {
        areasSeasons(state) {
            return state.areasSeasons ? state.areasSeasons.map(x => {
                return { id: x.id, id_string: x.year - 2000 + '.' + x.area, tag: x.year - 2000 + '/' + x.area };
            }) : null;
        },
    },
    mutations: {
        areasSeasons(state, payload) {
            state.areasSeasons = payload;
        },
    },
    actions: {     

    }
};
