export default {

    namespaced: false,


    getters: {
        /*
        images(state, getters) {
            let scenes = getters["media"].scenes;
            if (scenes === null) { return [] }
            let itemScene = scenes.find(x => {
                return x.sceneables.length === 1;
            });
            if (itemScene === undefined || itemScene.images === null) {
                return [];
            }
            let sceneTag = itemScene.sceneables.reduce(
                (accumulator, sceneable) => accumulator += (sceneable.sceneable_type + " " + sceneable.id_string + "; ")
                , ""
            );
            return itemScene.images.map(x => {
                return {
                    id: x.id,
                    image_no: x.image_no,
                    fileName: x.id.toString().padStart(6, '0') + "." + x.extension,
                    fileNameThumbnail: x.id.toString().padStart(6, '0') + "_tn." + x.extension,
                    scene_id: itemScene.id,
                    sceneTag: sceneTag,
                };
            });
        },
        */

        images1(state, getters) {
            let itemScene = getters["scenes1"].find(x => {
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
            let itemScene = getters["scenes1"].find(x => {
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

        imagesMultiItem(state, getters) {
            if ((getters.media).scenes === null) { return [] }
            let multiScenes = (getters.media).scenes.filter(x => {
                return x.sceneables.length !== 1;
            });
            if (multiScenes === undefined) {
                return [];
            }
            let imagesMultiItem = [];
            multiScenes.foreach

            multiScenes.forEach(x => {
                let sceneTag = x.sceneables.reduce(
                    (accumulator, sceneable) => accumulator += (sceneable.sceneable_type + " " + sceneable.id_string + "; ")
                    , "");
                x.images.forEach(image => {
                    let imageFormatted = {
                        image_no: image.image_no,
                        fileName: image.id.toString().padStart(6, '0') + "." + image.extension,
                        fileNameThumbnail: image.id.toString().padStart(6, '0') + "_tn." + image.extension,
                        scene_id: x.id,
                        sceneTag: sceneTag,
                    };
                    imagesMultiItem.push(imageFormatted);
                })
            });

            return imagesMultiItem.sort(function (a, b) {
                let aSceneTag = a.sceneTag;
                let bSceneTag = b.sceneTag;
                let aImageNo = a.image_no;
                let bImageNo = b.image_no;
                return (aSceneTag < bSceneTag) ? -1 : (aImageNo > bImageNo) ? 1 : 0;
            });
        },
    },

    actions: {

    }
}