export default {
    namespaced: true,

    state: {
        appMediaUrl: null,
        dialogAddMedia: false,
        lightBox: {
            isOpen: false,
            source: "main",
            indexInChunk: 0,
        },
        carousel: [],
    },

    getters: {
        dialogAddMedia(state, getters) {
            return state.dialogAddMedia;
        },

        dialogMediaLightBox(state) {
            return state.lightBox.isOpen;
        },

        lightBox(state, rootState, getters, rootGetters) {
            //let storageName = rootGetters["mgr/storageName"](state.lightBox.source);
            if (state.lightBox.isOpen === false) return null;

            function hasDescription(val){
                return (val === undefined || val == null || val.length <= 0) ? true : false;
            }
            function getItemText(item){
                let text = "";
                if(state.lightBox.source === "media") {
                    return "";
                } 
                if(!item.hasMedia){
                    text += `[No media]` + '\n';
                }
                text += item.description ? item.description : " [No description]"
                return text;
            }

            let lb = { ...state.lightBox };
            //let c = rootGetters["mgr/collectionMain"];
            let c = rootGetters["mgr/collections"](state.lightBox.source);
            let item = c.chunk[state.lightBox.indexInChunk];
            lb["pageNo"] = c.pageNo;
            lb["itemsPerPage"] = c.itemsPerPage;
            lb["length"] = c.collection.length;
            lb["chunk"] = c.chunk;
            lb["media"] = (c.chunk)[state.lightBox.indexInChunk];

            let lightBoxHeader, itemHeader,
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
                    //header = `Showing ${mod} Query Results: ${media.tag}`;
                    lightBoxHeader = `${mod} query results (${index}/${length})`;
                    itemHeader = `${mod} ${media.tag}`;
                   
                    break;
                case "media":
                    //header = `Showing ${mod} ${itemTag} Related Media`;
                    lightBoxHeader = `${mod} ${itemTag} media (${index}/${length})`;
                    itemHeader = `Media item ${index}`;
                 
                    break;
                case "related":
                    
                    switch (rootGetters["mgr/module"]) {
                        case "Area":
                        case "Season":
                            lightBoxHeader = `Showing (${length}) areas/seasons related to ${mod} ${itemTag}`;
                            break;
                        case "AreaSeason":
                            lightBoxHeader = `Showing (${length}) loci related to areas/season ${itemTag}`;
                            break;
                        case "Locus":
                            lightBoxHeader = `Showing (${length}) small finds retrieved from locus ${itemTag}`;
                            break;
                    }
                    itemHeader = `${item.tag}  (${index}/${length})`;
                    break;
            }
            let counter = ` (.../...)`;
            if (rootGetters["mgr/ready"].chunk) {
                counter = ` (${index}/${length})`;
            }
            lb["header"] = "******"; //[${index}/${length}]`;
            lb["lightBoxHeader"] = lightBoxHeader; 
            lb["itemHeader"] = itemHeader; 
            lb["itemText"] = getItemText(item); 
            return lb;
        },


        carousel(state) {
            return state.carousel;
        },

        background(state, rootState, getters, rootGetters) {
            let module = rootGetters["mgr/module"];
            let fullUrl = `${state.appMediaUrl}/backgrounds/${module}.jpg`;
            let tnUrl = `${state.appMediaUrl}/backgrounds/${module}-tn.jpg`;
            return { fullUrl, tnUrl };
        },
    },
    mutations: {
        dialogAddMedia(state, payload) {
            state.dialogAddMedia = payload;
        },

        openLightBox(state, payload) {
            state.lightBox.isOpen = payload.value;
            if (payload.value) {
                state.lightBox.source = payload.source;
                state.lightBox.indexInChunk = payload.index;
                //console.log(`med/openLightBox(commit): ${JSON.stringify(payload, null, 2)}`);
            }

        },

        indexInChunk(state, payload) {
            state.lightBox.indexInChunk = payload;
        },
        appMediaUrl(state, payload) {
            state.appMediaUrl = payload;
        },
        carousel(state, payload) {
            state.carousel = payload;
        },
    },
    actions: {
        lightBoxNext({ state, rootState, getters, rootGetters, commit, dispatch }, payload) {
            //console.log(`med/lightbox(${payload ? "next" : "prev"}) lightBox: ${JSON.stringify(state.lightBox, null, 2)}`);
            let lb = getters["lightBox"];
            let pages = Math.floor((lb.length - 1) / lb.itemsPerPage) + 1;
            let newPage;//base 1

            if (payload) {
                //next
                if (state.lightBox.indexInChunk === lb.chunk.length - 1) {
                    //need to load a new page  (either next or first [if current is last])            
                    commit("mgr/ready", { entity: "chunk", isReady: false }, { root: true });
                    let newPage = pages === lb.pageNo + 1 ? 1 : lb.pageNo + 2;
                    //console.log(`**next(last)** length: ${lb.length} indexInChunk: ${state.lightBox.indexInChunk} chunkLength: ${lb.chunk.length} currentPageNo(Base0) : ${lb.pageNo} pages: ${pages} ipp: ${lb.itemsPerPage} newPage(base1): ${newPage}`);      
                    commit("indexInChunk", 0);
                    return dispatch("mgr/page", { name: state.lightBox.source, page: newPage }, { root: true })
                        .then((res) => {
                            commit("mgr/ready", { entity: "chunk", isReady: true }, { root: true });
                        });

                } else {
                    commit("indexInChunk", lb.indexInChunk + 1);
                }
            } else {
                //'prev'
                if (state.lightBox.indexInChunk === 0) {
                    newPage = lb.pageNo === 0 ? pages : lb.pageNo;
                    //new index will be the index of the last item in the last chunk. Lets find it:
                    let newIndexInChunk = lb.pageNo === 0 ? lb.length - (pages - 1) * lb.itemsPerPage - 1 : lb.itemsPerPage - 1;

                    //console.log(`**prev(0)** length: ${lb.length} pages: ${pages} ipp: ${lb.itemsPerPage} pageNo: ${lb.pageNo} newIndexInChunk=${newIndexInChunk}`);       
                    commit("mgr/ready", { entity: "chunk", isReady: false }, { root: true });
                    return dispatch("mgr/page", { name: state.lightBox.source, page: newPage }, { root: true }).then(() => {
                        commit("indexInChunk", newIndexInChunk);
                        commit("mgr/ready", { entity: "chunk", isReady: true }, { root: true });
                    });
                } else {
                    commit("indexInChunk", lb.indexInChunk - 1);
                }
            }
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
                        commit("mgr/ready", { entity: "chunk", isReady: false }, { root: true });
                        dispatch("mgr/page", { name: "main", page: rootGetters["mgr/collections"]("main").pageNo + 1 }, { root: true });
                        return res;
                    })
                    .catch(err => {
                        console.log("Failed to load files. " + err);
                        return err;
                    })
            );
        },

        //delete a single media item.
        delete({ state,  getters, rootGetters, commit, dispatch }, payload) {
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
                    commit("mgr/ready", { entity: "chunk", isReady: false }, { root: true });
                    dispatch("mgr/page", { name: "main", page: rootGetters["mgr/collections"]("main").pageNo + 1 }, { root: true });

                    return res;
                })
                .catch(err => {
                    console.log('media delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },



        //load general media used by the app (backgrounds, fillers, etc.).
        //This media is unrelated to media stored in the DB.
        getAppMedia({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/media/app-media`,
                action: "get",
                data: null,
                spinner: false,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading app's media`, onSuccess: '', onFailure: 'Failed to load app media', },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('load app media returned: ' + JSON.stringify(res.data, null, 2));
                    commit('appMediaUrl', res.data.appMediaUrl);
                    commit('carousel', res.data.carousel);
                    return res;

                }).catch(err => {
                    console.log('getAppMedia failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })
        },
    }
}