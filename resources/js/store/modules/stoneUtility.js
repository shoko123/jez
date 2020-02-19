export default {

    newItem(state, getters, rootState, rootGetters) {
        if (!rootGetters["mgr/status"].isCreate) {
            return null;
        }

        return {
            data: state.newItem,
            materials: state.materials,
            stone_types: state.stone_types,
            stoneTypologiesMain: state.stoneTypologiesMain,
        };

    },

}
