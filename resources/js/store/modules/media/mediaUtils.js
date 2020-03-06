export default {
    getSrc(arr, state, getters, rootState, rootGetters) {
        let arrNew =  JSON.parse(JSON.stringify(arr));
        return arrNew.map(x => {
            if(!x) { return null;}
            let y = JSON.parse(JSON.stringify(x));
            y["srcFull"] = rootGetters["med/storageUrl"] + "/DB/images/full/" + x.id.toString().padStart(6, '0') + "." + x.extension;
            y["srcThumbnail"] = rootGetters["med/storageUrl"] + "/DB/images/thumbnails/" + x.id.toString().padStart(6, '0') + "_tn." + x.extension;           
            return y;
        });
    },

    addSrcToItem(item, storageUrl) {
        return null;
    },

    mediaArray(state) {
        let itemScene = state.scenes.find(x => {
            return x.sceneables.length === 1;
        });
        if (itemScene === undefined || itemScene.images.length === 0) {
            return [];
        }
        return itemScene.images.map(x => {
            return {
                id: x.id,
                image_no: x.image_no,
                srcFull: state.storageUrl + "/DB/images/full/" + x.id.toString().padStart(6, '0') + "." + x.extension,
                srcThumbnail: state.storageUrl + "/DB/images/thumbnails/" + x.id.toString().padStart(6, '0') + "_tn." + x.extension,
                scene_id: itemScene.id,
                tag: itemScene.tag,
            }
        });
    },
    mediaItem(state) {
        let itemScene = state.scenes.find(x => {
            return x.sceneables.length === 1;
        });
        if (itemScene === undefined || itemScene.images.length === 0) {
            return null;
        }
        //console.log("image.itemScene: " + JSON.stringify(itemScene, null, 2))

        let imageData = itemScene.images[0];
        let fileNameFull = imageData.id.toString().padStart(6, '0') + "." + imageData.extension;
        let fileNameThumbnail = imageData.id.toString().padStart(6, '0') + "_tn." + imageData.extension;
        let srcFull = state.storageUrl + "/DB/images/full/" + fileNameFull;
        let srcThumbnail = state.storageUrl + "/DB/images/thumbnails/" + fileNameThumbnail;

        return {
            id: imageData.id,
            image_no: imageData.image_no,
            src: srcFull,
            srcThumbnail: srcThumbnail,
            scene_id: itemScene.id,
            tag: itemScene.tag,
        };
    },
}

