import mediaUtils from "./mediaUtils";
export default {
    namespaced: true,

    state: {
        scenes: [],
        itemMedia: [],
        collectionMedia: [],
        collectionMedia1: [],
        locusFindsMedia: [],
        storageUrl: null,
        dialogAddMedia: false,
        dialogMediaLightBox: false,
        lightBoxSource: null,
        lightBoxIndex: 0,


    },

    getters: {
        itemMedia(state, getters, rootState, rootGetters) {
            let images = mediaUtils.getMediaArrayFromScenes(state);
            //console.log("image: " + JSON.stringify(images, null, 2))
            return mediaUtils.getSrc(images, false, state, getters, rootState, rootGetters);
        },
        itemAllMedia(state) {          
            return state.itemMedia;
        },
        itemOneMedia(state, getters) {          
            return state.itemMedia.length > 0 ? state.itemMedia[0] : {status: 'no_media', tnUrl: getters["srcThumbnailFiller"]};
        },
        collectionMedia(state, getters, rootState, rootGetters) {
            return mediaUtils.getSrc(state.collectionMedia, true, state, getters, rootState, rootGetters);
            //return state.collectionMedia;
        },
        collectionMedia1(state, getters, rootState, rootGetters) {
            return state.collectionMedia1.map(function (x, index) {
                let y = { ...x };
                
                    y["tag"] = rootGetters["mgr/collection"][index].tag;
                    y["item_id"] = rootGetters["mgr/collection"][index].id;
                    let text = null;
                    switch (rootGetters["mgr/moduleInfo"].itemName) {
                        case "Locus":
                            text = rootGetters["mgr/collection"][index].description;
                            break;
                        case "Pottery":
                            text = rootGetters["mgr/collection"][index].periods;
                            break;
                        case "Stone":
                            text = rootGetters["mgr/collection"][index].description;
                            break;
                    }
                    y["text"] = text;
              
                if (x.status === "no_media") {                
                    y["tnUrl"] = rootGetters["med/srcThumbnailFiller"];
                }
                return y;
            });
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
        lightBoxIndex(state) {
            return state.lightBoxIndex;
        },
        scenes(state, getters) {
            return state.scenes;
        },
        locusFindsMedia(state) {
            return state.locusFindsMedia;
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
        dialogMediaLightBox(state, payload) {
            console.log('med/dialogLightBox: ' + JSON.stringify(payload, null, 2));

            state.dialogMediaLightBox = payload.value;
            state.lightBoxSource = payload.source;
            state.lightBoxIndex = payload.index;
        },
        lightBoxIndex(state, payload) {
            state.lightBoxIndex = payload;
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
        collectionMedia1(state, payload) {
            state.collectionMedia1 = payload;
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
        itemMedia(state, payload) {
            state.itemMedia = payload;
        },
        locusFindsMedia(state, payload) {
            state.locusFindsMedia = payload;
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
                endpoint: `/api/scenes/store`,
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