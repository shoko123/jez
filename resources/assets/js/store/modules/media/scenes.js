export default {

    namespaced: false,
    state: {
        scenes: [],
    },

    getters: {
        scenes(state, getters) {
            let scenes = (getters.media).scenes;
            if (scenes === null) { return [] }
            console.log('images formatScenes scenes: ' + JSON.stringify((getters.media).scenes, null, 2));
            //console.log('images formatScenes images: ' + JSON.stringify((getters.media).images, null, 2));
            return scenes.map(scene => {

                let sceneTagInit = "";
                let itemsInScene = scene.sceneables.length;
                let sceneTag = scene.sceneables.reduce(
                    (accumulator, sceneable) => accumulator += (sceneable.sceneable_type + " " + sceneable.id_string + "; ")
                    , sceneTagInit
                );
                let images = scene.images;
                let imagesOfScene = images.length;
                let imagesFormatted = images.map(x => {
                    return {
                        image_no: x.image_no,
                        fileName: x.id.toString().padStart(6, '0') + "." + x.extension,
                        fileNameThumbnail: x.id.toString().padStart(6, '0') + "_tn." + x.extension,
                        scene_id: scene.id,
                        sceneTag: sceneTag,
                    };
                });

                return {
                    scene_id: scene.id,
                    description: scene.description,
                    sceneables: scene.sceneables,
                    itemsInScene: itemsInScene,
                    tag: sceneTag,
                    imagesOfScene: imagesOfScene,
                    images: imagesFormatted,
                }
            });
        },
        scenes1(state, getters) {
            return state.scenes;
        },
    },
    mutations: {
        scenes(state, payload) {
            console.log('medscn/scn/scenes: ' + JSON.stringify(payload, null, 2));
            state.scenes = payload;
        },
    },
    actions: {

    }
}