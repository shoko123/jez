export default {
    namespaced: true,

    state: {
        itemMedia: { collection: [], filler: null },
        dialogAddMedia: false,
        dialogMediaLightBox: false,

        lightBox: {
            isOpen: false,
            source: "main",
            index: 0,
        },
        lightBoxItem: {
            fullUrl: null,
            tnUrl: null,
            text: "",
        },
        lightBoxSource: null,
        lightBoxIndex: 0,

        appMedia: {
            backgroundUrls: [],
            carouselItems: [],
        }
    },

    getters: {
        itemMedia(state) {
            return state.itemMedia.collection;
        },

        itemOneMedia(state, getters) {
            return state.itemMedia.collection.length > 0 ? state.itemMedia.collection[0] : state.itemMedia.filler;
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

        lightBoxCollection(state, rootState, getters, rootGetters) {
            switch (state.lightBox.source) {
                case "main":
                    return rootGetters["mgr/collectionMain"].collection;

                case "related":
                    return rootGetters["mgr/collectionRelated"].collection;

                case "media":
                    return state.itemMedia.collection;
            }
        },
        lightBoxItem(state, rootState, getters, rootGetters) {
            return state.lightBoxItem;
        },
        
        lightBox(state, rootState, getters, rootGetters) {
            return state.lightBox;
            switch (state.lightBox.source) {
                case "main":
                    lb["item"] = (rootGetters["mgr/collectionMain"].collection)[state.lightBox.index];
                    break;
                case "related":
                    lb["item"] = (rootGetters["mgr/collectionRelated"].collection)[state.lightBox.index];
                    break;

                case "media":
                    break;
            }
            return lb;
        },
        primary(state) {
            return state.primary;
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
            state.lightBox.index = payload.index;
            state.lightBox.item = payload.item;
            state.lightBox.source = payload.source;
        },
        lightBoxOpen(state, payload) {
            state.lightBox.isOpen = payload;
        },
        lightBoxIndex(state, payload) {
            state.lightBoxIndex = payload;
        },
        lightBoxItem(state, payload) {
            state.lightBoxItem = payload;
        },

        itemMedia(state, payload) {
            state.itemMedia = payload;
        },

        appMedia(state, payload) {
            state.appMedia = payload;
        },
        primary(state, payload) {
            state.primary = payload;
        },
        clear(state, payload) {
            state.itemMedia = { collection: [], filler: null };
        }
    },
    actions: {
        //store multiple files r/t a specific dig item
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

        //delete a single media item.
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

        //if we are on the 'main' collection, we need to load the item+media for the light box.
        //'related` and 'media' collections have urls already loaded.
        lightBoxIndex({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`mgr/lightBoxIndex(index: ${payload})`);//: ' + JSON.stringify(err, null, 2));
            let newItem = rootGetters["mgr/collectionMain"].collection[payload];
            console.log(`newItem: ${JSON.stringify(newItem, null, 2)})`);
            let id = rootGetters["mgr/collectionMain"].collection[payload].id;
            let xhrRequest = {
                endpoint: `${rootGetters["mgr/status"].moduleApiBaseUrl}/lightbox/${newItem.id}`,
                action: "get",
                data: null,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading media...`/* with id: ${payload} */, onSuccess: null, onFailure: "failed loading media", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('load app media returned: ' + JSON.stringify(res.data, null, 2));
                    commit('lightBoxItem', res.data.item);
                    return res;
                }).catch(err => {
                    console.log('loadPrimary failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },


        //load general media used by the app (backgrounds, fillers, etc.).
        //This media is unrelated to media stored in the DB.
        loadAppMedia({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/media/app-media`,
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
                }).catch(err => {
                    console.log('loadAppMedia failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },
    }
}