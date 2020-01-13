

var mediaCommon = {
        srcFromImageData(imageData) {
           
            let fileNameFull = imageData.id.toString().padStart(6, '0') + "." + imageData.extension;
            let fileNameThumbnail = imageData.id.toString().padStart(6, '0') + "_tn." + imageData.extension;
            let srcFull = getters["storageUrl"] + "/DB/images/full/" + fileNameFull;
            let srcThumbnail = getters["storageUrl"] + "/DB/images/thumbnails/" + fileNameThumbnail;

            return {
                id: imageData.id,
                image_no: imageData.image_no,
                src: srcFull,
                srcThumbnail: srcThumbnail,
            };
        },
        srcFromImages(imagesArray) {
            let srcArr = imagesArray.forEach(x => {return srcFromImageData(x)})
            return srcArr;
        }
    }
    export default mediaCommon
   