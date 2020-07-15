export default {
    namespaced: true,

    state: {
        itemMedia: [],
        collectionMedia: [],
        locusFindsMedia: [],
        storageUrl: null,
        dialogAddMedia: false,
        dialogMediaLightBox: false,
        lightBoxSource: null,
        lightBoxIndex: 0,
    },

    getters: {
        itemAllMedia(state) {
            return state.itemMedia;
        },
        itemOneMedia(state, getters) {
            return state.itemMedia.length > 0 ? state.itemMedia[0] : { status: 'no_media', tnUrl: getters["srcThumbnailFiller"] };
        },

        collectionMedia(state, getters, rootState, rootGetters) {
            return state.collectionMedia.map(function (x, index) {
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

                //if (x.status === "no_media") {
                //    y["tnUrl"] = rootGetters["med/srcThumbnailFiller"];
                //}
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

        collectionMedia(state, payload) {
            state.collectionMedia = payload;
        },

        itemMedia(state, payload) {
            state.itemMedia = payload;
        },
        locusFindsMedia(state, payload) {
            //console.log(`med/locusFindsMedia: ` + JSON.stringify(payload, null, 2));
            state.locusFindsMedia = payload;
        },
    },
    actions: {
        store({ state, getters, commit, dispatch, rootGetters }, formData) {

            //let data = JSON.stringify(Object.fromEntries(formData));
            let xhrRequest = {
                endpoint: `/api/media/store`,
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
                        console.log('upload media returned: ' + JSON.stringify(res.data, null, 2));
                        commit('itemMedia', res.data.itemMedia);
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
                endpoint: `/api/media`,
                action: "delete",
                data: payload,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting image`, onSuccess: `image deletes successfully`, onFailure: "failed to delete image", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('delete media returned: ' + JSON.stringify(res.data, null, 2));
                    commit('itemMedia', res.data.itemMedia);
                    commit('mgr/setDirtyCollection', true, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('media delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },
    }
}