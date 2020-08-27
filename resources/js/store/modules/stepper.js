export default {
    namespaced: true,
    state: {
        step: 1,
        nextButtonIsDisabled: false,
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

        nextButtonIsDisabled(state) {
            return state.nextButtonIsDisabled;
        },

        header(state, getters, rootState, rootGetters) {
            if (!rootGetters["mgr/status"].isCreate && !rootGetters["mgr/status"].isUpdate) {
                return;
            }

            function tag() {
                if (rootGetters["mgr/status"].isCreate) {
                    return rootGetters["regs/regs"].tag;
                } else {
                    return rootGetters["mgr/item"] ? rootGetters["mgr/item"].tag : "";
                }
            }
            return `${rootGetters["mgr/status"].isCreate ? "Create new" : "Update"} ${rootGetters["mgr/appStatus"].module} ${tag()}`;
        },
    },
    mutations: {
        populateSteps(state, payload) {
            state.steps = payload

        },
        step(state, payload) {
            state.step = payload;
        },
        disableNextButton(state, payload) {
            console.log("disableNextButton() payload: " + payload);
            state.nextButtonIsDisabled = payload;
        },

        moveToStep(state, destination) {
            console.log("stepper.moveToStep()");
            switch (destination) {
                case "next":
                    state.step++;
                    break;

                case "prev":
                    state.step--;
                    break;

                case "first":
                    state.step = 1;
                    break;

            }
        },
    },
    actions: {
        populateSteps({ state, getters, rootGetters, commit, dispatch }, payload) {
            console.log("populateSteps()");
            let steps = [];
            switch (rootGetters["mgr/appStatus"].module) {
                case 'Stone':
                    if (rootGetters["mgr/status"].isCreate) {
                        steps = [
                            { name: "Registrar", step: 1, header: "Registration" },
                            { name: "FindNew", step: 2, header: "Details" },
                            { name: "StoneNew", step: 3, header: "Stone details" }
                        ];
                    } else {
                        steps = [
                            { name: "FindNew", step: 1, header: "Field details" },
                            { name: "StoneNew", step: 2, header: "Stone details" }
                        ];
                    }
                    break;


                case 'Locus':
                    if (rootGetters["mgr/status"].isCreate) {
                        steps = [
                            { name: "Registrar", step: 1, header: "Locus registration" },
                            { name: "LocusNew", step: 2, header: "Locus details" }
                        ];
                    } else {
                        steps = [{ name: "LocusNew", step: 1, header: "Locus details" }];
                    }
                    break;
            }
            commit("populateSteps", steps);
            commit("moveToStep", "first");
        },

    }
}
