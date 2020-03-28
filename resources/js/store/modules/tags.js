export default {
    namespaced: true,
    state: {
        allTags: null,
        itemTags: null,
        newItemTags: null,
        tabs: null,
    },

    getters: {
        tagsFiltered: (state) => (type) => {
            return state.tags.filter(x => {
                return (x.type == type);
            });
        },

        allTags(state) {
            return state.allTags;
        },

        itemTags(state) {
            return state.itemTags;
        },

        newItemTags(state) {
            return state.newItemTags;
        },

       
        tabs(state) {
            return state.tabs;
        },
        categories(state, getters) {
            return getters.ready ? [...new Set(state.allTags.map(x => x.type))] : [];
        },
        ready(state) {
            return !!state.allTags;
        },
        selectedTags(state) {
            if (!state.allTags) {
                return null;
            }
            //let tagFilter = state.tags.filter(x =>  x.selected );
            //console.log("stone.getQueryFilters() selected tags " + JSON.stringify(tagFilter, null, 2));
            return state.allTags.filter(x => x.selected);
        },
    },

    mutations: {

        prepareFilter(state, payload) {
            state.allTags = payload.allTags;
            state.tabs = payload.tabs;
        },

        toggleTag(state, tag) {
            let index = state.allTags.findIndex(x => x.id == tag.id);
            let newTag = { ...tag };
            newTag.selected = !tag.selected;
            //make reactive
            state.allTags.splice(index, 1, newTag);
        },

        clear(state) {
            state.allTags = null;
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
            //let tabs = [...new Set(payload.map(x => x.type))];

            let tabs = [...new Set(payload.map(x => x.type))].map(function (x, index) { return { text: x, index: index } });
            let allTags = payload.map(x => ({ ...x, selected: false }));
            //console.log("tabs: " + JSON.stringify(tabs, null, 2));
            commit("prepareFilter", { tabs: tabs, allTags: allTags });
        },

    },


}