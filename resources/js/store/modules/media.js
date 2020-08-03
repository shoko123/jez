export default {
    namespaced: true,

    state: {
        itemMedia: { collection: [], filler: null },
        collectionMedia: [],
        locusFindsMedia: [],
        dialogAddMedia: false,
        dialogMediaLightBox: false,
        lightBoxSource: null,
        lightBoxIndex: 0,

        appMedia: {
            backgroundUrls: [],
            carouselItems: [],
        }
    },

    getters: {
        itemAllMedia(state) {
            return state.itemMedia.collection;
        },
        itemOneMedia(state, getters) {
            return state.itemMedia.collection.length > 0 ? state.itemMedia.collection[0] : state.itemMedia.filler;
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
                return y;
            });
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
        appMedia(state) {
            return state.appMedia;
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },
        dialogMediaLightBox(state, payload) {
            //console.log('med/dialogLightBox: ' + JSON.stringify(payload, null, 2));

            state.dialogMediaLightBox = payload.value;
            state.lightBoxSource = payload.source;
            state.lightBoxIndex = payload.index;
        },
        lightBoxIndex(state, payload) {
            state.lightBoxIndex = payload;
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
        appMedia(state, payload) {
            state.appMedia = payload;
        },
        deleteFromCollectionMedia(state, index){
            //console.log(`med/deleteFromCollectionMedia index: ${index}`);
            state.collectionMedia.splice(index, 1);
        },
    },
    actions: {
        store({ state, getters, commit, dispatch, rootGetters }, formData) {
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

        loadAppMedia({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/media/app_media`,
                action: "get",
                data: null,
                spinner: false,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading app images`, onSuccess: '', onFailure: 'Failed to load app media', },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('load app media returned: ' + JSON.stringify(res.data, null, 2));
                    commit('appMedia', res.data.appMedia);
                    return res;
                })
        },
    }
}