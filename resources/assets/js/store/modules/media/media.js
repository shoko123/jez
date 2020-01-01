import scenes from './scenes.js';
import images from './images.js';

export default {
    namespaced: true,
    modules: {
        scn: scenes,
        img: images,
    },

    state: {
        media: {
            scenes: [],
            images: [],
            illustrations: [],
            plans: [],
        },
        storageUrl: "http://jez/storage",
        
        dialogAddMedia: false,
        dialogMediaLightBox: false,
    },

    getters: {
        storageUrl(state) {
            return state.storageUrl;
        },
        srcThumbnailFiller(state) {
            return state.storageUrl + "/static/images/thumbnails/Church_tn.jpeg";
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
        media(state,  payload) {
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
        uploadMultiple({ state, getters, commit, dispatch, rootGetters }, formData) {

            //let data = JSON.stringify(Object.fromEntries(formData));
            let xhrRequest = {
                endpoint: `/api/files/store`,
                action: "post",
                data: formData,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true },
                messages: {
                    loading: "loading files",
                    onSuccess: "Files uploaded successfully",
                    onFailure: "failed loading files"
                }
            };
            return (
                dispatch("xhr/xhr", xhrRequest, { root: true })
                    //return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then(res => {
                        console.log('upload multiple images returned scene : ' + JSON.stringify(res.data.scene, null, 2));
                        commit('addUpdateScene', res.data.scene);
                        return res;
                    })
                    .catch(err => {
                        console.log("Upload Failed to load files. err: " + err);
                        return err;
                    })
            );
        },
        delete({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/files`,
                action: "delete",
                data: payload,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting image`, onSuccess: `image deletes successfully`, onFailure: "failed to delete image", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('images delete success. res: ' + JSON.stringify(res, null, 2));
                    if(res.data.scene) {
                        //update to a scene without the deleted image
                        commit('addUpdateScene', res.data.scene);
                    } else {
                        commit('deleteScene', res.data.scene);
                        //state.media.scenes.splice(res.data.deletedSceneId, 1);
                        //state.media.scenes.splice(index, 1);
                    }
                    return res;
                })
                .catch(err => {
                    console.log('images delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })

        },
    }
}