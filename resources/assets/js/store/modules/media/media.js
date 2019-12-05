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
        
    },
    mutations: {
        media(state, payload) {
            state.media = payload;
        },
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
        /*
        addScene(state, payload) {
            console.log('addScene payload: " ' + JSON.stringify(payload, null, 2));
            state.media.scenes.push(payload);
        },
        updateScene(state, payload) {
            console.log("update to scene: " + JSON.stringify(payload, null, 2))
            let index = state.media.scenes.findIndex(x => {
                return x.id === payload.id;
            });
            if (index === -1) {
                console.log("can't find scene")
            } else {             
                console.log("Found scene, index: " + index);
                state.media.scenes.splice(index, 1);
                state.media.scenes.push(payload);
                //state.media.scenes[index] = JSON.parse(JSON.stringify(payload));
            }
        },
        */
        addUpdateScene(state, payload) {
            console.log("addUpdate to scene: " + JSON.stringify(payload, null, 2))
            let index = state.media.scenes.findIndex(x => {
                return x.id === payload.id;
            });
            if (index === -1) {
                state.media.scenes.push(payload);
            } else {             
                state.media.scenes.splice(index, 1);
                state.media.scenes.push(payload);
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