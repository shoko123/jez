export default {
    state: {
        stone: null,
        stones: [],
        stonesWithPagination: {
            stones: [],
            pagination: {
                current_page: null,
                first_page_url: null,
                from: null,
                last_page: null,
                last_page_url: null,
                next_page_url: null,
                path: null,
                per_page: null,
                prev_page_url: null,
                to: null,
                total: null
            },
        }
    },

    getters: {
        stones(state) {
            return state.stones;
        },

        stonesWithPagination(state) {
            return state.stonesWithPagination;
        },

        stonesFormatted(state) {
            //return state.stones;
            return state.stones.map(stone => ({
                id: stone.id,
                tag: stone.find.locus.area.year + '.' +
                    stone.find.locus.area.area + '.' +
                    stone.find.locus.locus + ' Reg: ' +
                    stone.find.registration_category + ' B:' +
                    stone.find.basket_no + 'No:' +
                    stone.find.item_no,
                description: stone.description
            }));
        },
        stone(state) {
            return state.stone;
        },

        stoneFormatted(state) {

            if(!state.stone) {
               return null;
            }
            
            let stoneFormatted = {
                id: state.stone.id,
                tag: state.stone.find.locus.area.year + '.' +
                    state.stone.find.locus.area.area + '.' +
                    state.stone.find.locus.locus + '.' +
                    state.stone.find.registration_category + '.B' +
                    state.stone.find.basket_no,
                description: state.stone.description
            }
            
            return stoneFormatted;
        },
    },

    mutations: {
        stones(state, payload) {
            state.stones = payload;
        },

        stonesWithPagination(state, payload) {
            state.stonesWithPagination.stones = payload.data;
            state.stonesWithPagination.pagination.current_page = payload.current_page,
                state.stonesWithPagination.pagination.first_page_url = payload.first_page_url,
                state.stonesWithPagination.pagination.from = payload.from,
                state.stonesWithPagination.pagination.last_page = payload.last_page,
                state.stonesWithPagination.pagination.last_page_url = payload.last_page_url,
                state.stonesWithPagination.pagination.next_page_url = payload.next_page_url,
                state.stonesWithPagination.pagination.path = payload.path,
                state.stonesWithPagination.pagination.per_page = payload.per_page,
                state.stonesWithPagination.pagination.prev_page_url = payload.prev_page_url,
                state.stonesWithPagination.pagination.to = payload.to,
                state.stonesWithPagination.pagination.total = payload.total

        },

        stone(state, payload) {
            state.stone = payload;
        },
        stoneDelete(state, payload) {
            let index = state.stones.findIndex(st => st.id === payload);
            if (index === -1) {
                console.log('store - stone delete - couldn\'t find stone with id: ' + payload);
            }
            console.log('store - mutation stone delete - deleting: ' + payload);
            state.stones.splice(index, 1);

/*
            commit("snackbar", {
                value: true,
                message: "stone deleted. Showing new stone list",
                timeout: 5000,
                color: "green",
                mode: ""
              }, { root: true });
    */

            //state.stone = null;
            //state
        },

      



    },
    actions: {

        stones({ context, commit, rootGetters }) {
            console.log('store.stone.action.stones');

            commit("isLoading", {
                value: true,
                message: "loading stones...",
                progressColor: "purple"
            }, { root: true });

            let user = rootGetters.currentUser;
            let token = user.token;

            //console.log('store.stone. stones() token: ' + token);
            //axios.defaults.headers.common['Authorization'] =
            //    'Bearer ' + token;

            axios.get(`/api/stones`)
                .then((res) => {

                    commit("isLoading", {
                        value: false,
                        message: null,
                        progressColor: "purple"
                    }, { root: true });

                    //commit('stones', res.data.stones);
                    commit('stones', res.data.data);
                    commit('stonesWithPagination', res.data)
                })
                .catch(err => {
                    console.log('Fail to load stones. err: ' + err);

                    commit("isLoading", {
                        value: false,
                        message: null,
                        progressColor: "purple"
                    }, { root: true });

                    //this.$router.push({ path: "/stones/welcome" });
                })

        },


        stone({ context, commit, rootGetters }, payload) {

            commit("isLoading", {
                value: true,
                message: "loading stone",
                progressColor: "purple"
            }, { root: true });

            //let user = rootGetters.currentUser;
            //let token = user.token;
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            axios.get(`/api/stones/${payload}`)
                .then((response) => {
                    commit('stone', response.data.stone);
                    commit("isLoading", { value: false }, { root: true });
                })
                .catch(err => {
                    //alert('STORE axios error @stonesGet');
                    console.log(err.response);
                    commit("snackbar", {
                        value: true,
                        message: "Stone could not be found",
                        timeout: 5000,
                        color: "green",
                        mode: ""
                    }, { root: true });
                    commit("isLoading", { value: false }, { root: true });
                    //throw new Error('Higher-level error. ' + err.message);
                })
        },

        stoneNext(context) {
            
            let index = context.state.stones.findIndex(lo => lo.id === context.state.stone.id);
            if (index == context.state.stones.length - 1) {
                index = 0;
            } else {
                ++index;
            }


            context.dispatch('stone', context.state.stones[index].id)
                .then((response) => {
                    return new Promise((resolve, reject) => {

                        resolve(48);
                    })
                    //return response;
                })
                .catch(err => {
                    console.log('Error in stoneNext ' + err.response);
                })
        },
        stonePrev(context) {
            
            let index = context.state.stones.findIndex(lo => lo.id === context.state.stone.id);
            if (index == 0) {
                index = context.state.stones.length - 1;
            } else {
                --index;
            }
            context.dispatch('stone', context.state.stones[index].id)
                .then((response) => {
                    //;
                })
                .catch(err => {
                    console.log('Error in stonePrev ' + err.response);
                })
        },

        stoneDelete({ context, commit, rootGetters }, payload) {
            /*
            commit("isLoading", {
                value: true,
                message: "loading stone",
                progressColor: "purple"
            }, { root: true });
*/
      
            //alert("delete stone.id: " + this.stone.id);
            return axios
              .delete(`/api/stones/${payload}`)
              .then(res => {
                //alert("stone " + this.stone.id + " deleted");
      
                //NEED erase from loci list
                commit("stoneDelete", payload);
                
                /*
                commit("isLoading", {
                  value: false,
                  message: "",
                  progressColor: "purple"
                });
                
      
                this.$router.push({ path: `/stones` });

                this.$store.commit("snackbar", {
                    value: true,
                    message: "stone deleted",
                    timeout: 5000,
                    color: "green",
                    mode: ""
                  });*/
              })
              .catch(err => console.log(err));
          }
    }
}