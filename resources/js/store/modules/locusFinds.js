import mediaUtils from "./media/mediaUtils";

export default {
    namespaced: true,
    state: {
        locusFinds: null,
        locusFindsMedia: null,
    },

    getters: {
        locusFinds(state) {
            return state.locusFinds;
        },

        collectionMedia(state, getters, rootState, rootGetters) {
            if (!state.locusFindsMedia) { return []; }
            let mediaRaw = state.locusFindsMedia.map(function (x, index) {
                return {
                    ...x,
                    findable_type: state.locusFinds[index].findable_type,
                    findable_id: state.locusFinds[index].findable_id,
                    description: state.locusFinds[index].description,
                    tag: state.locusFinds[index].tag
                };
            });

            //use media utility function to convert raw media data from DB to an object with fields srcFull & srcThumbnail
            return mediaUtils.getSrc(mediaRaw, false, state, getters, rootState, rootGetters);
        },
    },

    mutations: {
        locusFinds(state, payload) {
            state.locusFinds = payload.items;
            state.locusFindsMedia = payload.media;
        },
        clear(state) {
            state.locusFinds = null;
            state.locusFindsMedia = null;
        },
    },
};
