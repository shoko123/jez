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
        },
        dialogAddMedia: false,
    },

    getters: {
        media(state) {
            return state.media;
        },
        dialogAddMedia(state, getters) {
            return state.dialogAddMedia;
        },
    },
    mutations: {
        media(state, payload) {
            state.media = payload;
        },
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
    },
    actions: {

    }
}