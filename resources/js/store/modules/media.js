export default {
    namespaced: true,

    state: {
        //itemMedia: { collection: [], filler: null },
        dialogAddMedia: false,

        lightBox: {
            isOpen: false,
            source: "main",
            pageNo: 0,
            indexInChunk: 0,
        },

        appMedia: {
            backgroundUrls: [],
            carouselItems: [],
        }
    },

    getters: {
        /*
        itemMedia(state) {
            return state.itemMedia.collection;
        },
        */
        mediaPrimary(state, rootState, getters, rootGetters) {
            let m = rootGetters["mgr/collections"]("media").collection;

            if (m.length > 0) { 
                return m[0]
             } else { 
                 let module = rootGetters["mgr/module"];
                 let fullName = `${module}0.jpg`;
                 let tnName = `${module}0-tn.jpg`;
                 let fullUrl = `${rootGetters["mgr/baseUrl"]}/app-media/fillers/${fullName}`;
                 let tnUrl = `${rootGetters["mgr/baseUrl"]}/app-media/fillers/${tnName}`;

                 let filler = {"fullUrl": fullUrl,"tnUrl": tnUrl, "hasMedia": false}
                 return filler; 
                }
        },
        dialogAddMedia(state, getters) {
            return state.dialogAddMedia;
        },

        dialogMediaLightBox(state) {
            return state.lightBox.isOpen;
        },

        lightBox(state, rootState, getters, rootGetters) {
            //let storageName = rootGetters["mgr/storageName"](state.lightBox.source);


            if (state.lightBox.isOpen === false) return state.lightBox;

            let lb = { ...state.lightBox };
            //let c = rootGetters["mgr/collectionMain"];
            let c = rootGetters["mgr/collections"](state.lightBox.source);
            lb["pageNo"] = c.pageNo;
            lb["itemsPerPage"] = c.itemsPerPage;
            lb["length"] = c.collection.length;
            lb["chunk"] = c.chunk;
            lb["media"] = (c.chunk)[state.lightBox.indexInChunk];
            return lb;
        },

        appMedia(state) {
            return state.appMedia;
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },

        openLightBox(state, payload) {
            //console.log('med/dialogLightBox: ' + JSON.stringify(payload, null, 2));
            state.lightBox.isOpen = payload.value;
            if (payload.value) {
                state.lightBox.source = payload.source;
                state.lightBox.page = payload.page;
                state.lightBox.indexInChunk = payload.index;
                console.log(`med/openLightBox(commit): ${JSON.stringify(payload, null, 2)}`);
            }

        },

        lightBoxIndexInChunk(state, payload) {
            //console.log(`SET lightBoxIndexInChunk=${payload}`);//: ' + JSON.stringify(err, null, 2));
            state.lightBox.indexInChunk = payload;
        },

        /*
        itemMedia(state, payload) {
            state.itemMedia = payload;
        },
        */
        appMedia(state, payload) {
            state.appMedia = payload;
        },
        primary(state, payload) {
            state.primary = payload;
        },
        clear(state, payload) {
            //state.itemMedia = { collection: [], filler: null };
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
                        //commit('itemMedia', res.data.itemMedia);
                        commit('mgr/collections', { name: "media", collection: res.data.itemMedia.collection }, { root: true });
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
                    //commit('itemMedia', res.data.itemMedia);
                    commit('mgr/collections', { name: "media", collection: res.data.itemMedia.collection }, { root: true });
                    commit('mgr/setDirtyCollection', true, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('media delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },

        //We used to do pagination and loading here. That is why we don't call a commit directly.
        lightBoxIndex({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`mgr/action.lightBoxIndex(index: ${payload})`);//: ' + JSON.stringify(err, null, 2));
            commit("lightBoxIndexInChunk", payload);
        },

        openLightBox({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`med/openLB payload: ${JSON.stringify(payload, null, 2)}`);
            commit("openLightBox", payload);
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