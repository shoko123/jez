export default {
    status(state, getters, rootState, rootGetters) {

        function isDigModule(module) {
            switch (module) {
                case "Auth":
                case "About":
                    return false;
                default:
                    return true;
            }
        }

        function isFind(module) {
            switch (module) {
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

        function hasMedia(module) {
            return (!rootGetters["med/itemAllMedia"] || (rootGetters["med/itemAllMedia"].length > 0));
        }

        function hasRelatedModules(module) {
            if (module === "Locus") {
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
            return (!hasMedia() && !hasRelatedModules(module));
        }
        let routerStatus = rootGetters["mgr/routes/status"];
        let moduleName = routerStatus.module;
        let status = {
            itemName: getters["moduleInfo"] ? getters["moduleInfo"].itemName : null,
            collectionName: getters["moduleInfo"] ? getters["moduleInfo"].collectionName : null,
            moduleAppBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].appBaseUrl : null,
            moduleApiBaseUrl: getters["moduleInfo"] ? getters["moduleInfo"].apiBaseUrl : null,

            module: routerStatus.module,
            modulePrevious: routerStatus.modulePrevious,
            action: routerStatus.action,
            actionPrevious: routerStatus.actionPrevious,
            id: routerStatus.id,
            idPrevious: routerStatus.idPrevious,

            count: state.collection.length ? state.collection.length : "...",
            isAreaSeason: (routerStatus.module === "AreaSeason"),
            isLocus: (routerStatus.module === "Locus"),
            isFind: isFind(moduleName),
            isDigModule: isDigModule(moduleName),
            isCreate: (routerStatus.action === "create"),
            isUpdate: (routerStatus.action === "update"),
            isFilter: (routerStatus.action === "filter"),
            isShow: (routerStatus.action === "show"),
            isList: (routerStatus.action === "list"),
            isWelcome: (routerStatus.action === "welcome"),
            isTags: (routerStatus.action === "tags"),
            isCreateLocus: (routerStatus.action === "create" && routerStatus.module === "Locus"),
            isCreateFind: (routerStatus.action === "create" && isFind(moduleName)),
            isMediaEdit: (routerStatus.action === "media"),
            isEdit: ["create", "update", "media", "tags"].includes(routerStatus.action),
            isPicker: routerStatus.isPicker,
            isFilterable: !["Auth", "About", "Area", "Season"].includes(routerStatus.module),
            hasMedia: hasMedia(moduleName),
            hasRelatedModules: hasRelatedModules(moduleName),
            isDeleteable: isDeleteable(moduleName),
        };
        return status;
    },

}