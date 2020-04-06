export default {
    namespaced: true,
    state: {
        //filter collection
        collectionAllTags: null,

        //item read only tags
        itemTags: null,

        //internal use
        itemAllTags: null,

        //edit tags
        itemNewAllTags: null,

        categories: null,
    },

    getters: {
        tagsFiltered: (state) => (type) => {
            return state.tags.filter(x => {
                return (x.type == type);
            });
        },

        allTags(state, getters, rootState, rootGetters) {
            //used by both collection filter, and TagsNew components
            switch (rootGetters["mgr/status"].action) {
                case "filter":
                    return state.collectionAllTags;
                case "tags":
                    return state.itemNewAllTags;
                default:
                    return [];
            }

        },

        itemTags(state) {
            return state.itemTags;
        },


        categories(state) {
            return state.categories;
        },

        ready(state) {
            return !!state.collectionAllTags;
        },
        selectedTags(state) {
            if (!state.collectionAllTags) {
                return null;
            }
            //let tagFilter = state.tags.filter(x =>  x.selected );
            //console.log("stone.getQueryFilters() selected tags " + JSON.stringify(tagFilter, null, 2));
            return state.collectionAllTags.filter(x => x.selected);
        },
    },

    mutations: {

        prepareFilter(state, payload) {
            state.collectionAllTags = payload.collectionAllTags;
            state.categories = payload.categories;
        },

        updateCollectionFilterTag(state, payload) {
            state.collectionAllTags.splice(payload.index, 1, payload.newTag);
        },
        updateNewItemTag(state, payload) {
            state.itemAllTags.splice(payload.index, 1, payload.newTag);
        },

        itemTags(state, payload) {
            state.itemTags = payload;
        },

        clearAllCollectionFilterSelections(state) {      
                state.collectionAllTags.forEach(x => x.selected = false);         
        },
        clearAllNewItemTagsSelections(state) {         
                state.itemNewAllTags.forEach(x => x.selected = false);
        },

        populateNewItemTags(state, payload) {     
            //console.log("populateNewItemTags" + JSON.stringify(payload, null, 2)); 
                state.itemAllTags = payload;
                state.itemNewAllTags = payload;         
        },

        clear(state) {
            state.collectionAllTags = null;
            state.itemTags = null;
        },
    },

    actions: {
        storeTags({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            /*
            let newItem = {
                item_type: getters["mgr/status"].module,
                item_id: getters["mgr/status"].id,
                tags: [
                    {
                        type: "stone:material",
                        name: "Basalt-dense"
                    },
                    {
                        type: "stone:typology",
                        name: "active"
                    },
                    {
                        type: "stone:active-name",
                        name: "handstone"
                    },
                ]
            };


            let xhrRequest = {
                endpoint: `/api/stone-types/store`,
                action: rootGetters["mgr/status"].isCreate ? 'post' : 'put',
                data: newItem,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "storing item", onSuccess: `item ${getters["status"].isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save item`, },
            };
            */
        },

        prepareFilter({ commit }, payload) {
            //console.log("payload: " + JSON.stringify(payload, null, 2));
            //let categories = [...new Set(payload.map(x => x.type))];

            let categories = [...new Set(payload.map(x => x.type))].map(function (x, index) { return { text: x, index: index } });
            let collectionAllTags = payload.map(x => ({ ...x, selected: false }));
            //console.log("categories: " + JSON.stringify(categories, null, 2));
            commit("prepareFilter", { categories: categories, collectionAllTags: collectionAllTags });
        },

        prepareNewItemTags({ state, commit, dispatch }, payload) {    
            //copy collection tags
            let itemAllTags = [...state.collectionAllTags];
            
            //clear all selections
            itemAllTags.forEach(x => {
                x.selected = false;
            });

            //"copy" selected tags from current itemTags
              state.itemTags.forEach(x => {                        
               let index = itemAllTags.findIndex(y => x.id  == y.id);
               itemAllTags[index].selected = true;
            });
            
            //console.log("prepareNewItemTags" + JSON.stringify(itemAllTags, null, 2));
            
            commit("populateNewItemTags", itemAllTags);
        },

        toggleTag({ state, rootGetters, commit }, tag) {
            let isFilter = rootGetters["mgr/status"].isFilter;
            let collection = isFilter ? state.collectionAllTags : state.itemNewAllTags;
            let index = collection.findIndex(x => x.id == tag.id);
            let newTag = { ...tag };
            newTag.selected = !tag.selected;

            //make vue reactive (can't just collection[index].selected = !collection[index].selected).
            if (isFilter) {
                commit("updateCollectionFilterTag", { index: index, newTag: newTag });
            } else {
                commit("updateNewItemTag", { index: index, newTag: newTag });
            }
        },
    },


}