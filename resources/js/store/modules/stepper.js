export default {
    namespaced: true,
    state: {
        step: 1,
        header: '',
        disableNextButton: false,
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

            function tag() {
                if (rootGetters["mgr/status"].isCreate) {
                    return rootGetters["reg/registration"] ? rootGetters["reg/registration"].tag : "";
                } else {
                    return rootGetters["mgr/item"] ? rootGetters["mgr/item"].tag : "";
                }
            }
            //let name = rootGetters["mgr/status"].itemName;
            //let action = (rootGetters["mgr/status"].isCreate) ? "Create new" : "Update";


            //console.log('stp.header name: ' + name + ' action: ' + action + ' tag: ' + getters["tag"]);
            return `${rootGetters["mgr/status"].isCreate ? "Create new" : "Update"} ${rootGetters["mgr/status"].itemName} ${tag()}`;
        },

        disableNextButton(state) {
            return state.disableNextButton;
        },
        /*
        tag(state, getters, rootState, rootGetters) {
            if (rootGetters["mgr/status"].isCreate) {
                let tag = rootGetters["reg/tag"];
                return tag ? tag : "";
            } else {
                return rootGetters["mgr/item"] ? rootGetters["mgr/item"].tag : "";
            }
        }
        */
    },
    mutations: {
        populateSteps(state, payload) {
            state.steps = payload

        },
        step(state, payload) {
            state.step = payload;
        },
        disableNextButton(state, payload) {
            console.log("disableNextButton " + payload);
            state.disableNextButton = payload;
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
                            { name: "RegistrationNewFind", step: 1, header: "Registration" },
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
                            { name: "RegistrationNewLocus", step: 1, header: "Locus registration" },
                            { name: "LocusNew", step: 2, header: "Locus details" }
                        ];
                    } else {
                        steps = [{ name: "LocusNew", step: 1, header: "Locus details" }];
                    }
                    break;
            }
            commit("populateSteps", steps)
        },

        disableNextButton({state, commit} ,payload) {
            commit("disableNextButton", payload);
        },
        nextClicked() {

        }

    }
}
