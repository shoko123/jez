export default {

    namespaced: false,
    state: {
        scenes: [],
    },

    getters: {
        scenes(state, getters) {
            return state.scenes;
        },
    },
    mutations: {
        addUpdateScene(state, payload) {
            console.log("addUpdate to scene: " + JSON.stringify(payload, null, 2))
            let index = state.scenes.findIndex(x => {
                return x.id === payload.id;
            });
            if (index === -1) {
                state.scenes.push(payload);
            } else {
                state.scenes.splice(index, 1, payload);
                //state.media.scenes.push(payload);
            }
        },
        scenes(state, payload) {
            console.log('medscn/scn/scenes: ' + JSON.stringify(payload, null, 2));
            state.scenes = payload;
        },
        deleteScene(state, payload) {
            state.scenes.splice(payload, 1);
        },
    },
    actions: {

    }
}