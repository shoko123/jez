export default {
    namespaced: true,

    state: {
        appMediaUrl: null,
        dialogAddMedia: false,
        lightBox: {
            isOpen: false,
            source: "main",
            pageNo: 0,
            indexInChunk: 0,
        },
        carousel: [],
    },

    getters: {
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

                let filler = { "fullUrl": fullUrl, "tnUrl": tnUrl, "hasMedia": false }
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
            if (state.lightBox.isOpen === false) return null;

            let lb = { ...state.lightBox };
            //let c = rootGetters["mgr/collectionMain"];
            let c = rootGetters["mgr/collections"](state.lightBox.source);
            lb["pageNo"] = c.pageNo;
            lb["itemsPerPage"] = c.itemsPerPage;
            lb["length"] = c.collection.length;
            lb["chunk"] = c.chunk;
            lb["media"] = (c.chunk)[state.lightBox.indexInChunk];

            let header,
                media = lb.media ? lb.media : { tag: "" },
                mod = rootGetters["mgr/module"],
                page = lb.pageNo + 1,
                index = (page - 1) * lb.itemsPerPage + lb.indexInChunk + 1,
                length = lb.length,
                itemTag = "";
            if (rootGetters["mgr/status"].isShow) {
                itemTag = rootGetters["mgr/item"]
                    ? rootGetters["mgr/item"].tag
                    : { tag: "" };
            }

            switch (state.lightBox.source) {
                case "main":
                    header = `Showing ${mod} Query Results: ${media.tag}`;
                    break;
                case "media":
                    header = `Showing ${mod} ${itemTag} Related Media`;
                    break;
                case "related":
                    let related;
                    switch (rootGetters["mgr/module"]) {
                        case "Area":
                        case "Season":
                            related = " Areas/Seasons"
                            break;
                        case "AreaSeason":
                            related = "Loci"
                            break;
                        case "Locus":
                            related = "Small Finds"
                            break;
                    }
                    header = `Showing ${mod} ${itemTag} Related ${related}: ${media.tag}`;
                    break;
            }
            lb["header"] = header + ` [${index}/${length}]`;
            return lb;
        },

        
        carousel(state) {
            return state.carousel;
        },
        
        background(state, rootState, getters, rootGetters) {   
            let module = rootGetters["mgr/module"];
            let fullUrl = `${state.appMediaUrl}/backgrounds/${module}.jpg`;
            let tnUrl = `${state.appMediaUrl}/backgrounds/${module}-tn.jpg`;
            return {fullUrl, tnUrl};
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },

        openLightBox(state, payload) {
            if (payload.value) {
                state.lightBox.source = payload.source;
                state.lightBox.page = payload.page;
                state.lightBox.indexInChunk = payload.index;
                //console.log(`med/openLightBox(commit): ${JSON.stringify(payload, null, 2)}`);
            }
            state.lightBox.isOpen = payload.value;
        },

        lightBoxIndexInChunk(state, payload) {
            //console.log(`SET lightBoxIndexInChunk=${payload}`);//: ' + JSON.stringify(err, null, 2));
            state.lightBox.indexInChunk = payload;
        },
        appMediaUrl(state, payload) {
            state.appMediaUrl = payload;
        },
        carousel(state, payload) {
            state.carousel = payload;
        },
        clear(state, payload) {
            //state.itemMedia = { collection: [], filler: null };
        }
    },
    actions: {
        //We used to do pagination and loading here. That is why we don't call a commit directly.
        lightBoxIndex({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`mgr/action.lightBoxIndex(index: ${payload})`);//: ' + JSON.stringify(err, null, 2));
            commit("lightBoxIndexInChunk", payload);
        },

        openLightBox({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            console.log(`med/openLB payload: ${JSON.stringify(payload, null, 2)}`);
            commit("openLightBox", payload);
        },

        //store multiple files r/t a specific dig item
        store({ state, getters, rootGetters, commit, dispatch, }, formData) {
            let xhrRequest = {
                endpoint: `/api/media/store`,
                action: "post",
                data: formData,
                spinner: true,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true },
                messages: {
                    loading: "loading files",
                    onSuccess: "Files uploaded successfully",
                    onFailure: "failed loading media"
                }
            };
            return (
                dispatch("xhr/xhr", xhrRequest, { root: true })
                    .then(res => {
                        console.log('upload media returned: ' + JSON.stringify(res.data, null, 2));
                        //commit to local item
                        commit('mgr/collections', { name: "media", collection: res.data.collection }, { root: true });
                        commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
                        return res;
                    })
                    .catch(err => {
                        console.log("Failed to load files. " + err);
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
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting image`, onSuccess: `image deletes successfully`, onFailure: "failed to delete image", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('delete media returned: ' + JSON.stringify(res.data, null, 2));
                    commit('mgr/collections', { name: "media", collection: res.data.collection }, { root: true });
                    //alert manager that item is dirty
                    commit("mgr/ready", { entity: "item", isReady: false }, { root: true });
                    return res;
                })
                .catch(err => {
                    console.log('media delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },



        //load general media used by the app (backgrounds, fillers, etc.).
        //This media is unrelated to media stored in the DB.
        initAppMedia({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/media/init`,
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
                    commit('appMediaUrl', res.data.appMediaUrl);
                    commit('carousel', res.data.carousel);                    
                    return res;

                }).catch(err => {
                    console.log('initAppMedia failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },
    }
}