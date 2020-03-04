export default {
    addSrc(arr, storageUrl) {
        //console.log("addSrc storageUrl: "  + storageUrl);
        let newArray = arr.map(a => ({ ...a }));
        arr.forEach(x => {
            if(!x.image) {
                return x;
            }

            let fileNameFull = x.image.id.toString().padStart(6, '0') + "." + x.image.extension;
            let fileNameThumbnail = x.image.id.toString().padStart(6, '0') + "_tn." + x.image.extension;

            let srcFull = storageUrl + "/DB/images/full/" + fileNameFull;
            let srcThumbnail = storageUrl + "/DB/images/thumbnails/" + fileNameThumbnail;
        
            x["srcFull"] = srcFull;
            x["srcThumbnail"] = srcThumbnail;
            return x;
        });
        return arr;
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
                src: state.storageUrl + "/DB/images/full/" + x.id.toString().padStart(6, '0') + "." + x.extension,
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

