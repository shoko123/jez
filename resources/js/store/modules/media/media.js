import mediaUtils from "./mediaUtils";
export default {
    namespaced: true,

    state: {
        scenes: [],
        collectionMedia: null,
        storageUrl: null,
        dialogAddMedia: false,
        dialogMediaLightBox: false,
        lightBoxSource: null,
    },

    getters: {
        itemMedia(state, getters, rootState, rootGetters) {
            let images = mediaUtils.getMediaArrayFromScenes(state);
            //console.log("image: " + JSON.stringify(images, null, 2))
            return mediaUtils.getSrc(images, false, state, getters, rootState, rootGetters);
        },
        collectionMedia(state, getters, rootState, rootGetters) {
            return mediaUtils.getSrc(state.collectionMedia, true, state, getters, rootState, rootGetters);
            //return state.collectionMedia;
        },
        storageUrl(state) {
            return state.storageUrl;
        },
        srcThumbnailFiller(state) {
            return state.storageUrl + "/static/media/thumbnails/Church_tn.jpeg";
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
        scenes(state, getters) {
            return state.scenes;
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
            console.log("setting storage url to " + payload);        
            state.storageUrl = payload;
        },
        scenes(state, payload) {
            //console.log('medscn/scn/scenes: ' + JSON.stringify(payload, null, 2));
            state.scenes = payload;
        },
        collectionMedia(state, payload) {
            state.collectionMedia = payload;
        },
        addUpdateScene(state, payload) {
            console.log(`addUpdateSscene(): ` + JSON.stringify(payload, null, 2));
            let index = state.scenes.findIndex(x => {
                return x.id === payload.id;
            });
            if (index === -1) {
                state.scenes.push(payload);
            } else {
                state.scenes.splice(index, 1, payload);
            }
        },
        
        deleteScene(state, scene_id) {
            let index = state.scenes.findIndex(x => {
                return x.id === scene_id;
            });
            let message = null;
            if (index === -1) {
                message = "ERROR (could not be found)";
            } else {
                message = "deleted successfully from local store";
                state.scenes.splice(index, 1);
            }
            
            console.log(`med/deleteScene(${scene_id}) - ${message}`);
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
                    .then(res => {
                        //we return the scene that contains the uploaded media.
                        //It may be existing or new. addUpdateScene() will take care of both cases.
                        console.log('upload media returned: ' + JSON.stringify(res.data, null, 2));
                        commit('addUpdateScene', res.data.scene);
                        commit('mgr/setDirtyCollection', true, { root: true });
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
                    //console.log('media delete success. res.data: ' + JSON.stringify(res.data, null, 2));
                    if (res.data.scene) {
                        //scene exists update scene with new image array (without the deleted image).
                        commit('addUpdateScene', res.data.scene);
                    } else {
                        //if the scene was deleted (last mediaItem) we delete it from local store
                        commit('deleteScene', res.data.scene_id);
                    }
                    return res;
                })
                .catch(err => {
                    console.log('media delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },
    }
}