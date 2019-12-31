export default {
    namespaced: true,
    state: {
        step: 1,
        header: '',
        steps: [],
    },
    getters: {
        steps(state) {
            return state.steps;
        },

        step(state) {
            return state.step;
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
        populateSteps(state, payload) {
           state.steps = payload
           
        },
        step(state, payload) {
            state.step = payload;
        },
    },
    actions: {
        populateSteps({ state, getters, rootGetters, commit, dispatch }, payload) {
        console.log("populateSteps()");
        let steps = [];
        switch (rootGetters["mgr/status"].itemName) {
            case 'Stone':
                if (rootGetters["mgr/status"].isCreate) {
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
                break;

            case 'Locus':
                if (rootGetters["mgr/status"].isCreate) {
                    steps = [
                        { name: "LocusNewRegistration", step: 1,header: "Locus registration"},
                        { name: "LocusNew", step: 2, header: "Locus details" }
                    ];
                } else {
                    steps = [{ name: "LocusNew", step: 1, header: "Locus details" }];
                }
                break;
        }
        commit("populateSteps", steps)
    }
        
    }
}
