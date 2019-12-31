import images from './images.js';

export default {
    namespaced: true,
    modules: {
        img: images,
    },

    state: {
        media: {
            scenes: [],
            illustrations: [],
            plans: [],
        },
        dialogAddMedia: false,
        dialogMediaLightBox: false,
    },
    

    getters: {

        storageUrl(state) {
            return "http://jez/storage";
        },
        baseDbImageUrl(state) {
            return "http://jez/storage/app/public/DB/images";
        },

        media(state) {
            return state.media;
        },
        dialogAddMedia(state, getters) {
            return state.dialogAddMedia;
        },
        dialogMediaLightBox(state, getters) {
            return state.dialogMediaLightBox;
        },
    },
    mutations: {
        media(state, payload) {
            state.media = payload;
        },
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
        dialogMediaLightBox(state, payload) {
            state.dialogMediaLightBox = payload;
        },
    
        addUpdateScene(state, payload) {
            console.log("addUpdate to scene: " + JSON.stringify(payload, null, 2))
            let index = state.media.scenes.findIndex(x => {
                return x.id === payload.id;
            });
            if (index === -1) {
                state.media.scenes.push(payload);
            } else {             
                state.media.scenes.splice(index, 1, payload);
                //state.media.scenes.push(payload);
            }
        },
        deleteScene(state, payload) {
            state.media.scenes.splice(payload, 1);
        },
    },
    actions: {
        media(state) {
            ;
        },
    }
}