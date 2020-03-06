import mediaUtils from "./media/mediaUtils";

export default {
    namespaced: true,
    state: {
        locusFinds: null,
    },

    getters: {
        locusFinds(state) {
            if (!state.locusFinds) { return null; }

            //get rid of media data
            let lf = JSON.parse(JSON.stringify(state.locusFinds));
            lf.map(x => {
                let y = JSON.parse(JSON.stringify(x));
                delete x.media;
                return x;
            });
            return lf;
        },

        media(state, getters, rootState, rootGetters) {
            if (!state.locusFinds) { return null; }
            
            //extract media data from locusFinds[] object
            let mediaRaw = state.locusFinds.map(x => {
                if (!x.media) { return null; }
                let y = JSON.parse(JSON.stringify(x.media));
                y["findable_type"] = x.findable_type;
                y["findable_id"] = x.findable_id;
                y["description"] = x.description;
                y["tag"] = x.tag;

                return y;

            });
            //use media utility function to convert raw media data from DB to an object with fields srcFull & srcThumbnail
            return mediaUtils.getSrc(mediaRaw, state, getters, rootState, rootGetters);
        },
    },

    mutations: {
        locusFinds(state, payload) {
            state.locusFinds = payload;
        },
        clear(state) {
            state.locusFinds = null;
        },
    },
};
