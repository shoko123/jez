export default {
    state: {
        areas: [],
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
            locus[tag] = state.locus.area.year + '.' + state.locus.area.area + '.' + state.locus.locus;
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
        //area(state) {
        //    return state.area;
        //},

        locus(state) {
            return state.locus;
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
        /*
        locusNext(state) {
            let index = state.loci.findIndex(lo => lo.id === state.locus.id);
            if(index == state.loci.length - 1){
                state.locus = state.loci[0];
               }else{
                state.locus = state.loci[++index];
               }
            

        },
        locusPrev(state) {
            let index = state.loci.findIndex(lo => lo.id === state.locus.id);
            if(index ==  0){
                state.locus = state.loci[state.loci.length -1];
               }else{
                state.locus = state.loci[--index];
               }
        },
        */

        areas(state, payload) {
            state.areas = payload;
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

        locus(context, payload) {

            context.commit("isLoading", {
                value: true,
                message: "loading locus",
                progressColor: "purple"
            });

            //alert('before getLoci api');
            //console.log('store.dispatch locus_id: ' + payload);
            axios.get(`/api/loci/${payload}`)
                .then((response) => {
                    context.commit('locus', response.data.locus);
                    context.commit("isLoading", { value: false });
                    //return response.data.locus.id;
                    //console.log('store.resolved and commited locus_id: ' + response.data.locus.id);

                })
                .catch(err => {
                    //alert('STORE axios error @LociGet');
                    console.log(err.response);
                    context.commit("snackbar", {
                        value: true,
                        message: "Locus could not be found",
                        timeout: 5000,
                        color: "green",
                        mode: ""
                    });
                    context.commit("isLoading", { value: false });
                    //throw new Error('Higher-level error. ' + err.message);
                })
        },

        locus1(context, payload) {

            context.commit("isLoading", {
                value: true,
                message: "loading locus",
                progressColor: "purple"
            });
            let deferred = Promise.deferred;
            //alert('before getLoci api');
            axios.get(`/api/loci/${payload.id}`)
                .then((res) => {
                    context.commit('locus', res.data.locus);
                    context.commit("isLoading", { value: false });
                    //return response.data.locus.id;
                    deferred.resolve(res.data.locus.id);



                    //return new Promise((resolve, reject) => {
                    //       console.log('store.dispatch locus_id: ' + response.data.locus.id);
                    //       resolve(response.data.locus.id);



                })
                .catch(err => {
                    //alert('STORE axios error @LociGet');
                    context.commit("isLoading", { value: false });
                    console.log(err.response);
                    context.commit("snackbar", {
                        value: true,
                        message: "Locus could not be found",
                        timeout: 5000,
                        color: "green",
                        mode: ""
                    });
                    deferred.reject(new Error('store.locus1 - not found'));

                    //throw new Error('Higher-level error. ' + err.message);
                })
            return deferred.Promise;
        },


        locusNext(context) {
            let index = context.state.loci.findIndex(lo => lo.id === context.state.locus.id);
            if (index == context.state.loci.length - 1) {
                index = 0;
            } else {
                ++index;
            }


            context.dispatch('locus', context.state.loci[index].id)
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
            context.dispatch('locus', context.state.loci[index].id)
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
    }
};
