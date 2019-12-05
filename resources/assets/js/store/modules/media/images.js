export default {

    namespaced: false,


    getters: {
        images(state, getters) {
            let scenes = (getters.media).scenes;
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
    },
   
    actions: {
        uploadMultiple({ state, getters, commit, dispatch, rootGetters }, formData) {

            //let data = JSON.stringify(Object.fromEntries(formData));
            let xhrRequest = {
                endpoint: `/api/files/storeMultiple`,
                action: "post",
                data: formData,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true },
                messages: {
                    loading: "loading files",
                    onSuccess: "Files uploaded successfully",
                    onFailure: "failed loading files"
                }
            };
            return (
                dispatch("xhr/xhr", xhrRequest, { root: true })
                    //return dispatch('xhr/xhr', xhrRequest, { root: true })
                    .then(res => {
                        console.log('upload multiple images returned scene : ' + JSON.stringify(res.data.scene, null, 2));
                        commit('addUpdateScene', res.data.scene);
                        /*
                        if (res.data.isNewScene) {
                            commit('addScene', res.data.scene);
                        } else {
                            commit('updateScene', res.data.scene);
                        }
                        */
                        return res;
                    })
                    .catch(err => {
                        console.log("Upload Failed to load files. err: " + err);
                        return err;
                    })
            );
        },
        delete({ state, commit, dispatch }, payload) {
            let xhrRequest = {
                endpoint: `/api/files`,
                action: "delete",
                data: payload,
                spinner: true,
                verbose: true,
                snackbar: { onSuccess: true, onFailure: true, },
                messages: { loading: `deleting image`, onSuccess: `image deletes successfully`, onFailure: "failed to delete image", },
            };
            return dispatch('xhr/xhr', xhrRequest, { root: true })
                .then((res) => {
                    console.log('images delete success. res: ' + JSON.stringify(res, null, 2));
                    if(res.data.scene) {
                        commit('addUpdateScene', res.data.scene);
                    } else {
                        commit('deleteScene', res.data.scene);
                        //state.media.scenes.splice(res.data.deletedSceneId, 1);
                        //state.media.scenes.splice(index, 1);
                    }
                    return res;
                })
                .catch(err => {
                    console.log('images delete failure. err: ' + JSON.stringify(err, null, 2));
                    return err;
                })

        },

    }
}