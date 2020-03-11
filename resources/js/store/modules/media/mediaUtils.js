export default {
    getSrc(arr, state, getters, rootState, rootGetters) {
        let arrNew = JSON.parse(JSON.stringify(arr));
        return arrNew.map(x => {
            let y = JSON.parse(JSON.stringify(x));
            if (x.status == "ready") {                
                y["srcFull"] = rootGetters["med/storageUrl"] + "/DB/images/full/" + x.id.toString().padStart(6, '0') + "." + x.extension;
                y["srcThumbnail"] = rootGetters["med/storageUrl"] + "/DB/images/thumbnails/" + x.id.toString().padStart(6, '0') + "_tn." + x.extension;
            } else {
                y["srcThumbnail"] = rootGetters["med/srcThumbnailFiller"];
            }
            return y
        });
    },

    getMediaArrayFromScenes(state){
        let itemScene = state.scenes.find(x => {
            return x.sceneables.length === 1;
        });
        if (itemScene === undefined || itemScene.images.length === 0) {
            return [];
        }
        let images = JSON.parse(JSON.stringify(itemScene.images));
        //Doesn't work! images.map(obj=> ({ ...obj, status: "ready" }))
        images.forEach(function (x) { x.status = "ready"; });
        return images;
    },
}

