import scenes from './scenes.js';
import images from './images.js';

export default {
    namespaced: true,
    modules: {
        scn: scenes,
        img: images,
    },

    state: {
        dialogAddMedia: false,
        dialogMediaLightBox: false,
        lightBoxSource: null,
    },

    getters: {
        storageUrl(state) {
            return state.storageUrl;
        },
        srcThumbnailFiller(state) {
            return state.storageUrl + "/static/images/thumbnails/Church_tn.jpeg";
        },

        dialogAddMedia(state, getters) {
            return state.dialogAddMedia;
        },
        dialogMediaLightBox(state) {
            return state.dialogMediaLightBox;
        },
        lightBoxSource(state) {
            return state.lightBoxSource;
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
        dialogMediaLightBox(state, payload) {
            state.dialogMediaLightBox = payload.value;
            state.lightBoxSource = payload.source;
        },
        storageUrl(state, payload) {
            state.storageUrl = payload;
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
                        console.log('upload multiple images returned: ' + JSON.stringify(res.data, null, 2));
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
                    if (res.data.scene) {
                        //update to a scene without the deleted image
                        commit('addUpdateScene', res.data.scene);
                    } else {
                        commit('deleteScene', res.data.scene);
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