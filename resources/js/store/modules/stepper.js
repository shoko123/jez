export default {
    namespaced: true,
    state: {
        step: 0,
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
            let module = rootGetters["mgr/appStatus"].module;
            let steps = [];
            let stepsWithStepNumber = [];
             if (rootGetters["mgr/status"].isCreate) {
                 steps.push({ name: "Registrar", header: `${module} Registration` });
             }
            
             if (rootGetters["mgr/status"].isFind) {
                 steps.push( { name: "FindNew", header: "Find Details" });
             }
            steps.push( { name: `${module}New`, header: `${module} Details` });
            
            stepsWithStepNumber = steps.map(function (x, index) {
                let step = { ...x };
                step["step"] = index + 1;
                return step;
            });
            commit("populateSteps", stepsWithStepNumber);
            commit("moveToStep", "first");
        },

    }
}
