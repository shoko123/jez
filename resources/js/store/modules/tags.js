export default {
    namespaced: true,
    state: {
        tags: null,
        tagsChosen: [],
    },

    getters: {
        tagsFiltered: (state) => (type) => {
            return state.tags.filter(x => {
                return (x.type == type);
            });
        },

        tags(state) {
            return state.tags;
        },
        tagsChosen(state) {
            return state.tagsChosen;
        },
        categories(state, getters) {           
            return getters.ready ? [...new Set(state.tags.map(x =>  x.type  ))] : [];
        },
        ready(state){
            return !!state.tags;
        }
    },

    mutations: {
        tags(state, payload) {
            state.tags = payload;
        },
        clear(state) {
            tags = [];
            tagsChosen = [];
        },
    },

    actions: {
        storeTags({ state, getters, commit, dispatch, rootGetters, root }, payload) {

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
            //console.log("mgr/store before xhr payload: " + JSON.stringify(xhrRequest, null, 2));
            //return;

            /*
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then(res => {
                    if (rootGetters["mgr/status"].isCreate) {
                        //the server returns an item that is formatted to be inserted into "collection".                       
                        commit('pushIntoCollection', res.data.item);
                    }
                    commit('setDirtyCollection', true);
                    //dispatch("clear");
                    return res;
                })
                .catch(err => {
                    console.log('mgr/store err: ' + err);
                    return err;
                })
                */
        }

    },

    
}