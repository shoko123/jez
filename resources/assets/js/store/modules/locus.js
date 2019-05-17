export default {
    state: {
        areas: [],
        areasWithLoci: [],
        loci_buttons: [],
        locus: null,
        loci: [],
        next_locus_id_to_show: null,
        new_locus_tag: {},
    },

    getters: {
        loci(state) {
            return state.loci;
        },
        locus(state) {
            var locus = state.locus;
            //locus[tag] = state.locus.area.year + '.' + state.locus.area.area + '.' + state.locus.locus;
            //return state.locus;
            return locus;
        },

        findLocusById: (state) => (locus_id) => {
            return state.loci.find(lo => lo.id == locus_id);
        },

        findLocusByTag: (state) => (locus_tag) => {
            return state.loci.find(lo => lo.dig_year == locus_tag.year &&
                lo.area == locus_tag.year &&
                lo.locus_no == locus_tag.locus_no);
        },

        //add tag to areas
        areas(state) {
            //return state.areas;
            return state.areas.map(ar => ({
                tag: ar.year + "." + ar.area,
                year: ar.year,
                area: ar.area,
                id: ar.id
            }));
        },
 
        getAreaById: (state) => (id) => {
            return state.areas.find(ar => ar.id === id);
        },
        newLocusTag(state) {
            return state.new_locus_tag;
        },
        area(state) {
            return state.area;
        },
        mainMenuItems(state) {
            return state.mainMenuItems;
        },
        loci_buttons(state) {
            return state.loci_buttons;
        },
        areasWithLoci(state) {
            return state.areasWithLoci;
        }
    },
    mutations: {
        loci(state, payload) {
            //alert('loaded loci');
            state.loci = payload;
        },

        locus(state, payload) {
            //alert('loaded loci');
            state.locus = payload;
            state.locusHeaderDisplayOptions = {
                showingLociList: false,
                showingOneLocus: true,
                showingNewLocus: false,
            };
        },

        locusDeleteFromList(state, payload) {
            //alert('loaded loci');
            let index = state.loci.findIndex(lo => lo.id === payload);
            if (index === -1) {
                console.log('store - locus delete - couldn\'t find locus with id: ' + payload);
                return;
            }

            state.loci.splice(index, 1);
            //alert('loaded loci');

        },

        areas(state, payload) {
            state.areas = payload;
        },
        areasWithLoci(state, payload) {
            //console.log('store.lo.mutation.areasWithLoci set: ' + JSON.stringify(payload))
            state.areasWithLoci = payload;
        },
        newLocusTag(state, payload) {
            state.new_locus_tag = payload;
        },
    },
    actions: {
        areas(context) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.get(`/api/areas`)
                .then((res) => {
                    context.commit('areas', res.data.areas);
                })
                .catch(err => { console.log(err) })
        },

        area(context, payload) {
            context.commit('area', payload);
        },

        newLocusTag(context, payload) {
            context.commit('newLocusTag', payload);
        },

        loci(context) {
            //alert('before getLoci api');
            axios.get('/api/loci')
                .then((response) => {
                    context.commit('loci', response.data.data);
                })
                .catch(err => {
                    //alert('STORE axios error @LociGet');
                    console.log(err.response);
                    //router.push({ path: "/" })
                })
        },

        //locus({context, rootGetters}, payload) {
        locus(context, payload) {


            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.currentUser.token;
            
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                axios.get(`/api/loci/${payload.locus_id}`)
                    .then(response => {
                        // http success, call the mutator and change something in state
                        if (payload.mutate) {
                            context.commit('locus', response.data.locus);
                        }
                        //console.log('store.locus data: ' + JSON.stringify(response.data.locus));
                        //console.log('store.dispatch locus returned from axios ' + response.data.locus);
                        //resolve(JSON.stringify(response.data.locus));    
                        resolve(response.data.locus);                      //resolve(response);  // Let the calling function know that http is done. You may send some data back
                    }, error => {
                        // http failed, let the calling function know that action did not work out
                        reject(new Error('failed to retrieve locus ' + payload.locus_id + ' err: ' + error));
                    })

            })
        },

        locusNext(context) {
            let index = context.state.loci.findIndex(lo => lo.id === context.state.locus.id);
            if (index == context.state.loci.length - 1) {
                index = 0;
            } else {
                ++index;
            }

            let payload = {
                locus_id: context.state.loci[index].id,
                mutate: true
            };

            //this.$store.dispatch("locus", payload);
            context.dispatch('locus', payload)
                //context.dispatch('locus', context.state.loci[index].id)
                .then((response) => {
                    return new Promise((resolve, reject) => {

                        resolve(48);
                    })
                    //return response;
                })
                .catch(err => {
                    console.log('Error in LocusNext ' + err.response);
                })

        },
        locusPrev(context) {
            let index = context.state.loci.findIndex(lo => lo.id === context.state.locus.id);
            if (index == 0) {
                index = context.state.loci.length - 1;
            } else {
                --index;
            }

            let payload = {
                locus_id: context.state.loci[index].id,
                mutate: true
            };

            //this.$store.dispatch("locus", payload);
            context.dispatch('locus', payload)
                //context.dispatch('locus', context.state.loci[index].id)
                .then((response) => {
                    //;
                })
                .catch(err => {
                    console.log('Error in LocusPrev ' + err.response);
                })

        },
        LocusDelete(context, payload) {
            //console.log('locus dispatch before ajax payload: ' + payload);
            axios.delete(`/api/loci/${payload}`)
                .then((res) => {
                    //alert("locus " + res.data.data.locus_id + " deleted");
                    //context.commit('setLocus', res.data.data);
                })
                .catch(err => { console.log(err) })
        },
        loci_buttons(context, payload) {
            console.log('loci_buttons' + JSON.stringify(payload));
        },


        areasWithLoci({ commit, rootGetters }, payload) {

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootGetters.currentUser.token;

            return axios.get("/api/areas/areasWithLoci")
                .then((res) => {
                    commit('areasWithLoci', res.data.areas);
                    
                    //necessary to return data for next promise subscriber
                    return res.data.areas;
                })
                .catch(err => {
                    console.log('axios returned with error: ' + err);

                    //necessary to return error for next promise subscriber
                    return (new Error('fail'));
                });
        },
    }

};
