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
    }
}

