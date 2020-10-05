export default {
    findStatus(state, getters) {
        if (state.newItem.areaSeasonIndex === null ||
            state.newItem.registration_categoryIndex === null ||
            (state.newItem.basket_noIndex === null && state.newItem.artifact_noIndex === null)) {
            return { ready: false, tag: "" };
        }
        let tag = "Do Later...";
        return { ready: true, tag: tag };
    }
}
