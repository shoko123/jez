export default {

    namespaced: false,


    getters: {
        image(state) {
            return null;//state.scenes;
        },
        formattedScenes(state, getters) {
            let scenes = (getters.media).scenes;
            if (scenes === null) { return [] }
            console.log('images formatScenes scenes: ' + JSON.stringify((getters.media).scenes, null, 2));
            console.log('images formatScenes images: ' + JSON.stringify((getters.media).images, null, 2));
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
                    return x.id.toString().padStart(6, '0') + "." + x.extension;
                });

               



                return {
                    scene_id: scene.id,
                    description: scene.description,
                    itemsInScene: itemsInScene,
                    tag: sceneTag,
                    imagesOfScene: imagesOfScene,
                    images: imagesFormatted,
                }
            });
        }
    },
    mutations: {
        scenes(state, payload) {
            state.scenes = payload;
        },

    },
    actions: {

    }
}