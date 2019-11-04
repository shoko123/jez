import images from './images.js';

export default {
    namespaced: true,
    modules: {
        images: images,
    },

    state: {
        media: {
            scenes: null,
            illustrations: null,
            plans: null,
        }
    },

    getters: {
        media(state) {
            return state.media;
        },
    },
    mutations: {
        media(state, payload) {
            state.media = payload;
        },

    },
    actions: {

    }
}