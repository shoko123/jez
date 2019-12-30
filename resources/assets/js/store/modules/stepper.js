export default {
    namespaced: true,
    state: {
        step: 1,
        header: '',
        stepArray: [],
    },
    getters: {
        stepArray(state) {
            return state.stepArray;
        },

        steps(state, getters, rootState, rootGetters) {
            switch (rootGetters["mgr/status"].itemName) {
                case 'Stone':

                    break;

                case 'Locus':

                    break;
            }

            if (this.$store.getters["mgr/status"].isCreate) {
                steps = [
                  { name: "FindNewRegistration", step: 1, header: "Registration" },
                  { name: "FindNew", step: 2, header: "Details" },
                  { name: "StoneNew", step: 3, header: "Stone details" }
                ];
              } else {
                steps = [
                  { name: "FindNew", step: 1, header: "Details" },
                  { name: "StoneNew", step: 2, header: "Stone details" }
                ];
              }


        },


        step(state) {
            return state.step;
        },

        itemName(state, getters, rootState, rootGetters) {
            return rootGetters["mgr/status"].itemName;
        },
        header(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate && !rootGetters["mgr/status"].isUpdate) {
                return;
            }

            let name = rootGetters["mgr/status"].itemName;
            let tag = '(' + getters.tag + ')';
            let action = (rootGetters["mgr/status"].isCreate) ? "Create new" : "Update";
            console.log('stp.header name: ' + name + ' action: ' + action + ' tag: ' + tag);
            return `${action} ${name} ${(rootGetters["mgr/status"].isUpdate || state.step > 1) ? tag : ""}`;
        },
        tag(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isCreate) {
                return rootGetters["pkr/item"] ? rootGetters["pkr/item"].tag : "";
            } else {
                return rootGetters["mgr/item"] ? rootGetters["mgr/item"].tag : "";
            }
        }


    },
    mutations: {
        stepArray(state, payload) {
            state.stepArray = payload;
        },
        step(state, payload) {
            state.step = payload;
        },
    },
    actions: {}
}
