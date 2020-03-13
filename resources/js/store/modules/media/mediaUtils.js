export default {
    getSrc(arr, isCollection, state, getters, rootState, rootGetters) {
        let arrNew = JSON.parse(JSON.stringify(arr));
        return arrNew.map(function(x, index) {
            let y = JSON.parse(JSON.stringify(x));
            
            if(isCollection) {
                y["tag"] = rootGetters["mgr/collection"][index].tag;
                y["item_id"] = rootGetters["mgr/collection"][index].id;
                let text = null;
                switch(rootGetters["mgr/moduleInfo"].itemName){
                    case "Locus":
                        text = rootGetters["mgr/collection"][index].description;
                        break;
                        case "Pottery":
                             text = rootGetters["mgr/collection"][index].periods;
                        break;
                        case "Stone":
                               text = rootGetters["mgr/collection"][index].notes;
                        break;
                }
                y["text"] = text;
            }
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

