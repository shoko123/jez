export default {

    namespaced: false,

    getters: {
        images(state, getters) {
            let itemScene = getters["scenes"].find(x => {
                return x.sceneables.length === 1;
            });
            if (itemScene === undefined || itemScene.images.length === 0) {
                return [];
            }
            return itemScene.images.map(x => {
                return {
                    id: x.id,
                    image_no: x.image_no,
                    src: getters["storageUrl"] + "/DB/images/full/" + x.id.toString().padStart(6, '0') + "." + x.extension,
                    srcThumbnail: getters["storageUrl"] + "/DB/images/thumbnails/" + x.id.toString().padStart(6, '0') + "_tn." + x.extension,
                    scene_id: itemScene.id,
                    tag: itemScene.tag,
                }
            });
        },
        image(state, getters) {
            let itemScene = getters["scenes"].find(x => {
                return x.sceneables.length === 1;
            });
            if (itemScene === undefined || itemScene.images.length === 0) {
                return null;
            }
            console.log("image.itemScene: " + JSON.stringify(itemScene, null, 2))

            let imageData = itemScene.images[0];
            let fileNameFull = imageData.id.toString().padStart(6, '0') + "." + imageData.extension;
            let fileNameThumbnail = imageData.id.toString().padStart(6, '0') + "_tn." + imageData.extension;
            let srcFull = getters["storageUrl"] + "/DB/images/full/" + fileNameFull;
            let srcThumbnail = getters["storageUrl"] + "/DB/images/thumbnails/" + fileNameThumbnail;

            return {
                id: imageData.id,
                image_no: imageData.image_no,
                src: srcFull,
                srcThumbnail: srcThumbnail,
                scene_id: itemScene.id,
                tag: itemScene.tag,
            };
        },
    },

    actions: {

    }
}