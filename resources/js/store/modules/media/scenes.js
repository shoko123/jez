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
            console.log(`addUpdateSscene(): ` + JSON.stringify(payload, null, 2));
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
            //console.log('medscn/scn/scenes: ' + JSON.stringify(payload, null, 2));
            state.scenes = payload;
        },
        deleteScene(state, scene_id) {
            let index = state.scenes.findIndex(x => {
                return x.id === scene_id;
            });
            let message = null;
            if (index === -1) {
                message =  "ERROR (could not be found)";
            } else {
                message =  "deleted successfully from local store";
                state.scenes.splice(index, 1);
            }
        console.log(`med/deleteScene(${scene_id}) - ${message}`);
        },
    },
    actions: {

    }
}