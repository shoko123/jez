export default {
    namespaced: true,
    state: {
      areasSeasons: [],
    },

    getters: {
        areasSeasons(state) {
            return state.areasSeasons;
        },
    },

    mutations: {
        areasSeasons(state, payload) {
            
            //console.log('gs formatted and ordered list: ' + JSON.stringify(gs_formatted, null, 2));
            state.areasSeasons = payload;
        },

      
    },

    actions: {
        collection({ state, commit, dispatch }, payload) {
            state.groundstones = null;

            let xhrRequest = {
                endpoint: `/api/groundstones`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: "loading groundstones", onSuccess: null, onFailure: "failed loading groundstones", },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //console.log('gss collection after xhr res: ' + JSON.stringify(res, null, 2));
                    commit('groundstones', res.data.groundstones);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },
        item({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/groundstones/${payload}`,
                action: "get",
                data: null,
                verbose: false,
                snackbar: { onSuccess: false, onFailure: true, },
                messages: { loading: `loading groundstone with id: ${payload}`, onSuccess: null, onFailure: "failed loading groundstone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    //we seperate the data into two parts - grounstone and find.
                    commit('fnd/find', res.data.find, { root: true });
                    //TODO currently we can't delete find as part of gs because it is used for making tag - needs fix.
                    //delete res.data.groundstone.find;
                    commit('groundstone', res.data.groundstone);
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },
        prepareNewItem({ state, getters, commit, dispatch, rootGetters }, payload) {
            dispatch("materials");
            dispatch("stoneTypes");

            commit("prepareNewGroundstone", rootGetters["mgr/isCreate"]);
            commit('fnd/prepareNewFind', rootGetters["mgr/isCreate"], { root: true });
        },

        //delete groundstone by id - must be accompanied by deleting corresponding find record.
        delete({ commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/groundstones/${payload}`,
                action: "delete",
                data: null,
                verbose: false,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting groundstone with id: ${payload}`, onSuccess: `Delete successfull, redirected to first groundstone`, onFailure: "failed to delete groundstone", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('gss.delete after dispatch res: ' + JSON.stringify(res, null, 2));
                    commit('deleteFromStore', res.data.groundstone.id);
                    return res;
                })
                .catch(err => {
                    console.log('gss Failed to delete groundstone. err: ' + err);
                    return err;
                })

        },

        store({ state, getters, commit, dispatch, rootGetters, root }, payload) {
            let newGroundstone = {
                groundstone: state.newItem.data,
                find: rootGetters["fnd/newFindData"],
            };
            //console.log("find.before create: " + JSON.stringify(this.findFormData));
            console.log("store.gs.store payload: " + JSON.stringify(newGroundstone, null, 2));
            let xhrRequest = {
                endpoint: `/api/groundstones/create`,
                action: getters.isCreate ? 'post' : 'put',
                data: newGroundstone,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: "saving groundstone", onSuccess: `Groundstone ${getters.isCreate ? 'created' : 'updated'} successfully`, onFailure: `failed to save groundstone`, },
            };

            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log("store.gs.store after xhr res: " + JSON.stringify(res, null, 2));
                    return res;
                })
                .catch(err => {
                    //console.log('gss Failed to load groundstones. err: ' + err);
                    return err;
                })
        },



    }
}