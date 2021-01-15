export default {
    status(state, getters, rootState, rootGetters) {

        function isDigModule() {
            switch (state.status.module) {
                case "Auth":
                case "About":
                    return false;
                default:
                    return true;
            }
        }

        function isFind() {
            switch (state.status.module) {
                case "Pottery":
                case "Lithic":
                case "Stone":
                case "Fauna":
                case "Flora":
                case "Glass":
                case "Metal":
                case "Tbd":
                    return true;

                default:
                    return false;
            }
        }

        function hasMedia() {
            return (!rootGetters["med/itemAllMedia"] || (rootGetters["med/itemAllMedia"].length > 0));
        }

        function hasRelatedModules() {
            if (state.status.module === "Locus") {
                if (!getters.item || !rootGetters["loci/locusFinds"]) {
                    return true;
                } else {
                    return (rootGetters["loci/locusFinds"].length > 0);
                }

            } else {
                return false;
            }
        }
        function isDeleteable() {
            return (!hasMedia() && !hasRelatedModules());
        }

        let status = {
            itemName: getters["moduleInfo"] ? getters["moduleInfo"].itemName : null,
            collectionName: getters["moduleInfo"] ? getters["moduleInfo"].collectionName : null,
            moduleAppBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].appBaseUrl : null,
            moduleApiBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].apiBaseUrl : null,

            module: state.status.module,
            modulePrevious: state.status.modulePrevious,
            action: state.status.action,
            actionPrevious: state.status.actionPrevious,
            id: state.status.id,
            idPrevious: state.status.idPrevious,

            count: state.collection.length ? state.collection.length : "...",
            isAreaSeason: (state.status.module === "AreaSeason"),
            isLocus: (state.status.module === "Locus"),
            isFind: isFind(),
            isDigModule: isDigModule(),
            isCreate: (state.status.action === "create"),
            isUpdate: (state.status.action === "update"),
            isFilter: (state.status.action === "filter"),
            isShow: (state.status.action === "show"),
            isList: (state.status.action === "list"),
            isWelcome: (state.status.action === "welcome"),
            isTags: (state.status.action === "tags"),
            isCreateLocus: (state.status.action === "create" && state.status.module === "Locus"),
            isCreateFind: (state.status.action === "create" && isFind()),
            isMediaEdit: (state.status.action === "media"),
            isEdit: ["create", "update", "media", "tags"].includes(state.status.action),
            isPicker: state.status.isPicker,
            isFilterable: !["Auth", "About", "Area", "Season"].includes(state.status.module),
            hasMedia: hasMedia(),
            hasRelatedModules: hasRelatedModules(),
            isDeleteable: isDeleteable(),
        };
        return status;
    },

}